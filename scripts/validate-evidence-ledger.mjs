import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const CONFIDENCE = new Set(["verified", "directional", "recollection", "unresolved"]);
const STATUS = new Set(["public-safe", "restricted", "private", "blocked"]);
const ARTIFACTS = new Set([
  "executive-resume", "builder-resume", "executive-profile", "builder-profile",
  "portfolio", "case-study", "interview-only"
]);
const CORROBORATING = new Set([
  "official-record", "public-source", "internal-document", "dashboard",
  "owner-confirmation", "stakeholder-confirmation"
]);

const object = (value) => value !== null && typeof value === "object" && !Array.isArray(value);

export function validateLedger(ledger) {
  const errors = [];
  if (!object(ledger)) return ["ledger must be an object"];
  if (ledger.schemaVersion !== 1) errors.push("schemaVersion must equal 1");
  if (ledger.subject !== "Guillermo Salas") errors.push("subject must equal Guillermo Salas");
  if (typeof ledger.updatedAt !== "string") errors.push("updatedAt must be a string");
  if (!Array.isArray(ledger.records)) return [...errors, "records must be an array"];

  const ids = new Set();
  ledger.records.forEach((record, index) => {
    const label = record?.id || `records[${index}]`;
    if (!object(record)) return errors.push(`${label}: must be an object`);
    if (!record.id) errors.push(`${label}: id is required`);
    if (ids.has(record.id)) errors.push(`${label}: duplicate id`);
    ids.add(record.id);
    for (const field of ["domain", "subject", "claim", "role", "attribution", "lastValidated"]) {
      if (typeof record[field] !== "string" || !record[field]) errors.push(`${label}: ${field} is required`);
    }
    if (!CONFIDENCE.has(record.confidence)) errors.push(`${label}: invalid confidence`);
    if (!object(record.period)) errors.push(`${label}: period must be an object`);
    if (!object(record.scope)) errors.push(`${label}: scope must be an object`);
    if (!Array.isArray(record.collaborators)) errors.push(`${label}: collaborators must be an array`);
    if (!Array.isArray(record.sources) || !record.sources.length) errors.push(`${label}: source is required`);
    else record.sources.forEach((source, sourceIndex) => {
      const sourceLabel = `${label}: sources[${sourceIndex}]`;
      if (!object(source)) {
        errors.push(`${sourceLabel} must be an object`);
        return;
      }
      if (typeof source.type !== "string" || !source.type.trim()) errors.push(`${sourceLabel}.type must be a non-empty string`);
      if (typeof source.reference !== "string" || !source.reference.trim()) errors.push(`${sourceLabel}.reference must be a non-empty string`);
    });
    if (!Array.isArray(record.conflicts)) errors.push(`${label}: conflicts must be an array`);
    if (!object(record.publication)) {
      errors.push(`${label}: publication must be an object`);
    } else {
      if (!STATUS.has(record.publication.status)) errors.push(`${label}: invalid publication status`);
      if (!Array.isArray(record.publication.restrictions)) errors.push(`${label}: restrictions must be an array`);
      if (!Array.isArray(record.publication.eligibleArtifacts)) errors.push(`${label}: eligibleArtifacts must be an array`);
      else for (const item of record.publication.eligibleArtifacts) {
        if (!ARTIFACTS.has(item)) errors.push(`${label}: invalid artifact ${item}`);
      }
      if (record.confidence === "unresolved") {
        if (record.publication.status !== "blocked") errors.push(`${label}: unresolved claims must have publication status blocked`);
        if (record.publication.eligibleArtifacts?.length) errors.push(`${label}: unresolved claims must have empty eligibleArtifacts`);
        if (record.publication.approvedWording !== null && record.publication.approvedWording !== "") {
          errors.push(`${label}: unresolved claims cannot have approvedWording`);
        }
      }
    }
    if (record.confidence === "verified" && !record.sources?.some((source) => object(source) && CORROBORATING.has(source.type))) {
      errors.push(`${label}: verified claims require a corroborating source`);
    }
    if (record.id === "rcm-adoption" && record.result?.kind === "current" && record.result?.value >= 1500) {
      errors.push("rcm-adoption: 1,500+ is a target, not current adoption");
    }
  });
  return errors;
}

function cli() {
  const ledgerPath = process.argv[2];
  if (!ledgerPath) throw new Error("Usage: node scripts/validate-evidence-ledger.mjs <ledger.json>");
  const ledger = JSON.parse(fs.readFileSync(path.resolve(ledgerPath), "utf8"));
  const errors = validateLedger(ledger);
  if (errors.length) {
    console.error(errors.map((error) => `- ${error}`).join("\n"));
    process.exitCode = 1;
  } else console.log(`Evidence ledger valid: ${ledger.records.length} records`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) cli();
