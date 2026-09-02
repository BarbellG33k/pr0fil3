export const AGENT_CLASSES = {
  BROWSER: "browser",
  SEARCH_ENGINE: "search-engine",
  AI_CRAWLER: "ai-crawler",
  SEO_TOOL: "seo-tool",
  SCRAPER: "scraper",
  AUTOMATION: "automation",
  EMPTY: "empty",
};

// Classes that get a hard 403 at the edge. Search engines and AI crawlers are
// deliberately NOT blocked - they drive Google and AI-search discoverability -
// but they are excluded from human view counts on the dashboard. Only
// unambiguous signatures are blocked so no real user is ever turned away.
export const HARD_BLOCKED_CLASSES = new Set([
  AGENT_CLASSES.SEO_TOOL,
  AGENT_CLASSES.SCRAPER,
]);

// Order matters: automation markers are checked first because headless browser
// UAs also contain ordinary browser tokens (e.g. HeadlessChrome ... Safari).
const SIGNATURES = [
  [
    AGENT_CLASSES.AUTOMATION,
    ["headlesschrome", "puppeteer", "playwright", "selenium", "phantomjs"],
  ],
  [
    AGENT_CLASSES.SEARCH_ENGINE,
    [
      "googlebot",
      "bingbot",
      "duckduckbot",
      "yandexbot",
      "applebot",
      "facebookexternalhit",
      "twitterbot",
      "linkedinbot",
    ],
  ],
  [
    AGENT_CLASSES.AI_CRAWLER,
    [
      "gptbot",
      "oai-searchbot",
      "claudebot",
      "claude-web",
      "perplexitybot",
      "gemini-google",
      "ccbot",
      "amazonbot",
      "bytespider",
      "cohere-ai",
    ],
  ],
  [
    AGENT_CLASSES.SEO_TOOL,
    [
      "ahrefsbot",
      "semrushbot",
      "mj12bot",
      "dotbot",
      "petalbot",
      "rogerbot",
      "screaming frog",
      "seokicks",
    ],
  ],
  [
    AGENT_CLASSES.SCRAPER,
    [
      "python-requests",
      "python-urllib",
      "go-http-client",
      "java/",
      "curl/",
      "wget/",
      "scrapy",
      "httpclient",
      "libwww-perl",
      "masscan",
      "zgrab",
    ],
  ],
];

export function classifyAgent(userAgent) {
  const ua = (userAgent || "").trim().toLowerCase();
  if (!ua) return AGENT_CLASSES.EMPTY;

  for (const [agentClass, signatures] of SIGNATURES) {
    if (signatures.some((signature) => ua.includes(signature))) {
      return agentClass;
    }
  }

  return AGENT_CLASSES.BROWSER;
}
