import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {runInNewContext} from 'node:vm';
import assert from 'node:assert/strict';
import test from 'node:test';

const require = createRequire(import.meta.url);
const ts = require('typescript');
const output = ts.transpileModule(readFileSync('src/lib/language.ts', 'utf8'), {
  compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017}
}).outputText;
const exports = {};
runInNewContext(output, {exports});
const {romanize, categoryName, introduction, sectionName} = exports;
const texts = JSON.parse(readFileSync('src/data/chalisa-texts.json', 'utf8'));

test('Roman script preserves vowel lengths, conjuncts, nasal sounds and nukta', () => {
  assert.equal(romanize('जय हनुमान ज्ञान गुन सागर।'), 'jaya hanumāna jñāna guna sāgara.');
  assert.equal(romanize('राम कृष्ण शिव'), 'rāma kṛṣṇa śiva');
  assert.equal(romanize('आ ई ऊ ऋ ॠ ऐ औ'), 'ā ī ū ṛ ṝ ai au');
  assert.equal(romanize('संकट काँपै दुःख'), 'saṃkaṭa kām̐pai duḥkha');
  assert.equal(romanize('पढ़ै'), romanize('पढ़ै'));
  assert.equal(romanize('ॐ'), 'oṃ');
});

test('all 430 verses have complete Roman-script output with original line boundaries', () => {
  const before = JSON.stringify(texts);
  let count = 0;
  for (const [id, content] of Object.entries(texts)) {
    for (const section of content.sections) for (const verse of section.verses) {
      const roman = romanize(verse);
      assert(!/[\u0900-\u097f]/u.test(roman), `${id}: unmapped Devanagari character`);
      assert.equal(roman.split('\n').length, verse.split('\n').length);
      assert(roman.split('\n').every(line => line.trim().length > 0));
      assert.equal(roman.split(' ').length, verse.split(' ').length);
      count++;
    }
  }
  assert.equal(count, 430);
  assert.equal(JSON.stringify(texts), before, 'Original Hindi content must stay unchanged');
});

test('navigation and section labels use translations instead of transliteration', () => {
  assert.equal(categoryName('शिव परिवार', 'en'), 'Shiva family');
  assert.equal(categoryName('शिव परिवार', 'hi'), 'शिव परिवार');
  assert.equal(sectionName('समापन दोहा', 'en'), 'Closing doha');
  assert.equal(sectionName('चौपाई', 'hi'), 'चौपाई');
  assert.equal(introduction({slug:'shiv-chalisa', name:'Shiv Chalisa', intro:'मूल परिचय'}, 'hi'), 'मूल परिचय');
  assert.equal(introduction({slug:'shiv-chalisa', name:'Shiv Chalisa'}, 'en'), 'Read the complete traditional Shiv Chalisa.');
});
