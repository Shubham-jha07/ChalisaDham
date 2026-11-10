'use client';
import Link from 'next/link';
import {useState} from 'react';
import {LanguageToggle, useLanguage} from './Language';

export function Header() {
  const [open, setOpen] = useState(false);
  const {t} = useLanguage();
  return <header className="header"><div className="wrap nav">
    <Link href="/" className="brand"><span className="brand-icon">❋</span><span>{t('देव','Dev')}<span className="saffron">{t('पाठ','Paath')}</span><small>{t('हर दिन, थोड़ी श्रद्धा।','A LITTLE FAITH. EVERY DAY.')}</small></span></Link>
    <nav id="main-nav" className={open ? 'open' : ''} aria-label={t('मुख्य नेविगेशन','Main navigation')}>
      {[
        ['/#library',t('चालीसा संग्रह','Chalisa Library')],
        ['/#categories',t('देवी-देवता','Deities')],
        ['/#bookmarks',t('♡ मेरा संग्रह','♡ My Collection')],
        ['/#about',t('हमारे बारे में ↗','About Us ↗')]
      ].map(([href,label]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
    </nav>
    <div className="nav-actions"><LanguageToggle/><button type="button" className="menu" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>☰ <span className="sr-only">{t('मेनू','Menu')}</span></button></div>
  </div></header>;
}
export function Footer() {
  const {t} = useLanguage();
  return <footer id="about"><div className="wrap footer-grid"><div>
    <Link href="/" className="brand">❋ {t('देवपाठ','DevPaath')}</Link>
    <p>{t('परंपरा से जुड़ें, अपने अंदाज़ में।','Connect with tradition, your way.')}<br/>{t('हर दिन की भक्ति के लिए एक शांत कोना।','A quiet corner for your everyday devotion.')}</p>
  </div><div><h2>{t('और जानें','Explore')}</h2><p><Link href="/#library">{t('चालीसा संग्रह','Chalisa Library')}</Link></p><p><Link href="/#bookmarks">{t('मेरा संग्रह','My Collection')}</Link></p></div>
    <div><h2>{t('श्रद्धा से निर्मित','Made with Devotion')}</h2><p>{t('भक्ति के पाठ को सरल और सुलभ बनाना हमारा उद्देश्य है। प्रत्येक धार्मिक पाठ प्रकाशन से पहले विश्वसनीय स्रोतों से जाँचा जाता है।','Making devotional texts simple and accessible. Every religious text is checked against trusted sources before publication.')}</p></div>
  </div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} {t('देवपाठ','DevPaath')}</span><span>{t('परंपरा से जुड़ा। आज के लिए बना। ✦','Rooted in tradition. Designed for today. ✦')}</span></div></footer>;
}
