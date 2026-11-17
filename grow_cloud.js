/* =========================================================================
   CYBER RAPPER // ACTIVE GROW SYSTEM (4 ROUTES) & CLOUD DB SYNC v8.0
   Beatmaker / Label Owner / Apparel Founder / Promoter + GAS LockService DB
   ========================================================================= */

const GROW_CLASSES = [
  {
    id: 'beatmaker', ico: '🎹', name: 'BEATMAKER（ビートメイカー）',
    summary: '解放済み2ルーツを掛け合わせた複合ビート自作 ＆ 他MCへのビート販売（印税収益）を解放'
  },
  {
    id: 'label_owner', ico: '🏢', name: 'LABEL OWNER（レーベルオーナー）',
    summary: '現役のまま自社レーベル（LABEL #0001〜）を設立 ＆ 街のMCをスカウト所属させて分配報酬を獲得'
  },
  {
    id: 'apparel_founder', ico: '🧥', name: 'APPAREL FOUNDER（ブランド創設者）',
    summary: '自社ストリートブランドを創設！0px着用可能な限定服の企画 ＆ ゲリラ抽選ドロップ販売を解放'
  },
  {
    id: 'promoter', ico: '🎤', name: 'CLUB PROMOTER（イベント主催者）',
    summary: '地下MCバトル大会の自主興行でチケット収益を獲得しつつ、隠しレアラッパーを高確率召喚！'
  }
];

let chartSubTab = 'grow';
let rankAxis = 'wealth';

function isGrowEligible() {
  return (state.defeatedBosses || []).length >= 1 || state.respect >= 100 || (state.cash + getDripValue()) >= 220000;
}

function getDominanceStats() {
  const c = state.cloud || {};
  const myScore = Math.floor((state.cash + getDripValue()) / 1000) + state.respect * 12 + (c.myContribution || 0) * 15;
  const baseA = (c.remoteAScore || 4800) + (state.profile.side === 'a_side' ? myScore : 0);
  const baseB = (c.remoteBScore || 4650) + (state.profile.side === 'b_side' ? myScore : 0);
  const total = Math.max(1, baseA + baseB);
  const pctA = Math.min(92, Math.max(8, Math.round((baseA / total) * 100)));
  return { pctA, pctB: 100 - pctA, baseA, baseB };
}

function unlockGrowClass(cid) {
  if (state.growClass) return showToast('現役グロウは1キャラクターにつき1つのみ選択可能です！');
  if (!isGrowEligible()) return showToast('条件未達：ボス1人撃破 または Respect 100 / 総資産¥220,000以上が必要です');
  const gc = GROW_CLASSES.find(g => g.id === cid);
  if (!gc) return;
  state.growClass = cid;
  state.respect += 45;
  triggerSlashCutIn('ACTIVE GROW!!', gc.name, '#ffc83b');
  showToast(`⚡『${gc.name}』へ現役覚醒！専用コマンドが解放されました！`);
  updateHeader(); saveState(); renderChartTab();
}

/* --- 1. Beatmaker Grow Actions --- */
function craftHybridBeat() {
  const r1 = document.getElementById('bm-root-1')?.value;
  const r2 = document.getElementById('bm-root-2')?.value;
  const titleIn = (document.getElementById('bm-title')?.value || '').trim();
  if (!r1 || !r2) return showToast('掛け合わせる2つのルーツを選択してください');
  const rootA = MUSIC_ROOTS.find(r => r.id === r1) || MUSIC_ROOTS[0];
  const rootB = MUSIC_ROOTS.find(r => r.id === r2) || MUSIC_ROOTS[0];
  const id = 'cbeat_' + Date.now();
  const title = titleIn || `${rootA.id.toUpperCase()}×${rootB.id.toUpperCase()} #${(state.customBeats.length + 1)}`;
  const beat = {
    id, title, rootId: rootA.id, rootName: `${rootA.id.toUpperCase()}×${rootB.id.toUpperCase()}`,
    bpm: Math.round((rootA.bpm + rootB.bpm) / 2), glow: rootB.glow, style: rootB.style,
    note: Math.round(((rootA.tracks[0]?.note || 110) + (rootB.tracks[0]?.note || 130)) / 2),
    price: 0, isCustom: true
  };
  state.customBeats.push(beat);
  state.music.ownedTracks.push(id);
  state.music.equippedTrackId = id;
  state.respect += 20; gainExp(35);
  AudioEngine.playTrack(id);
  triggerSlashCutIn('BEAT CRAFTED!!', title, beat.glow);
  saveState(); renderChartTab();
}

