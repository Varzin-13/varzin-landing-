# VARZIN website audit resolution — 15 September 2026

The supplied expert audit was checked against repository revision `e9445db9be383b89d023052836b27cc211cbe92f` and the pages actually served by `https://varzin.org/`. Search-tool extracts returned older versions for some URLs, so those extracts were not treated as proof of the live page state.

## Findings and actions

| Audit finding | Verification | Resolution |
| --- | --- | --- |
| Conflicting human-study descriptions | Confirmed across historical drafts and the later project summary. The existing v1.3 page already had a status annotation, but its prominent registration wording still conflicted with it. | Added `/vpe001a-status.html` as the common status reference. It keeps the earlier Core-30 free-sort draft, v1.3 N=40 classification protocol, and later N=59 three-cohort plan distinct. Active research links point to this reference. No protocol is newly frozen or claimed registered. |
| Missing archive banners and noindex on master report and v1.3 | Not present in the current live site: both pages already had visible historical notices, shared site shells, and `noindex, follow`. | Preserved those protections and added validation of the actual robots tags and visible notices, beyond sitemap exclusion alone. Removed the misleading submission-ready badge and redundant legacy navigation from v1.3. |
| Editorial note and wrong field-index author | Confirmed in current source. | Removed the draft/replacement footer and the adjacent design-review commentary; corrected author to Reza Nirouyar. |
| Raw Markdown reading destinations | Confirmed. The previously uninspected Core-30 Markdown also claimed preregistration and contained unsupported power/conclusion language. | Added generated static reading pages for README, local preprint, and Core-30 draft. Preserved downloadable sources. Added dated annotations and links to the original Git revision. Historical reading pages receive noindex and explicit notices. |
| Preprint DOI/version ambiguity | Confirmed. The local text cited historical v2.1 / 20691858 without the qualification present elsewhere. | Added a prominent provenance annotation and labeled the historical citation as unresolved for the local file. Linked the current v2.2 / 22115483 publication record without declaring the two files identical. |
| CITATION.cff MIME type | Live HEAD returned HTTP 200 and `application/octet-stream` from GitHub Pages. | Added `/citation.html` and a byte-identical `/CITATION.cff.txt` fallback. Kept the root CFF for GitHub citation detection. This mitigates reader access; it does **not** claim to change the original CFF response header. |
| Inconsistent primary navigation | Confirmed across authored and generated pages. | Added one build-time navigation model with Research, Atlas, Publications, Products, Reproducibility, Researcher, Contact. Both menus share destinations; the Persian landing page uses translated labels. Native mobile disclosure works without JavaScript. |
| Old `/en/` search appearance | The live route already consolidates to the canonical homepage and contains noindex. A search excerpt cannot establish the current index state. | Preserved the route, canonical URL, noindex, and crawlability. No Google removal request was submitted. Recrawl and search-result refresh remain external to a repository deployment. |

## Scientific boundaries preserved

- The latest project-described human plan is N=59 across Control, Affine Priming, and Morphological Priming cohorts. Available documentation says recruitment has not commenced; no human outcome is established.
- YEGJ8 / 2NKZA identity, registration status, and exact version mapping remain unresolved. An OSF link is not itself proof of preregistration.
- Declared IRB approval is not upgraded to verified approval: the certificate was not located in the audited set.
- Old free-sort threshold/power statements are retained as historical claims. Participant-defined groups require an explicit common coding/scoring rule before applying Fleiss kappa. This website repair does not design or authorize a new experiment.
- Existing research-output identities, numerical findings, negative results, historical PDFs, and Zenodo/OSF deposits are not rewritten by this change.

## Implementation and verification

`npm run site:generate` regenerates publication pages, Markdown reading pages, shared navigation, metadata, and the sitemap. Markdown rendering uses pinned `marked` 18.0.13 at build time, escapes raw HTML, and does not add a public runtime dependency. Source changes trigger generation and quality workflows. Running generation twice must leave the tree unchanged.

Local static validation checked 37 HTML files and 24 indexable URLs, internal links and fragments, document metadata, archive directives, shared desktop/mobile destinations, and CFF/plain-text byte equality. The production build passed the same checks. The browser gate includes the five new pages and the historical-2025 re-audit at 375, 768, 1024, and 1440 pixels, with overflow, JavaScript-error, keyboard/navigation, and axe checks. CI stores screenshots and the result matrix for review before merge; the associated workflow is the record of its outcome.

## Remaining external limits

1. The original `.cff` MIME type remains controlled by the hosting response. Adding a repository `.htaccess` or an unsupported header file would not demonstrate a header fix. The human-readable page and matching plain-text copy provide usable alternatives.
2. Google URL Inspection reports Google's indexed/crawled state; it is not a live fetch or a request to recrawl. Publication cannot guarantee immediate removal of an old search snippet. The sitemap remains available at its existing registered URL.
3. This consistency repair does not resolve missing scientific artifacts, approve an experimental design, or make a new empirical claim.

## References for platform behavior

- [GitHub citation files](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-citation-files): citation detection uses the CFF in the repository's default branch.
- [Google noindex guidance](https://developers.google.com/search/docs/crawling-indexing/block-indexing): a crawler must be able to access the page to observe noindex.
- [Google removals tool](https://support.google.com/webmasters/answer/9689846): search removal is a separate Search Console operation.
