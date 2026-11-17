/* =========================================================================
   CYBER RAPPER // 0px SKELETON-LOCKED HYBRID ASSET & CEL-SHADED PARTS v9.2
   Custom Title Logo (.png / .jfif / .jpg Auto-Unpremultiply + Neon Glow)
   + 3-Image MVP Auto-Bridge + Beat Puppet + 2.5D Hooks
   ========================================================================= */

const AVATAR_CATALOG = {
  hairsKing: [
    { id: 0, name: 'ネオウルフ（初期ベース）', req: null },
    { id: 1, name: 'フェードクロップ', req: null },
    { id: 2, name: 'センタースパイラル', req: null },
    { id: 3, name: 'コーンロウ＆ドレッド', req: null },
    { id: 4, name: 'アシンメトリーマッシュ', req: null },
    { id: 5, name: 'マンバン結び髪', req: null },
    { id: 6, name: 'ツートン極太ドレッド', req: { lv: 3, label: 'Lv.3到達で解放' } },
    { id: 7, name: '覚醒スパイキーウルフ', req: { boss: 1, label: 'ボス1人撃破で解放' } }
  ],
  hairsDiva: [
    { id: 0, name: 'ハッシュウルフ（初期ベース）', req: null },
    { id: 1, name: 'ネオ姫カットロング', req: null },
    { id: 2, name: 'タッセル切りっぱなしボブ', req: null },
    { id: 3, name: 'ストリートお団子ツイン', req: null },
    { id: 4, name: 'シャープロングブレイズ', req: null },
    { id: 5, name: 'クラゲレイヤー盛り髪', req: null },
    { id: 6, name: 'ゴシックリボンお団子', req: { lv: 3, label: 'Lv.3到達で解放' } },
    { id: 7, name: '女帝ストレート超ロング', req: { boss: 1, label: 'ボス1人撃破で解放' } }
  ],
  eyes: [
    { id: 0, name: 'クール切れ長', req: null },
    { id: 1, name: 'アンニュイ半目', req: null },
    { id: 2, name: '強気キャットアイ', req: null },
    { id: 3, name: 'リムレス色眼鏡', req: null },
    { id: 4, name: 'ダークシェード', req: null },
    { id: 5, name: '覚醒オッドアイ', req: { rep: 60, label: 'Respect 60で解放' } },
    { id: 6, name: 'サイバーLEDバイザー', req: { lv: 4, label: 'Lv.4到達で解放' } }
  ],
  mouths: [
    { id: 0, name: '不敵なニヤリ笑み', req: null },
    { id: 1, name: 'クール色リップ', req: null },
    { id: 2, name: '挑発シャウト（八重歯）', req: null },
    { id: 3, name: 'リップリングピアス', req: { lv: 2, label: 'Lv.2到達で解放' } }
  ],
  propsList: [
    { id: 'pierce', name: 'シルバー耳ピアス', req: null },
    { id: 'dark_circles', name: '徹夜シャドウ', req: null },
    { id: 'brow_slit', name: '眉スリット＆傷跡', req: null },
    { id: 'bandage', name: '鼻筋の絆創膏', req: null },
    { id: 'neck_tattoo', name: '首筋タトゥー', req: { lv: 2, label: 'Lv.2到達で解放' } },
    { id: 'crown_tear', name: '目元クラウン刻印', req: { rep: 100, label: 'Respect 100で解放' } },
    { id: 'cyber_seam', name: '発光サイバー神経跡', req: { boss: 2, label: 'ボス2人撃破で解放' } }
  ],
  hairSwatches: ['#f1f5f9', '#14141f', '#ff2e93', '#ffc83b', '#8b5cf6', '#00f0ff', '#c8ff29', '#ef4444'],
  meshSwatches: ['#00f0ff', '#ff2e93', '#c8ff29', '#ffc83b', '#a855f7', '#ffffff', '#111118']
};

