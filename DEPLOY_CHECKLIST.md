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

After merging, check this repository's Pages deployment and the reference site at [https://dochi37-cpu.github.io/](https://dochi37-cpu.github.io/).

## Custom domain

Do not create a real `CNAME` file until the domain has been selected and DNS control is confirmed. For changes to this reference site's URL, follow the README's "Changing this reference site's URL" procedure; `DOMAIN_MIGRATION.md` is a superseded historical plan, not a current deployment procedure.

## Routine content update

1. Create a branch.
2. Update the relevant page(s).
3. Run validation.
4. Open a pull request.
5. Merge only after public-disclosure and attribution checks.
