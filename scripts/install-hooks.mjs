import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";

if (!process.env.CI && !process.env.VERCEL && existsSync(".git")) {
  execFileSync("git", ["config", "core.hooksPath", ".githooks"], {
    stdio: "inherit",
  });
}