function sellBeatToScene() {
  if (!state.customBeats || state.customBeats.length === 0) return showToast('先にオリジナル複合ビートを1曲以上制作してください！');
  const price = 36000 + state.customBeats.length * 9500 + state.stats.flow * 600;
  state.cash += price; state.respect += 16; gainExp(30); advanceWorldTime();
  triggerSlashCutIn('BEAT SOLD!!', `+¥${price.toLocaleString()} ROYALTY`, '#c8ff29');
  renderChartTab();
}

/* --- 2. Label Owner Grow Actions --- */
function foundActiveLabel() {
  const name = (document.getElementById('lo-label-name')?.value || '').trim() || `${state.profile.artistName} RECORDS`;
  const buffType = document.getElementById('lo-buff-type')?.value || 'music';
  if (state.cash < 50000) return showToast('レーベル登記費用（¥50,000）が足りません！');
  state.cash -= 50000;
  const serial = `LABEL #${String((state.worldLabels || []).length + 1).padStart(4, '0')}`;
  const labelId = 'lbl_' + Date.now();
  state.worldLabels.push({ id: labelId, serial, name, founder: state.profile.artistName, buffType });
  state.profile.affiliatedLabelId = labelId;
  state.respect += 50;
  triggerSlashCutIn(serial, name, '#00f0ff');
  updateHeader(); saveState(); syncCloudData('silent'); renderChartTab();
}

function scoutRosterMC() {
  if (!state.profile.affiliatedLabelId) return showToast('先に自社レーベルを設立してください！');
  if ((state.labelRoster || []).length >= 5) return showToast('所属アーティスト枠（最大5名）が満員です！');
  if (state.cash < 30000) return showToast('契約金（¥30,000）が足りません！');
  const names = ['KOLD-KID', 'YOUNG VEX', 'MISTY-G', '808 TIGER', 'NOCTURNE', 'RAY-Z', 'LUNA-BIT'];
  const pick = names[Math.floor(Math.random() * names.length)] + '-' + ((state.labelRoster.length + 1) * 7);
  const cut = 9500 + Math.floor(Math.random() * 8000);
  state.cash -= 30000;
  state.labelRoster.push({ id: 'mc_' + Date.now(), name: pick, turnCut: cut });
  state.respect += 22;
  triggerSlashCutIn('MC SCOUTED!!', `${pick} (毎ターン+¥${cut.toLocaleString()})`, '#c8ff29');
  updateHeader(); saveState(); renderChartTab();
}

/* --- 3. Apparel Founder Grow Actions --- */
function createCustomBrandItem() {
  const tag = (document.getElementById('af-brand-tag')?.value || '').trim().toUpperCase().slice(0, 10) || state.profile.artistName.slice(0, 8);
  const itemName = (document.getElementById('af-item-name')?.value || '').trim() || `${tag} LIMITED JKT`;
  const style = document.getElementById('af-style')?.value || 'hoodie';
  const color = document.getElementById('af-col')?.value || '#181826';
  const accent = document.getElementById('af-acc')?.value || '#00f0ff';
  if (state.cash < 35000) return showToast('サンプル製作費（¥35,000）が足りません！');
  state.cash -= 35000;
  const id = 'brand_' + Date.now();
  const drip = 85000 + state.customOutfits.length * 22000;
  const newOut = { id, name: `🧥 ${itemName}`, price: 0, drip, color, accent, style, brandTag: tag, customBrand: true };
  state.customOutfits.push(newOut);
  state.ownedOutfits.push(id);
  state.profile.outfitId = id;
  state.respect += 28;
  triggerSlashCutIn('NEW BRAND DROP!', itemName, accent);
  updateHeader(); saveState(); renderChartTab();
}

function runGuerrillaDrop() {
  if (!state.customOutfits || state.customOutfits.length === 0) return showToast('先に自社ブランド服を1着企画してください！');
  const sales = 54000 + state.customOutfits.length * 18000 + state.stats.vibes * 900;
  state.cash += sales; state.respect += 24; gainExp(36); advanceWorldTime();
  triggerSlashCutIn('SOLD OUT!!', `抽選売上 +¥${sales.toLocaleString()}`, '#ff2e93');
  renderChartTab();
}

