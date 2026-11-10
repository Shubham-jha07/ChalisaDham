'use client';
import {useEffect,useState} from 'react';
import type {Chalisa} from '@/data/chalisas';
import {contentName,introduction,prayerText} from '@/lib/language';
import {useLanguage} from './Language';
import {BOOKMARK_KEY,readBookmarks} from './Library';

type Layout='paired'|'stacked';
type Message='copied'|'copyFailed'|'linkCopied'|'shareFailed'|'added'|'removed'|'saveFailed'|'';
export default function Reader({item}:{item:Chalisa}) {
  const {language,t}=useLanguage();
  const [size,setSize]=useState(24),[layout,setLayout]=useState<Layout>('paired'),[saved,setSaved]=useState(false),[message,setMessage]=useState<Message>('');
  useEffect(()=>{
    const sync=()=>setSaved(readBookmarks().includes(item.slug));sync();
    try {const preference=localStorage.getItem('chalisadham-reader-layout');if(preference==='paired'||preference==='stacked')setLayout(preference);}catch{}
    window.addEventListener('storage',sync);return()=>window.removeEventListener('storage',sync);
  },[item.slug]);
  const sections=item.sections;
  const verified=item.status==='verified'&&item.sections.length>0&&item.sources.length>0;
  const text=verified?prayerText(item):'';
  const feedback:Record<Message,string>={
    '':'',copied:t('पाठ कॉपी हो गया।','Text copied.'),copyFailed:t('पाठ कॉपी नहीं हुआ। कृपया पाठ चुनकर स्वयं कॉपी करें।','Could not copy. Please select the text and copy it manually.'),
    linkCopied:t('पृष्ठ का लिंक कॉपी हो गया।','Page link copied.'),shareFailed:t('साझा नहीं हो सका। कृपया ब्राउज़र से लिंक कॉपी करें।','Could not share. Please copy the link from your browser.'),
    added:t('आपके संग्रह में सहेज दिया गया।','Added to your collection.'),removed:t('आपके संग्रह से हटा दिया गया।','Removed from your collection.'),saveFailed:t('इस ब्राउज़र में सहेजना उपलब्ध नहीं है।','Saving is unavailable in this browser.')
  };
  function changeLayout(next:Layout){setLayout(next);try{localStorage.setItem('chalisadham-reader-layout',next);}catch{}}
  async function copy(){try{await navigator.clipboard.writeText(text);setMessage('copied');}catch{setMessage('copyFailed');}}
  async function share(){try{if(navigator.share)await navigator.share({title:contentName(item,language),text:verified?introduction(item,language):t('पाठ सत्यापन जारी','Text review in progress'),url:location.href});else{await navigator.clipboard.writeText(location.href);setMessage('linkCopied');}}catch(e){if(!(e instanceof Error&&e.name==='AbortError'))setMessage('shareFailed');}}
  function bookmark(){try{const current=readBookmarks(),next=current.includes(item.slug)?current.filter(s=>s!==item.slug):[...current,item.slug];localStorage.setItem(BOOKMARK_KEY,JSON.stringify(next));setSaved(next.includes(item.slug));setMessage(next.includes(item.slug)?'added':'removed');}catch{setMessage('saveFailed');}}
  return <section className={`reader reader-${layout}`}>
    <div className="reader-tools" aria-label={t('पढ़ने के विकल्प','Reading controls')}>
      <div><button aria-label={t('अक्षरों का आकार घटाएँ','Decrease font size')} disabled={size<=18} onClick={()=>setSize(s=>s-2)}>{t('अ−','A−')}</button><span>{size}{t(' पिक्सेल','px')}</span><button aria-label={t('अक्षरों का आकार बढ़ाएँ','Increase font size')} disabled={size>=40} onClick={()=>setSize(s=>s+2)}>{t('अ+','A+')}</button></div>
      <div className="layout-switch" role="group" aria-label={t('पंक्तियों का विन्यास','Verse layout')}>
        <button aria-pressed={layout==='paired'} onClick={()=>changeLayout('paired')}>{t('साथ-साथ पंक्तियाँ','Paired lines')}</button><button aria-pressed={layout==='stacked'} onClick={()=>changeLayout('stacked')}>{t('ऊपर-नीचे पंक्तियाँ','Stacked lines')}</button>
      </div>
      <div><button onClick={copy} disabled={!verified}>{t('कॉपी करें','Copy')}</button><button onClick={share}>{t('साझा करें ↗','Share ↗')}</button><button aria-pressed={saved} onClick={bookmark}>{saved?t('♥ सहेजा गया','♥ Saved'):t('♡ सहेजें','♡ Save')}</button></div>
    </div>
    <p className="feedback" role="status">{feedback[message]}</p>
    <article style={{fontSize:size}} className="verse-content" lang="hi">
      {verified?sections.map((section,index)=>{
        const paired=layout==='paired'&&section.heading==='चौपाई';
        return <section className={section.heading==='चौपाई'?'chaupai-section':'doha-section'} key={index}><h2>{section.heading}</h2><div className="verse-list">{section.verses.map((verse,verseIndex)=><p className={`verse${paired?' verse-paired':''}`} key={verseIndex}>{paired?verse.split('\n').map((line,lineIndex)=><span className="verse-half" key={lineIndex}>{line}</span>):verse}</p>)}</div></section>;
      }):<div className="placeholder"><span className="placeholder-symbol" aria-hidden="true">❋</span><p className="eyebrow">{t('सावधानी से। श्रद्धा से।','WITH CARE. WITH REVERENCE.')}</p><h2>{t('प्रमाणित पाठ की प्रतीक्षा','Awaiting verified text')}</h2><p>{t('यह सामग्री का स्थानधारक है, चालीसा का पाठ नहीं।','This is a placeholder, not the Chalisa text.')}</p><p>{t('संपूर्ण पाठ विश्वसनीय स्रोत से सत्यापित होने के बाद यहाँ उपलब्ध होगा।','The complete text will be available after verification against trusted sources.')}</p></div>}
    </article>
  </section>;
}
