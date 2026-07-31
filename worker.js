import { EmailMessage } from "cloudflare:email";

const FROM_ADDRESS = "info@guillermosalas.dev";
const TO_ADDRESS = "gsalast@gmail.com";

const VARIANTS = ["herald", "cipher", "ember"];
const COOKIE_NAME = "pv";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

// Stamped by scripts/stamp-version.sh in CI immediately before `wrangler
// deploy`, and served at runtime from /api/version. Serving it from the Worker
// rather than from stamped HTML means an edge-cached index.html can no longer
// pin the badge to a stale value. Stays as the literal placeholder in git - see
// the "Versioning" section in readme.md.
const BUILD_VERSION = "BUILD_VERSION_PLACEHOLDER";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/contact" && request.method === "POST") {
      return handleContact(request, env);
    }

    if (url.pathname === "/portfolio") {
      return handlePortfolio(request, env);
    }

    if (url.pathname === "/admin") {
      const assetUrl = new URL("/admin-dashboard.html", request.url);
      return env.ASSETS.fetch(new Request(assetUrl, request));
    }

    if (url.pathname === "/api/analytics") {
      return handleAnalytics(env);
    }

    if (url.pathname === "/api/version") {
      return handleVersion();
    }

    return env.ASSETS.fetch(request);
  },
};

function handleVersion() {
  return new Response(JSON.stringify({ version: BUILD_VERSION }), {
    headers: {
      "Content-Type": "application/json",
      // Never cache - the badge must reflect the deployment actually running.
      "Cache-Control": "no-store, must-revalidate",
    },
  });
}

