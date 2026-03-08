/**
 * The Deepest Dunk - Mobile & High DPI Update
 */

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const uiOverlay = {
    audioSetup: document.getElementById('audio-setup-screen'),
    start: document.getElementById('start-screen'),
    selection: document.getElementById('selection-screen'),
    gameOver: document.getElementById('game-over-screen'),
    hud: document.getElementById('hud'),
    langToggle: document.getElementById('lang-toggle'),
    masterMuteBtn: document.getElementById('master-mute-btn'),
    depth: document.getElementById('depth-value'),
    hpBar: document.getElementById('hp-bar'),
    comboPanel: document.getElementById('combo-panel'),
    comboText: document.getElementById('combo-text'),
    comboTimerFill: document.getElementById('combo-timer-fill'),
    deathReason: document.getElementById('death-reason'),
    finalDepth: document.getElementById('final-depth'),
    grid: document.getElementById('cookie-grid'),
    victory: document.getElementById('victory-screen'),
    vignette: document.getElementById('vignette'),
    mintVignette: document.getElementById('mint-vignette'),
    championBadge: document.getElementById('champion-badge'),
    mobileActionBtn: document.getElementById('touch-action-btn'),
    settings: {
        panel: document.getElementById('bottom-settings'),
        chkMusic: document.getElementById('chk-music'),
        chkSfx: document.getElementById('chk-sfx'),
        volMusic: document.getElementById('vol-music'),
        volSfx: document.getElementById('vol-sfx'),
        volMaster: document.getElementById('vol-master'),
        valMusic: document.getElementById('val-music'),
        valSfx: document.getElementById('val-sfx'),
    },
    btnRetry: document.getElementById('btn-retry'),
    btnChangeSkin: document.getElementById('btn-change-skin'),
    btnMenu: document.getElementById('btn-menu')
};

// --- Game State ---
const state = {
    isStarted: false,
    isGameOver: false,
    isShattering: false,
    shatterProgress: 0,
    lang: 'en',
    audio: {
        musicEnabled: true,
        sfxEnabled: true,
        musicVol: 0.2,
        sfxVol: 1.0,
        masterVol: 1.0,
        isMasterMuted: false
    },
    depth: 0,
    time: 0,
    cameraY: 0,
    isHoldingSpace: false,
    keys: { left: false, right: false },
    selectedCookie: 'classic',
    isChampion: localStorage.getItem('dunk_isChampion') === 'true',
    victoryTriggered: false,
    timeScale: 1,
    targetTimeScale: 1,
    currentStage: 'Fresh Milk',
    combo: {
        windowMs: 2000,
        collisionHits: [],
        sugarHits: [],
        activeUntilMs: 0,
        multiplier: 1,
        pendingHealBonus: 0,
        lastCollisionTriggerMs: -99999,
        lastSugarTriggerMs: -99999,
        flashTimer: 0,
        waveTimer: 0
    },
    buffs: {
        crystalArmor: false
    },
    stats: {
        totalTime: 0,
        totalDepth: 0,
        gamesPlayed: 0,
        totalVictories: 0,
        collisions: 0,
        sugarCollected: 0,
        bubblesCollected: 0,
        iceBroken: 0,
        maxCombo: 0
    },
    currentRunStats: {
        time: 0,
        collisions: 0,
        sugar: 0,
        bubbles: 0,
        iceBroken: 0,
        maxCombo: 0
    },
    replay: {
        isRecording: false,
        isPlaying: false,
        frames: [],
        savedReplays: JSON.parse(localStorage.getItem('dunk_replays') || '[]'),
        recordingTicker: 0
    },
    mintSlowdown: 0
};

const COOKIES = {
    classic: { id: 'classic', name: { en: 'Classic Choco', ru: 'Классическое' }, info: { en: 'Balanced stats.', ru: 'Сбалансированное.' }, hp: 100, absorbSpeed: 0.03, weight: 1.0, agility: 1.8, color: '#3c2a21', softColor: '#5d4037' },
    oatmeal: { id: 'oatmeal', name: { en: 'Oatmeal Brick', ru: 'Овсяный Кирпич' }, info: { en: 'Huge HP, sinks fast.', ru: 'Много HP, тонет быстро.' }, hp: 200, absorbSpeed: 0.015, weight: 1.8, agility: 0.8, color: '#7b5e3d', softColor: '#8d6e63' },
    macaron: { id: 'macaron', name: { en: 'Macaron', ru: 'Макарон' }, info: { en: 'Fragile, resists dissolving.', ru: 'Хрупкое, не тает.' }, hp: 30, absorbSpeed: 0.005, weight: 0.7, agility: 2.2, color: '#ff80ab', softColor: '#f48fb1' },
    cracker: {
        id: 'cracker',
        name: { en: 'Cracker', ru: 'Крекер' },
        info: { en: 'Spicy Dust! Action to shoot.', ru: 'Острый порошок! Действие для выстрела.' },
        hp: 80, absorbSpeed: 0, weight: 0.5, agility: 3.0, color: '#e2a35d', softColor: '#e2a35d'
    },
    mint: {
        id: 'mint',
        name: { en: 'Minty Fresh', ru: 'Мятная Свежесть' },
        info: { en: 'Slows time on damage.', ru: 'Замедляет время при уроне.' },
        hp: 90, absorbSpeed: 0.025, weight: 0.9, agility: 2.0, color: '#a5d6a7', softColor: '#e8f5e9'
    }
};

const STAGES = {
    MILK: { depth: 0, name: 'Свежее молоко', color: '#fdfaf5' },
    COCOA: { depth: 2000, name: 'Глубокое какао', color: '#3d2b1f' },
    VOID: { depth: 4500, name: 'Пустота', color: '#0a0a12' },
    ENLIGHTENED: { depth: 5000, name: 'Просветление', color: '#000000' }
};

const STRINGS = {
    en: {
        surfTitle: "Shattered!",
        mushTitle: "Crumbled...",
        finalDepth: "Depth: ",
        mm: "mm",
        champTitle: "CHAMPION!",
        action: "ACTION",
        combo: "COMBO",
        healBonus: "next heal +"
    },
    ru: {
        surfTitle: "Разбился!",
        mushTitle: "Растворился...",
        finalDepth: "Глубина: ",
        mm: "мм",
        champTitle: "ЧЕМПИОН!",
        action: "ДЕЙСТВИЕ",
        combo: "КОМБО",
        healBonus: "след. лечение +"
    }
};

const COLORS = { milk: '#fdfaf5', ice: 'rgba(180, 220, 255, 0.7)', wall: '#dcdde1', roomBg: '#f5efe0', floor: '#4a3728', sugar: '#fbc02d', bubble: '#00bcd4' };

let player = { x: 0, y: 0, radius: 35, baseRadius: 35, hp: 100, maxHp: 100, vx: 0, vy: 0, rotation: 0, state: 'DRY', absorption: 0, shards: [] };
let entities = [];
let particles = [];
let milkTrail = [];
let backgroundElements = [];
let saltProjectiles = [];
let logicalWidth = 0; // For responsive drawing
const FRAME_MS = 1000 / 60;

