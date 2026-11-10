import type {Metadata} from 'next';
import {Header,Footer} from '@/components/Shell';
import {siteUrl} from '@/data/chalisas';
import './globals.css';
import './motion.css';
import './premium.css';
import './reading.css';
import SiteMotion from '@/components/SiteMotion';
import {LanguageProvider,Text} from '@/components/Language';
import './language.css';
export const metadata:Metadata={metadataBase:new URL(siteUrl),title:{default:'देवपाठ — भक्ति, आपके अपने अंदाज़ में',template:'%s | देवपाठ'},description:'हिंदी चालीसा संग्रह खोजें और अपने पसंदीदा पृष्ठ सहेजें। संपूर्ण पारंपरिक हिंदी पाठ।',icons:{icon:'/icon.svg'},openGraph:{type:'website',locale:'hi_IN',siteName:'देवपाठ',title:'देवपाठ — हर दिन, थोड़ी श्रद्धा।',description:'आपकी रोज़मर्रा की भक्ति के लिए एक शांत कोना।'},twitter:{card:'summary'}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="hi"><body><LanguageProvider><a href="#main" className="skip"><Text hi="मुख्य सामग्री पर जाएँ" en="Skip to main content"/></a><Header/><main id="main">{children}</main><Footer/><SiteMotion/></LanguageProvider></body></html>}