function parseVariantCookie(request) {
  const cookieHeader = request.headers.get("Cookie") || "";
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]+)`));
  const value = match ? match[1] : null;
  return VARIANTS.includes(value) ? value : null;
}

function pickVariant() {
  return VARIANTS[Math.floor(Math.random() * VARIANTS.length)];
}

async function handlePortfolio(request, env) {
  let variant = parseVariantCookie(request);
  let isNew = false;

  if (!variant) {
    variant = pickVariant();
    isNew = true;
  }

  // Log impression to Analytics Engine
  if (env.ANALYTICS) {
    env.ANALYTICS.writeDataPoint({
      blobs: ["impression", variant],
      indexes: [variant],
    });
  }

  // Fetch the variant's HTML from static assets
  const assetUrl = new URL(`/executive_portfolio_${variant}.html`, request.url);
  const assetRequest = new Request(assetUrl, request);
  const response = await env.ASSETS.fetch(assetRequest);

  // Clone response so we can set headers
  const newResponse = new Response(response.body, response);

  if (isNew) {
    newResponse.headers.append(
      "Set-Cookie",
      `${COOKIE_NAME}=${variant}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`
    );
  }

  return newResponse;
}

async function handleAnalytics(env) {
  try {
    if (!env.CF_API_TOKEN || !env.CF_ACCOUNT_ID) {
      return new Response(
        JSON.stringify({ error: "Missing CF_API_TOKEN or CF_ACCOUNT_ID environment variables" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const endpoint = `https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}/analytics_engine/sql`;
    const headers = {
      Authorization: `Bearer ${env.CF_API_TOKEN}`,
      "Content-Type": "text/plain",
    };

    const [impressionsRes, contactsRes, dailyRes, byCountryRes, topIspsRes] = await Promise.all([
      fetch(endpoint, {
        method: "POST",
        headers,
        body: `SELECT blob2 as variant, count() as count FROM portfolio WHERE blob1 = 'impression' GROUP BY variant ORDER BY variant`,
      }),
      fetch(endpoint, {
        method: "POST",
        headers,
        body: `SELECT blob2 as variant, count() as count FROM portfolio WHERE blob1 = 'contact' GROUP BY variant ORDER BY variant`,
      }),
      fetch(endpoint, {
        method: "POST",
        headers,
        body: `SELECT toDate(timestamp) as date, blob2 as variant, count() as count FROM portfolio WHERE blob1 = 'impression' AND timestamp > NOW() - INTERVAL '30' DAY GROUP BY date, variant ORDER BY date, variant`,
      }),
      fetch(endpoint, {
        method: "POST",
        headers,
        body: `SELECT blob3 as country, count() as count FROM portfolio WHERE blob1 = 'contact' GROUP BY country ORDER BY count DESC`,
      }),
      fetch(endpoint, {
        method: "POST",
        headers,
        body: `SELECT blob4 as asn, blob5 as isp, count() as count FROM portfolio WHERE blob1 = 'contact' GROUP BY asn, isp ORDER BY count DESC LIMIT 10`,
      }),
    ]);

    const impressionsData = await impressionsRes.json();
    const contactsData = await contactsRes.json();
    const dailyData = await dailyRes.json();
    const byCountryData = await byCountryRes.json();
    const topIspsData = await topIspsRes.json();

    const impressions = { herald: 0, cipher: 0, ember: 0 };
    for (const row of impressionsData.data || []) {
      if (row.variant in impressions) {
        impressions[row.variant] = Number(row.count);
      }
    }

    const contacts = { herald: 0, cipher: 0, ember: 0 };
    for (const row of contactsData.data || []) {
      const variant = row.variant.replace("portfolio-", "");
      if (variant in contacts) {
        contacts[variant] = Number(row.count);
      }
    }

    const daily = (dailyData.data || []).map((row) => ({
      date: row.date,
      variant: row.variant,
      impressions: Number(row.count),
      contacts: 0,
    }));

    const contactsByCountry = {};
    for (const row of byCountryData.data || []) {
      if (row.country) contactsByCountry[row.country] = Number(row.count);
    }

    const topIsps = (topIspsData.data || []).map((row) => ({
      asn: row.asn,
      isp: row.isp,
      count: Number(row.count),
    }));

    const result = { impressions, contacts, contactsByCountry, topIsps, daily };

    return new Response(JSON.stringify(result), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    console.error("Analytics error:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch analytics" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

async function handleContact(request, env) {
  try {
    const fd = await request.formData();
    const name    = (fd.get("name")    ?? "").trim() || "(not provided)";
    const email   = (fd.get("email")   ?? "").trim() || "(not provided)";
    const phone   = (fd.get("phone")   ?? "").trim() || "(not provided)";
    const subject = (fd.get("subject") ?? "").trim() || "(not provided)";
    const page    = (fd.get("page")    ?? "").trim() || "portfolio";

    // Edge-provided request metadata (free, in-process). request.cf is
    // populated in the deployed Worker / `wrangler dev --remote`, not the
    // dashboard Playground preview.
    const cf = request.cf || {};
    const ip        = request.headers.get("CF-Connecting-IP") || "(unknown)";
    const country   = cf.country || "??";
    const asn       = cf.asn ? `AS${cf.asn}` : "(unknown)";
    const isp       = cf.asOrganization || "(unknown)";
    const city      = cf.city || "(unknown)";
    const region    = cf.region || "(unknown)";
    const colo      = cf.colo || "(unknown)";
    const latitude  = cf.latitude || "(unknown)";
    const longitude = cf.longitude || "(unknown)";
    const timezone  = cf.timezone || "(unknown)";

    const rawEmail = [
      `MIME-Version: 1.0`,
      `From: Portfolio Contact <${FROM_ADDRESS}>`,
      `To: ${TO_ADDRESS}`,
      `Subject: [${country}] Portfolio contact from ${name}`,
      `Content-Type: text/plain; charset=utf-8`,
      ``,
      `Contact request submitted via online portfolio`,
      ``,
      `Name:    ${name}`,
      `Email:   ${email}`,
      `Phone:   ${phone}`,
      `Message: ${subject}`,
      `Source:  ${page}`,
      ``,
      `--- Submission metadata ---`,
      `IP:        ${ip}`,
      `Country:   ${country} (${city}, ${region})`,
      `ASN/ISP:   ${asn} / ${isp}`,
      `Edge colo: ${colo}`,
      `Location:  ${latitude}, ${longitude}`,
      `Timezone:  ${timezone}`,
    ].join("\r\n");

    const message = new EmailMessage(FROM_ADDRESS, TO_ADDRESS, rawEmail);
    await env.SEND_EMAIL.send(message);

    // Count the contact only after the email send is accepted. Store
    // aggregable geo/ASN dims for the dashboard; full IP/lat/long/timezone
    // stay in the email only (lower aggregation value, more PII).
    if (env.ANALYTICS) {
      env.ANALYTICS.writeDataPoint({
        blobs: ["contact", page, country, asn, isp, city, region, colo],
        indexes: [page],
      });
    }

    const referer = request.headers.get("Referer") ?? "/";
    return Response.redirect(referer, 303);
  } catch (err) {
    console.error("Contact form error:", err);
    return new Response("Failed to send. Please try again.", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
}