/* --- 4. Club Promoter Grow Actions --- */
function hostPromoterEvent(isMajor) {
  const cost = isMajor ? 55000 : 20000;
  if (state.cash < cost) return showToast(`会場貸切費（¥${cost.toLocaleString()}）が足りません！`);
  state.cash -= cost;
  const rev = (isMajor ? 92000 : 42000) + state.respect * 160;
  state.cash += rev; state.respect += isMajor ? 30 : 15; gainExp(40);
  const summonChance = isMajor ? 1.0 : 0.55;
  if (Math.random() < summonChance) {
    const unownedRare = RARE_RAPPERS.filter(r => !state.music.unlockedRoots.includes(r.dropRoot));
    const guest = (unownedRare.length > 0 ? unownedRare : RARE_RAPPERS)[Math.floor(Math.random() * (unownedRare.length || RARE_RAPPERS.length))];
    showToast(`🎤 興行収入 +¥${(rev - cost).toLocaleString()}！さらにゲスト隠しMC『${guest.name}』が乱入！`);
    switchTab('street');
    return launchBattle(guest);
  }
  triggerSlashCutIn('EVENT PACKED!!', `純利益 +¥${(rev - cost).toLocaleString()}`, '#c8ff29');
  updateHeader(); saveState(); renderChartTab();
}

