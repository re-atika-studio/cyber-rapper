/* =========================================================================
   CYBER RAPPER // v9.5 LEGENDS, MULTI-BODY ASSETS & "JOUGEN" POSSE ENGINE
   - 10 Legend Bosses & Originators + Custom Battle Mechanics
   - DJ MYOU Cyber Yaon Hub + 7-Mic Relay "JOUGEN" + 8th Verse Recording
   - 4 KING / 4 DIVA Base Sprite Selector + Work Outfit Layer Bridge
   ========================================================================= */

const SHAKA_ROOT = {
  id: 'shaka_breaks',
  name: 'GOLDEN BREAKS // DYNAMO 96',
  glow: '#ffc83b',
  bpm: 95,
  isRare: false,
  bossExclusive: true,
  style: 'boom',
  desc: '地下変電所を揺らす黄金期の極太ドラムブレイクと高圧ホーンサンプリングの伝説的ルーツ',
  tracks: [
    { id: 'sb_01', title: 'Human Dynamo Loop #01', price: 0, file: 'bgm_shakabreaks_01.mp3', note: 110 },
    { id: 'sb_02', title: 'Twin Mic Prophecy #02', price: 45000, file: 'bgm_shakabreaks_02.mp3', note: 131 },
    { id: 'sb_03', title: 'Golden Lotus 96 #03', price: 78000, file: 'bgm_shakabreaks_03.mp3', note: 147 }
  ]
};

const JOUGEN_ROOT = {
  id: 'jougen_classic',
  name: 'CLASSIC ANTHEM // JOUGEN 96',
  glow: '#00f0ff',
  bpm: 94,
  isRare: true,
  bossExclusive: true,
  style: 'boom',
  desc: 'DJ MYOUが創成期と現代のレジェンド全員を束ねた、上限突破の伝説的マイクリレー・トラック',
  tracks: [
    { id: 'jg_01', title: 'JOUGEN (DJ MYOU Master Cut) [1-of-1]', price: 0, file: 'bgm_jougen_classic.mp3', note: 117, isRare: true }
  ]
};

const PLAYER_BASE_VARIANTS = {
  king: [
    { id: 0, label: 'TYPE-01 標準フーディー', file: 'king_base_01.png' },
    { id: 1, label: 'TYPE-02 銀ウルフ', file: 'king_base_body_02.png' },
    { id: 2, label: 'TYPE-03 コーンロウ眉傷', file: 'king_base_body_03.png' },
    { id: 3, label: 'TYPE-04 金フェード眼鏡', file: 'king_base_body_04.png' }
  ],
  diva: [
    { id: 0, label: 'TYPE-01 標準モヘア', file: 'diva_base_01.png' },
    { id: 1, label: 'TYPE-02 黒紫ウルフ', file: 'diva_base_body_02.png' },
    { id: 2, label: 'TYPE-03 白銀ポニー', file: 'diva_base_body_03.png' },
    { id: 3, label: 'TYPE-04 青ブレイズ眼鏡', file: 'diva_base_body_04.png' }
  ]
};