// --- Audio Controller ---
class AudioController {
    constructor() {
        this.ctx = null;
        this.masterGain = null;
        this.sfxGain = null;
        this.lpFilter = null;
        this.bgMusicEl = document.getElementById('bg-music');
        if (this.bgMusicEl) {
            this.bgMusicEl.volume = 0.2;
            this.bgMusicEl.loop = false; // Manually looping for control
        }
    }

    init() {
        if (this.ctx) return;
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();

        this.masterGain = this.ctx.createGain();
        this.masterGain.connect(this.ctx.destination);

        this.lpFilter = this.ctx.createBiquadFilter();
        this.lpFilter.type = 'lowpass';
        this.lpFilter.frequency.setValueAtTime(20000, this.ctx.currentTime);

        this.sfxGain = this.ctx.createGain();
        this.sfxGain.connect(this.lpFilter);
        this.lpFilter.connect(this.masterGain);

        if (this.bgMusicEl) {
            this.bgMusicEl.currentTime = 90;
            this.bgMusicEl.addEventListener('ended', () => {
                this.bgMusicEl.currentTime = 90;
                this.playMusic();
            });
        }
        this.updateVolumes();
        this.playMusic();
    }

    playMusic() {
        if (this.bgMusicEl && this.bgMusicEl.paused) {
            let playPromise = this.bgMusicEl.play();
            if (playPromise !== undefined) { playPromise.catch(e => { console.log("Audio waiting for interaction"); }); }
        }
    }

    pauseMusic() {
        if (this.bgMusicEl && !this.bgMusicEl.paused) this.bgMusicEl.pause();
    }

    updateVolumes() {
        const musicTarget = state.audio.musicEnabled ? state.audio.musicVol : 0;
        const sfxTarget = state.audio.sfxEnabled ? state.audio.sfxVol : 0;
        const master = state.audio.isMasterMuted ? 0 : state.audio.masterVol;

        if (this.bgMusicEl) {
            this.bgMusicEl.volume = Math.max(0, Math.min(1, musicTarget * master));
            if (state.audio.musicEnabled && state.isStarted) this.playMusic(); else if (!state.audio.musicEnabled) this.pauseMusic();
        }
        if (this.masterGain && this.ctx) {
            const now = this.ctx.currentTime;
            this.masterGain.gain.setTargetAtTime(master, now, 0.1);
            this.sfxGain.gain.setTargetAtTime(sfxTarget, now, 0.1);
        }
    }

    updateFilters(isSoggy, depthFactor) {
        if (!this.lpFilter || !this.ctx) return;
        let baseFreq = isSoggy ? 450 : 15000;
        if (depthFactor > 0.9) baseFreq *= (1 - (depthFactor - 0.9) * 8);
        this.lpFilter.frequency.setTargetAtTime(Math.max(100, baseFreq), this.ctx.currentTime, 0.1);
    }

    playSound(freq, type, duration, volScale) {
        if (!this.ctx || !state.audio.sfxEnabled) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            gain.gain.setValueAtTime(volScale, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
            osc.connect(gain);
            gain.connect(this.sfxGain);
            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        } catch (e) { }
    }
    playDing() { this.playSound(1320, 'triangle', 0.12, 0.35); }
    playBlast() { this.playSound(180, 'sawtooth', 0.28, 0.45); }
    playClink() { this.playSound(800 + Math.random() * 400, 'sine', 0.1, 0.3); }
    playThud() { this.playSound(150, 'triangle', 0.3, 0.5); }
    playShatter() { for (let i = 0; i < 12; i++) this.playSound(50 + Math.random() * 2000, 'sawtooth', 0.2, 0.4); }
}
const audio = new AudioController();

const ACHIEVEMENTS = [
    { id: 'rookie', name: { en: 'Rookie', ru: 'Новичок' }, desc: { en: 'Reach 500mm depth.', ru: 'Достигни глубины 500мм.' }, goal: 500, type: 'depth' },
    { id: 'expert', name: { en: 'Expert Swimmer', ru: 'Опытный пловец' }, desc: { en: 'Reach 2000mm depth.', ru: 'Достигни глубины 2000мм.' }, goal: 2000, type: 'depth' },
    { id: 'master', name: { en: 'Master Dunker', ru: 'Мастер погружения' }, desc: { en: 'Reach 5000mm depth.', ru: 'Достигни глубины 5000мм.' }, goal: 5000, type: 'depth' },
    { id: 'sugar_addict', name: { en: 'Sugar Addict', ru: 'Сахарный зависимый' }, desc: { en: 'Collect 100 sugar in one game.', ru: 'Собери 100 сахара за игру.' }, goal: 100, type: 'sugar' },
    { id: 'ice_breaker', name: { en: 'Icebreaker', ru: 'Ледокол' }, desc: { en: 'Destroy 200 ice blocks total.', ru: 'Уничтожь 200 кубиков льда всего.' }, goal: 200, type: 'iceTotal' },
    { id: 'mint_victory', name: { en: 'Minty Victory', ru: 'Мятная победа' }, desc: { en: 'Win with Mint cookie.', ru: 'Победи за мятное печенье.' }, type: 'win_mint' },
    { id: 'warrior', name: { en: 'Battle Swimmer', ru: 'Боевой пловец' }, desc: { en: 'Get hit 50 times in one game.', ru: 'Получи 50 столкновений за игру.' }, goal: 50, type: 'collisions' }
];

function getUnlockedAchievements() { return JSON.parse(localStorage.getItem('dunk_achievements') || '[]'); }
function unlockAchievement(id) {
    let unlocked = getUnlockedAchievements();
    if (!unlocked.includes(id)) {
        unlocked.push(id);
        localStorage.setItem('dunk_achievements', JSON.stringify(unlocked));
    }
}

function showAchievements() {
    uiOverlay.start.classList.add('hidden');
    const screen = document.getElementById('achievements-screen');
    const list = document.getElementById('achievements-list');
    screen.classList.remove('hidden');
    const unlocked = getUnlockedAchievements();
    list.innerHTML = ACHIEVEMENTS.map(a => `
        <div class="achievement-item ${unlocked.includes(a.id) ? 'unlocked' : ''}">
            <span class="achievement-title">${a.name[state.lang]} ${unlocked.includes(a.id) ? '🏆' : '🔒'}</span>
            <span class="achievement-desc">${a.desc[state.lang]}</span>
        </div>
    `).join('');
}

function showReplays() {
    uiOverlay.start.classList.add('hidden');
    document.getElementById('replays-screen').classList.remove('hidden');
    const list = document.getElementById('replays-list');
    const replays = state.replay.savedReplays;
    if (replays.length === 0) { list.innerHTML = '<p>No replays saved yet.</p>'; return; }
    list.innerHTML = replays.map((r, i) => `
        <div class="replay-item">
            <div class="replay-info">
                <strong>${r.cookie}</strong><br>${r.depth}mm | ${r.date}
            </div>
            <button class="replay-btn ui-btn small" onclick="playReplay(${i})">PLAY</button>
        </div>
    `).join('');
}

