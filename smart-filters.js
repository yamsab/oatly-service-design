'use strict';
/*
  Smarter Find Your Perfect Oatly filters.
  Grounded entirely in the existing 8-product catalogue: real counts for every
  filter option, honest empty results, and nearest real products with a one-click
  way to relax only conflicting choices. No invented products or data.
*/
(function () {
  const filterKeys=['sugar','fat','purpose','flavour'];
  const labels={
    en:{
      note:'Numbers show how many products match if you choose that option, keeping your other filters.',
      countSingle:'product',countPlural:'products',
      zero:'No exact match for these filters.',
      explanation:'These options are not available together. You can change a filter or explore the closest real Oatly products below.',
      change:'Change a filter to see more products.',
      closest:'Closest available products',
      mismatch:'Does not match',
      none:'All selected filters match',
      show:'Show this product',
      reset:'Reset all filters',
      whenZero:'No products match this option with your other current filters. You can still select it to change your choices.',
      sugar:'Sugar',fat:'Fat',purpose:'Use',flavour:'Flavour',organic:'Organic',
      selected:'Selected', any:'Any',
      sugarValues:{zero:'0 g',under:'≤ 3.5 g',above:'> 3.5 g'},
      fatValues:{low:'≤ 1.5 g',mid:'1.6–2.5 g',high:'> 2.5 g'},
      purposeValues:{coffee:'coffee',cooking:'cooking',baking:'baking',drinking:'drinking',smoothies:'smoothies'},
      flavourValues:{plain:'plain',vanilla:'vanilla',chocolate:'chocolate'},
      per100:'per 100 ml', gramsSugar:'g sugars',gramsFat:'g fat',matching:'matching products',
      adjusted:'Updated the filters to show this product.',
      countTitle:'matching products with other filters',
      noClimate:'climate value not reported'
    },
    sv:{
      note:'Siffrorna visar hur många produkter som matchar när du väljer alternativet och behåller övriga filter.',
      countSingle:'produkt',countPlural:'produkter',
      zero:'Ingen exakt träff för dessa filter.',
      explanation:'De här valen går inte att kombinera. Ändra ett filter eller titta på de närmaste Oatly-produkterna nedan.',
      change:'Ändra ett filter för att se fler produkter.',
      closest:'Närmaste tillgängliga produkter',
      mismatch:'Matchar inte',
      none:'Matchar alla valda filter',
      show:'Visa den här produkten',
      reset:'Återställ alla filter',
      whenZero:'Inga produkter matchar det här alternativet med dina andra filter. Du kan ändå välja det för att ändra dina val.',
      sugar:'Socker',fat:'Fett',purpose:'Användning',flavour:'Smak',organic:'Ekologisk',
      selected:'Vald',any:'Alla',
      sugarValues:{zero:'0 g',under:'≤ 3,5 g',above:'> 3,5 g'},
      fatValues:{low:'≤ 1,5 g',mid:'1,6–2,5 g',high:'> 2,5 g'},
      purposeValues:{coffee:'kaffe',cooking:'matlagning',baking:'bakning',drinking:'dryck',smoothies:'smoothies'},
      flavourValues:{plain:'naturell',vanilla:'vanilj',chocolate:'choklad'},
      per100:'per 100 ml', gramsSugar:'g sockerarter',gramsFat:'g fett',matching:'matchande produkter',
      adjusted:'Filtren har ändrats så att produkten visas.',
      countTitle:'matchande produkter med övriga filter',
      noClimate:'klimatvärde saknas'
    }
  };
  const locale=()=>window.OatlyLanguage?.getLanguage?.()==='sv'?'sv':'en';
  const t=()=>labels[locale()];
  const fmtNum=v=>new Intl.NumberFormat(locale()==='sv'?'sv-SE':'en-US',{maximumFractionDigits:2}).format(v);

  // This mirrors the actual catalogue predicate; the dynamic counts must never
  // claim a product matches if the main result grid would exclude it.
  function matches(p,criteria){
    const s=criteria.sugar, f=criteria.fat;
    return (s==='any'||(s==='zero'&&p.sugar===0)||(s==='under'&&p.sugar<=3.5)||(s==='above'&&p.sugar>3.5))
      &&(f==='any'||(f==='low'&&p.fat<=1.5)||(f==='mid'&&p.fat>1.5&&p.fat<=2.5)||(f==='high'&&p.fat>2.5))
      &&(criteria.purpose==='any'||p.purposes.includes(criteria.purpose))
      &&(criteria.flavour==='any'||p.flavour===criteria.flavour)
      &&(!criteria.organic||p.organic);
  }
  function projectedCount(key,value){
    const criteria={...prefs,[key]:value};
    return products.filter(p=>matches(p,criteria)).length;
  }
  function activeLabel(key){
    const value=prefs[key];
    if(key==='organic')return t().organic;
    return t()[key]+' '+(t()[key+'Values']?.[value]||value);
  }
  function failures(p){
    const errors=[];
    for(const key of filterKeys){
      if(prefs[key]!=='any'){
        const criteria={...prefs};
        for(const other of filterKeys)if(other!==key)criteria[other]='any';
        criteria.organic=key==='organic'?prefs.organic:false;
        if(!matches(p,criteria))errors.push(key);
      }
    }
    if(prefs.organic&&!p.organic)errors.push('organic');
    return errors;
  }
  function suggest(){
    // A lower number of conflicts matters more than an arbitrary numeric score.
    // An exact match is already handled by the normal product grid.
    return products.map(p=>({p,wrong:failures(p)}))
      .sort((a,b)=>a.wrong.length-b.wrong.length||
        (a.p.sugar-b.p.sugar)||(a.p.fat-b.p.fat)||a.p.name.localeCompare(b.p.name))
      .slice(0,3);
  }
  function optionCounts(){
    const text=t();
    for(const key of filterKeys){
      const group=document.getElementById(key);
      if(!group)continue;
      group.querySelectorAll('button[data-value]').forEach(button=>{
        const num=projectedCount(key,button.dataset.value);
        let number=button.querySelector('.filter-option-count');
        if(!number){
          number=document.createElement('span');
          number.className='filter-option-count';
          number.setAttribute('aria-hidden','true');
          button.appendChild(number);
        }
        number.textContent=String(num);
        const isActive=prefs[key]===button.dataset.value;
        button.classList.toggle('no-available-products',num===0);
        button.classList.toggle('with-available-products',num>0);
        button.setAttribute('title',num===0?text.whenZero:
          num+' '+(num===1?text.countSingle:text.countPlural));
        button.setAttribute('aria-label',button.dataset.value==='any'?
          text.any+', '+num+' '+(num===1?text.countSingle:text.countPlural):
          (text[key+'Values']?.[button.dataset.value]||button.dataset.value)+', '+num+' '+(num===1?text.countSingle:text.countPlural));
        // Keep 0-product options usable so a shopper can change or clear a filter.
        button.disabled=false;
        button.setAttribute('aria-pressed',String(isActive));
      });
    }
    const organic=document.getElementById('organic');
    if(organic){
      const count=products.filter(p=>matches(p,{...prefs,organic:true})).length;
      let tag=document.getElementById('organic-option-count');
      if(!tag){
        tag=document.createElement('span');tag.id='organic-option-count';
        tag.className='organic-option-count';
        tag.setAttribute('aria-hidden','true');
        organic.parentElement?.appendChild(tag);
      }
      tag.textContent=String(count);
      organic.parentElement?.classList.toggle('no-available-products',count===0);
      organic.setAttribute('aria-label',text.organic+', '+count+' '+(count===1?text.countSingle:text.countPlural));
    }
    const note=document.getElementById('filter-count-help');
    if(note)note.textContent=text.note;
  }
  function element(tag,className,text){
    const node=document.createElement(tag);
    if(className)node.className=className;
    if(text!=null)node.textContent=text;
    return node;
  }
  function createEmptyResult(){
    const container=$('cards');
    const noExact=container.querySelector('.empty');
    if(!noExact)return;
    noExact.replaceChildren();
    const copy=t();
    noExact.appendChild(element('h3','smart-empty-title',copy.zero));
    noExact.appendChild(element('p','smart-empty-text',copy.explanation));
    const clear=element('button','btn outline smart-clear',copy.reset);
    clear.type='button';
    clear.addEventListener('click',reset);
    noExact.appendChild(clear);
    noExact.appendChild(element('h4','smart-nearest-title',copy.closest));
    const suggestions=element('div','smart-suggestions');
    for(const {p,wrong} of suggest()){
      const card=element('article','smart-suggestion');
      const imageWrapper=element('div','smart-suggestion-image');
      const img=document.createElement('img');
      img.src=p.photo;img.alt=p.name;img.loading='lazy';img.referrerPolicy='no-referrer';
      img.addEventListener('error',()=>{img.hidden=true;imageWrapper.textContent='OATLY';});
      imageWrapper.appendChild(img);
      const details=element('div','smart-suggestion-info');
      details.appendChild(element('h5','',p.name));
      details.appendChild(element('p','smart-product-metrics',
        fmtNum(p.sugar)+' '+copy.gramsSugar+' · '+fmtNum(p.fat)+' '+copy.gramsFat+' '+copy.per100));
      details.appendChild(element('p','smart-product-mismatch',
        wrong.length?copy.mismatch+': '+wrong.map(activeLabel).join(' · '):copy.none));
      const button=element('button','smart-show-product',copy.show);
      button.type='button';
      button.setAttribute('aria-label',copy.show+': '+p.name);
      button.addEventListener('click',()=>{
        for(const key of wrong){
          if(key==='organic')prefs.organic=false;
          else prefs[key]='any';
        }
        render();
        document.querySelector('.catalog-tools')?.scrollIntoView({behavior:'smooth',block:'start'});
        notify(copy.adjusted);
      });
      details.appendChild(button);
      card.append(imageWrapper,details);
      suggestions.appendChild(card);
    }
    noExact.appendChild(suggestions);
  }
  const originalRender=render;
  render=function(){
    originalRender();
    optionCounts();
    if(filtered().length===0)createEmptyResult();
  };
  // Insert a compact, truthful explanation just above the filters.
  const intro=document.querySelector('.sidebar .filters-intro');
  if(intro && !document.getElementById('filter-count-help')){
    const p=element('p','filter-count-help');
    p.id='filter-count-help';
    intro.insertAdjacentElement('afterend',p);
  }
  // The language switch updates the site before this queued refresh runs.
  document.querySelectorAll('[data-site-language]').forEach(button=>{
    button.addEventListener('click',()=>queueMicrotask(()=>render()));
  });
  render();
  window.OatlySmartFilters={matches,projectedCount,failures,suggest};
})();