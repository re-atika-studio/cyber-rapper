/* CYBER RAPPER // v10.1.1 UNIFIED CORE, MIC ARMORY, SLEEP, PROPS TERMINAL & BOSS VFX */
(function(){
  if(typeof document==='undefined'||document.getElementById('v10-1-css'))return;
  const s=document.createElement('style');s.id='v10-1-css';
  s.textContent=`#cockpit-body.v10-fullscreen-body #stage-view{padding:0!important}@keyframes v10Dock{0%,100%{box-shadow:0 0 10px rgba(0,240,255,.3);border-color:rgba(0,240,255,.45)}50%{box-shadow:0 0 22px rgba(0,240,255,.85);border-color:#00f0ff}}@keyframes v10Burst{0%{opacity:0;transform:scale(.95);filter:brightness(1.6)}16%{opacity:.96;transform:scale(1.02)}70%{opacity:.75;transform:scale(1.08)}100%{opacity:0;transform:scale(1.14)}}.v10-row{display:flex;justify-content:space-between;align-items:center;gap:6px}.v10-g2{display:grid;grid-template-columns:1fr 1fr;gap:6px}.v10-sleep-panel{position:relative;z-index:8;margin-top:auto;width:100%;background:rgba(5,8,18,.8);backdrop-filter:blur(14px);border:1px solid rgba(0,240,255,.45);border-radius:14px;padding:12px;animation:v10Dock 3s infinite}.v10-mic-box{width:40px;height:40px;border-radius:8px;background:radial-gradient(circle,rgba(0,240,255,.2),#030408 76%);border:1px solid rgba(0,240,255,.45);display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0}.v10-mic-box.ssr{background:radial-gradient(circle,rgba(255,200,59,.3),#040408 78%);border-color:#ffc83b;box-shadow:0 0 12px rgba(255,200,59,.5)}.v10-mic-img{width:100%;height:100%;object-fit:contain;mix-blend-mode:screen;display:block}.v10-mic-float{position:absolute;right:10px;bottom:12px;z-index:8;display:flex;align-items:center;gap:6px;background:rgba(5,7,14,.85);border:1px solid rgba(0,240,255,.45);border-radius:10px;padding:4px 8px 4px 4px;pointer-events:none}.v10-mic-float.ssr{border-color:#ffc83b;box-shadow:0 0 12px rgba(255,200,59,.4)}.v10-closet-preview{height:224px!important;flex-shrink:0}.v10-slot-tabs{grid-template-columns:repeat(3,1fr)!important;gap:4px}.v10-slot-tab{flex-direction:row!important;justify-content:center;gap:3px;padding:5px 2px!important;font-size:8.8px!important}.v10-gear-row{gap:8px}.v10-gear-row.ssr-row{border-color:rgba(255,200,59,.65);background:linear-gradient(90deg,rgba(255,200,59,.12),rgba(16,18,30,.94))}.v10-props-term{position:relative;width:100%;height:100%;min-height:540px;background:#040711 center/cover no-repeat;display:flex;align-items:center;justify-content:center;padding:12px;overflow:hidden}.v10-props-core{position:relative;z-index:4;width:92%;max-width:386px;height:92%;max-height:680px;background:rgba(4,8,18,.84);backdrop-filter:blur(11px);border:1.5px solid rgba(0,240,255,.52);border-radius:13px;box-shadow:0 0 28px rgba(0,240,255,.2);display:flex;flex-direction:column;padding:10px;overflow:hidden}.v10-props-list{flex:1;min-height:0;overflow-y:auto;display:flex;flex-direction:column;gap:6px}.v10-street-fullscreen{background:center/cover no-repeat}#three-street-mount{position:absolute;inset:0;width:100%;height:100%;z-index:1;pointer-events:none}.v10-burst-ov{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;mix-blend-mode:screen;pointer-events:none;z-index:148;animation:v10Burst 1.05s ease-out forwards}.v10-burst-st{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;mix-blend-mode:screen;z-index:10;pointer-events:none;opacity:.88}`;
  document.head.appendChild(s);
})();

const V10_INH_KEY='cyber_rapper_v10_inherited',V10_AREA_BGS={LOCAL:'bg_street_park.jpg',METRO:'bg_metro_station.jpg',PORT:'bg_port_container.jpg'};
const FASHION_8_SLOTS=[
  {key:'hair',ico:'💇',label:'髪型・素体'},{key:'mic',ico:'🎤',label:'マイク武器'},{key:'cap',ico:'🧢',label:'キャップ'},
  {key:'sunglasses',ico:'🕶️',label:'サングラス'},{key:'pierce',ico:'✨',label:'ピアス'},{key:'necklace',ico:'⛓️',label:'ネックレス'},
  {key:'tops',ico:'🧥',label:'トップス'},{key:'bottoms',ico:'👖',label:'ボトムス'},{key:'shoes',ico:'👟',label:'シューズ'}
];
const GEAR_8_CATALOG={
  mic:[
    {id:'mic_starter',name:'定番ダイナミックマイク',price:0,drip:6000,rarity:'N',lyric:2,flow:2,vibes:0,sense:0,dmgMult:1.05,streamMult:1.05,cashMult:1,desc:'初期支給マイク（威力+5% / 再生+5%）'},
    {id:'wpn_mic_sonic_02',name:'指向性ソニックブラスター・マイク',img:'wpn_mic_sonic_02.png',price:68000,drip:88000,rarity:'SR',lyric:8,flow:10,vibes:4,sense:6,dmgMult:1.24,streamMult:1.2,cashMult:1.12,desc:'LYR+8/FLW+10/SNS+6・威力+24%・再生+20%'},
    {id:'wpn_mic_legend_drop',name:'【SSR継承】黄金共鳴レジェンドマイク',img:'wpn_mic_legend_drop.png',price:0,dropOnly:true,drip:240000,rarity:'SSR',resonance:true,lyric:18,flow:16,vibes:14,sense:16,dmgMult:1.48,streamMult:1.45,cashMult:1.28,desc:'レジェンドBOSS撃破のレア継承報酬。SSR黄金共鳴で全能力覚醒・威力+48%・HP共鳴回復'}
  ],
  cap:[{id:'cap_none',name:'なし',price:0,drip:0},{id:'cap_jet90',name:'90s ジェットキャップ',price:14000,drip:16000,color:'#111827',accent:'#00f0ff'},{id:'cap_beanie',name:'ストリートビーニー',price:12000,drip:14000,color:'#1e1b4b',accent:'#c8ff29'},{id:'cap_bucket',name:'ネオンバケットハット',price:22000,drip:26000,color:'#18181b',accent:'#ffc83b'}],
  sunglasses:[{id:'sg_none',name:'なし',price:0,drip:0},{id:'sg_tint',name:'アンバーリムレス眼鏡',price:18000,drip:22000,color:'#f59e0b'},{id:'sg_thick',name:'極太黒縁サングラス',price:26000,drip:32000,color:'#09090b'},{id:'sg_visor',name:'サイバーサウンドバイザー',price:42000,drip:54000,color:'#00f0ff'}],
  pierce:[{id:'pc_none',name:'なし',price:0,drip:0},{id:'pc_hoop',name:'シルバーフープピアス',price:9500,drip:12000,color:'#e2e8f0'},{id:'pc_gold24',name:'24K ダイヤピアス',price:34000,drip:45000,color:'#ffc83b'},{id:'pc_cross',name:'ネオンクロスピアス',price:28000,drip:35000,color:'#ff2e93'}],
  necklace:[{id:'nk_none',name:'なし',price:0,drip:0},{id:'nk_silver',name:'極太銀マイアミチェーン',price:38000,drip:48000,color:'#f1f5f9'},{id:'nk_lotus',name:'24K 蓮華メダリオン',price:78000,drip:98000,color:'#ffc83b'},{id:'nk_vinyl',name:'ネオンヴァイナルタグ',price:29000,drip:36000,color:'#00f0ff'}],
  tops:[{id:'init_hoodie',name:'18oz 渋地フーディー',price:0,drip:5000,color:'#27272a',accent:'#00f0ff'},{id:'job_work_jkt',name:'渋染めワークJKT',price:18000,drip:22000,color:'#78472a',accent:'#f59e0b'},{id:'ec_mohair',name:'モヘアカーディガン',price:42000,drip:52000,color:'#581c87',accent:'#ff2e93'},{id:'ec_cyber_jkt',name:'ネオ東京テックJKT',price:96000,drip:128000,color:'#0f172a',accent:'#00f0ff'},{id:'ec_fur_coat',name:'ラグジュアリーファーコート',price:115000,drip:155000,color:'#1e1b2e',accent:'#ffc83b'}],
  bottoms:[{id:'bt_baggy',name:'90s バギーデニム',price:0,drip:4500,color:'#1e293b',accent:'#64748b'},{id:'bt_cargo',name:'テックカーゴパンツ',price:24000,drip:31000,color:'#18181b',accent:'#c8ff29'},{id:'bt_sweat',name:'ヘビースウェット',price:19000,drip:24000,color:'#334155',accent:'#00f0ff'},{id:'bt_leather',name:'マットレザーパンツ',price:54000,drip:70000,color:'#09090b',accent:'#ffc83b'}],
  shoes:[{id:'sh_kicks',name:'ハイカットバッシュ',price:0,drip:4500,color:'#f8fafc',accent:'#ef4444'},{id:'sh_boots',name:'6インチワークブーツ',price:28000,drip:36000,color:'#d97706',accent:'#fef3c7'},{id:'sh_cyber',name:'ネオンソール厚底キックス',price:62000,drip:82000,color:'#0f172a',accent:'#00f0ff'}]
};
const LOADING_TIPS=['多重踏韻と2小節タップで共鳴VFX＆オートスキル発動！','上位マイク装備で出力上昇！レジェンド撃破でSSR黄金共鳴マイクが継承ドロップ！','HOMEの消灯・睡眠モードでHP全快＆集中共鳴バフ獲得！'];
let v10ClosetSlot='hair',v10CameraMode='bust',v10StreetCypher=null,v10SubModal=null,v10TurfFilter='ALL';

