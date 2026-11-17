/* =========================================================================
   CYBER RAPPER // 1ST-PERSON 4-WAY GRID STREET, MINIMAP & JOB GACHA v8.0
   Landmark BG Switch + Persistent Radar + Job Gacha + Roots Unlock Battle
   ========================================================================= */

const STREET_ZONES = [
  {
    id: 'LOCAL', title: 'LOCAL // 地元・高架下グラフィティ街', sky: '#140d26', neonA: '#00f0ff', neonB: '#ff2e93', bossRoot: 'neotrap',
    landmarks: [
      { x: 3, y: 6, tag: 'HOME', ico: '🏠', sign: 'APT // 204', color: '#00f0ff', name: '場末の6畳アパート拠点', desc: '衣装・0px素体メイクや髪型変更が可能。', act: '✏️ メイク・髪型変更', fn: 'creatorStep=1;renderCreator(true)' },
      { x: 3, y: 3, tag: 'PARK', ico: '🎤', sign: 'MIDNIGHT PARK', color: '#c8ff29', name: '深夜のストリート公園', desc: '視界が開けた溜まり場。サイファーで韻を磨け。', act: '🎤 サイファー鍛錬へ', fn: "switchTab('hustle')" },
      { x: 5, y: 3, tag: 'RECORD', ico: '💿', sign: 'DIGGERS RECORD', color: '#ffc83b', name: '路地奥のレコードショップ', desc: '解放済みルーツの新トラック（2・3曲目）をCashでディグ！', act: '💿 レコード屋でディグる', fn: "state.shopMode='record';switchTab('shop')" },
      { x: 1, y: 4, tag: 'SHOP', ico: '👕', sign: 'LOCAL THRIFT EC', color: '#b86bff', name: '高架下ストリートセレクト', desc: 'Dripを高めるアパレル・チェーン・防音室を購入。', act: '👕 アパレルECを開く', fn: "state.shopMode='ec';switchTab('shop')" },
      { x: 3, y: 1, tag: 'STATION', ico: '🚉', sign: 'SUBWAY STA.', color: '#38bdf8', name: '地下鉄ローカル駅', desc: '都心（METRO）や湾岸（PORT）へ電車移動。', act: '🚉 都心METROへ移動', fn: 'travelByTrain(1)' },
      { x: 3, y: 0, tag: 'BOSS', ico: '🔥', sign: 'BULL-DOG', color: '#ff3358', name: '地元番長 BULL-DOG (Lv.3)', desc: '撃破で新たな通常ルーツ（全3曲枠）が解放＆レコード屋入荷！', act: '🔥 ボスMCバトル挑発！', fn: 'startBossBattle(0)', bossStyle: 'boss_local' }
    ]
  },
  {
    id: 'METRO', title: 'METRO // 都心・摩天楼ネオン大通り', sky: '#0c122c', neonA: '#ff2e93', neonB: '#00f0ff', bossRoot: 'melodic',
    landmarks: [
      { x: 3, y: 6, tag: 'STATION', ico: '🚉', sign: 'METRO CENTRAL', color: '#38bdf8', name: '都心メトロ中央改札', desc: '湾岸（PORT）または地元（LOCAL）へ移動。', act: '🚉 湾岸PORTへ移動', fn: 'travelByTrain(2)' },
      { x: 1, y: 4, tag: 'SHOP', ico: '👕', sign: 'ARCHIVE EC', color: '#00f0ff', name: 'ARCHIVE SELECT 都心旗艦店', desc: '限定モヘアやタクティカルJKTを試着購入。', act: '👕 アパレルECを開く', fn: "state.shopMode='ec';switchTab('shop')" },
      { x: 5, y: 4, tag: 'RECORD', ico: '💿', sign: 'SHIBUYA VINYL', color: '#ffc83b', name: 'SHIBUYA ヴァイナルラボ', desc: '解放済みルーツの未所持トラックをCashで購入。', act: '💿 レコード屋でディグる', fn: "state.shopMode='record';switchTab('shop')" },
      { x: 3, y: 3, tag: 'VIP', ico: '🥂', sign: 'CLUB VORTEX', color: '#c8ff29', name: '大箱クラブ『VORTEX VIP』', desc: 'Drip ¥45,000以上で入場可能なセレブラウンジ。', act: '🥂 VIPライブ＆報酬獲得', fn: 'enterVipClub()' },
      { x: 3, y: 0, tag: 'BOSS', ico: '👑', sign: 'QUEEN VERA', color: '#ff2e93', name: '首都圏女帝 QUEEN VERA (Lv.6)', desc: '撃破で新たな通常ルーツ（全3曲枠）解放＆女帝パーツ解禁！', act: '👑 女帝にバトル挑発！', fn: 'startBossBattle(1)', bossStyle: 'boss_queen' }
    ]
  },
  {
    id: 'PORT', title: 'PORT // 湾岸・第3倉庫ベイストリート', sky: '#071c22', neonA: '#c8ff29', neonB: '#00f0ff', bossRoot: 'yarddub',
    landmarks: [
      { x: 3, y: 6, tag: 'STATION', ico: '🚉', sign: 'BAY MONORAIL', color: '#38bdf8', name: 'ベイサイド・モノレール駅', desc: '地元（LOCAL）へ電車で戻る。', act: '🚉 地元LOCALへ戻る', fn: 'travelByTrain(0)' },
      { x: 1, y: 4, tag: 'PIER', ico: '💼', sign: 'PIER #03', color: '#c8ff29', name: '深夜の第3コンテナ埠頭', desc: '高報酬の湾岸クーリエ案件（報酬倍率UP）。', act: '💼 埠頭シノギ実行', fn: 'runPierHustle()' },
      { x: 5, y: 4, tag: 'STUDIO', ico: '🎛️', sign: 'BAY STUDIO', color: '#00f0ff', name: '海沿いコンテナ録音ブース', desc: '所持トラックと蓄積リリックで新曲をドロップ。', act: '🎛️ スタジオへ入る', fn: "switchTab('studio')" },
      { x: 5, y: 2, tag: 'RECORD', ico: '💿', sign: 'CARGO RECORDS', color: '#ffc83b', name: '海上コンテナ・レコード店', desc: '輸入盤トラックをCashでディグ＆試聴。', act: '💿 レコード屋でディグる', fn: "state.shopMode='record';switchTab('shop')" },
      { x: 3, y: 0, tag: 'BOSS', ico: '🔊', sign: 'CAPT. DUB', color: '#22c55e', name: '湾岸重鎮 CAPTAIN DUB (Lv.5)', desc: '撃破で重低音ルーツ（全3曲枠）を解放！', act: '🔊 重鎮にバトル挑発！', fn: 'startBossBattle(2)', bossStyle: 'boss_dub' }
    ]
  }
];

