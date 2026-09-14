from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
root=Path(r'C:\Users\oosak\Documents\akashic-records-jp-review')
class P(HTMLParser):
    def __init__(self): super().__init__(); self.hrefs=[]
    def handle_starttag(self,tag,attrs):
        if tag=='a':
            d=dict(attrs); h=d.get('href')
            if h: self.hrefs.append(h)
bad=[]
for f in root.rglob('*.html'):
    if '.git' in f.parts: continue
    p=P(); p.feed(f.read_text(encoding='utf-8'))
    for h in p.hrefs:
        if h.startswith(('http://','https://','mailto:','tel:','#')): continue
        u=urlsplit(h); path=unquote(u.path)
        target=(f.parent/path).resolve() if path else f
        ok=target.exists() or (target/'index.html').exists() or target.with_suffix('.html').exists()
        if not ok: bad.append((str(f.relative_to(root)),h,str(target)))
print('HTML files',sum(1 for _ in root.rglob('*.html')))
print('Broken',len(bad))
for x in bad: print('BROKEN',x[0],'->',x[1])
