# DevPaath search discovery research and implementation

Research date: 13 November 2026. Scope: the existing homepage and ten Chalisa reading routes. Local changes only; no deployment or search-console submission.

## Method and limits

Reviewed devotional collections and individual pages covering all ten deities, then compared their naming and content patterns with Google's official search guidance. Compared the repository's actual prayer editions, section headings and functionality before writing original Roman-script Hinglish copy. This is qualitative page research, not keyword-volume research or a ranking forecast. No Search Console query data or paid keyword-tool export was available. The production domain could not be retrieved through the research browser; source and locally generated HTML are the implementation evidence.

## Devotional pages reviewed

- [Drik Panchang collection](https://www.drikpanchang.com/lyrics/chalisa/chalisa-collection.html): deity-first listing, recognizable prayer names, separate devotional formats and multiple editions.
- [BhaktiBharat collection](https://www.bhaktibharat.com/chalisa): direct names, recognisable opening passages and links to individual prayers.
- [Green Message stotra index](https://www.greenmesg.org/stotras/): deity-based grouping and descriptive links. Its individual Hanuman page was unavailable; no claims were taken from that unavailable page.
- [Hanuman temple reference](https://nkbashram.org/hanuman-chalisa): prayer structure and contextual reading material.
- [Hanuman Chalisa](https://www.bhaktibharat.com/chalisa/shri-hanuman-chalisa): direct prayer identification and reader controls.
- [Ganesh Chalisa](https://www.drikpanchang.com/lyrics/chalisa/lord-ganesha/shree-ganesha-chalisa.html?lang=hi): acknowledges multiple Ganesh Chalisa editions.
- [Ganesh Chalisa comparison](https://www.bhaktibharat.com/chalisa/ganesh-chalisa): lyrics-first naming and short introduction.
- [Shiv Chalisa](https://www.drikpanchang.com/lyrics/chalisa/lord-shiva/shiva-chalisa.html?lang=hi): deity description, Maha Shivaratri context and separate doha sections.
- [Shiv Chalisa comparison](https://www.bhaktibharat.com/chalisa/shiv-chalisa): direct prayer-name heading and related devotional navigation.
- [Durga Chalisa](https://www.bhaktibharat.com/chalisa/shri-durga-chalisa): Navratri and Durga Puja context. Wording varies from DevPaath's existing edition; no prayer text was imported.
- [Ram Chalisa](https://www.drikpanchang.com/lyrics/chalisa/lord-rama/shree-rama-chalisa.html?lang=hi): Ram Navami context and the prayer's opening section.
- [Krishna Chalisa](https://www.drikpanchang.com/lyrics/chalisa/lord-krishna/shree-krishna-chalisa.html?lang=hi): Janmashtami context and Krishna-leela references. Existing repository opening corrections remain intact.
- [Saraswati Chalisa](https://www.drikpanchang.com/lyrics/chalisa/saraswati-mata/saraswati-mata-chalisa.html?lang=hi): knowledge and wisdom as themes of the prayer.
- [Lakshmi Chalisa comparison](https://www.bhaktibharat.com/chalisa/maa-laxmi-shri-lakshmi): prayer identification and differing editions. DevPaath's existing doha/soratha structure is retained.
- [Vishnu Chalisa](https://www.drikpanchang.com/lyrics/chalisa/lord-vishnu/shri-vishnu-chalisa.html?lang=hi): Vishnu-focused introductory copy and iconography also present in the repository text.
- [Shani Chalisa](https://www.bhaktibharat.com/chalisa/shani-chalisa): opening invocation, deity names and section structure.

These pages are evidence for editorial patterns, not endorsements of every claim they contain. All added prose is original. No competitor prayer edition, paragraph, translation, review, audio or downloadable asset was copied.

## Search guidance reviewed

- [Title links](https://developers.google.com/search/docs/appearance/title-link): make titles distinctive, concise and descriptive; align the prominent page heading with the subject. Google may generate a different title link.
- [Snippets](https://developers.google.com/search/docs/appearance/snippet): give each page a useful description. Google can select visible page text instead, and snippet length varies.
- [Site names](https://developers.google.com/search/docs/appearance/site-names): identify DevPaath with homepage WebSite structured data and consistent naming. A smaller visual logo does not require removing the brand from metadata.
- [Breadcrumbs](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb): describe a genuine route hierarchy with matching visible navigation and absolute URLs.
- [Structured-data guidance](https://developers.google.com/search/docs/appearance/structured-data/sd-policies): markup must describe visible page content. General schema does not guarantee enhanced results.

## Decisions implemented

1. Homepage H1: Chalisa Lyrics in Hindi. Homepage title leads with the collection and a few representative prayers, with DevPaath at the end.
2. Detail H1 and title pattern: [Prayer name] Lyrics in Hindi. Titles end with DevPaath through the existing Next.js title template.
3. Original descriptions for all eleven indexable routes. Mention only features available on that page. No keyword meta tag, artificial keyword repetitions, search-volume claims or fabricated popularity labels.
4. Each reader has a short deity-specific introduction, explanatory paragraphs and a practical question/answer after the prayer. Preserve fast access with a direct jump link to the Hindi paath.
5. Preserve all 430 source verse blocks, original line breaks, section ordering, existing URLs and categories. Do not normalize every edition to forty stored blocks: the repository's segmentation and introductory/concluding verses vary.
6. Hinglish interface and editorial copy; Devanagari prayer text. No translation toggle. Metadata descriptions are also Roman script.
7. Smaller header wordmark; prayer content remains the dominant headline. Keep DevPaath in site-name markup, social siteName, title suffix and applicationName so readers can recognize the source.
8. Static JSON-LD: WebSite, CollectionPage and ItemList on home; WebPage, CreativeWork and BreadcrumbList on reading pages. No invented organization credentials, ratings, publication dates, authors for uncertain works or unavailable search actions.
9. Explicit route-specific Open Graph and Twitter titles, descriptions, canonical URLs and existing deity artwork. Use Twitter summary cards for the existing portrait artwork.
10. Do not add FAQ rich-result promises, unsupported PDF/audio offers, medical claims, guaranteed prosperity or mandatory ritual prescriptions.

## Content ownership

- src/data/chalisa-texts.json: untouched source prayer editions and existing provenance.
- src/data/chalisas.ts: existing catalogue metadata and content assembly.
- src/data/page-content.ts: new original introductions, summaries, descriptions and explanatory content.
- src/lib/seo.ts: shared heading, social metadata and structured-data builders.
- src/components/ReadingGuide.tsx: explanatory content placed after the prayer.
- src/components/StructuredData.tsx: safe JSON-LD serialization in static HTML.

## Verification and release checklist

Automated checks inspect exported HTML, not just source configuration: unique titles/descriptions, one H1 per page, self-canonicals, social tags, real image files, parsable schema, matching breadcrumbs, complete collection links, unchanged prayer text and existing security/export checks. Run typecheck, reader tests, production build and npm run verify in that order.

Before publishing, inspect desktop/mobile headings and reader controls, then review all new copy. After an explicitly authorized deployment, use Search Console URL Inspection for the homepage and a representative reader, request indexing where appropriate, verify the sitemap, and validate breadcrumbs and schema. Observe query impressions and click-through over time; compare pages and queries before revising wording. A local edit cannot change live search results, and Google controls their final presentation.
