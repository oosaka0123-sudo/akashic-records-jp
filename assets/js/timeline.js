(function(){
  var track=document.querySelector('[data-timeline]');
  if(!track)return;
  var items=Array.prototype.slice.call(track.querySelectorAll('.timeline-item'));
  var buttons=Array.prototype.slice.call(document.querySelectorAll('[data-era-filter]'));

  buttons.forEach(function(btn){
    btn.addEventListener('click',function(){
      var era=btn.getAttribute('data-era-filter');
      buttons.forEach(function(b){b.setAttribute('aria-current',String(b===btn));});
      items.forEach(function(item){
        var show=era==='all'||item.getAttribute('data-era')===era;
        item.hidden=!show;
      });
    });
  });

  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        entry.target.setAttribute('data-active',String(entry.isIntersecting));
      });
    },{rootMargin:'-35% 0px -55% 0px'});
    items.forEach(function(item){io.observe(item);});
  }
})();
