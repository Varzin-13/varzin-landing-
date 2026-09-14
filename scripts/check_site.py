from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json, re, sys

root = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else Path(__file__).resolve().parent.parent
config = json.loads((root / 'seo-meta.config.json').read_text())
base = config['baseUrl'].rstrip('/')
exempt = set(config.get('excludeFiles', [])) | {'404.html'}

class Page(HTMLParser):
    def __init__(self, text):
        super().__init__(); self.ids=[]; self.links=[]; self.assets=[]; self.images=[]; self.h1=0; self.titles=0; self.descriptions=0; self.canonicals=[]; self.lang=None; self.in_head=False; self.feed(text)
    def handle_starttag(self, tag, attrs):
        d=dict(attrs)
        if tag=='html': self.lang=d.get('lang')
        if tag=='head': self.in_head=True
        if 'id' in d: self.ids.append(d['id'])
        if tag=='h1': self.h1 += 1
        if tag=='title' and self.in_head: self.titles += 1
        if tag=='meta' and self.in_head and d.get('name','').lower()=='description': self.descriptions += 1
        if tag=='link' and self.in_head and d.get('rel','').lower()=='canonical' and d.get('href'): self.canonicals.append(d['href'])
        if tag=='a' and 'href' in d: self.links.append(d['href'])
        if tag in ['script','img','audio','source'] and d.get('src'): self.assets.append(d['src'])
        if tag=='img': self.images.append(d)
        if tag=='link' and d.get('rel','').lower() in ['stylesheet','icon','apple-touch-icon','manifest'] and d.get('href'): self.assets.append(d['href'])
    def handle_endtag(self, tag):
        if tag=='head': self.in_head=False

ignored_dirs={'node_modules','dist','.git','.github','.codex','.agents','.21st','test-results','review-shots','review-shots-final','review-shots-visibility','build'}
files = sorted(p for p in root.rglob('*.html') if not any(part in ignored_dirs for part in p.relative_to(root).parts))
pages = {p: Page(p.read_text()) for p in files}
errors=[]; warnings=[]; external=set()

def rel(p): return p.relative_to(root).as_posix()
def canonical_for(p):
    r=rel(p)
    if r=='index.html': return base+'/'
    if r.endswith('/index.html'): return base+'/'+r[:-len('index.html')]
    return base+'/'+r

for file,page in pages.items():
    r=rel(file); raw=file.read_text()
    for ident in set(page.ids):
        if page.ids.count(ident)>1: errors.append(f'{r}: duplicate ID {ident}')
    for image in page.images:
        if 'alt' not in image: errors.append(f"{r}: image missing alt attribute: {image.get('src','(inline)')}")
    for url in page.links+page.assets:
        u=urlsplit(url)
        if u.scheme in ['mailto','data','javascript','tel']: continue
        if u.netloc and u.netloc!='varzin.org': external.add(url); continue
        target=(root/unquote(u.path).lstrip('/') if u.path.startswith('/') else file.parent/unquote(u.path)) if u.path else file
        if target.is_dir(): target=target/'index.html'
        target=target.resolve()
        if not target.exists(): errors.append(f'{r}: missing {url}')
        elif u.fragment and target in pages and unquote(u.fragment) not in pages[target].ids: errors.append(f'{r}: missing fragment {url}')
    if r in exempt: continue
    if raw.lower().find('<meta charset') < 0 or raw.lower().find('<meta charset') > 1024: errors.append(f'{r}: charset missing or after first 1024 bytes')
    if not page.lang: errors.append(f'{r}: missing html lang')
    if page.h1 != 1: errors.append(f'{r}: expected exactly one h1, found {page.h1}')
    if page.titles != 1: errors.append(f'{r}: expected exactly one document title, found {page.titles}')
    if page.descriptions != 1: errors.append(f'{r}: expected exactly one meta description, found {page.descriptions}')
    if len(page.canonicals) != 1: errors.append(f'{r}: expected exactly one canonical, found {len(page.canonicals)}')
    elif page.canonicals[0] != canonical_for(file): errors.append(f'{r}: canonical mismatch {page.canonicals[0]} != {canonical_for(file)}')
    for required in ['og:title','og:description','og:image','twitter:title','twitter:description','twitter:image']:
        if required not in raw: errors.append(f'{r}: missing social metadata {required}')

