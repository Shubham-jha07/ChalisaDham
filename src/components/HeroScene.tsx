import Image from 'next/image';
import Link from 'next/link';
export default function HeroScene() {
    return <div className="hero-scene">
    <div className="scene-halo" aria-hidden="true"/>
    <div className="scene-orbit scene-orbit-one" aria-hidden="true"/>
    <div className="scene-orbit scene-orbit-two" aria-hidden="true"/>
    <span className="scene-spark spark-a" aria-hidden="true">✦</span>
    <span className="scene-spark spark-b" aria-hidden="true">✧</span>
    <Link href="/chalisa/shiv-chalisa/" className="scene-card scene-left" aria-label="Shiv Chalisa kholein">
<Image src="/images/shiv.webp" alt="Shiv ji" width={340} height={420} priority sizes="160px"/>
<span>Shiv Chalisa <b>↗</b>
</span>
</Link>
    <Link href="/chalisa/durga-chalisa/" className="scene-card scene-right" aria-label="Durga Chalisa kholein">
<Image src="/images/durga.webp" alt="Durga Maa" width={340} height={420} priority sizes="160px"/>
<span>Durga Chalisa <b>↗</b>
</span>
</Link>
    <Link href="/chalisa/hanuman-chalisa/" className="scene-card scene-center" aria-label="Hanuman Chalisa kholein">
<Image src="/images/hanuman.webp" alt="Hanuman ji" width={420} height={500} priority sizes="(max-width: 700px) 210px, 260px"/>
<span>
<small>Apne liye ek pal</small>Hanuman Chalisa <b>↗</b>
</span>
</Link>
    <div className="scene-note">
<span>✺</span>
<div>Mann mein shraddha.<small>Sukoon ke thoda aur kareeb.</small>
</div>
</div>
    <p className="scene-caption">Parampara ki bhakti. Ek naya andaaz.</p>
  </div>;
}
