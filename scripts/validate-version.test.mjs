import assert from "node:assert/strict";
import { execSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const root = new URL("../", import.meta.url);

test("index.html contains visible build version badge element without hidden attribute", async () => {
  const indexHtml = await readFile(new URL("index.html", root), "utf8");

  // Verify the badge element exists with the required class and ID
  assert.match(indexHtml, /class="[^"]*build-version-badge[^"]*"/, "Badge class must exist in index.html");
  assert.match(indexHtml, /id="build-version"/, "Element with id 'build-version' must exist");

  // Verify the element is NOT hidden by default (regression check for PR #41 / commit 18c6dfc)
  const badgeTagMatch = indexHtml.match(/<div[^>]*id="build-version"[^>]*>/);
  assert.ok(badgeTagMatch, "Must find build-version div tag");
  assert.equal(
    badgeTagMatch[0].includes(" hidden"),
    false,
    "build-version badge must not have the 'hidden' attribute; it must remain visible in HTML"
  );

  // Verify data-static placeholder exists
  assert.match(indexHtml, /data-static="BUILD_VERSION_PLACEHOLDER"/, "data-static placeholder must exist");
});

test("worker.js contains BUILD_VERSION placeholder and /api/version route", async () => {
  const workerJs = await readFile(new URL("worker.js", root), "utf8");

  assert.match(workerJs, /const\s+BUILD_VERSION\s*=\s*"BUILD_VERSION_PLACEHOLDER";/);
  assert.match(workerJs, /url\.pathname\s*===\s*["']\/api\/version["']/);
  assert.match(workerJs, /function\s+handleVersion\s*\(/);
});

test("stamp-version script replaces placeholder with short SHA and date in both index.html and worker.js", async () => {
  // Read untracked / initial content
  const initialIndex = await readFile(new URL("index.html", root), "utf8");
  const initialWorker = await readFile(new URL("worker.js", root), "utf8");

  assert.ok(initialIndex.includes("BUILD_VERSION_PLACEHOLDER"));
  assert.ok(initialWorker.includes("BUILD_VERSION_PLACEHOLDER"));

  try {
    // Run stamp script
    execSync("bash scripts/stamp-version.sh", { cwd: new URL(".", root).pathname });

    const stampedIndex = await readFile(new URL("index.html", root), "utf8");
    const stampedWorker = await readFile(new URL("worker.js", root), "utf8");

    // Must no longer contain the raw placeholder
    assert.equal(stampedIndex.includes("BUILD_VERSION_PLACEHOLDER"), false, "index.html must not contain placeholder after stamp");
    assert.equal(stampedWorker.includes("BUILD_VERSION_PLACEHOLDER"), false, "worker.js must not contain placeholder after stamp");

    // Must match short SHA + date pattern: <sha> - <Mon DD, YYYY HH:MM UTC>
    const versionPattern = /[0-9a-f]{7,8}\s*-\s*[A-Z][a-z]{2}\s+\d{2},\s+\d{4}\s+\d{2}:\d{2}\s+UTC/;
    assert.match(stampedIndex, versionPattern, "stamped index.html must match version string pattern");
    assert.match(stampedWorker, versionPattern, "stamped worker.js must match version string pattern");

    // The text content of the badge in index.html must contain the stamped version string
    const stampedBadgeMatch = stampedIndex.match(/<div[^>]*id="build-version"[^>]*>([^<]*)<\/div>/);
    assert.ok(stampedBadgeMatch, "Must find stamped badge div with text content");
    assert.match(stampedBadgeMatch[1], versionPattern, "Badge text content must contain stamped version");
  } finally {
    // Always restore saved content
    await writeFile(new URL("index.html", root), initialIndex, "utf8");
    await writeFile(new URL("worker.js", root), initialWorker, "utf8");
  }
});

test("package.json ensures deploy cannot run without stamping version", async () => {
  const pkg = JSON.parse(await readFile(new URL("package.json", root), "utf8"));

  assert.ok(pkg.scripts["stamp-version"], "package.json must have stamp-version script");
  // Ensure predeploy or deploy runs stamp-version to prevent accidental unstamped deploys
  const hasPredeployStamp = typeof pkg.scripts.predeploy === "string" && pkg.scripts.predeploy.includes("stamp-version");
  const hasDeployStamp = typeof pkg.scripts.deploy === "string" && pkg.scripts.deploy.includes("stamp-version");
  assert.ok(
    hasPredeployStamp || hasDeployStamp,
    "package.json must ensure stamp-version is executed on deploy (via predeploy or deploy script)"
  );
});

// The npm predeploy hook only guards `npm run deploy`. A bare
// `npx wrangler deploy` bypasses it entirely and publishes the literal
// placeholder - which is how a stale build indicator reached production. The
// wrangler build hook is the guard that covers every wrangler entry point.
test("wrangler.jsonc stamps the build version on every wrangler invocation", async () => {
  // Asserted against the raw text rather than JSON.parse: wrangler.jsonc is
  // JSONC and carries trailing commas, which JSON.parse rejects.
  const raw = await readFile(new URL("wrangler.jsonc", root), "utf8");

  const buildBlock = raw.match(/"build"\s*:\s*\{[^}]*\}/);
  assert.ok(buildBlock, "wrangler.jsonc must declare a build hook");
  assert.match(
    buildBlock[0],
    /"command"\s*:\s*"[^"]*stamp-version[^"]*"/,
    "wrangler build.command must run stamp-version so no deploy path can skip it"
  );
});

test("stamp-version.sh fails the build if the placeholder survives", async () => {
  const script = await readFile(new URL("scripts/stamp-version.sh", root), "utf8");

  assert.match(
    script,
    /REMAINING=/,
    "stamp-version.sh must re-check for the placeholder after stamping"
  );
  assert.match(
    script,
    /exit 1/,
    "stamp-version.sh must exit non-zero when the placeholder survives"
  );
});

test("/api/version is served ahead of the traffic-quality gate", async () => {
  const workerJs = await readFile(new URL("worker.js", root), "utf8");

  const versionRoute = workerJs.indexOf('url.pathname === "/api/version"');
  const gate = workerJs.indexOf("BLOCKED_COUNTRIES.includes");

  assert.ok(versionRoute > -1, "worker.js must route /api/version");
  assert.ok(gate > -1, "worker.js must apply the traffic-quality gate");
  assert.ok(
    versionRoute < gate,
    "/api/version must be handled before the gate so CI and uptime monitors " +
      "can verify the live build without spoofing a browser User-Agent"
  );
});

test("index.html runtime script updates badge text properly without hiding it", async () => {
  const indexHtml = await readFile(new URL("index.html", root), "utf8");

  // Extract the version badge resolver script from index.html
  const scriptMatch = indexHtml.match(/\/\/ Build version badge[\s\S]*?\(function\(\)\s*\{([\s\S]*?)\}\)\(\);/);
  assert.ok(scriptMatch, "Must find build version badge script in index.html");
  const scriptBody = `(function() { ${scriptMatch[1]} })();`;

  // Case 1: Local preview unstamped -> fallback to dev (local)
  {
    const el = {
      textContent: "BUILD_VERSION_PLACEHOLDER",
      attributes: { "data-static": "BUILD_VERSION_PLACEHOLDER" },
      getAttribute(name) { return this.attributes[name]; },
      hidden: false,
    };
    const sandbox = {
      document: { getElementById: (id) => (id === "build-version" ? el : null) },
      window: { location: { protocol: "http:", hostname: "localhost" } },
      fetch: () => Promise.resolve({ ok: true, json: () => Promise.resolve({ version: "BUILD_VERSION_PLACEHOLDER" }) }),
    };
    vm.runInNewContext(scriptBody, sandbox);
    assert.equal(el.textContent, "dev (local)");
    assert.equal(el.hidden, false);
  }

  // Case 2: Stamped statically -> displays static value
  {
    const el = {
      textContent: "08bae2a - Aug 31, 2026 01:32 UTC",
      attributes: { "data-static": "08bae2a - Aug 31, 2026 01:32 UTC" },
      getAttribute(name) { return this.attributes[name]; },
      hidden: false,
    };
    const sandbox = {
      document: { getElementById: (id) => (id === "build-version" ? el : null) },
      window: { location: { protocol: "https:", hostname: "guillermosalas.dev" } },
      fetch: () => Promise.resolve({ ok: true, json: () => Promise.resolve({ version: "BUILD_VERSION_PLACEHOLDER" }) }),
    };
    vm.runInNewContext(scriptBody, sandbox);
    // API returning placeholder should NOT clobber the valid static value
    assert.equal(el.textContent, "08bae2a - Aug 31, 2026 01:32 UTC");
    assert.equal(el.hidden, false);
  }

  // Case 3: API returns fresh stamped value -> updates to API value
  {
    const el = {
      textContent: "old1234 - Aug 01, 2026 00:00 UTC",
      attributes: { "data-static": "old1234 - Aug 01, 2026 00:00 UTC" },
      getAttribute(name) { return this.attributes[name]; },
      hidden: false,
    };
    let resolveApi;
    const fetchPromise = new Promise((resolve) => { resolveApi = resolve; });
    const sandbox = {
      document: { getElementById: (id) => (id === "build-version" ? el : null) },
      window: { location: { protocol: "https:", hostname: "guillermosalas.dev" } },
      fetch: () => fetchPromise,
    };
    vm.runInNewContext(scriptBody, sandbox);
    assert.equal(el.textContent, "old1234 - Aug 01, 2026 00:00 UTC");
    resolveApi({ ok: true, json: () => Promise.resolve({ version: "new5678 - Sep 02, 2026 12:00 UTC" }) });
    await new Promise((r) => setTimeout(r, 10));
    assert.equal(el.textContent, "new5678 - Sep 02, 2026 12:00 UTC");
    assert.equal(el.hidden, false);
  }
});
