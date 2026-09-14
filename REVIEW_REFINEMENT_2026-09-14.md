# Independent redesign review and refinement — 2026-09-14

## Scope
A second manual review was performed after the initial Codex redesign, using local Chromium screenshots from the actual working tree on `professional-varzin-redesign-v1`. Main remained untouched.

## Findings before refinement
- The redesigned homepage established a strong research-grade editorial direction and was retained.
- `feedback.html` still foregrounded legacy KALTŪR/474Hz symbolic framing and stale status language.
- `luxvar-birth-intro.html` remained visually legacy and did not clearly separate designed structure from semantic claims.
- `all-dois.html` retained correct provenance content but lagged the new editorial system visually.
- Field Index and Atlas were information-rich but still carried stronger legacy blue/cyan surface treatments than the homepage.

## Refinements applied
- Rebuilt Contact as a neutral research-contact page; historical KALTŪR/474Hz wording is retained only as an explicit historical note, not as the primary interface.
- Rebuilt the LUXVAR introduction around design facts, project-reported computational results, negative semantic-axis findings, and explicit non-established claims.
- Rebuilt the publications/archive registry in the homepage editorial language while preserving maintained DOI identities, version cautions, and the historical 29-entry access-action register.
- Extended the shared CSS to harmonize reference-page surfaces, tables, callouts, buttons, and responsive behavior without rewriting the scientific content of Field Index or Atlas.
- Fixed primary-link contrast and made the historical access register disclosure visible and keyboard-operable.

## Validation actually run
- `npm test`: 13 HTML pages, zero internal link/asset/fragment/duplicate-ID errors.
- `npm run build`: pass; static `dist/` assembled.
- `python3 scripts/check_site.py dist`: pass.
- Targeted Playwright + axe matrix: 20/20 cases pass across Publications, LUXVAR, Contact, Field Index, and Atlas at 375/768/1024/1440px, with zero overflow, page errors, or automated violations.
- Historical access-action disclosure re-opened at 375px and 1440px: 29 rows preserved, no document overflow, zero axe WCAG A/AA violations.
- `git diff --check`: pass.
- Manual screenshot review performed for homepage, Field Index, Atlas, Publications, LUXVAR, and Contact in desktop/mobile views.

## Boundary
These checks validate the website implementation and presentation only. They do not independently validate the scientific claims, external deposits, human-study status, or third-party platform records.
