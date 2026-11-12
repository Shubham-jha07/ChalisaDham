import { categoryName, introduction, symbolName } from '@/lib/content';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { chalisas } from '@/data/chalisas';
import { Card } from '@/components/Library';
import Reader from '@/components/Reader';
import DeityArtwork from '@/components/DeityArtwork';
import ReadingGuide from '@/components/ReadingGuide';
import StructuredData from '@/components/StructuredData';
import { chalisaPageContent } from '@/data/page-content';
import { chalisaHeading, chalisaStructuredData, socialMetadata } from '@/lib/seo';
export const dynamicParams = false;
export function generateStaticParams() { return chalisas.map(c => ({ slug: c.slug })); }
type Props = {
    params: Promise<{
        slug: string;
    }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const c = chalisas.find(c => c.slug === slug);
    if (!c)
        return {};
    const copy = chalisaPageContent[c.slug];
    const title = chalisaHeading(c);
    const path = '/chalisa/' + c.slug + '/';
    return { title, description: copy.description, alternates: { canonical: path }, robots: { index: c.status === 'verified', follow: true },
        ...socialMetadata(title + ' | DevPaath', copy.description, path, c.slug.replace('-chalisa', '')) };
}
export default async function Page({ params }: Props) {
    const { slug } = await params;
    const item = chalisas.find(c => c.slug === slug);
    if (!item)
        notFound();
    const related = [...chalisas.filter(c => c.slug !== slug && c.category === item.category), ...chalisas.filter(c => c.slug !== slug && c.category !== item.category)].slice(0, 3);
    return <div className="wrap detail">
<StructuredData data={chalisaStructuredData(item)} />
<nav className="breadcrumb" aria-label="Breadcrumb">
<Link href="/">Chalisa Collection</Link>
<span aria-current="page">/ {item.name}</span>
</nav>
<div className={`detail-hero ${item.color}`}>
<header className="detail-heading">
<span className={`detail-symbol ${item.color}`}>{symbolName(item.symbol)}</span>
<p className="eyebrow">{item.name.toUpperCase()} • {categoryName(item.category)}</p>
<h1>{chalisaHeading(item)}</h1>
<p>{introduction(item)}</p>
<Link className="paath-link" href="#chalisa-paath">Seedha Hindi paath padhein ↓</Link>
<span className="status-pill">{item.status === 'pending' ? '◌ Text review in progress' : '✓ Verified text'}</span>
</header>
<DeityArtwork item={item}/>
</div>
<Reader item={item}/>
<ReadingGuide item={item} />
<section className="related">
<div className="section-heading">
<h2>Aur Chalisa padhein</h2>
<Link href="/#library">Sabhi Chalisa →</Link>
</div>
<div className="card-grid">{related.map(c => <Card key={c.slug} item={c}/>)}</div>
</section>
</div>;
}
