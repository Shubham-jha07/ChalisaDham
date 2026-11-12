import { chalisas } from '@/data/chalisas';
export default function ContentNotice() { const published = chalisas.filter(c => c.status === 'verified').length; const pending = chalisas.length - published; return <section className="wrap notice">
<b>Shraddha se padhein. Dhyaan se check kiya gaya.</b>
<p>{published} sampoorn Chalisa, padhne ke liye taiyaar.{pending > 0 && ' ' + pending + ' ' + "aur paath ka review jaari hai."}</p>
</section>; }
