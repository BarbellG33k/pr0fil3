import assert from "node:assert/strict";
import test from "node:test";

import {
  AGENT_CLASSES,
  HARD_BLOCKED_CLASSES,
  classifyAgent,
} from "../agent-classifier.mjs";

const REAL_BROWSER_UAS = [
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:127.0) Gecko/20100101 Firefox/127.0",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1",
];

test("real browser user agents classify as browser", () => {
  for (const ua of REAL_BROWSER_UAS) {
    assert.equal(classifyAgent(ua), AGENT_CLASSES.BROWSER, ua);
  }
});

test("search engine user agents classify as search-engine", () => {
  assert.equal(
    classifyAgent("Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"),
    AGENT_CLASSES.SEARCH_ENGINE
  );
  assert.equal(
    classifyAgent("Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; bingbot/2.0) Chrome/116.0.1951.203 Safari/537.36"),
    AGENT_CLASSES.SEARCH_ENGINE
  );
  assert.equal(
    classifyAgent("facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)"),
    AGENT_CLASSES.SEARCH_ENGINE
  );
  assert.equal(
    classifyAgent("Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)"),
    AGENT_CLASSES.SEARCH_ENGINE
  );
});

test("AI crawler user agents classify as ai-crawler", () => {
  assert.equal(
    classifyAgent("Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.0; +https://openai.com/gptbot)"),
    AGENT_CLASSES.AI_CRAWLER
  );
  assert.equal(
    classifyAgent("Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)"),
    AGENT_CLASSES.AI_CRAWLER
  );
  assert.equal(
    classifyAgent("Mozilla/5.0 (compatible; CCBot/2.0; https://commoncrawl.org/faq/)"),
    AGENT_CLASSES.AI_CRAWLER
  );
  assert.equal(
    classifyAgent("Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 PerplexityBot/1.0"),
    AGENT_CLASSES.AI_CRAWLER
  );
});

test("SEO tool user agents classify as seo-tool", () => {
  assert.equal(
    classifyAgent("Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)"),
    AGENT_CLASSES.SEO_TOOL
  );
  assert.equal(
    classifyAgent("Mozilla/5.0 (compatible; SemrushBot/7~bl; +http://www.semrush.com/bot.html)"),
    AGENT_CLASSES.SEO_TOOL
  );
  assert.equal(
    classifyAgent("Mozilla/5.0 (compatible; MJ12bot/v1.4.8; http://mj12bot.com/)"),
    AGENT_CLASSES.SEO_TOOL
  );
});

test("scraper and library user agents classify as scraper", () => {
  assert.equal(classifyAgent("python-requests/2.31.0"), AGENT_CLASSES.SCRAPER);
  assert.equal(classifyAgent("python-urllib/3.11"), AGENT_CLASSES.SCRAPER);
  assert.equal(classifyAgent("curl/8.4.0"), AGENT_CLASSES.SCRAPER);
  assert.equal(classifyAgent("Wget/1.21.4"), AGENT_CLASSES.SCRAPER);
  assert.equal(classifyAgent("Go-http-client/1.1"), AGENT_CLASSES.SCRAPER);
  assert.equal(classifyAgent("Scrapy/2.11 (+https://scrapy.org)"), AGENT_CLASSES.SCRAPER);
});

test("automation user agents classify as automation", () => {
  assert.equal(
    classifyAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/125.0.0.0 Safari/537.36"),
    AGENT_CLASSES.AUTOMATION
  );
  assert.equal(classifyAgent("Puppeteer/22.0.0"), AGENT_CLASSES.AUTOMATION);
  assert.equal(classifyAgent("Playwright/1.44.0"), AGENT_CLASSES.AUTOMATION);
});

test("empty, missing, or whitespace-only user agents classify as empty", () => {
  assert.equal(classifyAgent(""), AGENT_CLASSES.EMPTY);
  assert.equal(classifyAgent(null), AGENT_CLASSES.EMPTY);
  assert.equal(classifyAgent(undefined), AGENT_CLASSES.EMPTY);
  assert.equal(classifyAgent("   "), AGENT_CLASSES.EMPTY);
});

test("classification is case-insensitive", () => {
  assert.equal(classifyAgent("PYTHON-REQUESTS/2.31.0"), AGENT_CLASSES.SCRAPER);
  assert.equal(classifyAgent("Mozilla/5.0 (compatible; GOOGLEBOT/2.1)"), AGENT_CLASSES.SEARCH_ENGINE);
});

test("hard-blocked classes are exactly seo-tool and scraper", () => {
  assert.deepEqual(
    [...HARD_BLOCKED_CLASSES].sort(),
    [AGENT_CLASSES.SCRAPER, AGENT_CLASSES.SEO_TOOL].sort()
  );
});
