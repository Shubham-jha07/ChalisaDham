import type { Chalisa } from '@/data/chalisas';
import { chalisaPageContent } from '@/data/page-content';

const categoryNames: Record<string, string> = {
  'सभी': 'Sabhi', 'शिव परिवार': 'Shiv Parivaar',
  'विष्णु परिवार': 'Vishnu Parivaar', 'शक्ति': 'Shakti', 'नवग्रह': 'Navagraha'
};

export function categoryName(category: string) {
  return categoryNames[category] ?? category;
}

export function contentName(item: Chalisa) {
  return item.name;
}

export function introduction(item: Chalisa) {
  return chalisaPageContent[item.slug].intro;
}

export function prayerText(item: Chalisa) {
  return item.hindi + '\n\n' + item.sections.map(section =>
    section.heading + '\n' + section.verses.join('\n\n')
  ).join('\n\n');
}

export function symbolName(symbol: string) {
  return symbol === 'ॐ' ? 'Om' : symbol;
}