window.playReplay = (index) => {
    const replay = state.replay.savedReplays[index];
    if (!replay) return;
    softReset();
    state.isStarted = true;
    state.replay.isPlaying = true;
    state.replay.frames = replay.frames;
    state.selectedCookie = replay.cookie;
    document.getElementById('replays-screen').classList.add('hidden');
    uiOverlay.hud.classList.remove('hidden');
};

function recordFrame() {
    if (!state.isStarted || state.isGameOver || state.replay.isPlaying) return;
    state.replay.recordingTicker++;
    if (state.replay.recordingTicker % 15 === 0) { // Every 0.25s roughly
        state.replay.frames.push({
            p: { x: Math.round(player.x), y: Math.round(player.y), hp: Math.round(player.hp), rot: player.rotation, abs: player.absorption },
            e: entities.map(ent => ({ x: Math.round(ent.x), y: Math.round(ent.y), t: ent.type, r: Math.round(ent.radius) }))
        });
    }
}

function saveReplay() {
    const depth = Math.floor(state.depth / 20);
    const newReplay = {
        date: new Date().toLocaleDateString(),
        depth: depth,
        cookie: state.selectedCookie,
        frames: state.replay.frames
    };
    state.replay.savedReplays.unshift(newReplay);
    state.replay.savedReplays = state.replay.savedReplays.slice(0, 5);
    localStorage.setItem('dunk_replays', JSON.stringify(state.replay.savedReplays));
}


// --- Core ---
function bindClick(el, fn) {
    if (!el) return;
    el.addEventListener('click', (e) => { e.preventDefault(); fn(e); });
    el.addEventListener('touchstart', (e) => { e.preventDefault(); fn(e); }, { passive: false });
}

function init() {
    resize(); createParallax(); window.addEventListener('resize', resize); refreshUIStrings();
    if (state.isChampion && uiOverlay.championBadge) uiOverlay.championBadge.classList.remove('hidden');

    setupAudioUI();
    setupMobileControls();

    bindClick(uiOverlay.langToggle, toggleLanguage);
    bindClick(uiOverlay.masterMuteBtn, toggleMasterMute);

    bindClick(document.getElementById('audio-start-btn'), () => setupAudio(true));
    bindClick(document.getElementById('audio-mute-start-btn'), () => setupAudio(false));
    bindClick(document.getElementById('quick-close-audio'), () => setupAudio(true));

    bindClick(document.getElementById('start-btn'), showSelection);

    bindClick(uiOverlay.btnRetry, () => { softReset(); startGame(state.selectedCookie); });
    bindClick(uiOverlay.btnChangeSkin, () => { softReset(); showSelection(); });
    bindClick(uiOverlay.btnMenu, () => { softReset(); uiOverlay.start.classList.remove('hidden'); });

    bindClick(document.getElementById('btn-achievements'), showAchievements);
    bindClick(document.getElementById('btn-replays'), showReplays);
    document.querySelectorAll('.close-x').forEach(btn => bindClick(btn, () => {
        document.querySelectorAll('.overlay-screen').forEach(s => s.classList.add('hidden'));
        uiOverlay.start.classList.remove('hidden');
    }));

    // Keyboard
    window.addEventListener('keydown', (e) => {
        if (e.code === 'Space') state.isHoldingSpace = true;
        if (e.code === 'ArrowLeft' || e.code === 'KeyA') state.keys.left = true;
        if (e.code === 'ArrowRight' || e.code === 'KeyD') state.keys.right = true;
    });
    window.addEventListener('keyup', (e) => {
        if (e.code === 'Space') state.isHoldingSpace = false;
        if (e.code === 'ArrowLeft' || e.code === 'KeyA') state.keys.left = false;
        if (e.code === 'ArrowRight' || e.code === 'KeyD') state.keys.right = false;
    });

    requestAnimationFrame(gameLoop);
}

function setupMobileControls() {
    const leftZone = document.getElementById('touch-left');
    const rightZone = document.getElementById('touch-right');
    const actionBtn = document.getElementById('touch-action-btn');

    const handleTouch = (zone, key, isPressed) => {
        zone.addEventListener(isPressed ? 'touchstart' : 'touchend', (e) => {
            e.preventDefault();
            state.keys[key] = isPressed;
        }, { passive: false });
        // Handle dragging out
        if (!isPressed) {
            zone.addEventListener('touchcancel', (e) => { state.keys[key] = false; }, { passive: false });
        }
    };

    handleTouch(leftZone, 'left', true);
    handleTouch(leftZone, 'left', false);
    handleTouch(rightZone, 'right', true);
    handleTouch(rightZone, 'right', false);

    actionBtn.addEventListener('touchstart', (e) => { e.preventDefault(); state.isHoldingSpace = true; actionBtn.style.transform = "translateX(-50%) scale(0.9)"; }, { passive: false });
    actionBtn.addEventListener('touchend', (e) => { e.preventDefault(); state.isHoldingSpace = false; actionBtn.style.transform = "translateX(-50%) scale(1)"; }, { passive: false });
}

function softReset() {
    state.isStarted = false; state.isGameOver = false; state.isShattering = false;
    state.shatterProgress = 0; state.depth = 0; state.time = 0; state.cameraY = -200;
    state.timeScale = 1; state.targetTimeScale = 1; state.victoryTriggered = false; state.keys.left = false; state.keys.right = false; state.isHoldingSpace = false;

    // Reset player position based on logical width
    player.x = logicalWidth / 2;
    player.y = 0; player.vx = 0; player.vy = 0;
    player.rotation = 0; player.state = 'DRY'; player.absorption = 0; player.shards = [];

    entities = []; particles = []; milkTrail = []; saltProjectiles = [];
    uiOverlay.gameOver.classList.add('hidden'); uiOverlay.victory.classList.add('hidden'); uiOverlay.hud.classList.add('hidden');

    state.currentRunStats = { time: 0, collisions: 0, sugar: 0, bubbles: 0, iceBroken: 0, maxCombo: 0 };
    state.buffs.crystalArmor = false;
    state.replay.frames = [];
    state.replay.recordingTicker = 0;
    state.mintSlowdown = 0;
    updateBuffsUI();

    resetComboState();
    audio.updateFilters(false, 0);
}

function setupAudioUI() {
    uiOverlay.settings.chkMusic.addEventListener('change', (e) => { state.audio.musicEnabled = e.target.checked; audio.updateVolumes(); });
    uiOverlay.settings.chkSfx.addEventListener('change', (e) => { state.audio.sfxEnabled = e.target.checked; audio.updateVolumes(); });
    uiOverlay.settings.volMusic.addEventListener('input', (e) => { state.audio.musicVol = e.target.value / 100; uiOverlay.settings.valMusic.innerText = e.target.value + '%'; audio.updateVolumes(); });
    uiOverlay.settings.volSfx.addEventListener('input', (e) => { state.audio.sfxVol = e.target.value / 100; uiOverlay.settings.valSfx.innerText = e.target.value + '%'; audio.updateVolumes(); });
    uiOverlay.settings.volMaster.addEventListener('input', (e) => {
        state.audio.masterVol = e.target.value / 100;
        if (state.audio.isMasterMuted) { state.audio.isMasterMuted = false; updateMasterBtnIcon(); }
        audio.updateVolumes();
    });
}

