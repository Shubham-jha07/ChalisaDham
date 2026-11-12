import type { Chalisa } from '@/data/chalisas';
import { chalisaPageContent } from '@/data/page-content';

export default function ReadingGuide({ item }: { item: Chalisa }) {
  const content = chalisaPageContent[item.slug];
  return <section className="reading-guide" aria-labelledby="reading-guide-heading">
    <h2 id="reading-guide-heading">{item.name} ke baare mein</h2>
    {content.about.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
    <h3>{content.question}</h3>
    <p>{content.answer}</p>
    <h3>Is page par paath kaise padhein?</h3>
    <p>A+ aur A− se akshar ka size badlein. Saath-saath ya alag-alag lines chunein. Copy karein se Hindi paath copy hota hai; Save karein se isi browser ke Mera Collection mein page judta hai.</p>
    <p className="edition-note">Paramparik paath ki vartani aur panktiyon ka bantwara alag editions mein badal sakta hai. Yahan diya gaya Hindi paath ek hi edition ke kram mein rakha gaya hai.</p>
  </section>;
}
