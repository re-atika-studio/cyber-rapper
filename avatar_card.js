/* =========================================================================
   CYBER RAPPER // 0px CROSS-COMPOSITOR & A/B-SIDE 3D HOLO CARD ENGINE v9.1
   3-Image MVP Base Support (king_base_01 / diva_base_01 / bg_street_cypher)
   ========================================================================= */

let _svgSeq = 0;

function getEquippedUpgrades() {
  if (typeof state === 'undefined') return [];
  return Array.isArray(state.equippedUpgrades) ? state.equippedUpgrades : (state.ownedUpgrades || []);
}

function getSideTheme(sideId) {
  const key = sideId || (typeof state !== 'undefined' && state.profile ? state.profile.side : 'a_side');
  return SIDES[key] || SIDES.a_side;
}

function getRivalFilterCSS(styleKey) {
  const map = {
    trap: 'hue-rotate(28deg) saturate(1.22) drop-shadow(0 0 9px rgba(200,255,41,0.55))',
    diva: 'hue-rotate(-18deg) saturate(1.25) drop-shadow(0 0 9px rgba(255,46,147,0.6))',
    boom: 'sepia(0.22) saturate(1.3) drop-shadow(0 0 9px rgba(255,200,59,0.55))',
    assassin_a: 'hue-rotate(155deg) saturate(1.3) drop-shadow(0 0 10px rgba(0,240,255,0.65))',
    assassin_b: 'hue-rotate(-45deg) saturate(1.35) drop-shadow(0 0 10px rgba(255,46,147,0.65))',
    rare_phantom: 'hue-rotate(175deg) contrast(1.1) saturate(1.4) drop-shadow(0 0 12px #00f0ff)',
    rare_smoke: 'sepia(0.35) hue-rotate(-12deg) saturate(1.25) drop-shadow(0 0 12px #ffc83b)',
    rare_noir: 'hue-rotate(255deg) saturate(1.38) drop-shadow(0 0 12px #ff2e93)',
    boss_local: 'hue-rotate(-32deg) contrast(1.08) saturate(1.35) drop-shadow(0 0 13px #ff3358)',
    boss_queen: 'hue-rotate(295deg) brightness(1.05) saturate(1.35) drop-shadow(0 0 13px #ffc83b)',
    boss_dub: 'hue-rotate(88deg) contrast(1.08) saturate(1.3) drop-shadow(0 0 13px #22c55e)'
  };
  return map[styleKey] || 'drop-shadow(0 0 9px rgba(255,51,88,0.55))';
}

/* --- 1. Wildstyle Graffiti Tagging Start Logo SVG --- */
function renderTaggingLogoSVG() {
  return `
  <svg class="tagging-svg" viewBox="0 0 420 205" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="tagCyan" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#ffffff"/><stop offset="45%" stop-color="#00f0ff"/><stop offset="100%" stop-color="#3b82f6"/>
      </linearGradient>
      <linearGradient id="tagLime" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#ffffff"/><stop offset="40%" stop-color="#c8ff29"/><stop offset="100%" stop-color="#ff2e93"/>
      </linearGradient>
    </defs>
    <circle cx="64" cy="54" r="26" fill="#ff2e93" opacity="0.24"/>
    <circle cx="352" cy="124" r="34" fill="#00f0ff" opacity="0.2"/>
    <path d="M182 38 L176 18 L195 29 L210 13 L225 29 L244 18 L238 38 Z" fill="none" stroke="#ffc83b" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M28 162 Q210 142 392 154 L364 168 Q205 158 58 176 Z" fill="#ff2e93"/>
    <path d="M88 162 L88 190 M146 156 L146 194 M274 154 L274 188 M336 157 L336 184" stroke="#ff2e93" stroke-width="4.5" stroke-linecap="round"/>
    <g transform="rotate(-5 210 102)">
      <text x="214" y="94" text-anchor="middle" font-family="Impact, 'Arial Black', sans-serif" font-weight="900" font-style="italic" font-size="62" letter-spacing="4" fill="#050508" stroke="#050508" stroke-width="14">CYBER</text>
      <text x="208" y="88" text-anchor="middle" font-family="Impact, 'Arial Black', sans-serif" font-weight="900" font-style="italic" font-size="62" letter-spacing="4" fill="url(#tagCyan)" stroke="#050508" stroke-width="3">CYBER</text>
      <text x="216" y="152" text-anchor="middle" font-family="Impact, 'Arial Black', sans-serif" font-weight="900" font-style="italic" font-size="66" letter-spacing="3" fill="#050508" stroke="#050508" stroke-width="15">RAPPER</text>
      <text x="210" y="146" text-anchor="middle" font-family="Impact, 'Arial Black', sans-serif" font-weight="900" font-style="italic" font-size="66" letter-spacing="3" fill="url(#tagLime)" stroke="#050508" stroke-width="3">RAPPER</text>
    </g>
    <text x="210" y="198" text-anchor="middle" font-family="monospace" font-weight="900" font-size="10.5" letter-spacing="3" fill="#f6f7fb">💿 A-SIDE vs 📼 B-SIDE // VER 9.1 MVP</text>
  </svg>`;
}

