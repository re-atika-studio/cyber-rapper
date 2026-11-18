/* =========================================================================
   CYBER RAPPER // v10.0 HARDCORE BOSS ENGINE & DAY-JOB MINIGAMES
   - Over-the-Shoulder Back Camera + Real HP Bars + 2-Bar Turn Alternation
   - No 3-Choices: 1 Weak Random Fallback OR Serious Multi-Rhyme Writing
   - Kanji-Aware Multi-Clause Rhyme Combo + 2-Bar Flow Tap + Auto-Skills
   - 3 Playable Day-Job Minigames (SORT / LANE_RUN / FADER)
   ========================================================================= */

const KANJI_PHONETIC_DICT = [
  ['渋谷','しぶや'],['新宿','しんじゅく'],['東京','とうきょう'],['徹夜','てつや'],['笑顔','えがお'],
  ['吉野家','よしのや'],['牛丼屋','ぎゅうどんや'],['家族','かぞく'],['仲間','なかま'],['言葉','ことば'],
  ['覚悟','かくご'],['時代','じだい'],['世代','せだい'],['未来','みらい'],['限界','げんかい'],
  ['境界','きょうかい'],['証明','しょうめい'],['革命','かくめい'],['共鳴','きょうめい'],['雷鳴','らいめい'],
  ['鼓動','こどう'],['衝動','しょうどう'],['波動','はどう'],['行動','こうどう'],['最高','さいこう'],
  ['最強','さいきょう'],['太陽','たいよう'],['相棒','あいぼう'],['現場','げんば'],['論破','ろんぱ'],
  ['音楽','おんがく'],['現実','げんじつ'],['伝説','でんせつ'],['本物','ほんもの'],['偽物','にせもの'],
  ['発電所','はつでんしょ'],['変電所','へんでんしょ'],['生命線','せいめいせん'],['臨界点','りんかいてん'],
  ['路地裏','ろじうら'],['生き方','いきかた'],['地下','ちか'],['夜','よる'],['朝','あさ'],['俺','おれ'],['価値','かち']
];

const BOSS_DENSE_BARS = {
  boss_bulldog: [
    { bar: 'ここは地元の路地裏、甘い覚悟は命取りだ、吠える番犬の牙が切り裂くお前の未来', target: 'ai' },
    { bar: 'コンクリートの現場、鳴らす重低音の連打、口先だけのルーキーは今すぐここから消えな', target: 'ea' }
  ],
  boss_dub: [
    { bar: '深夜の第三倉庫、揺らす極太の重低音と咆哮、霧の湾岸で沈めるお前の無謀な航路', target: 'ou' },
    { bar: '鉄のコンテナが共鳴、ダブの残響が証明、底なしのベースラインで奪うお前の生命', target: 'ei' }
  ],
  boss_vera: [
    { bar: 'ネオン輝く首都の頂点、誰も触れられぬ女王の表現、氷の視線で凍らせるお前の挑戦', target: 'en' },
    { bar: 'ここは眠らない渋谷、スポットライト浴びる徹夜、王冠の輝きで黙らせる全ての外野', target: 'ia' }
  ],
  boss_shaka_bros: [
    { bar: '地下の変電所、再起動する人間発電所、黄金の兄弟が繋ぐビートがこの街の生命線', target: 'en' },
    { bar: '壱号機から弐号機へ渡す太陽、90年代の魂が鳴らす最強の波動、超えてみろこの衝動', target: 'ou' }
  ],
  leg_mc_iwa: [
    { bar: 'ここは新宿の現場、嘘が通じねえ言葉の連打、泥水すすった生き様だけが本物の証だ', target: 'ia' },
    { bar: '飾らねえ玄武岩の鼓動、六畳一間から響く衝動、小手先の韻じゃ砕けねえ俺の王道', target: 'ou' }
  ],
  leg_rollcake: [
    { bar: 'ここは渋谷、俺は徹夜、朝まで沸かせる地下の小屋、最後に咲かせる仲間の笑顔や', target: 'oa' },
    { bar: '三重の螺旋で巻く証明、時代も世代も超える革命、聖人のフロウに会場全員が共鳴', target: 'ei' }
  ],
  leg_kamakiri: [
    { bar: '薄い理屈じゃできんぞ論破、鎌より鋭く研いだ言葉、正面から斬り捨てるお前の愚かな一歩だ', target: 'oa' },
    { bar: '極彩色のシャツで腕組み、一瞬で見抜くお前の弱み、慈悲なく終わらせるこの枠組み', target: 'ui' }
  ],
  leg_shingi: [
    { bar: '投げんなよ匙、七色の声紋で問うお前の価値、偽物を切り裂き切り開く新しい時代と道', target: 'ii' },
    { bar: '変幻自在に刻む鼓動、創成期から続くこの舗道、本物だけが生き残るストリートの作法', target: 'ou' }
  ],
  leg_oonyudo: [
    { bar: '豪雨の野音に轟く覚悟、音が止まっても退かぬ一歩、仁王の拳で叩き込む魂の言語', target: 'uo' }
  ],
  leg_z_brave: [
    { bar: '白と黒の縞模様が王者の証明、創成期から築いた脚韻の体系、ひれ伏せこれが原点の威厳', target: 'ei' }
  ],
  leg_owl_rock: [
    { bar: '深夜特急が切り裂く暗闇の視界、雷電のマイクで沸かせるステージの未来、限界突破の気合い', target: 'ai' }
  ],
  leg_dr_rhyme: [
    { bar: '黒縁のレンズで解析する韻の構造、知性と理論が支配する言葉の王道、証明せよお前の才能', target: 'ou' }
  ]
};

