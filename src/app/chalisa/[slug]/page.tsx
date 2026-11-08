import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {chalisas} from '@/data/chalisas';
import {Card} from '@/components/Library';
import Reader from '@/components/Reader';
import DeityArtwork from '@/components/DeityArtwork';
export const dynamicParams=false;
export function generateStaticParams(){return chalisas.map(c=>({slug:c.slug}));}
type Props={params:Promise<{slug:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{const{slug}=await params;const c=chalisas.find(c=>c.slug===slug);if(!c)return {};return {title:`${c.hindi} — Hindi ${c.name}`,description:c.intro,alternates:{canonical:`/chalisa/${c.slug}/`},robots:{index:c.status==='verified',follow:true},openGraph:{title:c.hindi,description:c.intro,url:`/chalisa/${c.slug}/`}};}
export default async function Page({params}:Props){const{slug}=await params;const item=chalisas.find(c=>c.slug===slug);if(!item)notFound();const related=[...chalisas.filter(c=>c.slug!==slug&&c.category===item.category),...chalisas.filter(c=>c.slug!==slug&&c.category!==item.category)].slice(0,3);return <div className="wrap detail"><nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">मुख्य पृष्ठ</Link><span>/</span><Link href="/#library">चालीसा संग्रह</Link><span>/ {item.hindi}</span></nav><div className={`detail-hero ${item.color}`}><header className="detail-heading"><span className={`detail-symbol ${item.color}`}>{item.symbol}</span><p className="eyebrow">{item.name.toUpperCase()} • {item.category}</p><h1>श्री {item.hindi}</h1><p>{item.intro}</p><span className="status-pill">{item.status==='pending'?'◌ पाठ सत्यापन जारी':'✓ सत्यापित पाठ'}</span></header><DeityArtwork item={item}/></div><Reader item={item}/><section className="related"><div className="section-heading"><h2>भक्ति का सफ़र जारी रखें</h2><Link href="/#library">सभी चालीसा →</Link></div><div className="card-grid">{related.map(c=><Card key={c.slug} item={c}/>)}</div></section></div>}