const STREET_RIVALS = [
  {
    id: 'r_neo', name: 'LIL NEO', title: '野良トラッパー', style: 'trap', lv: 1, rewardCash: 18000, exp: 48,
    taunt: 'ペラい服で何歩けんの？ ここは俺らのネオン街（がい）', targetVowel: 'ai',
    answers: [
      { text: '見栄よりスキルで切り開く俺の時代（じだい）', quality: 'perfect' },
      { text: '高架下の底辺から奪い取る王冠（おうかん）', quality: 'good' },
      { text: 'うるせえ黙って道あけろよ', quality: 'weak' }
    ]
  },
  {
    id: 'r_rina', name: 'RINA-X', title: '毒舌フィメールMC', style: 'diva', lv: 2, rewardCash: 24000, exp: 62,
    taunt: '口だけ達者なルーキー、ステージじゃ即フリーズ（いーず）', targetVowel: 'iu',
    answers: [
      { text: '凍る空気すら熱に変えるビートでクルーズ', quality: 'perfect' },
      { text: 'ダイヤよりも光る言葉をマイクに乗せる', quality: 'good' },
      { text: 'フリーズなんかしないぜ覚悟しろ', quality: 'weak' }
    ]
  },
  {
    id: 'r_boom', name: 'DJ K-BOOM', title: '90s原理主義MC', style: 'boom', lv: 2, rewardCash: 26000, exp: 68,
    taunt: 'メッキの流行りじゃ響かない本物のフロア（おあ）', targetVowel: 'oa',
    answers: [
      { text: '過去の記憶も未来も揺らす俺のコア（こあ）', quality: 'perfect' },
      { text: '重低音の鼓動でストリートの夜を制す', quality: 'good' },
      { text: '古いスタイルはもう終わりなんだよ', quality: 'weak' }
    ]
  }
];