const WEAK_RANDOM_FALLBACKS = [
  'とりあえずマイク握って返すぜこの場の空気',
  'まだまだ負けないぜ俺のスタイルで前に進む',
  'ビートに乗ってなんとか食らいついていくだけさ',
  '言葉が出てこないけど気持ちだけは折れないぜ'
];

let activeBossBattle = null, bossFlowRaf = null, activeJobGame = null, jobGameTimer = null;

/* --- Kanji-Aware Deep Rhyme & Multi-Clause Combo Analyzer --- */
function toPhoneticVowels(rawText) {
  let normalized = String(rawText || '');
  KANJI_PHONETIC_DICT.forEach(([k, hira]) => { normalized = normalized.split(k).join(hira); });
  return extractVowelsJP(normalized);
}

function analyzeDeepRhyme(text, targetVowel) {
  let norm = String(text || '').trim();
  KANJI_PHONETIC_DICT.forEach(([k, hira]) => { norm = norm.split(k).join(hira); });
  const clauses = norm.split(/[、。！？!?\s　/]+/).map(s => s.trim()).filter(s => s.length >= 2);
  const clauseVowels = clauses.map(c => extractVowelsJP(c)).filter(v => v.length >= 2);
  const fullVowels = extractVowelsJP(norm);
  const tv = (targetVowel || 'ou').slice(-2);

  let rhymeCombo = 0;
  const tailCounts = {}, headCounts = {};
  clauseVowels.forEach(v => {
    const tail = v.slice(-2), head = v.slice(0, 2);
    tailCounts[tail] = (tailCounts[tail] || 0) + 1;
    headCounts[head] = (headCounts[head] || 0) + 1;
    if (tail === tv) rhymeCombo += 1;
  });

  const bestInternalTail = Math.max(0, ...Object.values(tailCounts));
  if (bestInternalTail >= 2) rhymeCombo = Math.max(rhymeCombo, bestInternalTail);

  if (clauses.length === 1 && fullVowels.length >= 6) {
    for (let i = 0; i <= fullVowels.length - 4; i += 2) {
      const pair = fullVowels.slice(i, i + 2);
      const rest = fullVowels.slice(i + 2);
      if (rest.includes(pair)) rhymeCombo = Math.max(rhymeCombo, 2);
    }
  }

  const endMatched = fullVowels.slice(-2) === tv || clauseVowels.some(v => v.slice(-2) === tv);
  const deep3Matched = fullVowels.length >= 3 && clauseVowels.some((v, i) => i > 0 && v.slice(-3) === clauseVowels[0].slice(-3));
  const alliteration = Math.max(0, ...Object.values(headCounts)) >= 2;
  if (endMatched && rhymeCombo === 0) rhymeCombo = 1;

  return { fullVowels, clauses, clauseVowels, rhymeCombo, endMatched, deep3Matched, alliteration, lengthBonus: Math.min(1.35, 0.85 + norm.length * 0.02) };
}

