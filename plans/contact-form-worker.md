# Contact Form Worker

## Goal

Wire every portfolio contact form to a Cloudflare Worker that sends an email to
`gsalast@mail.com` via Cloudflare Email Routing whenever someone submits a request.

## Architecture

```
Browser POST /contact
    └─> Cloudflare Worker (worker.js)
            └─> send_email binding
                    └─> Cloudflare Email Routing
                            └─> gsalast@mail.com
```

Static assets (HTML/SVG/JSON) continue to be served directly by Workers Assets.

---

## One-Time Cloudflare Dashboard Setup

### 1. Enable Email Routing for factor317.com
1. Dashboard → **factor317.com** → **Email** → **Email Routing**
2. Toggle Email Routing **on**
3. Under **Destination addresses** → **Add address** → enter `gsalast@mail.com`
4. Check your inbox and click the verification link Cloudflare sends

### 2. Create an API Token for CI/CD
1. Dashboard → **My Profile** → **API Tokens** → **Create Token**
2. Use template **"Edit Cloudflare Workers"**
3. Scope: your account + the `profile` Worker
4. Copy the token value

### 3. Add GitHub Secrets
Repo (`BarbellG33k/pr0fil3`) → **Settings** → **Secrets and variables** → **Actions** → **New secret**:

| Secret name | Value |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Token from step 2 |
| `CLOUDFLARE_ACCOUNT_ID` | Your account ID (right sidebar on any zone's Overview page) |

---

## Files Created / Modified

| File | Change |
|---|---|
| `worker.js` | New — Worker entry point, handles `POST /contact` |
| `wrangler.jsonc` | Add `main` entry point + `send_email` binding |
| `package.json` | New — pins `wrangler` for local dev |
| `.github/workflows/deploy.yml` | New — auto-deploy on push to `main` |
| `portfolio-nova.html` | Form: added action, email + phone fields, name attrs |
| `portfolio-apex.html` | Form: added action, email + phone fields, name attrs |
| `executive_portfolio_herald.html` | Form: added action, email + phone fields, name attrs |
| `executive_portfolio_cipher.html` | Form: added action, email + phone fields, name attrs |
| `executive_portfolio_ember.html` | Form: added action, email + phone fields, name attrs |

---

## Email Values

| Field | Value |
|---|---|
| From | `info@factor317.com` |
| To | `gsalast@mail.com` |

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
To: gsalast@mail.com
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
