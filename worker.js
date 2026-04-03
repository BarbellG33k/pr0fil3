import { EmailMessage } from "cloudflare:email";

const FROM_ADDRESS = "info@factor317.com";
const TO_ADDRESS = "gsalast@mail.com";

const VARIANTS = ["herald", "cipher", "ember"];
const COOKIE_NAME = "pv";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

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

    return env.ASSETS.fetch(request);
  },
};

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

    const [impressionsRes, contactsRes, dailyRes] = await Promise.all([
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
    ]);

    const impressionsData = await impressionsRes.json();
    const contactsData = await contactsRes.json();
    const dailyData = await dailyRes.json();

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

    const result = { impressions, contacts, daily };

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

    // Log contact conversion to Analytics Engine
    if (env.ANALYTICS) {
      env.ANALYTICS.writeDataPoint({
        blobs: ["contact", page],
        indexes: [page],
      });
    }

    const rawEmail = [
      `MIME-Version: 1.0`,
      `From: Portfolio Contact <${FROM_ADDRESS}>`,
      `To: ${TO_ADDRESS}`,
      `Subject: Portfolio contact from ${name}`,
      `Content-Type: text/plain; charset=utf-8`,
      ``,
      `Contact request submitted via online portfolio`,
      ``,
      `Name:    ${name}`,
      `Email:   ${email}`,
      `Phone:   ${phone}`,
      `Message: ${subject}`,
      `Source:  ${page}`,
    ].join("\r\n");

    const message = new EmailMessage(FROM_ADDRESS, TO_ADDRESS, rawEmail);
    await env.SEND_EMAIL.send(message);

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