/* --- Hybrid 0px Image Cache v9.2 (BFS Edge Cutout + Luminance Logo Cutout + Multi-Ext Fallback) --- */
const AssetImageCache = {
  entries: {},
  _refreshTimer: null,

  _buildCandidates(relPath) {
    const base = relPath.replace(/\.(png|jfif|jpe?g|webp)$/i, '');
    if (/^title[-_]logo[-_]base$/i.test(base)) {
      return [
        'title-logo-base.png',
        'title-logo-base.jfif',
        'title-logo-base.jpg',
        'title-logo-base.jpeg',
        'title_logo_base.png',
        'title_logo_base.jfif'
      ];
    }
    const list = [relPath];
    ['.png', '.jpg', '.jfif', '.jpeg'].forEach(ext => {
      const cand = base + ext;
      if (!list.includes(cand)) list.push(cand);
    });
    return list;
  },

  _cutoutLogoLuminance(img, loadedPath) {
    const w = Math.max(1, img.naturalWidth);
    const h = Math.max(1, img.naturalHeight);
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const ctx = c.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(img, 0, 0, w, h);
    try {
      const imgData = ctx.getImageData(0, 0, w, h);
      const d = imgData.data;
      if (d[3] < 16 && d[(w - 1) * 4 + 3] < 16) {
        return { url: img.src, canvas: c, tainted: false, needsScreen: false };
      }
      for (let i = 0; i < d.length; i += 4) {
        const lum = Math.max(d[i], d[i + 1], d[i + 2]);
        if (lum <= 8) {
          d[i] = 0; d[i + 1] = 0; d[i + 2] = 0; d[i + 3] = 0;
        } else {
          const a = Math.min(1, (lum - 8) / 227);
          const inv = 1 / Math.max(a, 0.001);
          d[i] = Math.min(255, (d[i] * inv) | 0);
          d[i + 1] = Math.min(255, (d[i + 1] * inv) | 0);
          d[i + 2] = Math.min(255, (d[i + 2] * inv) | 0);
          d[i + 3] = (a * 255) | 0;
        }
      }
      ctx.putImageData(imgData, 0, 0);
      return { url: c.toDataURL('image/png'), canvas: c, tainted: false, needsScreen: false };
    } catch (err) {
      const isJpeg = /\.(jfif|jpe?g)$/i.test(loadedPath || '');
      return { url: img.src, canvas: null, tainted: true, needsScreen: isJpeg };
    }
  },

  _cutoutBlackBg(img) {
    const maxH = 1024;
    const scale = img.naturalHeight > maxH ? maxH / img.naturalHeight : 1;
    const w = Math.max(1, Math.round(img.naturalWidth * scale));
    const h = Math.max(1, Math.round(img.naturalHeight * scale));
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const ctx = c.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(img, 0, 0, w, h);
    try {
      const imgData = ctx.getImageData(0, 0, w, h);
      const d = imgData.data;
      if (d[3] < 16 && d[(w - 1) * 4 + 3] < 16) {
        return { url: c.toDataURL('image/png'), canvas: c, tainted: false };
      }
      const cIdx = [0, (w - 1) * 4, (h - 1) * w * 4, ((h - 1) * w + (w - 1)) * 4];
      let bgR = 0, bgG = 0, bgB = 0, cornerMax = 0;
      cIdx.forEach(p => {
        bgR += d[p]; bgG += d[p + 1]; bgB += d[p + 2];
        cornerMax = Math.max(cornerMax, d[p], d[p + 1], d[p + 2]);
      });
      bgR = (bgR / 4) | 0; bgG = (bgG / 4) | 0; bgB = (bgB / 4) | 0;
      if (cornerMax > 36) return { url: img.src, canvas: c, tainted: false };

      const pitchBlack = cornerMax <= 9;
      const isBg = (idx) => {
        const p = idx * 4, r = d[p], g = d[p + 1], b = d[p + 2];
        if (pitchBlack) return r <= 13 && g <= 13 && b <= 14;
        return (Math.abs(r - bgR) + Math.abs(g - bgG) + Math.abs(b - bgB)) <= 22 && r < 28 && g < 30 && b < 36;
      };

      const visited = new Uint8Array(w * h);
      const queue = new Int32Array(w * h);
      let head = 0, tail = 0;
      const pushSeed = (idx) => { if (!visited[idx] && isBg(idx)) { visited[idx] = 1; queue[tail++] = idx; } };
      for (let x = 0; x < w; x++) { pushSeed(x); pushSeed((h - 1) * w + x); }
      for (let y = 1; y < h - 1; y++) { pushSeed(y * w); pushSeed(y * w + w - 1); }

      const isDeepVoid = (idx) => { const p = idx * 4; return d[p] <= 5 && d[p + 1] <= 5 && d[p + 2] <= 6; };
      for (let y = 6; y < h - 6; y += 4) {
        for (let x = 6; x < w - 6; x += 4) {
          const idx = y * w + x;
          if (!visited[idx] && isDeepVoid(idx) && isDeepVoid(idx - 3) && isDeepVoid(idx + 3) && isDeepVoid(idx - 3 * w) && isDeepVoid(idx + 3 * w)) {
            visited[idx] = 1; queue[tail++] = idx;
          }
        }
      }

      while (head < tail) {
        const cur = queue[head++];
        d[cur * 4 + 3] = 0;
        const cx = cur % w, cy = (cur / w) | 0;
        if (cx > 0) pushSeed(cur - 1);
        if (cx < w - 1) pushSeed(cur + 1);
        if (cy > 0) pushSeed(cur - w);
        if (cy < h - 1) pushSeed(cur + w);
      }

      for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
          const idx = y * w + x;
          if (visited[idx]) continue;
          const bgN = visited[idx - 1] + visited[idx + 1] + visited[idx - w] + visited[idx + w];
          if (bgN > 0) {
            const p = idx * 4;
            if (Math.max(d[p], d[p + 1], d[p + 2]) < 40) d[p + 3] = Math.round(d[p + 3] * (bgN >= 2 ? 0.36 : 0.72));
          }
        }
      }
      ctx.putImageData(imgData, 0, 0);
      return { url: c.toDataURL('image/png'), canvas: c, tainted: false };
    } catch (err) {
      return { url: img.src, canvas: null, tainted: true };
    }
  },

  _scheduleGlobalRefresh() {
    clearTimeout(this._refreshTimer);
    this._refreshTimer = setTimeout(() => {
      if (typeof window.refreshOnAssetReady === 'function') window.refreshOnAssetReady();
    }, 55);
  },

  resolve(relPath, arg2) {
    if (!relPath) return null;
    const opts = typeof arg2 === 'function' ? { onReady: arg2 } : (arg2 || {});
    const isLogo = !!opts.logoMode;
    const wantCutout = opts.cutout !== undefined ? opts.cutout : /^(king|diva)_(base|head|outfit)_/i.test(relPath);
    const key = (isLogo ? 'logo:' : wantCutout ? 'cut:' : 'raw:') + relPath;
    let ent = this.entries[key];
    if (ent) {
      if (ent.status === 'ok') return ent.url;
      if (ent.status === 'loading' && typeof opts.onReady === 'function') ent.callbacks.push(opts.onReady);
      return null;
    }
    const candidates = this._buildCandidates(relPath);
    let candIdx = 0;
    ent = { status: 'loading', url: null, el: null, canvas: null, tainted: false, needsScreen: false, callbacks: [] };
    if (typeof opts.onReady === 'function') ent.callbacks.push(opts.onReady);
    this.entries[key] = ent;

    const img = new Image();
    img.onload = () => {
      ent.el = img;
      const loadedName = candidates[candIdx] || relPath;
      if (isLogo) {
        const res = this._cutoutLogoLuminance(img, loadedName);
        ent.url = res.url; ent.canvas = res.canvas; ent.tainted = res.tainted; ent.needsScreen = !!res.needsScreen;
      } else if (wantCutout) {
        const res = this._cutoutBlackBg(img);
        ent.url = res.url; ent.canvas = res.canvas; ent.tainted = res.tainted;
      } else {
        ent.url = img.src;
      }
      ent.status = 'ok';
      ent.callbacks.splice(0).forEach(fn => { try { fn(ent.url); } catch (e) {} });
      this._scheduleGlobalRefresh();
    };
    img.onerror = () => {
      candIdx += 1;
      if (candIdx < candidates.length) {
        img.src = 'assets/images/' + candidates[candIdx];
        return;
      }
      ent.status = 'missing'; ent.callbacks.length = 0;
    };
    img.src = 'assets/images/' + candidates[0];
    return null;
  },

  resolveTitleLogo(onReady) {
    return this.resolve('title-logo-base.png', { logoMode: true, cutout: false, onReady });
  },

  needsLogoScreenBlend() {
    return !!(this.entries['logo:title-logo-base.png']?.needsScreen);
  },

  resolveBaseSprite(isDiva, onReady) {
    return this.resolve(isDiva ? 'diva_base_01.png' : 'king_base_01.png', { cutout: true, onReady });
  },

  isTaintedBase(isDiva) {
    return !!(this.entries['cut:' + (isDiva ? 'diva_base_01.png' : 'king_base_01.png')]?.tainted);
  },

  resolveStageBg(preferredRel, onReady) {
    return (preferredRel && this.resolve(preferredRel, { cutout: false, onReady })) ||
           this.resolve('bg_street_cypher.png', { cutout: false, onReady });
  },

  getDrawable(relPath, wantCutout) {
    const ent = this.entries[(wantCutout ? 'cut:' : 'raw:') + relPath];
    return (ent && ent.status === 'ok') ? (ent.canvas || ent.el) : null;
  },

  preloadMVP() {
    this.resolveTitleLogo();
    this.resolveBaseSprite(true);
    this.resolveBaseSprite(false);
    this.resolveStageBg();
  }
};

