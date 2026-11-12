import type { Metadata } from 'next';
import { chalisas, siteUrl, type Chalisa } from '@/data/chalisas';
import { chalisaPageContent, homeContent } from '@/data/page-content';

export const absoluteUrl = (path: string) => new URL(path, siteUrl + '/').toString();
export const chalisaHeading = (item: Chalisa) => item.name + ' Lyrics in Hindi';

export function socialMetadata(title: string, description: string, path: string, imageSlug = 'hanuman'): Pick<Metadata, 'openGraph' | 'twitter'> {
  const image = { url: absoluteUrl('/images/' + imageSlug + '.webp'), width: 960, height: 1200, alt: imageSlug + ' - DevPaath devotional artwork' };
  return {
    openGraph: { type: 'website', locale: 'hi_IN', siteName: 'DevPaath', title, description, url: absoluteUrl(path), images: [image] },
    twitter: { card: 'summary', title, description, images: [{ url: image.url, alt: image.alt }] }
  };
}

export function homeStructuredData() {
  const published = chalisas.filter(c => c.status === 'verified');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', '@id': absoluteUrl('/#website'), name: 'DevPaath', alternateName: 'Dev Paath', url: absoluteUrl('/'), inLanguage: 'hi-Latn' },
      { '@type': 'CollectionPage', '@id': absoluteUrl('/#webpage'), url: absoluteUrl('/'), name: homeContent.heading, description: homeContent.description,
        inLanguage: 'hi-Latn', isPartOf: { '@id': absoluteUrl('/#website') }, mainEntity: { '@id': absoluteUrl('/#chalisa-collection') } },
      { '@type': 'ItemList', '@id': absoluteUrl('/#chalisa-collection'), name: 'Chalisa Collection', numberOfItems: published.length,
        itemListElement: published.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, url: absoluteUrl('/chalisa/' + c.slug + '/') })) }
    ]
  };
}

export function chalisaStructuredData(item: Chalisa) {
  const url = absoluteUrl('/chalisa/' + item.slug + '/');
  const copy = chalisaPageContent[item.slug];
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', '@id': url + '#webpage', url, name: chalisaHeading(item), description: copy.description, inLanguage: 'hi-Latn',
        isPartOf: { '@id': absoluteUrl('/#website') }, breadcrumb: { '@id': url + '#breadcrumb' }, mainEntity: { '@id': url + '#chalisa-paath' } },
      { '@type': 'CreativeWork', '@id': url + '#chalisa-paath', name: item.name, alternateName: item.hindi, inLanguage: 'hi',
        description: copy.intro, url: url + '#chalisa-paath', image: absoluteUrl('/images/' + item.slug.replace('-chalisa', '') + '.webp') },
      { '@type': 'BreadcrumbList', '@id': url + '#breadcrumb', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Chalisa Collection', item: absoluteUrl('/') },
        { '@type': 'ListItem', position: 2, name: item.name, item: url }
      ] }
    ]
  };
}