function preloadV10AllAssets(){
  if(typeof AssetImageCache==='undefined')return;
  ['king_back_battle.png','diva_back_battle.png','wpn_mic_sonic_02.png','wpn_mic_legend_drop.png'].forEach(f=>AssetImageCache.resolve(f,{cutout:true}));
  ['bg_home_sleep_mode.jpg','bg_neural_chip_terminal.jpg','fx_chemical_sync_burst.png','bg_street_park.jpg','bg_metro_station.jpg','bg_port_container.jpg','bg_territory_turf_map.jpg','bg_studio_booth.jpg','bg_record_shop.jpg','bg_jougen_yaon.jpg'].forEach(f=>AssetImageCache.resolve(f,{cutout:false}));
}
function getV10AreaBgFile(idx,tag){
  if(tag==='RECORD')return 'bg_record_shop.jpg';if(tag==='STUDIO')return 'bg_studio_booth.jpg';if(tag==='JOUGEN')return 'bg_jougen_yaon.jpg';
  const z=(typeof STREET_ZONES!=='undefined'&&STREET_ZONES[idx??state?.areaIndex??0])||{id:'LOCAL'};
  return V10_AREA_BGS[z.id]||'bg_street_park.jpg';
}
function ensureV10State(){
  if(typeof state==='undefined')return;
  state.useLegacyLogoImg=true;if(!state.uiMode)state.uiMode='HOME';
  if(typeof state.statPoints!=='number')state.statPoints=4;
  if(!state.stats)state.stats={lyric:10,flow:10,vibes:10,sense:10};
  if(typeof state.stats.sense!=='number')state.stats.sense=10;
  state.homeSleepMode=!!state.homeSleepMode;state.wellRestedBuff=!!state.wellRestedBuff;
  let inh=[];try{inh=JSON.parse(localStorage.getItem(V10_INH_KEY)||'[]');}catch(e){}
  if(!Array.isArray(state.inheritedGear))state.inheritedGear=[];
  inh.forEach(x=>{if(!state.inheritedGear.includes(x))state.inheritedGear.push(x);});
  const p=state.profile,dm=state.inheritedGear.includes('wpn_mic_legend_drop')?'wpn_mic_legend_drop':'mic_starter';
  if(!p.equip8)p.equip8={mic:dm,cap:'cap_none',sunglasses:'sg_none',pierce:'pc_hoop',necklace:'nk_none',tops:p.outfitId||'init_hoodie',bottoms:'bt_baggy',shoes:'sh_kicks'};
  if(!p.equip8.mic)p.equip8.mic=dm;
  if(!Array.isArray(state.ownedGear8))state.ownedGear8=['mic_starter','cap_none','sg_none','pc_none','pc_hoop','nk_none','init_hoodie','bt_baggy','sh_kicks'];
  if(!state.ownedGear8.includes('mic_starter'))state.ownedGear8.push('mic_starter');
  state.inheritedGear.forEach(x=>{if(!state.ownedGear8.includes(x))state.ownedGear8.push(x);});
  const mh=getPlayerMaxHP();if(typeof state.hp!=='number'||state.hp<=0||state.hp>mh)state.hp=mh;
}
function getEquippedMicWeapon(){ensureV10State();return GEAR_8_CATALOG.mic.find(m=>m.id===(state?.profile?.equip8?.mic||'mic_starter'))||GEAR_8_CATALOG.mic[0];}
function getEffectivePlayerStats(){
  ensureV10State();const b=state.stats,m=getEquippedMicWeapon();
  return{lyric:(b.lyric||10)+(m.lyric||0),flow:(b.flow||10)+(m.flow||0),vibes:(b.vibes||10)+(m.vibes||0),sense:(b.sense||10)+(m.sense||0),dmgMult:(m.dmgMult||1)*(state.wellRestedBuff?1.12:1),streamMult:m.streamMult||1,cashMult:m.cashMult||1,isLegendSSR:!!m.resonance,mic:m};
}
function getPlayerMaxHP(){const lv=state?.level||1,v=state?.stats?.vibes||10,m=GEAR_8_CATALOG.mic.find(x=>x.id===(state?.profile?.equip8?.mic||'mic_starter'))||GEAR_8_CATALOG.mic[0];return 180+lv*38+(v+(m.vibes||0))*15;}
function getGear8DripBonus(){if(!state?.profile?.equip8)return 0;return Object.entries(state.profile.equip8).reduce((s,[k,id])=>s+((GEAR_8_CATALOG[k]||[]).find(x=>x.id===id)?.drip||0),0);}
function renderMicWeaponIconHTML(it,sz=40){
  const m=it||getEquippedMicWeapon();
  if(m.img){const u=AssetImageCache.resolve(m.img,{cutout:true})||('assets/images/'+m.img),t=AssetImageCache.isTaintedSprite&&AssetImageCache.isTaintedSprite(m.img);return `<div class="v10-mic-box ${m.rarity==='SSR'?'ssr':''}" style="width:${sz}px;height:${sz}px;"><img src="${u}" alt="" class="v10-mic-img" style="${t?'filter:url(#tainted-black-key);':''}"></div>`;}
  return `<div class="v10-mic-box" style="width:${sz}px;height:${sz}px;">🎤</div>`;
}
function tryGrantLegendMicDrop(boss,wasJg){
  ensureV10State();if(!boss||(!boss.isLegend&&!wasJg))return false;
  if(state.ownedGear8.includes('wpn_mic_legend_drop')){state.cash+=45000;saveState();return false;}
  if(wasJg||boss.id==='boss_shaka_bros'||(state.defeatedLegends||[]).length>=2||Math.random()<0.72){
    state.ownedGear8.push('wpn_mic_legend_drop');if(!state.inheritedGear.includes('wpn_mic_legend_drop'))state.inheritedGear.push('wpn_mic_legend_drop');
    try{localStorage.setItem(V10_INH_KEY,JSON.stringify(state.inheritedGear));}catch(e){}
    state.profile.equip8.mic='wpn_mic_legend_drop';state.hp=getPlayerMaxHP();saveState();return true;
  }
  return false;
}
function triggerNeuralSyncBurstVFX(){
  const fx=document.getElementById('fx-layer');if(!fx)return;
  const i=document.createElement('img');i.src=AssetImageCache.resolve('fx_chemical_sync_burst.png',{cutout:false})||'assets/images/fx_chemical_sync_burst.png';
  i.className='v10-burst-ov';fx.appendChild(i);setTimeout(()=>{if(i.parentNode)i.remove();},1100);
}
function transitionMode(mode,title,tip,fn){
  ensureV10State();v10SubModal=null;if(typeof Street25DEngine!=='undefined')Street25DEngine.pause();
  let ld=document.getElementById('v10-loading-overlay');
  if(!ld){ld=document.createElement('div');ld.id='v10-loading-overlay';document.getElementById('app-shell').appendChild(ld);}
  ld.innerHTML=`<div class="v10-load-center"><div class="v10-vinyl-disc"><div class="v10-vinyl-core"></div></div><div class="v10-load-mode">${escapeHtml(title||mode)}</div><div class="v10-load-bars"><span></span><span></span><span></span><span></span><span></span></div><div class="v10-load-tip">💡 ${escapeHtml(tip||LOADING_TIPS[Math.floor(Math.random()*LOADING_TIPS.length)])}</div></div>`;
  ld.classList.add('active');
  setTimeout(()=>{state.uiMode=mode;if(typeof fn==='function')fn();else renderV10ActiveMode();setTimeout(()=>ld.classList.remove('active'),160);},650);
}

