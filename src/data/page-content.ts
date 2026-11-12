// Original editorial copy informed by the references in SEO-RESEARCH.md.
// Prayer editions remain exclusively in chalisa-texts.json.
export type ChalisaPageContent = { description: string; intro: string; summary: string; about: string[]; question: string; answer: string };
export const homeContent = {
  "title": "Chalisa Lyrics in Hindi - Hanuman, Shiv, Durga | DevPaath",
  "heading": "Chalisa Lyrics in Hindi",
  "description": "Hanuman, Shiv, Ganesh, Durga aur 6 anya Chalisa ke sampoorn Hindi lyrics padhein. Font size badlein, paath copy karein aur apne collection mein save karein.",
  "intro": "Hanuman, Shiv, Ganesh, Durga aur anya Devi-Devtaon ki 10 Chalisa ek jagah. Sampoorn Hindi paath padhein, akshar bade karein aur apna pasandida paath save karein."
};
export const chalisaPageContent: Record<string, ChalisaPageContent> = {
  "hanuman-chalisa": {
    "description": "Hanuman Chalisa lyrics in Hindi padhein: Goswami Tulsidas ka sampoorn paath, dohe aur chaupaiyan. Font size badlein, paath copy karein aur save karein.",
    "intro": "Goswami Tulsidas ki Shri Hanuman Chalisa ka sampoorn Hindi paath. Shuruaati dohe, 40 chaupaiyan aur samapan doha ek jagah padhein.",
    "summary": "Hanuman ji ke dohe aur chaupaiyan",
    "about": [
      "Hanuman Chalisa mein Hanuman ji ke gyaan, bal, seva aur Shri Ram ke prati bhakti ka varnan hai. Is paath mein Ramdoot, Pavanputra aur Sankat Mochan ke roop mein unki stuti ki gayi hai. Yeh rachna Goswami Tulsidas se judi hai.",
      "Is page par do shuruaati dohe, chaalis chaupaiyan aur aakhri doha apne kram mein diye gaye hain. Paath Devanagari mein hai; aas-paas ki jaankari aur padhne ke options Roman Hindi mein hain."
    ],
    "question": "Hanuman Chalisa mein kitni chaupaiyan hain?",
    "answer": "Hanuman Chalisa mein 40 chaupaiyan hain. Do shuruaati dohe aur ek samapan doha inse alag hain. Is page par ye teenon bhaag apni headings ke saath diye gaye hain."
  },
  "shiv-chalisa": {
    "description": "Shiv Chalisa lyrics in Hindi: Shiv ji ka sampoorn paath, shuruaati doha aur samapan dohe padhein. Bade akshar, copy aur save ke options ke saath.",
    "intro": "Shri Shiv Chalisa ka sampoorn Hindi paath, shuruaati dohe se samapan tak. Mahadev ki stuti apni raftaar se padhein. Har Har Mahadev!",
    "summary": "Mahadev ki stuti aur Hindi paath",
    "about": [
      "Shiv Chalisa Bhagwan Shiv ki stuti hai. Ismein Girijapati, Neelkanth aur bhakton ke sahayak Mahadev ka smaran milta hai. Paath ke shuruaati dohe aur aakhri panktiyon mein Ayodhyadas ka naam aata hai.",
      "Bhakt ise apni roz ki prarthana aur Maha Shivaratri jaise Shiv ji se jude avsaron par padhte hain. Yahan maujood edition ke dohe aur chaupaiyan apne mool kram mein rakhe gaye hain."
    ],
    "question": "Shiv Chalisa ka paath kahan se shuru hota hai?",
    "answer": "Is edition mein Ganesh ji ke smaran wale dohe se shuruaat hoti hai. Iske baad Mahadev ki stuti ki chaupaiyan aur ant mein samapan dohe diye gaye hain."
  },
  "ganesh-chalisa": {
    "description": "Ganesh Chalisa lyrics in Hindi padhein. Ganpati Bappa ki stuti, shuruaati doha aur sampoorn paath; font size badlein, copy karein aur save karein.",
    "intro": "Shri Ganesh Chalisa ka sampoorn Hindi paath dohe aur chaupaiyon ke saath padhein. Ganpati Bappa Morya!",
    "summary": "Ganpati Bappa ki stuti aur dohe",
    "about": [
      "Ganesh Chalisa mein Ganpati ji ki vandana aur unke gunon ka varnan hai. Is paath mein Girijalal, Gajbadan aur Ganraj jaise naam aate hain. Shuruaat mein mangal aur kripa ki prarthana ki gayi hai.",
      "Ganesh ji ko samarpit ek se zyada Chalisa editions prachalit hain. Is page par shuruaati doha, chaupaiyan aur samapan ke dohon wala edition diya gaya hai. Ek hi edition ka paath kram se padhne ke liye paath ki headings ka anusaran karein."
    ],
    "question": "Ganesh Chalisa ke alag versions kyun milte hain?",
    "answer": "Ganesh ji ki stuti ke liye alag Chalisa rachnayein aur prachalit editions milte hain. Shuruaati doha aur pehli chaupai se edition pehchana ja sakta hai. Yahan ek edition ka sampoorn paath diya gaya hai."
  },
  "durga-chalisa": {
    "description": "Durga Chalisa lyrics in Hindi padhein. Maa Durga ki sampoorn stuti Navratri aur roz ke paath ke liye, saaf Hindi text aur copy-save options ke saath.",
    "intro": "Maa Durga ki Chalisa ka sampoorn Hindi paath padhein. Navratri ya roz ki bhakti mein apni raftaar se Maa ki stuti karein. Jai Mata Di!",
    "summary": "Maa Durga ki sampoorn stuti",
    "about": [
      "Durga Chalisa Maa Durga aur Jagadamba ki stuti hai. Ismein Maa ke alag-alag roop, unki shakti aur bhakton ke prati karuna ka varnan milta hai. Paath mein Durga, Amba aur Bhavani jaise naam aate hain.",
      "Navratri, Durga Puja aur Devi ki prarthana se jude avsaron par yeh paath padha jaata hai. Yahan prachalit edition ki chaupaiyan kram se di gayi hain, taaki Maa ki stuti bina page badle padhi ja sake."
    ],
    "question": "Durga Chalisa kab padhi jaati hai?",
    "answer": "Bhakt ise Navratri, Durga Puja aur apni roz ki Devi-prarthana mein padhte hain. Paath ka samay aur vidhi parivaar aur parampara ke anusaar badal sakte hain."
  },
  "ram-chalisa": {
    "description": "Ram Chalisa lyrics in Hindi: Shri Ram ki sampoorn stuti aur samapan dohe padhein. Roz ke paath aur Ram Navami ke liye, copy aur save options ke saath.",
    "intro": "Shri Ram Chalisa ka sampoorn Hindi paath chaupaiyon aur samapan dohon ke saath padhein. Jai Shri Ram!",
    "summary": "Shri Ram ki stuti aur samapan dohe",
    "about": [
      "Ram Chalisa Bhagwan Shri Ram ki stuti hai. Ismein Raghubir aur Raghunath ke roop mein unka smaran, bhakton ke prati kripa ki prarthana aur Hanuman ji ka ullekh milta hai.",
      "Bhakt Ram Navami aur Shri Ram ki roz ki prarthana mein bhi is paath ko padhte hain. Yahan diya gaya edition seedhe chaupaiyon se shuru hota hai aur do samapan dohon ke saath poora hota hai."
    ],
    "question": "Ram Chalisa mein Shri Ram ke kaunse naam aate hain?",
    "answer": "Is paath mein Shri Ram ko Raghubir, Raghunath aur kripalu Prabhu ke roop mein yaad kiya gaya hai. In naamon ke saath bhakton ki sahayata aur Ram-bhakti ki prarthana milti hai."
  },
  "krishna-chalisa": {
    "description": "Krishna Chalisa lyrics in Hindi padhein. Shri Krishna ki stuti, dohe aur chaupaiyan Janmashtami ya roz ke paath ke liye; bade akshar aur copy options.",
    "intro": "Shri Krishna Chalisa ka sampoorn Hindi paath dohe aur chaupaiyon ke saath padhein. Radhe Radhe!",
    "summary": "Shri Krishna ki leelaon ka smaran",
    "about": [
      "Krishna Chalisa mein Shri Krishna ke roop, unki leelaon aur bhakton ke prati prem ka smaran hai. Is paath mein Yadunandan, Devaki Nandan, Nand ke dulare aur bansuri wale Kanhaiya ki stuti milti hai.",
      "Janmashtami aur Krishna-bhakti ki roz ki prarthana mein bhi yeh paath padha jaata hai. Is edition mein shuruaati dohe, chaupaiyan aur samapan doha diya gaya hai."
    ],
    "question": "Krishna Chalisa mein kaunse prasangon ka smaran hai?",
    "answer": "Is paath mein Govardhan, Sudama, Krishna ki baal leelaon aur Arjun ko diye Gita ke gyaan ka ullekh hai. Yeh prasang Shri Krishna ki stuti ke roop mein aate hain."
  },
  "saraswati-chalisa": {
    "description": "Saraswati Chalisa lyrics in Hindi: Maa Saraswati ki sampoorn vandana, dohe aur chaupaiyan padhein. Font size badlein, paath copy karein aur save karein.",
    "intro": "Maa Saraswati ki Chalisa ka sampoorn Hindi paath padhein. Vidya, buddhi aur gyaan ki prarthana dohon aur chaupaiyon ke saath.",
    "summary": "Vidya aur buddhi ki prarthana",
    "about": [
      "Saraswati Chalisa Maa Saraswati ki vandana hai. Ismein vidya, buddhi aur gyaan ki prarthana ki gayi hai. Maa ko Amba aur Jagadamba jaise naamon se yaad kiya gaya hai; veena aur hans se juda varnan bhi paath mein milta hai.",
      "Is page par shuruaati dohe, chaupaiyan aur samapan dohe kram se diye gaye hain. Padhte waqt apne liye suvidhajanak akshar ka size aur lines ka layout chun sakte hain."
    ],
    "question": "Saraswati Chalisa mein kis baat ki prarthana hai?",
    "answer": "Paath mein Maa Saraswati se vidya, buddhi, gyaan aur kripa ki prarthana hai. Bhakti aur vinamrata ke saath Maa ka smaran is stuti ka mukhya bhaav hai."
  },
  "lakshmi-chalisa": {
    "description": "Lakshmi Chalisa lyrics in Hindi padhein. Maa Lakshmi ka sampoorn paath, doha, soratha aur chaupaiyan; saaf text, font size, copy aur save options.",
    "intro": "Maa Lakshmi ki Chalisa ka sampoorn Hindi paath doha, soratha aur chaupaiyon ke saath padhein. Jai Maa Lakshmi!",
    "summary": "Maa Lakshmi ka doha, soratha aur paath",
    "about": [
      "Lakshmi Chalisa Maa Lakshmi ki stuti aur unki kripa ki prarthana hai. Is edition mein Maa ko Sindhu Suta aur Jagadambika jaise naamon se yaad kiya gaya hai. Paath mein bhakti ke saath gyaan, buddhi aur daya ki vinati bhi milti hai.",
      "Is page ki rachna mein shuruaati doha, soratha, chaupaiyan aur samapan dohe alag headings ke neeche hain. Lakshmi aur Mahalakshmi ke naam se alag Chalisa editions bhi milte hain; yahan diye gaye edition ka kram jaisa hai waisa hi rakha gaya hai."
    ],
    "question": "Lakshmi Chalisa mein soratha kahan hai?",
    "answer": "Is edition mein shuruaati dohe ke baad soratha aur phir chaupaiyan hain. Reader mein har bhaag ki heading alag di gayi hai, taaki paath ka kram pehchanna aasan ho."
  },
  "shani-chalisa": {
    "description": "Shani Chalisa lyrics in Hindi: Shri Shani Dev ka sampoorn paath, dohe aur chaupaiyan padhein. Bade aksharon mein padhein, copy karein aur save karein.",
    "intro": "Shri Shani Dev Chalisa ka sampoorn Hindi paath dohon aur chaupaiyon ke saath padhein. Jai Shani Dev!",
    "summary": "Shani Dev ki stuti aur dohe",
    "about": [
      "Shani Chalisa Shri Shani Dev ki stuti hai. Ismein Ravi Tanay aur Chhaya Nandan jaise naamon ke saath unka smaran kiya gaya hai. Paath ke andar bhakton ki prarthana aur paramparik kathao ke sandarbh milte hain.",
      "Is page par Ganesh ji ke smaran wala shuruaati doha, Shani Dev ki vinati, chaupaiyan aur samapan doha diye gaye hain. Yahan Chalisa ko paramparik bhakti-paath ke roop mein padh sakte hain."
    ],
    "question": "Shani Chalisa ki shuruaat kis smaran se hoti hai?",
    "answer": "Is edition ka pehla doha Ganesh ji ka smaran karta hai. Agle dohe mein Shani Dev se vinati hai; uske baad unki stuti ki chaupaiyan di gayi hain."
  },
  "vishnu-chalisa": {
    "description": "Vishnu Chalisa lyrics in Hindi padhein. Shri Hari ki sampoorn stuti, shuruaati doha aur chaupaiyan; font size, copy aur save options ke saath.",
    "intro": "Bhagwan Vishnu ki Chalisa ka sampoorn Hindi paath padhein. Shuruaati dohe aur chaupaiyon ke saath Shri Hari ka smaran karein.",
    "summary": "Bhagwan Vishnu aur Shri Hari ki stuti",
    "about": [
      "Vishnu Chalisa Bhagwan Vishnu ki stuti hai. Ismein Shri Hari ke roop, shankh, chakra, gada aur bhakton ke prati kripa ka varnan milta hai. Paath mein Vishnu ji ki mahima aur unse judi bhakti-parampara ka smaran kiya gaya hai.",
      "Is edition mein ek shuruaati doha aur uske baad chaupaiyan di gayi hain. Neeche ka sampoorn Hindi paath ek hi page par hai, jahan font size aur lines ka layout apni suvidha ke anusaar badal sakte hain."
    ],
    "question": "Vishnu Chalisa mein Bhagwan Vishnu ka kaisa varnan hai?",
    "answer": "Paath mein peetambar, Baijanti mala aur shankh, chakra, gada se jude roop ka varnan milta hai. Saath hi bhakton ki raksha aur Shri Hari ki kripa ka smaran hai."
  }
};
