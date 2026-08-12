# Deployment checklist

## Before merging

- [ ] Run `python tools/validate_site.py`
- [ ] Review Korean and English views
- [ ] Check desktop and mobile navigation
- [ ] Verify DOI and external links
- [ ] Confirm no confidential data or pre-publication IP details are present
- [ ] Confirm all maturity labels (`in progress`, `planned`, `published`) are accurate

## GitHub Pages

Repository settings should use:

- Source: Deploy from a branch
- Branch: `main`
- Folder: `/(root)`

After merging, check the Pages deployment and the canonical website.

## Custom domain

Do not create a real `CNAME` file until the domain has been selected and DNS control is confirmed. Follow `DOMAIN_MIGRATION.md`.

## Routine content update

1. Create a branch.
2. Update the relevant page(s).
3. Run validation.
4. Open a pull request.
5. Merge only after public-disclosure and attribution checks.
