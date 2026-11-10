'use client';

import {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import {useLanguage} from './Language';
import {contentName} from '@/lib/language';
import type {Chalisa} from '@/data/chalisas';

export default function DeityArtwork({item}:{item:Chalisa}) {
  const {language,t}=useLanguage();
  const stage = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const reset = () => stage.current?.style.setProperty('transform', '');
    const move = (event: PointerEvent) => {
      if (paused || reduced.matches || !fine.matches || document.documentElement.dataset.motion === 'off') return;
      const x = Math.max(-1, Math.min(1, (event.clientX / window.innerWidth - .5) * 2));
      const y = Math.max(-1, Math.min(1, (event.clientY / window.innerHeight - .5) * 2));
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        stage.current?.style.setProperty('transform', `perspective(1000px) rotateX(${-y * 4}deg) rotateY(${x * 6}deg) translate3d(${x * 10}px,${y * 7}px,0)`);
      });
    };
    window.addEventListener('pointermove', move, {passive: true});
    document.documentElement.addEventListener('pointerleave', reset);
    window.addEventListener('blur', reset);
    reduced.addEventListener('change', reset);
    if (paused) reset();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', reset);
      window.removeEventListener('blur', reset);
      reduced.removeEventListener('change', reset);
      reset();
    };
  }, [paused]);

  return <figure className={`deity-artwork ${paused ? 'motion-paused' : ''}`}>
    <div className="artwork-aura" aria-hidden="true"/>
    <div ref={stage} className="artwork-stage">
      <div className="artwork-float">
        <Image src={`/images/${item.slug.replace('-chalisa','')}.webp`} alt={t(`${item.hindi} — पारंपरिक भारतीय शैली में चित्र`,`${contentName(item,language)} — traditional Indian-style illustration`)} width={960} height={1200} priority sizes="(max-width: 700px) 85vw, 420px" className="deity-image"/>
      </div>
    </div>
    <figcaption><span className="cursor-hint">{t("✦ कर्सर हिलाएँ • एक शांत अनुभव","✦ Move your cursor • A moment of calm")}</span><button type="button" aria-pressed={paused} onClick={() => setPaused(v => !v)}>{paused ? t('▶ गति चालू करें','▶ Resume motion') : t('Ⅱ गति रोकें','Ⅱ Pause motion')}</button></figcaption>
  </figure>;
}
