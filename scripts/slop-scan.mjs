// Word-list slop scanner for public copy (root *.html + content JSONs).
//
// Report-only by default: prints hits and exits 0. `--strict` exits 1 on any
// hit (use on newly drafted files; pre-existing owner-voice hits are known:
// `leverage` x4 in resume-content.json, `arena` in portfolio-content.json).
//
// Usage:
//   node scripts/slop-scan.mjs [--strict] [file ...]

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const SLOP_WORDS = [
  "leverage", "leveraging",
  "synergy", "synergize", "synergistic",
  "arena",
  "tapestry",
  "delve", "delving",
  "unlock", "unlocking",
  "unleash",
  "elevate", "elevating",
  "seamless", "seamlessly",
  "game-changer", "gamechanger",
  "cutting-edge",
  "best-in-class",
  "world-class",
  "paradigm shift",
  "holistic",
  "transformative",
  "revolutionize", "revolutionizing",
  "supercharge", "supercharging",
  "empower", "empowering",
  "reimagine", "reimagining",
  "in today's fast-paced",
];

const args = process.argv.slice(2);
const strict = args.includes("--strict");
const fileArgs = args.filter((a) => !a.startsWith("--"));

const targets = fileArgs.length
  ? fileArgs.map((f) => path.resolve(f))
  : fs
      .readdirSync(root)
      .filter((f) => /\.(html|json)$/.test(f) && !f.startsWith("."))
      .map((f) => path.join(root, f));

let hits = 0;
for (const file of targets) {
  const lines = fs.readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    const lower = line.toLowerCase();
    for (const w of SLOP_WORDS) {
      if (lower.includes(w)) {
        hits++;
        console.log(
          `${path.relative(root, file)}:${i + 1}: "${w}"`
        );
      }
    }
  });
}

console.log(
  hits === 0
    ? "SLOP SCAN: CLEAN"
    : `SLOP SCAN: ${hits} hit${hits === 1 ? "" : "s"}${strict ? " (strict mode)" : " (report-only; pre-existing owner-voice hits are accepted)"}`
);
if (strict && hits > 0) process.exitCode = 1;
