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
const language = loadTs('src/lib/language.ts');
const texts = JSON.parse(readFileSync('src/data/chalisa-texts.json', 'utf8'));
const {chalisas} = loadTs('src/data/chalisas.ts', {'./chalisa-texts.json': texts});
let selectedLanguage = 'hi';
const {default: Reader} = loadTs('src/components/Reader.tsx', {
  react: React,
  'react/jsx-runtime': require('react/jsx-runtime'),
  '@/lib/language': language,
  './Language': {useLanguage: () => ({language: selectedLanguage, t: (hi, en) => selectedLanguage === 'hi' ? hi : en})},
  './Library': {BOOKMARK_KEY: 'chalisadham-bookmarks', readBookmarks: () => []}
});
const renderReader = (item, locale) => {
  selectedLanguage = locale;
  return renderToStaticMarkup(React.createElement(Reader, {item}));
};

test('both interface languages render identical original Hindi prayer articles on all ten pages', () => {
  let count = 0;
  for (const item of chalisas) {
    const hi = renderReader(item, 'hi');
    const en = renderReader(item, 'en');
    const article = html => html.match(/<article\b[\s\S]*?<\/article>/)?.[0];
    assert(article(hi), `${item.slug}: missing prayer article`);
    assert.equal(article(en), article(hi), `${item.slug}: language toggle changed the prayer`);
    assert(article(en).includes('lang="hi"'));
    assert(!/[A-Za-z]/.test(article(en).replace(/<[^>]+>/g, '')));
    assert.equal((article(en).match(/class="verse(?: verse-paired)?"/g) || []).length, item.sections.reduce((n, section) => n + section.verses.length, 0));
    for (const section of item.sections) for (const verse of section.verses) {
      for (const line of verse.split('\n')) assert(article(en).includes(line), `${item.slug}: missing original line`);
      count++;
    }
    assert(hi.includes('कॉपी करें') && en.includes('Copy'), 'Controls must still translate');
    assert(hi.includes('साथ-साथ पंक्तियाँ') && en.includes('Paired lines'));
  }
  assert.equal(count, 430);
});

test('copy content retains the Hindi title, headings, verses and their line breaks', () => {
  for (const item of chalisas) {
    const text = language.prayerText(item);
    assert(text.startsWith(item.hindi + '\n\n'));
    assert(!/[A-Za-z]/.test(text));
    for (const section of item.sections) {
      assert(text.includes(section.heading + '\n'));
      for (const verse of section.verses) assert(text.includes(verse));
    }
  }
});

test('surrounding navigation and descriptions still translate', () => {
  assert.equal(language.categoryName('शिव परिवार', 'en'), 'Shiva family');
  assert.equal(language.categoryName('शिव परिवार', 'hi'), 'शिव परिवार');
  assert.equal(language.introduction(chalisas[0], 'hi'), texts.hanuman.intro);
  assert(language.introduction(chalisas[0], 'en').startsWith('Read the complete Hanuman Chalisa'));
});