function setupAudio(enable) {
    uiOverlay.audioSetup.classList.add('hidden'); uiOverlay.start.classList.remove('hidden'); audio.init();
    if (enable) { state.audio.musicEnabled = true; state.audio.sfxEnabled = true; state.audio.isMasterMuted = false; }
    else { state.audio.isMasterMuted = true; updateMasterBtnIcon(); }
    syncAudioUI(); audio.updateVolumes();
}

function syncAudioUI() {
    uiOverlay.settings.chkMusic.checked = state.audio.musicEnabled;
    uiOverlay.settings.chkSfx.checked = state.audio.sfxEnabled;
    uiOverlay.settings.volMusic.value = state.audio.musicVol * 100;
    uiOverlay.settings.valMusic.innerText = Math.round(state.audio.musicVol * 100) + '%';
    uiOverlay.settings.volSfx.value = state.audio.sfxVol * 100;
    uiOverlay.settings.valSfx.innerText = Math.round(state.audio.sfxVol * 100) + '%';
    uiOverlay.settings.volMaster.value = state.audio.masterVol * 100;
}

function toggleMasterMute() { state.audio.isMasterMuted = !state.audio.isMasterMuted; updateMasterBtnIcon(); audio.updateVolumes(); }
function updateMasterBtnIcon() { uiOverlay.masterMuteBtn.innerText = state.audio.isMasterMuted ? '🔇' : '🔊'; }
function showSelection() { uiOverlay.start.classList.add('hidden'); uiOverlay.selection.classList.remove('hidden'); renderCookieCards(); }
function renderCookieCards() {
    uiOverlay.grid.innerHTML = '';
    Object.values(COOKIES).forEach(c => {
        const card = document.createElement('div'); card.className = 'cookie-card';
        card.innerHTML = `<h3>${c.name[state.lang]}</h3><p class="cookie-info">${c.info[state.lang]}</p>`;
        bindClick(card, () => startGame(c.id)); uiOverlay.grid.appendChild(card);
    });
}

function startGame(type) {
    state.selectedCookie = type; const stats = COOKIES[type];
    player.hp = stats.hp; player.maxHp = stats.hp; player.baseRadius = type === 'cracker' ? 25 : 35;
    resetComboState();
    state.isStarted = true; uiOverlay.selection.classList.add('hidden'); uiOverlay.hud.classList.remove('hidden');
    player.x = logicalWidth / 2; player.y = 0; state.cameraY = -200;
    audio.playMusic();
}

function toggleLanguage() {
    state.lang = state.lang === 'en' ? 'ru' : 'en';
    refreshUIStrings();
    if (!uiOverlay.selection.classList.contains('hidden')) renderCookieCards();
}

function refreshUIStrings() {
    uiOverlay.langToggle.innerText = state.lang.toUpperCase();
    document.querySelectorAll('[data-en]').forEach(el => { el.innerText = el.getAttribute(`data-${state.lang}`); });
    if (uiOverlay.mobileActionBtn) uiOverlay.mobileActionBtn.innerText = STRINGS[state.lang].action;
    updateComboUI(getNowMs());
}

function resize() {
    const dpr = window.devicePixelRatio || 1;
    // Set internal resolution match screen pixels for sharpness
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    // Reset context scale to handle logic in CSS pixels
    ctx.scale(dpr, dpr);

    // Helper variable for logical width/height in code
    logicalWidth = window.innerWidth;

    // Keep player in bounds if resize happens during play
    if (player.x > logicalWidth) player.x = logicalWidth - 50;
}

function createParallax() {
    // Generate background elements
    for (let i = 0; i < 20; i++) backgroundElements.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * 5000,
        size: 150 + Math.random() * 200,
        speedScale: 0.2 + Math.random() * 0.3,
        opacity: 0.04 + Math.random() * 0.08,
        type: Math.random() > 0.5 ? 'spoon' : 'face'
    });
}

function spawnEntity() {
    if (Math.random() > 0.94 && state.isStarted && !state.isShattering) {
        const depth = Math.max(0, state.depth / 20);
        if (Math.random() < (depth > 2000 ? 0.92 : 0.94)) {
            let type = Math.random() < 0.12 ? 'sugar' : (Math.random() < 0.24 ? 'bubble' : 'ice');
            entities.push({
                x: 60 + Math.random() * (logicalWidth - 120),
                y: state.cameraY + (window.innerHeight) + 200,
                type: type,
                vx: 0, vy: 0,
                radius: type === 'ice' ? (15 + Math.random() * 65) : (type === 'sugar' ? 25 : 35),
                rotation: Math.random() * Math.PI * 2
            });
        }
    }
}

function emitCrumbs(x, y, count) {
    for (let i = 0; i < count; i++) particles.push({ x: x, y: y, vx: (Math.random() - 0.5) * 10, vy: (Math.random() - 0.5) * 10, size: 2 + Math.random() * 4, life: 1, rot: Math.random() * 6, rotVel: (Math.random() - 0.5) * 0.2 });
}
function triggerFlash() { const container = document.getElementById('game-container'); container.classList.remove('damage-flash'); void container.offsetWidth; container.classList.add('damage-flash'); }

function getNowMs() {
    return state.time * FRAME_MS;
}

function resetComboState() {
    state.combo.collisionHits = [];
    state.combo.sugarHits = [];
    state.combo.activeUntilMs = 0;
    state.combo.multiplier = 1;
    state.combo.pendingHealBonus = 0;
    state.combo.lastCollisionTriggerMs = -99999;
    state.combo.lastSugarTriggerMs = -99999;
    state.combo.flashTimer = 0;
    state.combo.waveTimer = 0;
    updateComboUI(0);
}

function pruneComboEvents(nowMs) {
    const fromMs = nowMs - state.combo.windowMs;
    state.combo.collisionHits = state.combo.collisionHits.filter(t => t >= fromMs);
    state.combo.sugarHits = state.combo.sugarHits.filter(t => t >= fromMs);
}

function registerCollisionCombo(nowMs) {
    state.combo.collisionHits.push(nowMs);
    pruneComboEvents(nowMs);
    if (state.combo.collisionHits.length >= 2 && nowMs - state.combo.lastCollisionTriggerMs > 900) {
        state.combo.lastCollisionTriggerMs = nowMs;
        state.combo.pendingHealBonus += 0.15;
        activateCombo(nowMs);
        if (audio && typeof audio.playDing === 'function') audio.playDing();
    }
}

function registerSugarCombo(nowMs) {
    state.combo.sugarHits.push(nowMs);
    pruneComboEvents(nowMs);
    if (state.combo.sugarHits.length >= 3 && nowMs - state.combo.lastSugarTriggerMs > 1000) {
        state.combo.lastSugarTriggerMs = nowMs;
        activateCombo(nowMs);
        triggerSugarBlast();
        if (audio && typeof audio.playBlast === 'function') audio.playBlast();
    }
}

function activateCombo(nowMs) {
    state.combo.activeUntilMs = nowMs + state.combo.windowMs;
    state.combo.multiplier = Math.min(3, state.combo.multiplier + 1);
    state.combo.flashTimer = 18;
}

