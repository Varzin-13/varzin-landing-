import json, html
from pathlib import Path

root = Path(__file__).resolve().parents[1] if '__file__' in globals() else Path.cwd()
if not (root / 'research-outputs.json').exists(): root = Path.cwd()
data = json.loads((root / 'research-outputs.json').read_text())
outdir = root / 'publications'; outdir.mkdir(exist_ok=True)

def esc(v): return html.escape(str(v or ''), quote=True)
def li(items): return ''.join(f'<li>{esc(x)}</li>' for x in (items or []))
def size(n):
    if not n: return ''
    n=float(n)
    for unit in ['B','KB','MB','GB']:
        if n < 1024 or unit == 'GB': return f'{n:.2f} {unit}' if unit != 'B' else f'{int(n)} B'
        n /= 1024

def media_obj(m):
    if not m: return None
    kind=m.get('kind','file')
    mime='application/pdf' if kind=='paper' else ('application/zip' if kind=='code-package' else 'application/octet-stream')
    return {'@type':'MediaObject','name':m['name'],'contentUrl':m['url'],'encodingFormat':mime,'contentSize':size(m.get('sizeBytes'))}

def schema_for(r, rid):
    stype='SoftwareSourceCode' if r['resourceType']=='Software' else 'ScholarlyArticle'
    media=[media_obj(r.get('paperFile'))]+[media_obj(x) for x in r.get('codeArtifacts',[])]
    media=[x for x in media if x]
    obj={'@context':'https://schema.org','@type':stype,'@id':f'https://varzin.org/publications/zenodo-{rid}.html#record',
      'name':r['title'],'headline':r['title'],'datePublished':r['publicationDate'],'version':r['version'],'identifier':r['doi'],
      'url':f'https://varzin.org/publications/zenodo-{rid}.html','sameAs':[r['url'],r['zenodoRecordUrl']],
      'author':{'@type':'Person','name':'Reza Nirouyar','url':'https://varzin.org/researcher.html','identifier':'https://orcid.org/0009-0000-4690-6842'},
      'description':r.get('currentInterpretation') or r['overview'],'abstract':r['overview'],'keywords':r.get('keywords',[]),
      'isAccessibleForFree':True,'mainEntityOfPage':f'https://varzin.org/publications/zenodo-{rid}.html',
      'isPartOf':{'@type':'WebSite','name':'VARZIN Project','url':'https://varzin.org/'}}
    if media: obj['encoding']=media
    if r.get('license')=='CC BY 4.0': obj['license']='https://creativecommons.org/licenses/by/4.0/'
    if r.get('license')=='MIT': obj['license']='https://opensource.org/license/mit'
    return obj

def file_card(m, label):
    if not m: return ''
    return f'''<article class="vr-record"><span class="vr-index">{esc(label)}</span><div><h3>{esc(m['name'])}</h3><p>{esc(m.get('kind','file'))} · {esc(size(m.get('sizeBytes')))} · <code>{esc(m.get('checksum',''))}</code></p><a class="vr-doi" href="{esc(m['url'])}" target="_blank" rel="noopener">Open archived file ↗</a></div></article>'''