/* --- 2. Hybrid 0px Cross-Compositor (Split PNG -> Base PNG -> SVG Fallback) --- */
function renderAvatarSVG(p, customGlow, overrides) {
  const ov = overrides || {};
  const sideObj = getSideTheme(p.side);
  const glow = customGlow || (typeof getImplantGlow === 'function' ? getImplantGlow() : sideObj.color);
  const uid = 'av' + (++_svgSeq % 9999);
  const isDiva = p.gender === 'diva';

  const cam = ov.camera || (ov.transparentBg ? 'sprite' : 'card');
  const vb = cam === 'eyes' ? '0 0 420 160' : cam === 'bust' ? '0 10 420 342' : cam === 'sprite' ? '45 12 330 438' : '0 8 420 482';
  const par = cam === 'bust' || cam === 'eyes' ? 'xMidYMin meet' : cam === 'sprite' ? 'xMidYMax meet' : 'xMidYMin slice';

  const activeOutfitId = ov.outfitId || p.outfitId || 'init_hoodie';
  const activeRoomLv = ov.roomLv !== undefined ? ov.roomLv : (p.roomLv || 0);
  const eqUps = ov.upgrades || getEquippedUpgrades();
  const out = findOutfitById(activeOutfitId);
  const cypherBg = !ov.transparentBg ? AssetImageCache.resolveStageBg() : null;

  let bgSvg = '';
  if (!ov.transparentBg) {
    if (activeRoomLv === 0) {
      bgSvg = `<rect x="-150" y="0" width="720" height="500" fill="url(#bg0_${uid})"/>
        ${cypherBg ? `<image href="${cypherBg}" x="-180" y="0" width="780" height="500" preserveAspectRatio="xMidYMid slice" opacity="0.56"/>` : `<rect x="8" y="34" width="114" height="168" rx="4" fill="#0b1322" stroke="#22293e" stroke-width="3.5"/>`}
        <circle cx="210" cy="195" r="118" fill="${glow}" opacity="0.2" filter="url(#blur_${uid})"/>
        <polygon points="348,48 160,440 480,440" fill="url(#cone_${uid})" opacity="0.16"/>`;
    } else if (activeRoomLv === 1) {
      bgSvg = `<rect x="-150" y="0" width="720" height="500" fill="url(#bg1_${uid})"/>
        <rect x="18" y="26" width="6" height="290" rx="3" fill="${glow}"/><rect x="396" y="26" width="6" height="290" rx="3" fill="${sideObj.sub}"/>
        <circle cx="210" cy="160" r="115" fill="${glow}" opacity="0.18" filter="url(#blur_${uid})"/>`;
    } else {
      bgSvg = `<rect x="-150" y="0" width="720" height="500" fill="url(#bg2_${uid})"/>
        <rect x="36" y="68" width="58" height="390" fill="#080e22"/><rect x="326" y="54" width="64" height="400" fill="#070c1d"/>
        <circle cx="358" cy="138" r="34" fill="${sideObj.color}" opacity="0.3" filter="url(#blur_${uid})"/>`;
    }
  }

  const commonDefs = `<filter id="blur_${uid}"><feGaussianBlur stdDeviation="14"/></filter>
    <linearGradient id="bg0_${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0b0c16"/><stop offset="100%" stop-color="#191324"/></linearGradient>
    <linearGradient id="bg1_${uid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#080714"/><stop offset="100%" stop-color="#181033"/></linearGradient>
    <linearGradient id="bg2_${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#040613"/><stop offset="100%" stop-color="#221138"/></linearGradient>
    <linearGradient id="cone_${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fef08a"/><stop offset="100%" stop-color="transparent"/></linearGradient>`;

  /* Tier 1: Split 0px Head + Torso Layers */
  const headPng = AssetImageCache.resolve(`${isDiva ? 'diva' : 'king'}_head_${p.hairType || 0}.png`);
  const bodyPng = AssetImageCache.resolve(`${isDiva ? 'diva' : 'king'}_outfit_${activeOutfitId}.png`);
  if (headPng && bodyPng) {
    const hueDeg = Number(p.hairHue || 0);
    return `<svg viewBox="${vb}" width="100%" height="100%" preserveAspectRatio="${par}" xmlns="http://www.w3.org/2000/svg">
      <defs>${commonDefs}</defs>${bgSvg}
      <image href="${bodyPng}" x="0" y="0" width="420" height="490"/>
      <image href="${headPng}" x="0" y="0" width="420" height="490" style="filter:hue-rotate(${hueDeg}deg);"/>
    </svg>`;
  }

  /* Tier 2: 3-Image MVP Full-Body Base Sprite (diva_base_01.png / king_base_01.png, 1536x2752 = 9:16) */
  const basePng = AssetImageCache.resolveBaseSprite(isDiva);
  if (basePng) {
    const tainted = AssetImageCache.isTaintedBase(isDiva);
    const keyDef = tainted ? `<filter id="tkey_${uid}" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  18 18 18 -0.85 0"/></filter>` : '';
    const fBox = cam === 'eyes' ? { x: -70, y: -42, w: 560, h: 1003 }
      : cam === 'bust' ? { x: 15, y: -12, w: 390, h: 699 }
      : cam === 'sprite' ? { x: 92, y: 14, w: 236, h: 423 }
      : { x: 28, y: 6, w: 364, h: 652 };
    const rimCss = ov.rivalFilter || `drop-shadow(0 0 9px ${out.accent || glow}88)`;
    return `<svg viewBox="${vb}" width="100%" height="100%" preserveAspectRatio="${par}" xmlns="http://www.w3.org/2000/svg">
      <defs>${commonDefs}${keyDef}</defs>${bgSvg}
      <g style="filter:${rimCss};">
        <image href="${basePng}" x="${fBox.x}" y="${fBox.y}" width="${fBox.w}" height="${fBox.h}" preserveAspectRatio="xMidYMin meet" ${tainted ? `filter="url(#tkey_${uid})"` : ''}/>
      </g>
    </svg>`;
  }

  /* Tier 3: Zero-Asset Procedural Cel-Shaded SVG Fallback */
  const skins = [
    { base: '#ffede4', blush: '#ff9eb5', shd1: '#f0bfa8', shd2: '#bf7c63', line: '#45221d' },
    { base: '#f8d3bc', blush: '#f48a9e', shd1: '#e0a585', shd2: '#aa6848', line: '#3e1e18' },
    { base: '#e2a87f', blush: '#d96b78', shd1: '#c17f53', shd2: '#8a4e29', line: '#33170f' },
    { base: '#b0724a', blush: '#a34852', shd1: '#8c512d', shd2: '#592d13', line: '#241008' }
  ];
  const sk = skins[p.skinTone] || skins[0], props = Array.isArray(p.props) ? p.props : [];
  const hairBase = p.hairColor || '#f1f5f9', hairDark = shadeHex(hairBase, -72), hairLight = shadeHex(hairBase, 52);
  const meshCol = p.meshColor || p.accentColor || sideObj.color, acc = p.accentColor || sideObj.color;
  const clothBase = out.color || '#2b2e42', clothDark = shadeHex(clothBase, -46), clothLight = shadeHex(clothBase, 38);
  const hasChain = eqUps.includes('chain_silver'), hasGrillz = eqUps.includes('grillz_gold');
  const facePath = isDiva
    ? 'M152 122 C152 156, 162 184, 182 201 Q198 214, 210 215 Q222 214, 238 201 C258 184, 268 156, 268 122 C268 78, 244 64, 210 64 C176 64, 152 78, 152 122 Z'
    : 'M148 122 C148 158, 158 186, 178 204 Q196 218, 210 219 Q224 218, 242 204 C262 186, 272 158, 272 122 C272 76, 246 62, 210 62 C174 62, 148 76, 148 122 Z';
  const mId = p.mouthType || 0;
  const mouthSvg = hasGrillz
    ? `<path d="M192 183 Q210 179 228 183 Q224 194 210 195 Q196 194 192 183 Z" fill="#09090e" stroke="${sk.line}" stroke-width="1.5"/><path d="M195 184 L225 184 L222 190 L198 190 Z" fill="#ffc83b"/>`
    : mId === 2
    ? `<path d="M194 182 Q210 179 226 182 Q222 195 210 196 Q198 195 194 182 Z" fill="#7f1d1d" stroke="${sk.line}" stroke-width="1.6"/><polygon points="217,182 222,182 219.5,188" fill="#ffffff"/>`
    : isDiva || mId === 1
    ? `<path d="M195 184 Q210 180 225 184 Q218 192 210 192 Q202 192 195 184 Z" fill="${isDiva ? '#fb377f' : sk.shd2}"/>${mId === 3 ? `<circle cx="222" cy="189" r="3.2" fill="none" stroke="#f8fafc" stroke-width="1.6"/>` : ''}`
    : `<path d="M194 185 Q210 189 227 181" fill="none" stroke="${sk.line}" stroke-width="2.2" stroke-linecap="round"/>${mId === 3 ? `<circle cx="223" cy="186" r="3.2" fill="none" stroke="#f8fafc" stroke-width="1.6"/>` : ''}`;
  const propsSvg = `${props.includes('pierce') ? `<circle cx="145" cy="158" r="4.2" fill="none" stroke="#f8fafc" stroke-width="2"/><circle cx="275" cy="158" r="4.2" fill="none" stroke="#f8fafc" stroke-width="2"/>` : ''}
    ${props.includes('dark_circles') ? `<path d="M158 151 Q174 156 190 150 M230 150 Q246 156 262 151" fill="none" stroke="${sk.shd2}" stroke-width="2" opacity="0.65"/>` : ''}
    ${props.includes('brow_slit') ? `<line x1="254" y1="114" x2="251" y2="125" stroke="${sk.base}" stroke-width="3"/><path d="M242 162 L258 170" stroke="#9f1239" stroke-width="1.8" opacity="0.75"/>` : ''}
    ${props.includes('bandage') ? `<rect x="197" y="152" width="26" height="9" rx="2.5" fill="#fef2f2" stroke="#cbd5e1" stroke-width="1.2" transform="rotate(-6 210 156)"/>` : ''}
    ${props.includes('neck_tattoo') ? `<g opacity="0.78" fill="#1e1b2e"><rect x="184" y="224" width="2.5" height="16"/><rect x="189" y="224" width="4" height="16"/><rect x="195" y="224" width="2" height="16"/></g>` : ''}
    ${props.includes('crown_tear') ? `<path d="M250 156 L247 164 L253 164 Z" fill="${acc}"/><path d="M162 156 L160 150 L165 153 L168 149 L171 153 L176 150 L174 156 Z" fill="#ffc83b"/>` : ''}
    ${props.includes('cyber_seam') ? `<path d="M153 160 L174 166 L180 184 M267 160 L246 166 L240 184" fill="none" stroke="${glow}" stroke-width="2"/>` : ''}`;
  const hairLayers = buildAnimeHairLayers(isDiva, p.hairType || 0, uid, meshCol);
  const eyesSvg = buildAnimeEyesLayer(isDiva, p.eyesType || 0, uid, acc, meshCol, hairDark);
  const outfitSvg = buildAnimeOutfitLayer(isDiva, out, uid, glow);
  const chainSvg = hasChain ? `<path d="M164 256 Q210 312 256 256" fill="none" stroke="#ffffff" stroke-width="7.5" stroke-dasharray="7 3" stroke-linecap="round"/><circle cx="210" cy="292" r="6" fill="${glow}" stroke="#ffffff" stroke-width="2.2"/>` : '';
  const hueFilter = p.hairHue ? `style="filter:hue-rotate(${p.hairHue}deg);"` : '';

  return `<svg viewBox="${vb}" width="100%" height="100%" preserveAspectRatio="${par}" xmlns="http://www.w3.org/2000/svg">
    <defs>${commonDefs}
      <linearGradient id="skin_${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${sk.base}"/><stop offset="75%" stop-color="${sk.base}"/><stop offset="100%" stop-color="${sk.shd1}"/></linearGradient>
      <linearGradient id="hair_${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${hairLight}"/><stop offset="38%" stop-color="${hairBase}"/><stop offset="100%" stop-color="${hairDark}"/></linearGradient>
      <linearGradient id="hairDarkG_${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${hairBase}"/><stop offset="100%" stop-color="${hairDark}"/></linearGradient>
      <linearGradient id="cloth_${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${clothLight}"/><stop offset="28%" stop-color="${clothBase}"/><stop offset="100%" stop-color="${clothDark}"/></linearGradient>
      <linearGradient id="irisL_${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0f172a"/><stop offset="52%" stop-color="${acc}"/><stop offset="100%" stop-color="#ffffff"/></linearGradient>
      <linearGradient id="irisR_${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0f172a"/><stop offset="52%" stop-color="#ffc83b"/><stop offset="100%" stop-color="#ffffff"/></linearGradient>
    </defs>
    ${bgSvg}
    <g ${hueFilter}>${hairLayers.back}</g>
    <path d="M180 198 L170 272 L250 272 L240 198 Z" fill="url(#skin_${uid})" stroke="${sk.line}" stroke-width="2"/>
    <path d="M180 202 Q210 236 240 202 L240 218 Q210 246 178 218 Z" fill="${sk.shd2}" opacity="0.68"/>
    <circle cx="232" cy="236" r="5.5" fill="#070810" stroke="${glow}" stroke-width="2.2"/><circle cx="232" cy="236" r="2" fill="#ffffff"/>
    <path d="M152 134 C139 132, 138 158, 153 164 Z M268 134 C281 132, 282 158, 267 164 Z" fill="${sk.shd1}" stroke="${sk.line}" stroke-width="1.8"/>
    <path d="${facePath}" fill="url(#skin_${uid})" stroke="${sk.line}" stroke-width="2.2"/>
    <ellipse cx="168" cy="160" rx="14" ry="7" fill="${sk.blush}" opacity="${isDiva ? '0.32' : '0.14'}"/>
    <ellipse cx="252" cy="160" rx="14" ry="7" fill="${sk.blush}" opacity="${isDiva ? '0.32' : '0.14'}"/>
    <path d="M210 140 L206 164 L213 167" fill="none" stroke="${sk.shd2}" stroke-width="2" stroke-linecap="round"/>
    <path d="M267 126 C266 158, 256 184, 238 200" fill="none" stroke="${glow}" stroke-width="2.6" opacity="0.85"/>
    ${eyesSvg}${mouthSvg}${propsSvg}
    <g ${hueFilter}>${hairLayers.front}</g>${outfitSvg}${chainSvg}
  </svg>`;
}