function renderV10CharacterStageHTML(prof,cam){
  ensureV10State();const p=prof||state.profile,isD=p.gender==='diva',eq=p.equip8||{},full=cam==='full';
  const bUrl=AssetImageCache.resolveBaseSprite(isD,()=>{if(state.created&&!v10SubModal)renderV10ActiveMode();}),taint=AssetImageCache.isTaintedBase(isD);
  const wUrl=!isD&&eq.tops==='job_work_jkt'?AssetImageCache.resolve('king_outfit_work.png',{cutout:true}):null;
  const cap=GEAR_8_CATALOG.cap.find(x=>x.id===eq.cap),sg=GEAR_8_CATALOG.sunglasses.find(x=>x.id===eq.sunglasses),pc=GEAR_8_CATALOG.pierce.find(x=>x.id===eq.pierce),nk=GEAR_8_CATALOG.necklace.find(x=>x.id===eq.necklace);
  const bt=GEAR_8_CATALOG.bottoms.find(x=>x.id===eq.bottoms)||GEAR_8_CATALOG.bottoms[0],sh=GEAR_8_CATALOG.shoes.find(x=>x.id===eq.shoes)||GEAR_8_CATALOG.shoes[0],mic=getEquippedMicWeapon();
  const svg=`<svg viewBox="0 0 300 520" class="v10-gear-svg" preserveAspectRatio="xMidYMid meet">${full?`<g opacity=".92"><path d="M104 335 L92 462 L140 462 L148 365 L156 462 L204 462 L192 335 Z" fill="${bt.color}" stroke="${bt.accent}" stroke-width="2"/><rect x="86" y="460" width="54" height="26" rx="8" fill="${sh.color}" stroke="${sh.accent}" stroke-width="2.5"/><rect x="156" y="460" width="54" height="26" rx="8" fill="${sh.color}" stroke="${sh.accent}" stroke-width="2.5"/></g>`:''}${cap&&cap.id!=='cap_none'?`<path d="M106 68 Q150 36 194 68 L212 76 L98 74 Z" fill="${cap.color}" stroke="${cap.accent}" stroke-width="2.2"/>`:''}${sg&&sg.id!=='sg_none'?`<g><rect x="115" y="96" width="30" height="14" rx="3" fill="${sg.color}" fill-opacity=".78" stroke="#fff" stroke-width="1.4"/><rect x="155" y="96" width="30" height="14" rx="3" fill="${sg.color}" fill-opacity=".78" stroke="#fff" stroke-width="1.4"/><line x1="145" y1="102" x2="155" y2="102" stroke="#fff" stroke-width="1.5"/></g>`:''}${pc&&pc.id!=='pc_none'?`<g><circle cx="107" cy="116" r="4" fill="none" stroke="${pc.color}" stroke-width="2"/><circle cx="193" cy="116" r="4" fill="none" stroke="${pc.color}" stroke-width="2"/></g>`:''}${nk&&nk.id!=='nk_none'?`<g><path d="M124 168 Q150 206 176 168" fill="none" stroke="${nk.color}" stroke-width="4" stroke-dasharray="5 2"/><circle cx="150" cy="192" r="6" fill="${nk.color}"/></g>`:''}</svg>`;
  const mb=mic.img?`<div class="v10-mic-float ${mic.rarity==='SSR'?'ssr':''}">${renderMicWeaponIconHTML(mic,28)}<div style="font-size:8.5px;font-weight:900;color:${mic.rarity==='SSR'?'#ffc83b':'#00f0ff'};">${mic.rarity} x${mic.dmgMult}</div></div>`:'';
  return `<div class="v10-char-frame ${full?'mode-full':'mode-bust'}">${bUrl?`<img src="${bUrl}" alt="" class="v10-char-img" style="${taint?'filter:url(#tainted-black-key);':''}">`:`<div style="width:100%;height:100%;">${renderAvatarSVG(p,getSideTheme(p.side).color,{transparentBg:true,camera:full?'card':'bust'})}</div>`}${wUrl?`<img src="${wUrl}" alt="" class="v10-char-img" style="z-index:3;">`:''}${svg}${mb}</div>`;
}

function renderV10ActiveMode(){
  ensureV10State();v10SubModal=null;
  document.getElementById('topbar')?.style.setProperty('display','none');
  document.getElementById('bottom-nav')?.style.setProperty('display','none');
  document.getElementById('cockpit-body')?.classList.add('v10-fullscreen-body');
  if(!state.created)return renderCreator(false);
  if(typeof activeBossBattle!=='undefined'&&activeBossBattle)return renderV10BossBattle();
  if(typeof activeJobGame!=='undefined'&&activeJobGame)return renderV10JobMinigame();
  if(state.uiMode==='STREET')return renderV10StreetMode();
  if(state.uiMode==='CLOSET')return renderV10ClosetMode(false);
  if(state.uiMode==='STATS')return renderV10StatsMode();
  return renderV10HomeHub();
}

function toggleV10HomeSleepMode(force){
  ensureV10State();state.homeSleepMode=typeof force==='boolean'?force:!state.homeSleepMode;
  if(state.homeSleepMode){AudioEngine.stop();const mh=getPlayerMaxHP(),hl=Math.max(0,mh-(state.hp||mh));state.hp=mh;state.wellRestedBuff=true;if(typeof triggerShutter==='function')triggerShutter();showToast(hl>0?`🌙 消灯・睡眠：HP全回復(+${hl})＆集中共鳴バフ獲得！`:'🌙 消灯・睡眠：充電ドック共鳴完了（次戦+12%）！');}
  else showToast('☀️ 照明ON：活動再開！');
  saveState();renderV10HomeHub();
}
function restDeepInSleepMode(){
  const pr=state.cash;state.hp=getPlayerMaxHP();state.wellRestedBuff=true;if(typeof advanceWorldTime==='function')advanceWorldTime();if(typeof triggerShutter==='function')triggerShutter();
  const df=state.cash-pr;showToast(df>0?`💤 熟睡完了！HP全快＆印税 +¥${df.toLocaleString()} 回収！`:'💤 熟睡完了！HP100%＆集中共鳴バフ充填！');saveState();renderV10HomeHub();
}

