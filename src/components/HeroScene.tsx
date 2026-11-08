import Image from 'next/image';
import Link from 'next/link';

export default function HeroScene() {
  return <div className="hero-scene">
    <div className="scene-halo" aria-hidden="true"/>
    <div className="scene-orbit scene-orbit-one" aria-hidden="true"/>
    <div className="scene-orbit scene-orbit-two" aria-hidden="true"/>
    <span className="scene-spark spark-a" aria-hidden="true">✦</span>
    <span className="scene-spark spark-b" aria-hidden="true">✧</span>
    <Link href="/chalisa/shiv-chalisa/" className="scene-card scene-left" aria-label="Open Shiv Chalisa"><Image src="/images/shiv.webp" alt="शिव जी" width={340} height={420} priority sizes="160px"/><span>शिव चालीसा <b>↗</b></span></Link>
    <Link href="/chalisa/durga-chalisa/" className="scene-card scene-right" aria-label="Open Durga Chalisa"><Image src="/images/durga.webp" alt="दुर्गा माँ" width={340} height={420} priority sizes="160px"/><span>दुर्गा चालीसा <b>↗</b></span></Link>
    <Link href="/chalisa/hanuman-chalisa/" className="scene-card scene-center" aria-label="Open Hanuman Chalisa"><Image src="/images/hanuman.webp" alt="हनुमान जी" width={420} height={500} priority sizes="(max-width: 700px) 210px, 260px"/><span><small>FIND YOUR MOMENT</small>हनुमान चालीसा <b>↗</b></span></Link>
    <div className="scene-note"><span>✺</span><div>मन में श्रद्धा।<small>A little closer to calm.</small></div></div>
    <p className="scene-caption">TIMELESS DEVOTION. A FRESH PERSPECTIVE.</p>
  </div>;
}