function renderRivalSVG(styleKey) {
  const presets = {
    trap: { side: 'b_side', gender: 'king', skinTone: 2, hairType: 3, hairColor: '#14141f', meshColor: '#c8ff29', accentColor: '#c8ff29', eyesType: 4, outfitId: 'ec_heavy_hoodie', props: ['brow_slit'] },
    diva: { side: 'a_side', gender: 'diva', skinTone: 0, hairType: 3, hairColor: '#ff2e93', meshColor: '#00f0ff', accentColor: '#00f0ff', eyesType: 2, outfitId: 'ec_mohair', props: ['pierce'] },
    boom: { side: 'a_side', gender: 'king', skinTone: 3, hairType: 1, hairColor: '#ffc83b', meshColor: '#ef4444', accentColor: '#ffc83b', eyesType: 3, outfitId: 'ec_track', props: ['bandage'] },
    assassin_a: { side: 'a_side', gender: 'king', skinTone: 1, hairType: 4, hairColor: '#f1f5f9', meshColor: '#00f0ff', accentColor: '#00f0ff', eyesType: 0, outfitId: 'ec_cyber_jkt', props: ['pierce'] },
    assassin_b: { side: 'b_side', gender: 'diva', skinTone: 1, hairType: 6, hairColor: '#14141f', meshColor: '#ff2e93', accentColor: '#ff2e93', eyesType: 2, outfitId: 'job_open_shirt', props: ['cyber_seam'] },
    rare_phantom: { side: 'b_side', gender: 'king', skinTone: 0, hairType: 6, hairColor: '#f1f5f9', meshColor: '#00f0ff', accentColor: '#00f0ff', eyesType: 6, outfitId: 'ec_cyber_jkt', props: ['cyber_seam'] },
    rare_smoke: { side: 'a_side', gender: 'king', skinTone: 3, hairType: 5, hairColor: '#14141f', meshColor: '#ffc83b', accentColor: '#ffc83b', eyesType: 3, outfitId: 'job_ssr_trench', props: ['neck_tattoo'] },
    rare_noir: { side: 'b_side', gender: 'diva', skinTone: 0, hairType: 7, hairColor: '#8b5cf6', meshColor: '#ff2e93', accentColor: '#ff2e93', eyesType: 5, outfitId: 'job_ssr_velvet', props: ['crown_tear'] },
    boss_local: { side: 'b_side', gender: 'king', skinTone: 2, hairType: 7, hairColor: '#ef4444', meshColor: '#14141f', accentColor: '#ff3358', eyesType: 0, outfitId: 'ec_cyber_jkt', props: ['brow_slit'] },
    boss_queen: { side: 'a_side', gender: 'diva', skinTone: 0, hairType: 7, hairColor: '#f8fafc', meshColor: '#ff2e93', accentColor: '#ff2e93', eyesType: 5, outfitId: 'ec_fur_coat', props: ['crown_tear', 'pierce'] },
    boss_dub: { side: 'b_side', gender: 'king', skinTone: 3, hairType: 6, hairColor: '#14141f', meshColor: '#c8ff29', accentColor: '#22c55e', eyesType: 6, outfitId: 'ec_fur_coat', props: ['neck_tattoo'] }
  };
  const rp = presets[styleKey] || presets.trap;
  return renderAvatarSVG(rp, rp.accentColor, { transparentBg: true, camera: 'sprite', upgrades: ['chain_silver'], rivalFilter: getRivalFilterCSS(styleKey) });
}