function renderV10HomeHub(){
  ensureV10State();const sd=getSideTheme(),mh=getPlayerMaxHP(),sl=state.homeSleepMode,mic=getEquippedMicWeapon();
  const b1=AssetImageCache.resolve('bg_studio_booth.jpg',{cutout:false,onReady:()=>{if(state.uiMode==='HOME'&&!state.homeSleepMode&&!v10SubModal)renderV10HomeHub();}})||'assets/images/bg_studio_booth.jpg';
  const b2=AssetImageCache.resolve('bg_home_sleep_mode.jpg',{cutout:false,onReady:()=>{if(state.uiMode==='HOME'&&state.homeSleepMode&&!v10SubModal)renderV10HomeHub();}})||'assets/images/bg_home_sleep_mode.jpg';
  const job=STREET_JOBS.find(j=>j.id===state.profile.currentJobId)||STREET_JOBS[0];
  const bg=sl?`background-image:linear-gradient(180deg,rgba(4,7,16,.18),rgba(4,6,14,.86)),url('${b2}');`:`background-image:linear-gradient(95deg,rgba(7,8,15,.42),rgba(7,8,15,.9) 64%),url('${b1}');`;
  const top=`<div class="v10-home-top"><div class="v10-glass-pill" onclick="openCardModal()" style="cursor:pointer;"><span style="color:${sd.color};font-weight:900;">${sd.short}</span><span>LV.${state.level}</span><b>${escapeHtml(state.profile.artistName)}</b></div><div class="v10-row"><button class="v10-glass-pill" style="cursor:pointer;border-color:${sl?'#ffc83b':'#00f0ff'};color:${sl?'#ffc83b':'#00f0ff'};" onclick="toggleV10HomeSleepMode()">${sl?'☀️ 点灯':'🌙 消灯・睡眠'}</button><div class="v10-glass-pill"><span style="color:#c8ff29;">¥${state.cash.toLocaleString()}</span><span style="color:#ffc83b;">👑${state.respect}</span><button class="v10-icon-btn" onclick="openSaveModal()">💾</button><button class="v10-icon-btn" onclick="openSysModal()">⚙️</button></div></div></div>`;
  if(sl){
    setCockpitView(`<div class="v10-home-screen" style="${bg}"><div class="rain-layer" style="opacity:.24;"></div>${top}<div class="v10-sleep-panel"><div class="v10-row" style="margin-bottom:4px;"><span style="font-family:monospace;font-size:9.5px;color:#00f0ff;font-weight:900;">🔋 MIC DOCK CHARGING // SLEEP MODE</span><span style="font-family:monospace;font-size:9.5px;color:#c8ff29;">HP ${state.hp}/${mh}</span></div><div style="font-size:11px;color:#e2e8f0;line-height:1.5;margin-bottom:8px;">雨の夜景と充電ドックで青く光る <b>${escapeHtml(mic.name)}</b>。心身とニューラル回路を回復中…<br><span style="color:#00f0ff;font-size:9.5px;font-weight:800;">✨ 集中共鳴バフ有効：次回戦闘＆EXP +12%</span></div><div class="v10-g2"><button class="btn btn-cyan" style="padding:8px;font-size:10.5px;" onclick="restDeepInSleepMode()">💤 一晩眠る（印税回収）</button><button class="btn btn-gold" style="padding:8px;font-size:10.5px;" onclick="toggleV10HomeSleepMode(false)">☀️ 点灯して活動再開</button></div></div></div>`,'');
    return;
  }
  setCockpitView(`<div class="v10-home-screen" style="${bg}">${top}<div class="v10-home-hero">${renderV10CharacterStageHTML(state.profile,v10CameraMode)}<button class="v10-cam-toggle" onclick="v10CameraMode=(v10CameraMode==='bust'?'full':'bust');renderV10HomeHub()">${v10CameraMode==='bust'?'🧍 全身表示':'📷 バスト表示'}</button></div><div class="v10-home-menu"><div class="v10-glass-pill v10-row" style="width:100%;border-radius:10px;"><span style="font-size:9.5px;color:#c8ff29;font-family:monospace;">❤️ HP ${state.hp}/${mh}${state.wellRestedBuff?' [⚡睡眠+12%]':''}</span><span style="font-size:9px;color:#00f0ff;cursor:pointer;" onclick="toggleV10HomeSleepMode(true)">🌙 睡眠 ▸</span></div><button class="v10-slanted-card primary" onclick="transitionMode('STREET','STREET // '+(STREET_ZONES[state.areaIndex]?.id||'LOCAL'))"><div><span class="t">STREET EXPLORE</span><span class="s">街へ出る（${STREET_ZONES[state.areaIndex]?.id||'LOCAL'} 12×12探索）</span></div><span>▸</span></button><button class="v10-slanted-card gold" onclick="startV10JobMinigame('${job.id}')"><div><span class="t">DAY JOB // バイト出勤</span><span class="s">${escapeHtml(job.name)}</span></div><span>▸</span></button><button class="v10-slanted-card" onclick="v10CameraMode='bust';state.uiMode='CLOSET';renderV10ClosetMode(false)"><div><span class="t">CLOSET &amp; MIC ARMORY</span><span class="s">衣装＆マイク武器（Drip ¥${getDripValue().toLocaleString()}）</span></div><span>▸</span></button><button class="v10-slanted-card ${state.statPoints>0?'alert':''}" onclick="state.uiMode='STATS';renderV10StatsMode()"><div><span class="t">STATUS &amp; LEVELING ${state.statPoints>0?`[+${state.statPoints}SP]`:''}</span><span class="s">能力強化・昼職変更</span></div><span>▸</span></button><div class="v10-sub-grid"><button class="v10-mini-card" onclick="openDjMyouHub()">🎧 上弦・BOSS挑戦</button><button class="v10-mini-card" onclick="openV10SubModal('studio')">🎛️ スタジオ収録</button><button class="v10-mini-card" style="border-color:#00f0ff88;color:#00f0ff;" onclick="openV10SubModal('record')">🧠 PROPS TERMINAL</button><button class="v10-mini-card" onclick="openV10SubModal('chart')">🏆 勢力番付・ラボ</button></div></div></div>`,'');
}

function buyOrEquipGear8(slot,id,fromShop){
  ensureV10State();const it=(GEAR_8_CATALOG[slot]||[]).find(x=>x.id===id);if(!it)return;
  if(!state.ownedGear8.includes(id)){
    if(it.dropOnly)return showToast('🔒 レジェンドBOSS撃破のレア継承ドロップ限定SSRマイクです！');
    if(state.cash<it.price)return showToast(`Cash不足（¥${it.price.toLocaleString()}）`);
    state.cash-=it.price;state.ownedGear8.push(id);state.respect+=14;
    if(slot==='mic')triggerSlashCutIn('NEW MIC ARMED!!',it.name,'#00f0ff');
    showToast(`✨ ${it.name} を購入＆装備！`);
  }else showToast(`🎤 ${it.name} を装備！`);
  state.profile.equip8[slot]=id;if(slot==='tops')state.profile.outfitId=id;
  state.hp=getPlayerMaxHP();updateHeader();saveState();
  if(fromShop)renderShopTab();else renderV10ClosetMode(!state.created);
}

