import json, html
from pathlib import Path

root = Path(__file__).resolve().parents[1]
data = json.loads((root / 'research-outputs.json').read_text())
outdir = root / 'publications'
outdir.mkdir(exist_ok=True)

def esc(value):
    return html.escape(str(value or ''))

def schema_for(r, rid):
    stype = 'SoftwareSourceCode' if r['resourceType'] == 'Software' else 'ScholarlyArticle'
    obj = {
        '@context':'https://schema.org', '@type':stype,
        '@id':f'https://varzin.org/publications/zenodo-{rid}.html#record',
        'name':r['title'], 'headline':r['title'], 'datePublished':r['publicationDate'],
        'version':r['version'], 'identifier':r['doi'],
        'url':f'https://varzin.org/publications/zenodo-{rid}.html',
        'sameAs':[r['url'], r['zenodoRecordUrl']],
        'author':{'@type':'Person','name':'Reza Nirouyar','url':'https://varzin.org/researcher.html','identifier':'https://orcid.org/0009-0000-4690-6842'},
        'description':r['overview'], 'abstract':r['overview'],
        'keywords':r.get('keywords', []), 'isAccessibleForFree':True,
        'mainEntityOfPage':f'https://varzin.org/publications/zenodo-{rid}.html',
        'isPartOf':{'@type':'WebSite','name':'VARZIN','url':'https://varzin.org/'}
    }
    if r.get('license') == 'CC BY 4.0': obj['license'] = 'https://creativecommons.org/licenses/by/4.0/'
    if r.get('license') == 'MIT': obj['license'] = 'https://opensource.org/license/mit'
    return obj

