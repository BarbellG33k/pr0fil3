import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const root = new URL("../", import.meta.url);
const data = JSON.parse(await readFile(new URL("resume-content.json", root), "utf8"));
const source = await readFile(new URL("resume-export.js", root), "utf8");
const context = { window: {} };
vm.runInNewContext(source, context);

const { normalize, buildTXT, buildXML } = context.window.ResumeExport._test;
const workdayForbidden = /[\[\]{}<>/]/;

for (const variant of ["executive", "builder"]) {
  test(`${variant} ATS experience contains only real jobs and achievements`, () => {
    const resume = normalize(data, variant, false);
    const jobText = resume.jobs.flatMap(job => job.bullets).join("\n");

    assert.equal(resume.jobs.some(job => job.company === "Early Career"), false);
    assert.equal(jobText.includes("##"), false);
    assert.equal(jobText.toLowerCase().includes("role progression"), false);
    assert.equal(jobText.includes("Promoted three times in three years"), false);
    assert.equal(jobText.includes("Three promotions in three years"), false);
    assert.ok(resume.jobs.every(job => job.company && job.title && job.period));
    assert.ok(resume.jobs.every(job => job.bullets.length > 0));
    assert.equal(workdayForbidden.test(resume.headline), false);
    assert.equal(workdayForbidden.test(resume.summary), false);
    assert.ok(resume.jobs.every(job => !workdayForbidden.test(job.title)));
    assert.ok(resume.jobs.every(job => job.bullets.every(b => !workdayForbidden.test(b))));
    assert.ok(resume.skills.every(group =>
      !workdayForbidden.test(group.category) &&
      group.items.every(item => !workdayForbidden.test(item))
    ));

    if (variant === "executive") {
      for (const company of [
        "RAIR Technologies",
        "Zywave",
        "AQS, Inc.",
        "Markel American Insurance",
        "IHS, Inc."
      ]) {
        assert.ok(resume.jobs.some(job => job.company === company), company);
      }
      assert.ok(resume.jobs
        .filter(job => ["RAIR Technologies", "Zywave", "AQS, Inc."].includes(job.company))
        .every(job => job.careerStage === "early"));
      assert.ok(resume.jobs
        .filter(job => job.company === "Experity")
        .every(job => job.careerStage === "current"));
    }
  });

  test(`${variant} ATS text and XML preserve job descriptions`, () => {
    const resume = normalize(data, variant, false);
    const txt = buildTXT(resume);
    const xml = buildXML(resume);

    assert.equal((xml.match(/<EmployerOrg>/g) || []).length, resume.jobs.length);
    assert.equal((xml.match(/<Description>/g) || []).length, resume.jobs.length);
    assert.equal(txt.includes("Role Progression"), false);
    assert.equal(xml.includes("Role Progression"), false);
    assert.equal(
      txt.includes("EARLY CAREER"),
      variant === "executive"
    );
    assert.equal(txt.includes("EARLY CAREER EXPERIENCE"), false);
    assert.equal(txt.includes("RHP Consulting Partners"), false);
    assert.equal(txt.includes("Lakewood Technologies"), false);
    assert.equal(
      txt.includes("Foundational Software Engineering & Consulting Roles"),
      false
    );

    for (const job of resume.jobs) {
      assert.ok(txt.includes(job.company), job.company);
      assert.ok(txt.includes(job.bullets[0].split(/\s+/).slice(0, 6).join(" ")), job.company);
    }
  });
}
