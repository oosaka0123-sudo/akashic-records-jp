const tabs=await (await fetch('http://127.0.0.1:9223/json')).json();
const t=tabs.find(x=>x.type==='page');
const ws=new WebSocket(t.webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);
let id=0;const call=(method,params={})=>new Promise(res=>{const n=++id;const h=e=>{const m=JSON.parse(e.data);if(m.id===n){ws.removeEventListener('message',h);res(m);}};ws.addEventListener('message',h);ws.send(JSON.stringify({id:n,method,params}));});
await call('Runtime.evaluate',{expression:"location.href='https://oosaka0123-sudo.github.io/akashic-records-jp/history/';"});await new Promise(r=>setTimeout(r,1000));
let r=await call('Runtime.evaluate',{expression:"(()=>{const b=document.querySelector('.menu-button'),n=document.querySelector('.global-nav');b.click();return {expanded:b.getAttribute('aria-expanded'),text:b.textContent,open:n.classList.contains('open'),opacity:getComputedStyle(n).opacity,visibility:getComputedStyle(n).visibility,scrollWidth:document.documentElement.scrollWidth,innerWidth:innerWidth}})()",returnByValue:true});
console.log(JSON.stringify(r.result.result.value));
ws.close();