/* --- Chart / Grow / Cloud DB Tab Renderer --- */
function renderChartTab() {
  const dom = getDominanceStats();
  const sideObj = getSideTheme();
  const myWealth = state.cash + getDripValue();
  const canRetire = state.respect >= 200 || myWealth >= 400000;

  const stageHtml = `
    <div class="stage-monitor" style="padding:11px 12px;display:flex;flex-direction:column;justify-content:space-between;background:linear-gradient(160deg,#151029,#07070e);">
      <div>
        <div style="display:flex;justify-content:space-between;font-size:10px;font-weight:900;margin-bottom:4px;">
          <span style="color:#00f0ff;">💿 A-SIDE ${dom.pctA}%</span>
          <span style="color:var(--accent-gold);font-family:monospace;">SCENE DOMINANCE</span>
          <span style="color:#ff2e93;">${dom.pctB}% B-SIDE 📼</span>
        </div>
        <div class="dominance-bar">
          <div style="width:${dom.pctA}%;background:linear-gradient(90deg,#00f0ff,#ffc83b);"></div>
          <div style="width:${dom.pctB}%;background:linear-gradient(90deg,#c8ff29,#ff2e93);"></div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:10px;">
        <div style="width:94px;height:132px;flex-shrink:0;">${renderAvatarSVG(state.profile, sideObj.color, { transparentBg: true, camera: 'bust' })}</div>
        <div style="flex:1;font-size:10.5px;">
          <div style="font-weight:900;font-size:13px;color:${sideObj.color};">${escapeHtml(state.profile.artistName)} <span style="font-size:10px;color:#fff;">(第${state.generationCount || 1}世代)</span></div>
          <div style="color:var(--text-sub);margin:2px 0;">所属: ${getLabelTitle(state.profile.affiliatedLabelId)}</div>
          <div style="color:var(--accent-lime);font-family:monospace;font-weight:900;">総資産(Cash+Drip): ¥${myWealth.toLocaleString()}</div>
          <div style="color:var(--accent-gold);font-size:9.5px;margin-top:2px;">現役グロウ: ${state.growClass ? GROW_CLASSES.find(g => g.id === state.growClass)?.name : (isGrowEligible() ? '⚡ 覚醒可能！' : '🔒 条件未達')}</div>
        </div>
      </div>
    </div>`;

  let bodyHtml = '';
  if (chartSubTab === 'grow') {
    if (!state.growClass) {
      bodyHtml = `<div class="panel"><div style="font-size:10.5px;color:var(--text-sub);margin-bottom:6px;">ボス1人撃破 または Respect100 / 総資産¥220,000達成で、引退せず<b>現役のまま1つだけ</b>専用キャリア機能を解放できます。</div>
        ${GROW_CLASSES.map(g => `<div class="shop-item"><div class="shop-info"><h4 style="color:var(--accent-cyan);">${g.ico} ${g.name}</h4><p>${g.summary}</p></div>
          <button class="btn ${isGrowEligible() ? 'btn-gold' : ''}" style="width:auto;padding:7px 10px;font-size:10px;" onclick="unlockGrowClass('${g.id}')">${isGrowEligible() ? '覚醒する' : '🔒未達'}</button></div>`).join('')}</div>`;
    } else if (state.growClass === 'beatmaker') {
      const opts = state.music.unlockedRoots.map(rid => { const r = MUSIC_ROOTS.find(x => x.id === rid); return r ? `<option value="${r.id}">${r.name}</option>` : ''; }).join('');
      bodyHtml = `<div class="panel"><div class="sec-title"><span>🎹 複合ビート合成スタジオ（制作数: ${state.customBeats.length}曲）</span></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:6px;"><select id="bm-root-1">${opts}</select><select id="bm-root-2">${opts}</select></div>
        <input type="text" id="bm-title" placeholder="オリジナルビート名（空欄で自動命名）" style="margin-bottom:6px;">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
          <button class="btn btn-cyan" onclick="craftHybridBeat()">🎹 複合ビート生成</button>
          <button class="btn btn-lime" onclick="sellBeatToScene()">💴 ビート販売(印税)</button>
        </div></div>`;
    } else if (state.growClass === 'label_owner') {
      bodyHtml = `<div class="panel"><div class="sec-title"><span>🏢 現役レーベル経営（所属MC: ${(state.labelRoster || []).length}/5名）</span></div>
        ${!state.profile.affiliatedLabelId ? `
          <input type="text" id="lo-label-name" placeholder="設立レーベル名" style="margin-bottom:6px;">
          <select id="lo-buff-type" style="margin-bottom:6px;"><option value="music">音源印税 +20%</option><option value="drip">Drip評価 +20%</option><option value="hustle">バトル・シノギ報酬 +20%</option></select>
          <button class="btn btn-gold" onclick="foundActiveLabel()">🏢 ¥50,000で現役レーベル設立</button>
        ` : `<div style="font-size:11px;font-weight:900;color:var(--accent-cyan);margin-bottom:6px;">運営中: ${getLabelTitle(state.profile.affiliatedLabelId)}</div>
          <button class="btn btn-lime" style="margin-bottom:6px;" onclick="scoutRosterMC()">🤝 新人MCをスカウト契約（¥30,000）</button>
          ${(state.labelRoster || []).map(m => `<div class="shop-item"><div class="shop-info"><h4>🎤 ${m.name}</h4><p>毎ターン分配金 +¥${m.turnCut.toLocaleString()}</p></div></div>`).join('')}`}</div>`;
    } else if (state.growClass === 'apparel_founder') {
      bodyHtml = `<div class="panel"><div class="sec-title"><span>🧥 自社ストリートブランド企画室</span></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:6px;">
          <input type="text" id="af-brand-tag" placeholder="ブランド刻印(英字)">
          <select id="af-style"><option value="hoodie">極厚フーディー</option><option value="cyber">タクティカルJKT</option><option value="fur">ラグジュアリーファー</option></select>
        </div>
        <input type="text" id="af-item-name" placeholder="新作アイテム名" style="margin-bottom:6px;">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:6px;">
          <select id="af-col"><option value="#151522">マットブラック</option><option value="#1e1b4b">ディープインディゴ</option><option value="#3b0764">ロイヤルパープル</option></select>
          <select id="af-acc"><option value="#00f0ff">シアン刺繍</option><option value="#c8ff29">ライム刺繍</option><option value="#ffc83b">ゴールド刺繍</option><option value="#ff2e93">ピンク刺繍</option></select>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
          <button class="btn btn-cyan" onclick="createCustomBrandItem()">✂️ 新作製作(¥35,000)</button>
          <button class="btn btn-lime" onclick="runGuerrillaDrop()">🔥 ゲリラ抽選販売</button>
        </div></div>`;
    } else if (state.growClass === 'promoter') {
      bodyHtml = `<div class="panel"><div class="sec-title"><span>🎤 地下MCバトル興行 ＆ レアラッパー召喚</span></div>
        <div class="shop-item"><div class="shop-info"><h4>🏞️ 深夜パーク自主ジャム</h4><p>貸切¥20,000 / レアラッパー乱入率 55%</p></div><button class="btn btn-cyan" style="width:auto;padding:7px 10px;" onclick="hostPromoterEvent(false)">開催</button></div>
        <div class="shop-item"><div class="shop-info"><h4>🏟️ 大箱クラブ貸切フェス</h4><p>貸切¥55,000 / レアラッパー100%確定召喚！</p></div><button class="btn btn-gold" style="width:auto;padding:7px 10px;" onclick="hostPromoterEvent(true)">開催</button></div></div>`;
    }
  } else if (chartSubTab === 'rank') {
    const myPref = PREFECTURES[state.profile.prefIndex]?.label || 'TOKYO';
    const baseBoard = [
      { name: 'QUEEN VERA', side: 'a_side', pref: 'TOKYO', wealth: 740000, viral: 88000 },
      { name: 'PHANTOM-K', side: 'b_side', pref: 'OSAKA', wealth: 520000, viral: 71000 },
      { name: 'KOLD-KID', side: 'a_side', pref: myPref, wealth: 310000, viral: 42000 },
      { name: state.profile.artistName + ' (YOU)', side: state.profile.side, pref: myPref, wealth: myWealth, viral: state.tracks.reduce((s, t) => s + t.streams, 0), isMe: true }
    ].concat(state.cloud.remotePlayers || []);
    const filtered = rankAxis === 'local' ? baseBoard.filter(r => r.pref === myPref) : baseBoard;
    filtered.sort((a, b) => rankAxis === 'viral' ? (b.viral || 0) - (a.viral || 0) : b.wealth - a.wealth);
    bodyHtml = `<div class="subtab-bar"><button class="subtab-btn ${rankAxis === 'wealth' ? 'active' : ''}" onclick="rankAxis='wealth';renderChartTab()">👑 総合資産</button>
      <button class="subtab-btn ${rankAxis === 'viral' ? 'active' : ''}" onclick="rankAxis='viral';renderChartTab()">🔥 バイラル</button>
      <button class="subtab-btn ${rankAxis === 'local' ? 'active' : ''}" onclick="rankAxis='local';renderChartTab()">📍 地元(${myPref})</button></div>
      <div class="panel">${filtered.slice(0, 8).map((r, i) => `<div style="display:flex;justify-content:space-between;padding:6px 4px;border-bottom:1px solid rgba(255,255,255,0.07);font-size:11px;${r.isMe ? 'color:var(--accent-cyan);font-weight:900;' : ''}">
        <span>#${i + 1} ${r.side === 'b_side' ? '📼' : '💿'} ${escapeHtml(r.name)}</span>
        <span style="font-family:monospace;">${rankAxis === 'viral' ? `${(r.viral || 0).toLocaleString()}再生` : `¥${(r.wealth || 0).toLocaleString()}`}</span></div>`).join('')}
        <button class="btn btn-cyan" style="margin-top:7px;padding:7px;font-size:10.5px;" onclick="openCloudModal()">☁️ cyber_rapper_db クラウド同期・設定</button></div>`;
  } else {
    bodyHtml = `<div class="panel" style="border-color:rgba(255,200,59,0.5);">
      <div style="font-size:12px;font-weight:900;color:var(--accent-gold);margin-bottom:4px;">👑 引退（マイクを置く）＆ 次世代ルーキー継承</div>
      <p style="font-size:10px;color:var(--text-sub);margin-bottom:7px;">現キャラを永久保存『LEGENDカード』として殿堂入りさせ、資産25%＆レーベルを引き継いで「別の現役グロウ機能」を試せる次世代ルーキーを開始します。</p>
      ${canRetire ? `<input type="text" id="new-label-name" placeholder="創設・継承レーベル名（任意）" style="margin-bottom:6px;"><button class="btn btn-gold" onclick="retireAndFoundLabel()">👑 殿堂入りして次世代ルーキーへ継承</button>`
        : `<button class="btn" disabled style="opacity:0.5;">🔒 条件：Respect 200 または 総資産¥400,000以上</button>`}
    </div>
    ${(state.legendArchive || []).map(lg => `<div class="shop-item"><div class="shop-info"><h4 style="color:var(--accent-gold);">🏆 LEGEND: ${escapeHtml(lg.name)}</h4><p>${lg.side === 'b_side' ? '📼 B-SIDE' : '💿 A-SIDE'} / 総資産 ¥${lg.wealth.toLocaleString()} / GROW: ${lg.grow || 'NONE'}</p></div></div>`).join('')}`;
  }

  const navBar = `<div class="subtab-bar">
    <button class="subtab-btn ${chartSubTab === 'grow' ? 'active' : ''}" onclick="chartSubTab='grow';renderChartTab()">⚡ 現役グロウ</button>
    <button class="subtab-btn ${chartSubTab === 'rank' ? 'active' : ''}" onclick="chartSubTab='rank';renderChartTab()">🏆 全国番付・DB</button>
    <button class="subtab-btn ${chartSubTab === 'retire' ? 'active' : ''}" onclick="chartSubTab='retire';renderChartTab()">👑 殿堂・引退</button>
  </div>${bodyHtml}`;
  setCockpitView(stageHtml, navBar);
}

