# pr0fil3

Static resume and portfolio site for Guillermo Salas, deployed via Cloudflare Workers and static assets.

## Repo guidance

- Keep resume and portfolio content consistent across `resume-content.json`, embedded fallback data in resume/portfolio HTML files, and static executive portfolio variants.
- Use absolute favicon paths (`/favicon.svg`) so direct pages and Worker-routed pages resolve the icon consistently.
- When describing database experience, do not imply that Guillermo's primary or direct Experity RDBMS focus is PostgreSQL. Experity's primary product workflows are SQL Server-backed at scale. PostgreSQL experience should be framed as coming from Chronicled, select Experity products, and personal projects.

## Resume owner controls

The education section is intentionally excluded by default on resume pages. The visible education toggle is hidden from normal visitors to avoid drawing attention to it.

To reveal the toggle for the current browser, visit either resume page with the owner flag once:

```text
/resume.html?owner=1
/resume-alt.html?owner=1
```

The page stores `resume-owner-controls=1` in localStorage, then removes the query string from the address bar with `history.replaceState()`. This is only a discreet UI affordance, not access control; anyone inspecting static source can discover it. Use Worker-level auth or a protected route for anything that must be genuinely private.
