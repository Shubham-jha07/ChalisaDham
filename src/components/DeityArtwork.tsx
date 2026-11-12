'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { contentName } from '@/lib/content';
import { deityGreetings } from '@/data/deity-greetings';
import type { Chalisa } from '@/data/chalisas';
export default function DeityArtwork({ item }: {
    item: Chalisa;
}) {
    const stage = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
        let frame = 0;
        const reset = () => stage.current?.style.setProperty('transform', '');
        const move = (event: PointerEvent) => {
            if (reduced.matches || !fine.matches || document.documentElement.dataset.motion === 'off')
                return;
            const x = Math.max(-1, Math.min(1, (event.clientX / window.innerWidth - .5) * 2));
            const y = Math.max(-1, Math.min(1, (event.clientY / window.innerHeight - .5) * 2));
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                stage.current?.style.setProperty('transform', `perspective(1000px) rotateX(${-y * 4}deg) rotateY(${x * 6}deg) translate3d(${x * 10}px,${y * 7}px,0)`);
            });
        };
        window.addEventListener('pointermove', move, { passive: true });
        document.documentElement.addEventListener('pointerleave', reset);
        window.addEventListener('blur', reset);
        reduced.addEventListener('change', reset);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('pointermove', move);
            document.documentElement.removeEventListener('pointerleave', reset);
            window.removeEventListener('blur', reset);
            reduced.removeEventListener('change', reset);
            reset();
        };
    }, []);
    return <figure className="deity-artwork">
    <div className="artwork-aura" aria-hidden="true"/>
    <div ref={stage} className="artwork-stage">
      <div className="artwork-float">
        <Image src={`/images/${item.slug.replace('-chalisa', '')}.webp`} alt={`${contentName(item)} — traditional Indian-style illustration`} width={960} height={1200} priority sizes="(max-width: 700px) 85vw, 420px" className="deity-image"/>
      </div>
    </div>
    <figcaption className="deity-greeting">{deityGreetings[item.slug]}</figcaption>
  </figure>;
}
