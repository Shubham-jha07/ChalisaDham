'use client';
import { useEffect, useState } from 'react';
import type { Chalisa } from '@/data/chalisas';
import { contentName, introduction, prayerText } from '@/lib/content';
import { BOOKMARK_KEY, readBookmarks } from './Library';
type Layout = 'paired' | 'stacked';
type Message = 'copied' | 'copyFailed' | 'linkCopied' | 'shareFailed' | 'added' | 'removed' | 'saveFailed' | '';
export default function Reader({ item }: {
    item: Chalisa;
}) {
    const [size, setSize] = useState(24), [layout, setLayout] = useState<Layout>('paired'), [saved, setSaved] = useState(false), [message, setMessage] = useState<Message>('');
    useEffect(() => {
        const sync = () => setSaved(readBookmarks().includes(item.slug));
        sync();
        try {
            const preference = localStorage.getItem('chalisadham-reader-layout');
            if (preference === 'paired' || preference === 'stacked')
                setLayout(preference);
        }
        catch { }
        window.addEventListener('storage', sync);
        return () => window.removeEventListener('storage', sync);
    }, [item.slug]);
    const sections = item.sections;
    const verified = item.status === 'verified' && item.sections.length > 0 && item.sources.length > 0;
    const text = verified ? prayerText(item) : '';
    const feedback: Record<Message, string> = {
        '': '', copied: "Paath copy ho gaya.", copyFailed: "Copy nahi ho saka. Paath select karke copy karein.",
        linkCopied: "Page ka link copy ho gaya.", shareFailed: "Share nahi ho saka. Browser se link copy karein.",
        added: "Aapke collection mein save ho gaya.", removed: "Aapke collection se hata diya gaya.", saveFailed: "Is browser mein save nahi ho sakta."
    };
    function changeLayout(next: Layout) {
        setLayout(next);
        try {
            localStorage.setItem('chalisadham-reader-layout', next);
        }
        catch { }
    }
    async function copy() {
        try {
            await navigator.clipboard.writeText(text);
            setMessage('copied');
        }
        catch {
            setMessage('copyFailed');
        }
    }
    async function share() {
        try {
            if (navigator.share)
                await navigator.share({ title: contentName(item), text: verified ? introduction(item) : "Paath ka review jaari hai", url: location.href });
            else {
                await navigator.clipboard.writeText(location.href);
                setMessage('linkCopied');
            }
        }
        catch (e) {
            if (!(e instanceof Error && e.name === 'AbortError'))
                setMessage('shareFailed');
        }
    }
    function bookmark() {
        try {
            const current = readBookmarks(), next = current.includes(item.slug) ? current.filter(s => s !== item.slug) : [...current, item.slug];
            localStorage.setItem(BOOKMARK_KEY, JSON.stringify(next));
            setSaved(next.includes(item.slug));
            setMessage(next.includes(item.slug) ? 'added' : 'removed');
        }
        catch {
            setMessage('saveFailed');
        }
    }
    return <section id="chalisa-paath" className={`reader reader-${layout}`}>
    <div className="reader-tools" aria-label="Padhne ke options">
      <div>
<button aria-label="Font size ghatayein" disabled={size <= 18} onClick={() => setSize(s => s - 2)}>A−</button>
<span>{size}px</span>
<button aria-label="Font size badhayein" disabled={size >= 40} onClick={() => setSize(s => s + 2)}>A+</button>
</div>
      <div className="layout-switch" role="group" aria-label="Lines ka layout">
        <button aria-pressed={layout === 'paired'} onClick={() => changeLayout('paired')}>Saath-saath lines</button>
<button aria-pressed={layout === 'stacked'} onClick={() => changeLayout('stacked')}>Alag-alag lines</button>
      </div>
      <div>
<button onClick={copy} disabled={!verified}>Copy karein</button>
<button onClick={share}>Share karein ↗</button>
<button aria-pressed={saved} onClick={bookmark}>{saved ? "\u2665 Saved" : "\u2661 Save karein"}</button>
</div>
    </div>
    <p className="feedback" role="status">{feedback[message]}</p>
    <article style={{ fontSize: size }} className="verse-content" lang="hi">
      {verified ? sections.map((section, index) => {
            const paired = layout === 'paired' && section.heading === 'चौपाई';
            return <section className={section.heading === 'चौपाई' ? 'chaupai-section' : 'doha-section'} key={index}>
<h2>{section.heading}</h2>
<div className="verse-list">{section.verses.map((verse, verseIndex) => <p className={`verse${paired ? ' verse-paired' : ''}`} key={verseIndex}>{paired ? verse.split('\n').map((line, lineIndex) => <span className="verse-half" key={lineIndex}>{line}</span>) : verse}</p>)}</div>
</section>;
        }) : <div className="placeholder">
<span className="placeholder-symbol" aria-hidden="true">❋</span>
<p className="eyebrow">Dhyaan se. Shraddha se.</p>
<h2>Verified paath jald aayega</h2>
<p>Is page ka paath abhi taiyaar ho raha hai.</p>
<p>Bharosemand sources se check hone ke baad sampoorn paath yahan milega.</p>
</div>}
    </article>
  </section>;
}
