import { EmailMessage } from "cloudflare:email";

const FROM_ADDRESS = "info@factor317.com";
const TO_ADDRESS = "gsalast@mail.com";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/contact" && request.method === "POST") {
      return handleContact(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};

async function handleContact(request, env) {
  try {
    const fd = await request.formData();
    const name    = (fd.get("name")    ?? "").trim() || "(not provided)";
    const email   = (fd.get("email")   ?? "").trim() || "(not provided)";
    const phone   = (fd.get("phone")   ?? "").trim() || "(not provided)";
    const subject = (fd.get("subject") ?? "").trim() || "(not provided)";
    const page    = (fd.get("page")    ?? "").trim() || "portfolio";

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