const LEGEND_NPCS = [
  {
    id: 'leg_shingi', orderBadge: '上限 壱', shortBadge: '壱', name: '審議',
    title: 'PRISM JUDGE // 七色声紋の調停者', era: '90s創成期', lv: 6,
    rewardCash: 160000, exp: 280, bossSprite: 'legend_shingi.png', style: 'rare_phantom',
    accent: '#00f0ff', mechanic: 'prism_flow', bpmShift: [86, 124, 95], isLegend: true,
    taunt: '上限壱、投げんな匙、七色の声で問うお前の価値（かち）', targetVowel: 'ai',
    answers: [
      { text: '偽物だらけの街で鳴らす本物の価値、切り開く未来（みらい）', quality: 'perfect' },
      { text: '七色のビートに食らいついて自分の声を響かせる', quality: 'good' },
      { text: 'テンポが変わりすぎて乗りにくいぜ', quality: 'weak' }
    ]
  },
  {
    id: 'leg_oonyudo', orderBadge: '上限 弐', shortBadge: '弐', name: '大入道',
    title: 'ROARING TITAN // 轟音の仁王マイク', era: 'MCバトル黄金期', lv: 6,
    rewardCash: 165000, exp: 290, bossSprite: 'legend_oonyudo.png', style: 'boss_local',
    accent: '#ff3358', mechanic: 'roaring_acapella', stageBg: 'bg_jougen_yaon.jpg', isLegend: true,
    taunt: '上限弐、ビートが消えても魂で叫ぶ仁王の覚悟（かくご）', targetVowel: 'uo',
    answers: [
      { text: '無音の夜を拳ひとつで揺らす俺の覚悟（かくご）', quality: 'perfect' },
      { text: '音が止まっても心臓の鼓動だけで韻を踏み抜く', quality: 'good' },
      { text: 'BGMがないとタイミングが分からないよ', quality: 'weak' }
    ]
  },
  {
    id: 'leg_mc_iwa', orderBadge: '上限 参', shortBadge: '参', name: 'MC岩',
    title: 'STONE GENERAL // 不抜の玄武岩', era: 'MCバトル黄金期', lv: 7,
    rewardCash: 190000, exp: 340, bossSprite: 'legend_mc_iwa.png', style: 'boss_dub',
    accent: '#94a3b8', mechanic: 'stone_real', isLegend: true,
    taunt: '上限参、嘘が通じねえ路上の現場、刻めお前の生き様と鼓動（こどう）', targetVowel: 'ou',
    answers: [
      { text: '六畳一間の底から這い上がる泥臭い衝動（しょうどう）', quality: 'perfect' },
      { text: '飾り気のないリアルな言葉でストリートの岩を砕く', quality: 'good' },
      { text: '流行りのスタイルで楽して稼ぎたいだけさ', quality: 'weak' }
    ]
  },
  {
    id: 'leg_kamakiri', orderBadge: '上限 肆', shortBadge: '肆', name: 'ジョセフ・カマキリ',
    title: 'MANTIS BLADE // 極彩色の斬鉄鎌', era: 'MCバトル黄金期', lv: 7,
    rewardCash: 210000, exp: 360, bossSprite: 'legend_kamakiri.png', style: 'trap',
    accent: '#c8ff29', mechanic: 'mantis_counter', isLegend: true,
    taunt: '上限肆、薄い理屈じゃ俺はできんぞ論破、鎌より鋭く研いだ言葉（ことば）', targetVowel: 'oa',
    answers: [
      { text: '正面から懐に飛び込み黙らせる本気の言葉（ことば）', quality: 'perfect' },
      { text: '腕組みを解かせるほどの熱量で真っ向から言い返す', quality: 'good' },
      { text: 'そんなに厳しい目で睨まないでくれよ', quality: 'weak' }
    ]
  },
  {
    id: 'leg_rollcake', orderBadge: '上限 伍', shortBadge: '伍', name: 'ロールケーキ',
    title: 'SPIRAL SAGE // 螺旋多層韻の聖人', era: 'MCバトル黄金期', lv: 8,
    rewardCash: 240000, exp: 410, bossSprite: 'legend_rollcake.png', style: 'rare_smoke',
    accent: '#a855f7', mechanic: 'spiral_rhyme', multiVowels: ['ei', 'ou', 'ai'], isLegend: true,
    taunt: '上限伍、三重の螺旋で韻を巻く天才の証明、聖人のフロウに全部共鳴（きょうめい）', targetVowel: 'ei',
    answers: [
      { text: '時代（じだい）も世代（せだい）も渦に巻き込む言葉の革命（かくめい）', quality: 'perfect' },
      { text: '幾重にも重なるライムの渦を自分のフロウで乗りこなす', quality: 'good' },
      { text: '韻が多すぎて頭が回らないぜ', quality: 'weak' }
    ]
  },
  {
    id: 'boss_shaka_bros', orderBadge: '上限 陸・漆', shortBadge: '陸', name: 'SHAKA BROS.',
    title: 'THE DYNAMO // 人間発電兄弟', era: '90s創成期', lv: 8,
    rewardCash: 320000, exp: 500, bossSprite: 'boss_shaka_bros.png', style: 'boom',
    accent: '#ffc83b', mechanic: 'dynamo_relay', isBoss: true, isLegend: true, isWideDuo: true,
    unlockRoot: 'shaka_breaks',
    taunt: '地下の変電所から鳴らす黄金の太陽（たいよう）', targetVowel: 'ou',
    answers: [
      { text: '失われた時代の熱を取り戻す最高の相棒（あいぼう）', quality: 'perfect' },
      { text: '黄金期のドラムブレイクから高圧電力を吸い上げる', quality: 'good' },
      { text: '電圧が高すぎてマイクが持てない', quality: 'weak' }
    ],
    phases: [
      {
        speaker: '🎙️ BIG SHAKA (兄)', color: '#e11d48',
        taunt: '地下の変電所から鳴らす黄金の太陽（たいよう）', targetVowel: 'ou',
        answers: [
          { text: '失われた時代の熱を取り戻す最高の相棒（あいぼう）', quality: 'perfect' },
          { text: '黄金期のドラムブレイクから高圧電力を吸い上げる', quality: 'good' },
          { text: '電圧が高すぎてマイクが持てない', quality: 'weak' }
        ]
      },
      {
        speaker: '⚡ ILL BRO (弟)', color: '#00f0ff',
        taunt: '無敵のマイクが切り裂く暗闇の境界（きょうかい）', targetVowel: 'ai',
        answers: [
          { text: '先駆者の背中を超えて塗り替えるストリートの限界（げんかい）', quality: 'perfect' },
          { text: '鋭いフロウでストリートの空気を一変させる', quality: 'good' },
          { text: '二人がかりとかずるいんじゃないの', quality: 'weak' }
        ]
      },
      {
        speaker: '🔥 SHAKA UNISON (兄弟)', color: '#ffc83b',
        taunt: '魂のビートで街を照らす黄金の雷鳴（らいめい）', targetVowel: 'ei',
        answers: [
          { text: '過去の伝説を超えて刻む俺の姓名（せいめい）', quality: 'perfect' },
          { text: '高圧電流のサイファーで最後まで立ち続ける', quality: 'good' },
          { text: 'まぶしすぎて前が見えないよ', quality: 'weak' }
        ]
      }
    ]
  },
  {
    id: 'leg_z_brave', orderBadge: '創成期 特別枠', shortBadge: '王', name: 'Z-BRAVE (シマウマ将軍)',
    title: 'STRIPE EMPEROR // 白黒の韻律王', era: '90s創成期', lv: 7,
    rewardCash: 220000, exp: 380, bossSprite: 'legend_z_brave.png', style: 'assassin_a',
    accent: '#f8fafc', mechanic: 'strict_end_rhyme', isLegend: true,
    taunt: '白と黒の縞が示す王道、日本語に刻め完璧な韻の構造（こうぞう）', targetVowel: 'ou',
    answers: [
      { text: '真っ昼間から夜まで揺らす王道の創造（そうぞう）', quality: 'perfect' },
      { text: '正統派の脚韻でメインストリームの頂点を狙う', quality: 'good' },
      { text: '細かいルールは気にせず叫びたいんだ', quality: 'weak' }
    ]
  },
  {
    id: 'leg_owl_rock', orderBadge: '創成期 特別枠', shortBadge: '雷', name: '雷電フクロウ',
    title: 'OWL-ROCK // 深夜特急の煽動者', era: '90s創成期', lv: 6,
    rewardCash: 175000, exp: 310, bossSprite: 'legend_owl_rock.png', style: 'boom',
    accent: '#facc15', mechanic: 'crowd_voltage', isLegend: true,
    taunt: '真夜中の特急列車が到着、雷電のマイクで騒ぎな兄弟（きょうだい）', targetVowel: 'ai',
    answers: [
      { text: '豪雨のステージも沸騰させる最高の舞台（ぶたい）', quality: 'perfect' },
      { text: '夜明けまで両手を掲げてフロアの熱を上げる', quality: 'good' },
      { text: 'テンションが高すぎてついていけないよ', quality: 'weak' }
    ]
  },
  {
    id: 'leg_dr_rhyme', orderBadge: '創成期 特別枠', shortBadge: '博', name: '福韻博士',
    title: 'DR. RHYME // 言葉改造の黒眼鏡', era: '90s創成期', lv: 7,
    rewardCash: 205000, exp: 350, bossSprite: 'legend_dr_rhyme.png', style: 'rare_noir',
    accent: '#b86bff', mechanic: 'rhyme_lecture', isLegend: true,
    taunt: '黒眼鏡の奥で解析する母音の方程式、証明してみせろ言葉の美学と叡智（えいち）', targetVowel: 'ei',
    answers: [
      { text: '精密な構造と情熱が交差する新境地の発明（はつめい）', quality: 'perfect' },
      { text: '先人の理論を学んだ上で新しいフロウを組み立てる', quality: 'good' },
      { text: '難しい計算は苦手なんだよね', quality: 'weak' }
    ]
  }
];