function getAllOutfits() {
  const custom = (typeof state !== 'undefined' && Array.isArray(state.customOutfits)) ? state.customOutfits : [];
  return OUTFITS.concat(custom);
}

function findOutfitById(id) { return getAllOutfits().find(o => o.id === id) || OUTFITS[0]; }

function isPartUnlocked(req) {
  if (!req) return true;
  if (typeof state === 'undefined') return false;
  const lv = state.level || 1, rep = state.respect || 0, bosses = (state.defeatedBosses || []).length;
  if (req.lv && lv < req.lv) return false;
  if (req.rep && rep < req.rep) return false;
  if (req.boss && bosses < req.boss) return false;
  return true;
}

function shadeHex(hex, amt) {
  let c = (hex || '#888888').replace('#', '');
  if (c.length === 3) c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
  const n = parseInt(c, 16) || 0;
  const r = Math.min(255, Math.max(0, (n >> 16) + amt));
  const g = Math.min(255, Math.max(0, ((n >> 8) & 0x00ff) + amt));
  const b = Math.min(255, Math.max(0, (n & 0x0000ff) + amt));
  return '#' + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function buildAnimeHairLayers(isDiva, hId, uid, meshCol) {
  let back = '', front = '', mesh = '';
  if (isDiva) {
    if (hId === 0) {
      back = `<path d="M235 52 C308 42, 344 135, 326 312 C304 292, 294 246, 286 198 C278 138, 262 94, 228 74 Z" fill="url(#hair_${uid})" stroke="url(#hairDarkG_${uid})" stroke-width="2.2"/><path d="M256 76 C296 98, 314 176, 308 274" fill="none" stroke="${meshCol}" stroke-width="7" opacity="0.75" stroke-linecap="round"/>`;
    } else if (hId === 2) {
      back = `<path d="M138 96 C126 154, 124 212, 130 238 L290 238 C296 212, 294 154, 282 96 Z" fill="url(#hairDarkG_${uid})" stroke="#120c18" stroke-width="2"/>`;
    } else if (hId === 3 || hId === 6) {
      back = hId === 3
        ? `<circle cx="142" cy="64" r="28" fill="url(#hair_${uid})" stroke="#120c18" stroke-width="2.2"/><circle cx="278" cy="64" r="28" fill="url(#hair_${uid})" stroke="#120c18" stroke-width="2.2"/><circle cx="142" cy="64" r="18" fill="none" stroke="${meshCol}" stroke-width="3" opacity="0.7"/>`
        : `<path d="M138 74 C92 98, 84 218, 108 320 L144 294 C132 214, 134 136, 150 94 Z M282 74 C328 98, 336 218, 312 320 L276 294 C288 214, 286 136, 270 94 Z" fill="url(#hair_${uid})" stroke="#120c18" stroke-width="2.2"/>`;
    } else if (hId === 4) {
      back = `<g stroke="#120c18" stroke-width="1.8" fill="url(#hairDarkG_${uid})"><path d="M136 108 Q116 210 122 336 L142 336 Q138 210 152 112 Z"/><path d="M284 108 Q304 210 298 336 L278 336 Q282 210 268 112 Z"/></g>`;
    } else {
      const len = hId === 7 ? 380 : 335;
      back = `<path d="M132 96 C114 176, 112 260, 118 ${len} L302 ${len} C308 260, 306 176, 288 96 Z" fill="url(#hairDarkG_${uid})" stroke="#120c18" stroke-width="2"/>`;
    }
    const sideLen = hId === 1 ? 242 : hId === 2 ? 232 : 265;
    mesh = `<path d="M150 112 C144 162, 146 206, 154 ${sideLen - 16} L162 ${sideLen - 24} C156 196, 156 154, 160 114 Z M270 112 C276 162, 274 206, 266 ${sideLen - 16} L258 ${sideLen - 24} C264 196, 264 154, 260 114 Z" fill="${meshCol}" opacity="0.82"/>`;
    front = `<path d="M142 98 C132 146, 134 198, 146 ${sideLen} L162 ${sideLen - 18} C154 188, 154 142, 162 104 Z" fill="url(#hair_${uid})" stroke="#120c18" stroke-width="1.9"/><path d="M278 98 C288 146, 286 198, 274 ${sideLen} L258 ${sideLen - 18} C266 188, 266 142, 258 104 Z" fill="url(#hair_${uid})" stroke="#120c18" stroke-width="1.9"/>${mesh}<path d="M140 126 C138 68, 168 42, 210 42 C252 42, 282 68, 280 126 C270 96, 256 84, 244 128 L236 96 L222 134 L212 94 L198 135 L188 96 L174 130 C164 88, 150 96, 140 126 Z" fill="url(#hair_${uid})" stroke="#120c18" stroke-width="2"/><path d="M166 78 Q188 68 210 76 Q232 68 254 78 L248 85 Q228 77 210 84 Q192 77 172 85 Z" fill="#ffffff" opacity="0.42"/>`;
  } else {
    if (hId === 1) {
      front = `<path d="M148 116 C148 66, 172 46, 210 46 C248 46, 272 66, 272 116 L262 96 L248 110 L234 92 L218 112 L204 92 L188 112 L172 94 L158 108 Z" fill="url(#hair_${uid})" stroke="#120c18" stroke-width="2.1"/><path d="M228 60 L248 104 L238 102 Z" fill="${meshCol}" opacity="0.85"/>`;
    } else if (hId === 3 || hId === 6) {
      const dreadColor2 = hId === 6 ? meshCol : `url(#hair_${uid})`;
      back = `<g stroke="#120c18" stroke-width="2"><path d="M136 102 L118 242 L136 246 L150 112 Z" fill="url(#hairDarkG_${uid})"/><path d="M284 102 L302 242 L284 246 L270 112 Z" fill="${dreadColor2}"/></g>`;
      front = `<path d="M142 122 C140 66, 168 42, 210 42 C252 42, 280 66, 278 122 L266 88 L256 144 L244 84 L232 140 L216 82 L208 134 L196 82 L184 142 L170 86 L158 144 Z" fill="url(#hair_${uid})" stroke="#120c18" stroke-width="2.1"/><path d="M214 44 C250 44, 276 68, 276 120 L264 88 L255 142 L243 84 L232 138 L216 82 Z" fill="${dreadColor2}" opacity="${hId === 6 ? '0.92' : '0'}"/>`;
    } else {
      back = `<path d="M136 126 L116 184 L134 182 L124 222 L296 222 L286 182 L304 184 L284 126 Z" fill="url(#hairDarkG_${uid})" stroke="#120c18" stroke-width="2"/>${hId === 5 ? `<circle cx="210" cy="34" r="22" fill="url(#hair_${uid})" stroke="#120c18" stroke-width="2.2"/>` : ''}`;
      front = `<path d="M136 136 C130 74, 162 40, 210 40 C258 40, 290 74, 284 136 L270 100 L262 142 L248 94 L234 140 L218 88 L204 142 L190 90 L174 140 L160 96 L148 138 Z" fill="url(#hair_${uid})" stroke="#120c18" stroke-width="2.1"/><path d="M174 88 L162 134 L172 130 Z M244 90 L256 136 L246 132 Z" fill="${meshCol}" opacity="0.88"/><path d="M168 74 Q210 62 252 74 L246 82 Q210 72 174 82 Z" fill="#ffffff" opacity="0.38"/>`;
    }
  }
  return { back, front };
}

function buildAnimeEyesLayer(isDiva, eyeId, uid, acc, meshCol, hairDark) {
  if (eyeId === 6) {
    return `<g><path d="M144 126 Q210 118 276 126 L270 156 Q210 148 150 156 Z" fill="#070913" stroke="${acc}" stroke-width="2.6"/><path d="M156 140 L192 140 L202 132 L218 148 L228 140 L264 140" fill="none" stroke="${meshCol}" stroke-width="2.6"/><line x1="152" y1="131" x2="268" y2="131" stroke="#ffffff" stroke-width="1.6" opacity="0.65"/></g>`;
  }
  const leftIris = `url(#irisL_${uid})`, rightIris = eyeId === 5 ? `url(#irisR_${uid})` : `url(#irisL_${uid})`, lidY = eyeId === 1 ? 139 : 134;
  const wing = isDiva || eyeId === 2 ? `<path d="M153 141 L142 133 L156 137 Z M267 141 L278 133 L264 137 Z" fill="#120a14"/>` : '';
  const baseEyes = `<path d="M156 ${lidY - 6} Q174 ${lidY - 12} 192 ${lidY - 5} M228 ${lidY - 5} Q246 ${lidY - 12} 264 ${lidY - 6}" fill="none" stroke="#6e4238" stroke-width="1.3" opacity="0.75"/><path d="M152 121 Q174 116 195 124 M225 124 Q246 116 268 121" fill="none" stroke="${hairDark}" stroke-width="${isDiva ? '2.8' : '3.6'}" stroke-linecap="round"/><path d="M154 142 Q173 ${lidY - 3} 193 142 Q176 151 156 147 Z" fill="#f8fafc"/><path d="M227 142 Q247 ${lidY - 3} 266 142 Q244 151 229 147 Z" fill="#f8fafc"/><circle cx="174" cy="142" r="6.8" fill="#090d16"/><circle cx="174" cy="142" r="5.3" fill="${leftIris}"/><circle cx="174" cy="142" r="2.3" fill="#05070c"/><circle cx="246" cy="142" r="6.8" fill="#090d16"/><circle cx="246" cy="142" r="5.3" fill="${rightIris}"/><circle cx="246" cy="142" r="2.3" fill="#05070c"/><circle cx="171" cy="139" r="2.2" fill="#ffffff"/><circle cx="177" cy="145" r="1.1" fill="#ffffff"/><circle cx="243" cy="139" r="2.2" fill="#ffffff"/><circle cx="249" cy="145" r="1.1" fill="#ffffff"/><path d="M152 142 Q173 ${lidY - 5} 194 142 L192 ${lidY + 3} Q173 ${lidY - 2} 154 ${lidY + 4} Z" fill="#120a14"/><path d="M226 142 Q247 ${lidY - 5} 268 142 L266 ${lidY + 4} Q247 ${lidY - 2} 228 ${lidY + 3} Z" fill="#120a14"/>${wing}`;
  if (eyeId === 3) return `${baseEyes}<g opacity="0.88"><rect x="149" y="130" width="48" height="23" rx="6" fill="${acc}33" stroke="#e2e8f0" stroke-width="1.6"/><rect x="223" y="130" width="48" height="23" rx="6" fill="${acc}33" stroke="#e2e8f0" stroke-width="1.6"/><line x1="197" y1="139" x2="223" y2="139" stroke="#e2e8f0" stroke-width="1.8"/></g>`;
  if (eyeId === 4) return `${baseEyes}<polygon points="146,129 274,129 268,153 218,149 210,142 202,149 152,153" fill="rgba(8,10,18,0.92)" stroke="${acc}" stroke-width="2.2"/>`;
  return baseEyes;
}

function buildAnimeOutfitLayer(isDiva, out, uid, glow) {
  const cDark = shadeHex(out.color, -45), st = out.style || 'hoodie';
  if (st === 'mohair' || out.id === 'ec_mohair') {
    return `${isDiva ? `<path d="M168 266 Q210 296 252 266 L262 340 L158 340 Z" fill="#0d0d16" stroke="${out.accent}" stroke-width="1.8"/>` : ''}<path d="M74 490 C88 334, 122 276, 166 262 Q210 294 254 262 C298 276, 332 334, 346 490 Z" fill="url(#cloth_${uid})" stroke="#120d1d" stroke-width="2.6"/><path d="M92 314 Q210 342 328 314 M84 364 Q210 392 336 364" stroke="${cDark}" stroke-width="15" fill="none" stroke-dasharray="12 6" opacity="0.85"/>`;
  }
  if (st === 'fur' || out.id === 'ec_fur_coat') {
    return `<path d="M158 268 Q210 298 262 268 L272 480 L148 480 Z" fill="#0b0b13"/><path d="M164 282 Q210 306 256 282" fill="none" stroke="${out.accent}" stroke-width="2.4"/><path d="M56 490 C68 326, 104 264, 158 250 L176 284 L168 490 Z M364 490 C352 326, 316 264, 262 250 L244 284 L252 490 Z" fill="url(#cloth_${uid})" stroke="#09090f" stroke-width="2.6"/><path d="M126 254 L118 266 L132 274 L124 290 L142 298 L136 318 L168 336 L176 276 Z M294 254 L302 266 L288 274 L296 290 L278 298 L284 318 L252 336 L244 276 Z" fill="${shadeHex(out.color, 28)}" stroke="${out.accent}" stroke-width="1.6"/>`;
  }
  if (st === 'cyber' || out.id === 'ec_cyber_jkt') {
    return `<path d="M152 224 L142 268 L278 268 L268 224 Q210 242 152 224 Z" fill="#0b101d" stroke="${out.accent}" stroke-width="2.2"/><path d="M64 490 C78 324, 114 268, 162 256 L258 256 C306 268, 342 324, 356 490 Z" fill="url(#cloth_${uid})" stroke="#070a12" stroke-width="2.8"/><line x1="210" y1="256" x2="210" y2="485" stroke="#94a3b8" stroke-width="3"/><path d="M116 286 L168 356 L252 356 L304 286" fill="none" stroke="${out.accent}" stroke-width="3"/><rect x="196" y="346" width="28" height="18" rx="3" fill="#05070e" stroke="${glow}" stroke-width="2"/>`;
  }
  if (st === 'shirt' || st === 'jacket') {
    return `<path d="M164 262 Q210 288 256 262 L264 490 L156 490 Z" fill="#10101a"/><path d="M64 490 C78 324, 116 266, 164 252 L192 346 L186 490 Z M356 490 C342 324, 304 266, 256 252 L228 346 L234 490 Z" fill="url(#cloth_${uid})" stroke="#0b0b12" stroke-width="2.6"/><path d="M164 252 L144 294 L184 320 Z M256 252 L276 294 L236 320 Z" fill="${cDark}" stroke="${out.accent}" stroke-width="1.8"/>`;
  }
  return `<path d="M124 264 C112 214, 146 196, 210 196 C274 196, 308 214, 296 264 Z" fill="${cDark}" stroke="#0b0b12" stroke-width="2.4"/><path d="${isDiva ? 'M76 490 C90 330, 124 270, 168 256 Q210 282 252 256 C296 270, 330 330, 344 490 Z' : 'M60 490 C76 322, 114 264, 164 252 Q210 278 256 252 C306 264, 344 322, 360 490 Z'}" fill="url(#cloth_${uid})" stroke="#0b0b12" stroke-width="2.6"/><path d="M158 254 Q210 288 262 254" fill="none" stroke="${out.accent}" stroke-width="3.2"/><path d="M142 308 Q178 334 196 368 M278 308 Q242 334 224 368" fill="none" stroke="${cDark}" stroke-width="3" stroke-linecap="round" opacity="0.75"/><circle cx="186" cy="276" r="3" fill="#e2e8f0"/><circle cx="234" cy="276" r="3" fill="#e2e8f0"/><path d="M186 278 Q182 324 185 352 M234 278 Q238 324 235 352" fill="none" stroke="#f1f5f9" stroke-width="2.5" stroke-linecap="round"/>${out.brandTag ? `<text x="210" y="338" text-anchor="middle" font-family="Impact,sans-serif" font-size="16" letter-spacing="2" fill="${out.accent}">${out.brandTag}</text>` : ''}`;
}

/* --- Auto-Bridge Hooks for v8 & v9 Stages + Custom Title Logo (Runs after all scripts load) --- */
window.addEventListener('DOMContentLoaded', () => {
  const st = document.createElement('style');
  st.textContent = `
    @keyframes puppetBaseGroove{0%,100%{transform:translateY(0) rotate(-0.8deg) scaleY(1);}38%{transform:translateY(4px) rotate(1.4deg) scaleY(0.986);}72%{transform:translateY(-1.5px) rotate(-0.4deg) scaleY(1.005);}}
    @keyframes logoNeonPulse{0%,18%,22%,62%,64%,100%{opacity:1;filter:drop-shadow(0 0 8px var(--logo-glow-1,#00f0ff)) drop-shadow(0 0 22px var(--logo-glow-2,rgba(255,46,147,0.55)));}20%,63%{opacity:0.74;filter:drop-shadow(0 0 3px var(--logo-glow-1,#00f0ff));}50%{opacity:1;filter:drop-shadow(0 0 14px var(--logo-glow-1,#00f0ff)) drop-shadow(0 0 30px var(--logo-glow-2,rgba(255,200,59,0.65)));}}
    .puppet-base-anim{transform-origin:50% 92%;animation:puppetBaseGroove var(--beat-sec,0.545s) cubic-bezier(.26,.06,.3,1) infinite;z-index:3;overflow:hidden;}
    .puppet-layer img.puppet-img-cover{width:100%;height:100%;object-fit:cover;object-position:50% 4%;display:block;}
    .title-logo-wrap{display:flex;flex-direction:column;align-items:center;gap:4px;}
    .title-logo-img{width:100%;max-width:386px;max-height:186px;height:auto;object-fit:contain;display:block;margin:0 auto;user-select:none;pointer-events:none;animation:logoNeonPulse 5.2s ease-in-out infinite;}
    .title-logo-img.logo-screen-blend{mix-blend-mode:screen;}
    .title-logo-sub{font-family:"SF Mono",Consolas,monospace;font-weight:900;font-size:9.5px;letter-spacing:0.2em;color:var(--text-main);text-shadow:0 0 10px var(--logo-glow-1,#00f0ff);}
  `;
  document.head.appendChild(st);
  const fw = document.createElement('div');
  fw.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;pointer-events:none;';
  fw.innerHTML = `<svg width="0" height="0" aria-hidden="true"><defs><filter id="tainted-black-key" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  18 18 18 -0.85 0"/></filter></defs></svg>`;
  document.body.appendChild(fw);

  if (typeof window.renderTaggingLogoSVG === 'function') {
    const _origLogo = window.renderTaggingLogoSVG;
    window.renderTaggingLogoSVG = function () {
      const logoUrl = AssetImageCache.resolveTitleLogo();
      if (!logoUrl) return _origLogo();
      const isBSide = typeof state !== 'undefined' && state.profile && state.profile.side === 'b_side';
      const glow1 = isBSide ? '#ff2e93' : '#00f0ff';
      const glow2 = isBSide ? 'rgba(200,255,41,0.58)' : 'rgba(255,200,59,0.62)';
      const screenCls = AssetImageCache.needsLogoScreenBlend() ? 'logo-screen-blend' : '';
      return `<div class="title-logo-wrap" style="--logo-glow-1:${glow1};--logo-glow-2:${glow2};"><img src="${logoUrl}" alt="CYBER RAPPER" class="title-logo-img ${screenCls}"><div class="title-logo-sub">💿 A-SIDE vs 📼 B-SIDE // LOST ARCHIVE RPG</div></div>`;
    };
  }

  if (typeof window.renderBeatPuppetHTML === 'function') {
    const _origP = window.renderBeatPuppetHTML;
    window.renderBeatPuppetHTML = function (profile, opts) {
      const o = opts || {}, p = profile || state.profile, isDiva = p.gender === 'diva';
      const out = findOutfitById(o.outfitId || p.outfitId || 'init_hoodie');
      const hasSplit = AssetImageCache.resolve(`${isDiva ? 'diva' : 'king'}_head_${p.hairType || 0}.png`) && AssetImageCache.resolve(`${isDiva ? 'diva' : 'king'}_outfit_${out.id}.png`);
      const basePng = !hasSplit ? AssetImageCache.resolveBaseSprite(isDiva) : null;
      if (!basePng) return _origP(profile, opts);
      const bpm = o.bpm || AudioEngine.getCurrentBpm(), glow = o.glow || getImplantGlow();
      const isEnemy = !!o.flipX && typeof activeBattle !== 'undefined' && activeBattle?.rival;
      const rim = isEnemy && typeof getRivalFilterCSS === 'function' ? getRivalFilterCSS(activeBattle.rival.style) : `drop-shadow(0 0 8px ${glow}88)`;
      const tF = AssetImageCache.isTaintedBase(isDiva) ? 'url(#tainted-black-key) ' : '';
      const handPng = AssetImageCache.resolve('hand_mic_foreground.png');
      const handHTML = o.showMicHand === false ? '' : (handPng ? `<div class="puppet-layer puppet-hand-anim"><img src="${handPng}" alt=""></div>` : `<div class="puppet-layer puppet-hand-anim"><svg viewBox="0 10 420 342"><g transform="translate(18,8)"><rect x="252" y="226" width="22" height="96" rx="8" transform="rotate(-18 263 274)" fill="#0d0f1a" stroke="#cbd5e1" stroke-width="2"/><ellipse cx="246" cy="214" rx="19" ry="21" transform="rotate(-18 246 214)" fill="#1e293b" stroke="${glow}" stroke-width="2.4"/><path d="M244 252 C240 242,274 236,282 250 C288 262,284 286,268 292 C252 296,244 274,244 252 Z" fill="#111320" stroke="${glow}" stroke-width="2"/></g></svg></div>`);
      return `<div class="beat-puppet-stage ${o.burstClass || ''}" style="--beat-sec:${(60 / bpm).toFixed(3)}s;--half-beat-sec:${(30 / bpm).toFixed(3)}s;${o.flipX ? 'transform:scaleX(-1);' : ''}">${buildCyberFlameHTML(p.side === 'b_side', o.flameLevel || 0)}<div class="puppet-layer puppet-base-anim" style="filter:${tF}${rim};"><img src="${basePng}" alt="" class="puppet-img-cover"></div>${handHTML}</div>`;
    };
  }

  const paintMonBg = (grad) => {
    const bg = AssetImageCache.resolveStageBg(), mon = document.querySelector('#stage-view .stage-monitor');
    if (bg && mon && !mon.classList.contains('street-25d')) mon.style.background = `${grad}, url('${bg}') center/cover no-repeat`;
  };
  if (typeof window.renderTitleScreen === 'function') {
    const _oT = window.renderTitleScreen;
    window.renderTitleScreen = function () { _oT(); const bg = AssetImageCache.resolveStageBg(), ts = document.getElementById('title-screen'); if (bg && ts) ts.style.background = `linear-gradient(180deg,rgba(16,8,28,0.66) 0%,rgba(5,5,10,0.92) 100%), url('${bg}') center/cover no-repeat`; };
  }
  if (typeof window.renderBattleArena === 'function') { const _oB = window.renderBattleArena; window.renderBattleArena = function () { _oB(); paintMonBg('linear-gradient(180deg,rgba(18,7,26,0.38) 0%,rgba(7,7,13,0.84) 100%)'); }; }
  if (typeof window.renderHustleTab === 'function') { const _oH = window.renderHustleTab; window.renderHustleTab = function () { _oH(); paintMonBg('linear-gradient(135deg,rgba(18,12,34,0.62) 0%,rgba(7,7,14,0.88) 100%)'); }; }
  if (typeof window.renderStudioTab === 'function') { const _oS = window.renderStudioTab; window.renderStudioTab = function () { _oS(); paintMonBg('radial-gradient(circle at 65% 30%,rgba(44,19,74,0.72),rgba(7,7,12,0.9))'); }; }

  if (typeof Street25DEngine !== 'undefined' && Street25DEngine) {
    Street25DEngine.syncExternalTextures = function () {
      if (!this.scene || typeof THREE === 'undefined') return;
      const bgUrl = AssetImageCache.resolveStageBg();
      if (bgUrl && this.backdropMat && this._loadedBg !== bgUrl) {
        this._loadedBg = bgUrl;
        new THREE.TextureLoader().load(bgUrl, tex => { this.backdropMat.map = tex; this.backdropMat.opacity = 0.86; this.backdropMat.needsUpdate = true; });
      }
      const isDiva = state.profile && state.profile.gender === 'diva', baseUrl = AssetImageCache.resolveBaseSprite(isDiva);
      const pKey = (isDiva ? 'd:' : 'k:') + (baseUrl ? '1' : '0');
      if (baseUrl && !AssetImageCache.isTaintedBase(isDiva) && this.playerSprite && this._loadedPlayer !== pKey) {
        this._loadedPlayer = pKey;
        new THREE.TextureLoader().load(baseUrl, tex => { this.playerSprite.material.map = tex; this.playerSprite.material.needsUpdate = true; this.playerSprite.scale.set(1.48, 2.64, 1); });
      }
    };
    const _oBuild = Street25DEngine.buildZoneScene.bind(Street25DEngine);
    Street25DEngine.buildZoneScene = function (zIdx) {
      if (!_oBuild(zIdx)) return false;
      this.backdropMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, fog: false });
      const bd = new THREE.Mesh(new THREE.PlaneGeometry(28, 15.75), this.backdropMat);
      bd.position.set(0, 5.1, -25.5); this.scene.add(bd);
      this._loadedBg = null; this._loadedPlayer = null; this.syncExternalTextures();
      return true;
    };
  }

  window.refreshOnAssetReady = function () {
    const ae = document.activeElement;
    if (ae && /^(INPUT|TEXTAREA|SELECT)$/.test(ae.tagName)) return;
    const ts = document.getElementById('title-screen');
    if (ts && ts.classList.contains('active')) return renderTitleScreen();
    if (typeof state !== 'undefined' && (!state.created || (typeof isSalonEdit !== 'undefined' && isSalonEdit))) return renderCreator(typeof isSalonEdit !== 'undefined' ? isSalonEdit : false);
    if (typeof Street25DEngine !== 'undefined' && Street25DEngine.running) Street25DEngine.syncExternalTextures();
    if (typeof activeBattle !== 'undefined' && activeBattle) return renderBattleArena();
    if (typeof state !== 'undefined') switchTab(state.currentTab || 'street');
  };

  AssetImageCache.preloadMVP();
  if (typeof window.refreshOnAssetReady === 'function') window.refreshOnAssetReady();
});