const RARE_RAPPERS = [
  {
    id: 'rare_mc_phantom', name: 'PHANTOM-K', title: '★隠しレアラッパー', style: 'rare_phantom', lv: 4, rewardCash: 95000, exp: 190, isRare: true, dropRoot: 'rare_glitch',
    taunt: '網膜に焼き付けるノイズ、消えたアーカイブの亡霊（おうえい）', targetVowel: 'oe',
    answers: [
      { text: '闇夜の路地裏に轟かす俺の証明（しょうめい）', quality: 'perfect' },
      { text: '幻のビートごと丸ごと頂戴するぜ今夜', quality: 'good' },
      { text: 'レアだろうが関係なく倒すだけ', quality: 'weak' }
    ]
  },
  {
    id: 'rare_mc_smoke', name: 'SMOKE-J', title: '★幻の深夜ジャズMC', style: 'rare_smoke', lv: 5, rewardCash: 115000, exp: 220, isRare: true, dropRoot: 'rare_jazz',
    taunt: '紫煙の向こう側、一発録りの美学に酔う（おう）', targetVowel: 'ou',
    answers: [
      { text: '琥珀色のループの上で刻む最高のフロウ（ふろう）', quality: 'perfect' },
      { text: '夜の静寂を切り裂くマイク一本勝負', quality: 'good' },
      { text: 'ジャズのリズムにも乗ってみせるさ', quality: 'weak' }
    ]
  },
  {
    id: 'rare_mc_noir', name: 'LADY NOIR', title: '★電脳ヴァルキリーMC', style: 'rare_noir', lv: 6, rewardCash: 140000, exp: 260, isRare: true, dropRoot: 'rare_cyber',
    taunt: '光速のBPM、ついて来れるかしらこの領域（りょういき）', targetVowel: 'oi',
    answers: [
      { text: '限界突破の韻で塗り替えるストリートの常識（じょうしき）', quality: 'perfect' },
      { text: 'ネオンの嵐の中で誰よりも強く輝く', quality: 'good' },
      { text: 'どれだけ速くても絶対負けない', quality: 'weak' }
    ]
  }
];

const DISTRICT_BOSSES = [
  {
    id: 'boss_bulldog', name: 'BULL-DOG', title: 'LOCAL BOSS', style: 'boss_local', lv: 3, rewardCash: 75000, exp: 165, isBoss: true, unlockRoot: 'neotrap',
    taunt: '俺の高架下で成り上がりたいなら韻で黙らせろ覚悟（かくご）', targetVowel: 'uo',
    answers: [
      { text: '泥水すすった過去ごと変える王者の幕開けと覚悟（かくご）', quality: 'perfect' },
      { text: '6畳のノイズから全国チャートへ成り上がる', quality: 'good' },
      { text: 'あんたを倒して俺が一番になる', quality: 'weak' }
    ]
  },
  {
    id: 'boss_vera', name: 'QUEEN VERA', title: 'METRO EMPRESS', style: 'boss_queen', lv: 6, rewardCash: 185000, exp: 320, isBoss: true, unlockRoot: 'melodic',
    taunt: '都心のネオンもダイヤも私に跪く王座（おうざ）', targetVowel: 'oa',
    answers: [
      { text: '王冠ごと奪い取るアンダーグラウンドの猛者（もうざ）', quality: 'perfect' },
      { text: 'メッキの王座よりリアルな声でフロアを揺らす', quality: 'good' },
      { text: '都心のトップも今日から交代だ', quality: 'weak' }
    ]
  },
  {
    id: 'boss_dub', name: 'CAPTAIN DUB', title: 'PORT KINGPIN', style: 'boss_dub', lv: 5, rewardCash: 140000, exp: 245, isBoss: true, unlockRoot: 'yarddub',
    taunt: '海の底まで揺れるベース、お前の言葉は軽い泡（あわ）', targetVowel: 'aa',
    answers: [
      { text: '荒波すら黙らす魂を込めた俺のパワー（ぱわー）', quality: 'perfect' },
      { text: '潮風と錆びた倉庫に響かせる鋼のビート', quality: 'good' },
      { text: '揺れないように全力でラップするぜ', quality: 'weak' }
    ]
  }
];

let activeBattle = null;
let pendingJobOffer = null;
let stepZoomClass = '';

const DIR_VECS = { N: [0, -1], E: [1, 0], S: [0, 1], W: [-1, 0] };
const DIR_ORDER = ['N', 'E', 'S', 'W'];
const DIR_ARROW = { N: '▲', E: '▶', S: '▼', W: '◀' };
const DIR_JP = { N: '北(奥)', E: '東(右)', S: '南(手前)', W: '西(左)' };

function ensureMapState() {
  const z = STREET_ZONES[state.areaIndex] || STREET_ZONES[0];
  if (!state.mapState || state.mapState.areaId !== z.id) {
    state.mapState = { areaId: z.id, x: 3, y: 6, dir: 'N', visited: ['3,6'] };
  }
  return state.mapState;
}

