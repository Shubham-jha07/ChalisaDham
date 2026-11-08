import type {Metadata} from 'next';
import {Header,Footer} from '@/components/Shell';
import {siteUrl} from '@/data/chalisas';
import './globals.css';
import './motion.css';
import './premium.css';
import './reading.css';
import SiteMotion from '@/components/SiteMotion';
export const metadata:Metadata={metadataBase:new URL(siteUrl),title:{default:'ChalisaDham — भक्ति, आपके अपने अंदाज़ में',template:'%s | ChalisaDham'},description:'हिंदी चालीसा संग्रह खोजें और अपने पसंदीदा पृष्ठ सहेजें। संपूर्ण पारंपरिक हिंदी पाठ।',icons:{icon:'/icon.svg'},openGraph:{type:'website',locale:'hi_IN',siteName:'ChalisaDham',title:'ChalisaDham — A little faith, every day',description:'आपकी रोज़मर्रा की भक्ति के लिए एक शांत कोना।'},twitter:{card:'summary'}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="hi"><body><a href="#main" className="skip">मुख्य सामग्री पर जाएँ</a><Header/><main id="main">{children}</main><Footer/><SiteMotion/></body></html>}
