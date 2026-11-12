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
 assert(html.includes('Saath-saath lines')&&html.includes('Alag-alag lines'),`${slug}: Hinglish layout controls missing`);
 assert(html.includes('lang="hi-Latn"')&&html.includes('class="verse-content" lang="hi"'),`${slug}: interface or prayer language incorrect`);
 assert(!html.includes('language-toggle'),`${slug}: removed language selector remains`);
 assert(html.includes(`/images/${slug}.webp`),`${slug}: incorrect deity artwork`);
 assert(existsSync(`out/images/${slug}.webp`),`${slug}: artwork file missing`);
 assert(home.includes(route),`${slug}: homepage link missing`);
 assert(sitemap.includes(route),`${slug}: sitemap entry missing`);
 total+=verseCount;
}
assert(texts.krishna.sections[0].verses[0].includes('नयन कमल अभिराम'),'Krishna opening correction lost');
assert(texts.krishna.sections[0].verses[1].includes('पूर्ण इन्द्र'),'Krishna second opening doha incomplete');
for(const path of ['out/404.html','out/robots.txt','out/_headers'])assert(existsSync(path),`Missing ${path}`);
const exportedHeaders=readFileSync('out/_headers','utf8');
const defaultHeaders=exportedHeaders.split(/\r?\n(?=\S)/).find(block=>block.split(/\r?\n/)[0]==='/*');
assert(defaultHeaders&&/^  Strict-Transport-Security: max-age=2592000\r?$/m.test(defaultHeaders),'Exported HSTS policy missing or changed');
assert.equal(exportedHeaders,readFileSync('public/_headers','utf8'),'Exported security headers are stale');
const security=readFileSync('out/.well-known/security.txt','utf8');
assert.equal(security,readFileSync('public/.well-known/security.txt','utf8'),'Exported security.txt is stale');
const fields=name=>security.split(/\r?\n/).filter(line=>line.startsWith(name+': ')).map(line=>line.slice(name.length+2).trim());
assert(fields('Contact').length>0,'security.txt needs a reporting contact');
for(const contact of fields('Contact')){
 const uri=new URL(contact);
 assert(uri.protocol==='https:'||(uri.protocol==='mailto:'&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(uri.pathname)),'Invalid security.txt contact');
}
assert.equal(fields('Expires').length,1,'security.txt needs exactly one expiry date');
const expires=Date.parse(fields('Expires')[0]);
assert(Number.isFinite(expires)&&expires>Date.now()&&expires<=Date.now()+366*24*60*60*1000,'security.txt expiry must be in the coming year');
assert.deepEqual(fields('Canonical'),['https://devpaath.com/.well-known/security.txt'],'Incorrect security.txt canonical');
console.log('PASS: exported HSTS policy and valid security.txt reporting contact, expiry and canonical.');
console.log(`PASS: all 10 complete source editions, ${total} verse blocks, paired halves, layout controls, artwork, SEO, sitemap and static routes.`);

await import('./verify-seo.mjs');