function renderV10ClosetMode(isNew){
  ensureV10State();const p=state.profile,isD=p.gender==='diva',vars=isD?PLAYER_BASE_VARIANTS.diva:PLAYER_BASE_VARIANTS.king;
  let h='';
  if(v10ClosetSlot==='hair'){
    h=`<div class="v10-g2" style="margin-bottom:5px;"><button class="btn ${!isD?'btn-cyan':''}" style="padding:6px;" onclick="setGenderStyle('king')">👑 KING</button><button class="btn ${isD?'btn-primary':''}" style="padding:6px;" onclick="setGenderStyle('diva')">💎 DIVA</button></div>${isNew?`<div class="v10-g2" style="margin-bottom:5px;"><button class="btn ${p.side==='a_side'?'btn-cyan':''}" style="padding:5px;font-size:10px;" onclick="state.profile.side='a_side';renderV10ClosetMode(true)">💿 A-SIDE</button><button class="btn ${p.side==='b_side'?'btn-primary':''}" style="padding:5px;font-size:10px;" onclick="state.profile.side='b_side';renderV10ClosetMode(true)">📼 B-SIDE</button></div>`:''}<input type="text" maxlength="14" value="${escapeHtml(p.artistName)}" oninput="state.profile.artistName=this.value.trim()||'MC'" style="margin-bottom:6px;">`+vars.map(v=>`<div class="v10-gear-row ${(p.baseVariant||0)===v.id?'equipped':''}" onclick="state.profile.baseVariant=${v.id};renderV10ClosetMode(${isNew})"><span>💇 ${v.label}</span><span class="st">${(p.baseVariant||0)===v.id?'装備中':'選択'}</span></div>`).join('');
  }else if(v10ClosetSlot==='mic'){
    h=GEAR_8_CATALOG.mic.map(it=>{const own=state.ownedGear8.includes(it.id),eq=p.equip8.mic===it.id;return `<div class="v10-gear-row ${eq?'equipped':''} ${it.rarity==='SSR'?'ssr-row':''}" onclick="buyOrEquipGear8('mic','${it.id}',false)">${renderMicWeaponIconHTML(it,42)}<div style="flex:1;"><div style="font-weight:900;color:${it.rarity==='SSR'?'#ffc83b':'#fff'};">[${it.rarity}] ${escapeHtml(it.name)}</div><div style="font-size:8.8px;color:#cbd5e1;">${escapeHtml(it.desc)}</div></div><span class="st" style="color:${eq?'#c8ff29':it.dropOnly&&!own?'#ffc83b':'#00f0ff'};">${eq?'✓装備中':own?'装備':it.dropOnly?'🔒継承':`¥${it.price.toLocaleString()}`}</span></div>`;}).join('');
  }else{
    h=(GEAR_8_CATALOG[v10ClosetSlot]||[]).map(it=>{const own=isNew&&it.price<=20000?true:state.ownedGear8.includes(it.id),eq=p.equip8[v10ClosetSlot]===it.id;return `<div class="v10-gear-row ${eq?'equipped':''}" onclick="${isNew&&it.price<=20000?`if(!state.ownedGear8.includes('${it.id}'))state.ownedGear8.push('${it.id}');`:''}buyOrEquipGear8('${v10ClosetSlot}','${it.id}',false)"><div><b>${escapeHtml(it.name)}</b><div style="font-size:9px;color:#94a3b8;">DRIP +¥${it.drip.toLocaleString()}</div></div><span class="st">${eq?'✓装備中':own?'所持済':`¥${it.price.toLocaleString()}`}</span></div>`;}).join('');
  }
  setCockpitView(`<div class="v10-closet-layout"><div class="v10-closet-preview"><div class="v10-closet-top"><span class="v10-glass-pill">🧥 CLOSET &amp; MIC // ¥${state.cash.toLocaleString()}</span><button class="v10-cam-toggle static" onclick="v10CameraMode=(v10CameraMode==='bust'?'full':'bust');renderV10ClosetMode(${isNew})">${v10CameraMode==='bust'?'📷➔🧍':'🧍➔📷'}</button></div>${renderV10CharacterStageHTML(p,v10CameraMode)}</div><div><div class="v10-slot-tabs">${FASHION_8_SLOTS.map(s=>`<button class="v10-slot-tab ${v10ClosetSlot===s.key?'active':''}" onclick="v10ClosetSlot='${s.key}';renderV10ClosetMode(${isNew})"><span>${s.ico}</span><span>${s.label}</span></button>`).join('')}</div><div class="v10-gear-list">${h}</div><button class="btn btn-lime" style="margin-top:6px;" onclick="${isNew?'finishV10Creation()':"transitionMode('HOME','HOME BASE')"}">${isNew?'🔥 ストリートへ降り立つ！':'✓ 確定してHOMEへ戻る'}</button></div></div>`,'');
}
function finishV10Creation(){state.created=true;state.hp=getPlayerMaxHP();saveState();transitionMode('HOME','WELCOME TO REBUILT TOKYO');}
function allocateStatPoint(k){ensureV10State();if(state.statPoints<=0)return showToast('SP不足');state.statPoints--;state.stats[k]=(state.stats[k]||10)+2;state.hp=getPlayerMaxHP();saveState();renderV10StatsMode();}

function renderV10StatsMode(){
  ensureV10State();const st=state.stats,ef=getEffectivePlayerStats(),mh=getPlayerMaxHP(),mic=ef.mic;
  const rows=[['lyric','📝 LYRIC',st.lyric,ef.lyric-st.lyric],['flow','🌊 FLOW',st.flow,ef.flow-st.flow],['vibes','🔥 VIBES',st.vibes,ef.vibes-st.vibes],['sense','⚡ SENSE',st.sense,ef.sense-st.sense]];
  setCockpitView(`<div class="v10-subscreen"><div class="v10-sub-header"><span>📈 STATUS // LV.${state.level} (SP:${state.statPoints})</span><button class="btn" style="width:auto;padding:5px 12px;font-size:10px;" onclick="state.uiMode='HOME';renderV10HomeHub()">← HOME</button></div><div class="panel v10-row">${renderMicWeaponIconHTML(mic,40)}<div style="flex:1;"><b style="color:${mic.rarity==='SSR'?'#ffc83b':'#00f0ff'};">${escapeHtml(mic.name)}</b><div style="font-size:9px;color:#cbd5e1;">出力 x${ef.dmgMult.toFixed(2)} / 再生 x${ef.streamMult.toFixed(2)}</div></div><button class="btn btn-cyan" style="width:auto;padding:5px 9px;font-size:9.5px;" onclick="v10ClosetSlot='mic';state.uiMode='CLOSET';renderV10ClosetMode(false)">変更</button></div><div class="panel">${rows.map(([k,t,v,b])=>`<div class="v10-gear-row"><b>${t}: <span style="color:#c8ff29;">${v+b}</span> ${b>0?`<small style="color:#00f0ff;">(+🎤${b})</small>`:''}</b><button class="btn ${state.statPoints>0?'btn-lime':''}" style="width:auto;padding:5px 10px;font-size:10px;" ${state.statPoints<=0?'disabled':''} onclick="allocateStatPoint('${k}')">+2</button></div>`).join('')}</div><div class="panel"><div class="v10-sec-label">💼 昼職シフト</div>${STREET_JOBS.map(j=>`<div class="v10-gear-row ${state.profile.currentJobId===j.id?'equipped':''}" onclick="state.profile.currentJobId='${j.id}';saveState();renderV10StatsMode()"><span>${escapeHtml(j.name)} (¥${j.wage.toLocaleString()})</span><button class="btn btn-gold" style="width:auto;padding:5px 9px;font-size:9.5px;" onclick="event.stopPropagation();startV10JobMinigame('${j.id}')">▶出勤</button></div>`).join('')}</div></div>`,'');
}

