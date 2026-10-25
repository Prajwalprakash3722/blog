import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, readdir, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import sharp from "sharp";

const root = process.cwd();
const directory = path.join(root, "public/assets/images");
const manifestPath = path.join(root, "lib/image-manifest.json");
const manifest = await readFile(manifestPath, "utf8")
  .then(JSON.parse)
  .catch((error) => {
    if (error.code !== "ENOENT") throw error;
    return {};
  });
const files = [];
const sources = new Set();

function collectImages(node) {
  if (node.type === "image") sources.add(node.url);
  node.children?.forEach(collectImages);
}

for (const folder of ["_posts", "_travel", "_til"]) {
  for (const filename of (await readdir(folder))
    .filter((name) => name.endsWith(".mdx"))
    .sort()) {
    const filenamePath = path.join(folder, filename);
    const text = await readFile(filenamePath, "utf8");
    const { data, content } = matter(text);
    for (const source of [
      data.coverImage,
      data.ogImage?.url,
      data.author?.picture,
    ]) {
      if (source) sources.add(source);
    }
    collectImages(remark().parse(content));
    files.push({ filename: filenamePath, text });
  }
}
for (const filename of ["components/BookWidget.tsx", "pages/index.tsx"]) {
  const text = await readFile(filename, "utf8");
  for (const match of text.matchAll(
    /(?:imgSrc=|const image =\s*)["`]([^"`]+)["`]/g
  )) {
    sources.add(match[1].replace("${siteUrl}", ""));
  }
  files.push({ filename, text });
}

await mkdir(directory, { recursive: true });
if (process.argv.includes("--check")) {
  for (const source of sources) {
    assert(
      source.startsWith("/assets/images/") && manifest[source],
      `Import image before building: ${source}`
    );
    const image = manifest[source];
    for (const variant of image.variants) {
      const data = await readFile(path.join(root, "public", variant.src));
      const hash = createHash("sha256").update(data).digest("hex").slice(0, 16);
      assert.equal(
        variant.src,
        `/assets/images/${hash}-${variant.width}.webp`,
        "Filename hashes the image bytes"
      );
      const metadata = await sharp(data).metadata();
      assert.equal(
        metadata.width,
        variant.width,
        "Variant width matches image"
      );
      assert.equal(
        metadata.height,
        variant.height,
        "Variant height matches image"
      );
    }
    assert.equal(
      image.width,
      image.variants.at(-1).width,
      "Default image width"
    );
    assert.equal(
      image.height,
      image.variants.at(-1).height,
      "Default image height"
    );
  }
  console.log(
    `Verified ${sources.size} first-party images and their responsive variants`
  );
  process.exit(0);
}

const replacements = new Map();
const failures = [];
let inputBytes = 0;
let outputBytes = 0;

async function prepare(source) {
  if (manifest[source]) {
    for (const variant of manifest[source].variants) {
      await readFile(path.join(root, "public", variant.src));
    }
    return;
  }
  let input;
  try {
    const location = source.replace(/^public\//, "/").replace(/["']$/, "");
    if (/^https?:\/\//.test(location)) {
      const response = await fetch(location, {
        signal: AbortSignal.timeout(25000),
        headers: {
          "user-agent": "Mozilla/5.0 (compatible; DevCoffeeImageImport/1.0)",
          accept: "image/*",
        },
      });
      assert(response.ok, `HTTP ${response.status}`);
      assert(
        Number(response.headers.get("content-length") || 0) < 25_000_000,
        "Image exceeds 25 MB"
      );
      input = Buffer.from(await response.arrayBuffer());
    } else {
      assert(
        location.startsWith("/assets/"),
        `Unexpected image path ${source}`
      );
      input = await readFile(path.join(root, "public", location));
    }
    await sharp(input).metadata();
    inputBytes += input.length;
  } catch (error) {
    if (
      !/^https?:\/\//.test(source) ||
      !process.argv.includes("--allow-unavailable")
    )
      throw new Error(`${source}: ${error.message}`);
    failures.push({ source, error: error.message });
    input = Buffer.from(
      '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="400"><rect width="100%" height="100%" fill="#231f1d"/><text x="600" y="185" text-anchor="middle" fill="#e8e0da" font-family="sans-serif" font-size="36">Image unavailable</text><text x="600" y="240" text-anchor="middle" fill="#c8bdb5" font-family="sans-serif" font-size="24">The original external image is no longer accessible.</text></svg>'
    );
  }
  const metadata = await sharp(input).rotate().metadata();
  const rotated = metadata.autoOrient || metadata;
  const width = rotated.width;
  const variants = [];
  for (const target of [
    ...new Set(
      [480, 960, 1600, Math.min(width, 2400)].filter((size) => size <= width)
    ),
  ].sort((a, b) => a - b)) {
    const { data, info } = await sharp(input)
      .rotate()
      .resize({ width: target, withoutEnlargement: true })
      .webp({ quality: metadata.format === "png" ? 90 : 82, effort: 6 })
      .toBuffer({ resolveWithObject: true });
    const hash = createHash("sha256").update(data).digest("hex").slice(0, 16);
    const src = `/assets/images/${hash}-${info.width}.webp`;
    await writeFile(path.join(root, "public", src), data);
    variants.push({
      src,
      width: info.width,
      height: info.height,
    });
    outputBytes += data.length;
  }
  assert(variants.length, `No variants for ${source}`);
  const largest = variants.at(-1);
  manifest[largest.src] = {
    width: largest.width,
    height: largest.height,
    variants,
  };
  replacements.set(source, largest.src);
  console.error(`${source} -> ${largest.src}`);
}

const pending = [...sources].sort();
await Promise.all(
  Array.from({ length: 6 }, async () => {
    while (pending.length) await prepare(pending.shift());
  })
);

for (const file of files) {
  let text = file.text;
  for (const [source, destination] of [...replacements].sort(
    (a, b) => b[0].length - a[0].length
  )) {
    text = text.replaceAll(source, destination);
  }
  if (text !== file.text) await writeFile(file.filename, text);
}
await writeFile(
  manifestPath,
  JSON.stringify(
    Object.fromEntries(
      Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b))
    ),
    null,
    2
  ) + "\n"
);
console.log(
  JSON.stringify(
    {
      images: sources.size,
      imported: replacements.size,
      inputBytes,
      generatedVariantBytes: outputBytes,
      failures,
    },
    null,
    2
  )
);
