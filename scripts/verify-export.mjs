import {readFileSync,existsSync} from 'node:fs';
import assert from 'node:assert/strict';

const readJson=path=>JSON.parse(readFileSync(path,'utf8'));
const texts=readJson('src/data/chalisa-texts.json');
const expected={hanuman:[2,40,1],shiv:[1,41,2],ganesh:[1,38,2],durga:[41],ram:[46,2],krishna:[2,40,1],saraswati:[2,39,2],lakshmi:[1,1,39,2],shani:[2,40,1],vishnu:[1,40]};
const home=readFileSync('out/index.html','utf8');
const sitemap=readFileSync('out/sitemap.xml','utf8');
let total=0;
for(const [slug,counts] of Object.entries(expected)){
 const data=texts[slug];
 assert(data,`${slug}: text missing`);
 assert.deepEqual(data.sections.map(s=>s.verses.length),counts,`${slug}: source edition incomplete`);
 assert(data.sources.length&&data.verifiedOn,`${slug}: internal provenance missing`);
 for(const section of data.sections)for(const verse of section.verses){
  assert.equal(verse.split('\n').length,2,`${slug}: verse line break lost`);
  assert(!verse.includes('PAGE ')&&!verse.includes('[Button:'),`${slug}: extraction artifact`);
 }
 const route=`/chalisa/${slug}-chalisa/`;
 const path=`out${route}index.html`;
 assert(existsSync(path),`Missing ${path}`);
 const html=readFileSync(path,'utf8');
 assert(html.includes('rel="canonical"'),`${slug}: missing canonical`);
 assert(!html.includes('noindex'),`${slug}: complete page must be indexable`);
 assert(!html.includes('प्रमाणित पाठ की प्रतीक्षा'),`${slug}: placeholder still displayed`);
 assert(!html.includes('class="sources"'),`${slug}: source panel should remain hidden`);
 const verseCount=counts.reduce((sum,n)=>sum+n,0);
 assert.equal((html.match(/class="verse(?: verse-paired)?"/g)||[]).length,verseCount,`${slug}: exported verse count`);
 const chaupais=data.sections.filter(s=>s.heading==='चौपाई').reduce((sum,s)=>sum+s.verses.length,0);
 assert.equal((html.match(/class="verse-half"/g)||[]).length,chaupais*2,`${slug}: paired halves lost or reordered`);
 assert(html.includes('Paired lines')&&html.includes('Stacked lines'),`${slug}: layout controls missing`);
 assert(html.includes(`/images/${slug}.webp`),`${slug}: incorrect deity artwork`);
 assert(existsSync(`out/images/${slug}.webp`),`${slug}: artwork file missing`);
 assert(home.includes(route),`${slug}: homepage link missing`);
 assert(sitemap.includes(route),`${slug}: sitemap entry missing`);
 total+=verseCount;
}
assert(texts.krishna.sections[0].verses[0].includes('नयन कमल अभिराम'),'Krishna opening correction lost');
assert(texts.krishna.sections[0].verses[1].includes('पूर्ण इन्द्र'),'Krishna second opening doha incomplete');
for(const path of ['out/404.html','out/robots.txt','out/_headers'])assert(existsSync(path),`Missing ${path}`);
console.log(`PASS: all 10 complete source editions, ${total} verse blocks, paired halves, layout controls, artwork, SEO, sitemap and static routes.`);