function ensureMapState12(){const z=STREET_ZONES[state.areaIndex]||STREET_ZONES[0];if(!state.mapState||state.mapState.areaId!==z.id||state.mapState.gridSize!==12)state.mapState={areaId:z.id,gridSize:12,x:6,y:10,dir:'N',visited:['6,10']};return state.mapState;}
function renderV10StreetMode(){
  ensureV10State();const z=STREET_ZONES[state.areaIndex]||STREET_ZONES[0],ms=ensureMapState12();
  const sp=z.landmarks.find(l=>Math.abs(l.x*2-ms.x)<=1&&Math.abs(l.y*2-ms.y)<=1);
  const bf=v10StreetCypher?'bg_street_cypher.jpg':getV10AreaBgFile(state.areaIndex,sp?.tag);
  const bu=AssetImageCache.resolve(bf,{cutout:false,onReady:()=>{if(state.uiMode==='STREET'&&!v10SubModal)renderV10StreetMode();}})||('assets/images/'+bf);
  let cells='';for(let y=0;y<12;y++)for(let x=0;x<12;x++){const me=x===ms.x&&y===ms.y,lm=z.landmarks.find(l=>l.x*2===x&&l.y*2===y);cells+=`<div style="background:${me?'#c8ff29':lm?lm.color:ms.visited.includes(`${x},${y}`)?'rgba(0,240,255,.28)':'rgba(255,255,255,.06)'};"></div>`;}
  const cy=v10StreetCypher?`<div class="v10-cypher-intrude"><div class="v10-intrude-portrait">${renderRivalSVG(v10StreetCypher.rival.style)}</div><div><div style="font-size:9px;color:#ff2e93;font-weight:900;">⚡ ${escapeHtml(v10StreetCypher.rival.name)}</div><div style="font-size:11px;font-weight:800;">「${escapeHtml(v10StreetCypher.rival.taunt)}」</div><div style="font-size:9px;color:#00f0ff;">🎯 [ …${v10StreetCypher.rival.targetVowel} ]</div></div></div><div class="v10-cypher-bar"><div style="display:flex;gap:5px;margin-bottom:5px;"><input type="text" id="v10-cypher-input" placeholder="1行アンサー"><button class="btn btn-lime" style="width:auto;padding:0 12px;" onclick="resolveV10StreetCypher('free')">SPIT</button></div><div style="display:grid;grid-template-columns:1fr 1fr auto;gap:5px;"><button class="btn btn-cyan" onclick="resolveV10StreetCypher(0)">韻で返す</button><button class="btn" onclick="resolveV10StreetCypher(1)">フロウで返す</button><button class="btn" style="width:auto;" onclick="v10StreetCypher=null;renderV10StreetMode()">✕</button></div></div>`:'';
  setCockpitView(`<div class="v10-street-fullscreen" style="background-image:linear-gradient(180deg,rgba(5,6,14,.25),rgba(5,6,14,.72)),url('${bu}');"><div id="three-street-mount"></div><div class="v10-street-hud-top"><div class="v10-glass-pill"><b style="color:${z.neonA};">${z.id}</b><span>(${ms.x},${ms.y})</span></div><div class="v10-row"><select class="v10-area-select" onchange="Street25DEngine.pause();state.areaIndex=Number(this.value);state.mapState=null;transitionMode('STREET','MOVING TO '+STREET_ZONES[this.value].id)">${STREET_ZONES.map((zn,i)=>`<option value="${i}" ${state.areaIndex===i?'selected':''}>🚇 ${zn.id}</option>`).join('')}</select><button class="v10-glass-pill" style="cursor:pointer;color:#ffc83b;" onclick="transitionMode('HOME','HOME')">🏠 帰宅</button></div></div><div class="v10-radar-12">${cells}</div><div class="v10-street-protagonist">${renderV10CharacterStageHTML(state.profile,'full')}</div>${sp&&!v10StreetCypher?`<div class="v10-spot-popup" style="border-color:${sp.color};"><b style="color:${sp.color};">${sp.ico} ${sp.name}</b><div style="font-size:9.5px;color:#cbd5e1;margin:3px 0 6px;">${sp.desc}</div><button class="btn btn-gold" onclick="${sp.fn}">${sp.act}</button></div>`:''}${cy}${!v10StreetCypher?`<div class="v10-street-controls"><div class="v10-dpad-clean"><button onclick="stepV10Street(0,-1)">▲</button><div style="display:flex;gap:14px;"><button onclick="stepV10Street(-1,0)">◀</button><button onclick="stepV10Street(1,0)">▶</button></div><button onclick="stepV10Street(0,1)">▼</button></div><div class="v10-landmark-strip">${z.landmarks.filter(l=>l.tag!=='HOME').map(lm=>`<button class="v10-spot-chip" onclick="jumpV10Street(${lm.x*2},${lm.y*2})">${lm.ico} ${lm.tag}</button>`).join('')}<button class="v10-spot-chip" style="border-color:#ff2e93;" onclick="spawnSeamlessCypher()">🎤 サイファー</button></div></div>`:''}</div>`,'');
  requestAnimationFrame(()=>{const wp=Street25DEngine.gridToWorld(ms.x,ms.y);Street25DEngine.posX=wp.x;Street25DEngine.posZ=wp.z;Street25DEngine.mountAndResume();});
}
function stepV10Street(dx,dy){const ms=ensureMapState12();ms.x=Math.max(0,Math.min(11,ms.x+dx));ms.y=Math.max(0,Math.min(11,ms.y+dy));if(!ms.visited.includes(`${ms.x},${ms.y}`))ms.visited.push(`${ms.x},${ms.y}`);if(Math.random()<0.22)spawnSeamlessCypher();else{saveState();renderV10StreetMode();}}
function jumpV10Street(tx,ty){const ms=ensureMapState12();ms.x=tx;ms.y=ty;if(!ms.visited.includes(`${tx},${ty}`))ms.visited.push(`${tx},${ty}`);saveState();renderV10StreetMode();}
function spawnSeamlessCypher(){const p=STREET_RIVALS.concat(RARE_RAPPERS);playDjMyouScratchSE();v10StreetCypher={rival:p[Math.floor(Math.random()*p.length)]};renderV10StreetMode();}
function resolveV10StreetCypher(m){
  if(!v10StreetCypher)return;const rv=v10StreetCypher.rival,ef=getEffectivePlayerStats();let w=false,bn=1,rh=false;
  if(m==='free'){const tx=(document.getElementById('v10-cypher-input')?.value||'').trim();if(tx.length<4)return showToast('4文字以上入力');if(LEGAL_NG_WORDS.some(ng=>tx.includes(ng)))return showToast('NGワード');const v=extractVowelsJP(tx);rh=v.includes(rv.targetVowel);w=rh||tx.length>=8;bn=rh?1.55:1.15;state.lyrics.push({id:'lyr_'+Date.now(),text:tx,vowels:v,rank:'S',moneySnap:state.cash});}else w=m===0||state.level>=rv.lv;
  v10StreetCypher=null;if(w){if(rh||ef.isLegendSSR)triggerNeuralSyncBurstVFX();const c=Math.round(rv.rewardCash*bn*ef.cashMult);state.cash+=c;state.respect+=14;if(rv.isRare&&rv.dropRoot)handleRareRootDrop(rv);gainV10Exp(Math.round(rv.exp*1.25));showToast(`🔥 勝利！ +¥${c.toLocaleString()}`);}else gainV10Exp(20);
  saveState();renderV10StreetMode();
}
function gainV10Exp(a){ensureV10State();const g=state.wellRestedBuff?Math.round(a*1.12):a;state.exp=(state.exp||0)+g;state.nextExp=state.nextExp||100;let u=false;while(state.exp>=state.nextExp){state.exp-=state.nextExp;state.level=(state.level||1)+1;state.nextExp=Math.floor(state.nextExp*1.38);state.statPoints=(state.statPoints||0)+5;u=true;}if(u){state.hp=getPlayerMaxHP();triggerSlashCutIn(`LEVEL UP! LV.${state.level}`,'+5 SP!','#ffc83b');}}

