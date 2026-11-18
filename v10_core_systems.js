/* =========================================================================
   CYBER RAPPER // v10.0 CORE UI OVERHAUL, 8-SLOT CLOSET & SEAMLESS STREET
   - Forced title-logo-base.png + Vinyl Spin Mode Transition Loading
   - Dislyte-Inspired Mode Separation (HOME / STREET / CREATOR / STATS)
   - 12x12 Street + 2x Larger Protagonist + Upper-Right Intrude Cypher
   - Bust-Up <-> Full-Body Toggle + 8 Fashion Slots + Serious SP Leveling
   ========================================================================= */

const FASHION_8_SLOTS = [
  { key: 'hair', ico: '💇', label: '髪型・素体' },
  { key: 'cap', ico: '🧢', label: 'キャップ' },
  { key: 'sunglasses', ico: '🕶️', label: 'サングラス' },
  { key: 'pierce', ico: '✨', label: 'ピアス' },
  { key: 'necklace', ico: '⛓️', label: 'ネックレス' },
  { key: 'tops', ico: '🧥', label: 'トップス' },
  { key: 'bottoms', ico: '👖', label: 'ボトムス' },
  { key: 'shoes', ico: '👟', label: 'シューズ' }
];

const GEAR_8_CATALOG = {
  cap: [
    { id: 'cap_none', name: 'なし（ヘアスタイル表示）', price: 0, drip: 0 },
    { id: 'cap_jet90', name: '90s ナイロンジェットキャップ', price: 14000, drip: 16000, color: '#111827', accent: '#00f0ff' },
    { id: 'cap_beanie', name: 'リブ編みストリートビーニー', price: 12000, drip: 14000, color: '#1e1b4b', accent: '#c8ff29' },
    { id: 'cap_bucket', name: 'ネオンパイピング・バケットハット', price: 22000, drip: 26000, color: '#18181b', accent: '#ffc83b' }
  ],
  sunglasses: [
    { id: 'sg_none', name: 'なし（素顔）', price: 0, drip: 0 },
    { id: 'sg_tint', name: 'アンバーティント・リムレス眼鏡', price: 18000, drip: 22000, color: '#f59e0b' },
    { id: 'sg_thick', name: '極太黒縁スマートサングラス', price: 26000, drip: 32000, color: '#09090b' },
    { id: 'sg_visor', name: 'サイバープリズム・サウンドバイザー', price: 42000, drip: 54000, color: '#00f0ff' }
  ],
  pierce: [
    { id: 'pc_none', name: 'なし', price: 0, drip: 0 },
    { id: 'pc_hoop', name: 'シルバーフープピアス（両耳）', price: 9500, drip: 12000, color: '#e2e8f0' },
    { id: 'pc_gold24', name: '24K ダイヤスタッドピアス', price: 34000, drip: 45000, color: '#ffc83b' },
    { id: 'pc_cross', name: 'ネオンクロス・ドロップピアス', price: 28000, drip: 35000, color: '#ff2e93' }
  ],
  necklace: [
    { id: 'nk_none', name: 'なし', price: 0, drip: 0 },
    { id: 'nk_silver', name: 'マイアミキューバン・極太銀チェーン', price: 38000, drip: 48000, color: '#f1f5f9' },
    { id: 'nk_lotus', name: '24K ゴールデン蓮華メダリオン', price: 78000, drip: 98000, color: '#ffc83b' },
    { id: 'nk_vinyl', name: 'ターンテーブル・ネオンチャーム', price: 29000, drip: 36000, color: '#00f0ff' }
  ],
  tops: [
    { id: 'init_hoodie', name: '18oz ヴィンテージ無地フーディー', price: 0, drip: 5000, color: '#27272a', accent: '#00f0ff' },
    { id: 'job_work_jkt', name: '無骨なダックワークJKT (実写レイヤー対応)', price: 18000, drip: 22000, color: '#78472a', accent: '#f59e0b' },
    { id: 'ec_mohair', name: 'オーバーサイズ・モヘアカーディガン', price: 42000, drip: 52000, color: '#581c87', accent: '#ff2e93' },
    { id: 'ec_cyber_jkt', name: 'ネオ東京リフレクター・テックJKT', price: 96000, drip: 128000, color: '#0f172a', accent: '#00f0ff' },
    { id: 'ec_fur_coat', name: 'ラグジュアリー・フェイクファーコート', price: 115000, drip: 155000, color: '#1e1b2e', accent: '#ffc83b' }
  ],
  bottoms: [
    { id: 'bt_baggy', name: '90s 極太ウォッシュ・バギーデニム', price: 0, drip: 4500, color: '#1e293b', accent: '#64748b' },
    { id: 'bt_cargo', name: 'マルチポケット・テックカーゴパンツ', price: 24000, drip: 31000, color: '#18181b', accent: '#c8ff29' },
    { id: 'bt_sweat', name: 'ヘビーオンス・スウェットジョガー', price: 19000, drip: 24000, color: '#334155', accent: '#00f0ff' },
    { id: 'bt_leather', name: 'バイカー・マットブラックレザーパンツ', price: 54000, drip: 70000, color: '#09090b', accent: '#ffc83b' }
  ],
  shoes: [
    { id: 'sh_kicks', name: 'クラシック・ハイカットバッシュ', price: 0, drip: 4500, color: '#f8fafc', accent: '#ef4444' },
    { id: 'sh_boots', name: 'イエローヌバック・6インチワークブーツ', price: 28000, drip: 36000, color: '#d97706', accent: '#fef3c7' },
    { id: 'sh_cyber', name: 'ネオンエアソール・厚底キックス', price: 62000, drip: 82000, color: '#0f172a', accent: '#00f0ff' }
  ]
};

