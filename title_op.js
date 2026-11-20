/* ============================================================================
   CYBER RAPPER // v10.2 EDITORIAL TITLE SCREEN & OPENING MOVIE ENGINE
   - Uses Verified title-logo-base.png (Zero title_logo_v2 404/503 Errors)
   - Zero Face-Overlap 3-Zone Poster Layout (Dual KING & DIVA High-Res Base)
   - Animatic 4-Cut Prologue (Opt-in <video> when ENABLE_EXTERNAL_OP_VIDEO=true)
   - Dedicated Opening Theme BGM Engine (assets/audio/op_theme.mp3 + Synth Fallback)
   ============================================================================ */

const OP_VIDEO_CANDIDATES = [
  'assets/video/op_intro.mp4',
  'assets/video/op_intro.webm'
];

const OP_BGM_CANDIDATES = [
  'assets/audio/op_theme.mp3',
  'assets/audio/op_theme.ogg',
  'assets/audio/op_theme.m4a'
];

const OP_PROLOGUE_CUTS = [
  {
    id: '01',
    tag: 'ARCHIVE 01 // REBUILT TOKYO',
    lines: '一度滅び、再構築された都市。\n唯一失われたのは――旧世界の「生の音楽」の記憶。',
    bg: 'bg_metro_station.jpg',
    accent: '#00f0ff',
    mode: 'city'
  },
  {
    id: '02',
    tag: 'ARCHIVE 02 // MEMORY DISC',
    lines: '路地裏に眠る旧文明の記憶媒体『MEMORY ARCHIVE』。\nそれがストリートの鼓動を呼び覚ます。',
    bg: 'bg_record_shop.jpg',
    accent: '#ffc83b',
    mode: 'disc'
  },
  {
    id: '03',
    tag: 'ARCHIVE 03 // NEURAL SOCKET SYNC',
    lines: '神経接続（SYNC）完了。\n失われたビートが、再び脈を打ちだす。',
    bg: 'bg_studio_booth.jpg',
    accent: '#ff2e93',
    mode: 'sync'
  },
  {
    id: '04',
    tag: 'ARCHIVE 04 // A-SIDE vs B-SIDE',
    lines: '王道の A-SIDE か、異端の B-SIDE か。\nお前の言葉（リリック）で、頂点を奪え。',
    bg: 'bg_street_cypher.jpg',
    accent: '#c8ff29',
    mode: 'cypher'
  }
];

const OpAudioPlayer = {
  audio: null,
  srcIdx: 0,
  failed: false,
  fadeTimer: null,
  unlockHandler: null,
  baseVolume: 0.82,
  pendingFallback: null,

  isMuted() {
    return typeof state !== 'undefined' && !!state.soundMuted;
  },

  clearFade() {
    if (this.fadeTimer) {
      clearInterval(this.fadeTimer);
      this.fadeTimer = null;
    }
  },

  clearUnlock() {
    if (this.unlockHandler) {
      document.removeEventListener('pointerdown', this.unlockHandler, true);
      document.removeEventListener('keydown', this.unlockHandler, true);
      this.unlockHandler = null;
    }
  },

  ensureAudio() {
    if (this.audio || this.failed) return this.audio;
    const a = new Audio();
    a.preload = 'auto';
    a.volume = this.baseVolume;
    a.addEventListener('error', () => {
      this.srcIdx++;
      if (this.srcIdx < OP_BGM_CANDIDATES.length) {
        a.src = OP_BGM_CANDIDATES[this.srcIdx];
        a.load();
      } else {
        this.failed = true;
        if (typeof this.pendingFallback === 'function') {
          const fb = this.pendingFallback;
          this.pendingFallback = null;
          fb();
        }
      }
    });
    a.src = OP_BGM_CANDIDATES[this.srcIdx];
    this.audio = a;
    return a;
  },

  preload() {
    try { this.ensureAudio(); } catch (e) {}
  },

  play(opts) {
    const o = opts || {};
    this.clearFade();
    this.clearUnlock();
    this.pendingFallback = typeof o.onFallback === 'function' ? o.onFallback : null;

    if (this.isMuted()) return false;
    if (this.failed) {
      if (this.pendingFallback) {
        const fb = this.pendingFallback;
        this.pendingFallback = null;
        fb();
      }
      return false;
    }

    const a = this.ensureAudio();
    if (!a) return false;
    a.loop = !!o.loop;
    a.volume = this.baseVolume;
    if (o.restart) {
      try { a.currentTime = 0; } catch (e) {}
    } else if (!a.paused) {
      return true;
    }

    let p;
    try { p = a.play(); } catch (e) { p = Promise.reject(e); }
    if (p && typeof p.catch === 'function') {
      p.catch((err) => {
        if (err && err.name === 'NotAllowedError' && o.allowDeferredUnlock) {
          this.unlockHandler = () => {
            this.clearUnlock();
            const ts = document.getElementById('title-screen');
            if (ts && ts.classList.contains('active') && !this.isMuted() && !OpMovieEngine.active) {
              this.play({ restart: false, loop: !!o.loop, allowDeferredUnlock: false });
            }
          };
          document.addEventListener('pointerdown', this.unlockHandler, true);
          document.addEventListener('keydown', this.unlockHandler, true);
        } else if (this.pendingFallback) {
          const fb = this.pendingFallback;
          this.pendingFallback = null;
          fb();
        }
      });
    }
    return true;
  },

  stop() {
    this.clearFade();
    this.clearUnlock();
    this.pendingFallback = null;
    if (!this.audio) return;
    try {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio.volume = this.baseVolume;
    } catch (e) {}
  },

  fadeOutAndStop(durationMs) {
    this.clearFade();
    this.clearUnlock();
    this.pendingFallback = null;
    if (!this.audio || this.audio.paused) {
      this.stop();
      return;
    }
    const ms = Math.max(80, durationMs || 420);
    const startVol = this.audio.volume;
    const steps = 12;
    const stepMs = ms / steps;
    let step = 0;
    this.fadeTimer = setInterval(() => {
      step++;
      if (!this.audio || step >= steps) {
        this.stop();
        return;
      }
      this.audio.volume = Math.max(0, startVol * (1 - step / steps));
    }, stepMs);
  }
};
window.OpAudioPlayer = OpAudioPlayer;

