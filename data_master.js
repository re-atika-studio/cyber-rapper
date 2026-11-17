/* =========================================================================
   CYBER RAPPER // LOST ARCHIVE RPG v8.0 — Master Data & Hybrid BGM Engine
   2 Sides + 47 Prefectures + Street Job Gacha + Roots/Tracks + Hybrid Audio
   ========================================================================= */

const SIDES = {
  a_side: {
    id: 'a_side', badge: '💿 A-SIDE', short: 'A-SIDE', name: '💿 A-SIDE（正統派・表の王道）',
    color: '#00f0ff', sub: '#ffc83b',
    desc: '王道のスキルと華やかなスター性でメインストリームの頂点を制する正統派集団'
  },
  b_side: {
    id: 'b_side', badge: '📼 B-SIDE', short: 'B-SIDE', name: '📼 B-SIDE（特殊派・裏の変化球）',
    color: '#ff2e93', sub: '#c8ff29',
    desc: '常識外れのクセと中毒性、独自の仕掛けでシーンを喰い破る異端派集団'
  }
};

const AGE_TIERS = [
  { id: 'young', label: 'YOUNG', jp: 'ヤング世代', desc: '新世代の感性と恐れ知らずの瞬発力' },
  { id: 'middle', label: 'MIDDLE', jp: 'ミドル世代', desc: '現場叩き上げの経験値と脂の乗った実力' },
  { id: 'old', label: 'OLD', jp: 'オールド世代', desc: '酸いも甘いも噛み分けた重厚な説得力' }
];

const PREFECTURES = [
  ['HOKKAIDO','北海道','north'],['AOMORI','青森','north'],['IWATE','岩手','north'],['MIYAGI','宮城','north'],
  ['AKITA','秋田','north'],['YAMAGATA','山形','north'],['FUKUSHIMA','福島','north'],
  ['IBARAKI','茨城','metro'],['TOCHIGI','栃木','metro'],['GUNMA','群馬','metro'],['SAITAMA','埼玉','metro'],
  ['CHIBA','千葉','metro'],['TOKYO','東京','metro'],['KANAGAWA','神奈川','metro'],
  ['NIIGATA','新潟','central'],['TOYAMA','富山','central'],['ISHIKAWA','石川','central'],['FUKUI','福井','central'],
  ['YAMANASHI','山梨','central'],['NAGANO','長野','central'],['GIFU','岐阜','central'],['SHIZUOKA','静岡','central'],['AICHI','愛知','central'],
  ['MIE','三重','kansai'],['SHIGA','滋賀','kansai'],['KYOTO','京都','kansai'],['OSAKA','大阪','kansai'],
  ['HYOGO','兵庫','kansai'],['NARA','奈良','kansai'],['WAKAYAMA','和歌山','kansai'],
  ['TOTTORI','鳥取','west'],['SHIMANE','島根','west'],['OKAYAMA','岡山','west'],['HIROSHIMA','広島','west'],['YAMAGUCHI','山口','west'],
  ['TOKUSHIMA','徳島','west'],['KAGAWA','香川','west'],['EHIME','愛媛','west'],['KOCHI','高知','west'],
  ['FUKUOKA','福岡','south'],['SAGA','佐賀','south'],['NAGASAKI','長崎','south'],['KUMAMOTO','熊本','south'],
  ['OITA','大分','south'],['MIYAZAKI','宮崎','south'],['KAGOSHIMA','鹿児島','south'],['OKINAWA','沖縄','south']
].map(([label, jp, block], idx) => ({ index: idx, label, jp, block }));

const STARTER_ITEMS = [
  { id: 'item_mic', name: '🎤 ヴィンテージダイナミックマイク', bonus: { lyric: 4, flow: 3, vibes: 1, cash: 0, drip: 6000 }, desc: 'Lyric+4 / Flow+3 / Drip+¥6,000' },
  { id: 'item_note', name: '📓 黒革のリリックノート', bonus: { lyric: 8, flow: 1, vibes: 2, cash: 0, drip: 3000 }, desc: 'Lyric+8 / Vibes+2（韻構築に強い）' },
  { id: 'item_sp', name: '🎛️ 中古ポータブルサンプラー', bonus: { lyric: 2, flow: 7, vibes: 3, cash: 0, drip: 9000 }, desc: 'Flow+7 / Vibes+3 / Drip+¥9,000' },
  { id: 'item_chain', name: '⛓️ ストリート細銀チェーン', bonus: { lyric: 1, flow: 2, vibes: 6, cash: 0, drip: 15000 }, equipUpgrade: 'chain_silver', desc: 'Vibes+6 / 初期チェーン着用スタート' },
  { id: 'item_stash', name: '💴 なけなしの軍資金封筒', bonus: { lyric: 1, flow: 1, vibes: 1, cash: 25000, drip: 1000 }, desc: '初期Cash +¥25,000 で余裕の開幕' }
];