function gainExp(amount) {
  state.exp = (state.exp || 0) + amount;
  state.level = state.level || 1;
  state.nextExp = state.nextExp || 100;
  let lvUp = false;
  while (state.exp >= state.nextExp) {
    state.exp -= state.nextExp;
    state.level += 1;
    state.nextExp = Math.floor(state.nextExp * 1.45);
    state.respect += 20;
    state.stats.lyric += 2; state.stats.flow += 2; state.stats.vibes += 2;
    lvUp = true;
  }
  if (lvUp) {
    triggerSlashCutIn(`LEVEL UP! LV.${state.level}`, 'ALL STATS +2 & NEW PARTS!', '#ffc83b');
    showToast(`🎉 Lv.${state.level} 到達！全ステータス上昇＆新パーツ解放！`);
  }
}

/* --- First-Person Street Viewport + Coordinate Landmark BG + Persistent Mini-Map --- */
function renderStreetTab() {
  if (activeBattle) return renderBattleArena();
  const zone = STREET_ZONES[state.areaIndex] || STREET_ZONES[0];
  const ms = ensureMapState();
  const hereSpot = zone.landmarks.find(l => l.x === ms.x && l.y === ms.y) || null;
  const [dx, dy] = DIR_VECS[ms.dir] || [0, -1];
  const aheadSpot = zone.landmarks.find(l => l.x === ms.x + dx && l.y === ms.y + dy) || null;
  const sideObj = getSideTheme();

  const bgKey = hereSpot ? `bg_${zone.id.toLowerCase()}_${hereSpot.tag.toLowerCase()}.jpg` : `bg_${zone.id.toLowerCase()}_alley_${(ms.x + ms.y) % 3}.jpg`;
  const customBgUrl = AssetImageCache.resolve(bgKey, () => { if (state.currentTab === 'street' && !activeBattle) renderStreetTab(); });

  /* Persistent 7x7 Neon Radar Mini-Map */
  let miniCells = '';
  for (let gy = 0; gy < 7; gy++) {
    for (let gx = 0; gx < 7; gx++) {
      const key = `${gx},${gy}`;
      const isMe = gx === ms.x && gy === ms.y;
      const lm = zone.landmarks.find(l => l.x === gx && l.y === gy);
      const vis = ms.visited.includes(key);
      const bg = isMe ? sideObj.sub : lm ? lm.color : vis ? 'rgba(0,240,255,0.26)' : 'rgba(255,255,255,0.05)';
      miniCells += `<div class="mm-cell" style="background:${bg};color:${isMe ? '#050508' : '#fff'};" title="${lm ? lm.name : key}">${isMe ? DIR_ARROW[ms.dir] : (lm ? '•' : '')}</div>`;
    }
  }

  const signCol = (hereSpot || aheadSpot)?.color || zone.neonA;
  const signText = hereSpot ? hereSpot.sign : aheadSpot ? `AHEAD: ${aheadSpot.sign}` : `${zone.id} [${ms.x},${ms.y}] ${ms.dir}`;
  const alleyShift = ((ms.x * 17 + ms.y * 11) % 5) * 6 - 12;

  const stageHtml = `
    <div class="stage-monitor ${stepZoomClass}" style="background:${customBgUrl ? `url('${customBgUrl}') center/cover no-repeat` : `linear-gradient(180deg, ${zone.sky} 0%, #06060d 62%, #0c0d18 100%)`};">
      <div class="rain-layer"></div>
      <div class="stage-monitor-badge" style="right:94px;">
        <span class="mon-pill" style="color:${zone.neonA};">${zone.id} (${ms.x},${ms.y}) ${DIR_JP[ms.dir]}</span>
      </div>

      <div class="minimap-box">
        <div class="minimap-grid">${miniCells}</div>
        <div style="font-size:7.5px;text-align:center;color:var(--text-sub);font-family:monospace;margin-top:2px;">NEON RADAR</div>
      </div>

      ${!customBgUrl ? `
      <svg viewBox="0 0 400 224" width="100%" height="100%" preserveAspectRatio="none" style="position:absolute;inset:0;">
        <polygon points="0,0 ${145 + alleyShift},78 ${145 + alleyShift},156 0,224" fill="#0b0d19" stroke="${zone.neonA}" stroke-width="1" opacity="0.92"/>
        <polygon points="400,0 ${255 + alleyShift},78 ${255 + alleyShift},156 400,224" fill="#090b16" stroke="${zone.neonB}" stroke-width="1" opacity="0.92"/>
        <polygon points="0,224 ${145 + alleyShift},156 ${255 + alleyShift},156 400,224" fill="#0d1020"/>
        <line x1="200" y1="158" x2="200" y2="224" stroke="${signCol}" stroke-width="2" stroke-dasharray="7 6" opacity="0.55"/>
        <rect x="${132 + alleyShift}" y="38" width="136" height="32" rx="5" fill="rgba(5,6,12,0.9)" stroke="${signCol}" stroke-width="2"/>
        <text x="${200 + alleyShift}" y="58" text-anchor="middle" font-family="monospace" font-weight="900" font-size="11.5" fill="${signCol}">${signText}</text>
        ${hereSpot ? `<rect x="${155 + alleyShift}" y="82" width="90" height="74" rx="4" fill="${hereSpot.color}" opacity="0.22" stroke="${hereSpot.color}" stroke-width="1.8"/>` : ''}
      </svg>` : ''}

      ${hereSpot && hereSpot.bossStyle ? `<div class="char-breathe" style="position:absolute;bottom:0;left:calc(50% - 62px);width:124px;height:166px;z-index:7;filter:drop-shadow(0 0 14px ${hereSpot.color});">${renderRivalSVG(hereSpot.bossStyle)}</div>` : ''}
      <div class="char-breathe" style="position:absolute;bottom:-8px;left:6px;width:96px;height:132px;z-index:8;pointer-events:none;opacity:0.94;">
        ${renderAvatarSVG(state.profile, sideObj.color, { transparentBg: true, camera: 'bust' })}
      </div>
    </div>`;

  const jobCard = pendingJobOffer ? `
    <div class="panel" style="border-color:var(--accent-gold);background:linear-gradient(135deg,#1d1726,#0e0f1a);">
      <div style="display:flex;justify-content:space-between;font-size:10px;font-weight:900;color:var(--accent-gold);">
        <span>🎰 STREET JOB GACHA // ${pendingJobOffer.stars}</span><span>定期給 ¥${pendingJobOffer.wage.toLocaleString()}</span>
      </div>
      <div style="font-size:12.5px;font-weight:900;margin:3px 0;">${pendingJobOffer.name}</div>
      <div style="font-size:9.5px;color:var(--text-sub);margin-bottom:5px;">${pendingJobOffer.flavor}<br>
        <span style="color:var(--accent-lime);font-family:monospace;">格差バフ: LYR+${pendingJobOffer.statBonus.lyric} / FLW+${pendingJobOffer.statBonus.flow} / VIB+${pendingJobOffer.statBonus.vibes} ＋ 専用私服解放</span>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
        <button class="btn btn-gold" style="padding:7px;" onclick="acceptJobOffer('${pendingJobOffer.id}')">✅ この職に就く</button>
        <button class="btn" style="padding:7px;" onclick="pendingJobOffer=null;renderStreetTab()">見送る</button>
      </div>
    </div>` : '';

  const deckHtml = `
    ${jobCard}
    <div class="fp-nav-layout">
      <div class="fp-dpad">
        <div></div>
        <button class="fp-pad-btn" onclick="moveGrid('F')">▲<span>前へ</span></button>
        <div></div>
        <button class="fp-pad-btn" onclick="moveGrid('L')">◀<span>左へ</span></button>
        <button class="fp-pad-btn" onclick="moveGrid('B')">▼<span>後退</span></button>
        <button class="fp-pad-btn" onclick="moveGrid('R')">▶<span>右へ</span></button>
      </div>
      <div class="panel" style="margin-bottom:0;display:flex;flex-direction:column;justify-content:center;border-color:${hereSpot ? hereSpot.color : 'var(--border)'};">
        ${hereSpot ? `
          <div style="font-size:11.5px;font-weight:900;color:${hereSpot.color};margin-bottom:2px;">${hereSpot.ico} ${hereSpot.name}</div>
          <div style="font-size:9.5px;color:var(--text-sub);margin-bottom:6px;">${hereSpot.desc}</div>
          <button class="btn btn-lime" style="padding:7px 8px;font-size:11px;" onclick="${hereSpot.fn}">${hereSpot.act}</button>
        ` : `
          <div style="font-size:11px;font-weight:900;margin-bottom:2px;">👣 一人称ストリート探索中</div>
          <div style="font-size:9.5px;color:var(--text-sub);">${aheadSpot ? `正面1歩先に『${aheadSpot.name}』が見える！` : '前後左右に1歩進むたび景色が変化！求人ガチャ・敵サイド刺客・レアラッパーと遭遇！'}</div>
        `}
      </div>
    </div>

    <div class="sec-title"><span>📍 発見済みスポット直行 ＆ 路線移動</span><span>♪ ${getEquippedTrackTitle()}</span></div>
    <div class="chip-grid" style="margin-bottom:6px;">
      ${zone.landmarks.map(lm => `<span class="opt-chip ${hereSpot === lm ? 'selected' : ''}" style="border-color:${lm.color}66;" onclick="warpToLandmark(${lm.x},${lm.y})">${lm.ico} ${lm.tag}</span>`).join('')}
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;">
      ${STREET_ZONES.map((z, idx) => `<button class="btn ${state.areaIndex === idx ? 'btn-primary' : ''}" style="padding:7px 4px;font-size:10px;" onclick="travelByTrain(${idx})">🚉 ${z.id}</button>`).join('')}
    </div>`;

  setCockpitView(stageHtml, deckHtml);
}

function moveGrid(rel) {
  const ms = ensureMapState();
  const idx = DIR_ORDER.indexOf(ms.dir);
  const moveDir = rel === 'F' ? ms.dir : rel === 'B' ? DIR_ORDER[(idx + 2) % 4] : rel === 'L' ? DIR_ORDER[(idx + 3) % 4] : DIR_ORDER[(idx + 1) % 4];
  ms.dir = rel === 'B' ? ms.dir : moveDir;
  const [dx, dy] = DIR_VECS[moveDir];
  ms.x = Math.max(0, Math.min(6, ms.x + dx));
  ms.y = Math.max(0, Math.min(6, ms.y + dy));
  const key = `${ms.x},${ms.y}`;
  if (!ms.visited.includes(key)) ms.visited.push(key);

  stepZoomClass = 'fp-step-anim';
  setTimeout(() => { stepZoomClass = ''; }, 260);
  if (Math.random() < 0.35) advanceWorldTime(); else saveState();

  const zone = STREET_ZONES[state.areaIndex] || STREET_ZONES[0];
  const onSpot = zone.landmarks.some(l => l.x === ms.x && l.y === ms.y);

  if (!onSpot) {
    const roll = Math.random();
    if (!state.profile.hasQuitJob && !pendingJobOffer && roll < 0.22) {
      const rRoll = Math.random();
      const tier = rRoll < 0.12 ? 3 : rRoll < 0.46 ? 2 : 1;
      const pool = STREET_JOBS.filter(j => j.rarity === tier);
      pendingJobOffer = pool[Math.floor(Math.random() * pool.length)];
      triggerSlashCutIn(tier === 3 ? 'SSR SCOUT!!' : 'JOB FOUND!', pendingJobOffer.name, tier === 3 ? '#ffc83b' : '#00f0ff');
      renderStreetTab();
      return;
    }
    if (roll >= 0.22 && roll < 0.27) {
      const rare = RARE_RAPPERS[Math.floor(Math.random() * RARE_RAPPERS.length)];
      return launchBattle(rare);
    }
    if (roll >= 0.27 && roll < 0.36) {
      const enemySide = state.profile.side === 'a_side' ? 'b_side' : 'a_side';
      const sInfo = SIDES[enemySide];
      return launchBattle({
        id: 'assassin_' + enemySide, name: `${sInfo.short} ASSASSIN`, title: '敵対サイド刺客MC',
        style: enemySide === 'a_side' ? 'assassin_a' : 'assassin_b', lv: Math.max(1, state.level),
        rewardCash: 32000 + state.level * 4000, exp: 75, isAssassin: true,
        taunt: `${sInfo.short}がストリートを制す、お前のスタイルはここで終わり（おわり）`, targetVowel: 'ai',
        answers: [
          { text: `${SIDES[state.profile.side].short}の誇りとスキルで切り開く未来（みらい）`, quality: 'perfect' },
          { text: '敵対サイドの刺客ごと飲み込む俺のマイク', quality: 'good' },
          { text: 'どっちのサイドが上か見せてやる', quality: 'weak' }
        ]
      });
    }
    if (roll >= 0.36 && roll < 0.50) {
      return launchBattle(STREET_RIVALS[Math.floor(Math.random() * STREET_RIVALS.length)]);
    }
  }
  renderStreetTab();
}

function warpToLandmark(tx, ty) {
  const ms = ensureMapState();
  ms.x = tx; ms.y = ty;
  const k = `${tx},${ty}`;
  if (!ms.visited.includes(k)) ms.visited.push(k);
  saveState(); renderStreetTab();
}

function acceptJobOffer(jobId) {
  const job = STREET_JOBS.find(j => j.id === jobId);
  if (!job) return;
  state.profile.currentJobId = job.id;
  if (!Array.isArray(state.claimedJobBonuses)) state.claimedJobBonuses = [];
  if (!state.claimedJobBonuses.includes(job.id)) {
    state.claimedJobBonuses.push(job.id);
    state.stats.lyric += job.statBonus.lyric;
    state.stats.flow += job.statBonus.flow;
    state.stats.vibes += job.statBonus.vibes;
  }
  if (!state.ownedOutfits.includes(job.outfitId)) state.ownedOutfits.push(job.outfitId);
  state.profile.outfitId = job.outfitId;
  pendingJobOffer = null;
  triggerSlashCutIn('HIRED & BUFFED!', `${job.name}`, '#c8ff29');
  showToast(`💼『${job.name}』に就業！専用衣装＆ハングリー基礎ステ獲得！`);
  updateHeader(); saveState(); renderStreetTab();
}

function travelByTrain(destIdx) {
  if (state.areaIndex === destIdx) return;
  const fare = destIdx === 1 ? 1800 : 800;
  if (state.cash < fare) return showToast(`🚉 電車賃（¥${fare.toLocaleString()}）が足りません！`);
  state.cash -= fare; state.areaIndex = destIdx;
  state.mapState = { areaId: STREET_ZONES[destIdx].id, x: 3, y: 6, dir: 'N', visited: ['3,6'] };
  advanceWorldTime(); renderStreetTab();
  showToast(`🚉 ${STREET_ZONES[destIdx].id} エリアへ到着！（-¥${fare.toLocaleString()}）`);
}

function enterVipClub() {
  const drip = getDripValue();
  if (drip < 45000) return showToast(`🚫 黒服「Drip ¥${drip.toLocaleString()} じゃVIP入場不可だ（要¥45,000）」`);
  const bonus = 52000 + (state.level || 1) * 7000;
  state.cash += bonus; state.respect += 22; gainExp(55); advanceWorldTime();
  triggerSlashCutIn('VIP ROCKED!!', `+¥${bonus.toLocaleString()}`, '#c8ff29');
  renderStreetTab();
}

function runPierHustle() {
  const mult = (state.profile.hasQuitJob ? 1.3 : 1.0) * getActiveLabelBuff('hustle');
  const reward = Math.floor(45000 * mult);
  if (Math.random() < 0.84) {
    state.cash += reward; gainExp(40);
    triggerSlashCutIn('HUSTLE CLEAR', `+¥${reward.toLocaleString()}`, '#00f0ff');
  } else showToast('🚨 湾岸パトロールに遭遇し撤退…');
  advanceWorldTime(); renderStreetTab();
}

function startBossBattle(idx) { launchBattle(DISTRICT_BOSSES[idx] || DISTRICT_BOSSES[0]); }

function launchBattle(rivalTemplate) {
  AudioEngine.playEquipped();
  triggerSlashCutIn(rivalTemplate.isRare ? 'RARE ENCOUNTER!!' : 'VERSUS!!', `VS ${rivalTemplate.name}`, rivalTemplate.isRare ? '#ffc83b' : '#ff2e93');
  activeBattle = {
    rival: rivalTemplate, round: 1, maxRounds: rivalTemplate.isBoss || rivalTemplate.isRare ? 3 : 2, hype: 50,
    choices: [...rivalTemplate.answers].sort(() => Math.random() - 0.5),
    lastLog: `♪ BGM: ${getEquippedTrackTitle()} // 韻を踏み返せ！`
  };
  renderBattleArena();
}

