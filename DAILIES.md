# pr0fil3 — Dailies / Changelog

A running log of changes to Guillermo's resume and portfolio site.

---

## 2026-05-27 (cont.) → 2026-05-28 — Domain Migration & Portfolio Polish

### Domain Migration: guillermosalas.dev (LIVE)
- Set up Cloudflare DNS: MX (route1/2/3.mx.cloudflare.net), SPF, CNAME apex → profile.gsalast.workers.dev
- Updated worker.js FROM_ADDRESS from info@factor317.com → info@guillermosalas.dev
- Deployed Worker and successfully bound to custom domain guillermosalas.dev
- Removed .net routes from wrangler.jsonc (to be configured later)
- Site now serving at https://guillermosalas.dev and https://www.guillermosalas.dev

### Contact Form UX Enhancements
- Added email field validation with regex and inline error display
- Added phone input masking: +nn (nnn) nnn-nnnn on all portfolio forms
- Submit button now shows "Sending..." + disabled state during submission
- Added success/error message display via fetch-based POST (no page redirect)
- Copyright year made dynamic via JavaScript (current year) across all portfolio pages

### Experience Section Rewrites
- Removed specific customer names (AFC, OnePacs) — abstracted as "enterprise healthcare customers", "acquired engineering team"
- Removed tactical incident details (AFC latency failures 6%→0%, FDA audit remediation, Jenkins→CircleCI migration)
- Rewrote descriptions with broader, higher-level lens: capabilities, competencies, leadership style
- Varied sentence starts (Architected, Designed, Directed, Championed, Shaped, Guided) — eliminated repetitive "Led" on every entry
- Applied consistently across all portfolio variants (cipher, ember, herald, nova, apex)

## 2026-05-27 (cont.) — Domain Infrastructure

### Domain Configuration: guillermosalas.dev / guillermosalas.net
- Added `routes` with `custom_domain: true` in wrangler.jsonc for both domains + www
- Domains purchased on Namecheap — need nameservers pointed to Cloudflare
- Updated contact-form-worker.md plan with full deployment checklist
- Email sending remains Cloudflare Email Routing (send_email binding)

### Attribution Corrections
- Architecture Hub: "Built" → "Coached and guided architecture leadership toward building" — injected Well-Architected Framework concept over time
- Platform Modernization: "Drove/Delivered" → "Championed and drove... through thought leadership and architectural guidance"

---

## 2026-05-27 — Executive Profile Overhaul & Portfolio Redesign

### Summary Rewrite
- Rewrote the profile/summary to reflect full career arc (solutions architecture → enterprise architecture → VP engineering → AI transformation leader) instead of being a compressed version of the Experity experience section
- Removed PE-environment details and org-size specifics from the summary (those belong in the experience detail)
- Added acknowledgment of Fortune 500 consulting, regulated fintech, and enterprise SaaS background

### Resume Content Tightened
- Consolidated Experity experience from ~24 verbose bullets to ~12 focused ones
- Kept the 5 section structure (AI-First, GCC & Team Scaling, M&A Integration, Platform Modernization, Organizational Leadership)
- Detail now lives in portfolio Strategic Initiatives section, not repeated in the resume

### Attribution Corrections
- Architecture Hub: Changed "Built" to "Coached and guided architecture leadership toward building" — accurately reflects role as the thought leader who injected the Well-Architected Framework concept over time
- Platform Modernization: Changed "Drove" to "Championed and drove... through thought leadership and architectural guidance" — accurately reflects influencer/driver role, not hands-on builder

### Portfolio Redesign — Brandon-Style Strategic Initiatives
- Added a full "Strategic Initiatives" section to all three executive portfolio variants (cipher, ember, herald)
- Each initiative card includes: status badge, category, summary, quantified metrics, technology tags
- Six named initiatives: AI-Augmented Organization Design, Global Capability Center Launch, AI-Native PDLC, M&A Integration, Architecture Hub, Platform Modernization & Reliability
- Content is distinct from resume — portfolio expands on what the resume summarizes

### Local Navigation Bug Fix
- Fixed `/portfolio` link in index.html that broke on `file://` protocol
- Added JavaScript detection: if running locally, picks a random portfolio variant file directly
- Production routing via Cloudflare Worker unchanged
- Also fixed favicon.svg path in index.html for local access

### New Content Sourced From
- 18-meeting executive profile synthesis (Apr 27 – May 27, 2026)
- AI-Assisted Product-to-Engineering POD Pilot onsite materials (~/Dev/scriptorium)
- Q2 2026 SEL Quarterly "Sharpen the Standard" materials
- 2026 Strategic Directives and AI Tooling Usage data
- Structural inspiration from zweifel.tech (project-based organization)

---

## 2026-05-26 — Content & Cosmetics (PR #26, merged)

### Database Attribution Fix
- Changed "PostgreSQL Performance Optimization" to "SQL Server-backed Product Workflows"
- Added clarification: PostgreSQL experience framed as Chronicled + select Experity products + personal projects
- Updated across all portfolio variants and resume-content.json

### Education Toggle & Owner Controls (PR #25)
- Education section now excluded from resume by default
- Added owner controls: visit with `?owner=1` to reveal the toggle (stored in localStorage)
- Toggle hidden from normal visitors

### Favicon & Defaults
- Changed favicon paths to absolute (`/favicon.svg`) across all HTML files
- Changed default theme from 'editorial' to 'carbon'
- Added readme.md with repo guidance

---

## 2026-05-10 — PE-Backed Scale-Up Signals (PR #24)

- Surfaced PE-backed, high-growth, scale-up keywords for ATS visibility
- Added "direct P&L accountability" language
- Connected engineering investments to platform revenue growth narrative

---

## 2026-05-09 — Org Scale & Content Updates (PRs #22, #23)

- Updated org scale to reflect 70+ person distributed organization
- Added GCC/offshore track record references
- Added GCP experience attribution
- Added cybersecurity posture contribution
- Fixed summary and org bullet consistency

---

## 2026-04-03 — Infrastructure & Documentation (PRs #20, #21)

- Added ASSETS binding to wrangler config (fixed 1101 error on /portfolio)
- Added portfolio variant rotation logic documentation

---

## 2026-04-02 — A/B Testing & Admin Dashboard (PRs #17-19)

- Implemented A/B tracking for portfolio variants (herald, cipher, ember)
- Built admin dashboard with Analytics Engine integration
- Fixed wrangler v4 lockfile for Analytics Engine deploy
- Restored index page layout after unrequested changes

---

## 2026-04-01 — Portfolio Links & Email (PRs #14-16)

- Replaced expired Google image URLs with self-hosted profile pic
- Consolidated portfolio links in index
- Added back-to-main links and fixed landing page summary
- Corrected email typo and prepared for SendGrid migration

---

## 2026-03-30 — Deployment Debugging (PRs #12-13)

- Fixed deployment issues with wrangler log output and account_id config
- Resolved .assetsignore issues for node_modules exclusion

---

## 2026-03-29 — Foundation Build (PRs #1-11)

- Initial site launch with Cloudflare Workers
- Created resume.html and resume-alt.html with multiple themes
- Built portfolio variants: portfolio-apex, portfolio-nova
- Added executive portfolio variants: cipher, ember, herald
- Implemented Cloudflare Worker contact form with email routing
- Added mobile responsive layout with hamburger menu
- Fixed intersection observers for nav highlighting
- Resolved wrangler assets include/exclude configuration

---

## 2026-03-28 — Lift Off

- Initial repository creation
- First resume styles and responsive layout
- Removed old JSON files, established clean structure
