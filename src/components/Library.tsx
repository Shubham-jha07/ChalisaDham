'use client';
import Link from 'next/link';
import Image from 'next/image';
import {useEffect,useState} from 'react';
import {categories,chalisas,type Chalisa} from '@/data/chalisas';
import {categoryName,contentName,romanize} from '@/lib/language';
import {useLanguage} from './Language';
export const BOOKMARK_KEY='chalisadham-bookmarks';
export function readBookmarks():string[]{try{const v:unknown=JSON.parse(localStorage.getItem(BOOKMARK_KEY)||'[]');return Array.isArray(v)?v.filter((s):s is string=>typeof s==='string'&&chalisas.some(c=>c.slug===s)):[];}catch{return [];}}

export function Card({item}:{item:Chalisa}) {
  const {language,t}=useLanguage();
  const name=contentName(item,language);
  return <Link className={`chalisa-card ${item.color}`} href={`/chalisa/${item.slug}/`} onPointerMove={event=>{if(event.pointerType!=='mouse'||matchMedia('(prefers-reduced-motion: reduce)').matches||document.documentElement.dataset.motion==='off')return;const rect=event.currentTarget.getBoundingClientRect();event.currentTarget.style.setProperty('--mx',`${((event.clientX-rect.left)/rect.width-.5)*2}`);event.currentTarget.style.setProperty('--my',`${((event.clientY-rect.top)/rect.height-.5)*2}`);}} onPointerLeave={event=>{event.currentTarget.style.setProperty('--mx','0');event.currentTarget.style.setProperty('--my','0');}}>
    <div className="card-picture"><Image src={`/images/${item.slug.replace('-chalisa','')}.webp`} alt={t(`${name} का चित्र`,`Illustration for ${name}`)} width={480} height={550} sizes="(max-width: 700px) 45vw, (max-width: 1000px) 45vw, 280px"/><span className="card-family">{categoryName(item.category,language)}</span><span className="arrow">↗</span></div>
    <div className="card-copy"><h3>{name}</h3><p>{t('संपूर्ण पारंपरिक पाठ','Complete traditional text')}</p><div className="card-bottom"><span>{item.status==='pending'?t('पाठ सत्यापन जारी','Text review in progress'):t('सत्यापित पाठ','Verified text')}</span><span>{t('पढ़ें →','Explore →')}</span></div></div>
  </Link>;
}
export default function Library() {
  const {language,t}=useLanguage();
  const [query,setQuery]=useState(''),[category,setCategory]=useState('सभी'),[saved,setSaved]=useState<string[]>([]),[onlySaved,setOnlySaved]=useState(false);
  useEffect(()=>{setSaved(readBookmarks());const sync=()=>setSaved(readBookmarks());window.addEventListener('storage',sync);return()=>window.removeEventListener('storage',sync);},[]);
  const filtered=chalisas.filter(c=>(category==='सभी'||c.category===category)&&(!onlySaved||saved.includes(c.slug))&&`${c.name} ${c.hindi} ${c.slug} ${c.category} ${categoryName(c.category,'en')}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <><section id="library" className="wrap library"><div className="section-heading"><div><span className="eyebrow">{t('चालीसा संग्रह','THE CHALISA COLLECTION')}</span><h2>{t('भक्ति के कई रंग।','Many paths of devotion.')} <em>{t('एक ही सुकून।','One shared calm.')}</em></h2></div><span className="muted">{chalisas.length} {t('चालीसा • हिंदी में','Chalisas • Roman script')}</span></div>
    <div className="search-row"><label className="search"><span aria-hidden="true">⌕</span><input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder={t('अपनी चालीसा खोजें…','Search for a Chalisa…')} aria-label={t('हिंदी या अंग्रेज़ी नाम से चालीसा खोजें','Search Chalisas by Hindi or English name')}/><kbd>{t('खोजें','Search')}</kbd></label><button id="bookmarks" className={`saved-filter ${onlySaved?'active':''}`} aria-pressed={onlySaved} onClick={()=>setOnlySaved(!onlySaved)}>♡ {t('मेरा संग्रह','My Collection')} ({saved.length})</button></div>
    <div id="categories" className="filters" aria-label={t('देवी-देवता के परिवार से चुनें','Filter by deity family')}>{categories.map(c=><button key={c} aria-pressed={category===c} className={category===c?'active':''} onClick={()=>setCategory(c)}>{c==='सभी'?t('✦ सभी चालीसा','✦ All Chalisas'):categoryName(c,language)}</button>)}</div>
    <div className="results-head"><h3>{onlySaved?t('मेरा संग्रह','Your Collection'):query||category!=='सभी'?t('खोज परिणाम','Search results'):t('लोकप्रिय चालीसा','Popular Chalisas')}</h3><span aria-live="polite">{filtered.length} {t('पृष्ठ',filtered.length===1?'page':'pages')}</span></div>
    <div className="card-grid">{filtered.map(c=><Card key={c.slug} item={c}/>)}</div>
    {!filtered.length&&<div className="empty"><h3>{onlySaved?t('आपका संग्रह अभी खाली है।','Your collection is empty.'):t('कोई चालीसा नहीं मिली।','No Chalisas found.')}</h3><p>{t('नाम बदलकर खोजें या सभी चालीसा देखें।','Try another name or browse all Chalisas.')}</p><button className="button" onClick={()=>{setQuery('');setCategory('सभी');setOnlySaved(false);}}>{t('सभी चालीसा देखें','View all Chalisas')}</button></div>}
  </section><section className="wrap recent" data-reveal><span className="eyebrow">{t('संग्रह में नए','NEW TO THE COLLECTION')}</span><div className="section-heading"><h2>{t('संग्रह में नए','Recent additions')}</h2><span className="muted">{t('संपूर्ण हिंदी पाठ','Complete texts in Roman script')}</span></div><div className="recent-links">{chalisas.slice(-3).map(c=><Link key={c.slug} href={`/chalisa/${c.slug}/`}><span>{language==='hi'?c.symbol:romanize(c.symbol)}</span><div><h3>{contentName(c,language)}</h3><p>{t('संपूर्ण पारंपरिक पाठ','Complete traditional text')}</p></div><b>↗</b></Link>)}</div></section></>;
}