for r in data['records']:
    rid = r['doi'].split('.')[-1]
    citation_meta = ''
    if r['resourceType'] != 'Software':
        citation_meta = f'''<meta name="citation_title" content="{esc(r['title'])}">
<meta name="citation_author" content="Reza Nirouyar">
<meta name="citation_publication_date" content="{r['publicationDate']}">
<meta name="citation_doi" content="{r['doi']}">'''
    schema = json.dumps(schema_for(r, rid), ensure_ascii=False)
    license_text = r.get('license') or 'Not supplied in current Zenodo API metadata'
    related = [x for x in data['records'] if x['title'] == r['title'] and x['doi'] != r['doi']]
    related_html = ''
    if related:
        links = ''.join(f'<a class="vr-button" href="{x["varzinRecordUrl"].replace("https://varzin.org", "")}">{esc(x["version"])} record</a>' for x in related)
        related_html = f'<div class="vr-actions"><span class="vr-index">Related versions</span>{links}</div>'

    page = f'''<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{esc(r['searchTitle'])}</title><meta name="description" content="{esc(r['scope'])}">{citation_meta}
<script type="application/ld+json">{schema}</script><link rel="stylesheet" href="/assets/research.css"><script src="/assets/research.js" defer></script></head>
<body class="vr-document"><a class="vr-skip" href="#vr-main">Skip to content</a>
<header class="vr-header"><a class="vr-brand" href="/"><span class="vr-mark" aria-hidden="true">V</span>VARZIN<span class="vr-brand-sub">Independent research</span></a><nav class="vr-desktop" aria-label="Research navigation"><a href="/field-index.html">Research</a><a href="/atlas.html">Atlas</a><a href="/all-dois.html">Publications</a><a href="/finite-affine-systems.html">Affine systems</a><a href="/ai-structure-auditing.html">AI auditing</a><a href="/feedback.html">Contact</a></nav><details class="vr-mobile"><summary>Menu <span aria-hidden="true">＋</span></summary><nav aria-label="Mobile research navigation"><a href="/field-index.html">Research</a><a href="/atlas.html">Atlas</a><a href="/all-dois.html">Publications</a><a href="/finite-affine-systems.html">Affine systems</a><a href="/ai-structure-auditing.html">AI auditing</a><a href="/feedback.html">Contact</a></nav></details></header>
<main id="vr-main" tabindex="-1"><div class="vr-doc-shell"><section class="vr-page-hero"><span class="vr-kicker">Research record / {esc(r['resourceType'])}</span><h1>{esc(r['title'])}</h1><p>{esc(r['scope'])}</p><div class="vr-page-meta"><span>{esc(r['version'])}</span><span>{r['publicationDate']}</span><span>Zenodo</span></div></section>
<div class="vr-status-band"><strong>Evidence boundary</strong><p>A Zenodo deposit is a citable public record; it does not by itself imply peer review, independent validation, or broader empirical generalization.</p></div>
<section class="vr-editorial-section"><span class="vr-kicker">01 / record overview</span><h2>What this record documents.</h2><p>{esc(r['overview'])}</p><div class="vr-callout"><span class="vr-index">Research question</span><h3>{esc(r['researchQuestion'])}</h3><p>This question is interpreted within the documented model, dataset, implementation, and evaluation procedure; it is not generalized beyond that evidence.</p></div></section>
<section class="vr-editorial-section"><span class="vr-kicker">02 / citation</span><h2>Canonical record metadata.</h2><div class="vr-record-list"><article class="vr-record"><span class="vr-index">DOI</span><div><h3>{r['doi']}</h3><p>{esc(r['citation'])}</p><div class="vr-actions"><a class="vr-button vr-primary" href="{r['url']}">Open DOI ↗</a><a class="vr-button" href="{r['zenodoRecordUrl']}">Open Zenodo record ↗</a></div></div></article></div></section>
<section class="vr-editorial-section"><span class="vr-kicker">03 / verified metadata</span><h2>Repository metadata, checked against Zenodo.</h2><div class="vr-fact-grid"><article class="vr-fact"><span class="vr-index">Creator as deposited</span><h3>{esc(r['creatorAsDeposited'])}</h3><p>Normalized VARZIN researcher identity: Reza Nirouyar · ORCID 0009-0000-4690-6842.</p></article><article class="vr-fact"><span class="vr-index">Published</span><h3>{r['publicationDate']}</h3><p>Version {esc(r['version'])} · {esc(r['resourceType'])} · open access.</p></article><article class="vr-fact"><span class="vr-index">License</span><h3>{esc(license_text)}</h3><p>Reported only when present in verified Zenodo metadata.</p></article></div><p>{esc(r['repositoryNote'])}</p></section>
<section class="vr-editorial-section"><span class="vr-kicker">04 / contribution</span><h2>What this record adds to the research trail.</h2><p>{esc(r['contribution'])}</p><p>{esc(r['versionNote'])}</p>{related_html}</section>
<section class="vr-editorial-section"><span class="vr-kicker">05 / provenance</span><h2>Keep the record distinct from later interpretation.</h2><p>{esc(r['scope'])}</p><p>The VARZIN portal preserves the version-specific DOI, deposited creator string, publication date, and repository identity while allowing later project pages to state narrower interpretations, corrections, or negative results explicitly.</p><div class="vr-actions"><a class="vr-button vr-primary" href="/all-dois.html">Publication registry</a><a class="vr-button" href="/researcher.html">Researcher profile</a><a class="vr-button" href="/ai-structure-auditing.html">AI structure auditing</a></div></section></div></main>
<footer class="vr-footer"><div><a class="vr-brand" href="/">VARZIN</a><p>Independent research. Explicit boundaries.<br>A public record that includes what did not work.</p></div><div><a href="/all-dois.html">Publications &amp; DOI records</a><a href="/researcher.html">Researcher profile</a><a href="/CITATION.cff">Citation metadata</a><a href="/privacy.html">Privacy &amp; analytics</a></div><div><a href="https://github.com/Varzin-13">GitHub ↗</a><a href="https://orcid.org/0009-0000-4690-6842">ORCID ↗</a><a href="mailto:contact@varzin.org">contact@varzin.org</a></div><p class="vr-colophon">VARZIN Project · Reza Nirouyar <span>Evidence-first research portal / 2026</span></p></footer></body></html>'''
    (outdir / f'zenodo-{rid}.html').write_text(page)
    r['varzinRecordUrl'] = f'https://varzin.org/publications/zenodo-{rid}.html'

(root / 'research-outputs.json').write_text(json.dumps(data, indent=2, ensure_ascii=False) + '\n')
print(f'Generated {len(data["records"])} publication record pages.')
