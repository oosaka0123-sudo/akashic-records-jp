const button=document.querySelector('.menu-button');
const nav=document.querySelector('.global-nav');
if(button&&nav){
  const setOpen=(open)=>{
    nav.classList.toggle('open',open);
    button.setAttribute('aria-expanded',String(open));
    button.textContent=open?'×':'MENU';
    button.setAttribute('aria-label',open?'メニューを閉じる':'メニューを開く');
    document.body.classList.toggle('menu-open',open);
  };
  setOpen(false);
  button.addEventListener('click',()=>setOpen(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setOpen(false)));
  addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){setOpen(false);button.focus();}});
}


