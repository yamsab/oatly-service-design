'use strict';
/* Concise, bilingual product answers. Works locally without an external chat API. */
(function(){
  const byId=id=>products.find(p=>p.id===id);
  const sw=()=>window.OatlyLanguage?.getLanguage?.()==='sv';
  const tr=(en,sv)=>sw()?sv:en;
  const number=n=>typeof n==='number'?new Intl.NumberFormat(sw()?'sv-SE':'en-US',{maximumFractionDigits:2}).format(n):'–';
  let lastProduct=null;
  // The current product is remembered for natural follow-up questions.
  function named(text){
    const s=text.toLocaleLowerCase();
    const names=products.flatMap(p=>[{p,match:p.name.toLocaleLowerCase()},{p,match:p.short.toLocaleLowerCase()}])
      .filter(x=>x.match.length>5 && !['organic','chocolate','vanilla','fiber low-calorie'].includes(x.match)).sort((a,b)=>b.match.length-a.match.length);
    const found=names.find(x=>s.includes(x.match));
    if(found)return found.p;
    const aliases=[['ikaffe light','light'],['i kaffe light','light'],['no sugars','nosugar'],
      ['fiber low-calorie','fiber'],['fiber low calorie','fiber'],['i kaffe','ikaffe'],
      ['ikaffe','ikaffe'],['choklad','choc'],['chocolate','choc'],['vanilla','vanilla']];
    const a=aliases.find(x=>s.includes(x[0]) && !(x[0]==='no sugars' && /(?:^|\s)(?:do you have|which|show me|find|finns det|vilka|visa)/.test(s)));
    return a?byId(a[1]):null;
  }
  function parse(question){
    const s=question.toLocaleLowerCase();
    return {
      zero:/\b(no sugars?|zero sugars?|without sugar|sugar.free|0 ?g sugar)\b|sockerfri|sockerfritt|utan socker/.test(s),
      sugar:/\b(sugars?|sweet)\b|socker|söt/.test(s),
      fat:/\b(fat|fats)\b|fett|fetthalt/.test(s),
      climate:/climate|carbon|footprint|co2|co₂|emission|klimat|utsläpp|miljöpåverkan/.test(s),
      organic:/organic|ekologisk|ekologiskt/.test(s),
      coffee:/coffee|kaffe|barista|latte/.test(s),
      cooking:/cooking|cook|matlagning|laga mat/.test(s),
      baking:/baking|bake|bakning|baka/.test(s),
      shop:/where to buy|buy|shop|store|retailer|stock|hemköp|hemkop|coop|ica|willys|köpa|butik|återförsälj|lagerstatus/.test(s),
      selected:/\b(selected|compared|chosen|these|those|my comparison)\b|mina valda|jämförda|de här|dessa/.test(s),
      choose:/\b(best|better|which|recommend|lowest|least|lower|compare|comparison|difference|versus|vs)\b|bäst|bättre|rekommend|vilken|vilket|minst|lägst|jämför|skillnad/.test(s),
      ingredient:/ingredient|made of|made from|contain|ingredien|innehåll|består av/.test(s),
      hello:/^(hi|hello|hey|hej|hallå|tjena)[!. ]*$/i.test(s.trim()),
      thank:/^(thanks|thank you|tack|tack så mycket)[!. ]*$/i.test(s.trim())
    };
  }
  function rankValue(p,q){
    let v=0;
    if(q.zero)v+=p.sugar===0?30:-40;
    else if(q.sugar)v+=10+(7-p.sugar)*2;
    if(q.fat)v+=10+(3.5-p.fat)*5+(p.fat<=1.5?8:0);
    if(q.climate)v+=p.climate===null?-20:12+(0.55-p.climate)*25;
    if(q.organic)v+=p.organic?15:-25;
    if(q.coffee)v+=p.purposes.includes('coffee')?10:-15;
    if(q.cooking)v+=p.purposes.includes('cooking')?10:-15;
    if(q.baking)v+=p.purposes.includes('baking')?10:-15;
    return v;
  }
  function guide(question){
    const q=parse(question);
    if(q.hello)return tr('Hi! What can I help you find?','Hej! Vad vill du hitta?');
    if(q.thank)return tr("You're welcome!",'Varsågod!');
    const mentioned=named(question);
    const pronoun=/\b(it|this|that|one|its)\b|den här|denna produkt|den\b|har det\b|innehåller det\b/.test(question.toLowerCase());
    const contextFollowup=/^(how much|hur mycket|sugar\?|fat\?|socker\?|fett\?)/i.test(question.trim());
    const p=mentioned||((pronoun||contextFollowup)?(byId(lastProduct)||(selected.length===1?byId(selected[0]):null)):null);
    if(q.shop)return tr('You can look on ICA, Coop, Hemköp or Willys through Where to Buy. Stock is not verified.','Du kan söka hos ICA, Coop, Hemköp eller Willys via Var du kan köpa. Lagerstatus är inte bekräftad.');
    if(q.ingredient&&p&&!q.sugar&&!q.zero&&!q.fat&&!q.climate){lastProduct=p.id;return tr(p.name+' lists: '+p.ingredients+' Check the full label for current details.',
      'Ingredienser för '+p.name+': '+p.ingredients+' Kontrollera hela listan på förpackningen.');}
    if(p&&!q.choose){
      lastProduct=p.id;
      if(q.sugar||q.zero)return tr(p.name+' contains '+number(p.sugar)+' g sugars per 100 ml.',
        p.name+' innehåller '+number(p.sugar)+' g sockerarter per 100 ml.');
      if(q.fat)return tr(p.name+' has '+number(p.fat)+' g fat per 100 ml.',
        p.name+' innehåller '+number(p.fat)+' g fett per 100 ml.');
      if(q.climate)return p.climate===null?tr('I have no reported climate figure for '+p.name+'.',
        'Jag har inget redovisat klimatvärde för '+p.name+'.'):
        tr(p.name+' reports '+number(p.climate)+' kg CO₂e per kg of product.',
        p.name+' har ett redovisat klimatavtryck på '+number(p.climate)+' kg CO₂e per kg produkt.');
      if(q.organic)return p.organic?tr('Yes, '+p.name+' is organic.','Ja, '+p.name+' är ekologisk.'):
        tr('No, '+p.name+" isn't labelled organic.",'Nej, '+p.name+' är inte märkt som ekologisk.');
      return tr(p.name+' has '+number(p.sugar)+' g sugars and '+number(p.fat)+' g fat per 100 ml.',
        p.name+' har '+number(p.sugar)+' g sockerarter och '+number(p.fat)+' g fett per 100 ml.');
    }
    const pool=q.selected?selected.map(byId).filter(Boolean):products.slice();
    const choices=pool.length?pool:products.slice();
    if(q.zero && !q.choose&&!q.fat&&!q.climate&&!q.organic&&!q.coffee&&!q.cooking&&!q.baking){
      const zero=choices.filter(x=>x.sugar===0);
      if(zero.length===1){lastProduct=zero[0].id;return tr(zero[0].name+' has 0 g sugars per 100 ml.',
          zero[0].name+' har 0 g sockerarter per 100 ml.');}
      if(zero.length>1)return tr(zero.map(x=>x.short).join(' and ')+' both have 0 g sugars per 100 ml.',
        zero.map(x=>x.short).join(' och ')+' har båda 0 g sockerarter per 100 ml.');
    }
    if(q.organic&&!q.choose&&!q.zero&&!q.sugar&&!q.fat&&!q.climate&&!q.coffee&&!q.cooking&&!q.baking){
      const matches=choices.filter(p=>p.organic);
      if(matches.length)return tr(matches.map(p=>p.name).join(' and ')+' are organic.',
        matches.map(p=>p.name).join(' och ')+' är ekologiska.');
    }
    const listing=/(which products|what products|what options|do you have|show me|list|any products|anything with|are there|finns det|vilka produkter|visa|har ni|vilka alternativ)/i.test(question);
    if(listing && q.zero && !q.fat && !q.climate && !q.organic && !q.coffee && !q.cooking && !q.baking) {
      const zero=choices.filter(p=>p.sugar===0);
      if(zero.length)return tr(zero.map(p=>p.short).join(' and ')+' both have 0 g sugars per 100 ml.',
        zero.map(p=>p.short).join(' och ')+' har båda 0 g sockerarter per 100 ml.');
    }
    if(listing && q.organic && !q.zero && !q.sugar && !q.fat && !q.climate && !q.coffee && !q.cooking && !q.baking) {
      const organic=choices.filter(p=>p.organic);
      if(organic.length)return tr(organic.map(p=>p.name).join(' and ')+' are organic.',
        organic.map(p=>p.name).join(' och ')+' är ekologiska.');
    }
    const criteria=q.zero||q.sugar||q.fat||q.climate||q.organic||q.coffee||q.cooking||q.baking;
    if(criteria){
      // Explicit requirements always outrank softer preferences; unknown climate is not zero.
      let eligible=choices.filter(p=>(!q.zero||p.sugar===0)&&(!q.organic||p.organic));
      if(!eligible.length)return tr('None of these products meets all those requirements.','Ingen av de här produkterna uppfyller alla de önskemålen.');
      eligible.sort((a,b)=>rankValue(b,q)-rankValue(a,q)||a.sugar-b.sugar);
      const sorted=eligible;
      const best=sorted[0];
      lastProduct=best.id;
      const nutrients=[];
      if(q.sugar||q.zero)nutrients.push(number(best.sugar)+tr(' g sugars',' g sockerarter'));
      if(q.fat)nutrients.push(number(best.fat)+tr(' g fat',' g fett'));
      const sentences=[tr("I'd go with "+best.name+'.','Jag skulle välja '+best.name+'.')];
      if(nutrients.length)sentences.push(tr('It has ','Den innehåller ')+nutrients.join(tr(' and ',' och '))+' per 100 ml.');
      if(q.climate)sentences.push(best.climate===null?
        tr('I do not have a reported climate figure for it.','Jag har inget redovisat klimatvärde för den.'):
        tr('Its reported climate footprint is ','Det redovisade klimatavtrycket är ')+number(best.climate)+' kg CO₂e/kg.');
      if(q.organic)sentences.push(best.organic?tr('It is organic.','Den är ekologisk.'):
        tr('It is not labelled organic.','Den är inte märkt som ekologisk.'));
      if(q.coffee)sentences.push(tr('It is suitable for coffee.','Den passar till kaffe.'));
      if(q.climate && q.zero && eligible.some(p=>p.sugar===0 && p.climate===null))
        sentences.push(tr('Another zero-sugar option has no reported climate figure.','Ett annat sockerfritt alternativ saknar redovisat klimatvärde.'));
      return sentences.join(' ');
    }
    if(q.choose){
      const sugar=choices.slice().sort((a,b)=>a.sugar-b.sugar)[0];
      const fat=choices.slice().sort((a,b)=>a.fat-b.fat)[0];
      return tr('For sugar, '+sugar.short+' is lowest ('+number(sugar.sugar)+' g); for fat, '+fat.short+' is lowest ('+number(fat.fat)+' g), per 100 ml. Which matters more?',
        'För socker är '+sugar.short+' lägst ('+number(sugar.sugar)+' g); för fett är '+fat.short+' lägst ('+number(fat.fat)+' g) per 100 ml. Vad är viktigast?');
    }
    return tr('Are you looking for low sugar, less fat, a coffee drink, or something else?',
      'Söker du mindre socker, lägre fett, något till kaffe eller något annat?');
  }
  // Answer only what was asked. The page does not contact a chatbot API.
  respond=function(input){
    const question=String(input||'').trim().slice(0,400);
    if(question)addMessage(guide(question),'bot');
  };
  showDetails=function(id){
    const p=byId(id);if(!p)return;
    lastProduct=id;
    openChat();
    const prompt=tr('Tell me about '+p.name,'Berätta om '+p.name);
    addMessage(prompt,'user');
    addMessage(guide(prompt),'bot');
  };
  $('clear-chat')?.addEventListener('click',()=>{lastProduct=null;});
  function updateLabel(){
    const subtitle=document.querySelector('.chat-heading small');
    if(subtitle)subtitle.textContent=tr('Product guide · English / Svenska','Produktguide · svenska / engelska');
    document.querySelector('.ai-note')?.remove();
  }
  document.querySelectorAll('[data-site-language]').forEach(b=>b.addEventListener('click',()=>{lastProduct=null;queueMicrotask(updateLabel);}));
  updateLabel();
  window.OatlyChat={isAIConnected:()=>false,offlineAnswer:guide};
})();