const OpMovieEngine = {
  active: false,
  replayOnly: false,
  subtitlesOn: true,
  usingVideo: false,
  rafId: null,
  audioTimer: null,
  startTs: 0,
  fallbackDurationMs: 16000,
  lastCutIdx: -1,
  onDone: null,

  preloadAssets() {
    OpAudioPlayer.preload();
    if (typeof AssetImageCache === 'undefined') return;
    AssetImageCache.resolveTitleLogo();
    AssetImageCache.resolveStageBg('bg_street_cypher.jpg');
    AssetImageCache.resolveBaseSprite(false);
    AssetImageCache.resolveBaseSprite(true);
  },

  preloadPrologueCuts() {
    if (typeof AssetImageCache === 'undefined') return;
    ['bg_metro_station.jpg', 'bg_record_shop.jpg', 'bg_studio_booth.jpg',
     'cutin_eyes_king.png', 'cutin_eyes_diva.png', 'fx_flame_cyan.png', 'fx_flame_pink.png'].forEach(p => {
      AssetImageCache.resolve(p, { cutout: false });
    });
  },

  startSynthPulse() {
    this.stopSynthPulse();
    if (typeof state !== 'undefined' && state.soundMuted) return;
    try {
      if (!AudioEngine.ctx) AudioEngine.ctx = new (window.AudioContext || window.webkitAudioContext)();
      if (AudioEngine.ctx.state === 'suspended') AudioEngine.ctx.resume();
    } catch (e) { return; }
    let step = 0;
    const playStep = () => {
      if (!this.active || this.usingVideo || (typeof state !== 'undefined' && state.soundMuted)) return;
      const ctx = AudioEngine.ctx;
      if (!ctx) return;
      const now = ctx.currentTime;
      const bassHz = [55, 55, 65.4, 49][Math.floor(step / 4) % 4];
      if (step % 2 === 0) {
        const sub = ctx.createOscillator(), g = ctx.createGain();
        sub.type = 'sawtooth';
        sub.frequency.setValueAtTime(step % 4 === 0 ? 118 : bassHz, now);
        sub.frequency.exponentialRampToValueAtTime(bassHz * 0.75, now + 0.28);
        g.gain.setValueAtTime(step % 4 === 0 ? 0.16 : 0.09, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.34);
        sub.connect(g); g.connect(ctx.destination);
        sub.start(now); sub.stop(now + 0.35);
      }
      if (step >= 8) {
        const hat = ctx.createOscillator(), hg = ctx.createGain();
        hat.type = 'square';
        hat.frequency.setValueAtTime(step % 2 === 0 ? 5200 : 7400, now);
        hg.gain.setValueAtTime(0.018, now);
        hg.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
        hat.connect(hg); hg.connect(ctx.destination);
        hat.start(now); hat.stop(now + 0.05);
      }
      step++;
    };
    playStep();
    this.audioTimer = setInterval(playStep, 430);
  },

  stopSynthPulse() {
    if (this.audioTimer) { clearInterval(this.audioTimer); this.audioTimer = null; }
  },

  buildFallbackCutHTML(cutIdx) {
    const cut = OP_PROLOGUE_CUTS[cutIdx] || OP_PROLOGUE_CUTS[0];
    const bgUrl = (typeof AssetImageCache !== 'undefined' && AssetImageCache.resolveStageBg(cut.bg)) || '';
    const bgStyle = bgUrl ? `background-image:url('${bgUrl}');` : '';
    const fCyan = typeof AssetImageCache !== 'undefined' ? AssetImageCache.resolve('fx_flame_cyan.png', { cutout: false }) : null;
    const fPink = typeof AssetImageCache !== 'undefined' ? AssetImageCache.resolve('fx_flame_pink.png', { cutout: false }) : null;
    let extra = '';
    if (cut.mode === 'disc') {
      extra = `<div class="op94-disc-ring"></div>`;
    } else if (cut.mode === 'sync') {
      const ek = typeof AssetImageCache !== 'undefined' ? AssetImageCache.resolve('cutin_eyes_king.png', { cutout: false }) : null;
      const ed = typeof AssetImageCache !== 'undefined' ? AssetImageCache.resolve('cutin_eyes_diva.png', { cutout: false }) : null;
      extra = `<div class="op94-eye-stack">
        ${ek ? `<div class="op94-eye-banner top"><img src="${ek}" alt=""></div>` : ''}
        ${ed ? `<div class="op94-eye-banner bot"><img src="${ed}" alt=""></div>` : ''}
        ${fCyan ? `<img src="${fCyan}" class="op94-fx-screen" alt="">` : ''}
      </div>`;
    } else if (cut.mode === 'cypher') {
      const kb = typeof AssetImageCache !== 'undefined' ? AssetImageCache.resolveBaseSprite(false) : null;
      const db = typeof AssetImageCache !== 'undefined' ? AssetImageCache.resolveBaseSprite(true) : null;
      const kFilter = (typeof AssetImageCache !== 'undefined' && AssetImageCache.isTaintedBase(false)) ? 'url(#ts94-black-key) ' : '';
      const dFilter = (typeof AssetImageCache !== 'undefined' && AssetImageCache.isTaintedBase(true)) ? 'url(#ts94-black-key) ' : '';
      extra = `<div class="op94-cypher-duo">
        ${fCyan ? `<img src="${fCyan}" class="op94-duo-flame left" alt="">` : ''}
        ${fPink ? `<img src="${fPink}" class="op94-duo-flame right" alt="">` : ''}
        ${kb ? `<img src="${kb}" class="op94-duo-char left" style="filter:${kFilter}drop-shadow(0 0 16px rgba(0,240,255,0.55));" alt="">` : ''}
        ${db ? `<img src="${db}" class="op94-duo-char right" style="filter:${dFilter}drop-shadow(0 0 16px rgba(255,46,147,0.55));" alt="">` : ''}
      </div>`;
    }
    return `<div class="op94-anim-scene cut-${cut.id}"><div class="op94-anim-bg" style="${bgStyle}"></div>${extra}</div>`;
  },

  renderCut(cutIdx) {
    if (this.lastCutIdx === cutIdx) return;
    this.lastCutIdx = cutIdx;
    const cut = OP_PROLOGUE_CUTS[cutIdx] || OP_PROLOGUE_CUTS[0];
    const stage = document.getElementById('op94-fallback-stage');
    if (stage && !this.usingVideo) {
      stage.innerHTML = this.buildFallbackCutHTML(cutIdx);
      const glitch = document.getElementById('op94-glitch-flash');
      if (glitch && cutIdx > 0) {
        glitch.classList.remove('fire');
        void glitch.offsetWidth;
        glitch.classList.add('fire');
      }
    }
    const tagEl = document.getElementById('op94-sub-tag');
    const txtEl = document.getElementById('op94-sub-text');
    const stepEl = document.getElementById('op94-cut-counter');
    if (tagEl) { tagEl.textContent = cut.tag; tagEl.style.color = cut.accent; }
    if (txtEl) txtEl.innerHTML = escapeHtml(cut.lines).replace(/\n/g, '<br>');
    if (stepEl) stepEl.textContent = `PROLOGUE // 0${cutIdx + 1} - 04`;
  },

  play(opts) {
    const o = opts || {};
    this.stopCleanupOnly();
    this.preloadPrologueCuts();
    if (typeof stopBeatPlayer === 'function') stopBeatPlayer();
    if (typeof AudioEngine !== 'undefined') AudioEngine.stop();
    if (typeof Street25DEngine !== 'undefined') Street25DEngine.pause();

    let layer = document.getElementById('op-movie-layer');
    if (!layer) {
      layer = document.createElement('div');
      layer.id = 'op-movie-layer';
      document.getElementById('app-shell').appendChild(layer);
    }

    this.active = true;
    this.replayOnly = !!o.replayOnly;
    this.onDone = typeof o.onComplete === 'function' ? o.onComplete : null;
    this.usingVideo = false;
    this.lastCutIdx = -1;
    this.startTs = performance.now();

    layer.innerHTML = `
      <div class="op94-scan-entry"></div>
      <div id="op94-fallback-stage" class="op94-fallback-stage"></div>
      <video id="op94-video" class="op94-video" playsinline webkit-playsinline preload="none" style="display:none;"></video>
      <div class="op94-rain"></div>
      <div class="op94-scanlines"></div>
      <div id="op94-glitch-flash" class="op94-glitch-flash"></div>
      <div class="op94-top-bar">
        <span id="op94-cut-counter" class="op94-badge">PROLOGUE // 01 - 04</span>
        <div style="display:flex;gap:6px;">
          <button class="op94-ctrl-btn" id="op94-cc-btn" onclick="toggleOpSubtitles()">CC ${this.subtitlesOn ? 'ON' : 'OFF'}</button>
          <button class="op94-ctrl-btn skip" onclick="finishOpeningMovie(true)">SKIP ⏭</button>
        </div>
      </div>
      <div class="op94-bottom-wrap" id="op94-sub-wrap" style="${this.subtitlesOn ? '' : 'opacity:0;'}">
        <div class="op94-sub-box">
          <div id="op94-sub-tag" class="op94-sub-tag"></div>
          <div id="op94-sub-text" class="op94-sub-text"></div>
        </div>
      </div>
      <div class="op94-progress-track"><div id="op94-progress-fill" class="op94-progress-fill"></div></div>
    `;
    layer.classList.add('active');

    this.renderCut(0);
    OpAudioPlayer.play({
      restart: true,
      loop: false,
      onFallback: () => {
        if (this.active && !this.usingVideo) this.startSynthPulse();
      }
    });
    if (window.ENABLE_EXTERNAL_OP_VIDEO) this.tryMountExternalVideo();

    const tick = (now) => {
      if (!this.active) return;
      const vid = document.getElementById('op94-video');
      let prog = 0;
      if (this.usingVideo && vid && vid.duration && isFinite(vid.duration) && vid.duration > 0) {
        prog = Math.min(1, vid.currentTime / vid.duration);
      } else if (!this.usingVideo) {
        prog = Math.min(1, (now - this.startTs) / this.fallbackDurationMs);
        if (prog >= 1) { this.finish(false); return; }
      }
      const bar = document.getElementById('op94-progress-fill');
      if (bar) bar.style.width = `${(prog * 100).toFixed(1)}%`;
      const cutIdx = Math.min(3, Math.floor(prog * 4));
      this.renderCut(cutIdx);
      this.rafId = requestAnimationFrame(tick);
    };
    this.rafId = requestAnimationFrame(tick);
  },

  tryMountExternalVideo() {
    const vid = document.getElementById('op94-video');
    if (!vid) return;
    vid.style.display = '';
    let idx = 0;
    const tryNext = () => {
      if (!this.active || idx >= OP_VIDEO_CANDIDATES.length) {
        vid.style.display = 'none';
        return;
      }
      vid.src = OP_VIDEO_CANDIDATES[idx++];
      vid.muted = !!(typeof state !== 'undefined' && state.soundMuted);
      vid.load();
    };
    vid.onloadeddata = () => {
      if (!this.active) return;
      this.usingVideo = true;
      this.stopSynthPulse();
      OpAudioPlayer.stop();
      vid.classList.add('ready');
      const p = vid.play();
      if (p && typeof p.catch === 'function') {
        p.catch(() => { vid.muted = true; vid.play().catch(() => {}); });
      }
    };
    vid.onerror = () => { if (!this.usingVideo) tryNext(); };
    vid.onended = () => { if (this.active) this.finish(false); };
    tryNext();
  },

  stopCleanupOnly(opts) {
    const o = opts || {};
    this.active = false;
    this.stopSynthPulse();
    if (o.fadeAudio) OpAudioPlayer.fadeOutAndStop(420);
    else OpAudioPlayer.stop();
    if (this.rafId) { cancelAnimationFrame(this.rafId); this.rafId = null; }
    const vid = document.getElementById('op94-video');
    if (vid) {
      try { vid.pause(); vid.removeAttribute('src'); vid.load(); } catch (e) {}
    }
  },

  finish(skipped) {
    const wasReplay = this.replayOnly;
    const cb = this.onDone;
    this.stopCleanupOnly({ fadeAudio: !skipped && !wasReplay });
    const layer = document.getElementById('op-movie-layer');
    if (layer) { layer.classList.remove('active'); layer.innerHTML = ''; }
    if (typeof triggerShutter === 'function') triggerShutter();
    if (wasReplay) {
      renderTitleScreen();
    } else if (cb) {
      cb();
    } else {
      document.getElementById('title-screen').classList.remove('active');
      renderCreator(false);
    }
  }
};