function triggerSugarBlast() {
    const px = player.x;
    const py = player.y;
    state.combo.waveTimer = 28;
    for (let i = 0; i < entities.length; i++) {
        const ent = entities[i];
        if (ent.type !== 'ice') continue;
        const dx = ent.x - px;
        const dy = ent.y - py;
        const dist = Math.max(35, Math.hypot(dx, dy));
        const angle = Math.atan2(dy, dx);
        const force = 150 / dist;
        ent.vx += Math.cos(angle) * force * 12;
        ent.vy += Math.sin(angle) * force * 12;
        ent.radius *= 0.8;
        ent.wasBlastPushed = true;
    }
    for (let i = 0; i < 30; i++) {
        const a = (i / 30) * Math.PI * 2;
        particles.push({
            x: px + Math.cos(a) * 20,
            y: py + Math.sin(a) * 20,
            vx: Math.cos(a) * (5 + Math.random() * 4),
            vy: Math.sin(a) * (5 + Math.random() * 4),
            size: 2 + Math.random() * 2,
            life: 0.9,
            rot: 0,
            rotVel: 0,
            color: 'rgba(255,255,255,0.9)'
        });
    }
}

function applyHealing(baseAmount) {
    let heal = baseAmount;
    if (state.combo.pendingHealBonus > 0) {
        heal += baseAmount * state.combo.pendingHealBonus;
        state.combo.pendingHealBonus = 0;
    }
    player.hp = Math.min(player.maxHp, player.hp + heal);
}

function updateComboUI(nowMs) {
    if (!uiOverlay.comboPanel || !uiOverlay.comboText || !uiOverlay.comboTimerFill) return;
    const remaining = Math.max(0, state.combo.activeUntilMs - nowMs);
    const activeRatio = Math.min(1, remaining / state.combo.windowMs);
    const show = remaining > 0 || state.combo.pendingHealBonus > 0;
    uiOverlay.comboPanel.classList.toggle('active', show);
    const bonusPct = Math.round(state.combo.pendingHealBonus * 100);
    const title = `${STRINGS[state.lang].combo} x${state.combo.multiplier}`;
    uiOverlay.comboText.innerText = bonusPct > 0 ? `${title} | ${STRINGS[state.lang].healBonus}${bonusPct}%` : title;
    uiOverlay.comboTimerFill.style.width = `${(activeRatio * 100).toFixed(1)}%`;
    if (!show) {
        state.combo.multiplier = 1;
    }
}

function update() {
    if (state.isGameOver) return;
    if (state.isShattering) { updateShatter(); return; }
    if (!state.isStarted) return;

    if (state.mintSlowdown > 0) {
        state.mintSlowdown--;
        state.targetTimeScale = 0.05; // Deep slowdown
    } else if (state.victoryTriggered) {
        state.targetTimeScale = 0.2;
    } else {
        state.targetTimeScale = 1;
    }

    // Smooth transition for timeScale
    state.timeScale += (state.targetTimeScale - state.timeScale) * 0.1;

    // Visual effect sync
    if (uiOverlay.mintVignette) {
        const isMintActive = state.selectedCookie === 'mint' && state.mintSlowdown > 0;
        uiOverlay.mintVignette.style.opacity = isMintActive ? (1 - state.timeScale) * 1.5 : 0;

        const container = document.getElementById('game-container');
        if (isMintActive && state.timeScale < 0.2) {
            container.classList.add('mint-blur');
        } else {
            container.classList.remove('mint-blur');
        }
    }

    state.time++;
    state.currentRunStats.time++;
    recordFrame();
    const nowMs = getNowMs();
    if (state.combo.flashTimer > 0) state.combo.flashTimer--;
    if (state.combo.waveTimer > 0) state.combo.waveTimer--;
    const depthMm = Math.max(0, state.depth / 20);
    const stats = COOKIES[state.selectedCookie];

    updateProgression(depthMm);

    const isHyperVal = depthMm > 5000;
    const fallAccel = (isHyperVal ? 0.55 : 0.45) * stats.weight;
    const absorbPenalty = isHyperVal ? 3 : 6;
    const isCracker = state.selectedCookie === 'cracker';

    if (state.isHoldingSpace) {
        if (isCracker) {
            if (state.time % 12 === 0) {
                player.hp -= 4; audio.playClink();
                for (let i = 0; i < 32; i++) {
                    const angle = (i / 32) * Math.PI * 2;
                    saltProjectiles.push({ x: player.x, y: player.y, vx: player.vx + Math.cos(angle) * 12, vy: player.vy + Math.sin(angle) * 12, life: 1.0, rot: Math.random() * Math.PI * 2, rotVel: 0.1 + Math.random() * 0.2, history: [] });
                }
            }
            player.state = 'DRY';
        } else if (stats.absorbSpeed > 0) {
            player.state = 'SOGGY';
            const antiGravityFactor = Math.max(0.35, 1 - Math.max(0, -player.vy) / 12);
            player.vy -= (0.62 / stats.weight) * antiGravityFactor;
            if (player.vy < -8.5) player.vy = -8.5;
            player.hp -= stats.absorbSpeed * absorbPenalty;
            player.absorption = Math.min(1, player.absorption + stats.absorbSpeed * (isHyperVal ? 0.5 : 1));
            if (state.time % 3 === 0) milkTrail.push({ x: player.x, y: player.y, radius: player.radius * 0.8, life: 1 });
        }
    } else {
        player.state = 'DRY';
        player.absorption = Math.max(0, player.absorption - stats.absorbSpeed);
    }

    player.vy += fallAccel * state.timeScale;
    if (state.keys.left) player.vx -= stats.agility;
    if (state.keys.right) player.vx += stats.agility;

    // Apply friction: Only vy scale is softened to keep movement responsive
    player.vx *= 0.88;
    player.vy *= 0.98;

    player.x += player.vx * (state.selectedCookie === 'mint' ? (0.15 + 0.85 * state.timeScale) : state.timeScale);
    player.y += player.vy * (state.selectedCookie === 'mint' ? (0.15 + 0.85 * state.timeScale) : state.timeScale);
    player.rotation += (player.vx * 0.015 + 0.015) * state.timeScale;

    const wallW = 15;
    if (player.x < player.radius + wallW) { player.x = player.radius + wallW; player.hp -= 5; triggerFlash(); audio.playClink(); player.vx = Math.abs(player.vx * 1.6) + 5; if (player.state === 'DRY') emitCrumbs(player.x, player.y, 5); }
    else if (player.x > logicalWidth - player.radius - wallW) { player.x = logicalWidth - player.radius - wallW; player.hp -= 5; triggerFlash(); audio.playClink(); player.vx = -(Math.abs(player.vx * 1.6) + 5); if (player.state === 'DRY') emitCrumbs(player.x, player.y, 5); }

    // Camera Logic
    const idealOffset = window.innerHeight * 0.4375;
    const speedShift = player.vy * 5;
    const targetCamY = player.y - idealOffset + speedShift;
    state.cameraY += (targetCamY - state.cameraY) * 0.1;

    state.depth = player.y;
    if (uiOverlay.depth) uiOverlay.depth.innerText = Math.floor(depthMm);
    if (state.depth < -60) { startShatterSequence(); return; }
    if (player.hp <= 0) { gameOver(STRINGS[state.lang].mushTitle); return; }

    uiOverlay.hpBar.style.width = `${Math.max(0, (player.hp / player.maxHp) * 100)}%`;
    player.radius = (player.baseRadius * (0.6 + (player.hp / player.maxHp) * 0.4)) * (1 + player.absorption * 0.3);

    spawnEntity();

    for (let i = entities.length - 1; i >= 0; i--) {
        const ent = entities[i];
        ent.x += ent.vx * state.timeScale;
        ent.y += ent.vy * state.timeScale;
        ent.vx *= 0.95; ent.vy *= 0.95;
        if (ent.type === 'ice' && ent.wasBlastPushed) {
            const wallW = 15;
            let hitWall = false;
            if (ent.x < wallW + ent.radius) {
                ent.x = wallW + ent.radius;
                ent.vx = Math.abs(ent.vx) * 0.6;
                hitWall = true;
            } else if (ent.x > logicalWidth - wallW - ent.radius) {
                ent.x = logicalWidth - wallW - ent.radius;
                ent.vx = -Math.abs(ent.vx) * 0.6;
                hitWall = true;
            }
            if (hitWall) {
                ent.radius *= 0.9;
                if (ent.radius < 12) {
                    entities.splice(i, 1);
                    continue;
                }
            }
        }
        const dist = Math.hypot(player.x - ent.x, player.y - ent.y);
        if (dist < player.radius + ent.radius) handleCollision(ent, i);
        else if (ent.y < state.cameraY - 200) entities.splice(i, 1);
    }
    for (let i = saltProjectiles.length - 1; i >= 0; i--) {
        const s = saltProjectiles[i]; if (!s.history) s.history = []; s.history.unshift({ x: s.x, y: s.y }); if (s.history.length > 5) s.history.pop();
        s.x += s.vx * state.timeScale; s.y += s.vy * state.timeScale; s.life -= 0.015 * state.timeScale; s.rot += s.rotVel * state.timeScale;
        if (s.life <= 0) { saltProjectiles.splice(i, 1); continue; }
        let hit = false;
        for (let j = entities.length - 1; j >= 0; j--) {
            const ent = entities[j];
            if (ent.type === 'ice' && Math.hypot(s.x - ent.x, s.y - ent.y) < ent.radius + 15) {
                ent.radius -= 5;
                for (let k = 0; k < (depthMm > 4000 ? 6 : 4); k++) {
                    particles.push({
                        x: s.x, y: s.y,
                        vx: (Math.random() - 0.5) * 10, vy: (Math.random() - 0.5) * 10,
                        size: 2, life: 0.7, rot: 0, rotVel: 0, color: '#FF5722'
                    });
                }
                if (ent.radius < 15) entities.splice(j, 1);
                hit = true; break;
            }
        }
        if (hit) saltProjectiles.splice(i, 1);
    }
    for (let i = particles.length - 1; i >= 0; i--) { const p = particles[i]; p.vy += 0.2 * state.timeScale; p.x += p.vx * state.timeScale; p.y += p.vy * state.timeScale; p.life -= 0.02 * state.timeScale; if (p.life <= 0) particles.splice(i, 1); }
    for (let i = milkTrail.length - 1; i >= 0; i--) { const m = milkTrail[i]; m.life -= 0.03 * state.timeScale; if (m.life <= 0) milkTrail.splice(i, 1); }
    const depthFactor = Math.min(1, Math.max(0, (depthMm - 4000) / 1000));
    updateComboUI(nowMs);
    audio.updateFilters(player.state === 'SOGGY', depthFactor);
}

