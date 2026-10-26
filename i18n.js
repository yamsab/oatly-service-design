'use strict';
/* Full English / Swedish interface for the independent Oatly student concept.
   Uses client-side language data. No account, translation API, or storage. */
(function () {
  const enSv = [
    ["Find Your Perfect Oatly — Student Prototype","Hitta din Oatly-favorit – studentprototyp"],
    ["INDEPENDENT UNIVERSITY PROJECT · INTERACTIVE STUDENT PROTOTYPE · NOT AN OFFICIAL OATLY WEBSITE","SJÄLVSTÄNDIGT UNIVERSITETSPROJEKT · INTERAKTIV STUDENTPROTOTYP · INTE OATLYS OFFICIELLA WEBBPLATS"],
    ["THE ORIGINAL","THE ORIGINAL"],["Product finder","Produktsökare"],["Compare","Jämför"],["Where to Buy","Var du kan köpa"],["Sustainability","Hållbarhet"],["About this concept","Om konceptet"],["STUDENT CONCEPT","STUDENTKONCEPT"],["Current Oatly site ↗","Oatlys nuvarande webbplats ↗"],
    ["YOUR OATS. YOUR WAY. YOUR CHOICE.","DIN HAVRE. DITT SÄTT. DITT VAL."],["GOOD OATS.","BRA HAVRE."],["YOUR KIND OF GOOD.","PRECIS SOM DU VILL HA DET."],
    ["Foamy morning coffee? Weekend pancakes? Or something with zero sugar? Tell us what matters, and find your oat-side match without the guesswork.","Skummigt morgonkaffe? Pannkakor i helgen? Eller något utan socker? Berätta vad som är viktigt för dig och hitta en havredryck som passar."],
    ["Explore oat drinks →","Utforska havredrycker →"],["✧ Ask Oatly","✧ Fråga Oatly"],["✧ Ask Oatly ↗","✧ Fråga Oatly ↗"],["✧ Close chat","✧ Stäng chatten"],
    ["✓ Compare facts, not slogans","✓ Jämför fakta, inte slogans"],["♡ Your preferences come first","♡ Dina önskemål kommer först"],["✿ Explore climate data","✿ Utforska klimatdata"],["✦ Type or talk with our guide","✦ Skriv eller prata med vår guide"],
    ["START WITH YOUR EVERYDAY MOMENT","UTGÅ FRÅN DIN VARDAG"],["What's on your menu today?","Vad står på menyn i dag?"],["Choose a moment, and we'll adjust the finder. Or skip straight to the filters below.","Välj ett tillfälle så anpassar vi produktsökaren, eller gå direkt till filtren nedan."],
    ["My morning coffee","Mitt morgonkaffe"],["Let's find something made to foam.","Hitta något som passar att skumma."],["Find my coffee match ↗","Hitta min kaffefavorit ↗"],
    ["Something tasty to make","Något gott att laga"],["Cooking, baking and everything in between.","Matlagning, bakning och allt däremellan."],["Explore kitchen choices ↗","Utforska alternativ för köket ↗"],
    ["Less sugar, please","Mindre socker, tack"],["Show me drinks with zero grams of sugar.","Visa drycker med 0 gram socker."],["Find no-sugar options ↗","Hitta sockerfria alternativ ↗"],
    ["Not sure where to start?","Vet du inte var du ska börja?"],["✦ Just ask Oatly","✦ Fråga bara Oatly"],["— no forms, no pressure.","– inga formulär, inga måsten."],
    ["Find what works for you.","Hitta det som passar dig."],["One decision at a time. Choose what matters to you and see why a product fits.","Välj det som är viktigt för dig och se varför en produkt kan passa."],["Nutrition per 100 ml and climate figures per kg of product · based on Swedish Oatly pages","Näringsvärden per 100 ml och klimatvärden per kg produkt · baserat på Oatlys svenska produktsidor"],
    ["Filter products","Filtrera produkter"],["Reset all","Återställ allt"],["You're in control. Pick what matters most; your matches update instantly, and you can reset anytime.","Du bestämmer. Välj det som betyder mest för dig. Resultatet uppdateras direkt och du kan alltid börja om."],
    ["SUGAR CONTENT","SOCKERHALT"],["FAT CONTENT","FETTHALT"],["WHAT WILL YOU USE IT FOR?","VAD SKA DU ANVÄNDA DEN TILL?"],["FLAVOUR","SMAK"],["SUSTAINABILITY PREFERENCES","HÅLLBARHETSVAL"],
    ["Any","Alla"],["Sugars per 100 ml — not a claim about added sugar.","Sockerarter per 100 ml – säger inget om mängden tillsatt socker."],["Total fat per 100 ml.","Totalt fett per 100 ml."],
    ["☕ Coffee","☕ Kaffe"],["Cooking","Matlagning"],["Baking","Bakning"],["Drinking","Dryck"],["Smoothies","Smoothies"],["Plain","Naturell"],["Vanilla","Vanilj"],["Chocolate","Choklad"],
    ["Show organic products only","Visa bara ekologiska produkter"],["Show reported climate figures","Visa redovisade klimatavtryck"],["Climate footprint is one environmental indicator, not a complete sustainability score.","Klimatavtryck är en miljöindikator, inte ett samlat hållbarhetsbetyg."],["Show matching products →","Visa matchande produkter →"],
    ["8 products available in this demo","8 produkter i den här demon"],["8 products to explore","8 produkter att utforska"],["Choose a filter or select products to compare.","Välj ett filter eller markera produkter att jämföra."],
    ["Sort: Featured","Sortera: Utvalda"],["Lowest sugar first","Minst socker först"],["Lowest fat first","Minst fett först"],["Lowest reported climate figure","Lägst redovisat klimatavtryck"],["Name A–Z","Namn A–Ö"],
    ["Compare your choices ↔","Jämför dina val ↔"],["Choose up to three oat drinks to see their differences.","Välj upp till tre havredrycker och jämför skillnaderna."],["Choose up to five products from our eight-product sample, then compare their details side by side.","Välj upp till fem av våra åtta exempelprodukter och jämför dem sida vid sida."],["Clear comparison","Rensa jämförelse"],
    ["Climate footprint is measured in kg CO₂e per kg of product (not per 100 ml). Figures are drawn from Oatly’s individual Swedish product pages; a lower footprint is not automatically a better overall sustainability rating.","Klimatavtryck anges i kg CO₂e per kg produkt (inte per 100 ml). Uppgifterna kommer från Oatlys svenska produktsidor. Ett lägre avtryck betyder inte automatiskt att produkten är mest hållbar totalt sett."],
    ["✿ Sustainability, without the guesswork.","✿ Hållbarhet med tydliga fakta."],["Already on Oatly's pages: product climate figures and organic details. Here they're placed next to the product choices, so customers can","Oatly visar redan klimatvärden och ekologisk information på sina produktsidor. Här samlas uppgifterna vid produktvalet så att besökare kan"],
    ["compare evidence","jämföra fakta"],[". A climate footprint isn't an overall sustainability score.",". Ett klimatavtryck är inte ett heltäckande hållbarhetsbetyg."],["What do the numbers mean? →","Vad betyder siffrorna? →"],
    ["✧ A little help, whenever you want.","✧ Lite hjälp när du vill."],["Ask Oatly explains trade-offs and invites follow-up questions, while keeping you in control. The assistant is openly labelled as a","Fråga Oatly förklarar skillnader och svarar på följdfrågor medan du själv bestämmer. Assistenten är tydligt märkt som en"],
    ["guided student demo","vägledd studentdemo"],[", not a person or live AI.",", inte en människa eller en generativ AI-tjänst."],["Ask Oatly →","Fråga Oatly →"],
    ["Help us make choosing oats easier.","Hjälp oss göra havrevalet enklare."],["Were the filters and comparisons easy to understand? Try the prototype, then share your impression.","Var filtren och jämförelserna lätta att förstå? Prova prototypen och dela din upplevelse."],["👍 Easy to use","👍 Lätt att använda"],["💡 Could be clearer","💡 Kan bli tydligare"],
    ["About this prototype.","Om prototypen."],
    ["Created independently as a service design / consumer behaviour university concept. Not affiliated with Oatly. Product images belong to Oatly and are fetched from Oatly's public image service when online. The guided chat is rule-based, not a live generative AI system. Speech recognition needs a supported browser and microphone permission. The browser may send audio to its speech-recognition provider, but this website does not upload chat conversations. The prototype does not collect customer feedback or send it to us. Chat messages and preferences exist only in browser page memory and are erased when reloaded. This website does not upload chats to GitHub or use a database. The speech provider controls its own data-handling practices. Where to Buy provides retailer and store-search links only; no product stock, price, or local assortment is verified. Optional location is used only for retailer search links and is not stored by this page. No price or retailer stock claims are made. Data checked October 2026. Always verify current labels and product availability.",
    "Självständigt universitetsprojekt inom tjänstedesign och konsumentbeteende, utan koppling till Oatly. Produktbilderna tillhör Oatly och hämtas från deras offentliga bildtjänst. Chatten är regelbaserad, inte en generativ AI-tjänst. Taligenkänning kräver en kompatibel webbläsare och tillåtelse att använda mikrofonen. Webbläsaren kan skicka ljud till leverantören av taligenkänning, men webbplatsen laddar inte upp chattmeddelanden. Feedback skickas inte in. Chatt och inställningar finns endast i sidans minne och försvinner när du laddar om. Ingen databas används. Leverantören av taligenkänning ansvarar för sin egen databehandling. Var du kan köpa visar endast länkar till återförsäljare och butikssökningar; sortiment, lagerstatus och priser är inte verifierade. Valfri platsinformation används bara för butikssökning och sparas inte på sidan. Uppgifterna kontrollerades i oktober 2026. Kontrollera alltid produktmärkning och tillgänglighet hos återförsäljaren."],
    ["Existing product catalogue ↗","Befintligt produktsortiment ↗"],["Oatly sustainability ↗","Oatly om hållbarhet ↗"],["Back to top ↑","Tillbaka till toppen ↑"],
    ["Ask Oatly ✧","Fråga Oatly ✧"],["Guided product assistant · not a person or live AI","Vägledd produktassistent · inte en människa eller generativ AI"],
    ["Hi, oat explorer! 👋 I'm a guided demo, not a real person. What's your oat moment today — coffee, baking, lower sugar, or learning about ingredients? We can decide together.","Hej, havreälskare! 👋 Jag är en vägledd demo, inte en riktig person. Söker du något till kaffet, bakning, med mindre socker eller vill du veta mer om innehållet?"],
    ["Zero sugar","Utan socker"],["Coffee + less fat","Kaffe + mindre fett"],["Organic","Ekologiskt"],["Climate","Klimat"],["Find a shop","Hitta butik"],
    ["Voice language","Talspråk"],["English","Engelska"],["Svenska","Svenska"],["Read replies aloud","Läs upp svar"],["🎤 Tap the mic to speak, or type below.","🎤 Tryck på mikrofonen och prata, eller skriv nedan."],
    ["Chat stays on this page and is not saved. Voice recognition may use your browser provider’s service.","Chatten stannar på sidan och sparas inte. Taligenkänning kan använda webbläsarens leverantör."],["Test speaker","Testa ljud"],["Voice help","Hjälp med tal"],["Clear conversation","Rensa chatten"],
    ["Tell me what you're looking for…","Berätta vad du söker …"],
    ["Toggle Ask Oatly assistant","Öppna eller stäng Fråga Oatly"],["Ask Oatly assistant","Fråga Oatly-assistenten"],["Close assistant","Stäng assistenten"],["Type your question","Skriv din fråga"],["Start voice input","Starta röstinmatning"],["Stop voice input","Stoppa röstinmatning"],["Send question","Skicka fråga"],
    ["Sugar filter","Sockerfilter"],["Fat filter","Fettfilter"],["Purpose filter","Användningsfilter"],["Flavour filter","Smakfilter"],["Sort products","Sortera produkter"],["Product filters","Produktfilter"],["Site language","Webbplatsens språk"],
    ["Feature","Egenskap"],["Sugar / 100 ml","Sockerarter / 100 ml"],["Total fat / 100 ml","Totalt fett / 100 ml"],["Energy / 100 ml","Energi / 100 ml"],["Fibre / 100 ml","Fiber / 100 ml"],["Best for","Passar för"],["Organic ingredients","Ekologiska ingredienser"],["Climate kg CO₂e/kg","Klimat kg CO₂e/kg"],["Official source","Officiell källa"],["Flavour","Smak"],["Remove ×","Ta bort ×"],["Not listed on source","Saknas i källan"],["✓ Yes","✓ Ja"],["No","Nej"],["Verify ↗","Kontrollera ↗"],
    ["Compare","Jämför"],["Verify on Oatly ↗","Kontrollera hos Oatly ↗"],["Why this one? ✦","Varför den här? ✦"],["Where to Buy ↗","Var du kan köpa ↗"],["Where to Buy →","Var du kan köpa →"],["Where to Buy this product","Var du kan köpa produkten"],["Climate: not listed","Klimatavtryck: saknas"],["✿ Organic","✿ Ekologisk"],
    ["No products match all your filters.","Inga produkter matchar alla dina filter."],["Try changing one preference or resetting the filters. Real products aren't forced into an unsuitable match.","Ändra ett önskemål eller återställ filtren. Vi visar inte produkter som inte passar."],["Reset filters","Återställ filter"],
    ["Choose up to three product checkboxes above to start comparing. ☝","Markera upp till tre produkter ovan för att börja jämföra. ☝"],["Choose up to three products. Remove one before adding another.","Välj högst tre produkter. Ta bort en innan du lägger till en ny."],["Choose up to five products. Remove one to add another.","Välj högst fem produkter. Ta bort en innan du lägger till en ny."],
    ["Want help choosing?","Vill du ha hjälp att välja?"],["Ask Oatly to explain differences or select what matters most. You can also ask directly in your own words.","Fråga Oatly om skillnaderna eller vad som passar dina önskemål bäst. Du kan fråga direkt med egna ord."],
    ["Lowest sugar","Minst socker"],["Lowest fat","Minst fett"],["Lower climate figure","Lägre klimatavtryck"],["Explain my comparison ✧","Förklara min jämförelse ✧"],
    ["OPTIONAL NEXT STEP","VALFRITT NÄSTA STEG"],
    ["Found your oat drink? Explore retailer websites and store finders. Purchases happen on the retailer site.","Hittat din havredryck? Besök återförsäljarnas webbplatser eller butikssökare. Köpet görs hos återförsäljaren."],
    ["Oatly product","Oatly-produkt"],["City or postcode (optional)","Ort eller postnummer (valfritt)"],["Find retailers →","Hitta återförsäljare →"],["Use my location","Använd min plats"],["e.g. Göteborg or 411 03","t.ex. Göteborg eller 411 03"],
    ["Retailer website ↗","Återförsäljarens webbplats ↗"],["Official store finder ↗","Officiell butikssökare ↗"],
    ["Illustrative retailer links, not confirmed listings for this product. No live inventory, prices, delivery or checkout are provided. A typed area stays in this page until you open a map link; sharing GPS requires your browser permission, and opening Maps sends the search/location to Google. Always verify product availability with the store.",
    "Exempel på återförsäljarlänkar, inte bekräftade produktlistningar. Vi visar inte aktuellt lagersaldo, priser, leveranser eller kassa. En angiven ort stannar på sidan tills du öppnar en kartlänk. Delning av GPS-plats kräver webbläsarens tillstånd, och en kartlänk skickar sökningen/platsen till Google. Kontrollera alltid tillgänglighet hos butiken."],
    ["No price or retailer stock claims are made.","Inga påståenden om priser eller butikslager görs."],
    ["0 g sugars. Suitable for drinking, cooking and baking.","0 g sockerarter. Passar att dricka, laga mat och baka med."],
    ["A creamy, foamable oat drink designed for coffee.","Krämig havredryck som går att skumma, framtagen för kaffe."],
    ["A lighter-tasting coffee option with less fat than iKaffe.","Ett lättare alternativ till kaffe med mindre fett än iKaffe."],
    ["Organic oat drink with a short ingredient list.","Ekologisk havredryck med kort ingredienslista."],
    ["Organic oats and rapeseed oil, made for coffee.","Ekologisk havre och rapsolja, framtagen för kaffe."],
    ["0 g sugars, 0.8 g fat and 2 g fiber per 100 ml.","0 g sockerarter, 0,8 g fett och 2 g fiber per 100 ml."],
    ["Vanilla-flavoured oat drink for lattes and smoothies.","Vaniljsmakande havredryck för latte och smoothies."],
    ["Chocolate-flavoured oat drink, served cold or warm.","Havredryck med chokladsmak, god både kall och varm."],
    ["drinking","att dricka"],["cooking","matlagning"],["baking","bakning"],["coffee","kaffe"],["smoothies","smoothies"],
    ["plain","naturell"],["vanilla","vanilj"],["chocolate","choklad"],
    ["plain-English summary","sammanfattning på svenska"],["not listed","ej angivet"],
    ["Compare this product","Jämför produkten"],["Open official details ↗","Öppna officiella uppgifter ↗"],
    ["Compare suggestions","Jämför förslag"],["Apply my preferences","Använd mina önskemål"],["Show climate values","Visa klimatvärden"],["Compare organic options","Jämför ekologiska alternativ"],["Oatly Oatfinder ↗","Oatlys butikssökare ↗"],["Open Where to Buy","Öppna Var du kan köpa"],["Compare these options","Jämför alternativen"],["Show me these products","Visa de här produkterna"],
    ["Zero sugar + low fat + climate","Utan socker + lite fett + klimat"],["Explain my selected products","Förklara mina val"],
    ["Compare zero sugar","Jämför utan socker"],["Compare low fat","Jämför mindre fett"],["Compare climate","Jämför klimat"],
    ["How does it work?","Hur fungerar det?"],
    ["🎙 Listening ended. Tap the mic to speak again.","🎙 Lyssningen avslutades. Tryck på mikrofonen för att tala igen."],
    ["🔴 Listening… Say something like “I need oat milk with no sugar for coffee”.","🔴 Lyssnar … Säg till exempel ”Jag vill ha havredryck utan socker till kaffe”."],
    ["🎙 Starting the microphone…","🎙 Startar mikrofonen …"],
    ["🎙 Tap the mic to speak, or type below.","🎙 Tryck på mikrofonen och prata, eller skriv nedan."],
    ["Conversation cleared from this page. What would you like to explore?","Chatten har rensats. Vad vill du utforska?"],["Conversation cleared. Messages are not saved on this website.","Chatten är rensad. Meddelanden sparas inte på webbplatsen."],
    ["Filters cleared","Filtren har återställts"],["Your picks are ready. Compare a few cartons, or ask a question.","Dina alternativ är klara. Jämför några produkter eller ställ en fråga."],
    ["Thank you! That helps us understand what feels useful.","Tack! Det hjälper oss att förstå vad som fungerar."],["Thank you! This is an invitation to test improvements with real users, not a live feedback service.","Tack! Det här är en demo för användartestning, inte en aktiv feedbacktjänst."]
  ];
  enSv.push(
    ["ZERO SUGARS","UTAN SOCKER"],["COFFEE FAVORITE","KAFFEFAVORIT"],["LIGHTER TASTE","LÄTTARE SMAK"],
    ["ORGANIC","EKOLOGISK"],["ORGANIC COFFEE","EKOLOGISKT KAFFE"],["HIGH FIBER","HÖGT FIBERINNEHÅLL"],
    ["VANILLA","VANILJ"],["CHOCOLATE","CHOKLAD"],["Feature","Egenskap"],
    ["Havredryck No Sugars","Havredryck No Sugars"],
    ["Share your impression","Dela din upplevelse"],
    ["Organic ingredients","Ekologiska ingredienser"],
    ["not listed on source","saknas i källan"],["Not listed on source","Saknas i källan"],
    ["View current comparison","Visa aktuell jämförelse"],["Coffee options","Alternativ till kaffe"],
    ["Compare suggestions","Jämför förslag"],["Compare my selected products","Jämför mina valda produkter"],
    ["Climate: not listed","Klimat: saknas"],
    ["Source: use the product page link for the full Swedish ingredient list.","Källa: se den fullständiga ingredienslistan på Oatlys produktsida."],
    ["Not reported in this demo","Inte redovisat i den här demon"],
    ["Choose a product checkbox first","Markera en produkt först"],
    ["No products match all your filters","Inga produkter matchar alla dina filter"],
    ["Source","Källa"],["Ingredients","Ingredienser"],
    ["0 g sugars","0 g sockerarter"]
  );
  enSv.push(['Use on-device speech','Använd lokal taligenkänning'],['✓ On-device speech ready','✓ Lokal taligenkänning klar']);
  enSv.push(['Hi! What can I help you find?','Hej! Vad vill du hitta?'],['Product guide · English / Svenska','Produktguide · svenska / engelska'],['Ask Oatly helps you compare products and gives simple, direct answers. Ask a question in English or Swedish, without filling in the filters first.','Fråga Oatly hjälper dig att jämföra produkter och ger enkla, raka svar. Ställ en fråga på svenska eller engelska utan att först använda filtren.']);
  const dictionary = new Map(enSv);
  let locale = 'en';
  const savedTexts = new WeakMap(), savedAttrs = new WeakMap();
  const attrNames = ['placeholder','aria-label','title'];

  function toSwedish(value) {
    if (dictionary.has(value)) return dictionary.get(value);
    let m;
    if ((m=value.match(/^(\d+) matching products?$/))) return m[1] + ' matchande produkter';
    if ((m=value.match(/^(\d+) of (\d+) products match your preferences$/))) return m[1] + ' av ' + m[2] + ' produkter matchar dina önskemål';
    if ((m=value.match(/^(\d+) products? match your filters$/))) return m[1] + ' produkter matchar dina filter';
    if ((m=value.match(/^↔ Compare selected \((\d+)\)$/))) return '↔ Jämför valda (' + m[1] + ')';
    if ((m=value.match(/^Sugars ([\d,.]+) g$/))) return 'Sockerarter ' + m[1] + ' g';
    if ((m=value.match(/^Fat ([\d,.]+) g$/))) return 'Fett ' + m[1] + ' g';
    if ((m=value.match(/^Sugar (.*)$/))) return 'Socker ' + m[1];
    if ((m=value.match(/^Fat (.*)$/))) return 'Fett ' + m[1];
    if ((m=value.match(/^Climate: not listed$/))) return 'Klimat: saknas';
    if ((m=value.match(/^Climate ([\d,.]+) kg\/kg$/))) return 'Klimat ' + m[1] + ' kg/kg';
    if ((m=value.match(/^Looking for (.+?)( near (.+?))?\. These are retailer\/store-search links only, not verified product listings\.$/))) return 'Söker ' + m[1] + (m[3] ? ' nära ' + m[3] : '') + '. Detta är endast länkar till återförsäljare och butikssökare, inte verifierade produktlistningar.';
    if ((m=value.match(/^Product range and stock are not checked\. Confirm (.+) directly with the retailer\.$/))) return 'Sortiment och lagerstatus har inte kontrollerats. Bekräfta ' + m[1] + ' direkt hos återförsäljaren.';
    if ((m=value.match(/^Search around (.+) \(Maps\) ↗$/))) return 'Sök nära ' + m[1] + ' (Kartor) ↗';
    if ((m=value.match(/^Compare (.+)$/))) return 'Jämför ' + m[1];
    if ((m=value.match(/^CO₂e (.+)$/))) return 'CO₂e ' + m[1];
    if ((m=value.match(/^Compare (.+) carton$/))) return 'Jämför ' + m[1];
    if ((m=value.match(/^No products match all your filters/))) return 'Inga produkter matchar alla dina filter.';
    if ((m=value.match(/^Choose a product checkbox first$/))) return 'Markera en produkt först';
    if ((m=value.match(/^([\d]+) products match your filters$/))) return m[1]+' produkter matchar dina filter';
    if (/^No products match/.test(value)) return value.replace(/^No products match all your filters\./,'Inga produkter matchar alla dina filter.');
    if ((m=value.match(/^Choose up to (\d+) products\. Remove one to add another\.$/))) return 'Välj högst ' + m[1] + ' produkter. Ta bort en för att lägga till en ny.';
    if (/^(coffee|cooking|baking|drinking|smoothies)(, (coffee|cooking|baking|drinking|smoothies))*$/.test(value)) return value.split(', ').map(x=>dictionary.get(x)||x).join(', ');
    const segments = value.split(' · ');
    if (segments.length > 1) return segments.map(s=>dictionary.get(s)||s.replace(/^Sugar /,'Socker ').replace(/^Fat /,'Fett ')).join(' · ');
    return value;
  }
  function translateText(node) {
    if (!node || node.nodeType!==3 || !node.nodeValue.trim()) return;
    if (node.parentElement && node.parentElement.closest('script,style,.msg.me')) return;
    let original = savedTexts.get(node), current = node.nodeValue;
    if (original === undefined || (current !== original && current !== toSwedish(original))) {
      original = current; savedTexts.set(node,original);
    }
    const next = locale === 'sv' ? toSwedish(original) : original;
    if (node.nodeValue !== next) node.nodeValue = next;
  }
  function translateAttrs(el) {
    if (!el || el.nodeType!==1) return;
    let saved = savedAttrs.get(el);
    if (!saved) { saved={};savedAttrs.set(el,saved); }
    attrNames.forEach(name=>{
      if (!el.hasAttribute(name)) return;
      const current=el.getAttribute(name);
      let original=saved[name];
      if (original===undefined || (current!==original && current!==toSwedish(original))) {
        original=current;saved[name]=original;
      }
      const next=locale==='sv'?toSwedish(original):original;
      if (current!==next)el.setAttribute(name,next);
    });
  }
  function translateElement(root) {
    if (!root || (root.nodeType!==1 && root.nodeType!==3)) return;
    if (root.nodeType===3) {translateText(root);return;}
    if (root.matches('script,style')) return;
    translateAttrs(root);
    root.querySelectorAll('*').forEach(translateAttrs);
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    while(walker.nextNode())translateText(walker.currentNode);
  }
  const switcher=document.createElement('div');
  switcher.className='site-language-switch';
  switcher.setAttribute('role','group');
  switcher.setAttribute('aria-label','Site language');
  switcher.innerHTML='<button type="button" data-site-language="en" aria-pressed="true" lang="en">EN</button><button type="button" data-site-language="sv" aria-pressed="false" lang="sv">SV</button>';
  document.querySelector('.header-end').prepend(switcher);
  function resetPrompts() {
    const translations = {
      'I want a drink with zero sugar':'Jag vill ha en havredryck utan socker',
      'Something for coffee with lower fat':'Något till kaffe med mindre fett',
      'Show me organic products':'Visa ekologiska produkter',
      'Compare climate footprints':'Jämför klimatavtryck',
      'Is it available at Hemköp near me?':'Var kan jag köpa Oatly nära mig?'
    };
    document.querySelectorAll('[data-prompt]').forEach(b=>{
      const base=b.dataset.englishPrompt || b.dataset.prompt;
      b.dataset.englishPrompt=base;
      b.dataset.prompt=locale==='sv'?(translations[base]||base):base;
    });
  }
  function setLanguage(next) {
    if (!['en','sv'].includes(next) || next===locale) return;
    locale=next;document.documentElement.lang=locale;
    document.title=locale==='sv'?'Hitta din Oatly-favorit – studentprototyp':'Find Your Perfect Oatly — Student Prototype';
    switcher.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.siteLanguage===locale)));
    $('voice-language').value=locale==='sv'?'sv-SE':'en-US';
    if(typeof updateLocalVoiceButton==='function')updateLocalVoiceButton();
    resetPrompts();
    // Do not leave old assistant responses in the other language.
    $('messages').replaceChildren();
    const welcome=document.createElement('div');
    welcome.className='msg bot';
    welcome.textContent=locale==='sv'
      ?'Hej! Vad vill du hitta?'
      :'Hi! What can I help you find?';
    $('messages').appendChild(welcome);
    $('voice-status').textContent=locale==='sv'?'🎤 Skriv på svenska eller tryck på mikrofonen.':'🎤 Type in English or tap the microphone.';
    translateElement(document.body);
  }
  switcher.addEventListener('click',e=>{
    const button=e.target.closest('[data-site-language]');
    if(button)setLanguage(button.dataset.siteLanguage);
  });
  const observer=new MutationObserver(changes=>{
    changes.forEach(change=>{
      if(change.type==='characterData')translateText(change.target);
      if(change.type==='attributes')translateAttrs(change.target);
      if(change.type==='childList')change.addedNodes.forEach(translateElement);
    });
  });
  translateElement(document.body);
  observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:attrNames});

  // Swedish natural-language conversation: deliberately interpretable and rule-based.
  let previousQuestion=null;
  const oldRespond=respond,oldDetails=showDetails;
  function understand(question) {
    const s=question.toLocaleLowerCase('sv-SE');
    return {
      zero:/sockerfri|sockerfritt|utan socker|inget socker|0\s?g\s?socker|zero sugar|no sugar|sugar.free/.test(s),
      sugar:/mindre socker|låg sockerhalt|lägst socker|lite socker|low sugar|lower sugar|less sugar/.test(s),
      fat:/mindre fett|lite fett|lägst fett|låg fetthalt|fettfattig|low fat|lower fat|lowest fat|less fat/.test(s),
      climate:/klimat|utsläpp|miljöpåverkan|koldioxid|co2|co₂|climate|carbon|emission|footprint/.test(s),
      organic:/ekologisk|ekologiskt|organic/.test(s),
      purpose:/kaffe|coffee|latte|barista/.test(s)?'coffee':/bakning|baka|bake|baking/.test(s)?'baking':/matlagning|laga mat|cooking|cook/.test(s)?'cooking':/smoothie/.test(s)?'smoothies':null,
      flavour:/vanilj|vanilla/.test(s)?'vanilla':/choklad|chocolate/.test(s)?'chocolate':null
    };
  }
  function hasConditions(q) {return q.zero||q.sugar||q.fat||q.climate||q.organic||q.purpose||q.flavour;}
  function advice(product,q) {
    let score=0;const met=[],miss=[],unknown=[];
    if(q.zero){if(product.sugar===0){score+=20;met.push('0 g sockerarter');}else {score-=20;miss.push(fmt(product.sugar)+' g sockerarter (inte sockerfri)');}}
    else if(q.sugar){if(product.sugar<=3.5){score+=10+(3.5-product.sugar)*2;met.push(fmt(product.sugar)+' g sockerarter');}else{score-=10;miss.push(fmt(product.sugar)+' g sockerarter');}}
    if(q.fat){if(product.fat<=1.5){score+=10+(1.5-product.fat)*4;met.push(fmt(product.fat)+' g fett');}else{score-=10;miss.push(fmt(product.fat)+' g fett');}}
    if(q.organic){if(product.organic){score+=8;met.push('ekologisk');}else{score-=8;miss.push('inte märkt som ekologisk');}}
    if(q.purpose){if(product.purposes.includes(q.purpose)){score+=6;met.push('passar för '+(toSwedish(q.purpose)));}else{score-=6;miss.push('inte angiven för '+toSwedish(q.purpose));}}
    if(q.flavour){if(product.flavour===q.flavour){score+=8;met.push(toSwedish(q.flavour)+'smak');}else{score-=8;miss.push('annan smak');}}
    if(q.climate){if(product.climate==null){score-=6;unknown.push('inget redovisat klimatavtryck i demon');}
      else {score+=4+Math.max(0,.6-product.climate)*12;met.push('klimatavtryck '+fmt(product.climate)+' kg CO₂e/kg');}}
    return {product,score,met,miss,unknown};
  }
  function replyComparison(pool,q,onlySelected) {
    if(!pool.length){addMessage('Välj produkter att jämföra eller beskriv vad du söker. Du behöver inte fylla i filtren först.','bot');return;}
    if(!hasConditions(q)){
      const sugar=pool.slice().sort((a,b)=>a.sugar-b.sugar)[0];
      const fat=pool.slice().sort((a,b)=>a.fat-b.fat)[0];
      const known=pool.filter(p=>typeof p.climate==='number').sort((a,b)=>a.climate-b.climate);
      addMessage('Ingen produkt är automatiskt bäst för alla.\n\nMinst socker: '+sugar.name+' ('+fmt(sugar.sugar)+' g/100 ml).\nMinst fett: '+fat.name+' ('+fmt(fat.fat)+' g/100 ml).\n'+(known.length?'Lägst redovisat klimatavtryck: '+known[0].name+' ('+fmt(known[0].climate)+' kg CO₂e/kg).':'Det finns inga jämförbara klimatvärden för de här produkterna.')+'\n\nVad är viktigast för dig?','bot');
      actions([['Socker',()=>submitChat('Vilken av mina valda har minst socker?')],['Fett',()=>submitChat('Vilken av mina valda har lägst fett?')],['Klimat',()=>submitChat('Vilken av mina valda har lägst klimatavtryck?')]]);
      return;
    }
    const ordered=pool.map(p=>advice(p,q)).sort((a,b)=>b.score-a.score);
    const top=ordered.slice(0,Math.min(3,ordered.length));
    previousQuestion=top[0];
    const exact=ordered.filter(r=>r.miss.length===0 && !(q.climate&&r.unknown.length));
    const opening=exact.length
      ?'Här är de alternativ som bäst motsvarar dina önskemål '+(onlySelected?'bland de valda produkterna.':'bland våra åtta exempelprodukter.')
      :'Ingen produkt uppfyller alla dina önskemål med bekräftade uppgifter. Här är de närmaste alternativen och vad som skiljer dem.';
    const lines=top.map((r,i)=>(i+1)+'. '+r.product.name+': '+(r.met.length?'uppfyller '+r.met.join(', '):'ingen säker träff på dina villkor')+(r.miss.length?'; avviker: '+r.miss.join(', '):'')+(r.unknown.length?'; uppgift saknas: '+r.unknown.join(', '):'')+'.').join('\n');
    const foot=q.climate?'Jämförelsen använder bara redovisade klimatvärden. Ett lägre klimatavtryck innebär inte att en produkt är bäst ur alla hållbarhetsperspektiv.':'Kontrollera alltid de aktuella uppgifterna på Oatlys officiella produktsida.';
    addMessage(opening+'\n\n'+lines+'\n\n'+foot,'bot');
    actions([['Jämför dessa',()=>{
      selected=top.map(r=>r.product.id);render();closeChat();$('comparison').scrollIntoView({behavior:'smooth'});
    }],['Var du kan köpa',()=>{
      $('buy-product').value=top[0].product.id;
      $('buy-product').dispatchEvent(new Event('change'));
      $('where-to-buy').scrollIntoView({behavior:'smooth'});
    }]]);
  }
  function respondSwedish(input) {
    const s=input.toLocaleLowerCase('sv-SE');
    const q=understand(s);
    if(/var köpa|köpa|butik|återförsäljare|lager|i lager|pris|hemköp|willys|ica|coop|where to buy|near me|shop|store/.test(s)){
      addMessage('Du kan gå vidare till återförsäljarnas webbplatser och butikssökare. Prototypen kan inte kontrollera vilka butiker som har en viss produkt i lager eller visa priser. Välj produkt och ange valfritt ort eller postnummer.','bot');
      actions([['Visa återförsäljare',()=>{
        const target=products.find(p=>s.includes(p.name.toLocaleLowerCase('sv-SE')) || (p.short.length>5&&s.includes(p.short.toLowerCase())));
        if(target){$('buy-product').value=target.id;$('buy-product').dispatchEvent(new Event('change'));}
        $('where-to-buy').scrollIntoView({behavior:'smooth'});
      }]]);return;
    }
    if(/ingredien|innehåll|allerg|vad är|gjord av|består av/.test(s)){
      addMessage('Havredrycker innehåller vanligtvis havre och vatten. Olika Oatly-produkter kan också innehålla rapsolja, vitaminer, mineraler och smakämnen. Läs alltid ingredienslistan på den aktuella förpackningen eller Oatlys produktsida, särskilt vid allergier.','bot');
      actions([['Visa produkterna',()=>{closeChat();$('products').scrollIntoView({behavior:'smooth'});}]]);return;
    }
    if(/vad betyder|förklara klimatavtryck|klimatavtryck betyder/.test(s)){
      addMessage('Klimatavtryck mäts här i kg CO₂e per kg produkt. Det beskriver växthusgasutsläpp och är inte ett fullständigt mått på hållbarhet. Saknade siffror ska inte tolkas som noll.','bot');return;
    }
    const chosen=/mina|valda|jämförda|jämförelse|dem|dessa|de här|selected|my compar|among my/.test(s);
    const compare=/jämför|skillnad|vilken|vilket|bäst|minst|lägst|rekommender|passar|föredra|compare|best|better|lowest|recommend|explain/.test(s);
    if(/varför|hur kommer det sig|why/.test(s) && !hasConditions(q)&&previousQuestion){
      const r=previousQuestion;
      addMessage(r.product.name+' placerades först eftersom '+(r.met.length?r.met.join(', '):'den passade dina tidigare önskemål bäst i jämförelsen')+'. '+(r.miss.length?'Den uppfyller dock inte: '+r.miss.join(', ')+'. ':'')+(r.unknown.length?'Uppgifter saknas: '+r.unknown.join(', ')+'.':'')+' Du kan ändra dina prioriteringar när som helst.','bot');return;
    }
    if(hasConditions(q)||chosen||compare){
      replyComparison(chosen?selected.map(id=>products.find(p=>p.id===id)).filter(Boolean):products,q,chosen);
      return;
    }
    if(/hej|hallå|tack|hello|hi/.test(s)){
      addMessage('Hej! 👋 Säg vad som är viktigast: utan socker, mindre fett, ekologiskt, kaffe eller lägre redovisat klimatavtryck. Du kan också fråga mig om de produkter du redan jämför.','bot');return;
    }
    addMessage('Jag kan hjälpa dig att välja mellan våra åtta exempelprodukter. Prova ”Hitta sockerfri havredryck med lite fett och lägre klimatavtryck” eller ”Vilken av mina valda produkter passar bäst?”. Jag är en regelbaserad studentdemo, inte en generativ AI.','bot');
  }
  respond=function(input){return locale==='sv'?respondSwedish(input):oldRespond(input);};
  showDetails=function(id){
    if(locale!=='sv')return oldDetails(id);
    const p=products.find(p=>p.id===id);
    if(!p)return;
    openChat();addMessage('Berätta om '+p.short,'user');
    addMessage(p.name+': '+toSwedish(p.description)+'\n\nPer 100 ml: '+fmt(p.sugar)+' g sockerarter, '+fmt(p.fat)+' g fett, '+p.kcal+' kcal.\nIngredienserna behöver kontrolleras på Oatlys officiella produktsida.\nKlimatavtryck: '+(p.climate==null?'Ingen jämförbar uppgift i demon.':fmt(p.climate)+' kg CO₂e per kg produkt.'),'bot');
    actions([['Jämför produkten',()=>{
      if(!selected.includes(id)){if(selected.length===5)selected.shift();selected.push(id);render();}
      closeChat();$('comparison').scrollIntoView({behavior:'smooth'});
    }],['Var du kan köpa',()=>{
      $('buy-product').value=id;$('buy-product').dispatchEvent(new Event('change'));
      $('where-to-buy').scrollIntoView({behavior:'smooth'});
    }],['Officiell produktsida ↗',()=>window.open(p.url,'_blank','noopener')]]);
  };
  // Keep spoken-assistant controls and browser voice errors understandable in both languages.
  const originalVoiceStatus=voiceStatus;
  voiceStatus=function(message,kind) {
    if(locale==='sv') {
      const translated=toSwedish(message);
      if(translated!==message)message=translated;
      else if(message.startsWith('🎙 Heard: '))message='🎙 Uppfattat: '+message.slice(10);
      else if(message.startsWith('✅ Heard you!'))message='✅ Jag hörde dig! Förbereder svar …';
      else if(message.startsWith('✅ Finished speaking.'))message='✅ Uppläsningen är klar. Prata eller skriv din nästa fråga.';
      else if(message.startsWith('🔊 Speaker test started.'))message='🔊 Ljudtestet har startat. Kontrollera volymen om du inte hör något.';
       else if(message.includes('browser speech-recognition service could not be reached'))message='⚠️ Webbläsarens taligenkänningstjänst kan inte nås. Oatly-webbplatsen fungerar fortfarande. Försök igen, använd lokal taligenkänning om den finns, eller tangentbordets mikrofon. Du kan alltid skriva i chatten.';
       else if(message.includes('on-device speech engine could not start'))message='⚠️ Den lokala taligenkänningen kunde inte starta. Stäng av det lokala läget eller använd tangentbordets mikrofon. Textchatten fungerar fortfarande.';
       else if(message.startsWith('⚠️') && /on-device|language pack|selected language/.test(message))message='⚠️ Lokal taligenkänning eller språkpaketet stöds inte här. Du kan skriva eller använda tangentbordets mikrofon.';
       else if(message.startsWith('✅')&&message.includes('On-device speech'))message='✅ Lokal taligenkänning är klar. Tryck på mikrofonen för att testa.';
       else if(message.startsWith('ℹ️')&&/on-device|language pack|browser speech service/.test(message))message='ℹ️ Lokal taligenkänning för språket kontrolleras eller installeras. Följ webbläsarens instruktioner.';
       else if(message.startsWith('⚠️'))message='⚠️ Taligenkänningen fungerar inte just nu. Kontrollera mikrofonbehörigheten eller använd tangentbordets mikrofon. Du kan fortfarande skriva i chatten.';
      else if(message.startsWith('ℹ️'))message='ℹ️ Kontrollera mikrofonbehörigheten för den här webbplatsen i webbläsarens inställningar, eller skriv din fråga.';
      else if(message.startsWith('🔊'))message='🔊 Uppläsning är inte tillgänglig just nu. Du kan läsa svaret i chatten.';
      else if(message.startsWith('🎙'))message='🎙 Tryck på mikrofonen för att prata eller skriv din fråga.';
      else if(message.startsWith('⏹'))message='⏹ Lyssningen stoppades.';
      else if(message.startsWith('🔇'))message='🔇 Uppläsning är avstängd.';
    }
    return originalVoiceStatus(message,kind);
  };

  // Voice selection follows the active website language; users can still choose an input locale manually.
  window.OatlyLanguage={getLanguage:()=>locale,setLanguage:setLanguage,translate:toSwedish};
})();