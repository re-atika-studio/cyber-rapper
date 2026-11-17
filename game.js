/* =========================================================================
   CYBER RAPPER // CORE GAMEPLAY, 5-ITEM CREATOR & RECORD SHOP ENGINE v8.0
   A/B Side + 47 Prefs + Unemployed Hoodie Start + Record Dig + Studio MV
   ========================================================================= */

const TIME_SLOTS = ['EVENING', 'NIGHT', 'MIDNIGHT'];

const DEFAULT_PROFILE = {
  side: 'a_side', gender: 'diva', ageTier: 'young', artistName: 'LUNA',
  skinTone: 0, eyesType: 0, mouthType: 0, hairType: 0, hairHue: 0,
  hairColor: '#f1f5f9', meshColor: '#00f0ff', accentColor: '#00f0ff', props: ['pierce'],
  outfitId: 'init_hoodie', roomLv: 0, prefIndex: 12,
  starterRootId: 'boombap', starterItemId: 'item_mic',
  currentJobId: null, hasQuitJob: false, affiliatedLabelId: null
};

function createFreshState() {
  return {
    ver: 8, created: false, generationCount: 1, level: 1, exp: 0, nextExp: 100,
    currentTab: 'street', shopMode: 'ec', areaIndex: 0, timeIndex: 1, actionTurn: 0,
    cash: 18000, syncPt: 50, respect: 10, adSafePx: 56, soundMuted: false, savedAt: null,
    growClass: null, stats: { lyric: 10, flow: 10, vibes: 10 },
    mapState: { areaId: 'LOCAL', x: 3, y: 6, dir: 'N', visited: ['3,6'] },
    defeatedBosses: [], claimedJobBonuses: [],
    profile: Object.assign({}, DEFAULT_PROFILE),
    ownedOutfits: ['init_hoodie'], ownedUpgrades: [], equippedUpgrades: [], inventory: [],
    music: { unlockedRoots: ['boombap'], ownedTracks: ['bb_01'], equippedTrackId: 'bb_01' },
    customBeats: [], customOutfits: [], labelRoster: [], legendArchive: [],
    lyrics: [], tracks: [], worldLabels: [],
    cloud: { playerId: 'MC_' + Math.random().toString(36).slice(2, 8).toUpperCase(), pinCode: '0000', gasUrl: '', remoteAScore: 4800, remoteBScore: 4650, myContribution: 0, remotePlayers: [] }
  };
}

function migrateStateToV8(parsed) {
  const base = createFreshState();
  const s = Object.assign(base, parsed || {});
  s.profile = Object.assign({}, DEFAULT_PROFILE, (parsed && parsed.profile) || {});
  s.stats = Object.assign({ lyric: 10, flow: 10, vibes: 10 }, (parsed && parsed.stats) || {});
  s.music = Object.assign({ unlockedRoots: ['boombap'], ownedTracks: ['bb_01'], equippedTrackId: 'bb_01' }, (parsed && parsed.music) || {});
  s.cloud = Object.assign(base.cloud, (parsed && parsed.cloud) || {});
  if (!Array.isArray(s.ownedOutfits) || s.ownedOutfits.length === 0) s.ownedOutfits = ['init_hoodie'];
  if (!Array.isArray(s.equippedUpgrades)) s.equippedUpgrades = [...(s.ownedUpgrades || [])];
  if (!Array.isArray(s.defeatedBosses)) s.defeatedBosses = [];
  if (!Array.isArray(s.customBeats)) s.customBeats = [];
  if (!Array.isArray(s.customOutfits)) s.customOutfits = [];
  if (!Array.isArray(s.labelRoster)) s.labelRoster = [];
  if (!Array.isArray(s.legendArchive)) s.legendArchive = [];
  if (s.profile.prefIndex >= PREFECTURES.length) s.profile.prefIndex = 12;
  return s;
}

let state = createFreshState();
let creatorStep = 1, creatorSubTab = 'hair', isSalonEdit = false, shopPreview = null, mvInterval = null;

function nowStamp() {
  const d = new Date();
  return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}
function applySafeOffset() { document.documentElement.style.setProperty('--ad-safe-bottom', (state.adSafePx ?? 56) + 'px'); }

function saveState(slotKey) {
  state.savedAt = nowStamp();
  try { localStorage.setItem(slotKey || 'cyber_rapper_v8_auto', JSON.stringify(state)); } catch (e) {}
}

function loadStateFromKey(key) {
  try {
    const raw = localStorage.getItem(key); if (!raw) return false;
    state = migrateStateToV8(JSON.parse(raw));
    applySafeOffset();
    return true;
  } catch (e) { return false; }
}

function loadLatestAutoSave() {
  return loadStateFromKey('cyber_rapper_v8_auto') || loadStateFromKey('cyber_rapper_v7_auto') || loadStateFromKey('cyber_rapper_v6_auto');
}