function updateProgression(depth) {
    if (depth < 2000) state.currentStage = 'Fresh Milk';
    else if (depth < 4500) state.currentStage = 'Deep Cocoa';
    else if (depth < 5000) state.currentStage = 'The Void';
    else state.currentStage = 'The Enlightenment';
    if (depth > 4000) { const v = Math.min(0.8, (depth - 4000) / 1000 * 0.8); uiOverlay.vignette.style.background = `radial-gradient(circle, transparent ${60 - v * 40}%, rgba(0,0,0,${v}) 100%)`; } else { uiOverlay.vignette.style.background = `none`; }
    if (depth >= 5000 && !state.victoryTriggered) triggerVictory();
}

function triggerVictory() { state.victoryTriggered = true; state.isChampion = true; localStorage.setItem('dunk_isChampion', 'true'); uiOverlay.victory.classList.remove('hidden'); state.timeScale = 0.2; setTimeout(() => { state.timeScale = 1; }, 3000); }
function handleCollision(ent, idx) {
    const nowMs = getNowMs();
    const angle = Math.atan2(ent.y - player.y, ent.x - player.x);
    if (ent.type === 'ice') {
        const r = ent.radius;
        state.currentRunStats.collisions++;
        state.stats.collisions++;

        // Mint ability
        if (state.selectedCookie === 'mint' && state.mintSlowdown <= 0) {
            state.mintSlowdown = 120; // 2 seconds
        }

        let damage = 10;
        if (r < 25) damage = 10;
        else if (r < 50) damage = 25;
        else damage = 15;

        if (state.buffs.crystalArmor) damage *= 0.8;

        if (r >= 50 && Math.abs(player.vy) > 12) {
            state.currentRunStats.iceBroken++;
            state.stats.iceBroken++;
            state.buffs.crystalArmor = true; // Unlock crystal armor for this run
            updateBuffsUI();
            audio.playShatter();
            registerCollisionCombo(nowMs);
            if (player.state === 'DRY') emitCrumbs(player.x, player.y, 15);
            for (let i = 0; i < 3; i++) entities.push({ x: ent.x + (Math.random() - 0.5) * 40, y: ent.y + (Math.random() - 0.5) * 40, type: 'ice', radius: 20, vx: (Math.random() - 0.5) * 15, vy: (Math.random() - 0.5) * 15, rotation: Math.random() * 6 });
            entities.splice(idx, 1);
            return;
        }

        player.hp -= damage;
        triggerFlash();
        audio.playClink();
        registerCollisionCombo(nowMs);
        if (player.state === 'DRY') emitCrumbs(player.x, player.y, r < 25 ? 8 : 12);

        if (r < 25) {
            entities.splice(idx, 1);
        } else if (r < 50) {
            ent.vx = Math.cos(angle) * 25;
            ent.vy = Math.sin(angle) * 25;
            player.vx = -Math.cos(angle) * 10;
        } else {
            ent.vy = player.vy * 0.8;
            ent.y = player.y + player.radius + ent.radius - 5;
        }
    } else if (ent.type === 'sugar') {
        state.currentRunStats.sugar++;
        state.stats.sugarCollected++;
        applyHealing(20);
        registerSugarCombo(nowMs);
        audio.playThud();
        entities.splice(idx, 1);
    }
    else if (ent.type === 'bubble') {
        state.currentRunStats.bubbles++;
        state.stats.bubblesCollected++;
        applyHealing(8);
        player.vy = -18;
        audio.playThud();
        entities.splice(idx, 1);
    }
}

