'use client';

import {createContext, useContext, useEffect, useState, type ReactNode} from 'react';
import {usePathname} from 'next/navigation';
import {LANGUAGE_KEY, type Language} from '@/lib/language';

type LanguageContextValue = {language: Language; setLanguage: (language: Language) => void; t: (hindi: string, english: string) => string};
const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({children}: {children: ReactNode}) {
  const [language, updateLanguage] = useState<Language>('hi');
  useEffect(() => {
    try {if (localStorage.getItem(LANGUAGE_KEY) === 'en') updateLanguage('en');} catch {}
    const sync = (event: StorageEvent) => {
      if (event.key === LANGUAGE_KEY || event.key === null) updateLanguage(event.newValue === 'en' ? 'en' : 'hi');
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);
  useEffect(() => {document.documentElement.lang = language;}, [language]);
  function setLanguage(next: Language) {
    updateLanguage(next);
    try {localStorage.setItem(LANGUAGE_KEY, next);} catch {}
  }
  const t = (hindi: string, english: string) => language === 'hi' ? hindi : english;
  return <LanguageContext.Provider value={{language, setLanguage, t}}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('LanguageProvider is required');
  return context;
}

export function Text({hi, en}: {hi: string; en: string}) {
  return useLanguage().t(hi, en);
}

export function Breadcrumb({children}: {children: ReactNode}) {
  const {t} = useLanguage();
  return <nav className="breadcrumb" aria-label={t('पृष्ठ का पथ', 'Breadcrumb')}>{children}</nav>;
}

export function LanguageToggle() {
  const {language, setLanguage, t} = useLanguage();
  return <div className="language-toggle" role="group" aria-label={t('पृष्ठ की भाषा', 'Page language')}>
    <button type="button" lang="hi" aria-pressed={language === 'hi'} onClick={() => setLanguage('hi')}>हिंदी</button>
    <button type="button" lang="en" aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>English</button>
  </div>;
}

// Canonical URLs and build-time SEO stay stable; the browser title follows the selected language.
export function PageTitle({hi, en}: {hi: string; en: string}) {
  const {language} = useLanguage();
  const pathname = usePathname();
  useEffect(() => {
    const title = language === 'hi' ? hi : en;
    const apply = () => {if (document.title !== title) document.title = title;};
    apply();
    // Next can reconcile static metadata after hydration or navigation.
    const observer = new MutationObserver(apply);
    observer.observe(document.head, {childList: true, subtree: true, characterData: true});
    return () => observer.disconnect();
  }, [language, hi, en, pathname]);
  return null;
}