function getJougenRelayLineup() {
  const shaka = LEGEND_NPCS.find(x => x.id === 'boss_shaka_bros');
  return [
    LEGEND_NPCS[0], LEGEND_NPCS[1], LEGEND_NPCS[2], LEGEND_NPCS[3], LEGEND_NPCS[4],
    Object.assign({}, shaka, { id: 'shaka_big_r6', orderBadge: '上限 陸', shortBadge: '陸', name: 'SHAKA BROS. [兄:BIG SHAKA]', accent: '#e11d48', taunt: shaka.phases[0].taunt, targetVowel: shaka.phases[0].targetVowel, answers: shaka.phases[0].answers }),
    Object.assign({}, shaka, { id: 'shaka_ill_r7', orderBadge: '上限 漆', shortBadge: '漆', name: 'SHAKA BROS. [弟:ILL BRO]', accent: '#ffc83b', taunt: shaka.phases[1].taunt, targetVowel: shaka.phases[1].targetVowel, answers: shaka.phases[1].answers })
  ];
}

function playDjMyouScratchSE() {
  if (typeof state !== 'undefined' && state.soundMuted) return;
  try {
    const ctx = AudioEngine.ctx || (AudioEngine.ctx = new (window.AudioContext || window.webkitAudioContext)());
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime, osc = ctx.createOscillator(), g = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(175, now);
    osc.frequency.exponentialRampToValueAtTime(940, now + 0.075);
    osc.frequency.exponentialRampToValueAtTime(205, now + 0.135);
    osc.frequency.exponentialRampToValueAtTime(1120, now + 0.205);
    g.gain.setValueAtTime(0.17, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
    osc.connect(g); g.connect(ctx.destination);
    osc.start(now); osc.stop(now + 0.25);
  } catch (e) {}
}

function triggerSpiralSlashVFX() {
  const url = AssetImageCache.resolve('fx_legend_spiral_slash.png', { cutout: false });
  const mon = document.querySelector('#stage-view .stage-monitor');
  if (!url || !mon) return;
  const el = document.createElement('img');
  el.src = url;
  el.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;mix-blend-mode:screen;z-index:11;pointer-events:none;opacity:0.95;transition:opacity 0.45s ease,transform 0.45s ease;transform:scale(1.06);';
  mon.appendChild(el);
  requestAnimationFrame(() => { el.style.opacity = '0'; el.style.transform = 'scale(1.18)'; });
  setTimeout(() => el.remove(), 480);
}

function syncLegendUnlocks() {
  if (!MUSIC_ROOTS.some(r => r.id === SHAKA_ROOT.id)) MUSIC_ROOTS.push(SHAKA_ROOT);
  if (!MUSIC_ROOTS.some(r => r.id === JOUGEN_ROOT.id)) MUSIC_ROOTS.push(JOUGEN_ROOT);
  if (typeof state === 'undefined') return;
  if (!Array.isArray(state.defeatedLegends)) state.defeatedLegends = [];
  if ((state.defeatedLegends.includes('boss_shaka_bros') || (state.defeatedBosses || []).includes('boss_shaka_bros')) && !FEAT_GUESTS.some(f => f.id === 'shaka_bros')) {
    FEAT_GUESTS.push({ id: 'shaka_bros', name: 'Feat. SHAKA BROS.（⚡人間発電兄弟 x1.85）', cost: 65000, mult: 1.85 });
  }
  if (state.jougenCleared && !FEAT_GUESTS.some(f => f.id === 'dj_myou_legends')) {
    FEAT_GUESTS.push({ id: 'dj_myou_legends', name: 'Prod. DJ MYOU & ALL LEGENDS（🏆上限 x2.50）', cost: 90000, mult: 2.50 });
  }
}

function startLegendBattleById(legId) {
  syncLegendUnlocks();
  closeModal();
  const leg = LEGEND_NPCS.find(x => x.id === legId) || LEGEND_NPCS[0];
  switchTab('street');
  launchBattle(leg);
}

function openDjMyouHub() {
  syncLegendUnlocks();
  playDjMyouScratchSE();
  const djUrl = AssetImageCache.resolve('legend_dj_myou.png', { cutout: true });
  const bgUrl = AssetImageCache.resolve('bg_jougen_yaon.jpg', { cutout: false });
  const djTaint = AssetImageCache.isTaintedSprite && AssetImageCache.isTaintedSprite('legend_dj_myou.png') ? 'url(#tainted-black-key) ' : '';
  const cleared = state.defeatedLegends || [];
  const m = document.getElementById('modal-layer');
  if (!m) return;
  m.innerHTML = `<div class="modal-header"><span class="modal-title">🎧 DJ MYOU // PROJECT『上限』総司令室</span><button class="modal-close" onclick="closeModal()">✕ 閉じる</button></div>
    <div class="modal-body">
      <div class="panel" style="position:relative;overflow:hidden;padding:12px;border-color:#ffc83b;background:${bgUrl ? `linear-gradient(90deg,rgba(6,7,14,0.92) 45%,rgba(6,7,14,0.58) 100%),url('${bgUrl}') center/cover` : '#111322'};">
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="width:86px;height:108px;flex-shrink:0;overflow:hidden;border-radius:8px;border:1px solid rgba(255,200,59,0.5);background:rgba(8,9,16,0.7);">
            ${djUrl ? `<img src="${djUrl}" alt="DJ MYOU" style="width:100%;height:100%;object-fit:cover;object-position:50% 8%;filter:${djTaint}drop-shadow(0 0 8px #ffc83b88);">` : renderRivalSVG('boom')}
          </div>
          <div style="flex:1;">
            <div style="font-size:10px;font-weight:900;color:#ffc83b;font-family:monospace;">PRODUCER // DJ MYOU (黄金城の操盤師)</div>
            <div style="font-size:11px;font-weight:800;color:#fff;margin:3px 0;line-height:1.4;">「創成期から現代までの伝説と拳を交えろ。豪雨の電脳野音で7連マイクリレー『上限』を回し、お前の8番目のバースを歴史に刻むぞ！」</div>
            <div style="font-size:9.5px;color:var(--accent-cyan);font-family:monospace;">PROPS獲得済み: ${cleared.length} / ${LEGEND_NPCS.length} 名 ${state.jougenCleared ? '・🏆『上限』完走済' : ''}</div>
          </div>
        </div>
        <button class="btn btn-gold" style="margin-top:8px;font-size:12px;" onclick="launchJougenPosseCut()">🔥 豪雨の電脳野音『上限（JOUGEN）』7連マイクリレー開演！</button>
      </div>
      <div class="sec-title"><span>🎤 レジェンド1on1 指名サイファー（全${LEGEND_NPCS.length}組）</span></div>
      ${LEGEND_NPCS.map(lg => {
        const won = cleared.includes(lg.id), sp = AssetImageCache.resolve(lg.bossSprite, { cutout: true });
        return `<div class="shop-item" style="border-color:${won ? 'rgba(200,255,41,0.45)' : 'var(--border)'};">
          <div style="width:44px;height:52px;border-radius:6px;overflow:hidden;background:#0a0b12;flex-shrink:0;margin-right:8px;border:1px solid ${lg.accent};">
            ${sp ? `<img src="${sp}" alt="" style="width:100%;height:100%;object-fit:cover;object-position:50% 8%;">` : ''}
          </div>
          <div class="shop-info" style="flex:1;">
            <h4 style="color:${lg.accent};">${won ? '✅ ' : ''}${escapeHtml(lg.name)} <span style="font-size:9px;color:#cbd5e1;">Lv.${lg.lv} [${lg.era}]</span></h4>
            <p>${escapeHtml(lg.title)} / 報酬 ¥${lg.rewardCash.toLocaleString()}</p>
          </div>
          <button class="btn ${won ? 'btn-lime' : 'btn-cyan'}" style="width:auto;padding:6px 10px;font-size:10px;" onclick="startLegendBattleById('${lg.id}')">⚡ 挑む</button>
        </div>`;
      }).join('')}
    </div>`;
  m.classList.add('open');
}

function launchJougenPosseCut() {
  syncLegendUnlocks();
  closeModal();
  switchTab('street');
  playDjMyouScratchSE();
  AudioEngine.playTrack('jg_01');
  const lineup = getJougenRelayLineup(), first = lineup[0];
  triggerSlashCutIn('PROJECT // 上限', 'PROD. DJ MYOU — 7 MIC RELAY START!!', '#ffc83b');
  activeBattle = {
    isJougenGauntlet: true,
    jougenLineup: lineup,
    rival: Object.assign({}, first, { name: `${first.orderBadge}：${first.name}`, rewardCash: 550000, exp: 850, isBoss: true }),
    currentPhaseObj: first,
    overrideBpm: first.bpmShift ? first.bpmShift[0] : 94,
    round: 1, maxRounds: lineup.length, hype: 55, rhymeChain: 0, armedIdx: 0,
    activeSkill: null, nextSpitBoost: 1, cooldowns: {}, spitBurst: false,
    choices: [...first.answers].sort(() => Math.random() - 0.5),
    lastLog: '🎧 DJ MYOU「上限 壱！雨の野音だ、7人抜いて8番目のマイクを掴め！」'
  };
  renderBattleArena();
}

function completeJougenAnthemRecord() {
  state.jougenCleared = true;
  syncLegendUnlocks();
  if (!state.music.unlockedRoots.includes('jougen_classic')) state.music.unlockedRoots.push('jougen_classic');
  if (!state.music.ownedTracks.includes('jg_01')) state.music.ownedTracks.push('jg_01');
  const myBest = state.lyrics.length > 0 ? state.lyrics[state.lyrics.length - 1].text : '路地裏の無職から伝説の隣へ、俺が刻む新たな上限';
  const anthem = {
    id: 'trk_jougen_' + Date.now(),
    title: `上限 (Prod. DJ MYOU feat. ALL LEGENDS & ${state.profile.artistName})`,
    beatId: 'jg_01',
    genre: 'CLASSIC POSSE CUT // JOUGEN',
    lines: [
      '【上限 壱 // 審議】七色の声紋で時代を審判、偽物を裂く本物の質感',
      '【上限 弐 // 大入道】豪雨が叩く野音、無音の闇に轟く仁王の叫び',
      '【上限 参 // MC岩】飾らねえ路上の玄武岩、生活の重みが言葉の衝撃',
      '【上限 肆 // ジョセフ・カマキリ】極彩色の双鎌で一閃、甘い理屈はここで終点',
      '【上限 伍 // ロールケーキ】三重の螺旋で巻く言霊、聖人のフロウが夜を統べる',
      '【上限 陸・漆 // SHAKA BROS.】地下の変電所から放電、人間発電兄弟が鳴らす雷鳴',
      `【上限 八 // ${state.profile.artistName}】${myBest}`
    ],
    streams: 380000 + (state.respect || 0) * 1400
  };
  state.tracks.push(anthem);
  state.respect += 160;
}

function evaluateLegendMechanic(b, mode, txt, vowels, baseDelta, hit, tRank) {
  const rv = b.currentPhaseObj || b.rival, mech = rv.mechanic;
  let delta = baseDelta, tag = null, sub = null, slashFx = false;
  if (mech === 'stone_real') {
    if (mode !== 'free' && tRank !== 'JUST' && delta > 0) delta = Math.round(delta * 0.55);
    if (mode === 'free' || tRank === 'JUST') {
      const bonus = Math.min(14, Math.floor((state.lyrics || []).length * 1.5));
      delta = Math.round(delta * 1.45) + bonus;
      if (hit) { tag = 'STONE SHATTERED!!'; sub = `生き様リアル共鳴 +${bonus}%`; }
    }
  } else if (mech === 'spiral_rhyme' && Array.isArray(rv.multiVowels)) {
    const cnt = rv.multiVowels.filter(mv => vowels.includes(mv)).length;
    if (cnt >= 2 || (hit && mode === 'free')) {
      delta = Math.round(Math.max(26, delta) * (cnt >= 2 ? 1.75 : 1.35));
      hit = true; slashFx = true;
      tag = 'SPIRAL MULTI RHYME!!'; sub = `螺旋多層韻 x${Math.max(2, cnt)} 回収!!`;
    }
  } else if (mech === 'mantis_counter') {
    if (!hit || tRank === 'LATE') {
      delta = -22; slashFx = true;
      tag = 'MANTIS SLASH!!'; sub = '双鎌カウンターで論破された！(-22%)';
    } else if (tRank === 'JUST') { delta += 10; slashFx = true; }
  } else if (mech === 'prism_flow' && hit && tRank === 'JUST') {
    state.stats.flow += 2;
    tag = 'SHINGI APPROVED!!'; sub = '七色声紋・審議通過！(FLOW +2)';
  } else if (mech === 'roaring_acapella') {
    if (tRank === 'JUST' && hit) { delta += 15; tag = 'SOUL ACAPELLA!!'; sub = '無音を貫く魂の拳！(+15%)'; }
  } else if (mech === 'dynamo_relay') {
    b.dynamoCharge = b.dynamoCharge || 1;
    if (hit && tRank === 'JUST') {
      const surge = 6 + b.dynamoCharge * 4;
      delta += surge; b.dynamoCharge = 1; slashFx = true;
      tag = 'DYNAMO OVERLOAD!!'; sub = `⚡人間発電・電力逆流 +${surge}%!!`;
    } else if (!hit) { b.dynamoCharge = Math.min(3, b.dynamoCharge + 1); }
  } else if (mech === 'strict_end_rhyme' && hit && tRank === 'JUST') {
    delta += 12; tag = 'ROYAL RHYME!!'; sub = '王道脚韻・完全証明！(+12%)';
  } else if (mech === 'crowd_voltage') {
    delta = Math.round(delta * 1.3);
  } else if (mech === 'rhyme_lecture' && hit && (mode === 'free' || txt.length >= 8)) {
    delta += 10; tag = '💮 福韻証明完了!!'; sub = '構造解析クリア！';
  }
  return { delta, hit, tag, sub, slashFx };
}

(function installLegendsAndAssetsV95() {
  syncLegendUnlocks();

  /* 1. AssetImageCache Cutout & Multi-Body Variant Bridge */
  const _origResolve = AssetImageCache.resolve.bind(AssetImageCache);
  AssetImageCache.resolve = function (relPath, arg2) {
    if (relPath && /^(legend|boss)_/i.test(relPath)) {
      const opts = typeof arg2 === 'function' ? { cutout: true, onReady: arg2 } : Object.assign({ cutout: true }, arg2 || {});
      return _origResolve(relPath, opts);
    }
    return _origResolve(relPath, arg2);
  };
  AssetImageCache.isTaintedSprite = function (relPath) {
    return !!(this.entries['cut:' + relPath]?.tainted);
  };
  AssetImageCache.resolveBaseSprite = function (isDiva, onReady) {
    const list = isDiva ? PLAYER_BASE_VARIANTS.diva : PLAYER_BASE_VARIANTS.king;
    const vIdx = (typeof state !== 'undefined' && state.profile && Number.isInteger(state.profile.baseVariant)) ? state.profile.baseVariant : 0;
    const picked = list[vIdx] || list[0];
    return this.resolve(picked.file, { cutout: true, onReady }) || this.resolve(list[0].file, { cutout: true, onReady });
  };
  AssetImageCache.isTaintedBase = function (isDiva) {
    const list = isDiva ? PLAYER_BASE_VARIANTS.diva : PLAYER_BASE_VARIANTS.king;
    const vIdx = (typeof state !== 'undefined' && state.profile && Number.isInteger(state.profile.baseVariant)) ? state.profile.baseVariant : 0;
    const picked = list[vIdx] || list[0];
    return !!(this.entries['cut:' + picked.file]?.tainted || this.entries['cut:' + list[0].file]?.tainted);
  };

  /* Preload new uploaded assets smoothly */
  ['bg_jougen_yaon.jpg', 'fx_legend_spiral_slash.png'].forEach(f => AssetImageCache.resolve(f, { cutout: false }));
  ['king_outfit_work.png', ...PLAYER_BASE_VARIANTS.king.map(x => x.file), ...PLAYER_BASE_VARIANTS.diva.map(x => x.file), ...LEGEND_NPCS.map(x => x.bossSprite), 'legend_dj_myou.png'].forEach(f => AssetImageCache.resolve(f, { cutout: true }));

  /* 2. Work Outfit Layer Overlay on Avatar SVG */
  const _origAvatarSVG = window.renderAvatarSVG;
  window.renderAvatarSVG = function (p, customGlow, overrides) {
    const svg = _origAvatarSVG(p, customGlow, overrides);
    const ov = overrides || {}, outId = ov.outfitId || (p && p.outfitId);
    if (p && p.gender !== 'diva' && outId === 'job_work_jkt') {
      const workUrl = AssetImageCache.resolve('king_outfit_work.png', { cutout: true });
      if (workUrl) {
        const cam = ov.camera || (ov.transparentBg ? 'sprite' : 'card');
        const fb = cam === 'bust' ? { x: 15, y: -12, w: 390, h: 699 } : cam === 'sprite' ? { x: 92, y: 14, w: 236, h: 423 } : { x: 28, y: 6, w: 364, h: 652 };
        const tf = AssetImageCache.isTaintedSprite('king_outfit_work.png') ? 'filter="url(#tainted-black-key)"' : '';
        return svg.replace('</svg>', `<image href="${workUrl}" x="${fb.x}" y="${fb.y}" width="${fb.w}" height="${fb.h}" preserveAspectRatio="xMidYMin meet" ${tf}/></svg>`);
      }
    }
    return svg;
  };

  /* 3. Character Creator: Inject 4 Base Body Variants & Hide Boss-Exclusive Roots at Lv.1 */
  const _origCreator = window.renderCreator;
  window.renderCreator = function (salonMode) {
    _origCreator(salonMode);
    const deck = document.getElementById('command-deck');
    if (!deck || typeof state === 'undefined') return;
    if (creatorStep === 1) {
      const isDiva = state.profile.gender === 'diva';
      const variants = isDiva ? PLAYER_BASE_VARIANTS.diva : PLAYER_BASE_VARIANTS.king;
      const curV = state.profile.baseVariant || 0;
      const bar = document.createElement('div');
      bar.className = 'panel';
      bar.style.marginBottom = '6px';
      bar.innerHTML = `<div style="font-size:9.5px;font-weight:900;color:var(--accent-gold);margin-bottom:4px;">✨ 高精細AI素体バリエーション選択（全4種・0px共通骨格）</div>
        <div class="chip-grid">${variants.map(v => `<span class="opt-chip ${curV === v.id ? 'selected' : ''}" onclick="state.profile.baseVariant=${v.id};renderCreator(${!!salonMode})">${v.label}</span>`).join('')}</div>`;
      deck.insertBefore(bar, deck.firstChild.nextSibling);
    } else if (creatorStep === 2) {
      deck.querySelectorAll('.opt-chip').forEach(el => {
        if (el.textContent.includes('GOLDEN BREAKS')) el.style.display = 'none';
      });
    }
  };

  /* 4. Add Landmarks to STREET_ZONES & Hook Street Encounters */
  const shakaObj = LEGEND_NPCS.find(x => x.id === 'boss_shaka_bros');
  if (!DISTRICT_BOSSES.some(b => b.id === 'boss_shaka_bros')) DISTRICT_BOSSES.push(shakaObj);
  if (STREET_ZONES[0] && !STREET_ZONES[0].landmarks.some(l => l.tag === 'DYNAMO')) {
    STREET_ZONES[0].landmarks.push({
      x: 5, y: 1, tag: 'DYNAMO', ico: '⚡', sign: 'SHAKA DYNAMO', color: '#ffc83b',
      name: '地下変電神殿 SHAKA BROS. (Lv.8)',
      desc: '人間発電兄弟が鎮座する変電施設。勝利で黄金ルーツ『DYNAMO 96』（全3曲）＆最強客演が解禁！',
      act: '⚡ SHAKA BROS. に挑む！', fn: "startLegendBattleById('boss_shaka_bros')", bossStyle: 'boom'
    });
  }
  if (STREET_ZONES[1] && !STREET_ZONES[1].landmarks.some(l => l.tag === 'JOUGEN')) {
    STREET_ZONES[1].landmarks.push({
      x: 5, y: 0, tag: 'JOUGEN', ico: '🎧', sign: 'CYBER YAON', color: '#00f0ff',
      name: '豪雨の電脳野音 // DJ MYOU &『上限』',
      desc: 'DJ MYOUが全レジェンドを招集する聖地。1on1指名バトルおよび7連マイクリレー『上限』へ挑戦可能！',
      act: '🎧 DJ MYOU 総司令室を開く', fn: 'openDjMyouHub()'
    });
  }

  const _origHeat = window.triggerStreetHeatEncounter;
  window.triggerStreetHeatEncounter = function () {
    if (Math.random() < 0.28) {
      Street25DEngine.pause();
      const pick = LEGEND_NPCS[Math.floor(Math.random() * LEGEND_NPCS.length)];
      return launchBattle(pick);
    }
    return _origHeat();
  };

  /* 5. Dynamic BPM Hook for SHINGI (Prism Flow) */
  const _origBpm = AudioEngine.getCurrentBpm.bind(AudioEngine);
  AudioEngine.getCurrentBpm = function () {
    if (typeof activeBattle !== 'undefined' && activeBattle && activeBattle.overrideBpm) return activeBattle.overrideBpm;
    return _origBpm();
  };

  /* 6. Upgrade launchBattle, renderBattleArena & executeRhythmSpit */
  const _origLaunch = window.launchBattle;
  window.launchBattle = function (rv) {
    syncLegendUnlocks();
    _origLaunch(rv);
    if (!activeBattle) return;
    if (Array.isArray(rv.phases) && rv.phases.length > 0) {
      const p0 = rv.phases[0];
      activeBattle.maxRounds = rv.phases.length;
      activeBattle.currentSpeaker = p0.speaker;
      activeBattle.activeTaunt = p0.taunt;
      activeBattle.activeVowel = p0.targetVowel;
      activeBattle.choices = [...p0.answers].sort(() => Math.random() - 0.5);
    }
    if (rv.bpmShift) activeBattle.overrideBpm = rv.bpmShift[0];
    if (rv.mechanic === 'roaring_acapella' && activeBattle.round >= 2) AudioEngine.stop();
    renderBattleArena();
  };

  function installBattleRendererOverride() {
    window.renderBattleArena = function () {
      const b = activeBattle;
      if (!b) return renderStreetTab();
      const rv = b.currentPhaseObj || b.rival;
      const bpm = AudioEngine.getCurrentBpm();
      const pFlame = b.hype >= 75 ? 2 : b.hype >= 50 ? 1 : 0, eFlame = b.hype <= 42 || rv.isLegend ? 2 : 0;
      const tauntText = b.activeTaunt || rv.taunt;
      const vowelText = rv.multiVowels ? rv.multiVowels.join(' / …') : (b.activeVowel || rv.targetVowel);
      const customBgName = b.isJougenGauntlet ? 'bg_jougen_yaon.jpg' : (rv.stageBg || null);
      const stageBgUrl = customBgName ? AssetImageCache.resolve(customBgName, { cutout: false }) : AssetImageCache.resolveStageBg();
      const workUrl = state.profile.gender !== 'diva' && state.profile.outfitId === 'job_work_jkt' ? AssetImageCache.resolve('king_outfit_work.png', { cutout: true }) : null;

      let enemyHTML = '';
      const spPath = rv.bossSprite;
      const spUrl = spPath ? AssetImageCache.resolve(spPath, { cutout: true }) : null;
      if (spUrl) {
        const taint = AssetImageCache.isTaintedSprite(spPath) ? 'url(#tainted-black-key) ' : '';
        const rim = `drop-shadow(0 0 12px ${rv.accent || '#ffc83b'}aa)`;
        enemyHTML = `<div class="beat-puppet-stage" style="--beat-sec:${(60 / bpm).toFixed(3)}s;--half-beat-sec:${(30 / bpm).toFixed(3)}s;">
          ${buildCyberFlameHTML(rv.accent === '#ff2e93' || rv.accent === '#c8ff29', eFlame)}
          <div class="puppet-layer puppet-base-anim" style="filter:${taint}${rim};"><img src="${spUrl}" alt="${escapeHtml(rv.name)}" class="puppet-img-cover"></div>
        </div>`;
      } else {
        enemyHTML = `<div style="width:100%;height:100%;transform:scaleX(-1);">${renderRivalSVG(rv.style)}</div>`;
      }

      const relayBanner = b.isJougenGauntlet
        ? `<div style="display:flex;gap:3px;justify-content:center;margin-top:3px;">${b.jougenLineup.map((item, idx) => `<span style="font-size:8px;font-family:monospace;padding:1px 5px;border-radius:4px;font-weight:900;background:${idx + 1 === b.round ? '#ffc83b' : idx + 1 < b.round ? 'rgba(0,240,255,0.28)' : 'rgba(255,255,255,0.08)'};color:${idx + 1 === b.round ? '#050508' : '#fff'};">${item.shortBadge}</span>`).join('')}</div>`
        : rv.mechanic === 'crowd_voltage'
        ? `<div style="font-size:8px;text-align:center;background:rgba(250,204,21,0.2);color:#facc15;border-radius:4px;margin-top:2px;font-weight:900;">⚡ NIGHT TRAIN VOLTAGE // HYPE変動 x1.3</div>`
        : '';

      const enemyWidth = rv.isWideDuo && !b.isJougenGauntlet ? 168 : 142;
      const playerPuppet = renderBeatPuppetHTML(state.profile, { bpm, flameLevel: pFlame, showMicHand: true, burstClass: b.spitBurst ? 'puppet-spit-burst' : '' });
      const workLayer = workUrl ? `<img src="${workUrl}" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 4%;z-index:4;pointer-events:none;${AssetImageCache.isTaintedSprite('king_outfit_work.png') ? 'filter:url(#tainted-black-key);' : ''}">` : '';

      setCockpitView(
        `<div class="stage-monitor" style="height:234px;background:linear-gradient(180deg,rgba(12,6,22,0.42) 0%,rgba(5,5,12,0.88) 100%)${stageBgUrl ? `, url('${stageBgUrl}') center/cover no-repeat` : ''};border-color:${rv.accent || 'var(--danger)'};">
          <div class="rain-layer" style="opacity:${b.isJougenGauntlet || rv.mechanic === 'roaring_acapella' ? '0.42' : '0.14'};"></div>
          <div style="position:absolute;top:6px;left:10px;right:10px;z-index:12;">
            <div style="display:flex;justify-content:space-between;font-size:9.5px;font-weight:900;margin-bottom:2px;">
              <span style="color:var(--accent-lime);">YOU:${b.hype}% ${b.rhymeChain ? `🔥x${b.rhymeChain}` : ''}</span>
              <span style="color:#fff;font-family:monospace;">R${b.round}/${b.maxRounds} • ${bpm}BPM</span>
              <span style="color:${rv.accent || 'var(--danger)'};">${escapeHtml(b.currentSpeaker || rv.name)}</span>
            </div>
            <div class="hype-meter-bar"><div class="hype-fill-player" style="width:${b.hype}%;"></div></div>
            ${relayBanner}
          </div>
          <div style="position:absolute;left:2px;bottom:0;width:140px;height:176px;z-index:5;">${playerPuppet}${workLayer}</div>
          <div style="position:absolute;left:48%;top:44%;transform:translate(-50%,-50%) rotate(-8deg);font-family:Impact,sans-serif;font-size:24px;color:#ffc83b;text-shadow:2px 2px 0 #000;z-index:7;">VS</div>
          <div style="position:absolute;right:2px;bottom:0;width:${enemyWidth}px;height:180px;z-index:5;">${enemyHTML}</div>
          <div style="position:absolute;left:8px;right:8px;bottom:6px;background:rgba(5,5,10,0.92);border:1px solid ${rv.accent || 'var(--danger)'};border-radius:9px;padding:6px 9px;z-index:10;">
            <div style="font-size:10px;font-weight:900;color:#fff;">${escapeHtml(b.currentSpeaker || rv.name)}「${escapeHtml(tauntText)}」</div>
            <div style="display:flex;justify-content:space-between;font-size:8.8px;margin-top:2px;">
              <span style="color:var(--accent-cyan);font-family:monospace;">${rv.mechanic === 'rhyme_lecture' ? '🔬 構造課題' : '🎯 韻'}: [ …${vowelText} ]</span>
              <span style="color:var(--accent-lime);font-weight:800;">${escapeHtml(b.lastLog || '')}</span>
            </div>
          </div>
        </div>`,
        `<div class="tactical-skill-row">${FLOW_SKILLS.map(sk => { const cd = b.cooldowns[sk.id] || 0, act = b.activeSkill === sk.id; return `<button class="tac-skill-btn ${act ? 'active' : ''} ${cd > 0 && !act ? 'cooldown' : ''}" onclick="useFlowSkill('${sk.id}')">${sk.ico} ${sk.name}<div style="font-size:8px;color:var(--text-sub);">${cd > 0 && !act ? `CD:${cd}` : 'READY'}</div></button>`; }).join('')}</div>
        ${b.choices.map((ch, i) => `<button class="answer-choice ${b.armedIdx === i ? 'armed' : ''}" onclick="selectArmedChoice(${i})">💬 「${escapeHtml(ch.text)}」</button>`).join('')}
        <div class="beat-ring-wrap"><div class="beat-ring-outer" id="beat-ring-outer"></div><button class="beat-spit-main-btn" onclick="executeRhythmSpit('choice')">🎯 BEAT RING SPIT!!（輪が重なる瞬間タップx1.5）</button></div>
        <div class="panel" style="padding:7px 9px;"><div style="display:flex;gap:6px;"><input type="text" id="battle-free-input" placeholder="自由1行アンサー手打ち（MC岩・ロールケーキ・博士に特効！）"><button class="btn btn-cyan" style="width:auto;padding:0 12px;" onclick="executeRhythmSpit('free')">自由SPIT</button></div></div>
        <div style="display:flex;justify-content:space-between;margin-top:4px;"><button class="btn" style="padding:5px 8px;font-size:9.5px;width:48%;" onclick="openDjMyouHub()">🎧 DJ MYOU 司令室</button><button class="btn" style="padding:5px 8px;font-size:9.5px;width:48%;opacity:0.8;" onclick="activeBattle=null;AudioEngine.stop();renderStreetTab()">🚪 サイファーを抜ける</button></div>`
      );
      startBeatRingLoop();
    };
  }

  installBattleRendererOverride();
  window.addEventListener('DOMContentLoaded', installBattleRendererOverride);

  window.executeRhythmSpit = function (mode) {
    const b = activeBattle; if (!b) return;
    const rv = b.currentPhaseObj || b.rival;
    const targetV = b.activeVowel || rv.targetVowel || 'ai';
    const dist = Math.min(getBeatPhase(), 1 - getBeatPhase()), winW = b.activeSkill === 'acapella' ? 0.32 : 0.18;
    const tRank = dist <= winW ? 'JUST' : dist <= 0.34 ? 'GOOD' : 'LATE', tMult = tRank === 'JUST' ? 1.5 : tRank === 'GOOD' ? 1.15 : 0.92;
    const st = state.stats || { lyric: 10, flow: 10, vibes: 10 }, statBoost = Math.floor((st.lyric + st.flow + st.vibes) / 8) + ((state.level || 1) - 1) * 2;
    let base = 0, hit = false, line = '', vowels = '';

    if (mode === 'free') {
      const txt = (document.getElementById('battle-free-input')?.value || '').trim();
      if (txt.length < 5) return showToast('5文字以上のアンサーを入力してください！');
      if (LEGAL_NG_WORDS.some(w => txt.includes(w))) return showToast('⚠️ 審査NGワードが含まれています');
      vowels = extractVowelsJP(txt);
      const vPool = Array.isArray(rv.multiVowels) ? rv.multiVowels : [targetV];
      hit = vPool.some(tv => vowels.slice(-2) === tv.slice(-2) || vowels.includes(tv));
      base = (hit ? 30 : 16) + statBoost; line = txt;
      state.lyrics.push({ id: 'lyr_' + Date.now(), text: txt, vowels, rank: hit ? 'S' : 'A', moneySnap: state.cash });
    } else {
      const ch = b.choices[b.armedIdx || 0]; line = ch.text; vowels = extractVowelsJP(line);
      if (ch.quality === 'perfect') { base = 24 + statBoost; hit = true; }
      else if (ch.quality === 'good') base = 13 + Math.floor(statBoost / 2);
      else base = -10;
    }

    b.rhymeChain = hit ? b.rhymeChain + 1 : 0;
    let rawDelta = base > 0 ? Math.round(base * tMult * (1 + Math.min(0.75, b.rhymeChain * 0.18)) * (b.nextSpitBoost || 1)) : base;
    const mechRes = evaluateLegendMechanic(b, mode, line, vowels, rawDelta, hit, tRank);
    hit = mechRes.hit;
    const counter = b.round < b.maxRounds ? Math.round(((rv.isBoss || rv.isLegend) ? 11 : 7) * (b.activeSkill === 'acapella' ? 0.5 : 1)) : 0;
    b.hype = Math.max(5, Math.min(100, b.hype + mechRes.delta - counter));
    b.spitBurst = true; b.nextSpitBoost = 1;
    Object.keys(b.cooldowns).forEach(k => { if (b.cooldowns[k] > 0 && k !== b.activeSkill) b.cooldowns[k]--; });
    b.activeSkill = null;
    b.lastLog = `${tRank}(${tMult}x) ${hit ? `🔥x${b.rhymeChain}` : ''} ➔ ${mechRes.delta >= 0 ? '+' : ''}${mechRes.delta}%`;

    if (mechRes.tag) triggerSlashCutIn(mechRes.tag, mechRes.sub || line.slice(0, 16), rv.accent || '#ffc83b');
    else if (tRank === 'JUST' || hit) triggerSlashCutIn(tRank === 'JUST' ? 'JUST SPIT x1.5!!' : 'RHYME CHAIN!!', line.slice(0, 16), '#c8ff29');
    if (mechRes.slashFx) setTimeout(triggerSpiralSlashVFX, 60);

    const earlyKO = !b.isJougenGauntlet && !Array.isArray(b.rival.phases) && b.hype >= 88;
    if (earlyKO || b.hype <= 5 || b.round >= b.maxRounds) {
      const isWin = b.hype >= 52 && b.hype > 5, r = b.rival;
      activeBattle = null; AudioEngine.stop();
      if (isWin) {
        const won = Math.floor(r.rewardCash * getActiveLabelBuff('hustle'));
        state.cash += won; state.respect += b.isJougenGauntlet ? 120 : (r.isBoss || r.isLegend ? 55 : 16);
        if (!Array.isArray(state.defeatedLegends)) state.defeatedLegends = [];
        if (r.isLegend && !state.defeatedLegends.includes(r.id)) state.defeatedLegends.push(r.id);
        if (r.mechanic === 'rhyme_lecture') state.stats.lyric += 3;
        if (r.isBoss) handleBossRootUnlock(r);
        if (r.isRare && r.dropRoot) handleRareRootDrop(r);
        if (b.isJougenGauntlet) completeJougenAnthemRecord();
        syncLegendUnlocks(); gainExp(r.exp); updateHeader(); saveState();
        if (b.isJougenGauntlet) {
          switchTab('studio');
          showToast(`🏆『上限』7人抜き完走！あなたの『上限 八』収録アンセムが完成しました！(+¥${won.toLocaleString()})`);
        } else {
          renderStreetTab();
          showToast(`🤜🤛 ${r.name}と拳を合わせプロップス獲得！ +¥${won.toLocaleString()} ${r.mechanic === 'rhyme_lecture' ? '/ LYRIC+3!' : ''}`);
        }
      } else {
        gainExp(20); updateHeader(); saveState(); renderStreetTab();
        showToast('惜敗… リズムと韻を磨いて再びマイクを握れ！(+20 EXP)');
      }
      return;
    }

    b.round += 1;
    if (b.isJougenGauntlet) {
      playDjMyouScratchSE();
      const nextLeg = b.jougenLineup[b.round - 1];
      b.currentPhaseObj = nextLeg;
      b.currentSpeaker = `${nextLeg.orderBadge}：${nextLeg.name}`;
      b.activeTaunt = nextLeg.taunt;
      b.activeVowel = nextLeg.targetVowel;
      b.overrideBpm = nextLeg.bpmShift ? nextLeg.bpmShift[0] : 94;
      b.choices = [...nextLeg.answers].sort(() => Math.random() - 0.5);
      b.armedIdx = 0;
      if (nextLeg.mechanic === 'roaring_acapella') AudioEngine.stop(); else AudioEngine.playTrack('jg_01');
      triggerSlashCutIn(nextLeg.orderBadge, `${nextLeg.name} がマイクを奪った!!`, nextLeg.accent);
    } else if (Array.isArray(b.rival.phases)) {
      playDjMyouScratchSE();
      const ph = b.rival.phases[Math.min(b.rival.phases.length - 1, b.round - 1)];
      b.currentSpeaker = ph.speaker; b.activeTaunt = ph.taunt; b.activeVowel = ph.targetVowel;
      b.choices = [...ph.answers].sort(() => Math.random() - 0.5); b.armedIdx = 0;
    } else {
      if (rv.bpmShift) b.overrideBpm = rv.bpmShift[(b.round - 1) % rv.bpmShift.length];
      if (rv.mechanic === 'roaring_acapella' && b.round >= 2) {
        AudioEngine.stop();
        b.lastLog = '🔇 大入道「音を止めろ！魂のアカペラ勝負だ！！」';
      }
    }
    renderBattleArena();
    setTimeout(() => { if (activeBattle) { activeBattle.spitBurst = false; if (b.isJougenGauntlet) triggerSpiralSlashVFX(); } }, 220);
  };
})();