/* --- Launch Serious Boss / Legend Battle (with Loading Transition) --- */
function startV10BossMatch(bossTemplate, isGauntlet, gauntletList) {
  ensureV10State();
  const maxHp = getPlayerMaxHP();
  state.hp = maxHp;
  const bLv = bossTemplate.lv || 6;
  const bossMaxHp = 360 + bLv * 195 + (isGauntlet ? 450 : 0);
  const barsPool = BOSS_DENSE_BARS[bossTemplate.id] || [{ bar: bossTemplate.taunt || '本気の言葉でかかってこい', target: bossTemplate.targetVowel || 'ou' }];
  const firstBar = barsPool[0];
  const bossRhyme = analyzeDeepRhyme(firstBar.bar, firstBar.target);

  transitionMode('BOSS_BATTLE', `VS ${bossTemplate.name} (LV.${bLv})`, '3択は通用しない。二重押韻リリックと2小節フロウタップでHPを削り切れ！', () => {
    AudioEngine.playTrack(isGauntlet ? 'jg_01' : (state.music?.equippedTrackId || 'bb_01'));
    activeBossBattle = {
      boss: bossTemplate,
      isGauntlet: !!isGauntlet,
      gauntletList: gauntletList || null,
      gauntletIdx: 0,
      turn: 1,
      phase: 'WRITE', // 'WRITE' -> 'FLOW_TAP'
      playerHp: maxHp,
      playerMaxHp: maxHp,
      bossHp: bossMaxHp,
      bossMaxHp: bossMaxHp,
      currentBar: firstBar.bar,
      targetVowel: firstBar.target,
      bossCombo: Math.max(2, bossRhyme.rhymeCombo),
      randomFallback: WEAK_RANDOM_FALLBACKS[Math.floor(Math.random() * WEAK_RANDOM_FALLBACKS.length)],
      pendingLyric: '',
      pendingRhyme: null,
      usedFallback: false,
      flowStartTs: 0,
      flowTaps: [],
      battleLog: `🔥 ${bossTemplate.name} が ${Math.max(2, bossRhyme.rhymeCombo)}連続押韻バースをスピット！お前の2小節で返せ！`,
      slashVfx: false
    };
    renderV10BossBattle();
  });
}

/* --- Over-the-Shoulder Back Camera Protagonist SVG --- */
function renderPlayerBackShoulderHTML() {
  const isDiva = state.profile.gender === 'diva', sideCol = getSideTheme().color;
  const customBack = AssetImageCache.resolve(isDiva ? 'diva_back_battle.png' : 'king_back_battle.png', { cutout: true });
  if (customBack) return `<img src="${customBack}" class="v10-back-sprite" alt="YOU">`;
  return `<svg viewBox="0 0 240 280" class="v10-back-sprite">
    <defs><linearGradient id="bkGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1e293b"/><stop offset="100%" stop-color="#090a12"/></linearGradient></defs>
    <path d="M24 280 C34 196, 68 166, 112 162 C158 166, 192 198, 206 280 Z" fill="url(#bkGrad)" stroke="${sideCol}" stroke-width="3"/>
    <path d="M62 174 Q114 205 166 174" fill="none" stroke="#ffc83b" stroke-width="4"/>
    <circle cx="114" cy="104" r="42" fill="#141624" stroke="${sideCol}" stroke-width="2.6"/>
    <path d="${isDiva ? 'M70 96 C62 146,78 190,94 212 L138 208 C154 184,164 140,156 94 Z' : 'M74 92 L66 128 L84 118 L96 140 L118 122 L138 138 L156 116 L152 86 Z'}" fill="#0f111c" stroke="${sideCol}" stroke-width="2"/>
    <g transform="translate(166, 128) rotate(18)">
      <rect x="0" y="18" width="16" height="68" rx="6" fill="#0f172a" stroke="#e2e8f0" stroke-width="2"/>
      <circle cx="8" cy="12" r="14" fill="#334155" stroke="#00f0ff" stroke-width="2.5"/>
    </g>
  </svg>`;
}

function updateLiveRhymePreview(val) {
  const box = document.getElementById('v10-rhyme-preview');
  if (!box || !activeBossBattle) return;
  if (!val.trim()) { box.textContent = '母音プレビュー: リリックを入力すると押韻コンボ数をリアルタイム解析します'; return; }
  const res = analyzeDeepRhyme(val, activeBossBattle.targetVowel);
  box.innerHTML = `解析母音: <b style="color:#00f0ff;">[${res.fullVowels.slice(-12)}]</b> ／ 検出コンボ: <b style="color:#c8ff29;">${res.rhymeCombo}重押韻</b> ${res.endMatched ? '✨脚韻一致!' : ''}`;
}

function lockLyricAndStartFlow(useWeakFallback) {
  const b = activeBossBattle; if (!b || b.phase !== 'WRITE') return;
  let txt = '';
  if (useWeakFallback) {
    txt = b.randomFallback;
    b.usedFallback = true;
  } else {
    txt = (document.getElementById('v10-boss-lyric-in')?.value || '').trim();
    if (txt.length < 6) return showToast('BOSSに挑むなら6文字以上の真剣なリリックを刻め！');
    if (LEGAL_NG_WORDS.some(w => txt.includes(w))) return showToast('⚠️ NGワードが含まれています');
    b.usedFallback = false;
    state.lyrics.push({ id: 'lyr_' + Date.now(), text: txt, vowels: toPhoneticVowels(txt), rank: 'S', moneySnap: state.cash });
  }
  b.pendingLyric = txt;
  b.pendingRhyme = analyzeDeepRhyme(txt, b.targetVowel);
  b.phase = 'FLOW_TAP';
  b.flowTaps = [];
  b.flowStartTs = performance.now();
  renderV10BossBattle();
  runTwoBarFlowLoop();
}

