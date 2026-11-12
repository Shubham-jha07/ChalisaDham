import type { Metadata } from 'next';
import Link from 'next/link';
import Library from '@/components/Library';
import HeroScene from '@/components/HeroScene';
import ContentNotice from '@/components/ContentNotice';
import StructuredData from '@/components/StructuredData';
import { homeContent } from '@/data/page-content';
import { homeStructuredData, socialMetadata } from '@/lib/seo';
export const metadata: Metadata = { title: { absolute: homeContent.title }, description: homeContent.description, alternates: { canonical: '/' }, ...socialMetadata(homeContent.title, homeContent.description, '/') };
export default function Home() { return <>
<StructuredData data={homeStructuredData()} />
<section className="hero wrap">
<div className="hero-copy">
<div className="hero-tag">✦ Chalisa Collection • Sampoorn Hindi Paath</div>
<h1>{homeContent.heading}</h1>
<p className="hero-hindi">Apni pasand ki Chalisa, ek jagah.</p>
<p className="hero-description">{homeContent.intro}</p>
<div className="hero-actions">
<Link className="button" href="/#library">Apni Chalisa khojein ↗</Link>
<span className="small-note">Dil se padhein. Sukoon se judein.</span>
</div>
<div className="hero-stats">
<span>
<b>10</b> Chalisa paath</span>
<i />
<span>
<b>Hindi</b> paath</span>
<i />
<span>
<b>Aasan</b> reading options</span>
</div>
</div>
<HeroScene />
</section>
<div className="belief-strip">
<span>✦ Aasan experience</span>
<span>✦ Hindi mein bhakti</span>
<span>✦ Apni raftaar se padhein</span>
<span>✦ Kabhi bhi, kahin bhi</span>
</div>
<Library />
<section className="wrap mindful" data-reveal>
<span aria-hidden="true">❋</span>
<div>
<span className="eyebrow">Har din, ek thehraav</span>
<h2>Sukoon ke liye, bas ek pal kaafi hai.</h2>
<p>Apna pasandida paath save karein aur jab mann kare, laut aayein.</p>
</div>
<Link href="/#bookmarks">Mera Collection dekhein ↗</Link>
</section>
<section className="wrap collection-guide" aria-labelledby="collection-guide-heading">
<h2 id="collection-guide-heading">Chalisa Sangrah: Hindi paath kaise chunein?</h2>
<p>Chalisa Devi-Devtaon ki stuti ka ek paramparik roop hai. Is naam ka sambandh Hindi ke shabd chaalis se hai. Prachalit editions mein dohe, soratha aur panktiyon ka bantwara alag ho sakta hai, isliye har Chalisa ke sabhi verse blocks ki ginti ek jaisi nahi hoti.</p>
<p>Hanuman ji ki bhakti ke liye <Link href="/chalisa/hanuman-chalisa/">Hanuman Chalisa</Link>, Mahadev ki stuti ke liye <Link href="/chalisa/shiv-chalisa/">Shiv Chalisa</Link> ya Maa ki vandana ke liye <Link href="/chalisa/durga-chalisa/">Durga Chalisa</Link> padhein. Ganesh, Ram, Krishna, Saraswati, Lakshmi, Shani aur Vishnu Chalisa bhi collection mein hain.</p>
<h3>DevPaath par kya milta hai?</h3>
<p>Abhi yahan 10 Chalisa ke sampoorn Hindi paath hain. Naam se search karein, Devi-Devta ke parivaar se chunein, akshar bade karein ya pasandida page save karein. Mera Collection isi browser mein rehta hai; account banana zaroori nahi hai.</p>
<h3>Kya Chalisa ke lyrics English mein hain?</h3>
<p>Chalisa ka mool paath Hindi Devanagari mein hai. Menus, jaankari aur buttons Roman Hindi mein hain. English translation, Roman transliteration, audio aur PDF download abhi uplabdh nahi hain.</p>
</section>
<ContentNotice />
</>; }
