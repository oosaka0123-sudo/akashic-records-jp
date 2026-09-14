document.querySelectorAll('.site-menu .global-nav a').forEach(a=>{
  a.addEventListener('click',()=>a.closest('details.site-menu')?.removeAttribute('open'));
});