const MUSIC_ROOTS = [
  {
    id: 'boombap', name: 'OLD SCHOOL // BOOM BAP', glow: '#ffc83b', bpm: 92, isRare: false, style: 'boom',
    desc: '乾いたスネアとソウルフルなサンプリングの黄金律',
    tracks: [
      { id: 'bb_01', title: '90s Dust Loop #01', price: 0, file: 'bgm_boombap_01.mp3', note: 110 },
      { id: 'bb_02', title: 'Subway Scratch #02', price: 28000, file: 'bgm_boombap_02.mp3', note: 123 },
      { id: 'bb_03', title: 'Golden Era Anthem #03', price: 48000, file: 'bgm_boombap_03.mp3', note: 131 }
    ]
  },
  {
    id: 'neotrap', name: 'NEO TRAP // 808 RAGE', glow: '#c8ff29', bpm: 142, isRare: false, style: 'trap',
    desc: '重低音808と高速ハイハットが脳を揺らす現代トラップ',
    tracks: [
      { id: 'nt_01', title: '808 Distortion #01', price: 0, file: 'bgm_neotrap_01.mp3', note: 65 },
      { id: 'nt_02', title: 'Neon Triplet #02', price: 32000, file: 'bgm_neotrap_02.mp3', note: 73 },
      { id: 'nt_03', title: 'Rage Stadium #03', price: 54000, file: 'bgm_neotrap_03.mp3', note: 82 }
    ]
  },
  {
    id: 'darkdrill', name: 'DARK DRILL // COLD SLIDE', glow: '#00f0ff', bpm: 144, isRare: false, style: 'drill',
    desc: '冷徹なスライディングベースが深夜の路地を切り裂くドリル',
    tracks: [
      { id: 'dd_01', title: 'Midnight Slide #01', price: 0, file: 'bgm_darkdrill_01.mp3', note: 58 },
      { id: 'dd_02', title: 'Concrete Fog #02', price: 35000, file: 'bgm_darkdrill_02.mp3', note: 62 },
      { id: 'dd_03', title: 'Zero Kelvin #03', price: 58000, file: 'bgm_darkdrill_03.mp3', note: 69 }
    ]
  },
  {
    id: 'melodic', name: 'CYBER MELODIC // EMO R&B', glow: '#ff2e93', bpm: 102, isRare: false, style: 'melodic',
    desc: '煌びやかなシンセと切ないコードが交差する都会派メロディック',
    tracks: [
      { id: 'cm_01', title: 'Velvet Rain #01', price: 0, file: 'bgm_melodic_01.mp3', note: 165 },
      { id: 'cm_02', title: 'Shibuya Skyline #02', price: 36000, file: 'bgm_melodic_02.mp3', note: 196 },
      { id: 'cm_03', title: 'Starlight Tears #03', price: 62000, file: 'bgm_melodic_03.mp3', note: 220 }
    ]
  },
  {
    id: 'yarddub', name: 'YARD DUB // BAYSIDE BASS', glow: '#22c55e', bpm: 80, isRare: false, style: 'dub',
    desc: '港湾倉庫を揺らす極太ダブベースと裏打ちリディム',
    tracks: [
      { id: 'yd_01', title: 'Harbor Echo #01', price: 0, file: 'bgm_yarddub_01.mp3', note: 55 },
      { id: 'yd_02', title: 'Container Skank #02', price: 34000, file: 'bgm_yarddub_02.mp3', note: 62 },
      { id: 'yd_03', title: 'Sound System King #03', price: 56000, file: 'bgm_yarddub_03.mp3', note: 73 }
    ]
  },
  {
    id: 'phonk', name: 'DRIFT PHONK // OVERDRIVE', glow: '#b86bff', bpm: 132, isRare: false, style: 'phonk',
    desc: '歪んだカウベルと疾走ビートが中毒を生むストリートフォンク',
    tracks: [
      { id: 'pk_01', title: 'Midnight Highway #01', price: 0, file: 'bgm_phonk_01.mp3', note: 98 },
      { id: 'pk_02', title: 'Cowbell Cult #02', price: 38000, file: 'bgm_phonk_02.mp3', note: 110 },
      { id: 'pk_03', title: 'Tokyo Turbo #03', price: 64000, file: 'bgm_phonk_03.mp3', note: 123 }
    ]
  },
  {
    id: 'rare_glitch', name: '★RARE // LOST GLITCH', glow: '#00f0ff', bpm: 150, isRare: true, style: 'glitch',
    desc: '隠しMC「PHANTOM-K」撃破で継承する非売品ワンオフルーツ',
    tracks: [{ id: 'rg_01', title: 'Phantom Archive [1-of-1]', price: 0, file: 'bgm_rare_glitch.mp3', note: 147, isRare: true }]
  },
  {
    id: 'rare_jazz', name: '★RARE // SMOKY JAZZ LOOP', glow: '#ffc83b', bpm: 86, isRare: true, style: 'jazz',
    desc: '隠しMC「SMOKE-J」撃破で継承する幻の深夜ジャズルーツ',
    tracks: [{ id: 'rj_01', title: 'Blue Note Ghost [1-of-1]', price: 0, file: 'bgm_rare_jazz.mp3', note: 175, isRare: true }]
  },
  {
    id: 'rare_cyber', name: '★RARE // HYPER OVERDRIVE', glow: '#ff2e93', bpm: 156, isRare: true, style: 'cyber',
    desc: '隠しMC「LADY NOIR」撃破で継承する電脳覚醒ルーツ',
    tracks: [{ id: 'rc_01', title: 'Cyber Valkyrie [1-of-1]', price: 0, file: 'bgm_rare_cyber.mp3', note: 247, isRare: true }]
  }
];

