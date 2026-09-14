# VARZIN redesign audit

Read-only audit completed before site implementation, 2026-09-14.

- Working branch: `professional-varzin-redesign-v1` (not main).
- Starting origin/main: `427de5d07d05201cc30249b4bd036e7289fcfdf3`.
- Existing untracked user material: `.codex/`, `CODEX_VARZIN_REDESIGN.md`; preserve.
- Structure: static root HTML, inline CSS/JS, assets, paper archive, Python utilities; no package/build configuration. `.nojekyll` and CNAME `varzin.org` support direct Pages hosting. The only checked-in workflow injects metadata and commits it; actual remote Pages settings are not available locally.
- Inspected homepage, field index, atlas, DOI registry, contact, protocol, LUXVAR introduction, both long reports, paper archive, README, citation/config/injector, robots, sitemap and asset inventory.

## Strengths
Current README carefully separates affine proof, construction-specific computation, reported results and limitations. DOI identities, 29-entry access-action register, corrections, negative tests and protocol uncertainty are already preserved. Canonical URLs, ORCID, social image and citation metadata exist. Atlas/field index contain substantial source material.

## Weaknesses and risks
- Visual language varies among cyan/gold glow, purple starfields, utility CSS and dense technical dashboards. Heavy shadows, competing accents, long homepage tables and repeated status summaries obscure orientation.
- Homepage mixes commercial API pricing and outdated protocol summaries with research navigation. New visitors lack a concise publication/reproducibility/identity path.
- Canvas backgrounds run permanent animation. Homepage reduced-motion branch still calls a self-scheduling loop. Legacy pages lack consistent skip links and focus/tap-target treatment. Contact headings skip a level.
- Tables and fixed/minimum layouts require mobile inspection. Local report navigation is too dense to use as global navigation.
- External Google fonts, Tailwind CDN and MathJax create availability/performance dependencies. MP3 files are large but must be retained, not preloaded. Logo PNG is about 2 MB.
- SEO injector configuration says paper archive is noindex but checked-in metadata is inconsistent elsewhere; historical reports/protocol need explicit indexing boundaries. Sitemap includes historical report and protocol. Verification files must not be rewritten.
- Remote DOI availability is not certified by this redesign. Registry explicitly records unresolved 20691858/22115483 mapping and YEGJ8/2NKZA identities.

## Scientific and historical sensitivity
README is the conservative editorial source. Track D negative results apply to tested frozen models; trained remediation is distinct; held-out composition remains a separate negative experiment. No human outcome exists. A general Mirror connectivity proof was not independently inspected. Surface/morpheme ARI is not semantic-axis recovery. Keep all archive wording, PDFs, audio, citations, corrections and historical URL fragments accessible. Avoid presenting withdrawn historical consciousness, frequency, resonance or quantum claims as current evidence.

## Decision
Use static progressive enhancement and a shared stylesheet/navigation. Rebuild homepage while retaining its previous complete document as a labeled noindex record. Preserve all old homepage anchors as relevant destinations. Restyle reference pages without rewriting their detailed scientific record; label older reports and protocol explicitly. No runtime framework is justified for this document-led portal.