const LOADING_TIPS = [
  'BOSS戦は甘い3択なし。二重押韻（同じ母音の反復）と2小節フロウタップでオートスキルを覚醒させろ。',
  'VIBESを上げると最大HPが上昇し、BOSSの多段韻コンボに耐えられるようになる。',
  'LYRICは韻の基礎威力、FLOWは音ゲーのJUST判定幅、SENSEはクリティカル倍率に直結する。',
  '昼職バイトのミニゲームでS評価を出すと、日給ボーナスと同時に基礎ステータスが鍛えられる。'
];

let v10ClosetSlot = 'hair', v10CameraMode = 'bust', v10StreetCypher = null;

function ensureV10State() {
  if (typeof state === 'undefined') return;
  state.useLegacyLogoImg = true;
  if (!state.uiMode) state.uiMode = 'HOME';
  if (typeof state.statPoints !== 'number') state.statPoints = 4;
  if (!state.stats) state.stats = { lyric: 10, flow: 10, vibes: 10, sense: 10 };
  if (typeof state.stats.sense !== 'number') state.stats.sense = 10;
  const p = state.profile;
  if (!p.equip8) {
    p.equip8 = {
      cap: 'cap_none', sunglasses: 'sg_none', pierce: 'pc_hoop', necklace: 'nk_none',
      tops: p.outfitId || 'init_hoodie', bottoms: 'bt_baggy', shoes: 'sh_kicks'
    };
  }
  if (!Array.isArray(state.ownedGear8)) {
    state.ownedGear8 = ['cap_none', 'sg_none', 'pc_none', 'pc_hoop', 'nk_none', 'init_hoodie', 'bt_baggy', 'sh_kicks'];
  }
  const maxHp = getPlayerMaxHP();
  if (typeof state.hp !== 'number' || state.hp <= 0) state.hp = maxHp;
}

function getPlayerMaxHP() {
  const lv = (state && state.level) || 1, vib = (state && state.stats && state.stats.vibes) || 10;
  return 180 + lv * 38 + vib * 15;
}

function getGear8DripBonus() {
  if (!state?.profile?.equip8) return 0;
  let sum = 0;
  Object.entries(state.profile.equip8).forEach(([slot, id]) => {
    const item = (GEAR_8_CATALOG[slot] || []).find(x => x.id === id);
    if (item) sum += item.drip || 0;
  });
  return sum;
}

/* --- Vinyl Spin Mode Transition Loading --- */
function transitionMode(targetMode, titleText, subTip, afterFn) {
  ensureV10State();
  if (typeof Street25DEngine !== 'undefined') Street25DEngine.pause();
  let loader = document.getElementById('v10-loading-overlay');
  if (!loader) {
    loader = document.createElement('div');
    loader.id = 'v10-loading-overlay';
    document.getElementById('app-shell').appendChild(loader);
  }
  const tip = subTip || LOADING_TIPS[Math.floor(Math.random() * LOADING_TIPS.length)];
  loader.innerHTML = `<div class="v10-load-center">
      <div class="v10-vinyl-disc"><div class="v10-vinyl-core"></div></div>
      <div class="v10-load-mode">${escapeHtml(titleText || targetMode)}</div>
      <div class="v10-load-bars"><span></span><span></span><span></span><span></span><span></span></div>
      <div class="v10-load-tip">💡 ${escapeHtml(tip)}</div>
    </div>`;
  loader.classList.add('active');
  setTimeout(() => {
    state.uiMode = targetMode;
    if (typeof afterFn === 'function') afterFn(); else renderV10ActiveMode();
    setTimeout(() => loader.classList.remove('active'), 160);
  }, 780);
}

