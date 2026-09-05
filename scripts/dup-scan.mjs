// Near-duplication scanner for public copy (case-study HTML + content JSONs).
//
// Extracts prose units (paragraphs / list items / JSON string values, >= 8
// words), builds 5-word shingles per unit, and reports pairs with Jaccard
// similarity >= threshold (default 0.5). Catches the Wave-4 defect class:
// two sections in one artifact saying the same thing (59% shingle overlap).
//
// Modes:
//   default        within-file pairs only (the high-signal defect class)
//   --cross        add cross-file pairs (variant trios and embedded mirror
//                  blobs still excluded; canonical tagline echoes across
//                  resume/portfolio JSON are by-design reuse — expect noise)
//   --strict       exit 1 on any reported pair
//   --threshold N  Jaccard threshold (default 0.5)
//
// Accepted echoes (documented, do not "fix"): resume experience bullets vs
// builderResume job history (intentional mirror — excluded), ledger
// approvedWording reused verbatim across resume layers (placement-map rule).
//
// Usage:
//   node scripts/dup-scan.mjs [--cross] [--strict] [--threshold 0.5] [file ...]

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SHINGLE_N = 5;
const MIN_WORDS = 8;

const args = process.argv.slice(2);
const strict = args.includes("--strict");
const cross = args.includes("--cross");
const thresholdIdx = args.indexOf("--threshold");
const threshold = thresholdIdx >= 0 ? parseFloat(args[thresholdIdx + 1]) : 0.5;
const flagPositions = new Set([
  ...args.map((a, i) => (a.startsWith("--") ? i : -1)).filter((i) => i >= 0),
  thresholdIdx + 1,
]);
const fileArgs = args.filter((a, i) => !flagPositions.has(i));

const stripTags = (s) => s.replace(/<[^>]+>/g, " ");
const decodeEntities = (s) =>
  s
    .replace(/&amp;/g, "&").replace(/&rarr;/g, "->").replace(/&middot;/g, "-")
    .replace(/&mdash;/g, "-").replace(/&nbsp;/g, " ");
const normalize = (s) =>
  decodeEntities(stripTags(s)).toLowerCase().replace(/[^a-z0-9\s->]/g, " ").replace(/\s+/g, " ").trim();
const words = (s) => normalize(s).split(" ").filter(Boolean);

function htmlUnits(file, text) {
  const units = [];
  const body = text.replace(/<(script|style)[\s\S]*?<\/\1>/gi, "");
  const re = /<(p|li)[^>]*>([\s\S]*?)<\/\1>/gi;
  let m;
  while ((m = re.exec(body))) {
    const raw = m[2];
    if (/<(nav|footer)[^>]*>/i.test(raw)) continue;
    const w = words(raw);
    if (w.length >= MIN_WORDS) units.push({ file, where: `<${m[1]}>`, w });
  }
  return units;
}

function jsonUnits(file, text) {
  const units = [];
  const obj = JSON.parse(text);
  const walk = (node, trail) => {
    if (typeof node === "string") {
      const w = words(node);
      if (w.length >= MIN_WORDS) units.push({ file, where: trail, w });
    } else if (Array.isArray(node)) {
      node.forEach((v, i) => walk(v, `${trail}[${i}]`));
    } else if (node && typeof node === "object") {
      for (const [k, v] of Object.entries(node)) walk(v, trail ? `${trail}.${k}` : k);
    }
  };
  walk(obj, "");
  return units;
}

const variantBase = (f) => f.replace(/-(cipher|ember)\.html$/, ".html");
const intentionalMirror = (a, b) =>
  a.trailIsBuilderResume || b.trailIsBuilderResume;

const targets = fileArgs.length
  ? fileArgs.map((f) => path.resolve(f))
  : fs
      .readdirSync(root)
      .filter(
        (f) =>
          /^case-study-.*\.html$/.test(f) || f === "resume-content.json" || f === "portfolio-content.json"
      )
      .map((f) => path.join(root, f));

const units = [];
for (const file of targets) {
  const rel = path.relative(root, file);
  const text = fs.readFileSync(file, "utf8");
  try {
    const parsed =
      rel.endsWith(".json") ? jsonUnits(rel, text) : htmlUnits(rel, text);
    for (const u of parsed) {
      u.trailIsBuilderResume = rel === "resume-content.json" && u.where.startsWith("builderResume");
      units.push(u);
    }
  } catch {
    console.error(`skipping ${rel}: parse error`);
  }
}

const shingles = (w) => {
  const out = new Set();
  for (let i = 0; i + SHINGLE_N <= w.length; i++) out.add(w.slice(i, i + SHINGLE_N).join(" "));
  return out;
};
units.forEach((u) => (u.sh = shingles(u.w)));

let pairs = 0;
for (let i = 0; i < units.length; i++) {
  for (let j = i + 1; j < units.length; j++) {
    const a = units[i], b = units[j];
    if (a.file === b.file && a.where === b.where) continue;
    if (a.file !== b.file) {
      if (!cross) continue;
      if (variantBase(a.file) === variantBase(b.file)) continue;
    }
    if (intentionalMirror(a, b)) continue;
    const inter = [...a.sh].filter((s) => b.sh.has(s)).length;
    const union = a.sh.size + b.sh.size - inter;
    const sim = union === 0 ? 0 : inter / union;
    if (sim >= threshold) {
      pairs++;
      const pct = Math.round(sim * 100);
      console.log(
        `${pct}%  ${a.file} ${a.where}  <->  ${b.file} ${b.where}\n      "${a.w.slice(0, 18).join(" ")}..."`
      );
    }
  }
}

console.log(
  pairs === 0
    ? `DUP SCAN: CLEAN (mode ${cross ? "cross" : "within"}, threshold ${threshold}, ${units.length} units)`
    : `DUP SCAN: ${pairs} pair${pairs === 1 ? "" : "s"} >= ${threshold} (mode ${cross ? "cross" : "within"}${strict ? ", strict" : ", report-only"})`
);
if (strict && pairs > 0) process.exitCode = 1;