function renderPropsTerminalScreen(){
  ensureV10State();document.getElementById('topbar')?.style.setProperty('display','none');document.getElementById('cockpit-body')?.classList.add('v10-fullscreen-body');
  const bg=AssetImageCache.resolve('bg_neural_chip_terminal.jpg',{cutout:false,onReady:()=>{if(v10SubModal==='record')renderPropsTerminalScreen();}})||'assets/images/bg_neural_chip_terminal.jpg';
  const rH=MUSIC_ROOTS.map(r=>{
    if(!state.music.unlockedRoots.includes(r.id))return `<div class="shop-item" style="opacity:.5;border-style:dashed;"><div class="shop-info"><h4>🔒 ${escapeHtml(r.name)}</h4><p>${r.isRare?'レアMC/上弦撃破で獲得':'BOSS撃破で解放'}</p></div></div>`;
    return `<div class="panel" style="margin-bottom:4px;background:rgba(7,12,26,.86);border-color:${r.glow}88;"><div class="v10-row" style="font-size:10.5px;font-weight:900;color:${r.glow};margin-bottom:5px;"><span>💿 ${escapeHtml(r.name)}</span><span>${r.bpm}BPM</span></div>`+r.tracks.map(t=>{const ow=state.music.ownedTracks.includes(t.id),eq=state.music.equippedTrackId===t.id;return `<div class="shop-item" style="margin-bottom:4px;"><div class="shop-info"><h4 style="color:${eq?'#c8ff29':'#fff'};">♪ ${escapeHtml(t.title)}</h4></div><div class="v10-row"><button class="btn" style="width:auto;padding:5px 8px;font-size:9.5px;" onclick="AudioEngine.playTrack('${t.id}')">▶試聴</button>${eq?`<span class="tag-mini" style="color:#c8ff29;">✓SYNC</span>`:ow?`<button class="btn btn-cyan" style="width:auto;padding:5px 8px;font-size:9.5px;" onclick="equipTrackBGM('${t.id}')">SYNC</button>`:`<button class="btn btn-gold" style="width:auto;padding:5px 8px;font-size:9.5px;" onclick="buyRecordTrack('${t.id}',${t.price})">⚡¥${t.price.toLocaleString()}</button>`}</div></div>`;}).join('')+`</div>`;
  }).join('');
  setCockpitView(`<div class="v10-props-term" style="background-image:radial-gradient(circle,rgba(4,8,20,.38),rgba(4,6,14,.68)),url('${bg}');"><div class="v10-props-core"><div class="v10-row" style="padding-bottom:6px;margin-bottom:6px;border-bottom:1px solid #00f0ff44;"><div><div style="font-family:monospace;font-size:10px;font-weight:900;color:#00f0ff;">🧠 PROPS TERMINAL // BEAT SYNC</div><div style="font-size:9px;color:#cbd5e1;">Cash: <b style="color:#c8ff29;">¥${state.cash.toLocaleString()}</b></div></div><button class="btn" style="width:auto;padding:5px 10px;font-size:9.5px;color:#00f0ff;" onclick="AudioEngine.stop();v10SubModal=null;state.uiMode='HOME';renderV10ActiveMode()">← HOME</button></div><div class="v10-g2" style="margin-bottom:7px;"><button class="btn btn-cyan" style="padding:5px;font-size:10px;">💿 BEAT SYNC</button><button class="btn" style="padding:5px;font-size:10px;" onclick="v10SubModal='ec';state.shopMode='ec';renderShopTab()">🎤 マイク・EC</button></div><div class="v10-props-list">${rH}</div></div></div>`,'');
}
function openV10SubModal(k){
  ensureV10State();document.getElementById('modal-layer')?.classList.remove('open');v10SubModal=k;
  if(k==='record'){state.currentTab='shop';state.shopMode='record';renderPropsTerminalScreen();return;}
  document.getElementById('cockpit-body')?.classList.remove('v10-fullscreen-body');document.getElementById('topbar')?.style.setProperty('display','flex');updateHeader();
  if(k==='studio'){state.currentTab='studio';renderStudioTab();}else if(k==='chart'){state.currentTab='chart';renderChartTab();}else{state.currentTab='shop';state.shopMode='ec';renderShopTab();}
  const dk=document.getElementById('command-deck');if(dk&&!dk.querySelector('.v10-bh'))dk.insertAdjacentHTML('afterbegin',`<button class="btn v10-bh" style="margin-bottom:7px;color:#00f0ff;border-color:#00f0ff66;" onclick="AudioEngine.stop();v10SubModal=null;state.uiMode='HOME';renderV10ActiveMode()">← 🏠 HOMEへ戻る</button>`);
}

function installV101BossAndAreaPatches(){
  if(typeof Street25DEngine!=='undefined'&&Street25DEngine){
    Street25DEngine.syncExternalTextures=function(){
      if(!this.backdropMat||typeof THREE==='undefined')return;
      const f=getV10AreaBgFile(state.areaIndex),u=AssetImageCache.resolve(f,{cutout:false,onReady:()=>this.syncExternalTextures()})||('assets/images/'+f);
      if(u&&this._loadedBg!==u){this._loadedBg=u;new THREE.TextureLoader().load(u,tx=>{if(this.backdropMat){this.backdropMat.map=tx;this.backdropMat.opacity=0.92;this.backdropMat.needsUpdate=true;}});}
    };
  }
  window.renderPlayerBackShoulderHTML=function(){
    const isD=state.profile.gender==='diva',f=isD?'diva_back_battle.png':'king_back_battle.png';
    const u=AssetImageCache.resolve(f,{cutout:true,onReady:()=>{if(activeBossBattle)renderV10BossBattle();}})||('assets/images/'+f);
    const t=AssetImageCache.isTaintedSprite&&AssetImageCache.isTaintedSprite(f);
    return `<img src="${u}" class="v10-back-sprite" style="${t?'filter:url(#tainted-black-key);':''}" alt="YOU">`;
  };
  if(typeof window.recordBossFlowTap==='function'&&!window._v10FlowTapPatched){
    window._v10FlowTapPatched=true;
    const _origTap=window.recordBossFlowTap;
    window.recordBossFlowTap=function(){
      const ef=getEffectivePlayerStats(),origFlw=state.stats.flow;
      state.stats.flow=ef.flow;
      _origTap();
      state.stats.flow=origFlw;
    };
  }
  if(typeof window.resolveTwoBarBossTurn==='function'&&!window._v10BossPatched){
    window._v10BossPatched=true;
    const _origResolve=window.resolveTwoBarBossTurn;
    window.resolveTwoBarBossTurn=function(){
      const b=activeBossBattle;if(!b)return;
      const ef=getEffectivePlayerStats(),r=b.pendingRhyme||{rhymeCombo:0,endMatched:false};
      const origLyr=state.stats.lyric,origVib=state.stats.vibes,origSns=state.stats.sense;
      state.stats.lyric=Math.round(ef.lyric*ef.dmgMult);state.stats.vibes=ef.vibes;state.stats.sense=ef.sense;
      const bossRef=b.boss,wasJg=b.isGauntlet;
      _origResolve();
      state.stats.lyric=origLyr;state.stats.vibes=origVib;state.stats.sense=origSns;
      const hadBurst=!b.usedFallback&&(r.rhymeCombo>=2||b.slashVfx);
      if(hadBurst)triggerNeuralSyncBurstVFX();
      if(activeBossBattle){
        activeBossBattle.syncBurstVfx=!!hadBurst;
        if(ef.isLegendSSR&&!b.usedFallback)activeBossBattle.playerHp=Math.min(activeBossBattle.playerMaxHp,activeBossBattle.playerHp+Math.round(activeBossBattle.playerMaxHp*0.05));
        state.hp=Math.max(1,activeBossBattle.playerHp);
        renderV10BossBattle();
      }else{
        const wonMatch=b.bossHp<=0&&b.playerHp>0;
        state.wellRestedBuff=false;
        if(wonMatch){
          if(ef.cashMult>1){const extraCash=Math.round(((bossRef&&bossRef.rewardCash)||180000)*(ef.cashMult-1));if(extraCash>0)state.cash+=extraCash;}
          if(bossRef&&(bossRef.isLegend||wasJg)){
            if(tryGrantLegendMicDrop(bossRef,wasJg))setTimeout(()=>{triggerSlashCutIn('SSR LEGEND MIC DROP!!','黄金共鳴レジェンドマイク継承獲得！','#ffc83b');showToast('✨【SSR継承】黄金共鳴レジェンドマイクを獲得＆装備！');},400);
          }
          saveState();
        }else{
          state.hp=getPlayerMaxHP();
          saveState();
        }
      }
    };
  }
  if(typeof window.renderV10BossBattle==='function'&&!window._v10BossViewPatched){
    window._v10BossViewPatched=true;
    const _origBV=window.renderV10BossBattle;
    window.renderV10BossBattle=function(){
      _origBV();
      const b=activeBossBattle,st=document.querySelector('.v10-boss-stage');if(!b||!st)return;
      const bf=(b.isGauntlet||b.boss.id==='leg_oonyudo')?'bg_jougen_yaon.jpg':b.boss.id==='boss_bulldog'?'bg_street_park.jpg':b.boss.id==='boss_vera'?'bg_metro_station.jpg':b.boss.id==='boss_dub'?'bg_port_container.jpg':getV10AreaBgFile(state.areaIndex);
      const bu=AssetImageCache.resolve(bf,{cutout:false})||('assets/images/'+bf);
      st.style.backgroundImage=`linear-gradient(180deg,rgba(6,6,14,.34),rgba(6,6,14,.9)),url('${bu}')`;
      if(b.syncBurstVfx&&!st.querySelector('.v10-burst-st')){const vu=AssetImageCache.resolve('fx_chemical_sync_burst.png',{cutout:false})||'assets/images/fx_chemical_sync_burst.png';st.insertAdjacentHTML('afterbegin',`<img src="${vu}" class="v10-burst-st" alt="">`);}
    };
  }
  const soloLeg=function(id){document.getElementById('modal-layer')?.classList.remove('open');const pl=typeof LEGEND_NPCS!=='undefined'?LEGEND_NPCS:[];const lg=pl.find(x=>x.id===id)||pl[0];if(lg)startV10BossMatch(Object.assign({isBoss:true,isLegend:true},lg),false);};
  window.startSoloLegendBattle=soloLeg;window.startLegendBattleById=soloLeg;
  window.launchJougenPosseCut=function(){document.getElementById('modal-layer')?.classList.remove('open');const ln=(typeof getJougenRelayLineup==='function'?getJougenRelayLineup():[]).map(x=>Object.assign({isBoss:true,isLegend:true},x));if(ln.length)startV10BossMatch(ln[0],true,ln);};
}

