import fs from 'node:fs';
const file='index.html';
let s=fs.readFileSync(file,'utf8');
const anchor='<section class="chapter chapter-science" id="science">';
const depth=`<section class="memory-depth" aria-labelledby="depth-title">
  <div class="memory-depth-layers" aria-hidden="true">
    <div class="depth-layer depth-universe"></div>
    <div class="depth-layer depth-archive"></div>
    <div class="depth-grid"></div>
  </div>
  <div class="wrap memory-depth-copy">
    <p class="kicker">DESCENT / MEMORY LAYER 04</p>
    <h2 id="depth-title">記憶は、<br>ひとつの場所にはない。</h2>
    <p>宇宙のスケール、文明の痕跡、書物、身体、物語。アカシックレコードという概念は、人類が「すべてはどこかに残る」と想像してきた長い系譜の中で読むことができる。</p>
    <a class="text-link" href="./archive/">ARCHIVE INDEX を開く →</a>
  </div>
</section>`;
if(!s.includes('class="memory-depth"')) s=s.replace(anchor,depth+anchor);
fs.writeFileSync(file,s,'utf8');
console.log('visual story upgraded');