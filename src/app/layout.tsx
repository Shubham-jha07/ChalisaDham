import type { Metadata } from 'next';
import { homeContent } from '@/data/page-content';
import { socialMetadata } from '@/lib/seo';
import { Header, Footer } from '@/components/Shell';
import { siteUrl } from '@/data/chalisas';
import './globals.css';
import './motion.css';
import './premium.css';
import './reading.css';
import './devotional.css';
import SiteMotion from '@/components/SiteMotion';
import './interface.css';
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: homeContent.title, template: '%s | DevPaath' },
  description: homeContent.description,
  applicationName: 'DevPaath',
  icons: { icon: '/icon.svg' },
  ...socialMetadata(homeContent.title, homeContent.description, '/')
};
export default function Layout({ children }: {
    children: React.ReactNode;
}) { return <html lang="hi-Latn">
<body>
<a href="#main" className="skip">Skip to main content</a>
<Header />
<main id="main">{children}</main>
<Footer />
<SiteMotion />
</body>
</html>; }
