# Extract hardcoded worker.js config into environment variables

**Status: deferred (2026-09-02).** Analysis done, not implemented. Pick this up
as a standalone chore PR.

## Key constraint (verified against Cloudflare docs)

Plaintext vars set in the Cloudflare dashboard get reset the next time CI runs
`wrangler deploy` — the deploy uploads `vars` from wrangler.jsonc as the
authoritative set. wrangler.jsonc must therefore be the source of truth for
plaintext config; the dashboard stays for secrets only (CF_API_TOKEN already).

`vars` support strings AND JSON, so list values (blocklists) work natively
without comma-splitting. Values arrive on `env` in the handler.

## Plan

Add to wrangler.jsonc:

```jsonc
"vars": {
  "CONTACT_FROM_ADDRESS": "info@guillermosalas.dev",
  "CONTACT_TO_ADDRESS": "gsalast@gmail.com",
  "BLOCKED_COUNTRIES": ["RU", "CN"],
  "BLOCKED_AGENT_CLASSES": ["seo-tool", "scraper"]
}
```

Worker changes:

- handleContact: use `env.CONTACT_FROM_ADDRESS` / `env.CONTACT_TO_ADDRESS`;
  return 500 if either is missing (cannot email without them).
- fetch() gate: use `env.BLOCKED_COUNTRIES` and `env.BLOCKED_AGENT_CLASSES`;
  treat missing/malformed values as empty arrays (fail-open for availability;
  drift is impossible since vars deploy atomically with the code).
- handleAnalytics: `blockedCountries` response field comes from the env value.
- agent-classifier.mjs: keep `HARD_BLOCKED_CLASSES` as the default, but let
  the worker pass the env-driven set to the gate instead.

## Do NOT extract (structural, not config)

- `VARIANTS` — tied to asset filenames, cookie validation, dashboard card IDs,
  and analytics keys; adding a variant requires code regardless.
- `COOKIE_NAME`, `COOKIE_MAX_AGE` — protocol constants; renaming orphans
  existing cookies, no ops need to tune TTL.
- `BUILD_VERSION` — stamped by CI at deploy time; must stay a literal.
- UA signature tables in agent-classifier.mjs — classification logic.

## Caveat to set expectations

Even as vars, changing the blocklist still means editing wrangler.jsonc and
deploying (dashboard edits only survive until the next deploy). The win is
hygiene and visibility, not runtime hot-swapping.
