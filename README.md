# ChalisaDham

Hindi-first devotional library. Next.js App Router, TypeScript, Tailwind CSS and static export. Cream, saffron and botanical colors, responsive navigation, bilingual search, deity-family filters, related pages, recent additions, localStorage bookmarks, bounded font controls and share/clipboard fallback.

## Develop and verify

Use Node 22 (see `.node-version`).

```sh
npm ci
npm run dev
npm run typecheck
npm run build
npm run verify
```

The build creates `out/`. Preview with a static server such as `npx serve out`; `next start` is not used for static exports.

## Religious texts and reading layout

All ten Chalisa routes contain complete published traditional editions with internal source provenance. Hanuman retains the user-supplied, reviewed text. The supplied Shiva PDF was compared with the published Shiva text. The eight-page collection PDF contains abbreviated texts, so its omissions were not presented as complete Chalisas; complete published versions were used instead. See CONTENT-REVIEW.md for edition counts and corrections. Published versions can have different verse counts: none have been padded or cut merely to force forty rows.

Content is separate from UI: `src/data/chalisa-texts.json`, and the catalog in `src/data/chalisas.ts`. Preserve section order and every verse when editing. Copy, font sizing, share and bookmarks work on every page. All ten published routes appear in the sitemap. Source links and verification dates remain internal and are not displayed in the reader, as requested.

**Paired lines** places the first half of each chaupai on the left and the second half on the right, reading across each row like the supplied PDFs. **Stacked lines** restores the two-line verse layout. The preference is saved locally. Narrow screens automatically stack paired halves for readability, and print styles support paired rows. Dohas and sorathas remain centered in their own shaded sections. Text is selectable and copied in its normal reading order.

## Cloudflare Pages

1. Create a GitHub repository and push the project after reviewing files.
2. Connect the repository in Cloudflare Pages and select the production branch.
3. Select Next.js (Static HTML Export) or None as the framework preset.
4. Build command: `npm run build`. Output directory: `out`. Root: the folder containing `package.json`.
5. Set `NODE_VERSION=22` and `NEXT_PUBLIC_SITE_URL=https://YOUR-DOMAIN` before the build. The default `.example` domain is deliberately a placeholder. Domain changes require a rebuild for canonical URLs, sitemap and robots.
6. Check `/`, a direct `/chalisa/hanuman-chalisa/` URL, `/sitemap.xml`, `/robots.txt`, and an unknown URL. Cloudflare should serve `404.html` for missing routes. Do not add an SPA fallback rewrite.

`public/_headers` includes security headers and immutable caching for hashed assets. No secrets are required. GitHub repository creation and Cloudflare publication are not performed automatically.

## Accessibility and verification

Semantic headings, Hindi page language, labeled controls, live status messages, keyboard focus, skip link, mobile layouts and reduced-motion support. System Devanagari fonts (Nirmala UI/Mangal fallback) avoid external font requests. Hero artwork combines original optimized paintings and CSS ornamentation. Export verification checks every complete edition, verse and paired-half counts, canonical metadata, homepage links, sitemap entries and deployment files. Browser interactions and screen reader review should be checked before public launch.


## Animated devotional experience

All ten normal `/chalisa/<deity>-chalisa/` routes include the matching deity artwork, cursor-responsive parallax, gentle floating animation and a local pause button. No separate animation-preview route is needed. Homepage art cards link to these same routes. The homepage uses a deep green-and-gold hero with floating art cards, interactive image cards, entrance animation and progressive scroll reveals. A persistent Motion toggle pauses movement site-wide, and reduced-motion device preferences always take priority.

Original AI-generated illustrations are optimized to WebP in `public/images/`. Art direction and generation prompts are documented in `ARTWORK.md`. All ten Chalisas include complete published texts and the paired-line reading layout.

### This workstation

Dependencies are connected through a junction to E: because the C: drive had filled during setup. This machine may require the Windows native realpath helper in `work/` and `CHALISADHAM_JUNCTION_BUILD=1` when building with preserved symlinks. These are local environment accommodations. A clean checkout with `npm ci` on Cloudflare or another computer uses the ordinary `npm run build` command and default module resolution.

## Hindi and English display

The header language selector switches the entire interface between Hindi and English. The choice is saved in `devpaath-language` in localStorage and retained across routes and reloads. Hindi is the static-export default.

Prayers, section headings and copied devotional text always remain in their original Hindi (Devanagari) script in both modes. The language selector only translates the surrounding interface. Navigation, descriptions, controls, status messages, image descriptions and browser titles use the selected interface language. Original content JSON, bookmarks, routes and canonical URLs remain unchanged.

Run `npm run test:language` to check that both interface languages render identical Hindi prayer content, preserve all 430 verse blocks, and copy the original Hindi text. Then run `npm run typecheck`, `npm run build` and `npm run verify`.
