import fs from 'fs';
const f='assets/js/main.js';
let s=fs.readFileSync(f,'utf8');
const old=s.slice(0,s.indexOf('\n\nconst explorer'));
const neo=`const button=document.querySelector('.menu-button');
const nav=document.querySelector('.global-nav');
if(button&&nav){
  const setOpen=open=>{nav.classList.toggle('open',open);button.setAttribute('aria-expanded',String(open));button.textContent=open?'×':'INDEX';button.setAttribute('aria-label',open?'メニューを閉じる':'メニューを開く');document.body.classList.toggle('menu-open',open);};
  button.setAttribute('aria-label','メニューを開く');
  button.addEventListener('click',()=>setOpen(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setOpen(false)));
  addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){setOpen(false);button.focus();}});
}`;
s=s.replace(old,neo);
fs.writeFileSync(f,s,'utf8');
console.log('menu upgraded');