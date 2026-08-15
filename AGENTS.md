# AGENTS.md — P2E Research Group Website

## Source of truth

Current public brand: **P2E Research Group**

Academic field: **Plant BOP & Energy Systems Engineering**

Core philosophy: **From core technology to operable plant systems.**

The current research identity and factual content are intentional. Do not rename, reinterpret, or expand `P2E` without explicit PI instruction.

The repository's current `main` branch is the implementation source of truth. `P2E_Homepage_Master_Specification_v3.md` is the content/identity specification and should be treated as authoritative when implementation wording or positioning is ambiguous.

## Content safety

Do not:
- invent research outputs, collaborations, affiliations, publications, patents, or maturity claims;
- label work as P2E-originated unless explicitly documented;
- expose confidential plant/design/operating data;
- expose unpublished or pre-publication patent information;
- change researcher ownership, supervision, or affiliations without explicit instruction;
- rewrite publication/IP facts from inference;
- revert P2E branding to E2P;
- introduce a new expansion of the acronym `P2E` unless the PI explicitly defines one.

## Engineering priorities

Prefer, in this order:
1. correctness and regression safety;
2. maintainability;
3. accessibility;
4. responsive/browser behavior;
5. scholarly/SEO discoverability;
6. performance with minimal dependencies.

This is a static GitHub Pages website. Do not introduce a framework, build system, SPA architecture, or dependency-heavy toolchain unless there is a clear, documented benefit that materially exceeds the migration/maintenance cost.

## Architecture review scope

When reviewing architecture, inspect the whole repository rather than only `index.html`.

Pay particular attention to:
- duplicated header/footer/navigation markup and whether consolidation is justified;
- dead or legacy assets;
- CSS organization and unused selectors;
- `assets/site.js` coupling and failure modes;
- KO/EN internationalization, including the nine `assets/i18n/i18n-*.json` maps;
- text-as-translation-key brittleness and network-request cost;
- progressive enhancement and behavior when JavaScript or translation-map loading fails;
- keyboard/focus/ARIA behavior;
- responsive edge cases;
- publication/DOI metadata and scholarly discoverability;
- canonical metadata, sitemap, robots, Open Graph, and `llms.txt`;
- validation/CI coverage and missing high-value regression tests;
- maintainability when adding researchers, publications, projects, and news.

## Change discipline

For an audit/review task:
- do not modify files unless explicitly asked to implement fixes;
- classify findings as BLOCKER / HIGH / MEDIUM / LOW / OPTIONAL;
- for every finding name affected files, exact problem, why it matters, minimal fix, and regression risk;
- explicitly identify areas that are already well implemented and should not be changed;
- avoid cosmetic refactors whose risk exceeds their benefit.

For implementation tasks:
- prefer minimal changes;
- preserve current public URLs;
- preserve KO/EN behavior;
- preserve the current visual identity unless a UI change is necessary for a verified problem;
- preserve compatibility pages unless removal is proven safe;
- do not change scientific/research content as part of an engineering refactor;
- keep or improve existing CI.

## Required validation

Before proposing completion, run at minimum:

```bash
python tools/validate_site.py
node --check assets/site.js
```

Also verify that:
- all public pages load from a local HTTP server;
- KO/EN switching works;
- mobile navigation works;
- no internal links/assets are broken;
- current canonical metadata is preserved;
- publication/IP factual content is not lost.
