# Migration plan

Architecture: static HTML with shared CSS and small progressive-enhancement JS. React/Vite would add a deployment/build/runtime dependency without a document-navigation benefit. Motion for React is therefore not applicable; use restrained CSS interactions. No SPA fallback, URL rewrite or Pages configuration change is needed.

| Existing URL | Implementation |
| --- | --- |
| `/`, `/index.html` | Redesigned evidence-first portal |
| `/#status`, `/#mathematics`, `/#mirror`, `/#luxvar`, `/#audit`, `/#empirical`, `/#archive`, `/#negative-results`, `/#roadmap`, `/#publications`, `/#api`, `/#top` | Retained anchors; API points to preserved historical portal rather than advertising an unverified offering |
| `/field-index.html` and fragments | Original detailed evidence record, shared visual layer/navigation |
| `/atlas.html` and fragments | Original research atlas, shared visual layer/navigation |
| `/all-dois.html` | Original full registry including every DOI and access-action row |
| `/feedback.html` | Existing contact behavior and direct channels retained |
| `/luxvar-birth-intro.html` | Existing constructed-language description, local styles |
| `/vpe001-protocol.html` | Preserved historical protocol, explicit boundary and noindex |
| `/cyclical-resonance-report.html`, `/master-report-v3.html` | Preserved reports/fragments, historical notice and noindex |
| `/paper/`, `/paper/index.html` | Preserved noindex historical archive |
| `/homepage-before-redesign.html` | Added complete former homepage record, labeled noindex |
| PDFs, MP3s, Markdown research, JSON, images, CNAME, verification files | Preserved byte-for-byte |

Deploy only after branch review through the repository's existing Pages process. No merge/push performed. Shared assets use root-relative URLs, appropriate for the preserved CNAME domain. A preview hosted under a repository subpath needs a web-root mapping. Historical pages remain crawlable for noindex discovery and are excluded from sitemap. No external publication identity is silently reconciled.