for r in data['records']:
    rid=r['doi'].split('.')[-1]
    abstract=r.get('currentInterpretation') or r['overview']
    meta_description=(r.get('scope') or r.get('evidenceStatus') or abstract).strip()
    kw=', '.join(r.get('keywords',[]))
    citation=''
    if r['resourceType']!='Software':
        pdf=r.get('paperFile',{}).get('url','')
        citation=f'''<meta name="citation_title" content="{esc(r['title'])}">
<meta name="citation_author" content="Reza Nirouyar">
<meta name="citation_publication_date" content="{esc(r['publicationDate'])}">
<meta name="citation_doi" content="{esc(r['doi'])}">
<meta name="citation_abstract" content="{esc(abstract)}">
<meta name="citation_keywords" content="{esc(kw)}">
<meta name="citation_fulltext_html_url" content="https://varzin.org/publications/zenodo-{rid}.html">
{f'<meta name="citation_pdf_url" content="{esc(pdf)}">' if pdf else ''}'''
    dc=f'''<meta name="DC.title" content="{esc(r['title'])}">
<meta name="DC.creator" content="Reza Nirouyar">
<meta name="DC.date" content="{esc(r['publicationDate'])}">
<meta name="DC.identifier" content="doi:{esc(r['doi'])}">
<meta name="DC.type" content="{esc(r['resourceType'])}">
<meta name="DC.relation" content="{esc(r['zenodoRecordUrl'])}">
{f'<meta name="DC.rights" content="{esc(r.get("license"))}">' if r.get('license') else ''}'''
    schema=json.dumps(schema_for(r,rid),ensure_ascii=False)
    related=[x for x in data['records'] if x['title']==r['title'] and x['doi']!=r['doi']]
    related_html=''
    if related:
        series=[r,*related]
        latest=max(series,key=lambda x:x.get('publicationDate',''))
        links=''.join(f'<a class="vr-button" href="{x["varzinRecordUrl"].replace("https://varzin.org","")}">{esc(x["version"])} record</a>' for x in related)
        current_note=''
        if latest['doi'] != r['doi']:
            current_note=f'<div class="vr-callout"><p><strong>Current series interpretation:</strong> this version remains citable as a fixed historical record, but the later <a href="{latest["varzinRecordUrl"].replace("https://varzin.org","")}">{esc(latest["version"])} deposit</a> is the primary source for the current interpretation of this experimental line.</p></div>'
        related_html=current_note+f'<div class="vr-actions"><span class="vr-index">Related versions</span>{links}</div>'
    media_cards=file_card(r.get('paperFile'),'Full text') + ''.join(file_card(x,'Code / data') for x in r.get('codeArtifacts',[]))
    scale_cards=''.join(
        f'<article class="vr-fact"><span class="vr-index">{esc(x.get("label"))}</span><h3>{esc(x.get("scale"))}</h3><p>{esc(x.get("role"))}</p></article>'
        for x in r.get('scaleLineage',[])
    )
    scale_section=(f'<section class="vr-editorial-section"><span class="vr-kicker">04 / scale & benchmark lineage</span><h2>How this experiment relates to Core-30 and later scaled benchmarks.</h2><div class="vr-fact-grid">{scale_cards}</div><div class="vr-callout"><p><strong>Scale boundary:</strong> Core-30 remains a canonical reference subset. Larger generated corpora and later benchmark datasets are distinct experimental artifacts and should not be silently relabeled as a single enlarged canonical lexicon.</p></div></section>' if scale_cards else '')
    license_text=r.get('license') or 'Not supplied in current Zenodo API metadata'
    status=r.get('peerReviewStatus') or 'Repository research record.'
    evidence=r.get('evidenceStatus') or r['scope']
    title_suffix=(" — "+esc(r['version'])) if r['doi'] in {'10.5281/zenodo.22258644','10.5281/zenodo.22262388','10.5281/zenodo.22287006'} else ''
    page=f'''<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{esc(r['searchTitle'])}</title><meta name="description" content="{esc(meta_description)}">{citation}\n{dc}
<link rel="alternate" type="application/json" href="/research-outputs.json" title="VARZIN machine-readable research records">
<link rel="alternate" type="text/plain" href="/llms.txt" title="VARZIN LLM-readable research index">
<script type="application/ld+json">{schema}</script><link rel="stylesheet" href="/assets/research.css"><script src="/assets/research.js" defer></script></head>
<body class="vr-document"><a class="vr-skip" href="#vr-main">Skip to content</a>
<header class="vr-header"><a class="vr-brand" href="/"><span class="vr-mark" aria-hidden="true">V</span>VARZIN<span class="vr-brand-sub">Independent research</span></a><nav class="vr-desktop" aria-label="Research navigation"><a href="/field-index.html">Research</a><a href="/atlas.html">Atlas</a><a href="/all-dois.html">Publications</a><a href="/cognitive-captcha.html">Products</a><a href="/finite-affine-systems.html">Affine systems</a><a href="/ai-structure-auditing.html">AI auditing</a><a href="/feedback.html">Contact</a></nav><details class="vr-mobile"><summary>Menu <span aria-hidden="true">＋</span></summary><nav aria-label="Mobile research navigation"><a href="/field-index.html">Research</a><a href="/atlas.html">Atlas</a><a href="/all-dois.html">Publications</a><a href="/cognitive-captcha.html">Products</a><a href="/finite-affine-systems.html">Affine systems</a><a href="/ai-structure-auditing.html">AI auditing</a><a href="/feedback.html">Contact</a></nav></details></header>
<main id="vr-main" tabindex="-1"><div class="vr-doc-shell">
<section class="vr-page-hero"><span class="vr-kicker">Research record / {esc(r['resourceType'])}</span><h1>{esc(r['title'])}{title_suffix}</h1><p>{esc(abstract)}</p><div class="vr-page-meta"><span>{esc(r['version'])}</span><span>{esc(r['publicationDate'])}</span><span>Zenodo</span><span>{esc(r['resourceType'])}</span></div></section>
<div class="vr-status-band"><strong>Evidence status</strong><p>{esc(evidence)} <strong>Publication status:</strong> {esc(status)}</p></div>
<section class="vr-editorial-section"><span class="vr-kicker">01 / question</span><h2>Research question and current reading.</h2><div class="vr-callout"><span class="vr-index">Research question</span><h3>{esc(r['researchQuestion'])}</h3></div><p>{esc(r.get('currentInterpretation') or r['contribution'])}</p></section>
<section class="vr-editorial-section"><span class="vr-kicker">02 / methods</span><h2>What was actually tested.</h2><ul>{li(r.get('methods'))}</ul></section>
<section class="vr-editorial-section"><span class="vr-kicker">03 / results</span><h2>Strongest supported findings.</h2><ul>{li(r.get('keyFindings'))}</ul></section>
{scale_section}<section class="vr-editorial-section"><span class="vr-kicker">05 / falsification</span><h2>Negative findings are part of the result.</h2><ul>{li(r.get('negativeFindings'))}</ul></section>
<section class="vr-editorial-section"><span class="vr-kicker">06 / limits</span><h2>What this record does not establish.</h2><ul>{li(r.get('limitations'))}</ul><div class="vr-callout"><p><strong>Boundary:</strong> a Zenodo deposit is a citable public record; it does not by itself imply peer review, independent validation, causal inference, or generalization beyond the documented experiment.</p></div></section>
<section class="vr-editorial-section"><span class="vr-kicker">07 / reproducibility</span><h2>Full text, code, data, and provenance.</h2><ul>{li(r.get('reproducibility'))}</ul><div class="vr-record-list">{media_cards or '<p>No version-specific downloadable artifact was verified for this field.</p>'}</div><p class="vr-small">{esc(r.get('sourceVerification',''))}</p></section>
<section class="vr-editorial-section"><span class="vr-kicker">08 / citation</span><h2>Canonical version-specific record.</h2><div class="vr-record-list"><article class="vr-record"><span class="vr-index">DOI</span><div><h3>{esc(r['doi'])}</h3><p>{esc(r['citation'])}</p><div class="vr-actions"><a class="vr-button vr-primary" href="{esc(r['url'])}">Open DOI ↗</a><a class="vr-button" href="{esc(r['zenodoRecordUrl'])}">Zenodo record ↗</a></div></div></article></div></section>
<section class="vr-editorial-section"><span class="vr-kicker">09 / repository metadata</span><h2>Verified repository identity.</h2><div class="vr-fact-grid"><article class="vr-fact"><span class="vr-index">Creator as deposited</span><h3>{esc(r['creatorAsDeposited'])}</h3><p>Normalized project identity: Reza Nirouyar · ORCID 0009-0000-4690-6842.</p></article><article class="vr-fact"><span class="vr-index">Published</span><h3>{esc(r['publicationDate'])}</h3><p>Version {esc(r['version'])} · {esc(r['resourceType'])} · open access.</p></article><article class="vr-fact"><span class="vr-index">License</span><h3>{esc(license_text)}</h3><p>Reported only when present in verified Zenodo metadata.</p></article></div><p>{esc(r['repositoryNote'])}</p></section>
<section class="vr-editorial-section"><span class="vr-kicker">10 / version provenance</span><h2>Keep this deposit distinct from later interpretation.</h2><p>{esc(r['contribution'])}</p><p>{esc(r['versionNote'])}</p>{related_html}<div class="vr-actions"><a class="vr-button vr-primary" href="/all-dois.html">Publication registry</a><a class="vr-button" href="/researcher.html">Researcher profile</a><a class="vr-button" href="/ai-structure-auditing.html">AI structure auditing</a><a class="vr-button" href="/research-outputs.json">Machine-readable record</a></div></section>
</div></main><footer class="vr-footer"><div><a class="vr-brand" href="/">VARZIN</a><p>Independent research. Explicit boundaries.<br>A public record that includes what did not work.</p></div><div><a href="/all-dois.html">Publications &amp; DOI records</a><a href="/cognitive-captcha.html">Cognitive CAPTCHA</a><a href="/researcher.html">Researcher profile</a><a href="/citation.html">Citation metadata</a><a href="/research-outputs.json">Machine-readable research outputs</a><a href="/llms.txt">LLM-readable index</a></div><div><a href="https://github.com/Varzin-13">GitHub ↗</a><a href="https://orcid.org/0009-0000-4690-6842">ORCID ↗</a><a href="mailto:contact@varzin.org">contact@varzin.org</a></div><p class="vr-colophon">VARZIN Project · Reza Nirouyar <span>Evidence-first research portal / 2026</span></p></footer></body></html>'''
    (outdir/f'zenodo-{rid}.html').write_text(page)
    r['varzinRecordUrl']=f'https://varzin.org/publications/zenodo-{rid}.html'

(root/'research-outputs.json').write_text(json.dumps(data,indent=2,ensure_ascii=False)+'\n')
print(f'Generated {len(data["records"])} evidence-rich publication pages.')