function playOpeningMovie(opts) { OpMovieEngine.play(opts); }
function finishOpeningMovie(skipped) { OpMovieEngine.finish(skipped); }
function toggleOpSubtitles() {
  OpMovieEngine.subtitlesOn = !OpMovieEngine.subtitlesOn;
  const wrap = document.getElementById('op94-sub-wrap');
  const btn = document.getElementById('op94-cc-btn');
  if (wrap) wrap.style.opacity = OpMovieEngine.subtitlesOn ? '1' : '0';
  if (btn) btn.textContent = `CC ${OpMovieEngine.subtitlesOn ? 'ON' : 'OFF'}`;
}
function toggleTitleMute() {
  state.soundMuted = !state.soundMuted;
  if (state.soundMuted) {
    if (typeof AudioEngine !== 'undefined') AudioEngine.stop();
    OpAudioPlayer.stop();
  } else {
    OpAudioPlayer.play({ restart: false, loop: true, allowDeferredUnlock: true });
  }
  saveState();
  renderTitleScreen();
}

function buildModernEditorialLogoHTML(accentHex, subHex) {
  const logoUrl = typeof AssetImageCache !== 'undefined'
    ? AssetImageCache.resolveTitleLogo(() => {
        const ts = document.getElementById('title-screen');
        if (ts && ts.classList.contains('active')) renderTitleScreen();
      })
    : null;
  if (logoUrl) {
    const scr = AssetImageCache.needsLogoScreenBlend() ? 'mix-blend-mode:screen;' : '';
    return `<div class="ts94-brand-inner">
      <img src="${logoUrl}" alt="CYBER RAPPER" class="ts94-custom-logo-img" style="max-width:340px;max-height:142px;filter:drop-shadow(0 0 18px ${accentHex || '#00f0ff'}88);${scr}">
      <div class="ts94-brand-sub">A-SIDE  ×  B-SIDE  //  LOST ARCHIVE RPG v10</div>
    </div>`;
  }
  return `<div class="ts94-brand-inner">
    <div class="ts94-eyebrow"><span class="ts94-hairline"></span><span>LOST ARCHIVE // TOKYO REBUILT</span><span class="ts94-hairline"></span></div>
    <svg class="ts94-chrome-svg" viewBox="0 0 400 84" aria-label="CYBER RAPPER">
      <defs>
        <linearGradient id="ts94Chrome" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ffffff"/><stop offset="44%" stop-color="#dbe4f3"/><stop offset="52%" stop-color="#64748b"/><stop offset="100%" stop-color="#f8fafc"/>
        </linearGradient>
        <linearGradient id="ts94Slash" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="${accentHex}"/><stop offset="55%" stop-color="#ffffff"/><stop offset="100%" stop-color="${subHex}"/>
        </linearGradient>
      </defs>
      <g transform="skewX(-10) translate(12,0)">
        <text x="196" y="40" text-anchor="middle" font-family="'Arial Black',Impact,sans-serif" font-weight="900" font-size="35" letter-spacing="6" fill="none" stroke="${accentHex}" stroke-width="2" opacity="0.45">CYBER</text>
        <text x="194" y="39" text-anchor="middle" font-family="'Arial Black',Impact,sans-serif" font-weight="900" font-size="35" letter-spacing="6" fill="url(#ts94Chrome)">CYBER</text>
        <text x="196" y="75" text-anchor="middle" font-family="'Arial Black',Impact,sans-serif" font-weight="900" font-size="38" letter-spacing="4.5" fill="none" stroke="${subHex}" stroke-width="2" opacity="0.45">RAPPER</text>
        <text x="194" y="74" text-anchor="middle" font-family="'Arial Black',Impact,sans-serif" font-weight="900" font-size="38" letter-spacing="4.5" fill="url(#ts94Chrome)">RAPPER</text>
      </g>
      <line x1="28" y1="45" x2="372" y2="41" stroke="url(#ts94Slash)" stroke-width="2.2" opacity="0.92"/>
      <polygon points="344,37 376,41 340,44" fill="${accentHex}" opacity="0.9"/>
    </svg>
    <div class="ts94-brand-sub"><span>A-SIDE</span><span class="ts94-dot">/</span><span>B-SIDE</span><span class="ts94-dot">—</span><span>STREET RISE RPG</span></div>
  </div>`;
}

