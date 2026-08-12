# E2P Systems Group website

Public website for the **Equipment-to-Process Systems (E2P) Group** at KRICT.

Current canonical URL: `https://dochi37-cpu.github.io/`

## Information architecture

- `index.html` — concise group identity, current work and evidence status
- `research.html` — academic positioning, flagship questions, methodology and evidence standard
- `people.html` — PI, directly mentored researchers and collaboration interfaces
- `publications.html` — E2P output status separated from PI background/collaborative record
- `ip.html` — public IP only; pre-publication/confidential filings excluded
- `group.html` — researcher-development and operating principles
- `join.html` — opportunities and contact
- `assets/site.css`, `assets/site.js` — shared presentation and behavior

## Content rules

1. Do not label a result as E2P-originated unless the work was substantially developed through E2P.
2. Distinguish `in progress`, `planned`, `submitted` and `published` states.
3. Do not publish confidential plant data, unprotected invention details or pre-publication filing numbers.
4. Case studies should state the source of truth, validation boundary and decision consequence.
5. Employment or organizational details should be shown only when they are necessary to understand research ownership.

## Local preview

No build step is required.

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/`.

## Validation

```bash
python tools/validate_site.py
```

The GitHub Actions workflow runs the same validator for branches and pull requests.

## Changing the public URL

Use:

```bash
python tools/update_site_url.py --url https://new.example.org
```

Then validate, review the diff and configure GitHub Pages/DNS. See `DOMAIN_MIGRATION.md`.

## Deployment

GitHub Pages can continue to deploy from `main` / root. Keep `.nojekyll` because the site is plain static HTML.