function updateBuffsUI() {
    const panel = document.getElementById('buffs-panel');
    panel.innerHTML = '';
    if (state.buffs.crystalArmor) {
        const icon = document.createElement('div');
        icon.className = 'buff-icon';
        icon.innerText = '🛡️';
        icon.title = 'Crystal Armor (-20% ice damage)';
        panel.appendChild(icon);
    }
}

function startShatterSequence() { state.isShattering = true; state.isStarted = false; uiOverlay.hud.classList.add('hidden'); player.y = window.innerHeight * 0.6; player.x = logicalWidth / 2; player.vy = -40; player.vx = (Math.random() - 0.5) * 12; }
function updateShatter() {
    state.shatterProgress++; player.vy += 0.8; player.x += player.vx; player.y += player.vy; const floorL = window.innerHeight - 100;
    if (player.y > floorL && player.shards.length === 0) { player.y = floorL; audio.playShatter(); for (let i = 0; i < 60; i++) player.shards.push({ x: player.x, y: player.y, vx: (Math.random() - 0.5) * 30, vy: -Math.random() * 25, size: 3 + Math.random() * 8, angle: Math.random() * 6, rot: (Math.random() - 0.5) * 0.4 }); }
    player.shards.forEach(s => { s.vy += 0.8; s.x += s.vx; s.y += s.vy; s.angle += s.rot; if (s.y > floorL) { s.y = floorL; s.vy *= -0.3; s.vx *= 0.6; } });
    if (state.shatterProgress > 320 && !state.isGameOver) gameOver(STRINGS[state.lang].surfTitle);
}
function gameOver(reason) {
    if (state.isGameOver) return;
    state.isGameOver = true;
    state.isStarted = false;
    state.stats.gamesPlayed++;

    saveReplay();

    uiOverlay.hud.classList.add('hidden');
    uiOverlay.gameOver.classList.remove('hidden');

    const mm = Math.max(0, Math.floor(state.depth / 20));
    uiOverlay.deathReason.innerText = (mm >= 5000 ? STRINGS[state.lang].champTitle + " " : "") + reason;
    uiOverlay.finalDepth.innerText = `${STRINGS[state.lang].finalDepth}${mm}${STRINGS[state.lang].mm}`;

    const statsList = document.getElementById('run-stats');
    if (statsList) {
        const s = state.currentRunStats;
        statsList.innerHTML = `
            <div class="stat-row"><span>Time:</span> <span class="stat-val">${Math.floor(s.time / 60)}s</span></div>
            <div class="stat-row"><span>Sugar:</span> <span class="stat-val">${s.sugar}</span></div>
            <div class="stat-row"><span>Ice Broken:</span> <span class="stat-val">${s.iceBroken}</span></div>
            <div class="stat-row"><span>Collisions:</span> <span class="stat-val">${s.collisions}</span></div>
        `;
    }

    checkAchievements();
    saveHighScore(mm);
    displayHighScores();
    document.getElementById('high-scores').classList.remove('hidden');
    audio.pauseMusic();
}

function checkAchievements() {
    const depth = Math.floor(state.depth / 20);
    ACHIEVEMENTS.forEach(a => {
        if (a.type === 'depth' && depth >= a.goal) unlockAchievement(a.id);
        if (a.type === 'sugar' && state.currentRunStats.sugar >= a.goal) unlockAchievement(a.id);
        if (a.type === 'collisions' && state.currentRunStats.collisions >= a.goal) unlockAchievement(a.id);
        if (a.type === 'iceTotal' && state.stats.iceBroken >= a.goal) unlockAchievement(a.id);
        if (a.type === 'win_mint' && state.victoryTriggered && state.selectedCookie === 'mint') unlockAchievement(a.id);
    });
}
function saveHighScore(s) { let scores = JSON.parse(localStorage.getItem('dunk_scores') || '[]'); scores.push({ date: new Date().toLocaleDateString(), score: s, cookie: state.selectedCookie }); scores.sort((a, b) => b.score - a.score); localStorage.setItem('dunk_scores', JSON.stringify(scores.slice(0, 5))); }
function displayHighScores() { const list = document.getElementById('score-list'); const scores = JSON.parse(localStorage.getItem('dunk_scores') || '[]'); list.innerHTML = scores.map(s => `<li><span>${s.score}mm (${s.cookie})</span> <span>${s.date}</span></li>`).join(''); }

function getLiquidColor(depthMm) {
    if (depthMm < 2000) return COLORS.milk; if (depthMm < 4500) { const ratio = (depthMm - 2000) / 2500; return interpolateColor(COLORS.milk, STAGES.COCOA.color, ratio); }
    const ratio = Math.min(1, (depthMm - 4500) / 1000); return interpolateColor(STAGES.COCOA.color, STAGES.VOID.color, ratio);
}
function interpolateColor(c1, c2, r) {
    const r1 = parseInt(c1.slice(1, 3), 16), g1 = parseInt(c1.slice(3, 5), 16), b1 = parseInt(c1.slice(5, 7), 16);
    const r2 = parseInt(c2.slice(1, 3), 16), g2 = parseInt(c2.slice(3, 5), 16), b2 = parseInt(c2.slice(5, 7), 16);
    const rf = Math.round(r1 + (r2 - r1) * r), gf = Math.round(g1 + (g2 - g1) * r), bf = Math.round(b1 + (b2 - b1) * r);
    return `rgb(${rf},${gf},${bf})`;
}

