'use client';
import {chalisas} from '@/data/chalisas';
import {useLanguage} from './Language';
export default function ContentNotice(){const {t}=useLanguage();const published=chalisas.filter(c=>c.status==='verified').length;const pending=chalisas.length-published;return <section className="wrap notice"><b>{t('श्रद्धा से पढ़ें। सावधानी से प्रकाशित।','Read with devotion. Published with care.')}</b><p>{published} {t('संपूर्ण चालीसा, पढ़ने के लिए तैयार।','complete Chalisas, ready to read.')}{pending>0&&' '+pending+' '+t('और पाठों का सत्यापन जारी है।','more texts are being reviewed.')}</p></section>;}