function triggerSlashCutIn(tagWord, subText, accentHex) {
  const sideObj = getSideTheme(), color = accentHex || sideObj.sub;
  const shell = document.getElementById('app-shell'), cut = document.getElementById('cutin-layer'), fx = document.getElementById('fx-layer');
  if (!cut || !shell) return;
  const isDiva = state.profile && state.profile.gender === 'diva';
  const cutinBanner = AssetImageCache.resolve(isDiva ? 'cutin_eyes_diva.png' : 'cutin_eyes_king.png');

  shell.classList.remove('shake-hit'); void shell.offsetWidth; shell.classList.add('shake-hit');
  cut.style.borderTopColor = sideObj.sub;
  cut.style.borderBottomColor = sideObj.color;
  cut.innerHTML = `
    ${cutinBanner ? `<img src="${cutinBanner}" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.42;z-index:1;">` : ''}
    <div style="z-index:2;">
      <div style="font-size:10px;font-weight:900;letter-spacing:0.16em;color:#fff;">${sideObj.badge} // ${escapeHtml(subText || 'PUNCHLINE')}</div>
      <div style="font-family:Impact,'Arial Black',sans-serif;font-size:31px;font-style:italic;font-weight:900;color:${color};text-shadow:4px 4px 0 #050508;">${escapeHtml(tagWord)}</div>
    </div>
    <div style="width:142px;height:136px;transform:scale(1.26);z-index:2;">${renderAvatarSVG(state.profile, color, { transparentBg: true, camera: 'bust' })}</div>`;

  cut.classList.remove('play'); void cut.offsetWidth; cut.classList.add('play');
  setTimeout(() => cut.classList.remove('play'), 960);

  if (fx) {
    fx.innerHTML = '';
    for (let i = 0; i < 16; i++) {
      const sp = document.createElement('div'); sp.className = 'fx-spark';
      const ang = (Math.PI * 2 * i) / 16, dist = 70 + Math.random() * 110;
      sp.style.left = '50%'; sp.style.top = '34%';
      sp.style.background = i % 2 === 0 ? color : sideObj.color;
      sp.style.setProperty('--tx', `${Math.cos(ang) * dist}px`);
      sp.style.setProperty('--ty', `${Math.sin(ang) * dist}px`);
      fx.appendChild(sp);
    }
  }
}

function buildArtistCardHTML(opts) {
  const o = opts || {}, p = o.profile || state.profile, sideObj = getSideTheme(p.side);
  const pref = PREFECTURES[p.prefIndex] || PREFECTURES[0];
  const ageObj = AGE_TIERS.find(a => a.id === p.ageTier) || AGE_TIERS[0];
  const st = o.stats || state.stats || { lyric: 10, flow: 10, vibes: 10 };
  const camMode = o.isCreator ? 'bust' : 'card';
  const careerBadge = o.isLegend ? '👑 HALL OF FAME LEGEND' : state.growClass ? `⚡ GROW: ${state.growClass.toUpperCase()}` : p.hasQuitJob ? '🔥 FULL-TIME MC' : (p.currentJobId ? '💼 HUSTLING' : '🕶️ STREET ROOKIE');

  return `
  <div class="artist-card-perspective" style="margin-bottom:${o.isCreator ? '4px' : '8px'};">
    <div class="artist-card ${o.isCreator ? 'creator-compact' : ''}" style="--card-glow:${sideObj.color};border-color:${sideObj.color};">
      <div class="card-art-bleed" id="card-art-slot">${renderAvatarSVG(p, sideObj.color, { camera: camMode })}</div>
      <div class="card-masthead">${sideObj.short}</div>
      <div class="holo-foil-layer"></div>
      <div class="card-top-badges">
        <span class="badge-tag" style="border-color:${sideObj.color};color:${sideObj.color};">${sideObj.badge} // ${ageObj.label}</span>
        <span class="badge-tag" style="color:${sideObj.sub};">REP: ${pref.label}</span>
      </div>
      <div class="card-glass-footer" style="${o.isCreator ? 'padding:14px 12px 6px;' : ''}">
        <div style="display:flex;justify-content:space-between;align-items:baseline;">
          <span class="card-mc-name" id="card-mc-label" style="${o.isCreator ? 'font-size:17px;' : ''}">${escapeHtml(p.artistName)}</span>
          <span style="font-family:monospace;font-size:9px;color:${sideObj.sub};font-weight:900;">LV.${o.level || state.level || 1} ${careerBadge}</span>
        </div>
        ${!o.isCreator ? `
        <div style="display:flex;gap:8px;font-family:monospace;font-size:9.5px;color:#cbd5e1;margin-top:3px;">
          <span>LYR:${st.lyric}</span><span>FLW:${st.flow}</span><span>VIB:${st.vibes}</span>
          <span style="margin-left:auto;color:${sideObj.color};">♪ ${getEquippedRootLabel()}</span>
        </div>
        <div class="card-metrics-strip">
          <div class="metric-box"><span class="k">ASSETS</span><span class="v" style="color:var(--accent-lime);">¥${(o.cash ?? state.cash).toLocaleString()}</span></div>
          <div class="metric-box"><span class="k">DRIP</span><span class="v">¥${(o.drip ?? getDripValue()).toLocaleString()}</span></div>
          <div class="metric-box"><span class="k">RESPECT</span><span class="v" style="color:var(--accent-purple);">${o.respect ?? state.respect}</span></div>
        </div>` : ''}
      </div>
    </div>
  </div>`;
}

function attachCard3DTilt() {
  const card = document.querySelector('.artist-card'); if (!card) return;
  const move = (cx, cy) => {
    const r = card.getBoundingClientRect();
    const px = Math.max(0, Math.min(1, (cx - r.left) / r.width)), py = Math.max(0, Math.min(1, (cy - r.top) / r.height));
    card.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`); card.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
    card.style.setProperty('--ry', `${((px - 0.5) * 15).toFixed(2)}deg`); card.style.setProperty('--rx', `${((0.5 - py) * 12).toFixed(2)}deg`);
  };
  card.onmousemove = e => move(e.clientX, e.clientY);
  card.ontouchmove = e => { if (e.touches[0]) move(e.touches[0].clientX, e.touches[0].clientY); };
  card.onmouseleave = () => { card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg'); };
  card.ontouchend = card.onmouseleave;
}

