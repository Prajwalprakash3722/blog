import assert from "node:assert/strict";
import { execFile, execFileSync } from "node:child_process";
import { createServer } from "node:http";
import {
  copyFile,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  symlink,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import sharp from "sharp";

const run = promisify(execFile);
const root = fileURLToPath(new URL("../", import.meta.url));

async function fixture() {
  const directory = await mkdtemp(path.join(tmpdir(), "blog-image-hook-"));
  for (const folder of [
    "_posts",
    "_travel",
    "_til",
    "components",
    "pages",
    "lib",
    "scripts",
    ".githooks",
  ]) {
    await mkdir(path.join(directory, folder));
  }
  await writeFile(path.join(directory, "lib/image-manifest.json"), "{}\n");
  await symlink(
    path.join(root, "scripts/prepare-images.mjs"),
    path.join(directory, "scripts/prepare-images.mjs")
  );
  await copyFile(
    path.join(root, ".githooks/pre-commit"),
    path.join(directory, ".githooks/pre-commit")
  );
  for (const args of [
    ["init", "-q"],
    ["config", "user.name", "Image hook test"],
    ["config", "user.email", "images@example.invalid"],
    ["config", "core.hooksPath", ".githooks"],
    ["add", "lib/image-manifest.json"],
  ]) {
    execFileSync("git", args, { cwd: directory });
  }
  return directory;
}

test("image import runs through the real pre-commit hook", async (t) => {
  const image = await sharp({
    create: { width: 8, height: 8, channels: 3, background: "#7a4532" },
  })
    .png()
    .toBuffer();
  let requests = 0;
  const server = createServer((request, response) => {
    requests++;
    if (request.url !== "/image.png") {
      response.writeHead(404).end();
      return;
    }
    response.writeHead(200, { "content-type": "image/png" }).end(image);
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const url = `http://127.0.0.1:${server.address().port}`;
  try {
    await t.test(
      "converts and commits staged Markdown and JSX images without adding unrelated files",
      async () => {
        const directory = await fixture();
        try {
          const post = `---\ntitle: Test\ncoverImage: "${url}/image.png"\n---\n\n![A test image](${url}/image.png)\n`;
          await writeFile(path.join(directory, "_posts/staged post.mdx"), post);
          await writeFile(
            path.join(directory, "components/test.tsx"),
            `<img src="${url}/image.png" alt="Test" />\n`
          );
          await writeFile(path.join(directory, "_posts/unrelated.mdx"), post);
          execFileSync(
            "git",
            ["add", "--", "_posts/staged post.mdx", "components/test.tsx"],
            { cwd: directory }
          );
          await run("git", ["commit", "-qm", "Import images"], {
            cwd: directory,
          });
          const committed = execFileSync(
            "git",
            ["show", "HEAD:_posts/staged post.mdx"],
            { cwd: directory, encoding: "utf8" }
          );
          assert(!committed.includes(url));
          const manifest = JSON.parse(
            execFileSync("git", ["show", "HEAD:lib/image-manifest.json"], {
              cwd: directory,
              encoding: "utf8",
            })
          );
          const [src] = Object.keys(manifest);
          assert.match(src, /^\/assets\/images\/[a-f0-9]{16}-8\.webp$/);
          assert(committed.includes(src));
          assert(
            execFileSync("git", ["show", "HEAD:components/test.tsx"], {
              cwd: directory,
              encoding: "utf8",
            }).includes(src)
          );
          assert(
            execFileSync("git", ["show", `HEAD:public${src}`], {
              cwd: directory,
            }).length > 0
          );
          assert.equal(
            await readFile(
              path.join(directory, "_posts/unrelated.mdx"),
              "utf8"
            ),
            post
          );
          assert(
            !execFileSync("git", ["ls-tree", "-r", "--name-only", "HEAD"], {
              cwd: directory,
              encoding: "utf8",
            }).includes("unrelated.mdx")
          );
          const before = requests;
          await writeFile(
            path.join(directory, "_posts/staged post.mdx"),
            committed + "\nAnother paragraph.\n"
          );
          execFileSync("git", ["add", "--", "_posts/staged post.mdx"], {
            cwd: directory,
          });
          await run("git", ["commit", "-qm", "Reuse imported images"], {
            cwd: directory,
          });
          assert.equal(
            requests,
            before,
            "Existing static images require no network access"
          );
        } finally {
          await rm(directory, { recursive: true, force: true });
        }
      }
    );

    await t.test(
      "rejects partial staging without changing the index or worktree",
      async () => {
        const directory = await fixture();
        try {
          const staged = `![Test](${url}/image.png)\n`;
          await writeFile(path.join(directory, "_posts/test.mdx"), staged);
          execFileSync("git", ["add", "--", "_posts/test.mdx"], {
            cwd: directory,
          });
          await writeFile(
            path.join(directory, "_posts/test.mdx"),
            staged + "Unstaged text.\n"
          );
          await assert.rejects(
            run("git", ["commit", "-qm", "Partial file"], { cwd: directory }),
            /complete file to be staged/
          );
          assert.equal(
            execFileSync("git", ["show", ":_posts/test.mdx"], {
              cwd: directory,
              encoding: "utf8",
            }),
            staged
          );
          assert.equal(
            await readFile(path.join(directory, "_posts/test.mdx"), "utf8"),
            staged + "Unstaged text.\n"
          );
        } finally {
          await rm(directory, { recursive: true, force: true });
        }
      }
    );

    await t.test(
      "blocks the commit when the remote image cannot be downloaded",
      async () => {
        const directory = await fixture();
        try {
          const post = `![Test](${url}/missing.png)\n`;
          await writeFile(path.join(directory, "_posts/test.mdx"), post);
          execFileSync("git", ["add", "--", "_posts/test.mdx"], {
            cwd: directory,
          });
          await assert.rejects(
            run("git", ["commit", "-qm", "Missing image"], { cwd: directory }),
            /HTTP 404/
          );
          assert.equal(
            execFileSync("git", ["show", ":_posts/test.mdx"], {
              cwd: directory,
              encoding: "utf8",
            }),
            post
          );
          assert.deepEqual(
            JSON.parse(
              execFileSync("git", ["show", ":lib/image-manifest.json"], {
                cwd: directory,
                encoding: "utf8",
              })
            ),
            {}
          );
        } finally {
          await rm(directory, { recursive: true, force: true });
        }
      }
    );
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});
