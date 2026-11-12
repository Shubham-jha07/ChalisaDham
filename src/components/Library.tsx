'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { categories, chalisas, type Chalisa } from '@/data/chalisas';
import { categoryName, contentName, symbolName } from '@/lib/content';
import { chalisaPageContent } from '@/data/page-content';
export const BOOKMARK_KEY = 'chalisadham-bookmarks';
export function readBookmarks(): string[] {
    try {
        const v: unknown = JSON.parse(localStorage.getItem(BOOKMARK_KEY) || '[]');
        return Array.isArray(v) ? v.filter((s): s is string => typeof s === 'string' && chalisas.some(c => c.slug === s)) : [];
    }
    catch {
        return [];
    }
}
export function Card({ item }: {
    item: Chalisa;
}) {
    const name = contentName(item);
    return <Link className={`chalisa-card ${item.color}`} href={`/chalisa/${item.slug}/`} onPointerMove={event => {
            if (event.pointerType !== 'mouse' || matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.dataset.motion === 'off')
                return;
            const rect = event.currentTarget.getBoundingClientRect();
            event.currentTarget.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width - .5) * 2}`);
            event.currentTarget.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height - .5) * 2}`);
        }} onPointerLeave={event => { event.currentTarget.style.setProperty('--mx', '0'); event.currentTarget.style.setProperty('--my', '0'); }}>
    <div className="card-picture">
<Image src={`/images/${item.slug.replace('-chalisa', '')}.webp`} alt={`Illustration for ${name}`} width={480} height={550} sizes="(max-width: 700px) 45vw, (max-width: 1000px) 45vw, 280px"/>
<span className="card-family">{categoryName(item.category)}</span>
<span className="arrow">↗</span>
</div>
    <div className="card-copy">
<h3>{name}</h3>
<p>{chalisaPageContent[item.slug].summary}</p>
<div className="card-bottom">
<span>{item.status === 'pending' ? "Paath ka review jaari hai" : "Verified paath"}</span>
<span>Padhein →</span>
</div>
</div>
  </Link>;
}
export default function Library() {
    const [query, setQuery] = useState(''), [category, setCategory] = useState('सभी'), [saved, setSaved] = useState<string[]>([]), [onlySaved, setOnlySaved] = useState(false);
    useEffect(() => { setSaved(readBookmarks()); const sync = () => setSaved(readBookmarks()); window.addEventListener('storage', sync); return () => window.removeEventListener('storage', sync); }, []);
    const filtered = chalisas.filter(c => (category === 'सभी' || c.category === category) && (!onlySaved || saved.includes(c.slug)) && `${c.name} ${c.hindi} ${c.slug} ${c.category} ${categoryName(c.category)}`.toLowerCase().includes(query.trim().toLowerCase()));
    return <>
<section id="library" className="wrap library">
<div className="section-heading">
<div>
<span className="eyebrow">Chalisa Collection</span>
<h2>Apni Chalisa chunein
</h2>
</div>
<span className="muted">{chalisas.length} Chalisa • Hindi paath</span>
</div>
    <div className="search-row">
<label className="search">
<span aria-hidden="true">⌕</span>
<input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Apni Chalisa khojein…" aria-label="Naam se Chalisa khojein"/>
<kbd>Search</kbd>
</label>
<button id="bookmarks" className={`saved-filter ${onlySaved ? 'active' : ''}`} aria-pressed={onlySaved} onClick={() => setOnlySaved(!onlySaved)}>♡ Mera Collection ({saved.length})</button>
</div>
    <div id="categories" className="filters" aria-label="Devi-Devta ke parivaar se chunein">{categories.map(c => <button key={c} aria-pressed={category === c} className={category === c ? 'active' : ''} onClick={() => setCategory(c)}>{c === 'सभी' ? "\u2726 Sabhi Chalisa" : categoryName(c)}</button>)}</div>
    <div className="results-head">
<h3>{onlySaved ? "Mera Collection" : query || category !== 'सभी' ? "Search results" : "Sabhi Chalisa"}</h3>
<span aria-live="polite">{filtered.length} {filtered.length === 1 ? 'page' : 'pages'}</span>
</div>
    <div className="card-grid">{filtered.map(c => <Card key={c.slug} item={c}/>)}</div>
    {!filtered.length && <div className="empty">
<h3>{onlySaved ? "Aapka collection abhi khaali hai." : "Koi Chalisa nahi mili."}</h3>
<p>Doosre naam se search karein ya sabhi Chalisa dekhein.</p>
<button className="button" onClick={() => { setQuery(''); setCategory('सभी'); setOnlySaved(false); }}>Sabhi Chalisa dekhein</button>
</div>}
  </section>
<section className="wrap recent" data-reveal>
<span className="eyebrow">Collection se aur paath</span>
<div className="section-heading">
<h2>Collection se aur paath</h2>
<span className="muted">Sampoorn Hindi paath</span>
</div>
<div className="recent-links">{chalisas.slice(-3).map(c => <Link key={c.slug} href={`/chalisa/${c.slug}/`}>
<span>{symbolName(c.symbol)}</span>
<div>
<h3>{contentName(c)}</h3>
<p>{chalisaPageContent[c.slug].summary}</p>
</div>
<b>↗</b>
</Link>)}</div>
</section>
</>;
}