sitemap=(root/'sitemap.xml').read_text()
sitemap_urls=set(re.findall(r'<loc>([^<]+)</loc>', sitemap))
noindex=set(config.get('noindexFiles', []))
expected_indexable={canonical_for(p) for p in files if rel(p) not in exempt and rel(p) not in noindex}
missing=expected_indexable-sitemap_urls; extra=sitemap_urls-expected_indexable
if missing: errors.append('sitemap missing: '+', '.join(sorted(missing)))
if extra: errors.append('sitemap extra: '+', '.join(sorted(extra)))
if 'Sitemap:' not in (root/'robots.txt').read_text(): errors.append('robots.txt: missing Sitemap directive')


# Reciprocal language alternatives for the canonical English and Persian landing pages.
root_html=(root/'index.html').read_text()
fa_html=(root/'fa'/'index.html').read_text() if (root/'fa'/'index.html').exists() else ''
for label,html in [('index.html',root_html),('fa/index.html',fa_html)]:
    for lang,href in [('en',base+'/'),('fa',base+'/fa/'),('x-default',base+'/')]:
        if f'hreflang="{lang}"' not in html or f'href="{href}"' not in html:
            errors.append(f'{label}: missing hreflang {lang} -> {href}')

for verification in ['googlea6193a9448130bb8.html','googleaf108ddb056bc0b3.html']:
    vf=root/verification
    expected=f'google-site-verification: {verification}'
    if not vf.exists() or expected not in vf.read_text(errors='ignore'):
        errors.append(f'{verification}: Google verification file missing or altered')

manifest=root/'manifest.webmanifest'
if not manifest.exists(): errors.append('manifest.webmanifest: missing')
else:
    try:
        manifest_data=json.loads(manifest.read_text())
        for icon in manifest_data.get('icons',[]):
            src=icon.get('src','')
            if src.startswith('/') and not (root/src.lstrip('/')).exists(): errors.append(f'manifest.webmanifest: missing icon {src}')
    except Exception as exc: errors.append(f'manifest.webmanifest: invalid JSON: {exc}')

# Public research-output registry must remain synchronized across the machine-readable list and human-facing registry/profile.
outputs_file=root/'research-outputs.json'
if not outputs_file.exists(): errors.append('research-outputs.json: missing')
else:
    try:
        outputs=json.loads(outputs_file.read_text()).get('records',[])
        registry=(root/'all-dois.html').read_text()
        profile=(root/'researcher.html').read_text()
        if len(outputs) < 7: errors.append(f'research-outputs.json: expected at least 7 public records, found {len(outputs)}')
        for record in outputs:
            doi=record.get('doi',''); url=record.get('url',''); title=record.get('title',''); record_url=record.get('varzinRecordUrl','')
            if not doi or not url or not title: errors.append('research-outputs.json: record missing doi/url/title')
            for key in ['publicationDate','creatorAsDeposited','creatorNormalized','orcid','resourceType','metadataSource','metadataVerified']:
                if not record.get(key): errors.append(f'research-outputs.json: {doi} missing {key}')
            if url and url not in registry: errors.append(f'all-dois.html: missing public record {url}')
            if url and url not in profile: errors.append(f'researcher.html: missing public record {url}')
            if record_url:
                rp=root/urlsplit(record_url).path.lstrip('/')
                if not rp.exists(): errors.append(f'research-outputs.json: missing VARZIN record page {record_url}')
                else:
                    txt=rp.read_text()
                    if doi not in txt or title not in txt: errors.append(f'{rp.relative_to(root)}: publication identity mismatch')
                    if record.get('resourceType')=='Preprint' and 'citation_doi' not in txt: errors.append(f'{rp.relative_to(root)}: missing scholarly citation metadata')
            else: errors.append(f'research-outputs.json: {doi} missing varzinRecordUrl')
    except Exception as exc: errors.append(f'research-outputs.json: invalid JSON: {exc}')

index_keys=list(root.glob('indexnow-*.txt'))
if len(index_keys)!=1: errors.append(f'IndexNow: expected one key file, found {len(index_keys)}')
elif not re.fullmatch(r'[A-Fa-f0-9]{8,128}', index_keys[0].read_text().strip()): errors.append('IndexNow: invalid key file contents')

print(json.dumps({'pages':len(pages),'external_urls_inventoried':len(external),'indexable_pages':len(expected_indexable),'errors':errors,'warnings':warnings},indent=2))
raise SystemExit(bool(errors))
