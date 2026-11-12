import { readFileSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';

const origin = (process.env.NEXT_PUBLIC_SITE_URL || 'https://devpaath.com').replace(/\/$/, '');
const names = {hanuman:'Hanuman',shiv:'Shiv',ganesh:'Ganesh',durga:'Durga',ram:'Ram',krishna:'Krishna',saraswati:'Saraswati',lakshmi:'Lakshmi',shani:'Shani',vishnu:'Vishnu'};
const decode = value => value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const attr = (tag, name) => decode(tag.match(new RegExp('(?:^|\\s)' + name + '="([^"]*)"'))?.[1] || '');
const meta = (html, key) => attr((html.match(/<meta\b[^>]*>/g) || []).find(tag => attr(tag, 'name') === key || attr(tag, 'property') === key) || '', 'content');
const canonical = html => attr((html.match(/<link\b[^>]*>/g) || []).find(tag => attr(tag, 'rel') === 'canonical') || '', 'href');
const schema = html => (html.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g) || []).flatMap(block => JSON.parse(block.replace(/^<script[^>]*>|<\/script>$/g, ''))['@graph']);
const titles = new Set(), descriptions = new Set();
for (const [slug, name] of [['', ''], ...Object.entries(names)]) {
  const route = slug ? '/chalisa/' + slug + '-chalisa/' : '/';
  const html = readFileSync('out' + route + 'index.html', 'utf8');
  const title = decode(html.match(/<title>([^<]+)<\/title>/)?.[1] || '');
  const description = meta(html, 'description');
  const expectedHeading = slug ? name + ' Chalisa Lyrics in Hindi' : 'Chalisa Lyrics in Hindi';
  const headings = html.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/g) || [];
  assert.equal(headings.length, 1, route + ': needs one H1');
  assert.equal(decode(headings[0].replace(/<[^>]*>/g, '')), expectedHeading, route + ': misleading heading');
  assert(title.includes(expectedHeading) && title.endsWith(' | DevPaath'), route + ': title mismatch');
  assert(description.length >= 100 && description.length <= 200, route + ': description needs review');
  assert(!/[\u0900-\u097f]/u.test(description), route + ': description must be Roman script');
  assert(!titles.has(title) && !descriptions.has(description), route + ': duplicate metadata');
  titles.add(title); descriptions.add(description);
  assert.equal(canonical(html), origin + route, route + ': incorrect canonical');
  assert.equal(meta(html, 'og:url'), origin + route);
  assert.equal(meta(html, 'og:site_name'), 'DevPaath');
  for (const prefix of ['og:', 'twitter:']) {
    assert.equal(meta(html, prefix + 'title'), title, route + ': social title mismatch');
    assert.equal(meta(html, prefix + 'description'), description, route + ': social description mismatch');
    const image = new URL(meta(html, prefix + 'image'));
    assert.equal(image.origin, new URL(origin).origin);
    assert(existsSync('out' + image.pathname), route + ': missing preview image');
  }
  assert(!/chalisadham\.pages\.dev|chalisadham\.example/.test(html), route + ': old domain in HTML');
  const graph = schema(html);
  assert(graph.length >= 3, route + ': missing static schema');
  const page = graph.find(node => node['@type'] === (slug ? 'WebPage' : 'CollectionPage'));
  assert.equal(page.name, expectedHeading);
  assert.equal(page.description, description);
  assert.equal(page.url, origin + route);
  if (slug) {
    const trail = graph.find(node => node['@type'] === 'BreadcrumbList').itemListElement;
    assert.deepEqual(trail.map(node => node.position), [1, 2]);
    assert.equal(trail[0].item, origin + '/');
    assert.equal(trail[1].item, origin + route);
    for (const node of trail) assert(html.includes('>' + node.name + '<') || html.includes('/ ' + node.name + '<'));
    assert.equal(graph.find(node => node['@type'] === 'CreativeWork').inLanguage, 'hi');
    assert(html.includes('id="chalisa-paath"') && html.includes('href="#chalisa-paath"'));
    assert(html.includes('class="reading-guide"'), route + ': context missing from initial HTML');
  } else {
    assert.equal(graph.find(node => node['@type'] === 'WebSite').name, 'DevPaath');
    const list = graph.find(node => node['@type'] === 'ItemList');
    assert.equal(list.numberOfItems, 10);
    assert.equal(list.itemListElement.length, 10);
    assert.equal(new Set(list.itemListElement.map(node => node.url)).size, 10);
  }
}
console.log('PASS: all 11 pages have unique initial-HTML SEO metadata, matching H1s, social previews, canonicals and valid JSON-LD structure.');