function draw() {
    const width = logicalWidth;
    const height = window.innerHeight;

    ctx.clearRect(0, 0, width, height); if (state.isShattering) { drawShatterScene(); return; }
    const depthMm = Math.max(0, state.depth / 20); const liquidColor = getLiquidColor(depthMm);

    ctx.save(); ctx.translate(0, -state.cameraY);
    ctx.fillStyle = liquidColor; ctx.fillRect(0, 0, width, state.cameraY + height + 10000);

    milkTrail.forEach(m => { ctx.save(); ctx.globalAlpha = m.life * 0.3; ctx.fillStyle = 'white'; ctx.filter = 'blur(10px)'; ctx.beginPath(); ctx.arc(m.x, m.y, m.radius, 0, Math.PI * 2); ctx.fill(); ctx.restore(); });
    particles.forEach(p => {
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.fillStyle = p.color || COOKIES[state.selectedCookie].color;
        ctx.globalAlpha = p.life; ctx.beginPath(); ctx.moveTo(-p.size, -p.size); ctx.lineTo(p.size, -p.size); ctx.lineTo(0, p.size); ctx.closePath(); ctx.fill(); ctx.restore();
    });
    backgroundElements.forEach(el => { ctx.save(); ctx.globalAlpha = el.opacity * (depthMm > 4000 ? 0.2 : 1); ctx.fillStyle = COOKIES[state.selectedCookie].color; ctx.beginPath(); if (el.type === 'spoon') ctx.ellipse(el.x, el.y, el.size / 4, el.size, 0.4, 0, Math.PI * 2); else ctx.arc(el.x, el.y, el.size, 0, Math.PI * 2); ctx.fill(); ctx.restore(); });

    saltProjectiles.forEach(s => {
        if (s.history && s.history.length > 1) { ctx.beginPath(); ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)'; ctx.lineWidth = 2; ctx.moveTo(s.history[0].x, s.history[0].y); for (let i = 1; i < s.history.length; i++) ctx.lineTo(s.history[i].x, s.history[i].y); ctx.stroke(); }
        ctx.save(); ctx.translate(s.x, s.y); ctx.rotate(s.rot);
        ctx.fillStyle = '#FF5722';
        ctx.shadowBlur = 8; ctx.shadowColor = '#FF5722';
        ctx.beginPath(); ctx.moveTo(0, -10); ctx.lineTo(1.5, 0); ctx.lineTo(0, 10); ctx.lineTo(-1.5, 0); ctx.closePath(); ctx.fill(); ctx.restore();
    });

    ctx.fillStyle = COLORS.wall; ctx.globalAlpha = 0.3; ctx.fillRect(0, state.cameraY - 500, 15, height + 1000); ctx.fillRect(width - 15, state.cameraY - 500, 15, height + 1000); ctx.globalAlpha = 1.0;

    entities.forEach(ent => {
        ctx.save(); ctx.translate(ent.x, ent.y); ctx.rotate(ent.rotation + (ent.type === 'sugar' ? state.time * 0.05 : 0));
        if (ent.type === 'sugar') { ctx.fillStyle = COLORS.sugar; ctx.shadowBlur = 10; ctx.shadowColor = COLORS.sugar; ctx.beginPath(); const s = ent.radius; ctx.moveTo(0, -s); ctx.lineTo(s, 0); ctx.lineTo(0, s); ctx.lineTo(-s, 0); ctx.closePath(); ctx.fill(); ctx.shadowBlur = 0; }
        else if (ent.type === 'bubble') { const w = Math.sin(state.time * 0.1) * 3; ctx.strokeStyle = COLORS.bubble; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, 0, ent.radius + w, 0, Math.PI * 2); ctx.stroke(); ctx.fillStyle = 'rgba(178,235,242,0.2)'; ctx.fill(); ctx.fillStyle = 'white'; ctx.beginPath(); ctx.arc(-ent.radius * 0.3, -ent.radius * 0.3, ent.radius * 0.15, 0, Math.PI * 2); ctx.fill(); }
        else { ctx.fillStyle = COLORS.ice; ctx.beginPath(); const s = ent.radius > 50 ? 8 : (ent.radius < 25 ? 5 : 6); for (let i = 0; i < s; i++) { const a = i * Math.PI * 2 / s; const r = ent.radius * (0.8 + Math.sin(i * 2.2 + state.time * 0.02) * 0.15); ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); } ctx.closePath(); ctx.fill(); } ctx.restore();
    });

    const stats = COOKIES[state.selectedCookie]; ctx.save(); const abs = player.absorption;
    if (depthMm > 5000) { ctx.shadowBlur = 20 + Math.sin(state.time * 0.1) * 10; ctx.shadowColor = 'white'; } else if (abs > 0.05) { ctx.shadowBlur = 10 + abs * 40; ctx.shadowColor = stats.softColor; }
    const coreG = ctx.createRadialGradient(player.x, player.y, 0, player.x, player.y, player.radius); coreG.addColorStop(0, depthMm > 5000 ? '#fff' : stats.softColor); coreG.addColorStop(1, depthMm > 5000 ? '#ffeb3b' : stats.color);
    ctx.fillStyle = coreG; ctx.beginPath();
    const isCracker = state.selectedCookie === 'cracker';
    for (let i = 0; i <= 72; i++) {
        const baseAngle = (i / 72) * Math.PI * 2; const angle = baseAngle + player.rotation; let r = player.radius;
        if (isCracker) { r -= Math.abs(Math.sin(baseAngle * 10)) * 5; } else { r += Math.sin(state.time * 0.08 + i * 1.8) * (abs * 12); }
        const px = player.x + Math.cos(angle) * r; const py = player.y + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.closePath(); ctx.fill();
    if (isCracker) { ctx.fillStyle = 'rgba(0,0,0,0.15)'; const pD = player.radius * 0.4;[[-1, -1], [1, -1], [-1, 1], [1, 1], [0, 0]].forEach(pos => { ctx.save(); ctx.translate(player.x, player.y); ctx.rotate(player.rotation); ctx.beginPath(); ctx.arc(pos[0] * pD, pos[1] * pD, 2.5, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }); }

    if (state.combo.waveTimer > 0) {
        const waveProgress = 1 - (state.combo.waveTimer / 28);
        const waveRadius = 40 + waveProgress * 220;
        ctx.save();
        ctx.globalAlpha = Math.max(0, 0.75 - waveProgress * 0.75);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.arc(player.x, player.y, waveRadius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
    }

    if (state.combo.flashTimer > 0) {
        const flashAlpha = state.combo.flashTimer / 18;
        ctx.save();
        ctx.globalAlpha = flashAlpha;
        ctx.strokeStyle = '#ffe066';
        ctx.lineWidth = 8;
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#ffd54f';
        ctx.beginPath();
        ctx.arc(player.x, player.y, player.radius + 10, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
    }

    ctx.restore(); ctx.restore();
}

function drawShatterScene() {
    const w = logicalWidth;
    const h = window.innerHeight;
    ctx.fillStyle = COLORS.roomBg; ctx.fillRect(0, 0, w, h);
    const recY = state.shatterProgress * 18; const stY = h * 0.6;
    if (stY + recY < h + 600) { ctx.save(); ctx.translate(0, stY + recY); ctx.fillStyle = COLORS.milk; ctx.fillRect(80, 0, w - 160, h); ctx.strokeStyle = '#dcdde1'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(80, 0); ctx.lineTo(w - 80, 0); ctx.stroke(); ctx.fillStyle = COLORS.wall; ctx.globalAlpha = 0.5; ctx.fillRect(70, 0, 10, h); ctx.fillRect(w - 80, 0, 10, h); ctx.restore(); }
    ctx.fillStyle = COLORS.floor; ctx.fillRect(0, h - 100, w, 100);
    if (player.shards.length === 0) {
        ctx.fillStyle = COOKIES[state.selectedCookie].color; const isC = state.selectedCookie === 'cracker'; ctx.save(); ctx.translate(player.x, player.y); ctx.rotate(player.rotation);
        ctx.beginPath(); if (isC) { for (let i = 0; i <= 72; i++) { const a = (i / 72) * Math.PI * 2; const r = player.radius - Math.abs(Math.sin(a * 10)) * 5; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); } } else ctx.arc(0, 0, player.radius, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    } else { player.shards.forEach(s => { ctx.save(); ctx.translate(s.x, s.y); ctx.rotate(s.angle); ctx.fillStyle = COOKIES[state.selectedCookie].color; ctx.beginPath(); ctx.moveTo(-s.size, -s.size); ctx.lineTo(s.size, -s.size); ctx.lineTo(0, s.size); ctx.closePath(); ctx.fill(); ctx.restore(); }); }
}

function gameLoop() { update(); draw(); requestAnimationFrame(gameLoop); }

init();