/* --- Cloud DB (cyber_rapper_db: 1TgkYd6IdJagmZhGsrlpowokXtm3E5bw1FC4UeT_UUtg) & GAS LockService --- */
async function syncCloudData(mode) {
  const url = (state.cloud && state.cloud.gasUrl || '').trim();
  if (!url) { if (mode !== 'silent') showToast('☁️ GAS URL未設定のためローカル集計で動作中です'); return; }
  try {
    const pref = PREFECTURES[state.profile.prefIndex]?.label || 'TOKYO';
    const payload = {
      action: mode === 'load' ? 'load' : 'upsert',
      player_id: state.cloud.playerId, pin_code: state.cloud.pinCode || '0000',
      mc_name: state.profile.artistName, side: state.profile.side, gender: state.profile.gender,
      age_tier: state.profile.ageTier, rep_pref: pref, grow_class: state.growClass || '',
      level: state.level, cash: state.cash, drip: getDripValue(), total_wealth: state.cash + getDripValue(),
      respect: state.respect, area: STREET_ZONES[state.areaIndex]?.id || 'LOCAL',
      label_name: getLabelTitle(state.profile.affiliatedLabelId), save_json: JSON.stringify(state)
    };
    const res = await fetch(url, { method: 'POST', body: JSON.stringify(payload) });
    const data = await res.json();
    if (data.dominance) { state.cloud.remoteAScore = data.dominance.a; state.cloud.remoteBScore = data.dominance.b; }
    if (Array.isArray(data.players)) state.cloud.remotePlayers = data.players;
    if (mode === 'load' && data.save_json) {
      state = migrateStateToV8(JSON.parse(data.save_json));
      saveState(); closeModal(); continueFromTitle();
      return showToast('☁️ クラウドDBからセーブデータを復元しました！');
    }
    saveState();
    if (mode !== 'silent') showToast('☁️ cyber_rapper_db と排他ロック同期完了！');
  } catch (e) {
    if (mode !== 'silent') showToast('⚠️ クラウド通信エラー（ローカル保存は完了しています）');
  }
}