function recordBossFlowTap() {
  const b = activeBossBattle; if (!b || b.phase !== 'FLOW_TAP') return;
  const bpm = AudioEngine.getCurrentBpm() || 96;
  const twoBarMs = (60000 / bpm) * 8;
  const elapsed = performance.now() - b.flowStartTs;
  if (elapsed > twoBarMs || b.flowTaps.length >= 8) return;
  const beatPos = (elapsed / (twoBarMs / 8));
  const dist = Math.abs(beatPos - Math.round(beatPos));
  const justWindow = 0.20 + Math.min(0.14, (state.stats.flow || 10) * 0.003);
  const quality = dist <= justWindow ? 'JUST' : dist <= 0.36 ? 'GOOD' : 'MISS';
  b.flowTaps.push({ beat: Math.min(7, Math.round(beatPos)), quality });
  const pad = document.getElementById('v10-flow-pad-btn');
  if (pad) { pad.textContent = `⚡ ${quality}!! (${b.flowTaps.length} HIT)`; }
}

function runTwoBarFlowLoop() {
  if (bossFlowRaf) cancelAnimationFrame(bossFlowRaf);
  const bpm = AudioEngine.getCurrentBpm() || 96;
  const twoBarMs = (60000 / bpm) * 8;
  const step = () => {
    const b = activeBossBattle;
    if (!b || b.phase !== 'FLOW_TAP') return;
    const pct = Math.min(1, (performance.now() - b.flowStartTs) / twoBarMs);
    const barEl = document.getElementById('v10-2bar-cursor');
    if (barEl) barEl.style.left = `${(pct * 100).toFixed(1)}%`;
    if (pct >= 1) {
      resolveTwoBarBossTurn();
      return;
    }
    bossFlowRaf = requestAnimationFrame(step);
  };
  bossFlowRaf = requestAnimationFrame(step);
}

