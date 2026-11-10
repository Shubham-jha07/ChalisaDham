'use client';
import {useLanguage} from './Language';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroScene() {
  const {t}=useLanguage();
  return <div className="hero-scene">
    <div className="scene-halo" aria-hidden="true"/>
    <div className="scene-orbit scene-orbit-one" aria-hidden="true"/>
    <div className="scene-orbit scene-orbit-two" aria-hidden="true"/>
    <span className="scene-spark spark-a" aria-hidden="true">✦</span>
    <span className="scene-spark spark-b" aria-hidden="true">✧</span>
    <Link href="/chalisa/shiv-chalisa/" className="scene-card scene-left" aria-label={t("शिव चालीसा खोलें","Open Shiv Chalisa")}><Image src="/images/shiv.webp" alt={t("शिव जी","Lord Shiva")} width={340} height={420} priority sizes="160px"/><span>{t("शिव चालीसा","Shiv Chalisa")} <b>↗</b></span></Link>
    <Link href="/chalisa/durga-chalisa/" className="scene-card scene-right" aria-label={t("दुर्गा चालीसा खोलें","Open Durga Chalisa")}><Image src="/images/durga.webp" alt={t("दुर्गा माँ","Goddess Durga")} width={340} height={420} priority sizes="160px"/><span>{t("दुर्गा चालीसा","Durga Chalisa")} <b>↗</b></span></Link>
    <Link href="/chalisa/hanuman-chalisa/" className="scene-card scene-center" aria-label={t("हनुमान चालीसा खोलें","Open Hanuman Chalisa")}><Image src="/images/hanuman.webp" alt={t("हनुमान जी","Lord Hanuman")} width={420} height={500} priority sizes="(max-width: 700px) 210px, 260px"/><span><small>{t("अपने लिए एक पल","FIND YOUR MOMENT")}</small>{t("हनुमान चालीसा","Hanuman Chalisa")} <b>↗</b></span></Link>
    <div className="scene-note"><span>✺</span><div>{t("मन में श्रद्धा।","Faith in your heart.")}<small>{t("सुकून के थोड़ा और करीब।","A little closer to calm.")}</small></div></div>
    <p className="scene-caption">{t("शाश्वत भक्ति। एक नया दृष्टिकोण।","TIMELESS DEVOTION. A FRESH PERSPECTIVE.")}</p>
  </div>;
}