function exportArtistCardPNG() {
  const canvas = document.getElementById('export-canvas'), ctx = canvas.getContext('2d');
  const p = state.profile, sideObj = getSideTheme(p.side), isDiva = p.gender === 'diva';
  const pref = PREFECTURES[p.prefIndex] || PREFECTURES[0];
  const ageObj = AGE_TIERS.find(a => a.id === p.ageTier) || AGE_TIERS[0];
  const st = state.stats || { lyric: 10, flow: 10, vibes: 10 };

  const finalizeCardOverlay = () => {
    const grad = ctx.createLinearGradient(0, 560, 0, 1040);
    grad.addColorStop(0, 'rgba(5,5,10,0)'); grad.addColorStop(0.55, 'rgba(5,5,10,0.92)'); grad.addColorStop(1, '#05050a');
    ctx.fillStyle = grad; ctx.fillRect(0, 560, 840, 620);
    ctx.fillStyle = sideObj.color; ctx.font = '900 24px monospace';
    ctx.fillText(`${sideObj.short} // ${ageObj.label} // REP:${pref.label} // LV.${state.level || 1}`, 48, 820);
    ctx.fillStyle = '#ffffff'; ctx.font = '900 70px sans-serif';
    ctx.fillText(p.artistName.toUpperCase(), 48, 905);
    ctx.fillStyle = sideObj.sub; ctx.font = '800 24px monospace';
    ctx.fillText(`LYR:${st.lyric}  FLW:${st.flow}  VIB:${st.vibes}  //  ROOT:${getEquippedRootLabel()}`, 48, 958);
    ctx.font = '900 30px monospace'; ctx.fillStyle = '#c8ff29';
    ctx.fillText(`ASSETS ¥${state.cash.toLocaleString()}  DRIP ¥${getDripValue().toLocaleString()}  RESPECT ${state.respect}`, 48, 1048);
    ctx.strokeStyle = sideObj.color; ctx.lineWidth = 8; ctx.strokeRect(18, 18, 804, 1144);
    try {
      const a = document.createElement('a'); a.download = `cyber_rapper_${p.artistName}.png`;
      a.href = canvas.toDataURL('image/png'); a.click();
      showToast('📸 A/B刻印入りホロカードPNGを保存しました！');
    } catch (err) {
      showToast('⚠️ ローカルfile://制限のためHTTPサーバー経由でPNG保存できます');
    }
  };

  const baseDraw = AssetImageCache.getDrawable(isDiva ? 'diva_base_01.png' : 'king_base_01.png', true);
  if (baseDraw) {
    ctx.fillStyle = '#05050a'; ctx.fillRect(0, 0, 840, 1180);
    const bgDraw = AssetImageCache.getDrawable('bg_street_cypher.png', false);
    if (bgDraw) { ctx.save(); ctx.globalAlpha = 0.52; ctx.drawImage(bgDraw, -490, 0, 1820, 1020); ctx.restore(); }
    const rg = ctx.createRadialGradient(420, 390, 30, 420, 390, 360);
    rg.addColorStop(0, sideObj.color + '44'); rg.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = rg; ctx.fillRect(0, 0, 840, 1020);
    ctx.drawImage(baseDraw, 60, 14, 720, 1290);
    finalizeCardOverlay();
    return;
  }

  const tempWrap = document.createElement('div');
  tempWrap.innerHTML = renderAvatarSVG(p, sideObj.color, { camera: 'card' });
  const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(tempWrap.querySelector('svg'))], { type: 'image/svg+xml;charset=utf-8' }));
  const img = new Image();
  img.onload = () => {
    ctx.fillStyle = '#05050a'; ctx.fillRect(0, 0, 840, 1180);
    ctx.drawImage(img, 0, 0, 840, 1020);
    URL.revokeObjectURL(url);
    finalizeCardOverlay();
  };
  img.src = url;
}
