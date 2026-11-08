'use client';

import {useEffect,useState} from 'react';
import type {Chalisa} from '@/data/chalisas';
import {BOOKMARK_KEY,readBookmarks} from './Library';

type Layout='paired'|'stacked';
export default function Reader({item}:{item:Chalisa}) {
  const [size,setSize]=useState(24);
  const [layout,setLayout]=useState<Layout>('paired');
  const [saved,setSaved]=useState(false);
  const [message,setMessage]=useState('');
  useEffect(()=>{
    const sync=()=>setSaved(readBookmarks().includes(item.slug));
    sync();
    try {const preference=localStorage.getItem('chalisadham-reader-layout');if(preference==='paired'||preference==='stacked')setLayout(preference);}catch{}
    window.addEventListener('storage',sync);
    return()=>window.removeEventListener('storage',sync);
  },[item.slug]);

  const verified=item.status==='verified'&&item.sections.length>0&&item.sources.length>0;
  const text=verified?`${item.hindi}\n\n${item.sections.map(s=>`${s.heading}\n${s.verses.join('\n\n')}`).join('\n\n')}`:'';
  function changeLayout(next:Layout){setLayout(next);try{localStorage.setItem('chalisadham-reader-layout',next);}catch{}}
  async function copy(){try{await navigator.clipboard.writeText(text);setMessage('Text copied.');}catch{setMessage('Could not copy. Please select the text and copy it manually.');}}
  async function share(){try{if(navigator.share)await navigator.share({title:item.hindi,text:verified?item.intro:`${item.hindi} — Text review in progress`,url:location.href});else{await navigator.clipboard.writeText(location.href);setMessage('Page link copied.');}}catch(e){if(!(e instanceof Error&&e.name==='AbortError'))setMessage('Could not share. Please copy the link from your browser.');}}
  function bookmark(){try{const current=readBookmarks();const next=current.includes(item.slug)?current.filter(s=>s!==item.slug):[...current,item.slug];localStorage.setItem(BOOKMARK_KEY,JSON.stringify(next));setSaved(next.includes(item.slug));setMessage(next.includes(item.slug)?'Added to your collection.':'Removed from your collection.');}catch{setMessage('Saving is unavailable in this browser.');}}

  return <section className={`reader reader-${layout}`}>
    <div className="reader-tools" aria-label="Reading controls" lang="en">
      <div><button aria-label="Decrease font size" disabled={size<=18} onClick={()=>setSize(s=>s-2)}>A−</button><span>{size}px</span><button aria-label="Increase font size" disabled={size>=40} onClick={()=>setSize(s=>s+2)}>A+</button></div>
      <div className="layout-switch" role="group" aria-label="Verse layout">
        <button aria-pressed={layout==='paired'} onClick={()=>changeLayout('paired')}>Paired lines</button>
        <button aria-pressed={layout==='stacked'} onClick={()=>changeLayout('stacked')}>Stacked lines</button>
      </div>
      <div><button onClick={copy} disabled={!verified}>Copy</button><button onClick={share}>Share ↗</button><button aria-pressed={saved} onClick={bookmark}>{saved?'♥ Saved':'♡ Save'}</button></div>
    </div>
    <p className="feedback" role="status" lang="en">{message}</p>
    <article style={{fontSize:size}} className="verse-content" lang="hi">
      {verified?item.sections.map((section,index)=>{
        const paired=layout==='paired'&&section.heading==='चौपाई';
        return <section className={section.heading==='चौपाई'?'chaupai-section':'doha-section'} key={index}>
          <h2>{section.heading}</h2>
          <div className="verse-list">{section.verses.map((verse,verseIndex)=><p className={`verse${paired?' verse-paired':''}`} key={verseIndex}>{paired?verse.split('\n').map((line,lineIndex)=><span className="verse-half" key={lineIndex}>{line}</span>):verse}</p>)}</div>
        </section>;
      }):<div className="placeholder"><span className="placeholder-symbol" aria-hidden="true">❋</span><p className="eyebrow">WITH CARE. WITH REVERENCE.</p><h2>प्रमाणित पाठ की प्रतीक्षा</h2><p>यह सामग्री का स्थानधारक है, चालीसा का पाठ नहीं।</p><p>संपूर्ण हिंदी पाठ विश्वसनीय स्रोत से सत्यापित होने के बाद यहाँ उपलब्ध होगा।</p></div>}
    </article>
  </section>;
}
