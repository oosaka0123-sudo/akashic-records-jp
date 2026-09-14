const button=document.querySelector('.menu-button');
const nav=document.querySelector('.global-nav');
if(button&&nav){
  const setOpen=(open)=>{
    nav.classList.toggle('open',open);
    button.setAttribute('aria-expanded',String(open));
    button.textContent=open?'\u00d7':'MENU';
    document.body.classList.toggle('menu-open',open);
    const imp=(k,v)=>nav.style.setProperty(k,v,'important');
    if(open){imp('transition','none');imp('display','flex');imp('opacity','1');imp('visibility','visible');imp('position','fixed');imp('inset','0');imp('z-index','101');imp('transform','none');imp('pointer-events','auto');}
    else{['transition','opacity','visibility','transform','pointer-events','position','inset','z-index','display'].forEach(k=>nav.style.removeProperty(k));}
  };
  setOpen(false);
  button.addEventListener('click',()=>setOpen(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setOpen(false)));
  window.addEventListener('keydown',e=>{if(e.key==='Escape')setOpen(false);});
}