function renderBattleArena() {
  const b = activeBattle;
  if (!b) return renderStreetTab();
  const stageHtml = `
    <div class="stage-monitor" style="background:radial-gradient(circle at 50% 25%, #32102e 0%, #07070d 78%);border-color:var(--danger);">
      <div style="position:absolute;top:7px;left:10px;right:10px;z-index:12;">
        <div style="display:flex;justify-content:space-between;font-size:9.5px;font-weight:900;margin-bottom:3px;">
          <span style="color:var(--accent-lime);">YOU: ${b.hype}%</span>
          <span style="color:#fff;font-family:monospace;">ROUND ${b.round}/${b.maxRounds}</span>
          <span style="color:var(--danger);">${b.rival.name} (Lv.${b.rival.lv})</span>
        </div>
        <div class="hype-meter-bar"><div class="hype-fill-player" style="width:${b.hype}%;"></div></div>
      </div>
      <div class="char-breathe" style="position:absolute;left:4px;bottom:0;width:130px;height:166px;z-index:5;">
        ${renderAvatarSVG(state.profile, null, { transparentBg: true, camera: 'sprite' })}
      </div>
      <div style="position:absolute;left:50%;top:44%;transform:translate(-50%,-50%) rotate(-8deg);font-family:Impact,sans-serif;font-size:28px;color:#ffc83b;text-shadow:3px 3px 0 #050508;z-index:7;">VS</div>
      <div class="char-breathe" style="position:absolute;right:4px;bottom:0;width:130px;height:166px;z-index:5;transform:scaleX(-1);">
        ${renderRivalSVG(b.rival.style)}
      </div>
      <div style="position:absolute;left:8px;right:8px;bottom:6px;background:rgba(5,5,10,0.92);border:1px solid var(--danger);border-radius:9px;padding:6px 10px;z-index:10;">
        <div style="font-size:10.5px;font-weight:900;color:#fff;">${b.rival.name}「${b.rival.taunt}」</div>
        <div style="display:flex;justify-content:space-between;font-size:9px;margin-top:2px;">
          <span style="color:var(--accent-cyan);font-family:monospace;">🎯 脚韻ターゲット: [ …${b.rival.targetVowel} ]</span>
          <span style="color:var(--accent-lime);font-weight:800;">${b.lastLog}</span>
        </div>
      </div>
    </div>`;

  const deckHtml = `
    <div class="sec-title"><span>⚡ アンサー選択 または 自由手打ちカウンター</span></div>
    ${b.choices.map((ch, idx) => `<button class="answer-choice" onclick="resolveBattleTurn('choice',${idx})">💬 「${ch.text}」</button>`).join('')}
    <div class="panel" style="margin-top:5px;">
      <div style="font-size:9.5px;color:var(--accent-cyan);font-weight:800;margin-bottom:4px;">🔥 魂の手打ちカウンター（母音一致で特大クリティカル！）</div>
      <div style="display:flex;gap:6px;">
        <input type="text" id="battle-free-input" placeholder="自分の言葉で踏み返せ…">
        <button class="btn btn-lime" style="width:auto;padding:0 13px;" onclick="resolveBattleTurn('free',0)">スピット</button>
      </div>
    </div>
    <button class="btn" style="padding:7px;font-size:10px;opacity:0.75;" onclick="activeBattle=null;AudioEngine.stop();renderStreetTab()">🏃 バトルを離脱する</button>`;
  setCockpitView(stageHtml, deckHtml);
}

