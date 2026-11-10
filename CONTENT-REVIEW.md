# Hanuman Chalisa content review

Reviewed on 8 November 2026. The Hindi text was supplied by the user, then compared verse-by-verse for completeness, sequence and meaning with the traditional text transliterated by the [Neem Karoli Baba Ashram and Hanuman Temple](https://nkbashram.org/hanuman-chalisa). No modern translation or commentary from that website is reproduced.

The file contains two opening dohas, all forty chaupais and one closing doha. Traditional Hindi/Awadhi spelling variants in the supplied text are retained. Two passages were corrected to match the reference:

- Chaupai 16: “तुम उपकार सुग्रीवहिं कीन्हा। राम मिलाय राज पद दीन्हा॥”
- Closing doha: “पवन तनय संकट हरन, मंगल मूरति रूप।” replaces the malformed “मूरति मंगल्र मूर”.

The remaining nine complete texts have now been added; see the collection review below. Content lives in the `hanuman` entry in `src/data/chalisa-texts.json`; the structured entry in `src/data/chalisas.ts` makes the reader, copy/share controls, metadata and sitemap available for the reviewed text.


# Complete collection review - 8 November 2026

The user supplied SampoornaChalisaSangrah.pdf (8 pages) and ShriShivChalisa.pdf (3 pages). Both were extracted and representative pages rendered for visual inspection. The collection has 10-15 body rows per deity, not the complete published poems. It was used for layout and identifying the intended prayers; it was not copied as a supposedly complete edition. The Shiva PDF contains 41 chaupai rows, opening doha and two closing dohas in this edition.

The full traditional text bodies below were obtained from the indicated devotional publisher. Only the traditional poems are used; no modern commentary, prose introductions, translations, site design or publisher images are copied. Source-edition lengths are preserved rather than adding or deleting lines to force forty.

| Chalisa | Section verse counts, in reading order | Published text reference |
| --- | --- | --- |
| Ganesh | 1, 38, 2 | https://www.drikpanchang.com/lyrics/chalisa/lord-ganesha/shree-ganesha-chalisa.html?lang=hi |
| Durga | 41 | https://www.drikpanchang.com/lyrics/chalisa/durga-mata/durga-mata-chalisa.html?lang=hi |
| Ram | 46, 2 | https://www.drikpanchang.com/lyrics/chalisa/lord-rama/shree-rama-chalisa.html?lang=hi |
| Krishna | 2, 40, 1 | https://www.drikpanchang.com/lyrics/chalisa/lord-krishna/shree-krishna-chalisa.html?lang=hi; https://www.bhaktibharat.com/chalisa/krishna-chalisa |
| Saraswati | 2, 39, 2 | https://www.drikpanchang.com/lyrics/chalisa/saraswati-mata/saraswati-mata-chalisa.html?lang=hi |
| Lakshmi | 1, 1, 39, 2 | https://www.drikpanchang.com/lyrics/chalisa/lakshmi-mata/lakshmi-mata-chalisa.html?lang=hi |
| Shani | 2, 40, 1 | https://www.drikpanchang.com/lyrics/chalisa/lord-shani/shani-dev-chalisa.html?lang=hi |
| Vishnu | 1, 40 | https://www.drikpanchang.com/lyrics/chalisa/lord-vishnu/shri-vishnu-chalisa.html?lang=hi |
| Shiv | 1, 41, 2 | https://www.drikpanchang.com/lyrics/chalisa/lord-shiva/shiva-chalisa.html?lang=hi |

Review notes:
- Krishna: the two opening dohas in the main publisher were malformed and included a line also found in Shani Chalisa. The complete opening dohas were checked against BhaktiBharat and the first opening doha in the supplied collection. The body and closing doha are retained from the full published version.
- Shiva: the published typo `putra hon` was corrected to `putra heen`, as visible in the supplied Shiva PDF.
- Standard danda/end-of-couplet punctuation and whitespace are normalized. Ordinary edition-specific spellings and verse order are retained.
- Automated checks enforce each source edition's section counts, every two-part verse, all exported paired halves, all ten route/sitemap entries, and the absence of placeholder messages and the removed source panel.
- Original full source URLs and verification dates remain in the data for future editorial review, without a visible source panel.