const STREET_JOBS = [
  {
    id: 'job_warehouse', rarity: 1, stars: '★☆☆ 求人貼り紙', name: '日雇い深夜倉庫ピッキング',
    wage: 4500, statBonus: { lyric: 9, flow: 6, vibes: 3 }, outfitId: 'job_work_jkt',
    flavor: '電柱の求人ビラを発見！薄給だがハングリー精神で基礎スキルが爆伸びする！'
  },
  {
    id: 'job_flyer', rarity: 1, stars: '★☆☆ 求人貼り紙', name: '雨天の深夜ポスティング',
    wage: 3800, statBonus: { lyric: 8, flow: 8, vibes: 4 }, outfitId: 'job_rain_anorak',
    flavor: '極少の手取りと引き換えに、夜の路地を歩き抜くリズム感と反骨心が宿る！'
  },
  {
    id: 'job_courier', rarity: 2, stars: '★★☆ 現場勧誘', name: '深夜バイク便メッセンジャー',
    wage: 13500, statBonus: { lyric: 4, flow: 7, vibes: 5 }, outfitId: 'job_tech_nylon',
    flavor: '街角のライダーから勧誘！安定した手取りとテックナイロンJKTを獲得！'
  },
  {
    id: 'job_clubstaff', rarity: 2, stars: '★★☆ 現場勧誘', name: '裏クラブ音響＆バーテンダー',
    wage: 14500, statBonus: { lyric: 3, flow: 5, vibes: 8 }, outfitId: 'job_open_shirt',
    flavor: 'クラブ店長から現場スカウト！夜の社交場でVibesと開襟黒シャツを獲得！'
  },
  {
    id: 'job_vip_porter', rarity: 3, stars: '★★★ 電撃スカウト(SSR)', name: 'VIP極秘アタッシュケース配送',
    wage: 36000, statBonus: { lyric: 5, flow: 6, vibes: 10 }, outfitId: 'job_ssr_trench',
    flavor: '黒塗りの車から業界重鎮が降車！破格の報酬と非売品ロングコートを抜擢支給！'
  },
  {
    id: 'job_secret_dj', rarity: 3, stars: '★★★ 電撃スカウト(SSR)', name: '秘密ラウンジ専属レジデントDJ',
    wage: 39000, statBonus: { lyric: 6, flow: 9, vibes: 9 }, outfitId: 'job_ssr_velvet',
    flavor: '伝説のオーナーから電撃抜擢！最高峰の手取りと非売品ベルベットJKTを獲得！'
  }
];