/* --- Composite Full-Body / Bust-Up 8-Slot Character Renderer --- */
function renderV10CharacterStageHTML(profile, camMode) {
  ensureV10State();
  const p = profile || state.profile, isDiva = p.gender === 'diva', eq = p.equip8 || {};
  const isFull = camMode === 'full';
  const baseUrl = AssetImageCache.resolveBaseSprite(isDiva, () => { if (state.created) renderV10ActiveMode(); });
  const tainted = AssetImageCache.isTaintedBase(isDiva);
  const workUrl = !isDiva && eq.tops === 'job_work_jkt' ? AssetImageCache.resolve('king_outfit_work.png', { cutout: true }) : null;
  const capObj = GEAR_8_CATALOG.cap.find(x => x.id === eq.cap), sgObj = GEAR_8_CATALOG.sunglasses.find(x => x.id === eq.sunglasses);
  const pcObj = GEAR_8_CATALOG.pierce.find(x => x.id === eq.pierce), nkObj = GEAR_8_CATALOG.necklace.find(x => x.id === eq.necklace);
  const btObj = GEAR_8_CATALOG.bottoms.find(x => x.id === eq.bottoms) || GEAR_8_CATALOG.bottoms[0];
  const shObj = GEAR_8_CATALOG.shoes.find(x => x.id === eq.shoes) || GEAR_8_CATALOG.shoes[0];

  const overlaySVG = `<svg viewBox="0 0 300 520" class="v10-gear-svg" preserveAspectRatio="xMidYMid meet">
    ${isFull ? `
      <g opacity="0.92">
        <path d="M104 335 L92 462 L140 462 L148 365 L156 462 L204 462 L192 335 Z" fill="${btObj.color}" stroke="${btObj.accent}" stroke-width="2"/>
        <rect x="86" y="460" width="54" height="26" rx="8" fill="${shObj.color}" stroke="${shObj.accent}" stroke-width="2.5"/>
        <rect x="156" y="460" width="54" height="26" rx="8" fill="${shObj.color}" stroke="${shObj.accent}" stroke-width="2.5"/>
      </g>` : ''}
    ${capObj && capObj.id !== 'cap_none' ? `<path d="M106 68 Q150 36 194 68 L212 76 L98 74 Z" fill="${capObj.color}" stroke="${capObj.accent}" stroke-width="2.2"/>` : ''}
    ${sgObj && sgObj.id !== 'sg_none' ? `<g><rect x="115" y="96" width="30" height="14" rx="3" fill="${sgObj.color}" fill-opacity="0.78" stroke="#fff" stroke-width="1.4"/><rect x="155" y="96" width="30" height="14" rx="3" fill="${sgObj.color}" fill-opacity="0.78" stroke="#fff" stroke-width="1.4"/><line x1="145" y1="102" x2="155" y2="102" stroke="#fff" stroke-width="1.5"/></g>` : ''}
    ${pcObj && pcObj.id !== 'pc_none' ? `<g><circle cx="107" cy="116" r="4" fill="none" stroke="${pcObj.color}" stroke-width="2"/><circle cx="193" cy="116" r="4" fill="none" stroke="${pcObj.color}" stroke-width="2"/></g>` : ''}
    ${nkObj && nkObj.id !== 'nk_none' ? `<g><path d="M124 168 Q150 206 176 168" fill="none" stroke="${nkObj.color}" stroke-width="4" stroke-dasharray="5 2"/><circle cx="150" cy="192" r="6" fill="${nkObj.color}"/></g>` : ''}
  </svg>`;

  return `<div class="v10-char-frame ${isFull ? 'mode-full' : 'mode-bust'}">
    ${baseUrl
      ? `<img src="${baseUrl}" alt="" class="v10-char-img" style="${tainted ? 'filter:url(#tainted-black-key);' : ''}">`
      : `<div style="width:100%;height:100%;">${renderAvatarSVG(p, getSideTheme(p.side).color, { transparentBg: true, camera: isFull ? 'card' : 'bust' })}</div>`}
    ${workUrl ? `<img src="${workUrl}" alt="" class="v10-char-img" style="z-index:3;${AssetImageCache.isTaintedSprite('king_outfit_work.png') ? 'filter:url(#tainted-black-key);' : ''}">` : ''}
    ${overlaySVG}
  </div>`;
}

/* --- Mode Router (Strict Separation: No Mixed Menus!) --- */
function renderV10ActiveMode() {
  ensureV10State();
  const top = document.getElementById('topbar'), nav = document.getElementById('bottom-nav'), body = document.getElementById('cockpit-body');
  if (top) top.style.display = 'none';
  if (nav) nav.style.display = 'none';
  if (body) body.classList.add('v10-fullscreen-body');

  if (!state.created) return renderCreator(false);
  if (typeof activeBossBattle !== 'undefined' && activeBossBattle) return renderV10BossBattle();
  if (typeof activeJobGame !== 'undefined' && activeJobGame) return renderV10JobMinigame();

  if (state.uiMode === 'STREET') return renderV10StreetMode();
  if (state.uiMode === 'CLOSET') return renderV10ClosetMode(false);
  if (state.uiMode === 'STATS') return renderV10StatsMode();
  return renderV10HomeHub();
}

