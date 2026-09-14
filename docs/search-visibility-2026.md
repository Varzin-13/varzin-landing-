# VARZIN search visibility operations — 2026

This file records implementation choices for search, analytics and discovery. It is operational documentation, not a marketing claim.

## Implemented on the website

- Canonical URLs, XML sitemap and robots.txt.
- Page-specific titles, descriptions, Open Graph and Twitter metadata.
- Stable favicon, touch icons, web manifest and social-card assets.
- Conservative Schema.org graph for WebSite, Organization, Person and WebPage; the dedicated researcher page uses ProfilePage.
- Dedicated indexable researcher profile linked to ORCID, GitHub and current publication records.
- Google Preferred Sources link for readers; this is relevant to eligible Google Search, AI Mode and AI Overview experiences.
- Alt-text validation for HTML images.
- Automated browser matrix, responsive checks and axe WCAG A/AA checks.
- Automated sitemap generation and metadata idempotence checks.
- IndexNow key + submission utility for Bing and other participating engines.
- Custom 404 page so removed legacy URLs land on a current evidence-first navigation surface.
- Privacy-ready GA4 loader scaffold: it remains inert until a valid Measurement ID is configured, and then loads only after affirmative analytics consent.
- Persian entry page at `/fa/` preserves an existing search route with an evidence-first localized introduction and reciprocal `hreflang` links; the legacy `/en/` route consolidates to the canonical root, and `greek-papers-index.html` consolidates to the publication registry.

## Google Search Console

The connected Google account currently exposes the verified URL-prefix property `https://varzin.org/` in Search Console. The existing sitemap `https://varzin.org/sitemap.xml` is already registered in Search Console with zero reported sitemap warnings/errors; the release changes the sitemap contents to the seven current indexable routes, so post-deploy URL Inspection is still required to confirm recrawl/index state. The two historical Google HTML verification files are preserved in the repository and production build. Inspect the homepage, researcher page, field index, atlas, publication registry, LUXVAR page, and contact page after deployment.

## Search Console baseline snapshot

Before this visibility release, the connected Search Console property reported 7 clicks and 355 impressions over the latest 28 settled days (through 2026-09-11), with average position about 8.0. Over the longer 2026-03-15 through 2026-09-11 window, the canonical homepage led traffic, while the legacy `/en/` route still retained meaningful impressions/clicks and `/fa/` retained a smaller but high-CTR footprint. That evidence is why this release preserves `/fa/` as a real Persian landing page and consolidates `/en/` to `/` instead of leaving those historical search routes as raw 404s.

## Bing Webmaster Tools

The website-side Bing path is complete: IndexNow key publication, submission tooling, and post-deploy automation are implemented. Bing Webmaster API access is not currently configured in GSC Wizard, so account-side Bing feed/crawl reports are unavailable from this integration. If Bing Webmaster is later connected, import the verified Google Search Console property and register the same sitemap.

## Google Analytics 4

The website-side integration is ready but intentionally disabled until a real VARZIN GA4 Measurement ID exists. The connected GSC Wizard account currently does not have Google Analytics scope/property access, so no measurement ID can be verified from the account integration. No placeholder ID is sent to Google. When configured, the site presents an opt-in analytics choice and does not request Google Analytics before acceptance. Google Signals and ad-personalization signals are disabled in the loader.

## Google Business Profile, Maps and Google Reviews

Not enabled. The current public project is an independent online research portal, and there is no documented customer-facing storefront or in-person service-area operation in the canonical project record. Google Business Profile eligibility requires in-person customer contact. Creating a local listing, map embed, LocalBusiness schema or review funnel without that basis would be inaccurate and could weaken trust. Revisit only if the project later operates a genuine eligible physical/service-area business.

## Generative/AI search

Do not add fabricated AEO/GEO markup or an `llms.txt` file for Google ranking: Google states that `llms.txt` is not needed and does not positively or negatively affect Google Search visibility. Current strategy is crawlability, canonical indexing, strong entity identity, original research content, explicit evidence boundaries, structured data, citations, sitemap coverage, Preferred Sources and IndexNow for participating engines.

## Release gate

Before merging visibility changes: static checker must report zero errors, sitemap generation and metadata injection must be idempotent, browser matrix must pass at 375/768/1024/1440, and the live deployment must be checked before IndexNow submission.
