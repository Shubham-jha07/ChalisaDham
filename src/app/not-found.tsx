import Link from 'next/link';
export default function NotFound() { return <section className="wrap not-found">
<span>✧ 404</span>
<h1>Yeh raasta kahin aur mud gaya.</h1>
<p>Aap jo page dhoondh rahe hain, woh nahi mila.</p>
<Link className="button" href="/">Home par lautein →</Link>
</section>; }
