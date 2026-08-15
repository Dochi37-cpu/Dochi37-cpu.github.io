# GitHub identity and public-domain migration

## Current source of truth

- Public brand: **P2E Research Group**.
- Current canonical site: `https://dochi37-cpu.github.io/`.
- No repository-owner migration, organization handle, or custom public domain is currently approved.

Do not infer a future GitHub organization or domain from retired E2P-era plans. Any migration destination must be explicitly approved by the PI before repository, DNS, `CNAME`, canonical, sitemap, or Open Graph changes are made.

## Generic target architecture

If a migration is approved later, use the approved identifiers only:

- GitHub owner/organization: `<approved-org>`
- GitHub Pages repository: `<approved-org>/<approved-org>.github.io`
- Optional custom domain: `<approved-domain>`

If no custom domain is approved, the public URL would normally be:

`https://<approved-org>.github.io/`

If a custom domain is approved, use that exact approved hostname instead.

## Migration sequence

1. Obtain explicit PI approval for the destination GitHub owner/organization and public URL.
2. If an organization is used, create it and add appropriate owners/maintainers.
3. Transfer the repository from the current owner only after the destination is confirmed.
4. Rename the repository as required for the approved GitHub Pages URL.
5. Confirm GitHub Pages still deploys from `main` / root.
6. If a custom domain is approved, configure DNS for that exact hostname.
7. In repository **Settings → Pages**, enter the same approved custom domain.
8. Verify the custom domain where applicable.
9. After DNS resolves, enable **Enforce HTTPS**.
10. Update canonical URLs only after the new destination is working:

```bash
python tools/update_site_url.py --url https://<approved-host> --write-cname
python tools/validate_site.py
```

If the approved destination uses the default GitHub Pages hostname rather than a custom domain, omit `--write-cname`.

11. Verify the new deployment, all public pages, assets, canonical metadata, sitemap, and redirects before announcing the new address.
12. Keep the existing deployment available until the new destination is verified.

## Do not do these prematurely

- Do not rename the personal GitHub account solely for the website.
- Do not create or commit a real `CNAME` before domain ownership/control is established.
- Do not hard-code a speculative organization name or domain.
- Do not change **P2E Research Group** branding as part of an infrastructure migration.
- Do not delete the current repository or Pages deployment until the replacement is verified.

## Official references

- GitHub Pages custom domains: https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site
- Managing a custom domain: https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
- Verifying a custom domain: https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages-site
- Transferring a repository: https://docs.github.com/repositories/creating-and-managing-repositories/transferring-a-repository