/* --- 1. Dislyte-Style Sleek HOME Hub --- */
function renderV10HomeHub() {
  const sideObj = getSideTheme(), maxHp = getPlayerMaxHP();
  state.hp = maxHp;
  const bgUrl = AssetImageCache.resolve('bg_studio_booth.jpg', { cutout: false }) || AssetImageCache.resolveStageBg();
  const jobObj = STREET_JOBS.find(j => j.id === state.profile.currentJobId) || STREET_JOBS[0];
  setCockpitView(
    `<div class="v10-home-screen" style="${bgUrl ? `background-image:linear-gradient(95deg,rgba(7,8,15,0.45) 0%,rgba(7,8,15,0.92) 62%),url('${bgUrl}');` : ''}">
      <div class="v10-home-top">
        <div class="v10-glass-pill" onclick="openCardModal()">
          <span style="color:${sideObj.color};font-weight:900;">${sideObj.short}</span>
          <span>LV.${state.level}</span>
          <b style="color:#fff;">${escapeHtml(state.profile.artistName)}</b>
        </div>
        <div class="v10-glass-pill">
          <span style="color:var(--accent-lime);">¥${state.cash.toLocaleString()}</span>
          <span style="color:var(--accent-gold);">👑${state.respect}</span>
          <button class="v10-icon-btn" onclick="openSaveModal()">💾</button>
          <button class="v10-icon-btn" onclick="openSysModal()">⚙️</button>
        </div>
      </div>

      <div class="v10-home-hero">
        ${renderV10CharacterStageHTML(state.profile, v10CameraMode)}
        <button class="v10-cam-toggle" onclick="v10CameraMode=(v10CameraMode==='bust'?'full':'bust');renderV10HomeHub()">
          ${v10CameraMode === 'bust' ? '🧍 全身表示へ切替' : '🔍 バストアップへ切替'}
        </button>
      </div>

      <div class="v10-home-menu">
        <button class="v10-slanted-card primary" onclick="transitionMode('STREET','STREET EXPLORE // '+(STREET_ZONES[state.areaIndex]?.id||'LOCAL'),'歩いてライバルと即興サイファー！奥地にはBOSSが待つ。')">
          <div><span class="t">STREET EXPLORE</span><span class="s">街へ出る（${STREET_ZONES[state.areaIndex]?.id || 'LOCAL'} 12×12探索）</span></div><span>›</span>
        </button>
        <button class="v10-slanted-card gold" onclick="startV10JobMinigame('${jobObj.id}')">
          <div><span class="t">DAY JOB // バイト出勤</span><span class="s">${escapeHtml(jobObj.name)}（ミニゲームで稼ぐ）</span></div><span>›</span>
        </button>
        <button class="v10-slanted-card" onclick="v10CameraMode='bust';state.uiMode='CLOSET';renderV10ClosetMode(false)">
          <div><span class="t">8-SLOT CLOSET</span><span class="s">8部位ファッション＆素体メイク（Drip ¥${(getDripValue()+getGear8DripBonus()).toLocaleString()}）</span></div><span>›</span>
        </button>
        <button class="v10-slanted-card ${state.statPoints > 0 ? 'alert' : ''}" onclick="state.uiMode='STATS';renderV10StatsMode()">
          <div><span class="t">STATUS & LEVELING ${state.statPoints > 0 ? `[+${state.statPoints} SP!]` : ''}</span><span class="s">HP ${maxHp} / 真剣ステータス振り分け・転職</span></div><span>›</span>
        </button>
        <div class="v10-sub-grid">
          <button class="v10-mini-card" onclick="openDjMyouHub()">🎧 上限・BOSS指名</button>
          <button class="v10-mini-card" onclick="openV10SubModal('studio')">🎛️ スタジオ収録</button>
          <button class="v10-mini-card" onclick="openV10SubModal('record')">💿 レコード屋</button>
          <button class="v10-mini-card" onclick="openV10SubModal('chart')">🏆 番付・グロウ</button>
        </div>
      </div>
    </div>`,
    ''
  );
}

/* --- 2. 8-Slot Closet & Initial Character Creator (Bust <-> Full Toggle) --- */
function buyOrEquipGear8(slot, itemId) {
  ensureV10State();
  const item = (GEAR_8_CATALOG[slot] || []).find(x => x.id === itemId);
  if (!item) return;
  if (!state.ownedGear8.includes(itemId)) {
    if (state.cash < item.price) return showToast(`Cashが足りません（必要: ¥${item.price.toLocaleString()}）`);
    state.cash -= item.price;
    state.ownedGear8.push(itemId);
    state.respect += 10;
    showToast(`✨ ${item.name} を入手＆装着しました！`);
  }
  state.profile.equip8[slot] = itemId;
  if (slot === 'tops') state.profile.outfitId = itemId;
  saveState();
  renderV10ClosetMode(!state.created);
}

