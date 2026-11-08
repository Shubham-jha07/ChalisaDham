import type {MetadataRoute} from 'next';
import {chalisas,siteUrl} from '@/data/chalisas';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap{return [{url:`${siteUrl}/`,changeFrequency:'weekly',priority:1},...chalisas.filter(c=>c.status==='verified').map(c=>({url:`${siteUrl}/chalisa/${c.slug}/`,changeFrequency:'monthly' as const,priority:0.8}))];}
