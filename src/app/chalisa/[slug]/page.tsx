import {Text as T,PageTitle,Breadcrumb} from '@/components/Language';
import {categoryName,introduction,symbolName} from '@/lib/language';
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
export async function generateMetadata({params}:Props):Promise<Metadata>{const{slug}=await params;const c=chalisas.find(c=>c.slug===slug);if(!c)return {};return {title:c.hindi,description:c.intro,alternates:{canonical:`/chalisa/${c.slug}/`},robots:{index:c.status==='verified',follow:true},openGraph:{title:c.hindi,description:c.intro,url:`/chalisa/${c.slug}/`}};}
export default async function Page({params}:Props){const{slug}=await params;const item=chalisas.find(c=>c.slug===slug);if(!item)notFound();const related=[...chalisas.filter(c=>c.slug!==slug&&c.category===item.category),...chalisas.filter(c=>c.slug!==slug&&c.category!==item.category)].slice(0,3);return <div className="wrap detail"><PageTitle hi={`${item.hindi} | देवपाठ`} en={`${item.name} | DevPaath`}/><Breadcrumb><Link href="/"><T hi="मुख्य पृष्ठ" en="Home"/></Link><span>/</span><Link href="/#library"><T hi="चालीसा संग्रह" en="Chalisa Library"/></Link><span aria-current="page">/ <T hi={item.hindi} en={item.name}/></span></Breadcrumb><div className={`detail-hero ${item.color}`}><header className="detail-heading"><span className={`detail-symbol ${item.color}`}><T hi={item.symbol} en={symbolName(item.symbol,'en')}/></span><p className="eyebrow"><T hi={item.hindi} en={item.name.toUpperCase()}/> • <T hi={item.category} en={categoryName(item.category,"en")}/></p><h1><T hi={`श्री ${item.hindi}`} en={`Shri ${item.name}`}/></h1><p><T hi={item.intro} en={introduction(item,"en")}/></p><span className="status-pill"><T hi={item.status==='pending'?'◌ पाठ सत्यापन जारी':'✓ सत्यापित पाठ'} en={item.status==='pending'?'◌ Text review in progress':'✓ Verified text'}/></span></header><DeityArtwork item={item}/></div><Reader item={item}/><section className="related"><div className="section-heading"><h2><T hi="भक्ति का सफ़र जारी रखें" en="Continue your journey of devotion"/></h2><Link href="/#library"><T hi="सभी चालीसा →" en="All Chalisas →"/></Link></div><div className="card-grid">{related.map(c=><Card key={c.slug} item={c}/>)}</div></section></div>}
