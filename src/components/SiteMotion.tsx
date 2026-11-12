'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
export default function SiteMotion() {
    const pathname = usePathname();
    const [enabled, setEnabled] = useState(true);
    const [reduced, setReduced] = useState(false);
    useEffect(() => {
        const preference = matchMedia('(prefers-reduced-motion: reduce)');
        const sync = () => setReduced(preference.matches);
        sync();
        try {
            setEnabled(localStorage.getItem('chalisadham-motion') !== 'off');
        }
        catch { }
        preference.addEventListener('change', sync);
        return () => preference.removeEventListener('change', sync);
    }, []);
    useEffect(() => {
        document.documentElement.dataset.motion = enabled && !reduced ? 'on' : 'off';
    }, [enabled, reduced]);
    useEffect(() => {
        if (!('IntersectionObserver' in window))
            return;
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.setAttribute('data-revealed', '');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: .08 });
        document.querySelectorAll('[data-reveal]').forEach(node => observer.observe(node));
        document.documentElement.classList.add('motion-ready');
        return () => observer.disconnect();
    }, [pathname]);
    function toggle() {
        const next = !enabled;
        setEnabled(next);
        try {
            localStorage.setItem('chalisadham-motion', next ? 'on' : 'off');
        }
        catch { }
    }
    const motionActive = enabled && !reduced;
    const label = reduced ? 'Aapke device par animations band hain' : motionActive ? 'Animations rokein' : 'Animations chalu karein';
    return <button type="button" className="motion-toggle" onClick={toggle} aria-pressed={motionActive} aria-label={label} disabled={reduced} title={label}>
      <span aria-hidden="true">{motionActive ? 'Ⅱ' : '▶'}</span>
    </button>;
}