const OUTFITS = [
  { id: 'init_hoodie', name: 'ヴィンテージ無地フーディー', price: 0, drip: 3200, color: '#2b2e42', accent: '#64748b', style: 'hoodie', starter: true },
  { id: 'job_work_jkt', name: '無骨なダックワークJKT', price: 0, drip: 12000, color: '#78472a', accent: '#f59e0b', style: 'jacket', jobOnly: true },
  { id: 'job_rain_anorak', name: '撥水ストリートアノラック', price: 0, drip: 13500, color: '#1e3a5f', accent: '#00f0ff', style: 'hoodie', jobOnly: true },
  { id: 'job_tech_nylon', name: 'メッセンジャーテックJKT', price: 0, drip: 26000, color: '#172536', accent: '#c8ff29', style: 'cyber', jobOnly: true },
  { id: 'job_open_shirt', name: 'ルーズ開襟ブラックシャツ', price: 0, drip: 28000, color: '#181424', accent: '#ff2e93', style: 'shirt', jobOnly: true },
  { id: 'job_ssr_trench', name: '【非売品】SSRネオンロングコート', price: 0, drip: 88000, color: '#0f1322', accent: '#ffc83b', style: 'fur', jobOnly: true },
  { id: 'job_ssr_velvet', name: '【非売品】SSRロイヤルベルベットJKT', price: 0, drip: 95000, color: '#3b0f2c', accent: '#00f0ff', style: 'fur', jobOnly: true },
  { id: 'ec_track', name: '90s ナイロントラックJKT', price: 24000, drip: 28000, color: '#1b383b', accent: '#48a9a6', style: 'jacket', starter: false },
  { id: 'ec_mohair', name: 'ダメージモヘアカーディガン', price: 42000, drip: 52000, color: '#6b21a8', accent: '#e879f9', style: 'mohair', starter: false },
  { id: 'ec_heavy_hoodie', name: '18oz 極厚ヘビーフーディー', price: 58000, drip: 74000, color: '#14141f', accent: '#c8ff29', style: 'hoodie', starter: false },
  { id: 'ec_fur_coat', name: 'モノリス・フェイクファーコート', price: 105000, drip: 138000, color: '#27223d', accent: '#ffc83b', style: 'fur', starter: false },
  { id: 'ec_cyber_jkt', name: 'ネオ東京タクティカルJKT', price: 158000, drip: 210000, color: '#111c33', accent: '#00f0ff', style: 'cyber', starter: false }
];

const UPGRADES = [
  { id: 'chain_silver', name: 'マイアミキューバン・チェーン', price: 42000, drip: 54000, type: 'prop', desc: '胸元に輝く極太シルバーチェーン' },
  { id: 'grillz_gold', name: '18K ゴールドフロント・グリルズ', price: 95000, drip: 125000, type: 'prop', desc: '口元に宿る王者の輝き' },
  { id: 'room_studio', name: '地下ネオン防音スタジオ部屋', price: 120000, drip: 82000, type: 'room', roomLv: 1, desc: '拠点背景が防音スタジオへ進化' },
  { id: 'room_penthouse', name: '最上階ペントハウス拠点', price: 450000, drip: 360000, type: 'room', roomLv: 2, desc: '摩天楼の夜景を見下ろす頂点拠点' }
];

const RHYME_ASSIST_CHIPS = [
  '高架線の下で握るマイクとプライド',
  'ノイズだらけの街に刻むリアルなサイン',
  'ポケットの小銭から奪うチャート一位',
  '失われたビートの記憶を脳内にライド'
];

const LEGAL_NG_WORDS = ['殺害', '死ね', '麻薬', '覚醒剤', 'コカイン', '大麻', '爆破'];