window.addEventListener('DOMContentLoaded',()=>{
  document.title='CYBER RAPPER // LOST ARCHIVE RPG (v10.1)';
  ensureV10State();preloadV10AllAssets();
  if(typeof window.getDripValue==='function'&&!window._v10DW){window._v10DW=true;const o=window.getDripValue;window.getDripValue=()=>o()+Math.floor(getGear8DripBonus()*(typeof getActiveLabelBuff==='function'?getActiveLabelBuff('drip'):1));}
  if(typeof window.recordAndReleaseTrack==='function'&&!window._v10RW){window._v10RW=true;const o=window.recordAndReleaseTrack;window.recordAndReleaseTrack=function(){const n=(state.tracks||[]).length;o();if((state.tracks||[]).length>n){const t=state.tracks[state.tracks.length-1],ef=getEffectivePlayerStats();if(t&&ef.streamMult>1){t.streams=Math.round(t.streams*ef.streamMult);saveState();renderStudioTab();}}};}
  if(typeof window.renderShopTab==='function'){
    const oS=window.renderShopTab;
    window.renderShopTab=function(){
      ensureV10State();if(state.shopMode==='record'){v10SubModal='record';renderPropsTerminalScreen();return;}
      document.getElementById('cockpit-body')?.classList.remove('v10-fullscreen-body');document.getElementById('topbar')?.style.setProperty('display','flex');oS();
      const dk=document.getElementById('command-deck');if(!dk)return;
      dk.insertAdjacentHTML('afterbegin',`<button class="btn v10-bh" style="margin-bottom:7px;color:#00f0ff;" onclick="AudioEngine.stop();v10SubModal=null;state.uiMode='HOME';renderV10ActiveMode()">← 🏠 HOMEへ戻る</button><div class="panel"><div class="v10-sec-label">🎤 MIC WEAPON ARMORY</div>${GEAR_8_CATALOG.mic.map(it=>{const ow=state.ownedGear8.includes(it.id),eq=state.profile.equip8.mic===it.id;return `<div class="shop-item">${renderMicWeaponIconHTML(it,40)}<div class="shop-info" style="flex:1;"><h4 style="color:${it.rarity==='SSR'?'#ffc83b':'#fff'};">[${it.rarity}] ${escapeHtml(it.name)}</h4><p>${escapeHtml(it.desc)}</p></div>${eq?`<span class="tag-mini" style="color:#c8ff29;">✓装備中</span>`:ow?`<button class="btn btn-cyan" style="width:auto;padding:5px 9px;" onclick="buyOrEquipGear8('mic','${it.id}',true)">装備</button>`:it.dropOnly?`<span class="tag-mini" style="color:#ffc83b;">🔒継承</span>`:`<button class="btn btn-primary" style="width:auto;padding:5px 9px;" onclick="buyOrEquipGear8('mic','${it.id}',true)">¥${it.price.toLocaleString()}</button>`}</div>`;}).join('')}</div>`);
    };
  }
  if(typeof window.renderChartTab==='function'){
    const oC=window.renderChartTab;
    window.renderChartTab=function(){
      document.getElementById('cockpit-body')?.classList.remove('v10-fullscreen-body');document.getElementById('topbar')?.style.setProperty('display','flex');oC();
      const mf=v10TurfFilter==='LOCAL'?'bg_street_park.jpg':v10TurfFilter==='METRO'?'bg_metro_station.jpg':v10TurfFilter==='PORT'?'bg_port_container.jpg':'bg_territory_turf_map.jpg';
      const tu=AssetImageCache.resolve(mf,{cutout:false,onReady:()=>{if(state.currentTab==='chart')renderChartTab();}})||('assets/images/'+mf);
      const mon=document.querySelector('#stage-view .stage-monitor');if(mon)mon.style.background=`linear-gradient(180deg,rgba(6,9,18,.52),rgba(6,8,16,.88)),url('${tu}') center/cover no-repeat`;
      const dk=document.getElementById('command-deck');if(dk)dk.insertAdjacentHTML('afterbegin',`<button class="btn v10-bh" style="margin-bottom:6px;color:#00f0ff;" onclick="AudioEngine.stop();v10SubModal=null;state.uiMode='HOME';renderV10ActiveMode()">← 🏠 HOMEへ戻る</button><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4px;margin-bottom:6px;">${[['ALL','🗺️勢力全体'],['LOCAL','🏙️LOCAL'],['METRO','🚇METRO'],['PORT','🚢PORT']].map(([k,l])=>`<button class="btn ${v10TurfFilter===k?'btn-cyan':''}" style="padding:5px 3px;font-size:9.5px;" onclick="v10TurfFilter='${k}';renderChartTab()">${l}</button>`).join('')}</div>`);
    };
  }
  window.refreshOnAssetReady=function(){
    const ae=document.activeElement;if(ae&&/^(INPUT|TEXTAREA|SELECT)$/.test(ae.tagName))return;
    if(document.getElementById('title-screen')?.classList.contains('active'))return renderTitleScreen();
    if(document.getElementById('modal-layer')?.classList.contains('open'))return;
    if(typeof Street25DEngine!=='undefined'&&Street25DEngine.running)Street25DEngine.syncExternalTextures();
    if(v10SubModal==='record')return renderPropsTerminalScreen();
    if(!v10SubModal&&typeof state!=='undefined')renderV10ActiveMode();
  };
  window.continueFromTitle=function(){document.getElementById('title-screen').classList.remove('active');transitionMode('HOME','ENTERING REBUILT TOKYO');};
  window.renderCreator=function(s){v10CameraMode='bust';renderV10ClosetMode(!s&&!state.created);};
  setTimeout(installV101BossAndAreaPatches,0);
  if(document.getElementById('title-screen')?.classList.contains('active'))renderTitleScreen();
});
