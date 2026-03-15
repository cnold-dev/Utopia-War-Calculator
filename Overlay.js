window.addEventListener('load', function () {
 
  const adSlot = document.querySelector('.google_ads');
  if (adSlot) adSlot.style.display = 'none';
 
  const rightAd = document.querySelector('#skyscraper-ad');
  if (rightAd) rightAd.style.display = 'none';
 
  const contentArea = document.querySelector('#content-area');
  const resourceBar = document.querySelector('#resource-bar');
  const gameNav = document.querySelector('#game-navigation');
 
  // --- YELLOW BOX ---
  if (contentArea) {
    const yellowBox = document.createElement('div');
    yellowBox.id = 'yellow-helper-box';
    yellowBox.innerHTML = 'Hello World';
    contentArea.parentNode.insertBefore(yellowBox, contentArea);
  }
 
  // --- VERTICAL BOX using Shadow DOM ---
  const vertHost = document.createElement('div');
  vertHost.id = 'vertical-helper-host';
  document.body.appendChild(vertHost);
 
  const shadow = vertHost.attachShadow({ mode: 'open' });
 
  shadow.innerHTML = `
    <style>
      :host { all: initial; }
      #calc-box {
        position: absolute;
        width: 220px;
        overflow-x: hidden;
        overflow-y: visible;
        background-color: #0a0a1a;
        color: #00ff00;
        border: 2px solid #8B6914;
        padding: 8px;
        font-family: monospace;
        font-size: 12px;
        box-sizing: border-box;
        z-index: 999999;
      }
      .calc-title {
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: #8B6914;
        border-bottom: 1px solid #8B6914;
        padding-bottom: 4px;
        margin-bottom: 2px;
      }
      .section-divider { border-top: 2px solid #8B6914; margin: 20px 0 10px 0; }
      .calc-age { font-size: 10px; color: #5a5a3a; margin-bottom: 6px; font-style: italic; }
      .calc-label { font-size: 11px; color: #8B6914; text-transform: uppercase; letter-spacing: 1px; display: block; }
      .calc-sublabel { font-size: 10px; color: #5a7a5a; margin-bottom: 2px; display: block; font-style: italic; }
      .calc-section { margin-bottom: 6px; }
      .csv-status { font-size: 10px; color: #00ff00; margin-top: 2px; }
      input[type="file"] {
        display: block; width: 100%; margin-top: 4px; font-size: 11px; font-family: monospace;
        color: #00ff00; background: #0a0a1a; border: 1px solid #8B6914; padding: 2px;
        box-sizing: border-box; cursor: pointer;
      }
      input[type="text"] {
        display: block; width: 100%; margin-top: 4px; font-size: 11px; font-family: monospace;
        color: #00ff00; background: #0a0a1a; border: 1px solid #8B6914; padding: 2px;
        box-sizing: border-box;
      }
      select {
        display: block; width: 100%; margin-top: 4px; font-size: 11px; font-family: monospace;
        color: #00ff00; background: #0a0a1a; border: 1px solid #8B6914; padding: 2px;
        box-sizing: border-box; cursor: pointer; -webkit-appearance: none; appearance: none;
      }
      button {
        display: block; width: 100%; margin-top: 6px; font-size: 11px; font-family: monospace;
        color: #0a0a1a; background: #8B6914; border: none; padding: 4px;
        box-sizing: border-box; cursor: pointer;
      }
      button:hover { background: #c49a28; }
      .result-label { font-size: 11px; color: #8B6914; text-transform: uppercase; letter-spacing: 1px; margin-top: 6px; display: block; }
      .result-muted { color: #aaaaaa; font-size: 11px; }
      .divider { margin-top: 5px; border-top: 1px solid #2a2a1a; padding-top: 5px; }
      .dragon-gold { color: #f0c040; font-size: 11px; }
      .dragon-food { color: #40c040; font-size: 11px; }
      .dragon-hp   { color: #ff6060; font-size: 11px; }
      .dragon-row  { margin-top: 4px; }
 
      /* Pre-reserved space for results areas to prevent scrollbar on render */
      #intel-age      { min-height: 90px; }
      #calc-results   { min-height: 280px; }
      #dragon-results { min-height: 160px; }
      #slay-results   { min-height: 120px; }
    </style>
    <div id="calc-box">
 
      <!-- OVERPOP CALCULATOR -->
      <div class="calc-title">Overpop Calculator</div>
      <div class="calc-age">Age 114: The Age of Convergence</div>
      <div class="calc-section">
        <label class="calc-label">Enemy CSV:</label>
        <span class="calc-sublabel">Export "All" from enemy intel site</span>
        <input type="file" id="csv-upload" accept=".csv">
        <div id="csv-status" class="csv-status"></div>
      </div>
      <div class="calc-section">
        <label class="calc-label">Select Province:</label>
        <select id="province-select">
          <option value="">-- Load CSV first --</option>
        </select>
      </div>
      <div id="intel-age"></div>
      <div id="calc-results"></div>
 
      <!-- DRAGON CALCULATORS -->
      <div class="section-divider"></div>
      <div class="calc-title">Dragon Calculators</div>
      <div class="calc-section">
        <label class="calc-label">Own Kingdom CSV:</label>
        <span class="calc-sublabel">Export "All" from your own intel site</span>
        <input type="file" id="kd-csv-upload" accept=".csv">
        <div id="kd-csv-status" class="csv-status"></div>
      </div>
 
      <!-- DRAGON FUND -->
      <div style="margin-top:10px;">
        <div class="calc-title" style="border-bottom:1px solid #5a4a0a;">Dragon Fund</div>
        <div class="calc-section">
          <label class="calc-label">Dragon Type:</label>
          <select id="dragon-type">
            <option value="sapphire">Sapphire (2.0x)</option>
            <option value="topaz">Topaz (2.0x)</option>
            <option value="amethyst">Amethyst (2.4x)</option>
            <option value="ruby">Ruby (2.4x)</option>
            <option value="emerald">Emerald (3.0x)</option>
          </select>
        </div>
        <div class="calc-section">
          <label class="calc-label">Relations:</label>
          <select id="dragon-relations">
            <option value="0.5">None / Unfriendly (0.5x)</option>
            <option value="0.75">Hostile (0.75x)</option>
            <option value="1.0">War (1.0x)</option>
          </select>
        </div>
        <div class="calc-section">
          <label class="calc-label">Target KD Networth:</label>
          <input type="text" id="target-nw" placeholder="e.g. 6,000,000">
        </div>
        <button id="dragon-calc-btn">Calculate</button>
        <div id="dragon-results"></div>
      </div>
 
      <!-- DRAGON SLAY -->
      <div style="margin-top:16px;">
        <div class="calc-title" style="border-bottom:1px solid #5a4a0a;">Dragon Slay</div>
        <div class="calc-section">
          <label class="calc-label">Dragon HP Remaining:</label>
          <input type="text" id="slay-hp" placeholder="e.g. 400,000">
        </div>
        <button id="slay-calc-btn">Calculate</button>
        <div id="slay-results"></div>
      </div>
 
    </div>
  `;
 
  function q(id) { return shadow.getElementById(id); }
 
  // --- AGE 114 MODIFIERS ---
  const racePopMod = { 'Halfling': 1.10 };
  const personalityPopMod = { 'Paladin': 1.05 };
  const personalityHomeMod = { 'Artisan': 1.30 };
 
  // --- DRAGON TYPE DATA ---
  const dragonData = {
    sapphire: { costMod: 2.0, hpMod: 7.0125, label: 'Sapphire' },
    topaz:    { costMod: 2.0, hpMod: 7.0125, label: 'Topaz' },
    amethyst: { costMod: 2.4, hpMod: 8.415,  label: 'Amethyst' },
    ruby:     { costMod: 2.4, hpMod: 8.415,  label: 'Ruby' },
    emerald:  { costMod: 3.0, hpMod: 8.415,  label: 'Emerald' },
  };
 
  // --- TWO SEPARATE PROVINCE DATA ARRAYS ---
  let enemyProvinceData = [];  // Enemy CSV — Overpop Calculator
  let kdProvinceData = [];     // Own KD CSV — Dragon Calculators
 
  // --- INTEL AGE HELPERS (values in seconds) ---
  function formatSeconds(secs) {
    if (secs <= 0) return '0m';
    const mins = Math.ceil(secs / 60);
    if (mins < 60) return mins + 'm';
    const hours = Math.ceil(secs / 3600);
    if (hours < 24) return hours + 'h';
    const days = Math.floor(hours / 24);
    const remHours = hours % 24;
    return remHours > 0 ? days + 'd ' + remHours + 'h' : days + 'd';
  }
 
  function intelColor(secs) {
    if (secs <= 3600)  return '#00ff00';
    if (secs <= 14400) return '#ffff00';
    if (secs <= 28800) return '#ff8800';
    return '#ff4444';
  }
 
  // --- POSITIONING ---
  function positionAll() {
    const yellowBox = document.querySelector('#yellow-helper-box');
    if (resourceBar && contentArea && yellowBox) {
      yellowBox.style.width = resourceBar.offsetWidth + 'px';
      yellowBox.style.marginLeft = (resourceBar.offsetLeft + contentArea.offsetLeft) + 'px';
    }
    if (resourceBar && gameNav) {
      const barRect = resourceBar.getBoundingClientRect();
      const calcBox = q('calc-box');
      if (calcBox) {
        calcBox.style.left = (barRect.right + 3) + 'px';
        calcBox.style.top = (barRect.top + window.scrollY) + 'px';
        const gameContent = document.querySelector('.game-content');
        const heightEl = gameContent || gameNav;
        const heightRect = heightEl.getBoundingClientRect();
        const gameHeight = heightRect.bottom - barRect.top;
        const contentHeight = calcBox.scrollHeight;
        calcBox.style.height = Math.max(gameHeight, contentHeight) + 'px';
        calcBox.style.overflowY = 'visible';
      }
    }
  }
 
  setTimeout(positionAll, 1000);
  window.addEventListener('resize', positionAll);
  const observer = new MutationObserver(function() { positionAll(); });
  observer.observe(document.body, { childList: true, subtree: true, attributes: false });
 
  // --- CSV PARSING ---
  function parseNumber(val) {
    if (!val) return 0;
    return parseInt(val.toString().replace(/,/g, '').replace(/'/g, '').trim()) || 0;
  }
 
  function parseFloat2(val) {
    if (!val) return 0;
    return parseFloat(val.toString().replace(/,/g, '').replace(/'/g, '').trim()) || 0;
  }
 
  function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') { inQuotes = !inQuotes; }
      else if (ch === ',' && !inQuotes) { result.push(current.trim()); current = ''; }
      else { current += ch; }
    }
    result.push(current.trim());
    return result;
  }
 
  function parseCSVToProvinces(csvText) {
    const lines = csvText.split('\n').filter(l => l.trim());
    const headers = parseCSVLine(lines[0]);
    const col = {};
    headers.forEach((h, i) => { col[h.trim()] = i; });
 
    const data = [];
    for (let i = 1; i < lines.length; i++) {
      const fields = parseCSVLine(lines[i]);
      if (!fields[col['Name']]) continue;
      data.push({
        name:          fields[col['Name']],
        race:          (fields[col['Race']] || '').trim(),
        personality:   (fields[col['Personality']] || '').trim(),
        acres:         parseNumber(fields[col['Acres']]),
        nw:            parseNumber(fields[col['NW']]),
        homePct:       parseFloat2(fields[col['Home']]),
        peons:         parseNumber(fields[col['Peons']]),
        wiz:           parseNumber(fields[col['Wiz']]),
        thv:           parseNumber(fields[col['Thv']]),
        solds:         parseNumber(fields[col['Solds']]),
        os:            parseNumber(fields[col['OS']]),
        ds:            parseNumber(fields[col['DS']]),
        leets:         parseNumber(fields[col['Leets']]),
        osTrain:       parseNumber(fields[col['OS Train']]),
        dsTrain:       parseNumber(fields[col['DS Train']]),
        elTrain:       parseNumber(fields[col['Elite Train']]),
        thTrain:       parseNumber(fields[col['Thief Train']]),
        intelThrone:   parseNumber(fields[col['IntelAge']]),
        intelMilitary: parseNumber(fields[col['Som']]),
        intelSurvey:   parseNumber(fields[col['Sur']]),
        intelSciences: parseNumber(fields[col['Sos']]),
        housi:         parseFloat2(fields[col['Housi']]),
        honor:         parseNumber(fields[col['Honor']]),
      });
    }
    return data;
  }
 
  // --- UPDATE CSV STATUS ---
  function updateCSVStatus(statusId, loaded, count, filename) {
    const status = q(statusId);
    if (status) {
      if (loaded) {
        status.textContent = '✓ ' + filename + ' (' + count + ' provinces)';
        status.style.color = '#00ff00';
      } else {
        status.textContent = '';
      }
    }
  }
 
  // --- POPULATE ENEMY DROPDOWN ---
  function populateEnemyDropdown() {
    const select = q('province-select');
    if (!select) return;
    select.innerHTML = '<option value="">-- Select Province --</option>';
    enemyProvinceData.forEach((p, i) => {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = p.name;
      select.appendChild(opt);
    });
    const lastSelected = sessionStorage.getItem('utopia_enemy_selected');
    if (lastSelected !== null && enemyProvinceData.length > 0) {
      select.value = lastSelected;
      if (select.value === lastSelected) calculate(lastSelected);
    }
  }
 
  // --- LOAD ENEMY CSV ---
  q('csv-upload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    sessionStorage.setItem('utopia_enemy_csv_name', file.name);
    const reader = new FileReader();
    reader.onload = function(evt) {
      sessionStorage.setItem('utopia_enemy_csv', evt.target.result);
      enemyProvinceData = parseCSVToProvinces(evt.target.result);
      q('calc-results').innerHTML = '';
      q('intel-age').innerHTML = '';
      updateCSVStatus('csv-status', true, enemyProvinceData.length, file.name);
      populateEnemyDropdown();
    };
    reader.readAsText(file);
  });
 
  // --- LOAD OWN KD CSV ---
  q('kd-csv-upload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    sessionStorage.setItem('utopia_kd_csv_name', file.name);
    const reader = new FileReader();
    reader.onload = function(evt) {
      sessionStorage.setItem('utopia_kd_csv', evt.target.result);
      kdProvinceData = parseCSVToProvinces(evt.target.result);
      updateCSVStatus('kd-csv-status', true, kdProvinceData.length, file.name);
    };
    reader.readAsText(file);
  });
 
  q('province-select').addEventListener('change', function() {
    calculate(this.value);
  });
 
  // --- MISSING DATA WARNINGS ---
  function checkMissingData(p) {
    const warnings = [];
    if (p.peons === 0 && p.wiz === 0 && p.thv === 0)
      warnings.push({ op: 'Spy on Throne', fields: ['All throne data missing'] });
    if (p.solds === 0 && p.os === 0 && p.ds === 0 && p.leets === 0)
      warnings.push({ op: 'Spy on Military', fields: ['All military data missing'] });
    if (p.intelSurvey === 0)
      warnings.push({ op: 'Survey', fields: ['No survey data found'] });
    return warnings;
  }
 
  // --- OVERPOP CALCULATE ---
  function calculate(index) {
    const resultsEl = q('calc-results');
    const intelEl = q('intel-age');
    if (!resultsEl || !intelEl) return;
 
    if (enemyProvinceData.length === 0 || index === '' || index === null || index === undefined) {
      resultsEl.innerHTML = '';
      intelEl.innerHTML = '';
      return;
    }
 
    const p = enemyProvinceData[parseInt(index)];
    if (!p) return;
 
    sessionStorage.setItem('utopia_enemy_selected', index);
 
    const ops = [
      { label: 'Throne',   secs: p.intelThrone },
      { label: 'Military', secs: p.intelMilitary },
      { label: 'Survey',   secs: p.intelSurvey },
      { label: 'Sciences', secs: p.intelSciences },
    ];
 
    let ageHtml = '<span class="result-label">Intel Age:</span>';
    ops.forEach(op => {
      const color = intelColor(op.secs);
      ageHtml += `<div style="color:${color};font-size:11px;">${op.label}: ${formatSeconds(op.secs)}</div>`;
    });
    ageHtml += `<div style="font-size:10px;margin-top:3px;color:#5a5a3a;">
      <span style="color:#00ff00;">●</span>&lt;1h
      <span style="color:#ffff00;margin-left:3px;">●</span>1-4h
      <span style="color:#ff8800;margin-left:3px;">●</span>4-8h
      <span style="color:#ff4444;margin-left:3px;">●</span>8h+
    </div>`;
 
    const warnings = checkMissingData(p);
    let warnHtml = '';
    if (warnings.length > 0) {
      warnHtml = '<div style="margin-top:6px;padding:4px;border:1px solid #ff4444;background:#1a0000;">';
      warnHtml += '<div style="color:#ff4444;font-size:11px;">⚠ Missing Data:</div>';
      warnings.forEach(w => {
        warnHtml += `<div style="color:#ff8800;font-size:11px;margin-top:2px;">Run <span style="color:#ffffff;">${w.op}</span><br>Missing: ${w.fields.join(', ')}</div>`;
      });
      warnHtml += '<div style="color:#ff4444;font-size:10px;margin-top:4px;">Results may be inaccurate!</div>';
      warnHtml += '</div>';
    }
    intelEl.innerHTML = ageHtml + warnHtml;
 
    const totalPop = p.peons + p.wiz + p.thv
                   + p.solds + p.os + p.ds + p.leets
                   + p.osTrain + p.dsTrain + p.elTrain + p.thTrain;
 
    const raceMod    = racePopMod[p.race] || 1.0;
    const persPopMod = personalityPopMod[p.personality] || 1.0;
    const homeCapMod = personalityHomeMod[p.personality] || 1.0;
    const sciMod     = 1 + (p.housi / 100);
    const honorMod   = 1 + (p.honor * 0.01);
    const homeBonus  = (p.homePct / 100) * 10 * homeCapMod;
    const popPerAcre = (25 + homeBonus) * raceMod * persPopMod * sciMod * honorMod;
    const homes      = Math.round((p.homePct / 100) * p.acres);
 
    const modNotes = [];
    if (raceMod !== 1.0)    modNotes.push(`${p.race}: +${Math.round((raceMod-1)*100)}% pop`);
    if (persPopMod !== 1.0) modNotes.push(`${p.personality}: +${Math.round((persPopMod-1)*100)}% pop`);
    if (homeCapMod !== 1.0) modNotes.push(`${p.personality}: +${Math.round((homeCapMod-1)*100)}% home cap`);
    if (p.housi > 0)        modNotes.push(`Housing sci: +${p.housi}%`);
    if (p.honor > 0)        modNotes.push(`Honor rank ${p.honor}: +${p.honor}%`);
 
    const levels = [
      { name: 'Military Desertion', multiplier: 1.15, color: '#ff8800' },
      { name: 'Rioting',            multiplier: 1.30, color: '#ff4400' },
      { name: 'Thieves Strike',     multiplier: 1.40, color: '#ff0000' },
    ];
 
    let html = `
      <span class="result-label">${p.name}</span>
      <div class="result-muted">${p.race} / ${p.personality}</div>
      <div class="result-muted">Acres: ${p.acres.toLocaleString()}</div>
      <div class="result-muted">Total Pop: ${totalPop.toLocaleString()}</div>
      <div class="result-muted">Homes: ${homes.toLocaleString()} (${p.homePct}%)</div>
      <div class="result-muted">Housing Sci: +${p.housi}%</div>
      <div class="result-muted">Honor Rank: ${p.honor} (+${p.honor}%)</div>
      <div class="result-muted">Pop/Acre: ${popPerAcre.toFixed(2)}</div>
    `;
 
    if (modNotes.length > 0)
      html += `<div style="color:#ff8800;font-size:11px;margin-top:2px;">Mods: ${modNotes.join(', ')}</div>`;
 
    html += `<span class="result-label" style="margin-top:8px;">Target Acres:</span>`;
 
    levels.forEach(level => {
      const targetAcres = Math.ceil(totalPop / (level.multiplier * popPerAcre));
      html += `
        <div class="divider">
          <div style="color:${level.color};font-size:11px;">${level.name}</div>
          <div style="color:#ffffff;">${targetAcres.toLocaleString()} acres</div>
        </div>
      `;
    });
 
    resultsEl.innerHTML = html;
  }
 
  // --- DRAGON FUND CALCULATOR ---
  q('dragon-calc-btn').addEventListener('click', function() {
    const dragonResults = q('dragon-results');
    if (!dragonResults) return;
 
    if (kdProvinceData.length === 0) {
      dragonResults.innerHTML = '<div style="color:#ff4444;font-size:11px;">Load your Kingdom CSV first!</div>';
      return;
    }
 
    const dragonKey    = q('dragon-type').value;
    const dragon       = dragonData[dragonKey];
    const relationsMod = parseFloat(q('dragon-relations').value);
    const targetNW     = parseNumber(q('target-nw').value);
 
    if (!targetNW) {
      dragonResults.innerHTML = '<div style="color:#ff4444;font-size:11px;">Enter target kingdom NW!</div>';
      return;
    }
 
    const costMetric = targetNW * 0.656;
    const totalGold  = Math.round(costMetric * dragon.costMod);
    const totalFood  = Math.round(totalGold * 0.2);
    const dragonHP   = Math.round(dragon.hpMod * relationsMod * (targetNW / 132));
    const totalKdNW  = kdProvinceData.reduce((sum, p) => sum + p.nw, 0);
 
    const sorted = kdProvinceData
      .filter(p => p.nw > 0)
      .sort((a, b) => b.nw - a.nw)
      .map(p => ({
        name:  p.name,
        nw:    p.nw,
        share: p.nw / totalKdNW,
        gold:  Math.round(totalGold * (p.nw / totalKdNW)),
        food:  Math.round(totalFood * (p.nw / totalKdNW)),
      }));
 
    let html = `
      <span class="result-label" style="margin-top:6px;">${dragon.label} Dragon</span>
      <div class="dragon-gold">Gold: ${totalGold.toLocaleString()} gc</div>
      <div class="dragon-food">Food: ${totalFood.toLocaleString()} bushels</div>
      <div class="dragon-hp">HP: ${dragonHP.toLocaleString()}</div>
      <div class="result-muted">KD NW: ${totalKdNW.toLocaleString()}</div>
      <span class="result-label" style="margin-top:6px;">Province Share:</span>
      <select id="dragon-province-select"><option value="">-- Select Province --</option>
    `;
    sorted.forEach((p, i) => {
      html += `<option value="${i}" data-gold="${p.gold}" data-food="${p.food}" data-nw="${p.nw}" data-share="${(p.share*100).toFixed(1)}">${p.name}</option>`;
    });
    html += `</select><div id="dragon-province-result"></div>`;
    dragonResults.innerHTML = html;
 
    const dpSelect = shadow.getElementById('dragon-province-select');
    if (dpSelect) {
      dpSelect.addEventListener('change', function() {
        const opt = this.options[this.selectedIndex];
        const result = shadow.getElementById('dragon-province-result');
        if (!result) return;
        if (!opt.value) { result.innerHTML = ''; return; }
        result.innerHTML = `
          <div class="dragon-row">
            <div class="result-muted" style="font-size:10px;">NW: ${parseInt(opt.dataset.nw).toLocaleString()} (${opt.dataset.share}%)</div>
            <div class="dragon-gold">Gold: ${parseInt(opt.dataset.gold).toLocaleString()} gc</div>
            <div class="dragon-food">Food: ${parseInt(opt.dataset.food).toLocaleString()} bushels</div>
          </div>
        `;
      });
    }
  });
 
  // --- DRAGON SLAY CALCULATOR ---
  q('slay-calc-btn').addEventListener('click', function() {
    const slayResults = q('slay-results');
    if (!slayResults) return;
 
    if (kdProvinceData.length === 0) {
      slayResults.innerHTML = '<div style="color:#ff4444;font-size:11px;">Load your Kingdom CSV first!</div>';
      return;
    }
 
    const dragonHP = parseNumber(q('slay-hp').value);
    if (!dragonHP) {
      slayResults.innerHTML = '<div style="color:#ff4444;font-size:11px;">Enter dragon HP!</div>';
      return;
    }
 
    const totalKdNW = kdProvinceData.reduce((sum, p) => sum + p.nw, 0);
 
    const sorted = kdProvinceData
      .filter(p => p.nw > 0)
      .sort((a, b) => b.nw - a.nw)
      .map(p => ({
        name:  p.name,
        nw:    p.nw,
        share: p.nw / totalKdNW,
        hp:    Math.round(dragonHP * (p.nw / totalKdNW)),
      }));
 
    let html = `
      <span class="result-label" style="margin-top:6px;">Dragon HP: ${dragonHP.toLocaleString()}</span>
      <div class="result-muted">KD NW: ${totalKdNW.toLocaleString()}</div>
      <span class="result-label" style="margin-top:6px;">Province Share:</span>
      <select id="slay-province-select"><option value="">-- Select Province --</option>
    `;
    sorted.forEach((p, i) => {
      html += `<option value="${i}" data-hp="${p.hp}" data-nw="${p.nw}" data-share="${(p.share*100).toFixed(1)}">${p.name}</option>`;
    });
    html += `</select><div id="slay-province-result"></div>`;
    slayResults.innerHTML = html;
 
    const spSelect = shadow.getElementById('slay-province-select');
    if (spSelect) {
      spSelect.addEventListener('change', function() {
        const opt = this.options[this.selectedIndex];
        const result = shadow.getElementById('slay-province-result');
        if (!result) return;
        if (!opt.value) { result.innerHTML = ''; return; }
        result.innerHTML = `
          <div class="dragon-row">
            <div class="result-muted" style="font-size:10px;">NW: ${parseInt(opt.dataset.nw).toLocaleString()} (${opt.dataset.share}%)</div>
            <div class="dragon-hp">Must deal: ${parseInt(opt.dataset.hp).toLocaleString()} HP</div>
          </div>
        `;
      });
    }
  });
 
  // --- RESTORE CSVs ON PAGE LOAD ---
  setTimeout(function() {
    const enemyCSV = sessionStorage.getItem('utopia_enemy_csv');
    if (enemyCSV) {
      enemyProvinceData = parseCSVToProvinces(enemyCSV);
      const enemyName = sessionStorage.getItem('utopia_enemy_csv_name') || 'CSV';
      updateCSVStatus('csv-status', true, enemyProvinceData.length, enemyName);
      populateEnemyDropdown();
    }
    const kdCSV = sessionStorage.getItem('utopia_kd_csv');
    if (kdCSV) {
      kdProvinceData = parseCSVToProvinces(kdCSV);
      const kdName = sessionStorage.getItem('utopia_kd_csv_name') || 'CSV';
      updateCSVStatus('kd-csv-status', true, kdProvinceData.length, kdName);
    }
  }, 1200);
 
});