/* --- Hybrid Short-Loop Audio Engine (assets/audio/* + Web Audio Synth Fallback) --- */
const AudioEngine = {
  ctx: null, htmlAudio: null, timer: null, currentTrackId: null, step: 0,
  getAllTracks() {
    const base = MUSIC_ROOTS.flatMap(r => r.tracks.map(t => Object.assign({ rootId: r.id, rootName: r.name, bpm: r.bpm, glow: r.glow, style: r.style }, t)));
    const custom = (typeof state !== 'undefined' && Array.isArray(state.customBeats)) ? state.customBeats : [];
    return base.concat(custom);
  },
  findTrack(trackId) {
    return this.getAllTracks().find(t => t.id === trackId) || this.getAllTracks()[0];
  },
  stop() {
    if (this.timer) { clearInterval(this.timer); this.timer = null; }
    if (this.htmlAudio) { try { this.htmlAudio.pause(); this.htmlAudio.currentTime = 0; } catch (e) {} this.htmlAudio = null; }
    this.currentTrackId = null;
  },
  playEquipped() {
    if (typeof state === 'undefined' || state.soundMuted) return;
    const tid = (state.music && state.music.equippedTrackId) || 'bb_01';
    this.playTrack(tid);
  },
  playTrack(trackId) {
    if (typeof state !== 'undefined' && state.soundMuted) return;
    const tr = this.findTrack(trackId);
    if (!tr) return;
    if (this.currentTrackId === tr.id && (this.timer || this.htmlAudio)) return;
    this.stop();
    this.currentTrackId = tr.id;
    if (tr.file && !tr.isCustom) {
      const aud = new Audio('assets/audio/' + tr.file);
      aud.loop = true; aud.volume = 0.55;
      let fellBack = false;
      const fallback = () => { if (!fellBack && this.currentTrackId === tr.id) { fellBack = true; this.htmlAudio = null; this.startSynthLoop(tr); } };
      aud.onerror = fallback;
      const p = aud.play();
      if (p && p.catch) p.catch(fallback);
      this.htmlAudio = aud;
      return;
    }
    this.startSynthLoop(tr);
  },
  startSynthLoop(tr) {
    try {
      if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      if (this.ctx.state === 'suspended') this.ctx.resume();
    } catch (e) { return; }
    this.step = 0;
    const stepMs = Math.max(95, Math.floor((60 / (tr.bpm || 110)) * 250));
    const scale = [1, 1.189, 1.335, 1.498, 1.782];
    this.timer = setInterval(() => {
      if (typeof state !== 'undefined' && state.soundMuted) return this.stop();
      const s = this.step % 16, now = this.ctx.currentTime;
      const kickPattern = tr.style === 'drill' ? [0, 3, 6, 10] : tr.style === 'dub' ? [0, 8] : [0, 6, 8, 14];
      if (kickPattern.includes(s)) {
        const o = this.ctx.createOscillator(), g = this.ctx.createGain();
        o.frequency.setValueAtTime(135, now); o.frequency.exponentialRampToValueAtTime(34, now + 0.16);
        g.gain.setValueAtTime(0.32, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        o.connect(g); g.connect(this.ctx.destination); o.start(now); o.stop(now + 0.19);
      }
      if (s === 4 || s === 12) {
        const o = this.ctx.createOscillator(), g = this.ctx.createGain();
        o.type = 'triangle'; o.frequency.setValueAtTime(240, now); o.frequency.exponentialRampToValueAtTime(90, now + 0.09);
        g.gain.setValueAtTime(0.16, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        o.connect(g); g.connect(this.ctx.destination); o.start(now); o.stop(now + 0.11);
      }
      if (s % 2 === 0 || (tr.style === 'trap' && s % 3 === 0)) {
        const o = this.ctx.createOscillator(), g = this.ctx.createGain();
        o.type = 'square'; o.frequency.setValueAtTime(tr.style === 'phonk' && s % 4 === 2 ? 540 : 4200, now);
        g.gain.setValueAtTime(tr.style === 'phonk' && s % 4 === 2 ? 0.09 : 0.025, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
        o.connect(g); g.connect(this.ctx.destination); o.start(now); o.stop(now + 0.05);
      }
      if (s % 4 === 0) {
        const o = this.ctx.createOscillator(), g = this.ctx.createGain();
        o.type = tr.style === 'melodic' || tr.style === 'jazz' ? 'sine' : 'sawtooth';
        const baseHz = tr.note || 110;
        o.frequency.setValueAtTime(baseHz * scale[(s / 4 + (this.step >> 4)) % scale.length], now);
        g.gain.setValueAtTime(0.08, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
        o.connect(g); g.connect(this.ctx.destination); o.start(now); o.stop(now + 0.25);
      }
      this.step++;
    }, stepMs);
  }
};
