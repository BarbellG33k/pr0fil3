// Mirror + banned-string checker for embedded content blobs.
//
// Guards INV-7 (mirrors): every embedded copy of the content JSON must stay
// deep-equal with its source file, and public artifacts must not carry banned
// internal names or wording (INV-1/INV-4/INV-5/INV-6 scan classes).
// Born out of Wave-5 finding F5 (stale apex/nova EMBEDDED_DATA that a
// hand-kept mirror list missed): this walks EVERY blob, not a known list.
//
// Standalone: node scripts/validate-mirrors.mjs   (exit 1 on any failure)
// Wired into: npm test via scripts/validate-mirrors.test.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const PORTFOLIO_DATA_PAGES = [
  "executive_portfolio_herald.html",
  "executive_portfolio_cipher.html",
  "executive_portfolio_ember.html",
  "portfolio-apex.html",
  "portfolio-nova.html",
];
const EMBEDDED_DATA_PAGES = [
  "resume.html",
  "resume-alt.html",
  "portfolio-apex.html",
  "portfolio-nova.html",
];
const BANNED = [
  [/OnePACS|DICOM|AI Scribe|Care Agent|\bAIM\b|BigSKI|iDoc|Patient Fusion/i, "codename/product"],
  [/Participated in (engineering workstreams|Global Capability)/, "old GCC wording"],
  // "Show Me Your Work" was missing here while the other three INV-4 names were
  // listed - the gate guarded three quarters of its own invariant.
  [/No-Heroes Standard|Show Me Your Work|Departure as Design Signal|Perception Becomes Reality/i, "constructed doctrine label"],
  [/departure is read as information|departure that reveals/, "restricted departure doctrine"],
  // F6: the GCC card tagline shipped reading "steered as a long-term capability
  // build", one notch above the D-6/INV-6 "helped shape" ceiling. The name and
  // old-wording scans could not see it because it was neither.
  [/steered as a long-term/i, "GCC verb above the INV-6 ceiling"],
  // F7: internal evidence-ledger vocabulary reached published copy in 12 files.
  // It is meaningless to a reader who has no access to the ledger, and together
  // these phrases disclose that the profile derives from summaries of private
  // 1:1s. Public copy states what was done and what was not measured - never how
  // well corroborated the underlying record is.
  [
    /the record documents|the summaries record|the available sources|the underlying record|independent counterpart|counterpart setting|counterpart series|corroborated across|strength of the evidence|per the record/i,
    "evidence-ledger vocabulary in public copy",
  ],
];

// F9: all three GCC case-study files shipped to production with literal agent
// tool-call markup ("</content></invoke>") trailing </html>. Browsers discard
// bytes after </html>, so a rendered-DOM check cannot see it - only View Source
// can. Nothing may follow the closing tag.
const TRAILING_GARBAGE = /<\/html>\s*\S/i;
const AGENT_MARKUP = /<\/(?:antml:)?(?:invoke|content|function_calls|parameter)>/i;

export function runChecks() {
  const failures = [];
  const bad = (m) => failures.push(m);
  const read = (f) => fs.readFileSync(path.join(root, f), "utf8");

  const pc = JSON.parse(read("portfolio-content.json"));
  const rc = JSON.parse(read("resume-content.json"));

  function extractJsonBlob(file) {
    const m = read(file).match(
      /<script type="application\/json" id="portfolio-data">([\s\S]*?)<\/script>/
    );
    return m ? JSON.parse(m[1]) : null;
  }
  function extractEmbeddedData(file) {
    const s = read(file);
    const i = s.indexOf("const EMBEDDED_DATA =");
    if (i < 0) return null;
    const start = s.indexOf("{", i);
    let depth = 0, inStr = false, esc = false, q = "";
    for (let j = start; j < s.length; j++) {
      const c = s[j];
      if (inStr) {
        if (esc) esc = false;
        else if (c === "\\") esc = true;
        else if (c === q) inStr = false;
        continue;
      }
      if (c === '"' || c === "'") { inStr = true; q = c; continue; }
      if (c === "{") depth++;
      else if (c === "}") {
        depth--;
        if (depth === 0) {
          // eslint-disable-next-line no-eval
          return eval("(" + s.slice(start, j + 1) + ")");
        }
      }
    }
    return null;
  }

  // 1. portfolio-data blobs == portfolio-content.json
  for (const f of PORTFOLIO_DATA_PAGES) {
    const emb = extractJsonBlob(f);
    if (!emb) bad(`${f}: no portfolio-data blob`);
    else if (JSON.stringify(emb) !== JSON.stringify(pc)) bad(`${f}: portfolio-data DRIFT`);
  }

  // 2. every EMBEDDED_DATA key deep-equals resume-content.json
  for (const f of EMBEDDED_DATA_PAGES) {
    const emb = extractEmbeddedData(f);
    if (!emb) bad(`${f}: no EMBEDDED_DATA`);
    else
      for (const k of Object.keys(emb))
        if (JSON.stringify(emb[k]) !== JSON.stringify(rc[k]))
          bad(`${f}: EMBEDDED_DATA.${k} DRIFT`);
  }

  // 3. banned-string scan over public artifacts at repo root
  const publicFiles = fs
    .readdirSync(root)
    .filter((f) => /\.(html|json|js)$/.test(f) && !f.startsWith("."));
  for (const f of publicFiles) {
    const s = read(f);
    for (const [re, label] of BANNED) if (re.test(s)) bad(`${f}: ${label} (${re})`);
    if (AGENT_MARKUP.test(s)) bad(`${f}: agent tool-call markup in published file`);
    if (f.endsWith(".html") && TRAILING_GARBAGE.test(s))
      bad(`${f}: content after </html>`);
  }

  // 4. card link targets exist
  for (const c of pc.caseStudyCards)
    for (const v of c.variants) {
      const url =
        ["cipher", "ember"].includes(v)
          ? c.url.replace(/\.html$/, "-" + v + ".html")
          : c.url;
      if (!fs.existsSync(path.join(root, url))) bad(`missing ${url} (${c.title}/${v})`);
    }

  return failures;
}

const isDirectRun =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isDirectRun) {
  const failures = runChecks();
  if (failures.length) {
    for (const m of failures) console.log("FAIL:", m);
    console.log(`${failures.length} FAILURES`);
    process.exitCode = 1;
  } else {
    console.log("MIRRORS + SCANS + LINKS: ALL CLEAN");
  }
}