function resolveBattleTurn(mode, idx) {
  const b = activeBattle; if (!b) return;
  const st = state.stats || { lyric: 10, flow: 10, vibes: 10 };
  const statBoost = Math.floor((st.lyric + st.flow + st.vibes) / 8) + ((state.level || 1) - 1) * 2;
  let delta = 0, msg = '';

  if (mode === 'free') {
    const txt = (document.getElementById('battle-free-input')?.value || '').trim();
    if (txt.length < 5) return showToast('5文字以上のアンサーを入力してください！');
    if (LEGAL_NG_WORDS.some(w => txt.includes(w))) return showToast('⚠️ ストア規約NGワードが含まれています');
    const v = extractVowelsJP(txt);
    const matched = v.slice(-2) === b.rival.targetVowel || v.includes(b.rival.targetVowel);
    delta = (matched ? 38 : 19) + statBoost;
    if (matched) triggerSlashCutIn('CRITICAL RHYME!!', txt.slice(0, 16), '#c8ff29');
    msg = matched ? `CRITICAL! +${delta}%` : `NICE FLOW! +${delta}%`;
    state.lyrics.push({ id: 'lyr_' + Date.now(), text: txt, vowels: v, rank: matched ? 'S' : 'A', moneySnap: state.cash });
  } else {
    const ch = b.choices[idx];
    if (ch.quality === 'perfect') {
      delta = 28 + statBoost; triggerSlashCutIn('DOPE PUNCHLINE!!', ch.text.slice(0, 16), '#00f0ff'); msg = `DOPE! +${delta}%`;
    } else if (ch.quality === 'good') {
      delta = 13 + Math.floor(statBoost / 2); msg = `GOOD! +${delta}%`;
    } else {
      delta = -13; msg = `MISS BEAT... ${delta}%`;
    }
  }

  b.hype = Math.max(5, Math.min(100, b.hype + delta - (b.round < b.maxRounds ? (b.rival.isBoss ? 11 : 6) : 0)));
  b.lastLog = msg;

  if (b.hype >= 86 || b.round >= b.maxRounds) {
    const win = b.hype >= 52, r = b.rival;
    activeBattle = null; AudioEngine.stop();
    if (win) {
      const cashWon = Math.floor(r.rewardCash * getActiveLabelBuff('hustle'));
      state.cash += cashWon; state.syncPt += r.isBoss ? 70 : 30; state.respect += r.isBoss ? 40 : (r.isRare ? 50 : 14);
      if (r.isAssassin) state.cloud.myContribution = (state.cloud.myContribution || 0) + 30;
      if (r.isBoss) handleBossRootUnlock(r);
      if (r.isRare && r.dropRoot) handleRareRootDrop(r);
      gainExp(r.exp); updateHeader(); saveState(); renderStreetTab();
      showToast(`🏆 勝利！ +¥${cashWon.toLocaleString()} / +${r.exp} EXP！`);
    } else {
      gainExp(15); updateHeader(); saveState(); renderStreetTab();
      showToast('判定負け… 現場経験 +15 EXP を獲得！');
    }
    return;
  }
  b.round += 1; renderBattleArena();
}
