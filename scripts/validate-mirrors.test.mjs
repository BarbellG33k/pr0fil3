import assert from "node:assert/strict";
import test from "node:test";
import { runChecks } from "./validate-mirrors.mjs";

test("embedded content mirrors stay deep-equal with JSON sources and scans stay clean", () => {
  const failures = runChecks();
  assert.deepStrictEqual(failures, [], "mirror/banned-string/link failures");
});
