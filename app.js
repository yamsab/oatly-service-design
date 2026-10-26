
'use strict';
const products = [
 {id:'nosugar', name:'Havredryck No Sugars', short:'No Sugars', description:'0 g sugars. Suitable for drinking, cooking and baking.', sugar:0,fat:1.5,kcal:44,fiber:0.7,organic:false,climate:.46, flavour:'plain', purposes:['drinking','cooking','baking','coffee'], tag:'ZERO SUGARS', color:0, url:'https://www.oatly.com/sv-se/products/oat-drink/oat-drink-no-sugars-1l',photo:'https://assets.oatly.com/m/38e514dc14c79f7a/w1800-WEB-62101-Oat-Drink-No-Sugars-SE-FI-right-tp-brik-edge-1L-v079.png', ingredients:'Water, oats (10%), rapeseed oil, acidity regulator, minerals, salt and vitamins.'},
 {id:'ikaffe', name:'Havredryck iKaffe',short:'iKaffe',description:'A creamy, foamable oat drink designed for coffee.',sugar:3.4,fat:3,kcal:61,fiber:.8,organic:false,climate:.33,flavour:'plain',purposes:['coffee','cooking','baking','drinking'],tag:'COFFEE FAVORITE',color:1,url:'https://www.oatly.com/sv-se/products/oat-drink/oat-drink-barista-edition-1l',photo:'https://assets.oatly.com/m/314660a423dfef17/w1800-WEB-61603-Oatly-iKaffe-Barista-Edition-Right-1L-Front.png',ingredients:'Water, oats (10%), rapeseed oil, acidity regulator, minerals, salt and vitamins.'},
 {id:'light',name:'iKaffe Light',short:'iKaffe Light',description:'A lighter-tasting coffee option with less fat than iKaffe.',sugar:3.4,fat:2.1,kcal:52,fiber:.8,organic:false,climate:.31,flavour:'plain',purposes:['coffee','cooking','baking','drinking'],tag:'LIGHTER TASTE',color:2,url:'https://www.oatly.com/sv-se/products/oat-drink/oat-drink-barista-edition-lighter-taste-1l',photo:'https://assets.oatly.com/m/1234c373743b4963/w1080-WEB-62199-Oatly-Oat-Drink-iKaffe-Light-1L-Right-3500x3500-transparent.png',ingredients:'Water, oats (10%), rapeseed oil, acidity regulator, minerals, salt and vitamins.'},
 {id:'organic',name:'Havredryck Ekologisk',short:'Organic',description:'Organic oat drink with a short ingredient list.',sugar:3.4,fat:.5,kcal:39,fiber:.8,organic:true,climate:.30,flavour:'plain',purposes:['drinking','cooking','baking','coffee'],tag:'ORGANIC',color:3,url:'https://www.oatly.com/sv-se/products/oat-drink/oat-drink-organic-1l',photo:'https://assets.oatly.com/m/63580ee3c8a5c8b0/w1800-WEB-61610-Oatly-Havredryck-EKO-Edge-1L-Right.png',ingredients:'Water, organic oats (10%), sea salt and vitamin D2.'},
 {id:'organiccoffee',name:'iKaffe Ekologisk',short:'iKaffe Organic',description:'Organic oats and rapeseed oil, made for coffee.',sugar:2.2,fat:3.2,kcal:59,fiber:.7,organic:true,climate:.32,flavour:'plain',purposes:['coffee','cooking','baking','drinking'],tag:'ORGANIC COFFEE',color:4,url:'https://www.oatly.com/sv-se/products/oat-drink/oat-drink-barista-edition-organic-1l',photo:'https://assets.oatly.com/m/7d3811773a7e7a60/w1800-WEB-62166-Oatly-Oat-Drink-Barista-iKaffe-Ekologisk-Luomu-Edge-1L-Right.png',ingredients:'Water, organic oats (10%), organic rapeseed oil, sea salt and acidity regulator.'},
 {id:'fiber',name:'Havredryck Fiber Low-Calorie',short:'Fiber Low-Calorie',description:'0 g sugars, 0.8 g fat and 2 g fiber per 100 ml.',sugar:0,fat:.8,kcal:20,fiber:2,organic:false,climate:null,flavour:'plain',purposes:['drinking','smoothies','cooking','baking','coffee'],tag:'HIGH FIBER',color:5,url:'https://www.oatly.com/sv-se/products/oat-drink/oat-drink-fiber-low-calorie-1l',photo:'https://assets.oatly.com/asset/13c6c92f-c79a-4973-b342-a5518d6d87a3/w1920/WEB-62488-Oatly-Fiber-Low-Calorie-Oat-Drink-No-Sugars-Edge-1L-Right-large.png',ingredients:'Water, oats (2%), soluble corn fiber, chicory root fiber, rapeseed oil, minerals, acidity regulator, salt, flavourings, citrus fiber and vitamins.'},
 {id:'vanilla',name:'iKaffe Vanilla Flavour',short:'Vanilla iKaffe',description:'Vanilla-flavoured oat drink for lattes and smoothies.',sugar:5.1,fat:3.2,kcal:72,fiber:.8,organic:false,climate:.41,flavour:'vanilla',purposes:['coffee','smoothies','drinking'],tag:'VANILLA',color:6,url:'https://www.oatly.com/sv-se/products/oat-drink/oat-drink-barista-vanilla-flavour-1l',photo:'https://assets.oatly.com/m/2069013c7909d6fe/w1920-WEB-62280-Oatly-iKaffe-Vanilla-Flavour-Espresso-House-Edge-1L-Right-3500x3500-transparent.png',ingredients:'Water, oats (10%), rapeseed oil, sugar (1.6%), acidity regulator, mineral, flavourings, salt and vitamins.'},
 {id:'choc',name:'Havredryck Choklad',short:'Chocolate',description:'Chocolate-flavoured oat drink, served cold or warm.',sugar:6.8,fat:1.5,kcal:65,fiber:1.1,organic:false,climate:.38,flavour:'chocolate',purposes:['drinking'],tag:'CHOCOLATE',color:7,url:'https://www.oatly.com/sv-se/products/oat-drink/oat-drink-chocolate-1l',photo:'https://assets.oatly.com/m/31081cbfb43bdfde/w1800-WEB-61571-Oatly-Havre-Dryck-Choklad-Edge-1L-Right-SE-NO.png',ingredients:'Water, oats (10%), sugar (3.3%), reduced-fat cocoa powder (1%), rapeseed oil, minerals, salt, flavourings and vitamins.'}
];
const $ = (id)=>document.getElementById(id);
const prefs={sugar:'any',fat:'any',purpose:'any',flavour:'any',organic:false,climate:false,sort:'default'};
let selected=['nosugar','ikaffe','light'];let chatOpen=false;let toastTimer;let speechRecognizer=null;let listening=false;let voiceAsked=false;
const fmt=(n)=>typeof n==='number'?String(n).replace('.',','):'—';
const safe=(s)=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function matched(p){const s=prefs.sugar,f=prefs.fat;return(s==='any'||(s==='zero'&&p.sugar===0)||(s==='under'&&p.sugar<=3.5)||(s==='above'&&p.sugar>3.5))&&(f==='any'||(f==='low'&&p.fat<=1.5)||(f==='mid'&&p.fat>1.5&&p.fat<=2.5)||(f==='high'&&p.fat>2.5))&&(prefs.purpose==='any'||p.purposes.includes(prefs.purpose))&&(prefs.flavour==='any'||p.flavour===prefs.flavour)&&(!prefs.organic||p.organic)}
function filtered(){const arr=products.filter(matched);if(prefs.sort==='sugar')arr.sort((a,b)=>a.sugar-b.sugar);if(prefs.sort==='fat')arr.sort((a,b)=>a.fat-b.fat);if(prefs.sort==='name')arr.sort((a,b)=>a.name.localeCompare(b.name));if(prefs.sort==='climate')arr.sort((a,b)=>(a.climate??999)-(b.climate??999));return arr}
function selectedProduct(id){return products.find(p=>p.id===id)}
function notify(message){const el=$('toast');el.textContent=message;el.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.hidden=true,3200)}
function photoHTML(p){return `<img class="product-photo" src="${p.photo}" alt="${safe(p.name)} carton" loading="lazy" referrerpolicy="no-referrer" /><div class="photo-fallback" aria-hidden="true">OAT<br/>LY!<small>${safe(p.short)}</small></div>`}
function render(){document.querySelectorAll('.seg').forEach(g=>{const key=g.id;g.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(prefs[key]===b.dataset.value)))});$('organic').checked=prefs.organic;$('climate').checked=prefs.climate;$('sort').value=prefs.sort;const arr=filtered();$('result-heading').textContent=`${arr.length} matching product${arr.length===1?'':'s'}`;$('filter-summary').textContent=`${arr.length} of ${products.length} products match your preferences`;
 const active=[];if(prefs.sugar!=='any')active.push('Sugar '+({zero:'0 g',under:'≤ 3.5 g',above:'> 3.5 g'}[prefs.sugar]));if(prefs.fat!=='any')active.push('Fat '+({low:'≤ 1.5 g',mid:'1.6–2.5 g',high:'> 2.5 g'}[prefs.fat]));if(prefs.purpose!=='any')active.push(prefs.purpose);if(prefs.flavour!=='any')active.push(prefs.flavour);if(prefs.organic)active.push('Organic');if(prefs.climate)active.push('Climate footprint shown');$('active-filters').textContent=active.length?active.join(' · '):'Browse all options, or select products to compare.';
 $('cards').innerHTML=arr.length?arr.map(p=>`<article class="product"><div class="product-top tint${p.color}"><span class="product-pill">${p.tag}</span><label class="select-wrap"><input type="checkbox" class="compare-checkbox" data-id="${p.id}" ${selected.includes(p.id)?'checked':''} aria-label="Compare ${safe(p.name)}"/> Compare</label>${photoHTML(p)}</div><div class="product-info"><h3>${safe(p.name)}</h3><p class="product-desc">${safe(p.description)}</p><div class="data-pills"><span>Sugars ${fmt(p.sugar)} g</span><span>Fat ${fmt(p.fat)} g</span>${p.organic?'<span>✿ Organic</span>':''}${prefs.climate?`<span>${p.climate==null?'Climate: not listed':`CO₂e ${fmt(p.climate)} kg/kg`}</span>`:''}</div><div class="product-bottom"><a href="${p.url}" target="_blank" rel="noopener noreferrer" aria-label="Official source for ${safe(p.name)}">Verify on Oatly ↗</a><button type="button" class="details-button" data-id="${p.id}">Why this one? ✦</button></div></div></article>`).join(''):`<div class="empty"><strong>No products match all your filters.</strong>Try changing one preference or resetting the filters. Real products aren't forced into an unsuitable match.<br/><button type="button" class="btn outline" id="empty-reset" style="margin-top:16px">Reset filters</button></div>`;
 document.querySelectorAll('.compare-checkbox').forEach(el=>el.addEventListener('change',(e)=>toggleCompare(e.target.dataset.id,e.target.checked)));
 document.querySelectorAll('.details-button').forEach(el=>el.addEventListener('click',()=>showDetails(el.dataset.id)));
 const emptyReset=$('empty-reset');if(emptyReset)emptyReset.addEventListener('click',reset);
 renderTable()}