function renderV10ClosetMode(isNewGame) {
  ensureV10State();
  const p = state.profile, isDiva = p.gender === 'diva';
  const variants = isDiva ? PLAYER_BASE_VARIANTS.diva : PLAYER_BASE_VARIANTS.king;
  let slotItemsHTML = '';

  if (v10ClosetSlot === 'hair') {
    slotItemsHTML = `
      <div class="v10-sec-label">性別・サイド・MCネーム</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:6px;">
        <button class="btn ${!isDiva ? 'btn-cyan' : ''}" style="padding:6px;" onclick="setGenderStyle('king')">👑 KING (男)</button>
        <button class="btn ${isDiva ? 'btn-primary' : ''}" style="padding:6px;" onclick="setGenderStyle('diva')">💎 DIVA (女)</button>
      </div>
      ${isNewGame ? `<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:6px;">
        <button class="btn ${p.side === 'a_side' ? 'btn-cyan' : ''}" style="padding:6px;font-size:10px;" onclick="state.profile.side='a_side';renderV10ClosetMode(true)">💿 A-SIDE (王道)</button>
        <button class="btn ${p.side === 'b_side' ? 'btn-primary' : ''}" style="padding:6px;font-size:10px;" onclick="state.profile.side='b_side';renderV10ClosetMode(true)">📼 B-SIDE (裏派)</button>
      </div>` : ''}
      <input type="text" maxlength="14" value="${escapeHtml(p.artistName)}" oninput="state.profile.artistName=this.value.trim()||'MC'" placeholder="MC NAME" style="margin-bottom:8px;">
      <div class="v10-sec-label">ヘア＆高精細AIベース素体（4種）</div>
      ${variants.map(v => `<div class="v10-gear-row ${(p.baseVariant || 0) === v.id ? 'equipped' : ''}" onclick="state.profile.baseVariant=${v.id};renderV10ClosetMode(${isNewGame})">
        <span>💇 ${v.label}</span><span class="st">${(p.baseVariant || 0) === v.id ? '装着中' : '選択'}</span>
      </div>`).join('')}`;
  } else {
    const list = GEAR_8_CATALOG[v10ClosetSlot] || [];
    slotItemsHTML = `<div class="v10-sec-label">${FASHION_8_SLOTS.find(s => s.key === v10ClosetSlot)?.label} スロット</div>` +
      list.map(it => {
        const owned = isNewGame && it.price <= 20000 ? true : state.ownedGear8.includes(it.id);
        const eq = p.equip8[v10ClosetSlot] === it.id;
        return `<div class="v10-gear-row ${eq ? 'equipped' : ''}" onclick="${isNewGame && it.price <= 20000 ? `if(!state.ownedGear8.includes('${it.id}'))state.ownedGear8.push('${it.id}');` : ''}buyOrEquipGear8('${v10ClosetSlot}','${it.id}')">
          <div><div style="font-weight:800;font-size:11px;">${escapeHtml(it.name)}</div><div style="font-size:9px;color:var(--text-sub);">DRIP +¥${it.drip.toLocaleString()}</div></div>
          <span class="st">${eq ? '✓ 装着中' : owned ? '所持済' : `¥${it.price.toLocaleString()}`}</span>
        </div>`;
      }).join('');
  }

  setCockpitView(
    `<div class="v10-closet-layout">
      <div class="v10-closet-preview">
        <div class="v10-closet-top">
          <span class="v10-glass-pill">${isNewGame ? '✨ CHARACTER MAKE' : '🧥 8-SLOT CLOSET'} // ¥${state.cash.toLocaleString()}</span>
          <button class="v10-cam-toggle static" onclick="v10CameraMode=(v10CameraMode==='bust'?'full':'bust');renderV10ClosetMode(${isNewGame})">
            ${v10CameraMode === 'bust' ? '🔍 現在:バストアップ ➔ 🧍 全身へ' : '🧍 現在:全身表示 ➔ 🔍 顔アップへ'}
          </button>
        </div>
        ${renderV10CharacterStageHTML(p, v10CameraMode)}
      </div>
      <div class="v10-closet-Controls">
        <div class="v10-slot-tabs">
          ${FASHION_8_SLOTS.map(s => `<button class="v10-slot-tab ${v10ClosetSlot === s.key ? 'active' : ''}" onclick="v10ClosetSlot='${s.key}';renderV10ClosetMode(${isNewGame})"><span>${s.ico}</span><span>${s.label}</span></button>`).join('')}
        </div>
        <div class="v10-gear-list">${slotItemsHTML}</div>
        <button class="btn btn-lime" style="margin-top:6px;" onclick="${isNewGame ? 'finishV10Creation()' : "transitionMode('HOME','HOME BASE','コーディネート完了！自宅ロビーへ戻ります。')"}">
          ${isNewGame ? '🔥 このスタイルでストリートへ降り立つ！' : '✓ スタイルを確定してHOMEへ戻る'}
        </button>
      </div>
    </div>`,
    ''
  );
}

function finishV10Creation() {
  state.created = true;
  state.hp = getPlayerMaxHP();
  saveState();
  transitionMode('HOME', 'WELCOME TO REBUILT TOKYO', 'まずは昼職や街サイファーで経験値とSPを稼ぎ、ステータスを鍛え上げろ！');
}

/* --- 3. Serious Stat Allocation & Job Select Mode --- */
function allocateStatPoint(statKey) {
  ensureV10State();
  if (state.statPoints <= 0) return showToast('割り振れるSPがありません（レベルアップで+5 SP獲得！）');
  state.statPoints -= 1;
  state.stats[statKey] = (state.stats[statKey] || 10) + 2;
  state.hp = getPlayerMaxHP();
  saveState();
  renderV10StatsMode();
}

