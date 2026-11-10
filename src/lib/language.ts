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
// Sacred text is always displayed and copied exactly as stored in Hindi.
export function prayerText(item: Chalisa) {
  return item.hindi + '\n\n' + item.sections.map(section =>
    section.heading + '\n' + section.verses.join('\n\n')
  ).join('\n\n');
}
export function symbolName(symbol: string, language: Language) {
  return language === 'en' && symbol === 'ॐ' ? 'Om' : symbol;
}