function toggleCompare(id,checked){if(checked&&!selected.includes(id)){if(selected.length>=3){notify('Choose up to three products. Remove one before adding another.');render();return}selected.push(id)}else if(!checked){selected=selected.filter(x=>x!==id)}render()}
function renderTable(){const current=selected.map(selectedProduct).filter(Boolean);$('jump-compare').textContent=`↔ Compare selected (${current.length})`;if(!current.length){$('table-holder').innerHTML='<div class="compare-placeholder">Choose up to three product checkboxes above to start comparing. ☝</div>';return}
 const metric=[['Sugar / 100 ml',p=>fmt(p.sugar)+' g'],['Total fat / 100 ml',p=>fmt(p.fat)+' g'],['Energy / 100 ml',p=>p.kcal+' kcal'],['Fibre / 100 ml',p=>fmt(p.fiber)+' g'],['Best for',p=>p.purposes.slice(0,3).join(', ')],['Organic ingredients',p=>p.organic?'✓ Yes':'No'],['Climate kg CO₂e/kg',p=>p.climate==null?'Not listed on source':fmt(p.climate)],['Official source',p=>`<a href="${p.url}" target="_blank" rel="noopener noreferrer">Verify ↗</a>`]];
 $('table-holder').innerHTML=`<table class="compare-table"><thead><tr><th scope="col">Feature</th>${current.map(p=>`<th scope="col"><div class="compare-product"><img src="${p.photo}" alt="" /><div><strong>${safe(p.short)}</strong><button type="button" data-remove="${p.id}">Remove ×</button></div></div></th>`).join('')}</tr></thead><tbody>${metric.map(([key,fn])=>`<tr><td>${key}</td>${current.map(p=>`<td>${fn(p)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;document.querySelectorAll('[data-remove]').forEach(b=>b.addEventListener('click',()=>toggleCompare(b.dataset.remove,false)))}
function reset(){Object.assign(prefs,{sugar:'any',fat:'any',purpose:'any',flavour:'any',organic:false,climate:false,sort:'default'});render();notify('Filters cleared')}
document.querySelectorAll('.seg button').forEach(button=>button.addEventListener('click',()=>{prefs[button.closest('.seg').id]=button.dataset.value;render()}));$('organic').addEventListener('change',e=>{prefs.organic=e.target.checked;render()});$('climate').addEventListener('change',e=>{prefs.climate=e.target.checked;render()});$('sort').addEventListener('change',e=>{prefs.sort=e.target.value;render()});$('reset').addEventListener('click',reset);$('show-matches').addEventListener('click',()=>{document.querySelector('.catalog-tools').scrollIntoView({behavior:'smooth',block:'start'});notify(`${filtered().length} products match your filters`)});$('clear-compare').addEventListener('click',()=>{selected=[];render()});$('jump-compare').addEventListener('click',()=>{$('comparison').scrollIntoView({behavior:'smooth',block:'start'});if(!selected.length)notify('Select a product checkbox first')});
function openChat(){chatOpen=true;$('chat-box').hidden=false;$('chat-fab').setAttribute('aria-expanded','true');$('chat-fab').textContent='✧ Close chat';setTimeout(()=>$('chat-input').focus(),100)}function closeChat(){chatOpen=false;$('chat-box').hidden=true;$('chat-fab').setAttribute('aria-expanded','false');$('chat-fab').textContent='✧ Ask Oatly'}
$('chat-fab').addEventListener('click',()=>chatOpen?closeChat():openChat());$('close-chat').addEventListener('click',closeChat);['hero-ask','mid-ask','journey-ask'].forEach(id=>$(id).addEventListener('click',openChat));
const journeys={coffee:{purpose:'coffee'},baking:{purpose:'baking'},zero:{sugar:'zero'}};
document.querySelectorAll('[data-journey]').forEach(button=>button.addEventListener('click',()=>{Object.assign(prefs,{sugar:'any',fat:'any',purpose:'any',flavour:'any',organic:false},journeys[button.dataset.journey]);render();$('products').scrollIntoView({behavior:'smooth'});notify('Your picks are ready. Compare a few cartons, or ask a question.')}));
document.querySelectorAll('[data-feedback]').forEach(button=>button.addEventListener('click',()=>{$('feedback-answer').textContent=button.dataset.feedback==='yes'?'Thank you! That helps us understand what feels useful.':'Thank you! This is an invitation to test improvements with real users, not a live feedback service.';document.querySelectorAll('[data-feedback]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));}));
function addMessage(s,from){const el=document.createElement('div');el.className='msg '+(from==='user'?'me':'bot');el.textContent=s;$('messages').appendChild(el);$('messages').scrollTop=$('messages').scrollHeight;if(from==='bot'&&voiceAsked&&$('speak-replies').checked)readReply(s)}
function actions(buttons){let bar=document.createElement('div');bar.className='reco-actions';for(const [label,fn] of buttons){const button=document.createElement('button');button.type='button';button.textContent=label;button.addEventListener('click',fn);bar.appendChild(button)}$('messages').appendChild(bar);$('messages').scrollTop=$('messages').scrollHeight}
function applySuggested(criteria){Object.assign(prefs,{sugar:'any',fat:'any',purpose:'any',flavour:'any',organic:false},criteria);render();closeChat();$('products').scrollIntoView({behavior:'smooth',block:'start'});notify('I applied your preferences to the product finder')}
function showDetails(id){const p=selectedProduct(id);openChat();addMessage('Tell me about '+p.short,'user');addMessage(`${p.name}: ${p.description}\n\nPer 100 ml: sugars ${fmt(p.sugar)} g, fat ${fmt(p.fat)} g, energy ${p.kcal} kcal.\nIngredients (plain-English summary): ${p.ingredients}\nClimate: ${p.climate===null?'A comparable value was not found on its source page.':fmt(p.climate)+' kg CO₂e per kg of product.'}\nSource: use the product page link for the full Swedish ingredient list.`, 'bot');actions([['Compare this product',()=>{if(!selected.includes(id)){if(selected.length===3){selected.shift()}selected.push(id);render()}closeChat();$('comparison').scrollIntoView({behavior:'smooth'})}],['Open official details ↗',()=>window.open(p.url,'_blank','noopener')]])}
function respond(input){const s=input.toLowerCase(),has=(...words)=>words.some(w=>s.includes(w));if(has('hemköp','hemkop','ica','coop','price','cost','stock','store','near me','where to buy','buy','shop','butik','affär','pris')){addMessage('For the university prototype, I can help you decide which Oatly product fits. I cannot verify supermarket stock, prices, or nearby availability. A future version would need a retailer integration and permission to use your location. You can open Oatly’s own Oatfinder or check your local retailer directly.', 'bot');actions([['Oatly Oatfinder ↗',()=>window.open('https://oatfinder.oatly.com/','_blank','noopener')]]);return}
 if(has('what is oat','what is it made','ingredient','inside','made from','contains','allerg','badam','almond')){addMessage('Oat drink is made with oats and water. Specific Oatly varieties may also contain rapeseed oil, minerals, vitamins or flavourings. Almond milk comes from almonds; it is not another type of oat milk, and this demo only lists oat-based Oatly products. Choose a product to inspect its ingredient summary and source.', 'bot');actions([['See No Sugars ingredients',()=>showDetails('nosugar')],['Compare organic products',()=>applySuggested({organic:true})]]);return}
 if(has('footprint','carbon','climate','sustainab','co2','emissions','environment')){addMessage('Oatly already reports climate footprints for several products. This prototype shows the figures together when you tick “Show reported climate figures” or compare products. They are measured in kg CO₂e per kg of product. A climate footprint measures greenhouse-gas emissions, not every part of sustainability.', 'bot');actions([['Show climate values',()=>{prefs.climate=true;render();closeChat();$('products').scrollIntoView({behavior:'smooth'})}],['Compare organic options',()=>applySuggested({organic:true})]]);return}
 const wantsZero=has('zero sugar','no sugar','sugar-free','sugar free','without sugar','sockerfri','0 sugar','0 g sugar');const wantsLowSugar=has('less sugar','low sugar','lower sugar','sugar');const wantsLowFat=has('low fat','less fat','lower fat','lätt','fat free');const organic=has('organic','ekologisk','eko ','eco-friendly');let purpose=has('coffee','kaffe','latte','barista')?'coffee':has('bake','baking')?'baking':has('cook','cooking')?'cooking':has('smoothie')?'smoothies':has('drink','everyday')?'drinking':null;let flavour=has('vanilla','vanilj')?'vanilla':has('chocolate','choklad')?'chocolate':null;
 let criteria={};if(wantsZero)criteria.sugar='zero';else if(wantsLowSugar)criteria.sugar='under';if(wantsLowFat)criteria.fat='low';if(organic)criteria.organic=true;if(purpose)criteria.purpose=purpose;if(flavour)criteria.flavour=flavour;
 const matches=products.filter(p=>{return(!criteria.sugar||(criteria.sugar==='zero'?p.sugar===0:p.sugar<=3.5))&&(!criteria.fat||p.fat<=1.5)&&(!criteria.organic||p.organic)&&(!criteria.purpose||p.purposes.includes(criteria.purpose))&&(!criteria.flavour||p.flavour===criteria.flavour)}).sort((a,b)=>a.sugar-b.sugar);
 if(Object.keys(criteria).length){if(matches.length){const names=matches.slice(0,3).map(p=>`${p.short} (${fmt(p.sugar)} g sugars; ${fmt(p.fat)} g fat per 100 ml)`).join(' • ');addMessage(`Based on those preferences, these are possible matches from our ${products.length}-product sample:\n${names}\n\nWould you like me to apply those filters or compare them?`, 'bot');actions([['Apply my preferences',()=>applySuggested(criteria)],['Compare suggestions',()=>{selected=matches.slice(0,3).map(p=>p.id);render();closeChat();$('comparison').scrollIntoView({behavior:'smooth'})}]])}else{addMessage('I cannot find a product in this eight-product sample that meets all those preferences. Rather than invent a match, try relaxing one condition (for example, the fat range or organic requirement).', 'bot');actions([['Apply filters anyway',()=>applySuggested(criteria)],['Reset filters',()=>{reset();closeChat()}]])}return}
 if(has('compare','difference','which is better','recommend')){addMessage('Select two or three cartons using their Compare checkboxes. You will see sugar, fat, calories, organic status and reported climate footprint side by side. I can also narrow the choices by coffee, cooking, sugar content or flavour.', 'bot');actions([['View current comparison',()=>{closeChat();$('comparison').scrollIntoView({behavior:'smooth'})}],['Coffee options',()=>applySuggested({purpose:'coffee'})]]);return}
 if(has('hello','hi','hey','hej','thanks','thank you')){addMessage('Hello! 👋 Tell me what matters most: 0 g sugar, coffee foam, lower fat, organic ingredients, or a particular flavour. I can show you how the product finder works.', 'bot');return}
 addMessage('I can help you explore our sample products. Try “I want a no-sugar drink for cooking,” “Find something organic for coffee,” or “Compare climate footprints.” This is a guided offline prototype, not an open-ended AI chatbot.', 'bot')}
function submitChat(text){const message=String(text||'').trim().slice(0,400);if(!message)return;openChat();addMessage(message,'user');respond(message)}$('chat-form').addEventListener('submit',e=>{e.preventDefault();const input=$('chat-input');const t=input.value;input.value='';submitChat(t)});document.querySelectorAll('[data-prompt]').forEach(b=>b.addEventListener('click',()=>submitChat(b.dataset.prompt)));$('climate-help').addEventListener('click',()=>submitChat('Compare climate footprints'));
// Browser speech-to-text is a progressive enhancement, not a guaranteed device feature.
// Speech synthesis speaks replies only after the user actively starts voice input.
function voiceStatus(message,kind='info'){$('voice-status').textContent=message;$('voice-status').dataset.kind=kind}
function finishListening(){listening=false;$('mic').textContent='🎙';$('mic').setAttribute('aria-pressed','false');$('mic').setAttribute('aria-label','Start voice input');}
function readReply(text){if(!('speechSynthesis' in window))return;try{window.speechSynthesis.cancel();const spoken=new SpeechSynthesisUtterance(text.replace(/https?:\/\/\S+/g,'').replace(/\n/g,'. ').slice(0,450));spoken.lang=$('voice-language').value;spoken.rate=.97;spoken.pitch=1;spoken.onend=()=>voiceStatus('✅ Finished speaking. Tap the mic again, or type your next question.');spoken.onerror=()=>voiceStatus('🔊 Audio response was unavailable. You can still read the reply.','warn');window.speechSynthesis.speak(spoken)}catch(_){voiceStatus('🔊 Spoken replies unavailable in this browser.','warn')}}
function speechConstructor(){return window.SpeechRecognition||window.webkitSpeechRecognition}
let localSpeechLanguage=null;
let speechStarting=false;
function localVoiceAvailableInBrowser(){
 const Speech=speechConstructor();
 if(!Speech || typeof Speech.available!=='function')return false;
 try{return 'processLocally' in new Speech()}catch(_){return false}
}
function updateLocalVoiceButton(){
 const button=$('voice-local');
 button.hidden=!localVoiceAvailableInBrowser();
 if(!button.hidden){
   button.textContent=localSpeechLanguage===$('voice-language').value?'✓ On-device speech ready':'Use on-device speech';
   button.setAttribute('aria-pressed',String(localSpeechLanguage===$('voice-language').value));
 }
}
function explainVoice(){
 const localPage=location.protocol==='file:'||location.protocol==='content:'||!window.isSecureContext;
 if(localPage){
   voiceStatus('⚠️ Open the published HTTPS website for voice recognition. You can still type or use your device keyboard microphone.','warn');
 }else{
   voiceStatus('ℹ️ Allow microphone access in your browser’s site settings. Speech recognition may also require access to your browser provider’s online service. If the service fails, retry once, try a supported browser, use the on-device option if available, or dictate with your keyboard microphone. The text assistant continues working.','info');
 }
}
$('voice-help').addEventListener('click',explainVoice);
$('voice-test').addEventListener('click',()=>{
 if(!('speechSynthesis' in window)){voiceStatus('⚠️ This browser does not support spoken replies.','warn');return}
 voiceAsked=true;
 readReply('Hi! I am the Oatly student prototype. You can speak or type your preferences, and I will help you compare products.');
 voiceStatus('🔊 Speaker test started. If you hear nothing, check your device volume.');
});
$('voice-language').addEventListener('change',updateLocalVoiceButton);
$('voice-local').addEventListener('click',async()=>{
 const Speech=speechConstructor();
 if(!localVoiceAvailableInBrowser()){
   voiceStatus('⚠️ On-device speech recognition is not available in this browser. Try Chrome or use the keyboard microphone.','warn');return;
 }
 const lang=$('voice-language').value;
 const btn=$('voice-local');
 if(localSpeechLanguage===lang){
   localSpeechLanguage=null;
   updateLocalVoiceButton();
   voiceStatus('ℹ️ On-device mode switched off. The microphone will use the browser speech service.','info');
   return;
 }
 btn.disabled=true;
 voiceStatus('ℹ️ Checking whether this browser supports on-device recognition for '+lang+'…','info');
 try{
   const status=await Speech.available({langs:[lang],processLocally:true});
   if(status==='available'){
     localSpeechLanguage=lang;
     voiceStatus('✅ On-device speech ready for '+lang+'. Tap the microphone to try it.','info');
   }else if((status==='downloadable'||status==='downloading') && typeof Speech.install==='function'){
     voiceStatus('ℹ️ The '+lang+' on-device speech pack must be installed. Your browser will handle its download.','info');
     const installed=await Speech.install({langs:[lang]});
     if(installed){
       localSpeechLanguage=lang;
       voiceStatus('✅ On-device speech installed for '+lang+'. Tap the microphone to try it.','info');
     }else{
       voiceStatus('⚠️ The on-device language pack could not be installed. You can type or use the browser speech service.','warn');
     }
   }else{
     voiceStatus('⚠️ On-device speech is unavailable for '+lang+' in this browser. Try another supported browser or your keyboard microphone.','warn');
   }
 }catch(_){
   voiceStatus('⚠️ The browser could not enable on-device recognition. Its feature or language pack may be blocked or unsupported. The text assistant still works.','warn');
 }finally{
   btn.disabled=false;
   updateLocalVoiceButton();
 }
});
updateLocalVoiceButton();
$('mic').addEventListener('click',()=>{
 if(listening&&speechRecognizer){
   speechRecognizer.stop();
   voiceStatus('⏹ Listening stopped.','info');
   finishListening();
   return;
 }
 if(speechStarting)return;
 if(location.protocol==='file:'||location.protocol==='content:'||!window.isSecureContext){
   voiceStatus('⚠️ Voice input needs a secure HTTPS page. Open the published website or use your keyboard microphone.','warn');return;
 }
 const Speech=speechConstructor();
 if(!Speech){
   voiceStatus('⚠️ Speech recognition is not supported by this browser. You can type or use your keyboard microphone instead.','warn');return;
 }
 const language=$('voice-language').value;
 let speech;
 try{speech=new Speech()}catch(_){
   voiceStatus('⚠️ Unable to initialise browser speech recognition. Try a supported browser or type your question.','warn');return;
 }
 const usingLocal=localSpeechLanguage===language&&('processLocally' in speech);
 try{if(usingLocal)speech.processLocally=true}catch(_){}
 speechRecognizer=speech;
 speech.lang=language;
 speech.interimResults=true;
 speech.continuous=false;
 speech.maxAlternatives=1;
 speechStarting=true;
 let finalWords='';
 speech.onstart=()=>{
   speechStarting=false;
   listening=true;
   voiceAsked=true;
   $('mic').textContent='■';
   $('mic').setAttribute('aria-pressed','true');
   $('mic').setAttribute('aria-label','Stop voice input');
   voiceStatus('🔴 Listening… Speak a product preference, such as “no sugar and low fat”.','listening');
 };
 speech.onresult=e=>{
   let interim='';
   for(let i=e.resultIndex;i<e.results.length;i++){
     if(e.results[i].isFinal)finalWords+=e.results[i][0].transcript+' ';
     else interim+=e.results[i][0].transcript;
   }
   if(interim)voiceStatus('🎙 Heard: '+interim,'listening');
   if(finalWords.trim()){
     $('chat-input').value='';
     const recognized=finalWords.trim();
     finalWords='';
     submitChat(recognized);
     voiceStatus('✅ Heard you! Preparing a response…','info');
   }
 };
 speech.onerror=e=>{
   speechStarting=false;
   const errors={
     'not-allowed':'Microphone permission was denied. Allow it in your browser site settings, then retry.',
     'service-not-allowed':'This browser or device does not allow its speech service. Try a supported browser or device keyboard dictation.',
     'no-speech':'No speech was detected. Try speaking closer to the microphone.',
     'audio-capture':'No working microphone was detected. Check device and browser permissions.',
     'language-not-supported':'Speech recognition is not available for the selected language in this browser.',
     'network':usingLocal
       ? 'The on-device speech engine could not start. Try switching off on-device mode or use keyboard dictation.'
       : 'Your browser speech-recognition service could not be reached. This does not mean the Oatly website is offline. Try again, use the on-device option if offered, or use your keyboard microphone.',
     'aborted':'Listening was stopped.'
   };
   voiceStatus('⚠️ '+(errors[e.error]||('Speech recognition error: '+e.error))+' Text chat is still available.','warn');
   finishListening();
 };
 speech.onend=()=>{
   speechStarting=false;
   finishListening();
   if($('voice-status').dataset.kind==='listening')voiceStatus('🎙 Listening ended. Tap the microphone to try again.','info');
 };
 try{
   if('speechSynthesis' in window)window.speechSynthesis.cancel();
   speech.start();
   voiceStatus('🎙 Starting '+(usingLocal?'on-device ':'')+'speech recognition…','listening');
 }catch(_){
   speechStarting=false;
   finishListening();
   voiceStatus('⚠️ Could not start speech recognition. Check browser support and microphone permissions, or type below.','warn');
 }
});
$('speak-replies').addEventListener('change',e=>{if(!e.target.checked&&'speechSynthesis' in window)window.speechSynthesis.cancel();voiceStatus(e.target.checked?'🔊 Replies can be spoken after you use the microphone.':'🔇 Spoken replies turned off.')});

// Image errors are handled without inline JavaScript event attributes.
document.addEventListener('error', event => {
 const el=event.target;
 if (!(el instanceof HTMLImageElement)) return;
 el.classList.add('is-hidden');
 if(el.classList.contains('product-photo') && el.nextElementSibling?.classList.contains('photo-fallback')) {
  el.nextElementSibling.classList.add('is-visible');
 }
}, true);
// Stop microphone recording if the user leaves the tab.
document.addEventListener('visibilitychange',()=>{
 if(document.hidden && listening && speechRecognizer){speechRecognizer.abort();finishListening();}
});
$('clear-chat').addEventListener('click',()=>{
 if(listening && speechRecognizer)speechRecognizer.abort();
 finishListening();
 if('speechSynthesis' in window)window.speechSynthesis.cancel();
 voiceAsked=false;$('messages').replaceChildren();
 const msg=document.createElement('div');msg.className='msg bot';
 msg.textContent='Conversation cleared from this page. What would you like to explore?';
 $('messages').appendChild(msg);$('chat-input').value='';
 voiceStatus('Conversation cleared. Messages are not saved on this website.');
});
render();
