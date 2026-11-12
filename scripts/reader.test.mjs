import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {runInNewContext} from 'node:vm';
import assert from 'node:assert/strict';
import test from 'node:test';

const require = createRequire(import.meta.url);
const ts = require('typescript');
const React = require('react');
const {renderToStaticMarkup} = require('react-dom/server');
function loadTs(path, dependencies = {}) {
  const output = ts.transpileModule(readFileSync(path, 'utf8'), {
    compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true}
  }).outputText;
  const exports = {};
  runInNewContext(output, {exports, process: {env: {}}, require: name => {
    if (!(name in dependencies)) throw new Error(`Unexpected import: ${name}`);
    return dependencies[name];
  }});
  return exports;
}
const pageContent = loadTs('src/data/page-content.ts');
const content = loadTs('src/lib/content.ts', {'@/data/page-content': pageContent});
const texts = JSON.parse(readFileSync('src/data/chalisa-texts.json', 'utf8'));
const {chalisas} = loadTs('src/data/chalisas.ts', {'./chalisa-texts.json': texts});
const {default: Reader} = loadTs('src/components/Reader.tsx', {
  react: React,
  'react/jsx-runtime': require('react/jsx-runtime'),
  '@/lib/content': content,
  './Library': {BOOKMARK_KEY: 'chalisadham-bookmarks', readBookmarks: () => []}
});
const renderReader = item => renderToStaticMarkup(React.createElement(Reader, {item}));

test('Hinglish reader preserves all original Hindi prayer articles', () => {
  let count = 0;
  for (const item of chalisas) {
    const html = renderReader(item);
    const article = html => html.match(/<article\b[\s\S]*?<\/article>/)?.[0];
    assert(article(html), `${item.slug}: missing prayer article`);
    assert(article(html).includes('lang="hi"'));
    assert(!/[A-Za-z]/.test(article(html).replace(/<[^>]+>/g, '')));
    assert.equal((article(html).match(/class="verse(?: verse-paired)?"/g) || []).length, item.sections.reduce((n, section) => n + section.verses.length, 0));
    for (const section of item.sections) for (const verse of section.verses) {
      for (const line of verse.split('\n')) assert(article(html).includes(line), `${item.slug}: missing original line`);
      count++;
    }
    assert(html.includes('Copy karein'), 'Hinglish copy control missing');
    assert(html.includes('Saath-saath lines'));
  }
  assert.equal(count, 430);
});

test('copy content retains the Hindi title, headings, verses and their line breaks', () => {
  for (const item of chalisas) {
    const text = content.prayerText(item);
    assert(text.startsWith(item.hindi + '\n\n'));
    assert(!/[A-Za-z]/.test(text));
    for (const section of item.sections) {
      assert(text.includes(section.heading + '\n'));
      for (const verse of section.verses) assert(text.includes(verse));
    }
  }
});

test('catalog labels and descriptions use Roman-script Hinglish', () => {
  assert.equal(content.categoryName('शिव परिवार'), 'Shiv Parivaar');
  for (const item of chalisas) {
    assert(!/[\u0900-\u097f]/u.test(content.contentName(item)));
    assert(!/[\u0900-\u097f]/u.test(content.introduction(item)));
  }
});
