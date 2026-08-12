# GitHub identity and custom-domain migration

## Recommended target architecture

### GitHub ownership

Create a GitHub Organization named **`e2p-systems`** if the handle is still available, then transfer the site repository to the organization and rename it:

`e2p-systems/e2p-systems.github.io`

This is preferable to renaming the PI's personal GitHub account because the website becomes a durable group asset with multiple maintainers and a clearer separation between personal and group identity.

Candidate handles `e2p-systems` and `e2p-group` returned no public account through the GitHub API when this plan was prepared, but availability must be confirmed in the GitHub organization-creation screen.

### Public web domain

Recommended order:

1. **`e2p.krict.re.kr`** — strongest institutional identity, subject to KRICT IT/DNS approval.
2. **`www.e2p-systems.org`** — independent fallback after purchasing the domain.

A custom domain removes the public dependency on a GitHub username and makes a later repository transfer less visible to visitors.

## Migration sequence

1. Create the GitHub Organization and add at least two owners/maintainers.
2. Transfer the repository from `Dochi37-cpu` to the organization.
3. Rename the repository to `e2p-systems.github.io`.
4. Confirm GitHub Pages still deploys from `main` / root.
5. Obtain approval/control for the selected domain.
6. Configure DNS:
   - For `e2p.krict.re.kr`, create a CNAME from `e2p.krict.re.kr` to `e2p-systems.github.io`.
   - For `www.e2p-systems.org`, create a CNAME from `www` to `e2p-systems.github.io`.
7. In repository **Settings → Pages**, enter the same custom domain.
8. Verify the custom domain at the GitHub organization level where available.
9. After DNS resolves, enable **Enforce HTTPS**.
10. Update canonical URLs in the repository:

```bash
python tools/update_site_url.py --url https://e2p.krict.re.kr --write-cname
python tools/validate_site.py
```

11. Keep the old GitHub Pages URL available during DNS propagation and verify redirects before announcing the new address.

## Do not do these prematurely

- Do not rename the personal `Dochi37-cpu` account solely for the website.
- Do not commit a real `CNAME` before DNS ownership is established.
- Do not hard-code a domain that has not been approved or purchased.
- Do not delete the old repository or Pages deployment until the custom domain is verified.

## Official references

- GitHub Pages custom domains: https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site
- Managing a custom domain: https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
- Verifying a custom domain: https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages-site
- Transferring a repository: https://docs.github.com/repositories/creating-and-managing-repositories/transferring-a-repository
