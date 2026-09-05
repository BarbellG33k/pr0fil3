# Project Notes — pr0fil3

Guillermo Salas's executive portfolio / resume site plus supporting source material
(`sources/`) and evidence extractions.

## Anonymization rule (applies to all generated output)

Sources and documentation (e.g., `sources/confluence-leadership/`, raw extractions,
provenance indexes) may contain specifics: identities, company names, team names,
internal initiative codenames, dates, and source artifacts.

Any generated output intended for sharing or publication — resume content, portfolio
case studies, supporting use cases and frameworks — must NEVER mention a company or
individual by name. Anonymize through role/general terms ("the organization", "the
Principal Engineer", "the Senior Engineering Manager", "a Team/Technical Lead", "an
offshore office", "an internal development team", "an offshore contract team", "a key
customer"). Specific team names and internal initiative/product codenames are included
in the anonymization effort. The executive himself (Guillermo Salas) is the record's
subject and may be named.

Goal: guarantee anonymity and protect IP, reputation, and internal culture dynamics.

Practical pattern (used by `evidence-extraction-salas-2026-09-03/`):
- Publication-facing files cite sources via neutral ref codes (`1:1-A/2026-05-18`, `TEAM/2026-05-20`).
- The code→real-file/name mapping lives in a single file clearly marked
  `INTERNAL-provenance.md` (DO NOT SHARE), kept out of anything published.

## Lint / verify

- `npm test` — 27 tests (evidence-ledger, resume-export, version stamping, embedded-mirror sync).
- `npm run validate:evidence` — validates `.private/evidence-ledger.json` (needs the local file).
- `node scripts/validate-mirrors.mjs` — standalone mirror + banned-string check (also runs in `npm test`).
- `node scripts/slop-scan.mjs [--strict] [files...]` — word-list slop scan (report-only unless `--strict`; pre-existing owner-voice hits like `leverage` are accepted).
- `node scripts/dup-scan.mjs [--cross] [--strict]` — near-duplication scan (within-file by default).
- Portfolio pages are static HTML/JS; render-verify via `npm run dev` or `file://` (fetch failures fall back to hardcoded grids — expected locally).
