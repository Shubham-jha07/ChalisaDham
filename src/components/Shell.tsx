'use client';
import Link from 'next/link';
import { useState } from 'react';
export function Header() {
    const [open, setOpen] = useState(false);
    return <header className="header">
<div className="wrap nav">
    <Link href="/" className="brand">
<span className="brand-icon">❋</span>
<span>Dev<span className="saffron">Paath</span>
<small>Har din, thodi shraddha.</small>
</span>
</Link>
    <nav id="main-nav" className={open ? 'open' : ''} aria-label="Main navigation">
      {[
            ['/#library', "Chalisa Collection"],
            ['/#categories', "Devi-Devta"],
            ['/#bookmarks', "\u2661 Mera Collection"],
            ['/#about', "Hamare Baare Mein \u2197"]
        ].map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
    </nav>
    <div className="nav-actions">
<button type="button" className="menu" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>☰ <span className="sr-only">Menu</span>
</button>
</div>
  </div>
</header>;
}
export function Footer() {
    return <footer id="about">
<div className="wrap footer-grid">
<div>
    <Link href="/" className="brand">❋ DevPaath</Link>
    <p>Parampara se judein, apne andaaz mein.<br />Roz ki bhakti ke liye ek shaant jagah.</p>
  </div>
<div>
<h2>Aur Jaanein</h2>
<p>
<Link href="/#library">Chalisa Collection</Link>
</p>
<p>
<Link href="/#bookmarks">Mera Collection</Link>
</p>
</div>
    <div>
<h2>Shraddha Se Banaya</h2>
<p>Bhakti ke paath ko padhna aasan banana hamara maksad hai. Har paath publish karne se pehle bharosemand sources se check kiya jaata hai.</p>
</div>
  </div>
<div className="wrap footer-bottom">
<span>© {new Date().getFullYear()} DevPaath</span>
<span>Parampara se juda. Aaj ke liye bana. ✦</span>
</div>
</footer>;
}