function resolveTwoBarBossTurn() {
  const b = activeBossBattle; if (!b) return;
  const r = b.pendingRhyme || { rhymeCombo: 0, endMatched: false, alliteration: false, lengthBonus: 0.8 };
  const taps = b.flowTaps;
  const justCount = taps.filter(t => t.quality === 'JUST').length;
  const goodCount = taps.filter(t => t.quality === 'GOOD').length;
  const tapTotal = Math.max(1, taps.length);
  const flowAcc = taps.length === 0 ? 0.25 : (justCount * 1.0 + goodCount * 0.65) / Math.max(4, tapTotal);

  // Level & Stat Scaling (Serious RPG Formula)
  const lvDiff = (b.boss.lv || 6) - (state.level || 1);
  const lvScalePlayer = lvDiff > 0 ? Math.max(0.38, 1 - lvDiff * 0.14) : (1 + Math.abs(lvDiff) * 0.08);
  const lvScaleBoss = lvDiff > 0 ? (1 + lvDiff * 0.22) : Math.max(0.65, 1 + lvDiff * 0.05);

  let rawDmg = (26 + (state.stats.lyric || 10) * 3.1 + (state.level || 1) * 12) * r.lengthBonus;
  if (b.usedFallback) rawDmg *= 0.35; // Weak fallback cannot beat bosses easily!
  const rhymeMult = 1 + r.rhymeCombo * 0.42 + (r.endMatched ? 0.35 : 0) + (r.deep3Matched ? 0.3 : 0);
  const flowMult = 0.55 + flowAcc * 0.95;

  // Natural Auto-Skill Evaluation (No Manual Selection!)
  let autoSkillName = null, autoMult = 1.0;
  const critChance = 0.08 + (state.stats.sense || 10) * 0.008 + r.rhymeCombo * 0.09;
  const isCrit = !b.usedFallback && (Math.random() < critChance || (r.rhymeCombo >= 2 && justCount >= 3));

  if (!b.usedFallback) {
    if (r.rhymeCombo >= 3 && flowAcc >= 0.6) {
      autoSkillName = '🔥 AUTO SKILL: TRIPLE RHYME SUPERNOVA!!'; autoMult = 2.55;
      b.playerHp = Math.min(b.playerMaxHp, b.playerHp + Math.round(b.playerMaxHp * 0.14));
    } else if (r.rhymeCombo >= 2 && justCount >= 3) {
      autoSkillName = '⚡ AUTO SKILL: DOUBLE RHYME BREAKER!!'; autoMult = 2.05;
    } else if (taps.length >= 6 && r.endMatched && flowAcc >= 0.65) {
      autoSkillName = '🌪️ AUTO SKILL: MACHINEGUN FLOW!!'; autoMult = 1.85;
    } else if (r.endMatched && r.alliteration && justCount >= 2) {
      autoSkillName = '💥 AUTO SKILL: HEAD & TAIL COUNTER!!'; autoMult = 1.95;
    }
  }

  const finalPlayerDmg = Math.max(8, Math.round(rawDmg * rhymeMult * flowMult * autoMult * (isCrit ? 1.35 : 1) * lvScalePlayer));
  b.bossHp = Math.max(0, b.bossHp - finalPlayerDmg);
  b.slashVfx = !!(autoSkillName || isCrit);

  if (autoSkillName) triggerSlashCutIn(autoSkillName, `${finalPlayerDmg} DMG!! (${r.rhymeCombo}重韻×${justCount}JUST)`, '#ffc83b');
  else if (isCrit) triggerSlashCutIn('CRITICAL RHYME!!', `${finalPlayerDmg} DMG!!`, '#00f0ff');

  // Check Boss Defeated
  if (b.bossHp <= 0) {
    if (b.isGauntlet && b.gauntletList && b.gauntletIdx < b.gauntletList.length - 1) {
      b.gauntletIdx += 1;
      const nextLeg = b.gauntletList[b.gauntletIdx];
      playDjMyouScratchSE();
      b.boss = nextLeg;
      b.bossMaxHp = 520 + nextLeg.lv * 160;
      b.bossHp = b.bossMaxHp;
      const nb = (BOSS_DENSE_BARS[nextLeg.id] || [{ bar: nextLeg.taunt, target: nextLeg.targetVowel }])[0];
      b.currentBar = nb.bar; b.targetVowel = nb.target;
      b.bossCombo = Math.max(2, analyzeDeepRhyme(nb.bar, nb.target).rhymeCombo);
      b.phase = 'WRITE'; b.turn += 1;
      b.battleLog = `🎧 DJ MYOUスクラッチ！次鋒 ${nextLeg.orderBadge}：${nextLeg.name} 登場！`;
      triggerSlashCutIn(`${nextLeg.orderBadge} // ${nextLeg.name}`, '7連マイクリレー継続！！', nextLeg.accent || '#ffc83b');
      return renderV10BossBattle();
    }
    const wonBoss = b.boss, wasJougen = b.isGauntlet;
    activeBossBattle = null; AudioEngine.stop();
    const cashWon = wonBoss.rewardCash || 180000, expWon = wonBoss.exp || 320;
    state.cash += cashWon; state.respect += 55;
    if (wonBoss.isBoss) handleBossRootUnlock(wonBoss);
    if (wonBoss.isLegend && typeof state.defeatedLegends === 'object') {
      if (!state.defeatedLegends.includes(wonBoss.id)) state.defeatedLegends.push(wonBoss.id);
    }
    if (wasJougen && typeof completeJougenAnthemRecord === 'function') completeJougenAnthemRecord();
    gainV10Exp(expWon); saveState();
    return transitionMode('HOME', 'VICTORY // PROPS EARNED!!', `${wonBoss.name} に実力を認めさせた！ (+¥${cashWon.toLocaleString()} / +${expWon} EXP)`);
  }

  // Boss Counter Turn (2 Bars with Boss Rhyme Combo Bonus!)
  const barsPool = BOSS_DENSE_BARS[b.boss.id] || [{ bar: b.boss.taunt || '甘い言葉じゃ俺は揺るがねえ', target: b.boss.targetVowel || 'ou' }];
  const nextBarObj = barsPool[b.turn % barsPool.length];
  const bossRhymeEval = analyzeDeepRhyme(nextBarObj.bar, nextBarObj.target);
  const bossCombo = Math.max(2, bossRhymeEval.rhymeCombo);
  const bossBase = 34 + (b.boss.lv || 6) * 13;
  const bossDmg = Math.max(12, Math.round(bossBase * (1 + bossCombo * 0.28) * lvScaleBoss - (state.stats.vibes || 10) * 1.3));
  b.playerHp = Math.max(0, b.playerHp - bossDmg);

  if (b.playerHp <= 0) {
    activeBossBattle = null; AudioEngine.stop();
    gainV10Exp(35); saveState();
    return transitionMode('HOME', 'DEFEATED... // LEVEL UP & RETRY', `BOSSの${bossCombo}重押韻コンボ(${bossDmg} DMG)に沈んだ… 昼職やサイファーでLvとVIBESを鍛え直せ！`);
  }

  b.turn += 1;
  b.phase = 'WRITE';
  b.currentBar = nextBarObj.bar;
  b.targetVowel = nextBarObj.target;
  b.bossCombo = bossCombo;
  b.randomFallback = WEAK_RANDOM_FALLBACKS[Math.floor(Math.random() * WEAK_RANDOM_FALLBACKS.length)];
  b.battleLog = `あなた: ${finalPlayerDmg} DMG ⇄ ${b.boss.name}の${bossCombo}連韻コンボ反撃: -${bossDmg} HP！`;
  renderV10BossBattle();
}

