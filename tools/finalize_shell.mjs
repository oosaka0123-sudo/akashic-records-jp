import fs from 'fs'; import path from 'path';
let sm=fs.readFileSync('sitemap.xml','utf8').replaceAll('`n','\n'); fs.writeFileSync('sitemap.xml',sm,'utf8');
let bad=[];
function walk(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){if(e.name==='.git')continue;const q=path.join(d,e.name);if(e.isDirectory())walk(q);else if(e.name.endsWith('.html'))check(q);}}
function check(q){const s=fs.readFileSync(q,'utf8');for(const m of s.matchAll(/href="([^"#]+)(?:#[^"]*)?"/g)){const h=m[1];if(/^(https?:|mailto:|tel:)/.test(h))continue;let t=path.resolve(path.dirname(q),h);if(h.endsWith('/'))t=path.join(t,'index.html');if(!fs.existsSync(t))bad.push([q,h]);}}
walk('.'); console.log('BROKEN',bad.length); if(bad.length)console.log(bad.slice(0,20));
const home=fs.readFileSync('index.html','utf8'); console.log('PRIVACY_NAV',home.includes('./privacy/'),'CONTACT_NAV',home.includes('./contact/'));
const js=fs.readFileSync('assets/js/main.js','utf8'); console.log('CLOSE_X',js.includes("button.textContent=open?'×':'INDEX'"),'ESC_CLOSE',js.includes("e.key==='Escape'"));
const css=fs.readFileSync('assets/css/style.css','utf8'); console.log('FULLSCREEN_HERO',css.includes('.home .cinema-hero{min-height:100svh'),'OVERLAY_MENU',css.includes('.global-nav{position:fixed!important;inset:0!important'));