function getGasTemplateCode() {
  return `const SHEET_ID = '1TgkYd6IdJagmZhGsrlpowokXtm3E5bw1FC4UeT_UUtg';
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const p = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sh = ss.getSheets()[0];
    const rows = sh.getDataRange().getValues();
    if (rows.length === 0 || rows[0][0] !== 'player_id') {
      sh.clear();
      sh.appendRow(['player_id','pin_code','mc_name','side','gender','age_tier','rep_pref','grow_class','level','cash','drip','total_wealth','respect','area','label_name','updated_at','save_json']);
    }
    const all = sh.getDataRange().getValues();
    let idx = all.findIndex((r, i) => i > 0 && String(r[0]) === String(p.player_id));
    if (p.action === 'load') {
      if (idx < 0 || String(all[idx][1]) !== String(p.pin_code)) return ContentService.createTextOutput(JSON.stringify({error:'PIN mismatch'})).setMimeType(ContentService.MimeType.JSON);
      return ContentService.createTextOutput(JSON.stringify({save_json: all[idx][16]})).setMimeType(ContentService.MimeType.JSON);
    }
    const rowData = [p.player_id, p.pin_code, p.mc_name, p.side, p.gender, p.age_tier, p.rep_pref, p.grow_class, p.level, p.cash, p.drip, p.total_wealth, p.respect, p.area, p.label_name, new Date().toISOString(), p.save_json];
    if (idx > 0) { if (String(all[idx][1]) !== String(p.pin_code)) throw new Error('PIN'); sh.getRange(idx + 1, 1, 1, rowData.length).setValues([rowData]); }
    else sh.appendRow(rowData);
    const updated = sh.getDataRange().getValues().slice(1);
    let a = 1000, b = 1000;
    const players = updated.map(r => { const sc = Math.floor(Number(r[11]||0)/1000) + Number(r[12]||0)*10; if (r[3]==='b_side') b+=sc; else a+=sc; return {name:r[2], side:r[3], pref:r[6], wealth:Number(r[11]||0), viral:Number(r[12]||0)*120}; });
    return ContentService.createTextOutput(JSON.stringify({ok:true, dominance:{a,b}, players})).setMimeType(ContentService.MimeType.JSON);
  } finally { lock.releaseLock(); }
}`;
}

