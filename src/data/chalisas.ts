import chalisaTexts from './chalisa-texts.json';
export type Chalisa = { slug:string; name:string; hindi:string; category:string; symbol:string; color:string; intro:string; status:'pending'|'verified'; sections:{heading:string;verses:string[]}[]; sources:string[]; verifiedOn?:string };
const entries=[['hanuman','Hanuman','हनुमान','विष्णु परिवार','✺','peach'],['shiv','Shiv','शिव','शिव परिवार','☾','sage'],['ganesh','Ganesh','गणेश','शिव परिवार','ॐ','sand'],['durga','Durga','दुर्गा','शक्ति','✹','rose'],['ram','Ram','राम','विष्णु परिवार','☀','peach'],['krishna','Krishna','कृष्ण','विष्णु परिवार','❋','sage'],['saraswati','Saraswati','सरस्वती','शक्ति','❀','sand'],['lakshmi','Lakshmi','लक्ष्मी','शक्ति','✾','rose'],['shani','Shani','शनि','नवग्रह','✦','sage'],['vishnu','Vishnu','विष्णु','विष्णु परिवार','❈','sand']];
const texts:Record<string,Pick<Chalisa,'intro'|'sections'|'sources'|'verifiedOn'>>=chalisaTexts;
export const chalisas:Chalisa[]=entries.map(([slug,name,hindi,category,symbol,color])=>({slug:`${slug}-chalisa`,name:`${name} Chalisa`,hindi:`${hindi} चालीसा`,category,symbol,color,...texts[slug],status:'verified'}));
export const categories=['सभी','शिव परिवार','विष्णु परिवार','शक्ति','नवग्रह'];
export const siteUrl=(process.env.NEXT_PUBLIC_SITE_URL||'https://devpaath.com').replace(/\/$/,'');
