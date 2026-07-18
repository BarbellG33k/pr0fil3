import assert from "node:assert/strict";
import test from "node:test";
import { validateLedger } from "./validate-evidence-ledger.mjs";

const record = {
  id: "experity-current-title",
  domain: "employment",
  subject: "Experity current title",
  claim: "VP, Software Engineering and Product Development",
  organization: "Experity",
  period: { start: "2023-03", end: null, asOf: "2026-07-18" },
  scope: { value: null, denominator: null, geography: [] },
  role: "Official current title",
  attribution: "held",
  collaborators: [],
  result: null,
  measurement: null,
  confidence: "verified",
  publication: {
    status: "public-safe",
    restrictions: [],
    approvedWording: "VP, Software Engineering and Product Development",
    eligibleArtifacts: ["executive-resume", "builder-resume", "portfolio"]
  },
  sources: [{ type: "owner-confirmation", reference: "Amp thread, 2026-07-18" }],
  conflicts: [],
  lastValidated: "2026-07-18"
};

const ledger = { schemaVersion: 1, subject: "Guillermo Salas", updatedAt: "2026-07-18", records: [record] };

test("accepts a complete ledger", () => assert.deepEqual(validateLedger(ledger), []));

test("rejects duplicate IDs", () => {
  assert.match(validateLedger({ ...ledger, records: [record, record] }).join("\n"), /duplicate id/);
});

test("blocks public wording for unresolved claims", () => {
  const unresolved = {
    ...record,
    id: "unresolved-title",
    confidence: "unresolved",
    publication: { ...record.publication, status: "blocked", approvedWording: "Disputed title" }
  };
  assert.match(validateLedger({ ...ledger, records: [unresolved] }).join("\n"), /unresolved.*approvedWording/);
});

test("requires corroboration for verified claims", () => {
  const unsupported = {
    ...record,
    id: "unsupported-claim",
    sources: [{ type: "owner-recollection", reference: "Memory only" }]
  };
  assert.match(validateLedger({ ...ledger, records: [unsupported] }).join("\n"), /verified.*corroborating source/);
});

test("rejects RCM target as current adoption", () => {
  const rcm = {
    ...record,
    id: "rcm-adoption",
    domain: "product-adoption",
    result: { value: 1500, unit: "clinics", kind: "current" }
  };
  assert.match(validateLedger({ ...ledger, records: [rcm] }).join("\n"), /target/);
});