function renderV10BossBattle() {
  const b = activeBossBattle; if (!b) return renderV10ActiveMode();
  const bgUrl = (b.isGauntlet || b.boss.id === 'leg_oonyudo')
    ? (AssetImageCache.resolve('bg_jougen_yaon.jpg', { cutout: false }) || AssetImageCache.resolveStageBg())
    : AssetImageCache.resolveStageBg();
  const bossSprite = b.boss.bossSprite || b.boss.sprite;
  const bossImgUrl = bossSprite ? AssetImageCache.resolve(bossSprite, { cutout: true, onReady: () => { if (activeBossBattle) renderV10BossBattle(); } }) : null;
  const slashUrl = b.slashVfx ? AssetImageCache.resolve('fx_legend_spiral_slash.png', { cutout: false }) : null;
  const pPct = Math.round((b.playerHp / b.playerMaxHp) * 100), ePct = Math.round((b.bossHp / b.bossMaxHp) * 100);

  setCockpitView(
    `<div class="v10-boss-screen">
      <div class="v10-boss-stage" style="${bgUrl ? `background-image:linear-gradient(180deg,rgba(6,6,14,0.35),rgba(6,6,14,0.92)),url('${bgUrl}');` : ''}">
        ${slashUrl ? `<img src="${slashUrl}" class="v10-slash-vfx" alt="">` : ''}
        <div class="v10-boss-hud">
          <div class="v10-hp-box">
            <div style="display:flex;justify-content:space-between;font-size:10px;font-weight:900;"><span style="color:#00f0ff;">YOU (LV.${state.level})</span><span>${b.playerHp}/${b.playerMaxHp}</span></div>
            <div class="v10-hp-track"><div class="v10-hp-fill you" style="width:${pPct}%;"></div></div>
          </div>
          <div class="v10-turn-pill">2-BAR<br>T${b.turn}</div>
          <div class="v10-hp-box">
            <div style="display:flex;justify-content:space-between;font-size:10px;font-weight:900;"><span style="color:#ff3358;">${escapeHtml(b.boss.name)} (LV.${b.boss.lv})</span><span>${b.bossHp}/${b.bossMaxHp}</span></div>
            <div class="v10-hp-track"><div class="v10-hp-fill boss" style="width:${ePct}%;"></div></div>
          </div>
        </div>

        <div class="v10-boss-enemy-depth">
          ${bossImgUrl
            ? `<img src="${bossImgUrl}" class="v10-boss-portrait" style="${AssetImageCache.isTaintedSprite(bossSprite) ? 'filter:url(#tainted-black-key);' : ''}">`
            : `<div style="width:170px;height:210px;">${renderRivalSVG(b.boss.style || 'boss_local')}</div>`}
        </div>

        <div class="v10-boss-player-back">${renderPlayerBackShoulderHTML()}</div>

        <div class="v10-boss-verse-card">
          <div style="display:flex;justify-content:space-between;font-size:9.5px;font-weight:900;color:#ffc83b;">
            <span>🎤 ${escapeHtml(b.boss.name)} // 2-BAR VERSE</span>
            <span>🔥 BOSS RHYME COMBO x${b.bossCombo} / ターゲット韻: [ …${b.targetVowel} ]</span>
          </div>
          <div style="font-size:11.5px;font-weight:900;color:#fff;margin-top:3px;line-height:1.4;">「${escapeHtml(b.currentBar)}」</div>
        </div>
      </div>

      <div class="v10-boss-deck">
        <div style="font-size:9.5px;color:var(--accent-lime);font-weight:800;margin-bottom:5px;">${escapeHtml(b.battleLog)}</div>
        ${b.phase === 'WRITE' ? `
          <textarea id="v10-boss-lyric-in" rows="2" oninput="updateLiveRhymePreview(this.value)" placeholder="【1/2 リリック構築】読点「、」や句切れで同じ母音を2〜3回踏む『多重押韻』＋末尾［…${b.targetVowel}］を狙え！"></textarea>
          <div id="v10-rhyme-preview" style="font-size:9.5px;color:var(--text-sub);margin:4px 0 6px;font-family:monospace;">母音プレビュー: 漢字も自動解析！2重押韻＋フロウJUSTでオート必殺スキル発動！</div>
          <button class="btn btn-lime" style="margin-bottom:6px;padding:10px;" onclick="lockLyricAndStartFlow(false)">🎤 このリリックで『2小節フロウ・タップ』へ突入！</button>
          <div style="display:flex;gap:6px;">
            <button class="btn" style="font-size:9.5px;padding:6px;opacity:0.8;" onclick="lockLyricAndStartFlow(true)">💬 とっさの弱ネタ1枠:「${escapeHtml(b.randomFallback.slice(0, 17))}…」(威力極小)</button>
            <button class="btn btn-danger" style="width:auto;padding:6px 10px;font-size:9.5px;" onclick="activeBossBattle=null;AudioEngine.stop();transitionMode('HOME','RETREATED')">撤退</button>
          </div>
        ` : `
          <div class="v10-sec-label">【2/2 フロウ表現】2小節（8拍）のビートマーカーに合わせてパッドを叩け！</div>
          <div class="v10-2bar-timeline">
            ${[0,1,2,3,4,5,6,7].map(i => `<span class="v10-beat-dot ${i===3||i===7?'snare':''}" style="left:${(i*12.5+6)}%;">${i+1}</span>`).join('')}
            <div id="v10-2bar-cursor" class="v10-2bar-cursor"></div>
          </div>
          <button id="v10-flow-pad-btn" class="v10-flow-pad" onpointerdown="recordBossFlowTap()">⚡ TAP FLOW ON BEAT!! (リズムを刻め！)</button>
        `}
      </div>
    </div>`,
    ''
  );
}