function openCloudModal() {
  const m = document.getElementById('modal-layer');
  m.innerHTML = `<div class="modal-header"><span class="modal-title">☁️ CLOUD DB // cyber_rapper_db 連携</span><button class="modal-close" onclick="closeModal()">✕ 閉じる</button></div>
    <div class="modal-body">
      <div class="panel">
        <div style="font-size:10px;color:var(--text-sub);margin-bottom:5px;">MC ID と 4桁PIN で複数端末同期＆A/B勢力ゲージ集計を行います。</div>
        <div style="display:grid;grid-template-columns:1fr 100px;gap:6px;margin-bottom:6px;">
          <input type="text" id="cld-id" value="${escapeHtml(state.cloud.playerId)}" placeholder="MC ID">
          <input type="text" id="cld-pin" maxlength="4" value="${escapeHtml(state.cloud.pinCode)}" placeholder="4桁PIN">
        </div>
        <input type="text" id="cld-url" value="${escapeHtml(state.cloud.gasUrl || '')}" placeholder="GAS WebアプリURL (https://script.google.com/...)" style="margin-bottom:7px;">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
          <button class="btn btn-cyan" onclick="saveCloudCfg();syncCloudData('upsert')">☁️ クラウド保存・同期</button>
          <button class="btn btn-lime" onclick="saveCloudCfg();syncCloudData('load')">📥 クラウドから復元</button>
        </div>
      </div>
      <div class="panel">
        <div style="font-size:10.5px;font-weight:900;margin-bottom:4px;">📋 スプレッドシート用 GAS排他ロックコード</div>
        <button class="btn" onclick="navigator.clipboard?.writeText(getGasTemplateCode());showToast('📋 GAS排他ロック用コードをコピーしました！')">📋 GASコードをワンクリックコピー</button>
      </div>
    </div>`;
  m.classList.add('open');
}

function saveCloudCfg() {
  state.cloud.playerId = (document.getElementById('cld-id')?.value || '').trim() || state.cloud.playerId;
  state.cloud.pinCode = (document.getElementById('cld-pin')?.value || '0000').trim();
  state.cloud.gasUrl = (document.getElementById('cld-url')?.value || '').trim();
  saveState();
}

function retireAndFoundLabel() {
  const name = document.getElementById('new-label-name')?.value.trim() || `${state.profile.artistName} RECORDS`;
  let labelId = state.profile.affiliatedLabelId;
  if (!labelId) {
    const serial = `LABEL #${String(state.worldLabels.length + 1).padStart(4, '0')}`;
    labelId = 'lbl_' + Date.now();
    state.worldLabels.push({ id: labelId, serial, name, founder: state.profile.artistName, buffType: 'music' });
  }
  state.legendArchive.push({
    name: state.profile.artistName, side: state.profile.side, wealth: state.cash + getDripValue(),
    grow: state.growClass, gen: state.generationCount || 1
  });
  state.generationCount = (state.generationCount || 1) + 1;
  state.level = 1; state.exp = 0; state.nextExp = 100;
  state.cash = Math.floor(state.cash * 0.25) + 35000; state.respect = 40;
  state.growClass = null;
  state.profile.currentJobId = null; state.profile.hasQuitJob = false;
  state.profile.outfitId = 'init_hoodie';
  state.profile.artistName = `${state.profile.artistName.replace(/ II+$/, '')} II`;
  state.profile.affiliatedLabelId = labelId;
  creatorStep = 1; saveState(); syncCloudData('silent'); renderCreator(false);
  triggerSlashCutIn('HALL OF FAME!!', `NEXT GEN ROOKIE READY`, '#ffc83b');
}