function renderV10StatsMode() {
  ensureV10State();
  const st = state.stats, maxHp = getPlayerMaxHP();
  const rows = [
    ['lyric', '📝 LYRIC（作詞・韻威力）', st.lyric, 'BOSS戦の1語あたりの韻ダメージ倍率とコンボ上限に直結'],
    ['flow', '🌊 FLOW（音ゲー判定・連撃）', st.flow, '2小節フロウタップのJUST判定幅拡大＆連打ダメージ上昇'],
    ['vibes', '🔥 VIBES（最大HP・精神耐久）', st.vibes, `最大HP（現在 ${maxHp}）とBOSSの多段韻コンボへの防御力に直結`],
    ['sense', '⚡ SENSE（クリティカル・覚醒）', st.sense, '韻×フロウ合致時のクリティカル率とオートスキル威力を増幅']
  ];
  setCockpitView(
    `<div class="v10-subscreen">
      <div class="v10-sub-header">
        <span>📈 STATUS & BUILD // LV.${state.level} (EXP ${state.exp||0}/${state.nextExp||100})</span>
        <button class="btn" style="width:auto;padding:5px 12px;font-size:10px;" onclick="state.uiMode='HOME';renderV10HomeHub()">← HOME</button>
      </div>
      <div class="panel" style="border-color:${state.statPoints > 0 ? 'var(--accent-lime)' : 'var(--border)'};">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <span style="font-size:12px;font-weight:900;color:var(--accent-gold);">残りスキルポイント (SP): ${state.statPoints} pt</span>
          <span style="font-size:10px;color:var(--accent-cyan);font-family:monospace;">MAX HP: ${maxHp}</span>
        </div>
        ${rows.map(([k, title, val, desc]) => `<div class="v10-gear-row" style="cursor:default;">
          <div style="flex:1;"><div style="font-size:11.5px;font-weight:900;color:#fff;">${title}: <span style="color:var(--accent-lime);font-family:monospace;">${val}</span></div><div style="font-size:9px;color:var(--text-sub);">${desc}</div></div>
          <button class="btn ${state.statPoints > 0 ? 'btn-lime' : ''}" style="width:auto;padding:6px 11px;font-size:10px;" ${state.statPoints <= 0 ? 'disabled' : ''} onclick="allocateStatPoint('${k}')">+2 強化</button>
        </div>`).join('')}
      </div>
      <div class="panel">
        <div class="v10-sec-label">💼 契約中の昼職（出勤すると専用ミニゲーム開始）</div>
        ${STREET_JOBS.map(j => `<div class="v10-gear-row ${state.profile.currentJobId === j.id ? 'equipped' : ''}" onclick="state.profile.currentJobId='${j.id}';saveState();renderV10StatsMode()">
          <div><div style="font-size:11px;font-weight:800;">${j.stars.slice(0,3)} ${escapeHtml(j.name)}</div><div style="font-size:9px;color:var(--text-sub);">基本給 ¥${j.wage.toLocaleString()}</div></div>
          <button class="btn btn-gold" style="width:auto;padding:5px 9px;font-size:9.5px;" onclick="event.stopPropagation();startV10JobMinigame('${j.id}')">▶ 出勤</button>
        </div>`).join('')}
      </div>
    </div>`,
    ''
  );
}

/* --- 4. Dedicated 12x12 Street Exploration + Seamless Upper-Right Intrude Cypher --- */
function ensureMapState12() {
  const z = STREET_ZONES[state.areaIndex] || STREET_ZONES[0];
  if (!state.mapState || state.mapState.areaId !== z.id || state.mapState.gridSize !== 12) {
    state.mapState = { areaId: z.id, gridSize: 12, x: 6, y: 10, dir: 'N', visited: ['6,10'] };
  }
  return state.mapState;
}