/* --- 5. Playable Day-Job Minigames (SORT / LANE_RUN / FADER) --- */
function startV10JobMinigame(jobId) {
  const job = STREET_JOBS.find(j => j.id === jobId) || STREET_JOBS[0];
  state.profile.currentJobId = job.id;
  const type = job.id.includes('courier') || job.id.includes('porter') ? 'LANE_RUN'
    : (job.id.includes('club') || job.id.includes('dj') || job.id.includes('flyer')) ? 'FADER' : 'SORT';
  transitionMode('JOB', `DAY JOB // ${job.name}`, '高スコアで日給アップ＋BOSS戦に不可欠な基礎ステータスが成長！', () => {
    clearInterval(jobGameTimer);
    activeJobGame = {
      job, type, score: 0, combo: 0, timeLeft: 15,
      targetSide: Math.random() < 0.5 ? 'L' : 'R',
      playerLane: 1, obsLane: Math.floor(Math.random() * 3), obsY: 0,
      faderPos: 10, faderDir: 7
    };
    jobGameTimer = setInterval(tickV10JobMinigame, 120);
    renderV10JobMinigame();
  });
}

function tickV10JobMinigame() {
  const g = activeJobGame; if (!g) return clearInterval(jobGameTimer);
  g.timeLeft = Number((g.timeLeft - 0.12).toFixed(2));
  if (g.type === 'LANE_RUN') {
    g.obsY += 18;
    if (g.obsY >= 90) {
      if (g.playerLane === g.obsLane) { g.combo = 0; g.score = Math.max(0, g.score - 15); }
      else { g.combo += 1; g.score += 25 + g.combo * 4; }
      g.obsY = 0; g.obsLane = Math.floor(Math.random() * 3);
    }
  } else if (g.type === 'FADER') {
    g.faderPos += g.faderDir;
    if (g.faderPos >= 92 || g.faderPos <= 8) g.faderDir *= -1;
  }
  if (g.timeLeft <= 0) return finishV10JobMinigame();
  renderV10JobMinigame();
}

function actV10JobInput(val) {
  const g = activeJobGame; if (!g) return;
  if (g.type === 'SORT') {
    if (val === g.targetSide) { g.combo += 1; g.score += 20 + g.combo * 5; }
    else { g.combo = 0; g.score = Math.max(0, g.score - 10); }
    g.targetSide = Math.random() < 0.5 ? 'L' : 'R';
  } else if (g.type === 'LANE_RUN') {
    g.playerLane = Math.max(0, Math.min(2, g.playerLane + val));
  } else if (g.type === 'FADER') {
    const dist = Math.abs(g.faderPos - 50);
    if (dist <= 14) { g.combo += 1; g.score += 45 + g.combo * 8; }
    else { g.combo = 0; }
  }
  renderV10JobMinigame();
}

function finishV10JobMinigame() {
  clearInterval(jobGameTimer);
  const g = activeJobGame; activeJobGame = null;
  const rank = g.score >= 220 ? 'S' : g.score >= 130 ? 'A' : 'B';
  const mult = rank === 'S' ? 2.1 : rank === 'A' ? 1.45 : 1.0;
  const pay = Math.round(g.job.wage * mult);
  state.cash += pay;
  if (g.type === 'SORT') { state.stats.vibes += (rank === 'S' ? 3 : 2); state.stats.lyric += 1; }
  else if (g.type === 'LANE_RUN') { state.stats.flow += (rank === 'S' ? 3 : 2); state.stats.sense += 1; }
  else { state.stats.sense += (rank === 'S' ? 3 : 2); state.stats.vibes += 1; }
  if (g.job.id === 'job_warehouse' && !state.ownedGear8.includes('job_work_jkt')) state.ownedGear8.push('job_work_jkt');
  state.hp = getPlayerMaxHP();
  gainV10Exp(rank === 'S' ? 85 : 55);
  saveState();
  transitionMode('HOME', `SHIFT CLEAR! [${rank}-RANK]`, `給与 +¥${pay.toLocaleString()} 獲得＆基礎ステータスが成長した！`);
}

