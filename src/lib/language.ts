import type {Chalisa} from '@/data/chalisas';

export type Language = 'hi' | 'en';
export const LANGUAGE_KEY = 'devpaath-language';

const categoryNames: Record<string, string> = {
  'सभी': 'All', 'शिव परिवार': 'Shiva family', 'विष्णु परिवार': 'Vishnu family',
  'शक्ति': 'Shakti', 'नवग्रह': 'Navagraha'
};
export function categoryName(category: string, language: Language) {
  return language === 'hi' ? category : categoryNames[category] ?? category;
}
export function contentName(item: Chalisa, language: Language) {
  return language === 'hi' ? item.hindi : item.name;
}
export function introduction(item: Chalisa, language: Language) {
  if (language === 'hi') return item.intro;
  if (item.slug === 'hanuman-chalisa') return 'Read the complete Hanuman Chalisa by Goswami Tulsidas: two opening dohas, forty chaupais and the closing doha.';
  return `Read the complete traditional ${item.name}.`;
}
const headings: Record<string, string> = {
  'दोहा': 'Doha', 'चौपाई': 'Chaupai', 'समापन दोहा': 'Closing doha', 'सोरठा': 'Soratha'
};
export function sectionName(heading: string, language: Language) {
  return language === 'hi' ? heading : headings[heading] ?? romanize(heading);
}

// Faithful orthographic transliteration: no translation, schwa deletion, or word changes.
// Long vowels and retroflex sounds use standard Roman diacritics. Newlines stay intact.
const consonants: Record<string, string> = {
  'क':'k','ख':'kh','ग':'g','घ':'gh','ङ':'ṅ','च':'c','छ':'ch','ज':'j','झ':'jh','ञ':'ñ',
  'ट':'ṭ','ठ':'ṭh','ड':'ḍ','ढ':'ḍh','ण':'ṇ','त':'t','थ':'th','द':'d','ध':'dh','न':'n',
  'प':'p','फ':'ph','ब':'b','भ':'bh','म':'m','य':'y','र':'r','ल':'l','व':'v',
  'श':'ś','ष':'ṣ','स':'s','ह':'h','ळ':'ḷ'
};
const nuktaConsonants: Record<string, string> = {'क':'q','ख':'kh','ग':'gh','ज':'z','ड':'ṛ','ढ':'ṛh','फ':'f','य':'y'};
const vowels: Record<string, string> = {'अ':'a','आ':'ā','इ':'i','ई':'ī','उ':'u','ऊ':'ū','ऋ':'ṛ','ॠ':'ṝ','ऌ':'ḷ','ॡ':'ḹ','ए':'e','ऐ':'ai','ओ':'o','औ':'au','ऑ':'ŏ','ऍ':'ĕ'};
const marks: Record<string, string> = {'ा':'ā','ि':'i','ी':'ī','ु':'u','ू':'ū','ृ':'ṛ','ॄ':'ṝ','ॢ':'ḷ','ॣ':'ḹ','े':'e','ै':'ai','ो':'o','ौ':'au','ॉ':'ŏ','ॅ':'ĕ'};
const signs: Record<string, string> = {'ं':'ṃ','ँ':'m̐','ः':'ḥ','ऽ':"'",'।':'.','॥':'..','ॐ':'oṃ','०':'0','१':'1','२':'2','३':'3','४':'4','५':'5','६':'6','७':'7','८':'8','९':'9'};
export function romanize(text: string): string {
  const chars = Array.from(text.normalize('NFD'));
  let result = '';
  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    if (consonants[char]) {
      let consonant = consonants[char];
      if (chars[i + 1] === '़') {consonant = nuktaConsonants[char] ?? consonant; i++;}
      if (chars[i + 1] === '्') {result += consonant; i++;}
      else if (marks[chars[i + 1]]) {result += consonant + marks[chars[++i]];}
      else result += consonant + 'a';
    } else result += vowels[char] ?? signs[char] ?? marks[char] ?? (['्','़','\u200c','\u200d'].includes(char) ? '' : char);
  }
  return result;
}
