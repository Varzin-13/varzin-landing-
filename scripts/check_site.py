from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import json,subprocess,sys
root=Path(sys.argv[1]).resolve() if len(sys.argv)>1 else Path(__file__).resolve().parent.parent
class Page(HTMLParser):
 def __init__(self,text):
  super().__init__();self.ids=[];self.links=[];self.assets=[];self.feed(text)
 def handle_starttag(self,tag,attrs):
  d=dict(attrs)
  if 'id' in d:self.ids.append(d['id'])
  if tag=='a' and 'href' in d:self.links.append(d['href'])
  if tag in ['script','img','audio','source'] and d.get('src'):self.assets.append(d['src'])
  if tag=='link' and d.get('rel') in ['stylesheet','icon']:self.assets.append(d['href'])
files=list(root.glob('*.html'))+list((root/'paper').glob('*.html'))
pages={p:Page(p.read_text()) for p in files};errors=[];external=set()
for file,page in pages.items():
 for id in set(page.ids):
  if page.ids.count(id)>1:errors.append(f'{file.name}: duplicate ID {id}')
 for url in page.links+page.assets:
  u=urlsplit(url)
  if u.scheme in ['mailto','data','javascript','tel']:continue
  if u.netloc and u.netloc!='varzin.org':external.add(url);continue
  target=(root/unquote(u.path).lstrip('/') if u.path.startswith('/') else file.parent/unquote(u.path)) if u.path else file
  if target.is_dir():target=target/'index.html'
  target=target.resolve()
  if not target.exists():errors.append(f'{file.relative_to(root)}: missing {url}')
  elif u.fragment and target in pages and unquote(u.fragment) not in pages[target].ids:errors.append(f'{file.relative_to(root)}: missing fragment {url}')
print(json.dumps({'pages':len(pages),'external_urls_inventoried':len(external),'errors':errors},indent=2))
raise SystemExit(bool(errors))