/* --- Helpers & Root Unlock Handlers --- */
function setCockpitView(stageHtml, deckHtml) {
  document.getElementById('stage-view').innerHTML = stageHtml;
  document.getElementById('command-deck').innerHTML = deckHtml;
}
function showToast(msg) {
  const t = document.getElementById('toast'); if (!t) return;
  t.textContent = msg; t.classList.add('show');
  clearTimeout(window._toastTimer); window._toastTimer = setTimeout(() => t.classList.remove('show'), 2700);
}
function triggerShutter() {
  const s = document.getElementById('shutter'); if (!s) return;
  s.style.transition = 'none'; s.style.opacity = '0.85';
  setTimeout(() => { s.style.transition = 'opacity 0.35s ease-out'; s.style.opacity = '0'; }, 40);
}
function escapeHtml(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

function getActiveLabelBuff(type) {
  let mult = state.profile.hasQuitJob ? 1.25 : 1.0;
  if (state.profile.affiliatedLabelId) {
    const lb = state.worldLabels.find(l => l.id === state.profile.affiliatedLabelId);
    if (lb && lb.buffType === type) mult *= 1.2;
  }
  return mult;
}
function getDripValue() {
  const out = findOutfitById(state.profile.outfitId);
  let total = out.drip || 3200;
  getEquippedUpgrades().forEach(uid => { const u = UPGRADES.find(x => x.id === uid); if (u) total += u.drip; });
  const sItem = STARTER_ITEMS.find(i => i.id === state.profile.starterItemId);
  if (sItem) total += sItem.bonus.drip || 0;
  return Math.floor(total * getActiveLabelBuff('drip'));
}
function getEquippedTrackTitle() { return AudioEngine.findTrack(state.music.equippedTrackId)?.title || '90s Dust Loop #01'; }
function getEquippedRootLabel() {
  const tr = AudioEngine.findTrack(state.music.equippedTrackId);
  return tr ? (tr.rootName || tr.rootId).split('//')[0].trim() : 'BOOM BAP';
}
function getImplantGlow() { return AudioEngine.findTrack(state.music.equippedTrackId)?.glow || getSideTheme().color; }
function getLabelTitle(labelId) {
  const lb = (state.worldLabels || []).find(l => l.id === labelId);
  return lb ? `${lb.serial} ${lb.name}` : 'INDEPENDENT';
}

function handleBossRootUnlock(boss) {
  if (!state.defeatedBosses.includes(boss.id)) state.defeatedBosses.push(boss.id);
  const normals = MUSIC_ROOTS.filter(r => !r.isRare);
  let target = normals.find(r => r.id === boss.unlockRoot && !state.music.unlockedRoots.includes(r.id));
  if (!target) target = normals.find(r => !state.music.unlockedRoots.includes(r.id));
  if (target) {
    state.music.unlockedRoots.push(target.id);
    const t1 = target.tracks[0].id;
    if (!state.music.ownedTracks.includes(t1)) state.music.ownedTracks.push(t1);
    triggerSlashCutIn('NEW ROOT UNLOCKED!!', `${target.name} // レコード屋入荷！`, target.glow);
  } else {
    triggerSlashCutIn('BOSS DEFEATED!!', `${boss.name} 撃破ボーナス！`, '#ffc83b');
  }
}

function handleRareRootDrop(rareMc) {
  const root = MUSIC_ROOTS.find(r => r.id === rareMc.dropRoot);
  if (!root) return;
  if (!state.music.unlockedRoots.includes(root.id)) state.music.unlockedRoots.push(root.id);
  const tid = root.tracks[0].id;
  if (!state.music.ownedTracks.includes(tid)) state.music.ownedTracks.push(tid);
  state.music.equippedTrackId = tid;
  triggerSlashCutIn('SECRET ROOT DROP!!', `${root.name}`, root.glow);
}

function advanceWorldTime() {
  state.timeIndex = (state.timeIndex + 1) % TIME_SLOTS.length;
  state.actionTurn = (state.actionTurn || 0) + 1;
  if (state.tracks.length > 0) {
    const roy = Math.floor(state.tracks.reduce((sum, tr) => sum + tr.streams * 0.35, 0) * getActiveLabelBuff('music'));
    if (roy > 0) state.cash += roy;
  }
  if (Array.isArray(state.labelRoster) && state.labelRoster.length > 0) {
    state.cash += state.labelRoster.reduce((sum, m) => sum + (m.turnCut || 0), 0);
  }
  updateHeader(); saveState();
}

function updateHeader() {
  if (!state.created) return;
  const sideObj = getSideTheme();
  const sb = document.getElementById('ui-side');
  if (sb) { sb.textContent = sideObj.short; sb.style.borderColor = sideObj.color; sb.style.color = sideObj.color; }
  document.getElementById('ui-lv').textContent = `LV.${state.level || 1}`;
  document.getElementById('ui-mc-name').textContent = state.profile.artistName;
  document.getElementById('ui-cash').textContent = `¥${state.cash.toLocaleString()}`;
  document.getElementById('ui-sync').textContent = `💿${state.music.ownedTracks.length}`;
  document.getElementById('ui-rep').textContent = `👑${state.respect}`;
  document.getElementById('ui-loc').textContent = `📍${STREET_ZONES[state.areaIndex]?.id || 'LOCAL'} / 🕒${TIME_SLOTS[state.timeIndex]}`;
}

/* --- 1. Graffiti Tagging Title Screen --- */
function renderTitleScreen() {
  stopBeatPlayer(); AudioEngine.stop();
  const hasAuto = loadLatestAutoSave() && state.created;
  const ts = document.getElementById('title-screen');
  document.getElementById('topbar').style.display = 'none';
  document.getElementById('bottom-nav').style.display = 'none';

  ts.innerHTML = `
    <div class="rain-layer"></div>
    <div class="title-hero-art char-breathe">${renderAvatarSVG(state.profile, '#ff2e93', { transparentBg: true, camera: 'bust' })}</div>
    <div class="title-logo-box">${renderTaggingLogoSVG()}</div>
    <div class="title-menu-stack">
      ${hasAuto ? `
      <button class="street-skew-btn continue-btn" onclick="continueFromTitle()">
        <span>▶ CONTINUE</span>
        <span style="font-size:10px;font-family:monospace;font-weight:900;">${getSideTheme().short} LV.${state.level} ${escapeHtml(state.profile.artistName)}</span>
      </button>` : `
      <button class="street-skew-btn disabled"><span>▶ CONTINUE</span><span style="font-size:10px;">NO SAVE DATA</span></button>`}
      <button class="street-skew-btn" onclick="startNewGameFromTitle(${hasAuto})">
        <span>🔥 NEW GAME</span><span style="font-size:10px;color:var(--accent-cyan);">全5項目・無職フーディー開幕</span>
      </button>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
        <button class="btn" style="font-size:11px;" onclick="openSaveModal()">💾 セーブ・クラウド</button>
        <button class="btn" style="font-size:11px;" onclick="openSysModal()">⚙️ 広告よけ・設定</button>
      </div>
      <div style="text-align:center;font-family:monospace;font-size:9.5px;color:var(--text-sub);">
        VER 8.0 // 0px HYBRID & GROW ENGINE // ${state.savedAt ? 'SAVED ' + state.savedAt : 'READY'}
      </div>
    </div>`;
  ts.classList.add('active');
}

function continueFromTitle() {
  triggerShutter();
  document.getElementById('title-screen').classList.remove('active');
  document.getElementById('topbar').style.display = 'flex';
  document.getElementById('bottom-nav').style.display = 'grid';
  updateHeader(); syncCloudData('silent');
  switchTab(state.currentTab || 'street');
}

function startNewGameFromTitle(hasExisting) {
  if (hasExisting && !confirm('新しいキャラクターで始めますか？（手動スロットやクラウド保存データは残ります）')) return;
  const keepSafe = state.adSafePx ?? 56, keepMute = state.soundMuted, keepLabels = state.worldLabels || [], keepLegends = state.legendArchive || [], keepCloud = state.cloud;
  state = createFreshState();
  state.adSafePx = keepSafe; state.soundMuted = keepMute; state.worldLabels = keepLabels; state.legendArchive = keepLegends;
  state.cloud.gasUrl = keepCloud.gasUrl || '';
  creatorStep = 1; isSalonEdit = false; triggerShutter();
  document.getElementById('title-screen').classList.remove('active');
  renderCreator(false);
}

/* --- 2. Phase 1: 5-Item Fast Character Creator (Zero Visual Buffs) --- */
function setGenderStyle(g) {
  const p = state.profile; p.gender = g;
  if (g === 'diva' && p.artistName === 'KAGE') p.artistName = 'LUNA';
  if (g === 'king' && p.artistName === 'LUNA') p.artistName = 'KAGE';
  renderCreator(isSalonEdit);
}

function selectCatalogPart(field, item) {
  if (!isPartUnlocked(item.req)) return showToast(`🔒 未解放パーツ：${item.req.label}`);
  if (field === 'prop') {
    const arr = state.profile.props || [], idx = arr.indexOf(item.id);
    if (idx >= 0) arr.splice(idx, 1); else arr.push(item.id);
    state.profile.props = arr;
  } else state.profile[field] = item.id;
  renderCreator(isSalonEdit);
}

function randomizeAvatar() {
  const p = state.profile;
  const hairs = (p.gender === 'diva' ? AVATAR_CATALOG.hairsDiva : AVATAR_CATALOG.hairsKing).filter(x => isPartUnlocked(x.req));
  const eyes = AVATAR_CATALOG.eyes.filter(x => isPartUnlocked(x.req));
  const mouths = AVATAR_CATALOG.mouths.filter(x => isPartUnlocked(x.req));
  p.hairType = hairs[Math.floor(Math.random() * hairs.length)].id;
  p.eyesType = eyes[Math.floor(Math.random() * eyes.length)].id;
  p.mouthType = mouths[Math.floor(Math.random() * mouths.length)].id;
  p.skinTone = Math.floor(Math.random() * 4);
  p.hairColor = AVATAR_CATALOG.hairSwatches[Math.floor(Math.random() * AVATAR_CATALOG.hairSwatches.length)];
  p.meshColor = AVATAR_CATALOG.meshSwatches[Math.floor(Math.random() * AVATAR_CATALOG.meshSwatches.length)];
  p.accentColor = p.meshColor;
  triggerShutter(); renderCreator(isSalonEdit);
}

function renderCreator(salonMode) {
  isSalonEdit = !!salonMode;
  document.getElementById('topbar').style.display = 'none';
  document.getElementById('bottom-nav').style.display = 'none';
  const p = state.profile;
  const hairs = p.gender === 'diva' ? AVATAR_CATALOG.hairsDiva : AVATAR_CATALOG.hairsKing;
  let deck = '';

  if (creatorStep === 1) {
    let subHtml = '';
    if (creatorSubTab === 'hair') {
      subHtml = `<div class="chip-grid">${hairs.map(it => {
        const unl = isPartUnlocked(it.req);
        return `<span class="opt-chip ${p.hairType === it.id ? 'selected' : ''} ${!unl ? 'locked' : ''}" onclick='selectCatalogPart("hairType",${JSON.stringify(it)})'>${unl ? '' : '🔒'}${it.name}</span>`;
      }).join('')}</div>`;
    } else if (creatorSubTab === 'color') {
      subHtml = `<div style="font-size:9.5px;color:var(--text-sub);font-weight:800;">ベース髪色 ＆ 色相シフト（見た目バフ完全ゼロ）</div>
        <div class="color-swatch-row" style="margin-bottom:6px;">${AVATAR_CATALOG.hairSwatches.map(c => `<span class="swatch-dot ${p.hairColor === c ? 'active' : ''}" style="background:${c};" onclick="state.profile.hairColor='${c}';renderCreator(${isSalonEdit})"></span>`).join('')}</div>
        <div style="font-size:9.5px;color:var(--text-sub);font-weight:800;">インナーメッシュ ＆ 瞳ネオン色</div>
        <div class="color-swatch-row">${AVATAR_CATALOG.meshSwatches.map(c => `<span class="swatch-dot ${p.meshColor === c ? 'active' : ''}" style="background:${c};" onclick="state.profile.meshColor='${c}';state.profile.accentColor='${c}';renderCreator(${isSalonEdit})"></span>`).join('')}</div>`;
    } else if (creatorSubTab === 'face') {
      subHtml = `<div class="chip-grid" style="margin-bottom:5px;">${AVATAR_CATALOG.eyes.map(it => `<span class="opt-chip ${p.eyesType === it.id ? 'selected' : ''} ${!isPartUnlocked(it.req) ? 'locked' : ''}" onclick='selectCatalogPart("eyesType",${JSON.stringify(it)})'>${isPartUnlocked(it.req) ? '' : '🔒'}${it.name}</span>`).join('')}</div>
        <div class="chip-grid" style="margin-bottom:5px;">${AVATAR_CATALOG.mouths.map(it => `<span class="opt-chip ${p.mouthType === it.id ? 'selected' : ''} ${!isPartUnlocked(it.req) ? 'locked' : ''}" onclick='selectCatalogPart("mouthType",${JSON.stringify(it)})'>${isPartUnlocked(it.req) ? '' : '🔒'}${it.name}</span>`).join('')}</div>
        <div class="chip-grid">${['色白', '標準', '小麦', '褐色'].map((lbl, s) => `<span class="opt-chip ${p.skinTone === s ? 'selected' : ''}" onclick="state.profile.skinTone=${s};renderCreator(${isSalonEdit})">${lbl}</span>`).join('')}</div>`;
    } else {
      subHtml = `<div class="chip-grid">${AVATAR_CATALOG.propsList.map(it => `<span class="opt-chip ${(p.props || []).includes(it.id) ? 'selected' : ''} ${!isPartUnlocked(it.req) ? 'locked' : ''}" onclick='selectCatalogPart("prop",${JSON.stringify(it)})'>${isPartUnlocked(it.req) ? '' : '🔒'}${it.name}</span>`).join('')}</div>`;
    }

    deck = `<div class="sec-title"><span>${isSalonEdit ? '✏️ MAKE-UP SALON' : 'STEP 1/2 : ①勢力・②0px素体・③世代'}</span><span style="color:var(--accent-lime);cursor:pointer;" onclick="randomizeAvatar()">🎲 ランダムメイク</span></div>
      ${!isSalonEdit ? `
      <div class="gender-switch">
        <div class="gender-pill ${p.side === 'a_side' ? 'active-king' : ''}" onclick="state.profile.side='a_side';renderCreator(false)">💿 A-SIDE（正統派）</div>
        <div class="gender-pill ${p.side === 'b_side' ? 'active-diva' : ''}" onclick="state.profile.side='b_side';renderCreator(false)">📼 B-SIDE（特殊派）</div>
      </div>
      <div class="subtab-bar">${AGE_TIERS.map(a => `<button class="subtab-btn ${p.ageTier === a.id ? 'active' : ''}" onclick="state.profile.ageTier='${a.id}';renderCreator(false)">${a.label} (${a.jp})</button>`).join('')}</div>` : ''}
      <div class="panel">
        <div class="gender-switch">
          <div class="gender-pill ${p.gender !== 'diva' ? 'active-king' : ''}" onclick="setGenderStyle('king')">👑 KING (男素体)</div>
          <div class="gender-pill ${p.gender === 'diva' ? 'active-diva' : ''}" onclick="setGenderStyle('diva')">💎 DIVA (女素体)</div>
        </div>
        <input type="text" maxlength="14" value="${escapeHtml(p.artistName)}" oninput="state.profile.artistName=this.value.trim()||'NO NAME';const l=document.getElementById('card-mc-label');if(l)l.textContent=state.profile.artistName;" style="margin-bottom:6px;" placeholder="MC NAME">
        <div class="subtab-bar four-cols">
          <button class="subtab-btn ${creatorSubTab === 'hair' ? 'active' : ''}" onclick="creatorSubTab='hair';renderCreator(${isSalonEdit})">髪型</button>
          <button class="subtab-btn ${creatorSubTab === 'color' ? 'active' : ''}" onclick="creatorSubTab='color';renderCreator(${isSalonEdit})">カラー</button>
          <button class="subtab-btn ${creatorSubTab === 'face' ? 'active' : ''}" onclick="creatorSubTab='face';renderCreator(${isSalonEdit})">顔・肌</button>
          <button class="subtab-btn ${creatorSubTab === 'mark' ? 'active' : ''}" onclick="creatorSubTab='mark';renderCreator(${isSalonEdit})">刻印・傷</button>
        </div>
        ${subHtml}
      </div>
      ${isSalonEdit ? `<button class="btn btn-lime" onclick="finishCharacterCreation()">✨ スタイルを更新して街へ戻る</button>`
        : `<button class="btn btn-primary" onclick="creatorStep=2;renderCreator(false)">次へ：④47都道府県REP ＆ ⑤初期ルーツ・持ち物 ➡️</button>`}`;
  } else {
    const starterRoots = MUSIC_ROOTS.filter(r => !r.isRare);
    deck = `<div class="sec-title"><span>STEP 2/2 : ④出身地(47都道府県) ＆ ⑤ルーツ・持ち物</span></div>
      <div class="panel">
        <div style="font-size:10px;font-weight:900;color:var(--accent-cyan);margin-bottom:4px;">📍 ④ 出身地（47都道府県 REP刻印）</div>
        <select onchange="state.profile.prefIndex=Number(this.value);renderCreator(false)" style="margin-bottom:8px;">
          ${PREFECTURES.map(pr => `<option value="${pr.index}" ${p.prefIndex === pr.index ? 'selected' : ''}>REP: ${pr.label} — ${pr.jp}</option>`).join('')}
        </select>
        <div style="font-size:10px;font-weight:900;color:var(--accent-gold);margin-bottom:4px;">💿 ⑤-A 最初の音楽ルーツ（王道以外も自由選択可・1曲目所持）</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;margin-bottom:8px;">
          ${starterRoots.map(r => `<div class="opt-chip ${p.starterRootId === r.id ? 'selected' : ''}" style="justify-content:space-between;border-color:${p.starterRootId === r.id ? r.glow : 'var(--border)'};" onclick="state.profile.starterRootId='${r.id}';AudioEngine.playTrack('${r.tracks[0].id}');renderCreator(false)"><span>${r.name.split('//')[0]}</span><span>▶</span></div>`).join('')}
        </div>
        <div style="font-size:10px;font-weight:900;color:var(--accent-lime);margin-bottom:4px;">🎒 ⑤-B 初期持ち込みアイテム（1つ選択）</div>
        ${STARTER_ITEMS.map(it => `<div class="shop-item" style="padding:7px 9px;border-color:${p.starterItemId === it.id ? 'var(--accent-lime)' : 'var(--border)'};cursor:pointer;" onclick="state.profile.starterItemId='${it.id}';renderCreator(false)">
          <div class="shop-info"><h4>${it.name}</h4><p>${it.desc}</p></div><span style="font-size:11px;">${p.starterItemId === it.id ? '✅' : '○'}</span></div>`).join('')}
      </div>
      <div style="display:flex;gap:8px;">
        <button class="btn" style="width:32%;" onclick="creatorStep=1;renderCreator(false)">⬅️ 戻る</button>
        <button class="btn btn-lime" onclick="finishCharacterCreation()">🔥 無職フーディーで街へ飛び出す</button>
      </div>`;
  }
  setCockpitView(buildArtistCardHTML({ isCreator: true }), deck);
}

function finishCharacterCreation() {
  AudioEngine.stop();
  if (!isSalonEdit && !state.created) {
    const r = MUSIC_ROOTS.find(x => x.id === state.profile.starterRootId) || MUSIC_ROOTS[0];
    state.music.unlockedRoots = [r.id];
    state.music.ownedTracks = [r.tracks[0].id];
    state.music.equippedTrackId = r.tracks[0].id;
    const it = STARTER_ITEMS.find(x => x.id === state.profile.starterItemId) || STARTER_ITEMS[0];
    state.inventory = [it.id];
    state.stats = { lyric: 10 + it.bonus.lyric, flow: 10 + it.bonus.flow, vibes: 10 + it.bonus.vibes };
    state.cash += it.bonus.cash || 0;
    if (it.equipUpgrade) { state.ownedUpgrades = [it.equipUpgrade]; state.equippedUpgrades = [it.equipUpgrade]; }
    state.profile.outfitId = 'init_hoodie';
    state.profile.currentJobId = null;
  }
  state.created = true; saveState();
  document.getElementById('topbar').style.display = 'flex';
  document.getElementById('bottom-nav').style.display = 'grid';
  updateHeader(); switchTab(state.currentTab || 'street');
  triggerSlashCutIn(isSalonEdit ? 'STYLE UPDATED!' : 'STREET RISE!!', `${getSideTheme().short} // MC ${state.profile.artistName}`, getSideTheme().color);
}

/* --- 3. Tab Router, Cypher Hustle, Record Shop & Studio --- */
function switchTab(tab) {
  stopBeatPlayer(); if (tab !== 'shop' && tab !== 'studio') AudioEngine.stop();
  shopPreview = null; state.currentTab = tab;
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  if (tab === 'street') renderStreetTab();
  else if (tab === 'hustle') renderHustleTab();
  else if (tab === 'shop') renderShopTab();
  else if (tab === 'studio') renderStudioTab();
  else if (tab === 'chart') renderChartTab();
}

function extractVowelsJP(str) {
  const map = { 'あかさたなはまやらわがざだばぱぁゃアァカサタナハマヤラワガザダバパャ': 'a', 'いきしちにひみりぎじぢびぴぃイィキシチニヒミリギジヂビピ': 'i', 'うくすつぬふむゆるぐずづぶぷぅゅウゥクスツヌフムユルグズヅブプュヴ': 'u', 'えけせてねへめれげぜでべぺぇエェケセテネヘメレゲゼデベペ': 'e', 'おこそとのほもよろをごぞどぼぽぉょオォコソトノホモヨロヲゴゾドボポョ': 'o' };
  let out = '';
  for (const ch of str) { for (const [chars, v] of Object.entries(map)) { if (chars.includes(ch)) { out += v; break; } } }
  if (out.length < 3) { const vs = ['a', 'i', 'u', 'e', 'o']; for (let i = 0; i < str.length; i++) if (str.charCodeAt(i) > 0x3000) out += vs[str.charCodeAt(i) % 5]; }
  return out.slice(-10);
}

function renderHustleTab() {
  const job = STREET_JOBS.find(j => j.id === state.profile.currentJobId);
  const lastLine = state.lyrics.length > 0 ? state.lyrics[state.lyrics.length - 1] : null;
  setCockpitView(
    `<div class="stage-monitor" style="display:flex;align-items:center;padding:10px;background:linear-gradient(135deg,#17102c,#07070e);">
      <div class="char-breathe" style="width:120px;height:186px;flex-shrink:0;">${renderAvatarSVG(state.profile, null, { transparentBg: true, camera: 'bust' })}</div>
      <div style="padding-left:8px;flex:1;">
        <div style="font-size:10px;color:var(--accent-lime);font-weight:900;">🎤 CYPHER // LYR:${state.stats.lyric} FLW:${state.stats.flow} VIB:${state.stats.vibes}</div>
        <div style="font-size:11.5px;font-weight:900;margin:4px 0;">リリック帳蓄積: ${state.lyrics.length} 行</div>
        <div style="font-size:10px;color:var(--text-sub);background:rgba(0,0,0,0.5);padding:7px;border-radius:7px;">
          ${lastLine ? `「${escapeHtml(lastLine.text)}」<br><span style="color:var(--accent-cyan);font-family:monospace;">母音 […${lastLine.vowels.slice(-3)}]</span>` : '下の入力欄からリリックをスピットせよ！'}
        </div>
      </div>
    </div>`,
    `<div class="panel">
      <textarea id="lyric-input" rows="2" placeholder="夜の魂をスピットせよ（手打ちボーナス1.5倍）"></textarea>
      <div class="chip-grid" style="margin:5px 0 7px;">${RHYME_ASSIST_CHIPS.map(l => `<span class="opt-chip" onclick="document.getElementById('lyric-input').value='${l}'">${l.slice(0, 10)}…</span>`).join('')}</div>
      <button class="btn btn-cyan" onclick="submitCypherLyric()">⚡ サイファーでスピット</button>
    </div>
    <div class="sec-title"><span>💼 ストリート昼職 ＆『辞表』コマンド</span></div>
    ${state.profile.hasQuitJob ? `<div class="panel" style="border-color:var(--accent-lime);font-size:10.5px;color:var(--accent-lime);font-weight:800;">🔥 辞表提出済み：専業MCボーナス稼働中（全シノギ・印税 +25%！）</div>`
      : job ? `<div class="shop-item"><div class="shop-info"><h4>💼 現職：${job.name}</h4><p>${job.stars} / 出勤手取り ¥${job.wage.toLocaleString()}</p></div>
        <div style="display:flex;gap:5px;"><button class="btn btn-lime" style="width:auto;padding:6px 10px;" onclick="state.cash+=${job.wage};advanceWorldTime();renderHustleTab();showToast('+¥${job.wage.toLocaleString()}')">出勤</button>
        <button class="btn btn-danger" style="width:auto;padding:6px 9px;" onclick="quitDayJob()">🔥辞表</button></div></div>`
      : `<div class="panel" style="font-size:10px;color:var(--text-sub);">🕶️ 現在：無職（『🗺️街移動』で1歩歩くごとに求人貼り紙・電撃SSRスカウト抽選が発生！）</div>`}
    <div class="shop-item"><div class="shop-info"><h4>💼 極秘アタッシュケース深夜配送</h4><p>高報酬ストリートシノギ</p></div>
      <button class="btn btn-primary" style="width:auto;padding:7px 13px;" onclick="const w=Math.floor(36000*getActiveLabelBuff('hustle'));if(Math.random()<0.83){state.cash+=w;gainExp(24);triggerSlashCutIn('HUSTLE!!','+¥'+w.toLocaleString(),'#c8ff29');}else showToast('🚨 検問で撤退…');advanceWorldTime();renderHustleTab()">実行</button></div>`
  );
}

function quitDayJob() {
  state.profile.currentJobId = null; state.profile.hasQuitJob = true;
  state.respect += 80; state.stats.lyric += 5; state.stats.vibes += 5;
  triggerSlashCutIn('QUIT DAY JOB!!', 'RESPECT +80 // 専業MC覚醒', '#ff3358');
  showToast('🔥 辞表を叩きつけた！Respect+80 ＆ 全報酬+25%解放！');
  updateHeader(); saveState(); renderHustleTab();
}

function submitCypherLyric() {
  const text = (document.getElementById('lyric-input')?.value || '').trim();
  if (text.length < 5) return showToast('5文字以上のフレーズを入力してください！');
  if (LEGAL_NG_WORDS.some(w => text.includes(w))) return showToast('⚠️ ストア審査NGワードが含まれています');
  const vowels = extractVowelsJP(text);
  const prev = state.lyrics.length > 0 ? state.lyrics[state.lyrics.length - 1].vowels : '';
  const rank = (prev && vowels.slice(-2) === prev.slice(-2)) || text.length >= 11 ? 'S' : 'A';
  const cashGain = Math.floor((rank === 'S' ? 9500 : 5500) + state.stats.lyric * 220);
  state.cash += cashGain; state.respect += rank === 'S' ? 14 : 8; state.stats.lyric += 1;
  state.lyrics.push({ id: 'lyr_' + Date.now(), text, vowels, rank, moneySnap: state.cash });
  gainExp(28); advanceWorldTime();
  if (rank === 'S') triggerSlashCutIn('S-RANK BAR!!', `+¥${cashGain.toLocaleString()} & LYR+1`, '#00f0ff');
  renderHustleTab();
}

function previewItem(kind, id) {
  if (kind === 'outfit') shopPreview = { label: findOutfitById(id).name, overrides: { outfitId: id, camera: 'bust' } };
  else {
    const u = UPGRADES.find(x => x.id === id);
    shopPreview = u.type === 'room' ? { label: u.name, overrides: { roomLv: u.roomLv, camera: 'bust' } } : { label: u.name, overrides: { upgrades: [...getEquippedUpgrades(), id], camera: 'bust' } };
  }
  renderShopTab();
}

function renderShopTab() {
  const stage = `<div class="stage-monitor"><div class="char-breathe" style="width:100%;height:100%;">${renderAvatarSVG(state.profile, null, shopPreview ? shopPreview.overrides : { camera: 'bust' })}</div>
    <div class="stage-monitor-badge"><span class="mon-pill" style="color:var(--accent-lime);">${shopPreview ? `👁️ 試着: ${shopPreview.label}` : `DRIP: ¥${getDripValue().toLocaleString()} // ♪ ${getEquippedTrackTitle()}`}</span></div></div>`;

  let list = '';
  if (state.shopMode === 'ec') {
    list = OUTFITS.filter(o => !o.starter && !o.jobOnly).map(o => `<div class="shop-item"><div class="shop-info"><h4>👕 ${o.name}</h4><p>DRIP +¥${o.drip.toLocaleString()}</p></div>
      <div style="display:flex;gap:5px;"><button class="btn" style="width:auto;padding:6px 8px;font-size:10px;" onclick="previewItem('outfit','${o.id}')">👁️試着</button>
      ${state.ownedOutfits.includes(o.id) ? `<span class="tag-mini" style="color:var(--accent-lime);align-self:center;">所持済</span>` : `<button class="btn btn-primary" style="width:auto;padding:6px 10px;" onclick="buyOutfit('${o.id}')">¥${o.price.toLocaleString()}</button>`}</div></div>`).join('') +
      UPGRADES.map(u => `<div class="shop-item"><div class="shop-info"><h4>💎 ${u.name}</h4><p>${u.desc}</p></div>
      <div style="display:flex;gap:5px;"><button class="btn" style="width:auto;padding:6px 8px;font-size:10px;" onclick="previewItem('up','${u.id}')">👁️試着</button>
      ${state.ownedUpgrades.includes(u.id) ? `<span class="tag-mini" style="color:var(--accent-lime);align-self:center;">所持済</span>` : `<button class="btn btn-primary" style="width:auto;padding:6px 10px;" onclick="buyUpgrade('${u.id}')">¥${u.price.toLocaleString()}</button>`}</div></div>`).join('');
  } else {
    list = `<div style="font-size:10px;color:var(--text-sub);margin-bottom:6px;">ボス撃破で解放したルーツの追加トラック（2・3曲目）をCashでディグ購入できます！</div>` +
      MUSIC_ROOTS.map(r => {
        const unlocked = state.music.unlockedRoots.includes(r.id);
        if (!unlocked) return `<div class="shop-item" style="opacity:0.42;"><div class="shop-info"><h4>🔒 ${r.name}</h4><p>${r.isRare ? '街の隠しレアラッパー撃破で限定ドロップ' : '各街のエリアボス撃破でルーツ解放＆入荷'}</p></div></div>`;
        return `<div class="panel" style="border-color:${r.glow}66;"><div style="font-size:11px;font-weight:900;color:${r.glow};margin-bottom:5px;">💿 ${r.name} (${r.bpm} BPM)</div>` +
          r.tracks.map(t => {
            const owned = state.music.ownedTracks.includes(t.id), eq = state.music.equippedTrackId === t.id;
            return `<div class="shop-item" style="margin-bottom:4px;"><div class="shop-info"><h4>♪ ${t.title}</h4><p>${t.isRare ? '★非売品ワンオフ音源' : `収録ビート`}</p></div>
              <div style="display:flex;gap:4px;"><button class="btn" style="width:auto;padding:5px 8px;font-size:10px;" onclick="AudioEngine.playTrack('${t.id}')">▶試聴</button>
              ${eq ? `<span class="tag-mini" style="color:var(--accent-lime);align-self:center;">装備中</span>` : owned ? `<button class="btn btn-cyan" style="width:auto;padding:5px 9px;font-size:10px;" onclick="equipTrackBGM('${t.id}')">BGM装備</button>`
              : `<button class="btn btn-gold" style="width:auto;padding:5px 9px;font-size:10px;" onclick="buyRecordTrack('${t.id}',${t.price})">¥${t.price.toLocaleString()}</button>`}</div></div>`;
          }).join('') + `</div>`;
      }).join('');
  }
  setCockpitView(stage, `<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:8px;">
    <button class="btn ${state.shopMode === 'ec' ? 'btn-primary' : ''}" style="padding:8px;" onclick="state.shopMode='ec';renderShopTab()">👕 アパレルEC</button>
    <button class="btn ${state.shopMode === 'record' ? 'btn-gold' : ''}" style="padding:8px;" onclick="state.shopMode='record';renderShopTab()">💿 レコード屋(DIG)</button></div>${list}`);
}

function buyOutfit(id) { const o = findOutfitById(id); if (state.cash < o.price) return showToast('Cashが足りません！'); state.cash -= o.price; state.ownedOutfits.push(id); state.profile.outfitId = id; shopPreview = null; state.respect += 18; triggerSlashCutIn('NEW DRIP!!', o.name, '#c8ff29'); updateHeader(); saveState(); renderShopTab(); }
function buyUpgrade(id) { const u = UPGRADES.find(x => x.id === id); if (state.cash < u.price) return showToast('Cashが足りません！'); state.cash -= u.price; state.ownedUpgrades.push(id); const eq = getEquippedUpgrades(); if (!eq.includes(id)) eq.push(id); state.equippedUpgrades = eq; if (u.type === 'room' && u.roomLv > state.profile.roomLv) state.profile.roomLv = u.roomLv; shopPreview = null; state.respect += 30; triggerSlashCutIn('UPGRADED!!', u.name, '#ffc83b'); updateHeader(); saveState(); renderShopTab(); }
function buyRecordTrack(tid, price) { if (state.cash < price) return showToast('Cashが足りません！'); state.cash -= price; state.music.ownedTracks.push(tid); state.music.equippedTrackId = tid; state.respect += 22; AudioEngine.playTrack(tid); triggerSlashCutIn('VINYL DIGGED!!', AudioEngine.findTrack(tid).title, '#ffc83b'); updateHeader(); saveState(); renderShopTab(); }
function equipTrackBGM(tid) { state.music.equippedTrackId = tid; AudioEngine.playTrack(tid); saveState(); renderShopTab(); showToast(`♪ BGMを『${getEquippedTrackTitle()}』にセットしました！`); }

function stopBeatPlayer() { if (mvInterval) { clearInterval(mvInterval); mvInterval = null; } }
function renderStudioTab() {
  const ownedObjs = state.music.ownedTracks.map(id => AudioEngine.findTrack(id)).filter(Boolean);
  setCockpitView(
    `<div class="stage-monitor" style="display:flex;flex-direction:column;justify-content:center;align-items:center;padding:14px;text-align:center;background:radial-gradient(circle,#291246,#07070c);">
      <div style="font-size:10px;color:var(--accent-cyan);font-weight:900;letter-spacing:0.12em;margin-bottom:6px;">STUDIO BOOTH // ♪ ${getEquippedTrackTitle()}</div>
      <div id="mv-line" style="font-size:15px;font-weight:900;color:#fff;text-shadow:0 0 14px var(--accent-pink);">所持トラック×蓄積リリックから新曲をドロップせよ</div>
    </div>`,
    `<div class="panel">
      <div style="font-size:10px;color:var(--text-sub);margin-bottom:4px;">使用する所持トラック（BGM連動）</div>
      <select id="studio-beat-sel" onchange="state.music.equippedTrackId=this.value;AudioEngine.playTrack(this.value)" style="margin-bottom:6px;">
        ${ownedObjs.map(t => `<option value="${t.id}" ${state.music.equippedTrackId === t.id ? 'selected' : ''}>♪ ${t.title} (${t.rootName || 'ROOT'})</option>`).join('')}
      </select>
      <input type="text" id="track-title" placeholder="新曲タイトル（空欄で自動命名）" style="margin-bottom:7px;">
      <button class="btn btn-lime" onclick="recordAndReleaseTrack()">🔥 REC & RELEASE（新曲リリース＆MV再生）</button>
    </div>
    <div class="sec-title"><span>💿 ディスコグラフィ (${state.tracks.length}曲)</span></div>
    ${state.tracks.slice().reverse().map(tr => `<div class="shop-item"><div class="shop-info"><h4>🎵 ${escapeHtml(tr.title)}</h4><p>${tr.genre} / ▶ ${tr.streams.toLocaleString()}再生</p></div><button class="btn btn-cyan" style="width:auto;padding:6px 11px;" onclick="playTrackMV('${tr.id}')">▶ 再生</button></div>`).join('')}`
  );
}

function recordAndReleaseTrack() {
  if (state.lyrics.length === 0) return showToast('先に『🎤鍛錬・稼ぎ』かバトルでリリックを1行以上刻んでください！');
  const beatId = document.getElementById('studio-beat-sel')?.value || state.music.equippedTrackId;
  const beat = AudioEngine.findTrack(beatId);
  const title = document.getElementById('track-title').value.trim() || `ARCHIVE #${state.tracks.length + 1}`;
  const statSum = state.stats.lyric + state.stats.flow + state.stats.vibes;
  const streams = Math.floor((2600 + state.lyrics.length * 1200 + statSum * 85 + getDripValue() / 300) * getActiveLabelBuff('music'));
  const tr = { id: 'trk_' + Date.now(), title, beatId: beat.id, genre: beat.rootName || 'ARCHIVE', lines: state.lyrics.slice(-6).map(l => l.text), streams };
  state.tracks.push(tr); state.respect += 45; gainExp(65); triggerSlashCutIn('NEW DROP!!', `${streams.toLocaleString()} STREAMS`, '#ff2e93');
  updateHeader(); saveState(); renderStudioTab(); playTrackMV(tr.id);
}

function playTrackMV(trackId) {
  stopBeatPlayer();
  const tr = state.tracks.find(t => t.id === trackId); if (!tr) return;
  AudioEngine.playTrack(tr.beatId || state.music.equippedTrackId);
  let lineIdx = 0; const mvEl = document.getElementById('mv-line'); if (mvEl) mvEl.textContent = `♪ ${tr.lines[0]}`;
  mvInterval = setInterval(() => {
    if (!mvEl) return stopBeatPlayer();
    lineIdx = (lineIdx + 1) % tr.lines.length; mvEl.textContent = `♪ ${tr.lines[lineIdx]}`;
  }, 2200);
}

/* --- 4. Save, Bag, Card & System Modals --- */
function quickManualSave() {
  saveState('cyber_rapper_v8_auto'); saveState('cyber_rapper_slot_1'); syncCloudData('silent');
  triggerSlashCutIn('DATA SAVED!!', `SLOT 1 // ${state.savedAt}`, '#ffc83b');
  showToast(`💾 セーブ完了！（${state.savedAt}）`);
}
function closeModal() {
  document.getElementById('modal-layer').classList.remove('open');
  if (state.created && !document.getElementById('title-screen').classList.contains('active')) switchTab(state.currentTab);
}
function openSaveModal() {
  const slotsHtml = [1, 2, 3].map(n => {
    const key = `cyber_rapper_slot_${n}`; let info = null;
    try { const r = localStorage.getItem(key); if (r) info = JSON.parse(r); } catch (e) {}
    return `<div class="shop-item"><div class="shop-info"><h4 style="color:var(--accent-gold);">💾 SLOT ${n} ${info ? `— LV.${info.level || 1} ${escapeHtml(info.profile?.artistName || '')}` : '（空き枠）'}</h4>
      <p>${info ? `Cash ¥${(info.cash || 0).toLocaleString()} / ${info.savedAt || ''}` : '未記録'}</p></div>
      <div style="display:flex;gap:5px;">
        ${state.created ? `<button class="btn btn-cyan" style="width:auto;padding:6px 9px;font-size:10px;" onclick="saveState('${key}');saveState();openSaveModal();showToast('SLOT ${n}に保存しました')">書込</button>` : ''}
        ${info ? `<button class="btn btn-lime" style="width:auto;padding:6px 9px;font-size:10px;" onclick="if(loadStateFromKey('${key}')){saveState();closeModal();continueFromTitle();}">読込</button>` : ''}
      </div></div>`;
  }).join('');
  const m = document.getElementById('modal-layer');
  m.innerHTML = `<div class="modal-header"><span class="modal-title">💾 SAVE & CLOUD DB</span><button class="modal-close" onclick="closeModal()">✕ 閉じる</button></div>
    <div class="modal-body">
      <button class="btn btn-cyan" style="margin-bottom:8px;" onclick="openCloudModal()">☁️ cyber_rapper_db クラウドセーブ・PIN設定</button>
      ${slotsHtml}
      <div class="panel"><div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:6px;">
        <button class="btn btn-cyan" onclick="const c=btoa(unescape(encodeURIComponent(JSON.stringify(state))));document.getElementById('backup-code-box').value=c;navigator.clipboard?.writeText(c);showToast('📋 引継ぎコードをコピーしました')">📋 コードコピー</button>
        <button class="btn btn-lime" onclick="try{const r=document.getElementById('backup-code-box').value.trim();state=migrateStateToV8(JSON.parse(decodeURIComponent(escape(atob(r)))));state.created=true;saveState();closeModal();continueFromTitle();}catch(e){showToast('❌ コード形式エラー');}">📥 コード復元</button>
      </div><textarea id="backup-code-box" rows="2" placeholder="引継ぎコード出力 / 貼り付け欄"></textarea></div>
    </div>`;
  m.classList.add('open');
}

function openBagModal() {
  const p = state.profile, curOut = findOutfitById(p.outfitId);
  const ownedTracks = state.music.ownedTracks.map(id => AudioEngine.findTrack(id)).filter(Boolean);
  const m = document.getElementById('modal-layer');
  m.innerHTML = `<div class="modal-header"><span class="modal-title">🎒 BAG // クローゼット＆所持音源</span><button class="modal-close" onclick="closeModal()">✕ 閉じる</button></div>
    <div class="modal-body">
      <div class="equip-paperdoll"><div class="doll-preview char-breathe">${renderAvatarSVG(p, null, { camera: 'bust' })}</div>
        <div class="equip-slots-col">
          <div class="eq-slot-row"><span class="eq-slot-k">👕 TOPS</span><span class="eq-slot-v">${curOut.name}</span></div>
          <div class="eq-slot-row"><span class="eq-slot-k">♪ BGM</span><span class="eq-slot-v" style="color:var(--accent-cyan);">${getEquippedTrackTitle()}</span></div>
          <div class="eq-slot-row"><span class="eq-slot-k">💰 DRIP</span><span class="eq-slot-v" style="color:var(--accent-lime);">¥${getDripValue().toLocaleString()}</span></div>
        </div></div>
      <div class="sec-title"><span>♪ イベント・バトルBGM切替</span></div>
      <select onchange="state.music.equippedTrackId=this.value;AudioEngine.playTrack(this.value);saveState();openBagModal()" style="margin-bottom:8px;">
        ${ownedTracks.map(t => `<option value="${t.id}" ${state.music.equippedTrackId === t.id ? 'selected' : ''}>♪ ${t.title} (${t.rootName})</option>`).join('')}
      </select>
      <div class="sec-title"><span>👕 所持衣装（初期フーディー・職業私服・EC・自社服）</span></div>
      ${getAllOutfits().filter(o => state.ownedOutfits.includes(o.id)).map(o => `<div class="shop-item"><div class="shop-info"><h4>${o.name}</h4><p>DRIP +¥${o.drip.toLocaleString()}</p></div>
        ${p.outfitId === o.id ? `<span class="tag-mini" style="color:var(--accent-lime);">着用中</span>` : `<button class="btn btn-cyan" style="width:auto;padding:6px 10px;" onclick="state.profile.outfitId='${o.id}';saveState();openBagModal()">着替える</button>`}</div>`).join('')}
    </div>`;
  m.classList.add('open');
}

function openCardModal() {
  const m = document.getElementById('modal-layer');
  m.innerHTML = `<div class="modal-header"><span class="modal-title">🃏 3D HOLO ARTIST CARD</span><button class="modal-close" onclick="closeModal()">✕ 閉じる</button></div>
    <div class="modal-body">${buildArtistCardHTML({ isCreator: false })}
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px;">
        <button class="btn btn-cyan" onclick="exportArtistCardPNG()">📸 PNGカード保存</button>
        <button class="btn btn-lime" onclick="document.getElementById('modal-layer').classList.remove('open');creatorStep=1;renderCreator(true)">✏️ メイク・髪型変更</button>
      </div>
    </div>`;
  m.classList.add('open'); attachCard3DTilt();
}

function openSysModal() {
  const curSafe = state.adSafePx ?? 56, m = document.getElementById('modal-layer');
  m.innerHTML = `<div class="modal-header"><span class="modal-title">⚙️ SYSTEM SETTINGS</span><button class="modal-close" onclick="closeModal()">✕ 閉じる</button></div>
    <div class="modal-body">
      <div class="panel"><div style="font-size:11px;font-weight:900;margin-bottom:5px;">📱 下部セーフエリア余白調整（100dvh保護）</div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;">
          ${[[0, '0px(全画面)'], [56, '56px(標準)'], [92, '92px(広め)']].map(([px, lbl]) => `<button class="btn ${curSafe === px ? 'btn-cyan' : ''}" style="padding:8px 4px;font-size:10px;" onclick="state.adSafePx=${px};applySafeOffset();saveState();openSysModal()">${lbl}</button>`).join('')}
        </div></div>
      <div class="panel">
        <button class="btn ${state.soundMuted ? 'btn-danger' : 'btn-lime'}" style="margin-bottom:8px;" onclick="state.soundMuted=!state.soundMuted;if(state.soundMuted)AudioEngine.stop();saveState();openSysModal()">
          ${state.soundMuted ? '🔇 サウンド：ミュート中' : '🔊 サウンド：短尺BGM＆シンセ ON'}
        </button>
        <button class="btn btn-gold" style="margin-bottom:8px;" onclick="state.cash+=220000;state.respect+=140;gainExp(240);updateHeader();saveState();showToast('🔥 検証ブースト完了（グロウ覚醒・EC・レコード購入可能！）')">⚡ 開発検証ブースト（資金・Respect・グロウ解放）</button>
        <button class="btn" onclick="closeModal();renderTitleScreen()">🏠 タイトル画面へ戻る</button>
      </div>
    </div>`;
  m.classList.add('open');
}

applySafeOffset();
renderTitleScreen();