function renderV10StreetMode() {
  const zone = STREET_ZONES[state.areaIndex] || STREET_ZONES[0], ms = ensureMapState12(), v9 = ensureV9State();
  const spot = zone.landmarks.find(l => Math.abs(l.x * 2 - ms.x) <= 1 && Math.abs(l.y * 2 - ms.y) <= 1);
  let cells = '';
  for (let y = 0; y < 12; y++) for (let x = 0; x < 12; x++) {
    const me = x === ms.x && y === ms.y, lm = zone.landmarks.find(l => l.x * 2 === x && l.y * 2 === y);
    cells += `<div style="background:${me ? '#c8ff29' : lm ? lm.color : ms.visited.includes(`${x},${y}`) ? 'rgba(0,240,255,0.28)' : 'rgba(255,255,255,0.06)'};border-radius:1px;"></div>`;
  }

  const intrudeHTML = v10StreetCypher ? `<div class="v10-cypher-intrude">
      <div class="v10-intrude-portrait">${renderRivalSVG(v10StreetCypher.rival.style)}</div>
      <div class="v10-intrude-bubble">
        <div style="font-size:9px;color:var(--accent-pink);font-weight:900;">⚡ STREET CYPHER // ${escapeHtml(v10StreetCypher.rival.name)} (Lv.${v10StreetCypher.rival.lv})</div>
        <div style="font-size:11px;font-weight:800;color:#fff;margin:2px 0;">「${escapeHtml(v10StreetCypher.rival.taunt)}」</div>
        <div style="font-size:9px;color:var(--accent-cyan);font-family:monospace;">🎯 脚韻ターゲット: [ …${v10StreetCypher.rival.targetVowel} ]</div>
      </div>
    </div>
    <div class="v10-cypher-bar">
      <div style="display:flex;gap:5px;margin-bottom:5px;">
        <input type="text" id="v10-cypher-input" placeholder="即興1行リリックでアンサー（または下のクイック応答）" style="font-size:11px;padding:7px;">
        <button class="btn btn-lime" style="width:auto;padding:0 12px;font-size:11px;" onclick="resolveV10StreetCypher('free')">SPIT!</button>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr auto;gap:5px;">
        <button class="btn btn-cyan" style="padding:6px;font-size:9.5px;" onclick="resolveV10StreetCypher(0)">💬 韻で返す</button>
        <button class="btn" style="padding:6px;font-size:9.5px;" onclick="resolveV10StreetCypher(1)">💬 フロウで返す</button>
        <button class="btn" style="width:auto;padding:6px 9px;font-size:9.5px;" onclick="v10StreetCypher=null;renderV10StreetMode()">スルー</button>
      </div>
    </div>` : '';

  setCockpitView(
    `<div class="v10-street-fullscreen" id="v10-street-touch">
      <div id="three-street-mount"></div>
      <div class="v10-street-hud-top">
        <div class="v10-glass-pill">
          <b style="color:${zone.neonA};">${zone.id}</b>
          <span style="font-family:monospace;">(${ms.x},${ms.y})</span>
          <span style="color:var(--accent-lime);">LV.${state.level}</span>
        </div>
        <div style="display:flex;gap:6px;align-items:center;">
          <select class="v10-area-select" onchange="Street25DEngine.pause();state.areaIndex=Number(this.value);state.mapState=null;transitionMode('STREET','MOVING TO '+STREET_ZONES[this.value].id)">
            ${STREET_ZONES.map((z, i) => `<option value="${i}" ${state.areaIndex === i ? 'selected' : ''}>🚇 ${z.id}</option>`).join('')}
          </select>
          <button class="v10-glass-pill" style="cursor:pointer;border-color:#ffc83b;color:#ffc83b;" onclick="transitionMode('HOME','RETURNING HOME')">🏠 帰還</button>
        </div>
      </div>

      <div class="v10-radar-12">${cells}</div>

      <div class="v10-street-protagonist">
        ${renderV10CharacterStageHTML(state.profile, 'full')}
      </div>

      ${spot && !v10StreetCypher ? `<div class="v10-spot-popup" style="border-color:${spot.color};">
        <div style="font-size:12px;font-weight:900;color:${spot.color};">${spot.ico} ${spot.name}</div>
        <div style="font-size:9.5px;color:#cbd5e1;margin:2px 0 6px;">${spot.desc}</div>
        <button class="btn btn-gold" style="padding:8px;font-size:11px;" onclick="${spot.fn}">${spot.act}</button>
      </div>` : ''}

      ${intrudeHTML}

      ${!v10StreetCypher ? `<div class="v10-street-controls">
        <div class="v10-dpad-clean">
          <button onclick="stepV10Street(0,-1)">▲</button>
          <div style="display:flex;gap:14px;"><button onclick="stepV10Street(-1,0)">◀</button><button onclick="stepV10Street(1,0)">▶</button></div>
          <button onclick="stepV10Street(0,1)">▼</button>
        </div>
        <div class="v10-landmark-strip">
          ${zone.landmarks.filter(l => l.tag !== 'HOME').map(lm => `<button class="v10-spot-chip" style="border-color:${lm.color}88;" onclick="jumpV10Street(${lm.x * 2},${lm.y * 2})">${lm.ico} ${lm.tag}</button>`).join('')}
          <button class="v10-spot-chip" style="border-color:#ff2e93;" onclick="spawnSeamlessCypher()">🎤 野良サイファー</button>
        </div>
      </div>` : ''}
    </div>`,
    ''
  );
  requestAnimationFrame(() => {
    Street25DEngine.gridToWorld = (gx, gy) => ({ x: (gx - 6) * 1.4, z: (gy - 6) * 3.8 });
    Street25DEngine.worldToGrid = (wx, wz) => ({ gx: Math.max(0, Math.min(11, Math.round(wx / 1.4 + 6))), gy: Math.max(0, Math.min(11, Math.round(wz / 3.8 + 6))) });
    const wp = Street25DEngine.gridToWorld(ms.x, ms.y);
    Street25DEngine.posX = wp.x; Street25DEngine.posZ = wp.z;
    Street25DEngine.mountAndResume();
    if (Street25DEngine.playerSprite) Street25DEngine.playerSprite.visible = false;
  });
}

function stepV10Street(dx, dy) {
  const ms = ensureMapState12();
  ms.x = Math.max(0, Math.min(11, ms.x + dx));
  ms.y = Math.max(0, Math.min(11, ms.y + dy));
  ms.dir = dy < 0 ? 'N' : dy > 0 ? 'S' : dx > 0 ? 'E' : 'W';
  if (!ms.visited.includes(`${ms.x},${ms.y}`)) ms.visited.push(`${ms.x},${ms.y}`);
  if (Math.random() < 0.22) spawnSeamlessCypher();
  else { saveState(); renderV10StreetMode(); }
}

function jumpV10Street(tx, ty) {
  const ms = ensureMapState12();
  ms.x = Math.max(0, Math.min(11, tx)); ms.y = Math.max(0, Math.min(11, ty));
  if (!ms.visited.includes(`${ms.x},${ms.y}`)) ms.visited.push(`${ms.x},${ms.y}`);
  saveState(); renderV10StreetMode();
}

