'use strict';
/* Independent student prototype: comparison guidance and retailer hand-off.
   Runs after app.js, reusing its existing product catalogue and filters. */
(function () {
  const MAX_COMPARE = 5;
  const retailerList = [
    {name:'ICA', website:'https://www.ica.se/', stores:'https://www.ica.se/butiker/'},
    {name:'Coop', website:'https://www.coop.se/', stores:'https://www.coop.se/butiker-erbjudanden/'},
    {name:'Hemköp', website:'https://www.hemkop.se/', stores:'https://www.hemkop.se/butik-sok'},
    {name:'Willys', website:'https://www.willys.se/', stores:'https://www.willys.se/butik-sok'}
  ];
  let retailerProduct = selected[0] || products[0].id;
  let enteredArea = '';
  let coordinates = null;
  let previousAdvice = null;
  const previousRender = render;
  const previousTable = renderTable;
  const previousRespond = respond;

  function formatClimate(p) {
    return p.climate == null ? 'Not reported in this demo' : fmt(p.climate) + ' kg CO₂e/kg';
  }
  function findProduct(id) { return products.find(function (p) { return p.id === id; }); }
  function scrollTo(id) { $(id).scrollIntoView({behavior:'smooth',block:'start'}); }
  function linkToMaps(name) {
    const place = coordinates ? (coordinates.latitude.toFixed(5) + ',' + coordinates.longitude.toFixed(5)) : enteredArea;
    return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(name + ' near ' + place);
  }
  function renderRetailerCards() {
    const p = findProduct(retailerProduct) || products[0];
    const areaText = coordinates ? 'your shared coordinates' : enteredArea;
    $('buy-context').textContent = 'Looking for ' + p.name + (areaText ? ' near ' + areaText : '') + '. These are retailer/store-search links only, not verified product listings.';
    const wrap = $('retailer-cards');
    wrap.replaceChildren();
    retailerList.forEach(function (retailer) {
      const card = document.createElement('article');
      card.className = 'retailer-card';
      const name = document.createElement('h3');
      name.textContent = retailer.name;
      const note = document.createElement('p');
      note.textContent = 'Product range and stock are not checked. Confirm ' + p.short + ' directly with the retailer.';
      const general = document.createElement('a');
      general.href = retailer.website; general.target = '_blank'; general.rel = 'noopener noreferrer';
      general.textContent = 'Retailer website ↗';
      const stores = document.createElement('a');
      stores.href = retailer.stores; stores.target = '_blank'; stores.rel = 'noopener noreferrer';
      stores.textContent = 'Official store finder ↗';
      card.append(name, note, general, stores);
      if (areaText) {
        const map = document.createElement('a');
        map.href = linkToMaps(retailer.name);
        map.target = '_blank'; map.rel = 'noopener noreferrer';
        map.textContent = 'Search around ' + areaText + ' (Maps) ↗';
        card.append(map);
      }
      wrap.appendChild(card);
    });
  }
  const buyPanel = document.createElement('section');
  buyPanel.className = 'buy-panel';
  buyPanel.id = 'where-to-buy';
  buyPanel.setAttribute('aria-labelledby','buy-heading');
  buyPanel.innerHTML =
    '<div class="buy-heading"><div><span class="eyebrow">OPTIONAL NEXT STEP</span><h2 id="buy-heading">Where to Buy ↗</h2><p>Found your oat drink? Explore retailer websites and store finders. Purchases happen on the retailer site.</p></div></div>' +
    '<div class="buy-controls"><label>Oatly product <select id="buy-product"></select></label><label>City or postcode (optional) <input id="buy-location" maxlength="80" autocomplete="off" placeholder="e.g. Göteborg or 411 03" /></label><button type="button" class="btn" id="buy-search">Find retailers →</button><button type="button" class="btn outline" id="buy-geolocate">Use my location</button></div>' +
    '<p class="buy-context" id="buy-context" aria-live="polite"></p><div class="retailer-cards" id="retailer-cards"></div>' +
    '<p class="buy-disclaimer">Illustrative retailer links, not confirmed listings for this product. No live inventory, prices, delivery or checkout are provided. A typed area stays in this page until you open a map link; sharing GPS requires your browser permission, and opening Maps sends the search/location to Google. Always verify product availability with the store.</p>';
  $('comparison').insertAdjacentElement('afterend',buyPanel);
  const productMenu = $('buy-product');
  products.forEach(function (p) {
    const opt = document.createElement('option');
    opt.value = p.id; opt.textContent = p.name;
    productMenu.appendChild(opt);
  });
  productMenu.value = retailerProduct;
  productMenu.addEventListener('change',function () { retailerProduct = this.value; renderRetailerCards(); });
  $('buy-search').addEventListener('click',function () {
    enteredArea = $('buy-location').value.trim().slice(0,80);
    coordinates = null;
    renderRetailerCards();
    if (enteredArea) notify('Choose a retailer map search to explore stores near your area.');
    else notify('Retailer sites and official store finders are ready.');
  });
  $('buy-geolocate').addEventListener('click',function () {
    if (!navigator.geolocation) { notify('Location is not supported here. Enter a city or postcode instead.'); return; }
    $('buy-geolocate').disabled = true;
    navigator.geolocation.getCurrentPosition(function (position) {
      coordinates = {latitude:position.coords.latitude,longitude:position.coords.longitude};
      enteredArea = '';
      $('buy-location').value = '';
      $('buy-geolocate').disabled = false;
      renderRetailerCards();
      notify('Location is ready locally. Open a map link to search for nearby shops.');
    },function () {
      $('buy-geolocate').disabled = false;
      notify('Location was unavailable or denied. Enter a city or postcode instead.');
    },{enableHighAccuracy:false,timeout:10000,maximumAge:300000});
  });
  function showBuy(id) {
    if (id && findProduct(id)) retailerProduct = id;
    productMenu.value = retailerProduct;
    renderRetailerCards();
    scrollTo('where-to-buy');
  }
  renderRetailerCards();

  const compareActions = document.createElement('div');
  compareActions.className = 'comparison-guidance';
  compareActions.innerHTML = '<strong>Want help choosing?</strong><p>Ask Oatly to explain differences or select what matters most. You can also ask directly in your own words.</p>' +
    '<button type="button" data-advice="Among my compared products, which has the lowest sugar?">Lowest sugar</button>' +
    '<button type="button" data-advice="Among my compared products, which has the lowest fat?">Lowest fat</button>' +
    '<button type="button" data-advice="Among my compared products, which has the lowest reported climate impact?">Lower climate figure</button>' +
    '<button type="button" data-advice="Compare my selected products and explain the trade-offs">Explain my comparison ✧</button>';
  $('table-holder').insertAdjacentElement('afterend',compareActions);
  compareActions.querySelectorAll('[data-advice]').forEach(function (b) {
    b.addEventListener('click',function () { submitChat(b.dataset.advice); });
  });
  const buyQuick = document.createElement('button');
  buyQuick.type = 'button'; buyQuick.className = 'btn pale';
  buyQuick.textContent = 'Where to Buy →';
  buyQuick.addEventListener('click',function () {
    showBuy(selected[0] || retailerProduct);
  });
  $('comparison').appendChild(buyQuick);
  const compareIntro = $('comparison').querySelector('.compare-head p');
  if (compareIntro) compareIntro.textContent = 'Choose up to five products from our eight-product sample, then compare their details side by side.';

  // Keep the existing product-card interactions and add a retailer hand-off.
  render = function () {
    previousRender();
    document.querySelectorAll('.product').forEach(function (card) {
      const check = card.querySelector('.compare-checkbox');
      const bottom = card.querySelector('.product-bottom');
      if (!check || !bottom) return;
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'where-product-button';
      button.textContent = 'Where to Buy ↗';
      button.addEventListener('click',function () { showBuy(check.dataset.id); });
      bottom.appendChild(button);
    });
  };
  toggleCompare = function (id,checked) {
    if (!findProduct(id)) return;
    if (checked && !selected.includes(id)) {
      if (selected.length >= MAX_COMPARE) {
        notify('Choose up to five products. Remove one to add another.');
        render(); return;
      }
      selected.push(id);
    } else if (!checked) {
      selected = selected.filter(function (x) { return x !== id; });
    }
    render();
  };
  renderTable = function () {
    previousTable();
    if (!selected.length) {
      compareActions.hidden = true;
      return;
    }
    compareActions.hidden = false;
    const tbody = $('table-holder').querySelector('tbody');
    if (!tbody) return;
    const row = document.createElement('tr');
    const head = document.createElement('td');head.textContent = 'Flavour';row.appendChild(head);
    selected.forEach(function (id) {
      const p = findProduct(id);
      const td = document.createElement('td');
      td.textContent = p ? p.flavour : '—';
      row.appendChild(td);
    });
    tbody.appendChild(row);
    $('table-holder').setAttribute('tabindex','0');
    $('table-holder').setAttribute('aria-label','Product comparison table. Scroll horizontally for more products.');
  };

  function parsePreferences(input) {
    const s = input.toLowerCase();
    return {
      zero: /\b(zero sugars?|no sugars?|sugar.free|without sugar|0 ?g (of )?sugar|sockerfri|utan socker|inget socker)\b/.test(s),
      sugar: /\b(low(?:er)? sugar|less sugar|lowest sugar|sockerfattig|lite socker)\b/.test(s),
      fat: /\b(low(?:er|est)? fat|less fat|low.fat|lite fett|låg fetthalt|mindre fett)\b/.test(s),
      climate: /\b(climate|carbon|co2|co₂|footprint|emission|klimat|utsläpp)\b/.test(s),
      organic: /\b(organic|ekologisk|ekologiskt)\b/.test(s),
      purpose: /\b(coffee|kaffe|latte|barista)\b/.test(s) ? 'coffee' : /\b(baking|bake|baka|bakning)\b/.test(s) ? 'baking' : /\b(cooking|cook|laga mat|matlagning)\b/.test(s) ? 'cooking' : /\b(smoothie)\b/.test(s) ? 'smoothies' : null,
      flavour: /\b(vanilla|vanilj)\b/.test(s) ? 'vanilla' : /\b(chocolate|choklad)\b/.test(s) ? 'chocolate' : null
    };
  }
  function hasPreference(q) { return q.zero || q.sugar || q.fat || q.climate || q.organic || q.purpose || q.flavour; }
  function evaluate(p,q) {
    let score = 0; const yes = [], no = [], unknown = [];
    if (q.zero) { if (p.sugar === 0) {score += 12;yes.push('0 g sugars');} else {score -= 12;no.push(fmt(p.sugar) + ' g sugars, not sugar-free');} }
    else if (q.sugar) {if (p.sugar <= 3.5) {score += 8;yes.push(fmt(p.sugar) + ' g sugars');} else {score -= 8;no.push(fmt(p.sugar) + ' g sugars');}}
    if (q.fat) {if (p.fat <= 1.5) {score += 10;yes.push(fmt(p.fat) + ' g fat');} else {score -= 10;no.push(fmt(p.fat) + ' g fat');}}
    if (q.organic) {if (p.organic) {score += 10;yes.push('organic');} else {score -= 10;no.push('not labelled organic');}}
    if (q.purpose) {if (p.purposes.includes(q.purpose)) {score += 6;yes.push('listed for ' + q.purpose);} else {score -= 6;no.push('not listed for ' + q.purpose);}}
    if (q.flavour) {if (p.flavour === q.flavour) {score += 8;yes.push(q.flavour + ' flavour');} else {score -= 8;no.push('different flavour');}}
    if (q.climate) {
      if (p.climate == null) {score -= 5;unknown.push('climate figure unavailable');}
      else {score += 4 + Math.max(0, .6 - p.climate) * 12;yes.push('reported climate ' + formatClimate(p));}
    }
    return {product:p,score:score,yes:yes,no:no,unknown:unknown};
  }
  function comparisonSummary(pool) {
    const by = function (key) {return pool.slice().sort(function (a,b) {return a[key]-b[key];})[0];};
    const sugar = by('sugar'), fat = by('fat');
    const known = pool.filter(function (p) {return typeof p.climate === 'number';});
    const climate = known.sort(function (a,b) {return a.climate-b.climate;})[0];
    return 'No single product is automatically best for everyone. Among these choices, lowest sugars: ' +
      sugar.short + ' (' + fmt(sugar.sugar) + ' g/100 ml); lowest fat: ' + fat.short + ' (' + fmt(fat.fat) + ' g/100 ml). ' +
      (climate ? 'Lowest reported climate figure: ' + climate.short + ' (' + formatClimate(climate) + '). ' : 'No comparable climate figures are available for these choices. ') +
      'Climate figures describe greenhouse-gas emissions, not overall sustainability. Tell me what matters most to you.';
  }
  function presentAdvice(q,selectedOnly) {
    const pool = selectedOnly ? selected.map(findProduct).filter(Boolean) : products.slice();
    if (!pool.length) { addMessage('Select products to compare first, or tell me your preferences directly. No form is required.', 'bot'); return; }
    if (!hasPreference(q)) {
      addMessage(comparisonSummary(pool), 'bot');
      actions([['Compare zero sugar',function () {submitChat('Among my compared products, which is best for zero sugar?');}],
               ['Compare low fat',function () {submitChat('Among my compared products, which has lower fat?');}],
               ['Compare climate',function () {submitChat('Among my compared products, which has the lowest climate footprint?');}]]);
      return;
    }
    const ranked = pool.map(function (p) {return evaluate(p,q);}).sort(function (a,b) {return b.score-a.score;});
    const top = ranked.slice(0,Math.min(3,ranked.length));
    previousAdvice = {top:top,q:q};
    const strict = top.filter(function (entry) {return entry.no.length === 0;});
    const preface = strict.length
      ? 'These are the closest matches in the ' + (selectedOnly ? 'products you selected' : 'eight-product demo') + '.'
      : 'None of these products meets every stated condition. These are the nearest alternatives, with trade-offs.';
    const lines = top.map(function (r,i) {
      return (i+1) + '. ' + r.product.name + ': ' +
       (r.yes.length ? 'fits ' + r.yes.join(', ') : 'no confirmed requested match') +
       (r.no.length ? '; trade-off: ' + r.no.join(', ') : '') +
       (r.unknown.length ? '; unknown: ' + r.unknown.join(', ') : '') + '.';
    });
    const footer = q.climate
      ? 'Climate figures are compared only where reported. There is no universal “low climate impact” threshold here; a smaller reported footprint is not an overall sustainability score.'
      : 'Values are from the product sample. Please check the official Oatly label before buying.';
    addMessage(preface + '\n\n' + lines.join('\n') + '\n\n' + footer, 'bot');
    actions([
      ['Compare these options',function () {
        selected = top.map(function (r) {return r.product.id;});
        render(); closeChat(); scrollTo('comparison');
      }],
      ['Where to Buy',function () {showBuy(top[0].product.id);}],
      ['Show me these products',function () {
        const first = top[0].product;
        const newPrefs = {sugar:'any',fat:'any',purpose:'any',flavour:'any',organic:false,climate:false};
        if (q.zero) newPrefs.sugar = 'zero';
        else if (q.sugar) newPrefs.sugar = 'under';
        if (q.fat) newPrefs.fat = 'low';
        if (q.organic) newPrefs.organic = true;
        if (q.purpose) newPrefs.purpose = q.purpose;
        if (q.flavour) newPrefs.flavour = q.flavour;
        if (q.climate) newPrefs.climate = true;
        Object.assign(prefs,newPrefs);
        render();closeChat();scrollTo('products');
      }]
    ]);
  }
  respond = function (input) {
    const s = input.trim().toLowerCase();
    const shopping = /\b(where to buy|where can i buy|where can i find|near me|retailer|supermarket|shop|shopping|stock|in stock|hemköp|hemkop|willys|ica|coop|butik|affär|köpa|handla)\b/.test(s);
    if (shopping) {
      addMessage('I can take you to retailer websites or official store finders, but this prototype cannot confirm stock, prices, or whether a particular store carries your Oatly choice. Choose a product and optionally enter a city or postcode.', 'bot');
      actions([['Open Where to Buy',function () {showBuy(selected[0] || retailerProduct);}]]);
      return;
    }
    const q = parsePreferences(s);
    const selectedOnly = /\b(my compared|selected products|these products|those products|among my|in my comparison|my comparison|products i compared|these choices)\b/.test(s);
    const comparison = /\b(compare|comparison|which|best|better|recommend|lowest|difference|trade.off|explain)\b/.test(s);
    if (/\b(why|explain why|how come)\b/.test(s) && !hasPreference(q) && previousAdvice) {
      const top = previousAdvice.top[0];
      addMessage(top.product.short + ' appeared first because of your previous priorities: ' +
        (top.yes.length ? top.yes.join(', ') : 'the compared product details') +
        (top.no.length ? '. It does not satisfy: ' + top.no.join(', ') : '') +
        (top.unknown.length ? '. Missing information: ' + top.unknown.join(', ') : '') +
        '. You can ask for a different priority at any time.', 'bot');
      return;
    }
    if (selectedOnly || (comparison && !hasPreference(q)) || hasPreference(q)) {
      presentAdvice(q,selectedOnly);
      return;
    }
    previousRespond(input);
  };
  // Add easy examples for people who want to ask without using filters.
  const quick = $('chat-box').querySelector('.quick');
  [['Zero sugar + low fat + climate','Find zero sugar, low fat and lower climate impact'],
   ['Explain my selected products','Compare my selected products and explain the trade-offs']].forEach(function (entry) {
    const b = document.createElement('button');
    b.type = 'button'; b.textContent = entry[0];
    b.addEventListener('click',function () {submitChat(entry[1]);});
    quick.appendChild(b);
  });
  render(); // Refresh existing cards and enhanced comparison when loaded.
})();
