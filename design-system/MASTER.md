# VARZIN master design system

## Direction and skill use
Scientific editorial publication with Swiss alignment and a dark-neutral computational atlas. UI UX Pro Max `--design-system` research/editorial query and accessibility/responsive stack search were run before implementation. Adopt academic serif/sans hierarchy, generous section gaps, visible focus and reduced-motion guidance. Reject its generic horizontal-scroll, vibrant-block and pink-CTA suggestions because they conflict with this research brief.

## Tokens
- Typography: system sans (`Inter` if locally installed, Arial fallback); Georgia editorial display; system monospace for equations, indexes and DOI metadata. No remote font requests. Body 16px/1.7; metadata 12–14px; h1 fluid 42–76px; h2 30–42px. Text measure 65–72ch.
- Colors: canvas #111513, surface #191e1b, elevated #202722; text #eef1e9, muted #b3beb5, accent #b8d899, border #39463b. Restrained sage links; no glow.
- Status colors: proved/reproducible sage #b8d899; reported/conditional amber #e5c78d; open/planned blue #a8cbe8; negative/correction rose #efb0aa; historical neutral #bec1bc. Always pair color with explicit text.
- Spacing: 4, 8, 12, 16, 24, 32, 48, 64, 96px. Main width 1240px; side gutters 24px desktop / 20px mobile.
- Grid: 12-column conceptual grid; hero 3:2; research three columns; publication rows with index/title/action. Collapse to one column below 768px; two where suitable at tablet.
- Surfaces/borders: flat dark surfaces, 1px borders, 4–8px radii. Subtle depth through tonal separation, no glass or large blur.

## Patterns
- Buttons: 44px minimum height, solid sage primary with dark ink, outlined secondary; no hover movement. Links underline on hover; inline text links remain underlined.
- Cards: semantic article, short status label, heading, description and descriptive destination link. Never nested interactive elements or fake click targets.
- Publications: exact record title, type/version where documented, DOI link and explicit qualification. Deposits do not imply peer review.
- Research status: nine distinct labeled categories, with source links. Computation requires artifact-specific scope; negatives get equal visual prominence.
- Navigation: shared research destinations, current-page indication, native details disclosure on mobile. Escape closes and returns focus. No JavaScript required to open navigation.
- Provenance: ordered documentary sequence, not invented event dates. Historical notices precede original record.
- Interaction states: 150ms color/border transitions; strong 3px focus outline with offset; selected/current state uses text and underline. Native disclosure supports keyboard and touch.

## Responsive, motion and accessibility
At 375/768/1024/1440px: no document overflow; grids collapse, long DOI strings wrap, tables scroll within named keyboard-focusable regions. Navigation becomes a disclosure under 768px. No fixed header obscuring anchors. One h1 per new page, semantic landmarks, skip link, logical headings, descriptive links. Decorative atlas figure is explicitly an illustration, not experimental evidence. No autoplay or permanent animation. CSS-only subtle transitions; reduced-motion disables transitions/animations and smooth scroll. Print uses light paper and hides navigation. Aim WCAG 2.2 AA; browser/automated checks supplement manual review rather than certify compliance.

## 21st grounding
Catalog searches covered editorial publication cards, research navigation, mobile menus and timelines. Retrieved and inspected Editorial Hero (ID 19075, felipemenezes098/hero-05). Adopt its serif editorial hierarchy, measured copy and primary/secondary destinations; use an original static affine diagram instead of photography. Do not port its React, Motion, text-balancer or blur dependencies into the static site. Publication rows and native navigation are original local implementations. CLI review returned six informational hardcoded-color notices; these literals define or apply the documented master palette, so automatic replacement was not appropriate.
