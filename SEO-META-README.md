# VARZIN SEO Meta Injector

One config + one script that keeps SEO/Open Graph/JSON-LD meta tags
consistent across every `.html` page in this repo — instead of
hand-editing the `<head>` of each file.

## Files

| File | Purpose |
|---|---|
| `seo-meta.config.json` | Site-wide values (name, ORCID, image, locale, etc). Edit this to change something everywhere at once. |
| `inject-seo-meta.js` | Node script (no dependencies). Scans every `.html` file, computes its canonical URL from its path, and inserts/updates the meta block. |
| `.github/workflows/seo-meta.yml` | Optional: runs the script automatically on every push that touches an `.html` file, and commits the result. Delete this file if you'd rather run it manually. |

## How it works

The script inserts a block between two HTML comment markers:

```html
<!-- SEO-META:START -->
...meta tags, canonical link, JSON-LD...
<!-- SEO-META:END -->
```

- **First run:** if a page doesn't have these markers yet, the script adds
  them right after `<head>`.
- **Every run after that:** it finds the markers and replaces only what's
  between them — nothing else on the page is touched, and re-running is
  always safe.
- **Canonical URL** is derived automatically from the file's path:
  - `index.html` → `https://varzin.org/`
  - `atlas.html` → `https://varzin.org/atlas.html`
  - `sub/page.html` → `https://varzin.org/sub/page.html`

  Add a new page anywhere in the repo and just re-run the script — you
  never have to type a URL by hand.

## Usage

**Manual (run before you deploy):**

```bash
node inject-seo-meta.js        # scans the whole repo from its root
node inject-seo-meta.js ./docs # or scan a specific folder, e.g. a docs/ site
```

**Automatic (recommended for GitHub Pages):**

Keep `.github/workflows/seo-meta.yml` in the repo. Every time you push a
change to any `.html` file, GitHub Actions will run the script and commit
the updated meta tags back to the branch automatically — you never touch
this again after the first setup.

## Changing something site-wide

Edit `seo-meta.config.json` (e.g. add a real Twitter handle once you have
one, change the OG image, etc.) and re-run the script (or just push — the
Action will pick it up). Every page updates at once.

## One-time setup

1. Drop `seo-meta.config.json`, `inject-seo-meta.js`, and (optionally)
   `.github/workflows/seo-meta.yml` into the repo root, next to your `.html`
   files.
2. Run once locally to seed all existing pages:
   ```bash
   node inject-seo-meta.js
   ```
3. Commit and push. From then on, either re-run manually before each
   deploy, or let the GitHub Action handle it.

## Notes

- No npm install needed — the script only uses Node's built-in `fs` and
  `path` modules.
- Requires Node.js to run (locally, or via the GitHub Action's `setup-node`
  step) — GitHub Pages itself doesn't run this at serve-time, it only
  serves whatever static HTML is already committed. That's why the Action
  commits the result back to the repo rather than trying to inject tags at
  request time.
- Twitter handles were left out of the template since none were provided.
  Add `"twitterSite": "@yourhandle"` to the config and a
  `<meta name="twitter:site" content="${cfg.twitterSite}">` line to the
  script's template if/when you have one.
