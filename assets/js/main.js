const button=document.querySelector('.menu-button');
const nav=document.querySelector('.global-nav');
if(button&&nav){button.addEventListener('click',()=>{const open=nav.classList.toggle('open');button.setAttribute('aria-expanded',String(open));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');button.setAttribute('aria-expanded','false');}));}

const explorer=document.querySelector('[data-memory-explorer]');
if(explorer){
  const detail=explorer.querySelector('.map-detail');
  const data={
    akashic:['AKASHIC RECORDS','中央概念。歴史的関係と、後世に指摘された類似概念を分けて読むことが重要です。'],
    akasha:['ĀKĀŚA','語源上の重要な背景。ただし古代インドのアーカーシャと近代の「宇宙の記録庫」をそのまま同一視はできません。'],
    theosophy:['THEOSOPHY','19世紀西洋神秘思想を通じて、アーカーシャと宇宙的記録という発想が結び付けられていきました。'],
    jung:['JUNG / COLLECTIVE UNCONSCIOUS','集合的無意識とは概念的な類似を指摘できますが、歴史的起源も理論体系も別です。'],
    alaya:['ĀLAYA-VIJÑĀNA','阿頼耶識との類似が語られることがありますが、仏教思想上の意味を「宇宙データベース」と同一視するのは不正確です。'],
    quantum:['QUANTUM PHYSICS','量子力学がアカシックレコードの存在を証明したという科学的合意はありません。類比と実証は分ける必要があります。']
  };
  const nodes=[...explorer.querySelectorAll('.map-node')];
  const select=node=>{nodes.forEach(n=>n.classList.toggle('is-active',n===node));const v=data[node.dataset.key];if(v){detail.innerHTML=`<span class="detail-index">SELECTED / NODE</span><h3>${v[0]}</h3><p>${v[1]}</p>`;}};
  nodes.forEach(node=>{node.addEventListener('click',()=>select(node));node.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select(node);}});});
}

if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
  const hero=document.querySelector('.cinema-hero');
  const media=document.querySelector('.hero-media');
  if(hero&&media){let ticking=false;addEventListener('scroll',()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{const r=hero.getBoundingClientRect();const p=Math.max(0,Math.min(1,-r.top/innerHeight));media.style.transform=`translate3d(0,${p*28}px,0) scale(${1+p*.035})`;ticking=false;});},{passive:true});}
}

if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
  const depth=document.querySelector('.memory-depth');
  const universe=document.querySelector('.depth-universe');
  const archive=document.querySelector('.depth-archive');
  if(depth&&universe&&archive){
    let depthTick=false;
    const renderDepth=()=>{const r=depth.getBoundingClientRect();const p=Math.max(-1,Math.min(1,(innerHeight/2-(r.top+r.height/2))/innerHeight));universe.style.transform=`translate3d(0,${p*24}px,0) scale(1.1)`;archive.style.transform=`translate3d(0,${p*-34}px,0) scale(1.08)`;depthTick=false;};
    addEventListener('scroll',()=>{if(!depthTick){depthTick=true;requestAnimationFrame(renderDepth);}},{passive:true});renderDepth();
  }
}