function renderV10JobMinigame() {
  const g = activeJobGame; if (!g) return;
  let arena = '';
  if (g.type === 'SORT') {
    arena = `<div style="text-align:center;padding:24px 10px;">
      <div style="font-size:11px;color:var(--text-sub);margin-bottom:8px;">流れてくる荷物のカラー方向に高速仕分けろ！</div>
      <div style="padding:22px;border-radius:14px;border:3px solid ${g.targetSide==='L'?'#00f0ff':'#ff2e93'};background:rgba(10,12,24,0.9);font-size:22px;font-weight:900;color:${g.targetSide==='L'?'#00f0ff':'#ff2e93'};margin-bottom:16px;">
        📦 ${g.targetSide === 'L' ? '◀ CYAN BOX (左へ!)' : 'MAGENTA BOX (右へ!) ▶'}
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <button class="btn btn-cyan" style="padding:18px;font-size:15px;" onclick="actV10JobInput('L')">◀ LEFT (CYAN)</button>
        <button class="btn btn-primary" style="padding:18px;font-size:15px;" onclick="actV10JobInput('R')">RIGHT (PINK) ▶</button>
      </div>
    </div>`;
  } else if (g.type === 'LANE_RUN') {
    arena = `<div style="padding:12px;">
      <div style="height:170px;display:grid;grid-template-columns:repeat(3,1fr);gap:6px;background:#090b14;border:1px solid var(--border);border-radius:12px;padding:8px;position:relative;">
        ${[0,1,2].map(ln => `<div style="border-right:${ln<2?'1px dashed #222':'none'};position:relative;">
          ${g.obsLane === ln ? `<div style="position:absolute;top:${g.obsY}%;left:50%;transform:translateX(-50%);font-size:24px;">🚧</div>` : ''}
          ${g.playerLane === ln ? `<div style="position:absolute;bottom:6px;left:50%;transform:translateX(-50%);font-size:26px;">🛵</div>` : ''}
        </div>`).join('')}
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px;">
        <button class="btn btn-cyan" style="padding:16px;font-size:16px;" onclick="actV10JobInput(-1)">◀ 左レーン回避</button>
        <button class="btn btn-cyan" style="padding:16px;font-size:16px;" onclick="actV10JobInput(1)">右レーン回避 ▶</button>
      </div>
    </div>`;
  } else {
    arena = `<div style="padding:22px 12px;text-align:center;">
      <div style="font-size:11px;color:var(--text-sub);margin-bottom:14px;">黄金のセンターゾーン(36%〜64%)でフェーダーをロックしろ！</div>
      <div style="height:32px;background:#111322;border-radius:99px;position:relative;border:2px solid var(--border);margin-bottom:18px;overflow:hidden;">
        <div style="position:absolute;left:36%;width:28%;top:0;bottom:0;background:rgba(255,200,59,0.32);border-left:2px solid #ffc83b;border-right:2px solid #ffc83b;"></div>
        <div style="position:absolute;left:${g.faderPos}%;top:0;bottom:0;width:8px;background:#00f0ff;box-shadow:0 0 12px #00f0ff;"></div>
      </div>
      <button class="btn btn-gold" style="padding:18px;font-size:15px;" onclick="actV10JobInput(0)">⚡ LOCK BEAT / SHAKE!!</button>
    </div>`;
  }

  setCockpitView(
    `<div class="v10-subscreen">
      <div class="v10-sub-header">
        <span>💼 ${escapeHtml(g.job.name)}</span>
        <span style="color:var(--accent-gold);font-family:monospace;">⏱ ${Math.max(0, g.timeLeft).toFixed(1)}s | SCORE ${g.score} (${g.combo}x)</span>
      </div>
      <div class="panel">${arena}</div>
    </div>`,
    ''
  );
}

/* --- Hook Boss & Legend Entry Points into v10 Hardcore Boss Engine --- */
window.addEventListener('DOMContentLoaded', () => {
  window.startBossBattle = function (idx) {
    const b = DISTRICT_BOSSES[idx] || DISTRICT_BOSSES[0];
    startV10BossMatch(b, false);
  };
  window.startSoloLegendBattle = function (legId) {
    if (typeof closeModal === 'function') closeModal();
    const leg = ALL_LEGENDS.find(x => x.id === legId);
    if (!leg) return;
    startV10BossMatch(Object.assign({ isBoss: true, isLegend: true }, leg), false);
  };
  window.launchJougenPosseCut = function () {
    if (typeof closeModal === 'function') closeModal();
    const lineup = JOUGEN_7_IDS.map(id => Object.assign({ isBoss: true, isLegend: true }, ALL_LEGENDS.find(x => x.id === id))).filter(Boolean);
    startV10BossMatch(lineup[0], true, lineup);
  };
});
