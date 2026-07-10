# Portfolio Variant Rotation Logic

## Overview

The `/portfolio` endpoint uses **cookie-based session affinity** to serve one of three executive portfolio variants - `herald`, `cipher`, or `ember` - to each visitor. A visitor is randomly assigned a variant on their **first** visit and then sees that **same variant for 30 days**. Clicking the button again does **not** rotate to a new variant; it replays the assigned one.

---

## How It Works

### Components

| Component | Role |
|---|---|
| `VARIANTS` array | `["herald", "cipher", "ember"]` - the three portfolio HTML pages |
| `pv` cookie | Stores the assigned variant name in the visitor's browser |
| `COOKIE_MAX_AGE` | `2,592,000` seconds (30 days) - how long the cookie persists |
| `pickVariant()` | Selects a random variant (`Math.random`) - called **only once** per visitor lifecycle |
| `parseVariantCookie()` | Reads the `pv` cookie from the incoming request to check for an existing assignment |

### Request Flow

```
Visitor hits /portfolio
        |
        v
+-------------------------+
| Parse "pv" cookie from  |
| the request headers     |
+------------+------------+
             |
     +-------+--------+
     | Cookie exists  |
     | and is valid?  |
     +-------+--------+
        YES/ \NO
       +----+ +----+
       v            v
 Use existing   pickVariant()
 variant from   (random selection)
 cookie         Set isNew = true
       |            |
       +-----+------+
             v
+-------------------------+
| Fetch the HTML file:    |
| executive_portfolio_    |
| {variant}.html          |
+------------+------------+
             |
     +-------+--------+
     |  isNew = true? |
     +-------+--------+
        YES/ \NO
       +----+ +----+
       v            v
 Set-Cookie:     Return HTML
 pv={variant};   as-is
 Max-Age=30d;
 Path=/;
 SameSite=Lax
       |
       v
 Return HTML
 with cookie
```

### Step-by-step

1. **Visitor clicks the portfolio button** -> request arrives at the Cloudflare Worker for `/portfolio`.
2. **`parseVariantCookie(request)`** reads the `Cookie` header, looking for `pv=<value>`.
3. **If the cookie exists and contains a valid variant name** (`herald`, `cipher`, or `ember`):
   - That variant is reused. No new cookie is set. The visitor sees the **same** page they saw last time.
4. **If the cookie is missing or invalid** (first visit, cleared cookies, expired):
   - `pickVariant()` selects one of the three variants at random (uniform 1/3 probability each).
   - A `Set-Cookie` header pins that variant for 30 days.
5. The corresponding HTML file (`executive_portfolio_{variant}.html`) is fetched from static assets and returned.
6. An analytics impression is logged with the variant name.

---

## Why 30 Days?

The 30-day duration is a deliberate **A/B testing best-practice** choice, not arbitrary. Here's the reasoning:

### 1. Consistent user experience
If a recruiter, hiring manager, or networking contact visits the portfolio, bookmarks it, and returns days later, they should see the **same** page. Showing a different design on every click would feel broken - as if the site is glitching - and would undermine trust.

### 2. Accurate A/B analytics
The purpose of having three variants is to measure which design converts best (impression -> contact form submission). For that measurement to be valid:
- Each visitor must be counted as **one** subject in **one** test group.
- If a visitor could see multiple variants across visits, you couldn't attribute a conversion to a specific design.
- 30 days provides enough time for a visitor to revisit and eventually convert, all while staying in their assigned cohort.

### 3. Why not shorter?

| Duration | Problem |
|---|---|
| **1 hour** | A recruiter who opens the link in the morning and returns after lunch would get a different design. Conversion attribution breaks. |
| **24 hours** | Slightly better, but anyone who revisits the next day (very common for hiring workflows) sees a new variant. Still pollutes the test. |
| **7 days** | Viable but tight. Hiring pipelines often span weeks. A candidate portfolio could be revisited 10+ days later. |

### 4. Why not longer?
30 days is the sweet spot - long enough to cover a typical hiring/evaluation cycle, short enough that:
- If you deploy new variants or retire old ones, visitors cycle into the new pool within a month.
- It respects reasonable cookie lifetime expectations (many analytics platforms use 30 days as a standard).
- It aligns with Cloudflare Analytics Engine's default 30-day query window, keeping cookie lifetime and data retention in sync.

---

## Key Implication

**Clicking the portfolio button multiple times from the same browser will always show the same variant** for 30 days. To see a different variant, a visitor would need to:
- Clear their cookies (or the specific `pv` cookie)
- Use a different browser or incognito/private window
- Wait 30 days for the cookie to expire
