# VARZIN master design system

## Direction and skill use
Scientific editorial publication fused with a restrained computational-atlas identity. UI UX Pro Max `--design-system` research/editorial guidance and 21st.dev editorial references were used as inputs, then adapted to the evidence-first brief. The 2026 vitality pass keeps academic hierarchy and accessibility while adding low-intensity cyan/gold/violet spectral accents, geometric orbit motifs, glass-like navigation depth, and progressive motion that never carries scientific meaning.

## Tokens
- Typography: system sans (`Inter` if locally installed, Arial fallback); Georgia editorial display; system monospace for equations, indexes and DOI metadata. No remote font requests. Body 16px/1.7; metadata 12–14px; h1 fluid 42–76px; h2 30–42px. Text measure 65–72ch.
- Colors: dark-neutral canvas remains the base; text #eef1e9 and muted #b3beb5 remain primary. Sage continues as the evidence-system accent, with restrained cyan #63d8d0, warm gold #e7b86a, and violet #9f8cff used only for ambient depth, product/research visualization, and non-semantic highlights. Glow is low-opacity and decorative only.
- Status colors: proved/reproducible sage #b8d899; reported/conditional amber #e5c78d; open/planned blue #a8cbe8; negative/correction rose #efb0aa; historical neutral #bec1bc. Always pair color with explicit text.
- Spacing: 4, 8, 12, 16, 24, 32, 48, 64, 96px. Main width 1240px; side gutters 24px desktop / 20px mobile.
- Grid: 12-column conceptual grid; hero 3:2; research three columns; publication rows with index/title/action. Collapse to one column below 768px; two where suitable at tablet.
- Surfaces/borders: dark surfaces, 1px borders, mostly 8–18px radii. Research cards remain readable and restrained; the global header may use translucent blur and hero/product surfaces may use subtle layered glow. Do not use glass effects as evidence/status encoding.

## Patterns
- Buttons: 44px minimum height, high-contrast gradient/sage primary with dark ink, outlined secondary. Hover movement is capped at 2px and never required to understand state. Links underline on hover; inline text links remain underlined.
- Cards: semantic article, short status label, heading, description and descriptive destination link. Never nested interactive elements or fake click targets.
- Publications: exact record title, type/version where documented, DOI link and explicit qualification. Deposits do not imply peer review.
- Research status: nine distinct labeled categories, with source links. Computation requires artifact-specific scope; negatives get equal visual prominence.
- Navigation: shared research destinations, current-page indication, native details disclosure on mobile. Escape closes and returns focus. No JavaScript required to open navigation.
- Provenance: ordered documentary sequence, not invented event dates. Historical notices precede original record.
- Interaction states: 150ms color/border transitions; strong 3px focus outline with offset; selected/current state uses text and underline. Native disclosure supports keyboard and touch.

## Responsive, motion and accessibility
At 375/768/1024/1440px: no document overflow; grids collapse, long DOI strings wrap, tables scroll within named keyboard-focusable regions. Navigation becomes a disclosure under 768px. No fixed header obscuring anchors. One h1 per new page, semantic landmarks, skip link, logical headings, descriptive links. Decorative atlas figure is explicitly an illustration, not experimental evidence. Ambient orbit decoration may animate slowly, and sections may reveal once on scroll through progressive enhancement. No autoplay media, no animation that conveys evidence, and no interaction that requires motion. `prefers-reduced-motion` disables decorative animation/reveal transitions and smooth scroll. Print uses light paper and hides navigation. Aim WCAG 2.2 AA; browser/automated checks supplement manual review rather than certify compliance.

## 21st grounding
Catalog searches covered editorial publication cards, research navigation, mobile menus and timelines. Retrieved and inspected Editorial Hero (ID 19075, felipemenezes098/hero-05). Adopt its serif editorial hierarchy, measured copy and primary/secondary destinations; use an original static affine diagram instead of photography. Do not port its React, Motion, text-balancer or blur dependencies into the static site. Publication rows and native navigation are original local implementations. CLI review returned six informational hardcoded-color notices; these literals define or apply the documented master palette, so automatic replacement was not appropriate.

## Brand identity assets
- Primary mark: restrained V monogram on dark canvas. The vitality pass permits a subtle cyan/gold inner treatment around the mark, while avoiding legacy neon spectacle.
- Favicon stack: SVG mark, 32px PNG fallback, 180px Apple touch icon, 192px and 512px install icons.
- Social card: 1200×630 editorial composition using the homepage thesis and current research scope.
- `manifest.webmanifest` supplies consistent browser/mobile identity; it does not imply an offline application or service worker.