function installEditorialTitleAndOp() {
  if (!document.getElementById('ts94-editorial-style')) {
    const st = document.createElement('style');
    st.id = 'ts94-editorial-style';
    st.textContent = `
      #title-screen.ts94-root { background: #07070c !important; padding: 12px 16px 14px; justify-content: space-between; }
      .ts94-bg { position: absolute; inset: 0; z-index: 0; background-size: cover; background-position: center 22%; filter: brightness(0.45) contrast(1.12) saturate(1.08); transform: scale(1.03); pointer-events: none; }
      .ts94-rain { position: absolute; inset: 0; z-index: 1; opacity: 0.14; pointer-events: none; background-image: repeating-linear-gradient(106deg, transparent 0px, transparent 34px, rgba(0,240,255,0.42) 35px, transparent 36px); background-size: 96px 190px; animation: rainSlide 1.15s linear infinite; }
      .ts94-hero-stage { position: absolute; top: 34px; left: 0; right: 0; height: 47%; z-index: 2; pointer-events: none; overflow: hidden; -webkit-mask-image: linear-gradient(180deg, #000 0%, #000 72%, transparent 100%); mask-image: linear-gradient(180deg, #000 0%, #000 72%, transparent 100%); }
      .ts94-hero-duo { position: relative; width: 100%; height: 100%; }
      .ts94-hero-img { position: absolute; top: 0; height: 100%; object-fit: contain; object-position: center top; animation: idolBreathe 3.8s ease-in-out infinite; }
      .ts94-hero-img.duo-left { left: -6%; width: 62%; }
      .ts94-hero-img.duo-right { right: -6%; width: 62%; animation-delay: -1.9s; }
      .ts94-hero-img.solo-main { left: 50%; transform: translateX(-50%); width: 74%; max-width: 300px; animation: none; }
      .ts94-hero-img.solo-sub { right: -8%; width: 54%; opacity: 0.24; filter: grayscale(0.35); }
      .ts94-vignette { position: absolute; inset: 0; z-index: 3; pointer-events: none; background: radial-gradient(circle at 50% 22%, rgba(0,240,255,0.06) 0%, transparent 55%), linear-gradient(180deg, rgba(6,6,11,0.5) 0%, rgba(6,6,11,0) 13%, rgba(6,6,11,0) 38%, rgba(8,8,14,0.88) 51%, #08080e 62%, #08080e 100%); }
      .ts94-top-hud { position: relative; z-index: 6; display: flex; justify-content: space-between; align-items: center; height: 24px; }
      .ts94-status-tag { font-family: "SF Mono", Consolas, monospace; font-size: 9px; font-weight: 700; letter-spacing: 0.14em; color: rgba(246,247,251,0.62); display: inline-flex; align-items: center; gap: 6px; }
      .ts94-live-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent-cyan); box-shadow: 0 0 8px var(--accent-cyan); }
      .ts94-sound-pill { background: rgba(18,18,29,0.72); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.14); color: var(--text-main); border-radius: 99px; padding: 3px 10px; font-family: monospace; font-size: 9px; font-weight: 800; letter-spacing: 0.08em; cursor: pointer; }
      .ts94-safe-spacer { flex: 1; min-height: 41%; pointer-events: none; }
      .ts94-lower-wrap { position: relative; z-index: 6; display: flex; flex-direction: column; gap: 10px; }
      .ts94-brand-inner { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 2px; }
      .ts94-eyebrow { display: flex; align-items: center; gap: 8px; font-family: monospace; font-size: 8.5px; letter-spacing: 0.22em; color: rgba(246,247,251,0.52); }
      .ts94-hairline { width: 26px; height: 1px; background: rgba(255,255,255,0.18); }
      .ts94-chrome-svg { width: 100%; max-width: 332px; height: auto; filter: drop-shadow(0 6px 20px rgba(0,0,0,0.85)); }
      .ts94-custom-logo-img { width: 100%; max-width: 300px; max-height: 96px; object-fit: contain; }
      .ts94-brand-sub { font-family: "SF Mono", Consolas, monospace; font-size: 9px; font-weight: 800; letter-spacing: 0.2em; color: var(--text-sub); display: flex; gap: 7px; align-items: center; }
      .ts94-dot { color: var(--accent-cyan); opacity: 0.75; }
      .ts94-menu-deck { display: flex; flex-direction: column; gap: 7px; }
      .ts94-nav-card { position: relative; width: 100%; padding: 12px 15px 12px 17px; border-radius: 10px; background: rgba(18,18,29,0.78); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.12); color: var(--text-main); display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: transform 0.12s ease, border-color 0.15s ease, background 0.15s ease; text-align: left; overflow: hidden; }
      .ts94-nav-card:active { transform: scale(0.986); }
      .ts94-nav-card.primary { background: linear-gradient(90deg, var(--ts-glow-soft, rgba(0,240,255,0.14)) 0%, rgba(18,18,29,0.86) 44%, rgba(14,14,23,0.92) 100%); border-color: var(--ts-accent, rgba(0,240,255,0.45)); box-shadow: 0 8px 26px rgba(0,0,0,0.55); }
      .ts94-nav-card.primary::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: var(--ts-accent, #00f0ff); box-shadow: 0 0 12px var(--ts-accent, #00f0ff); }
      .ts94-nav-card.locked { opacity: 0.36; pointer-events: none; }
      .ts94-nav-title { font-size: 13.5px; font-weight: 900; letter-spacing: 0.1em; display: block; }
      .ts94-nav-sub { font-size: 9.5px; color: var(--text-sub); font-weight: 600; margin-top: 1px; display: block; }
      .ts94-nav-meta { font-family: "SF Mono", Consolas, monospace; font-size: 10px; font-weight: 800; color: var(--ts-accent, #00f0ff); letter-spacing: 0.05em; white-space: nowrap; }
      .ts94-pill-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; margin-top: 1px; }
      .ts94-util-pill { background: rgba(15,15,24,0.74); border: 1px solid rgba(255,255,255,0.1); color: rgba(246,247,251,0.86); border-radius: 8px; padding: 8.5px 6px; font-size: 10px; font-weight: 800; letter-spacing: 0.06em; cursor: pointer; text-align: center; transition: 0.12s; }
      .ts94-util-pill:active { transform: scale(0.97); border-color: var(--accent-cyan); }
      .ts94-foot-meta { text-align: center; font-family: monospace; font-size: 8.5px; letter-spacing: 0.14em; color: rgba(142,145,170,0.58); margin-top: 1px; }

      #op-movie-layer { position: absolute; top: env(safe-area-inset-top, 0px); left: 0; right: 0; bottom: calc(var(--ad-safe-bottom) + env(safe-area-inset-bottom, 0px)); background: #030307; z-index: 185; display: none; overflow: hidden; }
      @media (min-width: 500px) { #op-movie-layer { top: 0; bottom: 0; } }
      #op-movie-layer.active { display: block; }
      @keyframes op94KenBurns { 0% { transform: scale(1.02) translateY(0); } 100% { transform: scale(1.14) translateY(-8px); } }
      @keyframes op94ScanIn { 0% { opacity: 1; background: linear-gradient(180deg, #00f0ff 0%, #fff 50%, #000 100%); } 100% { opacity: 0; pointer-events: none; } }
      @keyframes op94Glitch { 0% { opacity: 0.85; transform: scaleY(1.04); } 100% { opacity: 0; transform: scaleY(1); } }
      @keyframes op94RingPulse { 0%, 100% { transform: translate(-50%,-50%) scale(0.92); opacity: 0.55; } 50% { transform: translate(-50%,-50%) scale(1.08); opacity: 0.95; } }
      .op94-scan-entry { position: absolute; inset: 0; z-index: 15; pointer-events: none; animation: op94ScanIn 0.28s ease-out forwards; }
      .op94-fallback-stage { position: absolute; inset: 0; z-index: 1; overflow: hidden; background: #05050a; }
      .op94-anim-scene { position: absolute; inset: 0; overflow: hidden; }
      .op94-anim-bg { position: absolute; inset: -4%; background-color: #090a14; background-size: cover; background-position: center; filter: brightness(0.68) contrast(1.15); animation: op94KenBurns 4.2s ease-out forwards; }
      .op94-disc-ring { position: absolute; left: 50%; top: 42%; width: 170px; height: 170px; border-radius: 50%; border: 2px solid #00f0ff; box-shadow: 0 0 34px rgba(0,240,255,0.65), inset 0 0 26px rgba(255,200,59,0.55); animation: op94RingPulse 1.4s ease-in-out infinite; }
      .op94-eye-stack { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; gap: 14px; padding: 0 10px; }
      .op94-eye-banner { height: 96px; border-top: 2px solid #00f0ff; border-bottom: 2px solid #ff2e93; overflow: hidden; transform: skewY(-5deg); box-shadow: 0 0 28px rgba(0,240,255,0.4); background: #080810; }
      .op94-eye-banner.bot { border-color: #ff2e93; transform: skewY(5deg); }
      .op94-eye-banner img { width: 100%; height: 100%; object-fit: cover; }
      .op94-fx-screen { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; mix-blend-mode: screen; opacity: 0.72; pointer-events: none; }
      .op94-cypher-duo { position: absolute; inset: 8% 0 18% 0; }
      .op94-duo-char { position: absolute; top: 4%; height: 92%; width: 62%; object-fit: contain; object-position: center top; }
      .op94-duo-char.left { left: -6%; }
      .op94-duo-char.right { right: -6%; }
      .op94-duo-flame { position: absolute; bottom: 0; width: 64%; height: 85%; object-fit: cover; mix-blend-mode: screen; opacity: 0.78; }
      .op94-duo-flame.left { left: -8%; }
      .op94-duo-flame.right { right: -8%; }
      .op94-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 3; opacity: 0; transition: opacity 0.25s ease; pointer-events: none; }
      .op94-video.ready { opacity: 1; }
      .op94-rain { position: absolute; inset: 0; z-index: 4; opacity: 0.16; pointer-events: none; background-image: repeating-linear-gradient(106deg, transparent 0px, transparent 32px, rgba(0,240,255,0.4) 33px, transparent 34px); background-size: 92px 180px; animation: rainSlide 1s linear infinite; }
      .op94-scanlines { position: absolute; inset: 0; z-index: 5; pointer-events: none; background: linear-gradient(180deg, rgba(0,0,0,0.55) 0%, transparent 18%, transparent 72%, rgba(3,3,8,0.92) 100%), repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 3px); }
      .op94-glitch-flash { position: absolute; inset: 0; z-index: 7; background: linear-gradient(90deg, rgba(0,240,255,0.45), rgba(255,255,255,0.8), rgba(255,46,147,0.45)); opacity: 0; pointer-events: none; mix-blend-mode: screen; }
      .op94-glitch-flash.fire { animation: op94Glitch 0.22s ease-out forwards; }
      .op94-top-bar { position: absolute; top: 12px; left: 14px; right: 14px; z-index: 10; display: flex; justify-content: space-between; align-items: center; }
      .op94-badge { font-family: "SF Mono", Consolas, monospace; font-size: 9.5px; font-weight: 800; letter-spacing: 0.14em; color: rgba(246,247,251,0.82); background: rgba(8,8,14,0.72); border: 1px solid rgba(255,255,255,0.15); padding: 4px 9px; border-radius: 99px; backdrop-filter: blur(8px); }
      .op94-ctrl-btn { background: rgba(14,14,22,0.78); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2); color: #fff; padding: 5px 11px; border-radius: 99px; font-family: monospace; font-size: 10px; font-weight: 800; letter-spacing: 0.08em; cursor: pointer; }
      .op94-ctrl-btn.skip { border-color: rgba(0,240,255,0.55); color: var(--accent-cyan); }
      .op94-bottom-wrap { position: absolute; left: 14px; right: 14px; bottom: 18px; z-index: 10; transition: opacity 0.2s ease; pointer-events: none; }
      .op94-sub-box { background: rgba(7,7,13,0.82); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border: 1px solid rgba(255,255,255,0.14); border-left: 3px solid var(--accent-cyan); border-radius: 10px; padding: 11px 14px; }
      .op94-sub-tag { font-family: "SF Mono", Consolas, monospace; font-size: 9px; font-weight: 900; letter-spacing: 0.16em; margin-bottom: 4px; color: var(--accent-cyan); }
      .op94-sub-text { font-size: 12px; font-weight: 700; line-height: 1.55; color: #f8fafc; letter-spacing: 0.03em; }
      .op94-progress-track { position: absolute; left: 0; right: 0; bottom: 0; height: 3px; background: rgba(255,255,255,0.1); z-index: 11; }
      .op94-progress-fill { height: 100%; width: 0%; background: linear-gradient(90deg, var(--accent-cyan), var(--accent-pink)); box-shadow: 0 0 10px var(--accent-cyan); }
    `;
    document.head.appendChild(st);
  }

  window.renderTitleScreen = function () {
    if (typeof stopBeatPlayer === 'function') stopBeatPlayer();
    if (typeof AudioEngine !== 'undefined') AudioEngine.stop();
    if (typeof Street25DEngine !== 'undefined') Street25DEngine.pause();

    const hasAuto = typeof loadLatestAutoSave === 'function' && loadLatestAutoSave() && state.created;
    const ts = document.getElementById('title-screen');
    if (!ts) return;
    document.getElementById('topbar').style.display = 'none';
    document.getElementById('bottom-nav').style.display = 'none';

    ts.style.background = '';
    ts.classList.add('ts94-root', 'active');

    if (!state.soundMuted && !OpMovieEngine.active) {
      OpAudioPlayer.play({ restart: false, loop: true, allowDeferredUnlock: true });
    }

    const sideObj = (hasAuto && typeof getSideTheme === 'function') ? getSideTheme(state.profile.side) : { short: 'A-SIDE', color: '#00f0ff', sub: '#ffc83b' };
    const isBSide = hasAuto && state.profile && state.profile.side === 'b_side';
    const accent = isBSide ? '#ff2e93' : '#00f0ff';
    const subAccent = isBSide ? '#c8ff29' : '#ffc83b';
    const glowSoft = isBSide ? 'rgba(255,46,147,0.16)' : 'rgba(0,240,255,0.14)';

    const bgUrl = typeof AssetImageCache !== 'undefined' ? AssetImageCache.resolveStageBg('bg_street_cypher.jpg') : null;
    const kingUrl = typeof AssetImageCache !== 'undefined' ? AssetImageCache.resolveBaseSprite(false) : null;
    const divaUrl = typeof AssetImageCache !== 'undefined' ? AssetImageCache.resolveBaseSprite(true) : null;
    const kKey = (typeof AssetImageCache !== 'undefined' && AssetImageCache.isTaintedBase(false)) ? 'url(#ts94-black-key) ' : '';
    const dKey = (typeof AssetImageCache !== 'undefined' && AssetImageCache.isTaintedBase(true)) ? 'url(#ts94-black-key) ' : '';

    let heroHTML = '';
    if (kingUrl || divaUrl) {
      if (hasAuto) {
        const mainDiva = state.profile.gender === 'diva';
        const mainUrl = mainDiva ? (divaUrl || kingUrl) : (kingUrl || divaUrl);
        const subUrl = mainDiva ? kingUrl : divaUrl;
        const mKey = mainDiva ? dKey : kKey;
        const sKey = mainDiva ? kKey : dKey;
        heroHTML = `<div class="ts94-hero-duo">
          ${subUrl ? `<img src="${subUrl}" class="ts94-hero-img solo-sub" style="filter:${sKey}grayscale(0.3);" alt="">` : ''}
          ${mainUrl ? `<img src="${mainUrl}" class="ts94-hero-img solo-main" style="filter:${mKey}drop-shadow(0 0 18px ${accent}55);" alt="">` : ''}
        </div>`;
      } else {
        heroHTML = `<div class="ts94-hero-duo">
          ${kingUrl ? `<img src="${kingUrl}" class="ts94-hero-img duo-left" style="filter:${kKey}drop-shadow(-4px 0 14px rgba(0,240,255,0.38));" alt="KING">` : ''}
          ${divaUrl ? `<img src="${divaUrl}" class="ts94-hero-img duo-right" style="filter:${dKey}drop-shadow(4px 0 14px rgba(255,46,147,0.38));" alt="DIVA">` : ''}
        </div>`;
      }
    } else if (typeof renderAvatarSVG === 'function') {
      heroHTML = `<div style="width:240px;height:100%;margin:0 auto;opacity:0.85;">${renderAvatarSVG(state.profile, accent, { transparentBg: true, camera: 'bust' })}</div>`;
    }

    const continueCard = hasAuto ? `
      <button class="ts94-nav-card primary" onclick="OpAudioPlayer.fadeOutAndStop(320);continueFromTitle()">
        <div>
          <span class="ts94-nav-title">CONTINUE</span>
          <span class="ts94-nav-sub">ストリートの続きから再開</span>
        </div>
        <span class="ts94-nav-meta">${sideObj.short} · LV.${state.level || 1} ${escapeHtml(state.profile.artistName)} ›</span>
      </button>` : `
      <button class="ts94-nav-card locked">
        <div>
          <span class="ts94-nav-title">CONTINUE</span>
          <span class="ts94-nav-sub">セーブデータなし</span>
        </div>
        <span class="ts94-nav-meta" style="color:var(--text-sub);">NO DATA</span>
      </button>`;

    const newGameCard = `
      <button class="ts94-nav-card ${!hasAuto ? 'primary' : ''}" onclick="startNewGameFromTitle(${hasAuto})">
        <div>
          <span class="ts94-nav-title">NEW GAME</span>
          <span class="ts94-nav-sub">OPムービー再生 ／ 新規キャラ作成</span>
        </div>
        <span class="ts94-nav-meta" style="${hasAuto ? 'color:var(--text-main);' : ''}">START ›</span>
      </button>`;

    ts.innerHTML = `
      <svg width="0" height="0" style="position:absolute;pointer-events:none;" aria-hidden="true">
        <defs><filter id="ts94-black-key" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  14 14 14 -2.35 0"/></filter></defs>
      </svg>
      <div class="ts94-bg" style="${bgUrl ? `background-image:url('${bgUrl}');` : ''}"></div>
      <div class="ts94-rain"></div>
      <div class="ts94-hero-stage">${heroHTML}</div>
      <div class="ts94-vignette"></div>

      <div class="ts94-top-hud">
        <div class="ts94-status-tag"><span class="ts94-live-dot" style="background:${accent};box-shadow:0 0 8px ${accent};"></span><span>ARCHIVE OS // v10.2</span></div>
        <button class="ts94-sound-pill" onclick="toggleTitleMute()">${state.soundMuted ? 'SOUND: OFF' : 'SOUND: ON'}</button>
      </div>

      <div class="ts94-safe-spacer"></div>

      <div class="ts94-lower-wrap" style="--ts-accent:${accent};--ts-glow-soft:${glowSoft};">
        ${buildModernEditorialLogoHTML(accent, subAccent)}
        <div class="ts94-menu-deck">
          ${hasAuto ? continueCard + newGameCard : newGameCard + continueCard}
          <div class="ts94-pill-grid">
            <button class="ts94-util-pill" onclick="playOpeningMovie({ replayOnly: true })">▶ OP MOVIE</button>
            <button class="ts94-util-pill" onclick="openSaveModal()">SAVE / DB</button>
            <button class="ts94-util-pill" onclick="openSysModal()">SYSTEM</button>
          </div>
        </div>
        <div class="ts94-foot-meta">0px SKELETON HYBRID  ·  2.5D NEON ALLEY  ·  ${state.savedAt ? 'SAVED ' + state.savedAt : 'READY'}</div>
      </div>
    `;
  };

  window.startNewGameFromTitle = function (hasExisting) {
    if (hasExisting && !confirm('新しいキャラクターを作成しますか？（手動のセーブスロットは保持されます）')) return;
    const keepSafe = state.adSafePx ?? 56, keepMute = state.soundMuted, keepLogo = !!state.useLegacyLogoImg;
    const keepLabels = state.worldLabels || [], keepLegends = state.legendArchive || [], keepCloud = state.cloud;
    state = createFreshState();
    state.adSafePx = keepSafe; state.soundMuted = keepMute; state.useLegacyLogoImg = keepLogo;
    state.worldLabels = keepLabels; state.legendArchive = keepLegends;
    state.cloud.gasUrl = (keepCloud && keepCloud.gasUrl) || '';
    creatorStep = 1; isSalonEdit = false;
    document.getElementById('title-screen').classList.remove('active');
    playOpeningMovie({ replayOnly: false, onComplete: () => { renderCreator(false); } });
  };

  if (typeof window.openSysModal === 'function' && !window._ts94SysWrapped) {
    window._ts94SysWrapped = true;
    const _origSys = window.openSysModal;
    window.openSysModal = function () {
      _origSys();
      const body = document.querySelector('#modal-layer .modal-body');
      if (!body) return;
      body.insertAdjacentHTML('beforeend', `
        <div class="panel">
          <div style="font-size:10.5px;font-weight:900;margin-bottom:6px;color:var(--accent-cyan);">🎬 タイトル＆プロローグ設定</div>
          <button class="btn btn-cyan" style="margin-bottom:6px;" onclick="closeModal();playOpeningMovie({ replayOnly: true })">▶ オープニングムービーを再再生</button>
        </div>
      `);
    };
  }

  OpMovieEngine.preloadAssets();
  renderTitleScreen();
}

window.addEventListener('DOMContentLoaded', installEditorialTitleAndOp);
