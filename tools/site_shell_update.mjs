import fs from 'fs'; import path from 'path';
const root=process.cwd();
function walk(d){return fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.name==='.git'?[]:e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]);}
for(const f of walk(root).filter(f=>f.endsWith('.html'))){
 let s=fs.readFileSync(f,'utf8');
 if(s.includes('class="global-nav"')&&!s.includes('href="../privacy/"')&&!s.includes('href="./privacy/"')){
  const depth=path.relative(root,path.dirname(f)).split(path.sep).filter(Boolean).length;
  const p=depth?'../'.repeat(depth):'./';
  s=s.replace('</nav>','<a href="'+p+'privacy/">PRIVACY</a><a href="'+p+'contact/">CONTACT</a></nav>');
 }
 fs.writeFileSync(f,s,'utf8');
}
console.log('navigation updated');