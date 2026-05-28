# Contact Form Worker

## Goal

Wire every portfolio contact form to a Cloudflare Worker that sends an email to
`gsalast@gmail.com` via Cloudflare Email Routing whenever someone submits a request.

## Architecture

```
Browser POST /contact
    └─> Cloudflare Worker (worker.js)
            └─> send_email binding
                    └─> Cloudflare Email Routing
                            └─> gsalast@gmail.com
```

Static assets (HTML/SVG/JSON) continue to be served directly by Workers Assets.

---

## Domain & DNS Setup (guillermosalas.dev / guillermosalas.net)

### 1. Add Domains to Cloudflare
1. Cloudflare Dashboard → "Add a site" → `guillermosalas.dev`
2. Select Free plan
3. Note the assigned nameservers (e.g., `aria.ns.cloudflare.com`, `todd.ns.cloudflare.com`)
4. Repeat for `guillermosalas.net`

### 2. Point Namecheap DNS to Cloudflare
1. Namecheap Dashboard → Domain List → `guillermosalas.dev` → Manage
2. Under "Nameservers" → select "Custom DNS"
3. Enter the two Cloudflare nameservers
4. Repeat for `.net`
5. Wait for propagation (5-30 min typical, up to 24h)

### 3. Enable Email Routing
1. Dashboard → **guillermosalas.dev** (or whichever zone sends email) → **Email** → **Email Routing**
2. Toggle Email Routing **on**
3. Under **Destination addresses** → **Add address** → enter `gsalast@gmail.com`
4. Check your inbox and click the verification link Cloudflare sends

### 4. Verify in Cloudflare
- Once nameservers propagate, Cloudflare shows the zone as "Active"
- The Worker's `routes` in `wrangler.jsonc` will automatically create DNS records on deploy

---

## One-Time Setup

### Create an API Token for CI/CD
1. Dashboard → **My Profile** → **API Tokens** → **Create Token**
2. Use template **"Edit Cloudflare Workers"**
3. Scope: your account + the `profile` Worker
4. Copy the token value

### Add GitHub Secrets
Repo (`BarbellG33k/pr0fil3`) → **Settings** → **Secrets and variables** → **Actions** → **New secret**:

| Secret name | Value |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Token from above |
| `CLOUDFLARE_ACCOUNT_ID` | Your account ID (right sidebar on any zone's Overview page) |

---

## Email Values

| Field | Value |
|---|---|
| From | `info@factor317.com` |
| To | `gsalast@gmail.com` |

---

## Form Fields Captured

| HTML `name` | Label shown |
|---|---|
| `name` | Full Name / Full_Name |
| `email` | Email / Email_Address |
| `phone` | Phone / Phone_Number |
| `subject` | Subject / Subject_Line |
| `page` | _(hidden — identifies which portfolio page)_ |

## Sample Email Received

```
From: Portfolio Contact <info@factor317.com>
To: gsalast@gmail.com
Subject: Portfolio contact from Jane Smith

Contact request submitted via online portfolio

Name:    Jane Smith
Email:   jane@example.com
Phone:   +1 (555) 123-4567
Message: Interested in discussing a CTO opportunity
Source:  portfolio-nova
```

---

## Local Development

```bash
npm install
npx wrangler dev
```

The Worker runs at `http://localhost:8787`. Form submissions will hit `/contact`
and routing/redirect logic works locally, but `send_email` is not available in
the local dev environment — you'll see a 500 if you actually submit. Use
`wrangler tail` in production to verify live sends.

---

## Deployment

Automatic on every push to `main` via `.github/workflows/deploy.yml`.

Manual deploy:
```bash
npx wrangler deploy
```

## Deployment Checklist (first time on new domains)

- [ ] Domains added to Cloudflare (zones active)
- [ ] Namecheap nameservers updated to Cloudflare's
- [ ] Email Routing enabled on the zone with destination verified
- [ ] `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in GitHub secrets
- [ ] Deploy: `npx wrangler deploy` or push to main
- [ ] Verify: `curl -X POST https://guillermosalas.dev/contact -d "name=Test&email=test@test.com&phone=000&subject=validation&page=test"`
- [ ] Check inbox for the test email