function spawnSeamlessCypher() {
  const pool = STREET_RIVALS.concat(RARE_RAPPERS);
  const rv = pool[Math.floor(Math.random() * pool.length)];
  playDjMyouScratchSE();
  v10StreetCypher = { rival: rv };
  renderV10StreetMode();
}

function resolveV10StreetCypher(choiceOrFree) {
  if (!v10StreetCypher) return;
  const rv = v10StreetCypher.rival;
  let win = false, bonus = 1;
  if (choiceOrFree === 'free') {
    const txt = (document.getElementById('v10-cypher-input')?.value || '').trim();
    if (txt.length < 4) return showToast('4文字以上のリリックを入力してください！');
    if (LEGAL_NG_WORDS.some(w => txt.includes(w))) return showToast('⚠️ NGワードが含まれています');
    const v = extractVowelsJP(txt);
    win = v.includes(rv.targetVowel) || txt.length >= 8;
    bonus = v.includes(rv.targetVowel) ? 1.5 : 1.1;
    state.lyrics.push({ id: 'lyr_' + Date.now(), text: txt, vowels: v, rank: 'S', moneySnap: state.cash });
  } else {
    win = choiceOrFree === 0 || (state.level >= rv.lv);
  }
  v10StreetCypher = null;
  if (win) {
    const cash = Math.round(rv.rewardCash * bonus);
    const expGain = Math.round(rv.exp * 1.25);
    state.cash += cash; state.respect += 14;
    if (rv.isRare && rv.dropRoot) handleRareRootDrop(rv);
    gainV10Exp(expGain);
    showToast(`🔥 即興サイファー勝利！ +¥${cash.toLocaleString()} / +${expGain} EXP`);
  } else {
    gainV10Exp(20);
    showToast('惜しくも言い負けた… (+20 EXP)');
  }
  saveState(); renderV10StreetMode();
}

function gainV10Exp(amount) {
  ensureV10State();
  state.exp = (state.exp || 0) + amount;
  state.nextExp = state.nextExp || 100;
  let up = false;
  while (state.exp >= state.nextExp) {
    state.exp -= state.nextExp;
    state.level = (state.level || 1) + 1;
    state.nextExp = Math.floor(state.nextExp * 1.38);
    state.statPoints = (state.statPoints || 0) + 5;
    up = true;
  }
  if (up) {
    state.hp = getPlayerMaxHP();
    triggerSlashCutIn(`LEVEL UP! LV.${state.level}`, '+5 SP獲得！STATUS画面で真剣配分せよ！', '#ffc83b');
  }
}

function openV10SubModal(kind) {
  const m = document.getElementById('modal-layer');
  if (!m) return;
  m.classList.remove('open');
  document.getElementById('topbar').style.display = 'flex';
  if (kind === 'studio') renderStudioTab();
  else if (kind === 'record') { state.shopMode = 'record'; renderShopTab(); }
  else if (kind === 'chart') renderChartTab();
  const deck = document.getElementById('command-deck');
  if (deck) deck.insertAdjacentHTML('afterbegin', `<button class="btn" style="margin-bottom:8px;" onclick="AudioEngine.stop();state.uiMode='HOME';renderV10ActiveMode()">← 🏠 HOMEロビーへ戻る</button>`);
}

/* --- Hook Title Logo (Force title-logo-base.png) & Boot Router --- */
window.addEventListener('DOMContentLoaded', () => {
  ensureV10State();
  window.buildModernEditorialLogoHTML = function (accentHex, subHex) {
    const logoUrl = AssetImageCache.resolveTitleLogo(() => {
      const ts = document.getElementById('title-screen');
      if (ts && ts.classList.contains('active')) renderTitleScreen();
    });
    if (logoUrl) {
      const scr = AssetImageCache.needsLogoScreenBlend() ? 'mix-blend-mode:screen;' : '';
      return `<div class="ts94-brand-inner">
        <img src="${logoUrl}" alt="CYBER RAPPER" style="width:100%;max-width:340px;max-height:142px;object-fit:contain;filter:drop-shadow(0 0 18px ${accentHex || '#00f0ff'}88);${scr}">
        <div class="ts94-brand-sub">A-SIDE  ×  B-SIDE  //  LOST ARCHIVE RPG v10</div>
      </div>`;
    }
    return `<div class="ts94-brand-inner"><div style="font-size:28px;font-weight:900;letter-spacing:4px;color:#fff;">CYBER RAPPER</div></div>`;
  };

  window.continueFromTitle = function () {
    document.getElementById('title-screen').classList.remove('active');
    transitionMode('HOME', 'ENTERING REBUILT TOKYO', '自宅ロビーから探索・昼職・8部位メイクを選択できます。');
  };

  window.renderCreator = function (salonMode) {
    v10CameraMode = 'bust';
    renderV10ClosetMode(!salonMode && !state.created);
  };

  const ts = document.getElementById('title-screen');
  if (ts && ts.classList.contains('active')) renderTitleScreen();
});
