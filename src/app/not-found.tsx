import {Text as T,PageTitle} from '@/components/Language';
import Link from 'next/link';
export default function NotFound(){return <section className="wrap not-found"><PageTitle hi="पृष्ठ नहीं मिला | देवपाठ" en="Page not found | DevPaath"/><span>✧ 404</span><h1><T hi="यह रास्ता कहीं और मुड़ गया।" en="This path leads somewhere else."/></h1><p><T hi="आप जिस पृष्ठ को खोज रहे हैं, वह उपलब्ध नहीं है।" en="The page you are looking for is not available."/></p><Link className="button" href="/"><T hi="मुख्य पृष्ठ पर लौटें →" en="Return home →"/></Link></section>}
