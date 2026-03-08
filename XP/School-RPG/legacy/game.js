// === SCHOOL RPG: IE8 OPTIMIZED JAVASCRIPT ===
// Полная оптимизация для Internet Explorer 8

if (!window.console) {
    window.console = { log: function () { }, warn: function () { }, error: function () { } };
}

// === IE6 COMPATIBILITY POLYFILLS ===
// Patch textContent for IE6 compatibility
if (typeof document !== 'undefined') {
    var testDiv = document.createElement('div');
    if (typeof testDiv.textContent === 'undefined') {
        // IE6/IE7: textContent not supported, use innerText
        Element = window.Element || function() {};
        Element.prototype.textContent = Element.prototype.innerText || '';
    }
}

// === FIREBASE TIMEOUT FALLBACK SYSTEM ===
// 5-second timeout to fall back to local mode if Firebase doesn't connect
window.firebaseReady = false;
window.useLocalMode = false;
window.firebaseTimeoutId = null;

function initFirebaseTimeout() {
    // Wait 5 seconds for Firebase to connect
    window.firebaseTimeoutId = setTimeout(function () {
        if (!window.firebaseReady) {
            window.useLocalMode = true;
            window.firebaseTimeoutTriggered = true;
            console.warn("Firebase timeout - switching to local mode");
            showConnectionStatus("offline");
        }
    }, 5000);
}

function showConnectionStatus(status) {
    var statusEl = document.getElementById('connection-status');
    if (!statusEl) return;

    if (status === "connecting") {
        statusEl.innerHTML = "[~] Подключение...";
        statusEl.style.display = "inline";
    } else if (status === "online") {
        statusEl.innerHTML = "[OK] Онлайн";
        statusEl.style.display = "inline";
        setTimeout(function () {
            statusEl.style.display = "none";
        }, 3000);
    } else if (status === "offline") {
        statusEl.innerHTML = "[L] Локальный режим";
        statusEl.style.display = "inline";
    }
}

// Start Firebase timeout on page load
if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", initFirebaseTimeout);
} else if (document.attachEvent) {
    document.attachEvent("onreadystatechange", function () {
        if (document.readyState === "complete") {
            initFirebaseTimeout();
        }
    });
}

// === MATH LOOKUP TABLES ===
var TRIG_SAMPLES = 360;
var SIN_TABLE = new Array(TRIG_SAMPLES);
var COS_TABLE = new Array(TRIG_SAMPLES);
(function () {
    for (var i = 0; i < TRIG_SAMPLES; i++) {
        var rad = (i * Math.PI * 2) / TRIG_SAMPLES;
        SIN_TABLE[i] = Math.sin(rad);
        COS_TABLE[i] = Math.cos(rad);
    }
})();

function getSin(rad) {
    var deg = ((rad * 180 / Math.PI) % 360 + 360) % 360;
    return SIN_TABLE[deg | 0];
}

function getCos(rad) {
    var deg = ((rad * 180 / Math.PI) % 360 + 360) % 360;
    return COS_TABLE[deg | 0];
}

// === GLOBAL ERROR HANDLER FOR IE6 ===
window.onerror = function (msg, url, line) {
    if (window.console && console.log) {
        console.log('Error: ' + msg + ' at ' + url + ':' + line);
    }
    return true;
};

// === LOCALIZATION & SOUND ===
var CONFIG = { lang: 'ru', muted: false };

// Инициализация конфигурации из cookies
(function () {
    var langCookie = getCookie('school_rpg_lang');
    var mutedCookie = getCookie('school_rpg_muted');
    if (langCookie) CONFIG.lang = langCookie;
    if (mutedCookie === 'true') CONFIG.muted = true;
})();

// Cookie helpers
function getCookie(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return unescape(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function setCookie(name, value, days) {
    days = days || 365;
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = '; expires=' + date.toGMTString();
    document.cookie = name + '=' + escape(value) + expires + '; path=/';
}

// localStorage replacement using cookies for IE8
var cookieStorage = {
    getItem: function (key) {
        return getCookie(key);
    },
    setItem: function (key, value) {
        setCookie(key, value, 365);
    },
    removeItem: function (key) {
        setCookie(key, '', -1);
    }
};

function createStorageAdapter() {
    try {
        if (window.localStorage && localStorage.getItem && localStorage.setItem) {
            var probeKey = '__school_rpg_probe__';
            localStorage.setItem(probeKey, '1');
            localStorage.removeItem(probeKey);
            return localStorage;
        }
    } catch (e) { }
    return cookieStorage;
}

// Use cookie storage when localStorage is unavailable or broken
var storage = createStorageAdapter();

var STRINGS = {
    ru: {
        title: " ШКОЛЬНАЯ РПГ ", sub: "Ultimate Edition", sub2: "Ranked Fix: Precise Balance",
        auth_title: "Вход / Регистрация (Любой режим)", name_pl: "Имя (Логин)", pass_pl: "Пароль (для защиты)", btn_go: "ВОЙТИ / СОЗДАТЬ",
        m_story: "СЮЖЕТ", m_story_desc: "Уровень",
        m_pvp: "PvP", m_pvp_desc: "Игрок vs Игрок (1 экран)",
        m_endless: "БЕСКОНЕЧНЫЙ", m_endless_desc: "Выживание без лечения",
        m_shop: "МАГАЗИН СКИНОВ", m_shop_desc: "Трать RP на образы",
        m_daily: "ЕЖЕДНЕВНЫЙ БОНУС", daily_desc: "Заходи и получай RP!",
        m_bosses: "ОТДЕЛЬНЫЕ БОССЫ",
        menu_modes: "РЕЖИМЫ",
        m_lb: "Таблица рекордов (Fair Play)", m_save: "Сохранить в файл", m_load: "Загрузить из файла", m_reset: "Сбросить прогресс",
        hp: "HP", mp: "MP", level: "УРОВЕНЬ", pvp_duel: "PvP ДУЭЛЬ", round: "РАУНД",
        battle_start: "Бой начинается!",
        win: "ПОБЕДА!", lose: "ПОТРАЧЕНО", draw: "НИЧЬЯ",
        you: "Ты", enemy: "Враг", p1: "Игрок 1", p2: "Игрок 2",
        used: "использует",
        menu_btn: "Меню", equation: "УРАВНЕНИЕ",
        blocks_path: "преградил(а) путь!",
        sk_0: "Подзатыльник", sk_1: "Фокус", sk_2: "Удар Ранцем", sk_3: "Звонок Маме",
        it_0: "Пирожок", it_1: "Шпора",
        en_egor: "Егор", en_vadim: "Вадим", en_marivanna: "Марьванна", en_larisa: "Лариса О.", en_director: "Дмитрий С.", en_music: "Лилия В.", en_natalia: "Наталья В.", en_makar: "Макар", en_baba: "Баба Валя",
        tit_shkolnik: "Школьник", tit_starshak: "Старшак", tit_zavuch: "ЗАВУЧ", tit_math: "МАТЕМАТИЧКА", tit_pupa: "ДИРЕКТОР", tit_music: "УЧИТЕЛЬ МУЗЫКИ", tit_scream: "КРИКУНЬЯ", tit_small: "МЕЛКИЙ ШКЕТ", tit_cleaner: "УБОРЩИЦА",
        boss_larisa: "Лариса Олеговна", boss_director: "Дмитрий Сергеевич", boss_music: "Лилия Васильевна", boss_natalia: "Наталья Викторовна",
        desc_larisa: "Математичка - Уравнения", desc_director: "Директор - Власть", desc_music: "Учитель Музыки - Песни", desc_natalia: "Крикунья - СПАМ X!", desc_makar: "Мелкий - Быстрый",
        p1_win: "ИГРОК 1 ПОБЕДИЛ!", p2_win: "ИГРОК 2 ПОБЕДИЛ!", nice_fight: "Славная битва!", rematch: "РЕВАНШ",
        sudden: "ВНЕЗАПНО...", baba_desc: "Появляется Баба Валя, недовольная шумом!", to_battle: "В БОЙ!",
        next_lvl: "СЛЕДУЮЩИЙ >>", game_beat: "Ты прошёл школу жизни!", game_beat_desc: "Поздравляем! Ты свободен.",
        wasted_desc: "Не расстраивайся, в школе всегда так.", try_again: "ЗАНОВО", menu: "В МЕНЮ", hp_bonus: " (+HP)",
        scream_start: "НАТАЛЬЯ НАЧИНАЕТ КРИЧАТЬ!", recover: "Ты приходишь в себя...", equation_atk: "Уравнение атакует!", stunned: "ОГЛУШЁН!", baba_plan: "Баба Валя что-то замышляет...",
        test_atk: "КОНТРОЛЬНАЯ! (-MP, -HP)", minion_spawn: "Появилось Живое Уравнение!",
        scream_title: "БИТВА КРИКОВ!", scream_instr: "ЖМИ КНОПКУ ЧТОБЫ ОРАТЬ!", scream_reflect: "ОТРАЖЕНО! Урон ", scream_fail: "КРИК СНЕС ТЕБЯ! -", scream_end: "Битва криков окончена!", baba_hit: "Ай! Не мешайся под ногами!",
        lb_title: "ТАБЛИЦА РЕКОРДОВ", lb_name: "Имя", lb_enemy: "Режим/Враг", lb_pts: "Очки", lb_all: "Все записи", lb_wins: "Только победы", lb_losses: "Только поражения", lb_close: "ЗАКРЫТЬ", lb_offline: "--- РЕЖИМ ОФФЛАЙН ---", lb_empty: "Записей нет.", lb_load_more: "ПОКАЗАТЬ ЕЩЁ (100)",
        endless_title: "БЕСКОНЕЧНЫЙ РЕЖИМ", endless_sub: "Выберите противника. HP/MP не восстанавливаются!", endless_rand: "Случайные", endless_cancel: "ОТМЕНА",
        reset_confirm: "Сбросить прогресс? (Рекорды останутся)",
        hc_title: "Вы уверены? Будет больно.", hc_yes: "Да, я готов(а)", hc_no: "Нет, я передумал(а)",
        d_egor: "Слушай, уйди, а? Если я не допишу его сочинение, меня в раздевалке закроют... И тетя Лариса съест за четверку!",
        d_vadim: "Зачем тронул Егора? Сотка есть? Нет? Тогда готовься к уроку школьной жизни! Завуч уже знает, что ты тут мутишь...",
        d_larisa: "Ты плохо влияешь на моего племянника! Он должен учиться, а не смотреть на твои выходки. Время интегралов!",
        d_makar: "Не поймаешь, тормоз! Я всё бабушке расскажу, и тебя завтра отчислят!",
        d_zavuch: "Макар, иди в кабинет, поешь суп... А ты... Твое личное дело уже у меня. Сейчас я выбью из тебя эту дурь!",
        d_music_adv: "Лилия Васильевна сказала: Просто кричи сильнее её! И уничтожишь её почти без реального боя!",
        d_music_boss: "Музыка должна звучать вечно. Ты — лишь шум, который я обязана заглушить своим искусством.",
        d_director: "Я... я провожу важное совещание! Живо в класс, иначе последствия будут крайне серьезными. Твоё поведение недопустимо.",
        d_baba: "Опять наследили! Я только что помыла! Сейчас я тобой пол протру!",
        d_director_win: "Спасибо... я просто хотел тишины... Но она... она не прощает пыль на подоконниках...",
        d_hint: "Кликни по экрану, чтобы продолжить...",
        dh_egor: "Егор? Забудь это имя. Я скормлю Вадима тете Ларисе, а тебя — им обоим, лишь бы этот кошмар закончился! В этой школе выживает только самый подлый!",
        dh_vadim: "Завуч боится меня, Директор прячется... А ты — просто кошелек на ножках. Я вытрясу из тебя не только сотку, но и всю душу!",
        dh_larisa: "Человечность — это погрешность. Мой племянник — неудачный эксперимент. А ты — ноль, на который я сейчас тебя разделю!",
        dh_makar: "Я вижу всё! Я знаю, где ты прячешься! Бабушка сотрет тебя в порошок, а я буду смеяться, глядя на твои слезы!",
        dh_zavuch: "Директор — жалкая марионетка. Я здесь закон! Макар — мои глаза, а ты — мусор, который я вымету из этой школы навсегда!",
        dh_music_adv: "Лилия Васильевна сказала: Ори так, чтобы у неё лопнули барабанные перепонки! Пусть её агония станет твоим финальным аккордом!",
        dh_music_boss: "Тишина — это единственная идеальная музыка. Я заставлю тебя замолчать навечно, и твой затухающий пульс станет моей последней нотой.",
        dh_director: "Мне не нужны подачки! Мне нужно полное подчинение! Эта школа — моя тюрьма, и я — ваш надзиратель. Живым из этого кабинета никто не выйдет!",
        dh_baba: "Пол залит кровью и слезами прошлых героев. Я вычистила школу от сотен таких, как ты. Ты просто кусок мусора, который пора сжечь в котельной!",
        daily_title: "ЕЖЕДНЕВНЫЕ НАГРАДЫ",
        daily_claim: "ЗАБРАТЬ",
        daily_claimed: "УЖЕ ПОЛУЧЕНО (Ждите завтра)",
        daily_streak_bonus: "БОНУС СЕРИИ",
        rp_balance: "БАЛАНС",
        close: "ЗАКРЫТЬ",
        day: "День",
        shop_desc: "Трать RP на образы",
        daily_desc: "Заходи и получай RP!"
    },
    en: {
        title: " SCHOOL RPG ", sub: "Ultimate Edition", sub2: "Ranked Fix: Precise Balance",
        auth_title: "Login / Register", name_pl: "Name (Login)", pass_pl: "Password (Optional)", btn_go: "LOGIN / CREATE",
        m_story: "STORY", m_story_desc: "Level",
        m_pvp: "PvP", m_pvp_desc: "Local Multiplayer",
        m_endless: "ENDLESS", m_endless_desc: "Survival (No Heals)",
        m_shop: "SKIN SHOP", m_shop_desc: "Spend RP on Skins",
        m_daily: "DAILY BONUS", daily_desc: "Login daily for RP!",
        m_bosses: "BOSS BATTLES",
        menu_modes: "MODES",
        m_lb: "Leaderboard", m_save: "Export Save", m_load: "Import Save", m_reset: "Reset Progress",
        hp: "HP", mp: "MP", level: "LEVEL", pvp_duel: "PvP DUEL", round: "ROUND",
        battle_start: "Battle Starts!",
        win: "VICTORY!", lose: "WASTED", draw: "DRAW",
        you: "You", enemy: "Enemy", p1: "Player 1", p2: "Player 2",
        used: "uses",
        menu_btn: "Menu", equation: "EQUATION",
        blocks_path: "blocks your path!",
        sk_0: "Slap", sk_1: "Focus", sk_2: "Backpack Hit", sk_3: "Call Mom",
        it_0: "Pie", it_1: "Cheat Sheet",
        en_egor: "Egor", en_vadim: "Vadim", en_marivanna: "Mary", en_larisa: "Mrs. Larisa", en_director: "The Principal", en_music: "Music Teacher", en_natalia: "Screamer", en_makar: "Makar", en_baba: "Cleaner Valya",
        tit_shkolnik: "Schoolboy", tit_starshak: "Bully", tit_zavuch: "HEAD TEACHER", tit_math: "MATH TEACHER", tit_pupa: "PRINCIPAL", tit_music: "MUSIC TEACHER", tit_scream: "THE SCREAMER", tit_small: "LITTLE KID", tit_cleaner: "THE CLEANER",
        boss_larisa: "Mrs. Larisa", boss_director: "Mr. Dmitry", boss_music: "Mrs. Lilia", boss_natalia: "Mrs. Natalia",
        desc_larisa: "Math - Equations", desc_director: "Principal - Power", desc_music: "Music - Songs", desc_natalia: "Screamer - SPAM X!", desc_makar: "Small - Fast",
        p1_win: "PLAYER 1 WINS!", p2_win: "PLAYER 2 WINS!", nice_fight: "Nice fight!", rematch: "REMATCH",
        sudden: "SUDDENLY...", baba_desc: "Cleaner Valya appears, angry at the noise!", to_battle: "FIGHT!",
        next_lvl: "NEXT >>", game_beat: "You beat the School of Life!", game_beat_desc: "Congrats! You are free.",
        wasted_desc: "Don't worry, school is always like this.", try_again: "TRY AGAIN", menu: "MENU", hp_bonus: " (+HP)",
        scream_start: "NATALIA STARTS SCREAMING!", recover: "You recover...", equation_atk: "Equation attacks!", stunned: "STUNNED!", baba_plan: "Cleaner Valya is plotting something...",
        test_atk: "FINAL TEST! (-MP, -HP)", minion_spawn: "A Living Equation appears!",
        scream_title: "SCREAM BATTLE!", scream_instr: "PRESS BUTTON TO SCREAM!", scream_reflect: "REFLECTED! Damage ", scream_fail: "SCREAM BLEW YOU AWAY! -", scream_end: "Scream battle is over!", baba_hit: "Ouch! Don't get under my feet!",
        lb_title: "LEADERBOARD", lb_name: "Name", lb_enemy: "Mode/Enemy", lb_pts: "PTS", lb_all: "All Records", lb_wins: "Only Wins", lb_losses: "Only Losses", lb_close: "CLOSE", lb_offline: "--- OFFLINE MODE ---", lb_empty: "No records.", lb_load_more: "LOAD MORE (100)",
        endless_title: "ENDLESS MODE", endless_sub: "Choose opponent. No HP/MP regen!", endless_rand: "Random", endless_cancel: "CANCEL",
        reset_confirm: "Reset progress? (Records will remain)",
        hc_title: "Are you sure? It will hurt.", hc_yes: "Yes, I am ready", hc_no: "No, I changed my mind",
        d_egor: "Please, go away! If I don't finish his essay, they'll lock me up... and Aunt Larisa will eat me alive for a C!",
        d_vadim: "Why did you touch Egor? Got a hundred? No? Then get ready for a lesson in school life! The Head Teacher already knows...",
        d_larisa: "You're a bad influence on my nephew! He should study, not watch you. Time for some integrals!",
        d_makar: "Can't catch me! I'll tell my grandma, and you'll be expelled tomorrow!",
        d_zavuch: "Makar, go to the office and eat some soup... As for you... Your file is on my desk. I'll beat this nonsense out of you!",
        d_music_adv: "Mrs. Lilia said: Just scream louder than her! And you will destroy her almost without a real fight!",
        d_music_boss: "Music must sound forever. You are just noise that I must silence with my art.",
        d_director: "I'm... holding an important meeting! Go to class immediately, or the consequences will be extremely serious. Your behavior is unacceptable.",
        d_baba: "Trampled again! I just mopped! I'll wipe the floor with you now!",
        d_director_win: "Thank you... I just wanted some quiet... But she... she doesn't forgive dust on the windowsills...",
        d_hint: "Click anywhere to continue...",
        dh_egor: "Egor? Forget that name. I'll feed Vadim to Aunt Larisa, and you to both of them, just to end this nightmare! Only the most vicious survive here!",
        dh_vadim: "The Head Teacher is afraid of me, the Principal hides... And you're just a walking wallet. I'll squeeze more than a hundred out of you!",
        dh_larisa: "Humanity is an error. My nephew is a failed experiment. And you are the zero I'm about to divide you by!",
        dh_makar: "I see everything! I know where you sleep! Grandma will crush you, and I'll be the one laughing at your tears!",
        dh_zavuch: "The Principal is a pathetic puppet. I am the law! Makar is my eyes, and you are trash I'll sweep out of this school forever!",
        dh_music_adv: "Mrs. Lilia said: Scream until her eardrums burst! Let her agony be your final chord!",
        dh_music_boss: "Silence is the only perfect harmony. I will silence you forever, and your fading pulse will be my last note.",
        dh_director: "I don't need cookies! I need absolute submission! This school is my prison, and I am the warden. No one leaves my office alive!",
        dh_baba: "This floor is stained with the tears of past heroes. I've cleaned out hundreds like you. You're just more trash for the furnace!",
        daily_title: "DAILY REWARDS",
        daily_claim: "CLAIM",
        daily_claimed: "ALREADY CLAIMED (Wait for tomorrow)",
        daily_streak_bonus: "STREAK BONUS",
        rp_balance: "BALANCE",
        close: "CLOSE",
        day: "Day",
        shop_desc: "Spend RP on Skins",
        daily_desc: "Login daily for RP!"
    }
};

function t(key) {
    return STRINGS[CONFIG.lang][key] || key;
}

function toggleLang() {
    CONFIG.lang = CONFIG.lang === 'ru' ? 'en' : 'ru';
    setCookie('school_rpg_lang', CONFIG.lang, 365);
    var langBtn = document.getElementById('lang-btn');
    if (langBtn) langBtn.textContent = CONFIG.lang.toUpperCase();
    updateAllTexts();
    window.location.reload();
}

function updateAllTexts() {
    var pageTitle = document.getElementById('page-title');
    if (pageTitle) pageTitle.textContent = t('title') + ': Ultimate';

    var menuTitle = document.getElementById('menu-title');
    if (menuTitle) menuTitle.innerHTML = t('title') + '<br>' + t('sub');

    var shopName = document.getElementById('shop-name');
    if (shopName) shopName.textContent = t('m_shop');
    var shopDesc = document.getElementById('shop-desc');
    if (shopDesc) shopDesc.textContent = t('shop_desc');

    var dailyName = document.getElementById('daily-name');
    if (dailyName) dailyName.textContent = t('m_daily') || 'ЕЖЕДНЕВНЫЙ БОНУС';
    var dailyDesc = document.getElementById('daily-desc');
    if (dailyDesc) dailyDesc.textContent = t('daily_desc');

    var dailyTitle = document.getElementById('daily-title');
    if (dailyTitle) dailyTitle.textContent = t('daily_title');

    var shopBalance = document.getElementById('shop-balance');
    if (shopBalance) shopBalance.innerHTML = t('rp_balance') + ': <span id="shop-rp-display">' + userProfile.rp + '</span> RP';

    // Update close buttons using for loop instead of forEach
    var modalBtns = document.getElementsByClassName('modal-btn');
    for (var i = 0; i < modalBtns.length; i++) {
        var btn = modalBtns[i];
        var btnText = getNodeText(btn);
        if (btnText.indexOf('ЗАКРЫТЬ') !== -1 || btnText.indexOf('CLOSE') !== -1) {
            setNodeText(btn, t('close'));
        }
    }
}

// === SOUND SYSTEM (IE8 Compatible) ===
// Singleton AudioContext to avoid recreation overhead
var _audioCtx = null;
function getAudioCtx() {
    try {
        if (!_audioCtx && (window.AudioContext || window.webkitAudioContext)) {
            _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
    } catch (e) { }
    return _audioCtx;
}

var Sound = {
    muted: false,
    playTone: function (freq, type, duration, vol) {
        if (this.muted || CONFIG.muted) return;
        var audioCtx = getAudioCtx();
        if (!audioCtx) return;

        try {
            vol = vol || 0.1;
            var osc = audioCtx.createOscillator();
            var gain = audioCtx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
            gain.gain.setValueAtTime(vol, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + duration);
        } catch (e) {
            // Silent fail for IE8
        }
    },
    hit: function () {
        var self = this;
        this.playTone(150, 'sawtooth', 0.1, 0.2);
        setTimeout(function () { self.playTone(100, 'square', 0.1, 0.2); }, 50);
    },
    attack: function () { this.playTone(300, 'square', 0.05, 0.1); },
    heal: function () {
        if (CONFIG.muted) return;
        var audioCtx = getAudioCtx();
        if (!audioCtx) return;
        try {
            var osc = audioCtx.createOscillator();
            var gain = audioCtx.createGain();
            osc.frequency.setValueAtTime(400, audioCtx.currentTime);
            osc.frequency.linearRampToValueAtTime(800, audioCtx.currentTime + 0.3);
            gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.3);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.3);
        } catch (e) { }
    },
    click: function () { this.playTone(600, 'sine', 0.05, 0.05); },
    win: function () {
        this.playTone(500, 'square', 0.1);
        var self = this;
        setTimeout(function () { self.playTone(700, 'square', 0.2); }, 150);
        setTimeout(function () { self.playTone(900, 'square', 0.4); }, 300);
    },
    lose: function () {
        this.playTone(400, 'sawtooth', 0.3);
        setTimeout(function () { Sound.playTone(300, 'sawtooth', 0.3); }, 300);
    }
};

function toggleMute() {
    CONFIG.muted = !CONFIG.muted;
    storage.setItem('school_rpg_muted', CONFIG.muted ? 'true' : 'false');
    var muteBtn = document.getElementById('mute-btn');
    if (muteBtn) muteBtn.textContent = CONFIG.muted ? '(X)' : '(O)';
}

// === SKINS DATA ===
var SKINS = [
    { id: 'default', icon: 'O', cost: 0, name: 'Ученик', name_en: 'Student' },
    { id: 'nerd', icon: 'X', cost: 500, name: 'Ботан', name_en: 'Nerd' },
    { id: 'muscles', icon: 'M', cost: 1200, name: 'Качок', name_en: 'Jock' },
    { id: 'cool', icon: 'C', cost: 2500, name: 'Крутой', name_en: 'Cool Guy' },
    { id: 'robot', icon: 'R', cost: 4000, name: 'Робот', name_en: 'Robot' },
    { id: 'custom', icon: '?', cost: 10000, name: 'СВОЁ ФОТО', type: 'image', name_en: 'CUSTOM PHOTO' }
];

// === CONSTANTS ===
var PLAYER_MAX_HP = 120;
var PLAYER_MAX_MP = 100;

// === ENEMIES DATA ===
var STORY_ENEMIES = [
    { name: "Егор", title: "Школьник", hp: 150, sprite: "E", phases: { 100: "E", 50: "e", 20: "x" }, xp_txt: "Егор убежал жаловаться!", xp_txt_en: "Egor ran to complain!", moves: [{ name: "Плюнуть", dmg: [8, 12], msg: "Егор плюётся!", msg_en: "Egor spits!" }, { name: "Нытье", drain: 15, msg: "Егор ноет! Ты теряешь MP.", msg_en: "Egor whines! You lose MP." }, { name: "Удар линейкой", dmg: [12, 18], msg: "Егор достаёт линейку!", msg_en: "Egor pulls out a ruler!" }] },
    { name: "Вадим", title: "Старшак", hp: 250, sprite: "V", phases: { 100: "V", 50: "v", 20: "x" }, xp_txt: "Вадим отдал мелочь и ушёл.", xp_txt_en: "Vadim gave back the change and left.", moves: [{ name: "Бычка", dmg: [15, 25], msg: "Вадим быкует!", msg_en: "Vadim bullies you!" }, { name: "Подсечка", dmg: [10, 15], stun: 0.3, msg: "Вадим делает подсечку!", msg_en: "Vadim trips you!" }, { name: "Энергетик", heal: [20, 30], msg: "Вадим пьёт энергетик.", msg_en: "Vadim drinks an energy drink." }] },
    { name: "Марьванна", title: "ЗАВУЧ", hp: 400, sprite: "M", phases: { 100: "M", 50: "m", 20: "x" }, xp_txt: "Школа захвачена! Ты герой!", xp_txt_en: "School is taken over! You are a hero!", moves: [{ name: "КРИК", dmg: [20, 30], msg: "ГРОМКИЙ КРИК!", msg_en: "LOUD SCREAM!" }, { name: "Двойка", dmg: [35, 50], msg: "Критический удар по будущему!", msg_en: "Critical hit on your future!" }, { name: "Вызов родителей", dmg: [60, 80], msg: "ОНА ЗВОНИТ РОДИТЕЛЯМ!", msg_en: "SHE IS CALLING YOUR PARENTS!" }] }
];

var EXTRA_BOSSES = {
    larisa: { name: "Лариса Олеговна", title: "МАТЕМАТИЧКА", hp: 350, sprite: "L", phases: { 100: "L", 50: "l", 20: "x" }, special: "equation", equationBar: 0, equationMax: 100, equationPerTurn: 15, equationPerSecond: 2, xp_txt: "Лариса Олеговна отпустила тебя!", xp_txt_en: "Mrs. Larisa let you go!", moves: [{ name: "Мелом в лоб", dmg: [12, 18], msg: "Летит мел!", msg_en: "Chalk incoming!" }, { name: "Сложная задача", dmg: [15, 22], drain: 10, msg: "Мозг кипит!", msg_en: "Brain overheat!" }, { name: "Двойка", dmg: [20, 30], msg: "Двойка в журнал!", msg_en: "F grade in the register!" }] },
    director: { name: "Дмитрий Сергеевич", title: "ДИРЕКТОР", hp: 500, sprite: "D", phases: { 100: "D", 50: "d", 20: "x" }, special: "director", xp_txt: "Директор пожал тебе руку!", xp_txt_en: "The Director shook your hand!", customItems: [{ name: "Пирожок", heal: 60 }, { name: "Вера в себя", buff: 1.5 }], customInventory: [2, 1], moves: [{ name: "Выговор", dmg: [18, 28], msg: "Директор делает выговор!", msg_en: "Director reprimands you!" }, { name: "Печать", dmg: [30, 45], msg: "Угрожает отчислением!", msg_en: "Threatens expulsion!" }, { name: "На ковёр", dmg: [25, 35], drain: 15, msg: "Вызывает на ковёр!", msg_en: "Calls you to the office!" }, { name: "Указ", heal: [40, 60], msg: "Директор восстанавливается!", msg_en: "Director restores health!" }] },
    music: { name: "Лилия Васильевна", title: "УЧИТЕЛЬ МУЗЫКИ", hp: 280, sprite: "S", phases: { 100: "S", 50: "s", 20: "x" }, special: "music", drainPerSecond: 2, xp_txt: "Поставила пятёрку!", xp_txt_en: "Gave you an A!", moves: [{ name: "Высокая нота", dmg: [10, 15], msg: "Ла-ла-ЛААА!", msg_en: "La-la-LAAA!" }, { name: "Припев", dmg: [8, 12], hits: 2, msg: "Поёт два раза!", msg_en: "Sings twice!" }, { name: "Соло", dmg: [20, 30], msg: "Мощное соло!", msg_en: "Powerful solo!" }, { name: "Колыбельная", dmg: [5, 10], stun: 0.4, msg: "Баю-бай...", msg_en: "Hush little baby..." }] },
    natalia: { name: "Наталья Викторовна", title: "КРИКУНЬЯ", hp: 320, sprite: "N", phases: { 100: "N", 50: "n", 20: "x" }, special: "scream", screamChance: 0.35, xp_txt: "Наталья потеряла голос!", xp_txt_en: "Natalia lost her voice!", moves: [{ name: "Замечание", dmg: [12, 18], msg: "Делает замечание!", msg_en: "Makes a remark!" }, { name: "Претензия", dmg: [15, 22], msg: "Высказывает претензии!", msg_en: "Expresses complaints!" }, { name: "Угроза", dmg: [20, 28], drain: 8, msg: "Угрожает последствиями!", msg_en: "Threatens consequences!" }] },
    makar: { name: "Макар", title: "МЕЛКИЙ ШКЕТ", hp: 180, sprite: "m", phases: { 100: "m", 50: "w", 20: "x" }, special: "dodge", dodgeChance: 0.35, multiAttack: true, xp_txt: "Макар убежал плакать!", xp_txt_en: "Makar ran away crying!", moves: [{ name: "Пинок", dmg: [5, 8], msg: "Пинается!", msg_en: "Kicks!" }, { name: "Укус", dmg: [6, 10], msg: "Кусается!", msg_en: "Bites!" }, { name: "Плевок", dmg: [4, 7], msg: "Плюётся!", msg_en: "Spits!" }] },
    baba_valya: { name: "Баба Валя", title: "УБОРЩИЦА", hp: 666, sprite: "B", phases: { 100: "B", 50: "b", 20: "x" }, special: "baba_valya", isBabaValya: true, xp_txt: "Баба Валя ушла... оставив за собой идеальную чистоту.", xp_txt_en: "Cleaner Valya left... leaving behind perfect cleanliness.", moves: [{ name: "Мокрая Тряпка", dmg: [30, 40], msg: "Баба Валя запускает в тебя мокрой тряпкой!", msg_en: "Throws a wet rag at you!" }, { name: "Удар Шваброй", dmg: [40, 55], stun: 0.1, msg: "Мощный удар шваброй!", msg_en: "Powerful mop hit!" }, { name: "Ведро на Голову", dmg: [60, 70], msg: "На голову падает ведро с водой!", msg_en: "A bucket of water falls on your head!" }] }
};

var BASE_SKILLS = [{ name: "Подзатыльник", cost: 0, dmg: [10, 15] }, { name: "Фокус", cost: -40, dmg: [0, 0] }, { name: "Удар Ранцем", cost: 35, dmg: [30, 45] }, { name: "Звонок Маме", cost: 80, dmg: [70, 100], icon: "P" }];
var BASE_ITEMS = [{ name: "Пирожок", heal: 60 }, { name: "Шпора", buff: 1.5 }];

// === STATE ===
var state = {
    playerName: '', hardcore: false, storyLevel: 0, storyHp: PLAYER_MAX_HP, storyMp: 50, storyInventory: [1, 1],
    hp: PLAYER_MAX_HP, mp: 50, inventory: [1, 1], items: BASE_ITEMS.slice(), skills: BASE_SKILLS.slice(),
    buffDamage: 1, enemyHp: 100, currentEnemy: null, currentMode: 'story', turn: 'player', gameOver: false, stunned: false, battleStartTime: null,
    speedrunTime: 0, speedrunInterval: null, isSpeedrunPaused: true,
    equationBar: 0, minionHp: 0, minionMaxHp: 50, hasMinionActive: false, pendingSkill: null, idleTimer: null, musicTimer: null,
    screamActive: false, screamPlayerPower: 50, screamTimer: 15, screamInterval: null, screamDamageToPlayer: 0, screamDamageToEnemy: 0,
    endlessRound: 0, endlessType: null,
    pvpMp: 50, pvpInventory: [1, 1]
};

// === USER ACCOUNT STATE ===
var userProfile = {
    loggedIn: false,
    name: '',
    rp: 0,
    unlockedSkins: ['default'],
    currentSkin: 'default',
    customImage: null,
    dailyStreak: 0,
    lastClaimDate: null
};

// Auto-load profile for persistence
try {
    var savedP = storage.getItem('schoolRpgProfile');
    if (savedP) {
        var parsed = JSON.parse(savedP);
        for (var key in parsed) {
            if (parsed.hasOwnProperty(key)) {
                userProfile[key] = parsed[key];
            }
        }
        userProfile.loggedIn = true;
    }
} catch (e) { }

// === ELEMENTS ===
var el = {};

function initElements() {
    el.menuScreen = document.getElementById('menu-screen');
    el.nameInputContainer = document.getElementById('name-input-container');
    el.mainMenuContainer = document.getElementById('main-menu-container');
    el.hardcoreModal = document.getElementById('hardcore-modal');
    el.gameWrapper = document.getElementById('game-wrapper');
    el.speedrunTimer = document.getElementById('speedrun-timer');
    el.babaValyaAttacksContainer = document.getElementById('baba-valya-attacks-container');
    el.arena = document.getElementById('arena');
    el.pSprite = document.getElementById('player-sprite');
    el.pImg = document.getElementById('player-custom-img');
    el.eSprite = document.getElementById('enemy-sprite');
    el.pHpBar = document.getElementById('p-hp-bar');
    el.pMpBar = document.getElementById('p-mp-bar');
    el.pHpTxt = document.getElementById('p-hp-txt');
    el.pMpTxt = document.getElementById('p-mp-txt');
    el.eHpBar = document.getElementById('e-hp-bar');
    el.eHpTxt = document.getElementById('e-hp-txt');
    el.eMpBar = document.getElementById('e-mp-bar');
    el.eMpTxt = document.getElementById('e-mp-txt');
    el.eName = document.getElementById('e-name-ui');
    el.log = document.getElementById('log');
    el.modal = document.getElementById('modal');
    el.btns = [];
    el.items = [];
    for (var i = 0; i < 4; i++) {
        el.btns[i] = document.getElementById('btn-' + i);
    }
    for (var j = 0; j < 2; j++) {
        el.items[j] = { btn: document.getElementById('item-' + j), count: document.getElementById('count-' + j) };
    }
    el.levelDisplay = document.getElementById('level-display');
    el.enemyNameDisplay = document.getElementById('enemy-name-display');
    el.specialBarContainer = document.getElementById('special-bar-container');
    el.specialBarVal = document.getElementById('special-bar-val');
    el.specialBarPercent = document.getElementById('special-bar-percent');
    el.minionContainer = document.getElementById('minion-container');
    el.minionHpBar = document.getElementById('minion-hp-bar');
    el.targetSelection = document.getElementById('target-selection');
    el.screamOverlay = document.getElementById('scream-overlay');
    el.screamBarPlayer = document.getElementById('scream-bar-player');
    el.screamBarEnemy = document.getElementById('scream-bar-enemy');
    el.screamTimer = document.getElementById('scream-timer');
    el.screamKey = document.getElementById('scream-key');
    el.screamDmgPlayer = document.getElementById('scream-dmg-player');
    el.screamDmgEnemy = document.getElementById('scream-dmg-enemy');
    el.leaderboardModalFull = document.getElementById('leaderboard-modal');
    el.leaderboardTable = document.getElementById('leaderboard-table').getElementsByTagName('tbody')[0];
    el.endlessModal = document.getElementById('endless-modal');
    el.actionPanel = document.getElementById('action-panel');
    el.authSection = document.getElementById('auth-section');
    el.shopModal = document.getElementById('shop-modal');
    el.shopGrid = document.getElementById('shop-grid');
    el.rpDisplay = document.getElementById('rp-display');
    el.shopRpDisplay = document.getElementById('shop-rp-display');
    el.dailyModal = document.getElementById('daily-modal');
    el.bubblePlayer = document.getElementById('bubble-player');
    el.bubbleEnemy = document.getElementById('bubble-enemy');

    // Event Delegation for Action Panel
    var actionDelegate = function (e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        // Search up for button with id
        while (target && target !== el.actionPanel && !target.id) {
            target = target.parentNode;
        }
        if (!target || target === el.actionPanel) return;

        if (target.id.indexOf('btn-') === 0) {
            var idx = parseInt(target.id.replace('btn-', ''), 10);
            if (!isNaN(idx)) playerAction(idx);
        } else if (target.id.indexOf('item-') === 0) {
            var idx = parseInt(target.id.replace('item-', ''), 10);
            if (!isNaN(idx)) useItem(idx);
        }
    };
    if (el.actionPanel.addEventListener) el.actionPanel.addEventListener('click', actionDelegate);
    else {
        (function(fn) {
            el.actionPanel.attachEvent('onclick', function() {
                fn(window.event);
            });
        })(actionDelegate);
    }
}

// === HELPERS ===
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// === GLOBAL OPTIMIZATIONS ===
document.onselectstart = function (e) {
    var target = (e || window.event).target || (e || window.event).srcElement;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return true;
    return false;
};

// Simple Promise Polyfill for IE8
if (!window.Promise) {
    window.Promise = function (executor) {
        this.then = function (onFulfilled) {
            executor(onFulfilled);
            return this;
        };
    };
}

function sleep(ms) {
    return new Promise(function (r) { setTimeout(r, ms); });
}

// DOM element pooling for particles and floating text
var ElementPool = function (className) {
    this.className = className;
    this.pool = [];
};
ElementPool.prototype.get = function () {
    if (this.pool.length > 0) {
        var el = this.pool.pop();
        el.style.display = 'block';
        return el;
    }
    var el = document.createElement('div');
    el.className = this.className;
    return el;
};
ElementPool.prototype.recycle = function (el) {
    el.style.display = 'none';
    el.style.filter = '';
    this.pool.push(el);
};

var floatTextPool = new ElementPool('float-text');
var particlePool = new ElementPool('particle');

function log(msg) {
    if (!el.log) return;
    // Limit log size to 5 lines for performance
    var lines = el.log.getElementsByTagName('div');
    var newLine = document.createElement('div');
    newLine.textContent = msg;

    // Use fragment for batch update if needed, but here we just append/remove
    el.log.appendChild(newLine);
    while (el.log.childNodes.length > 5) {
        var first = el.log.firstChild;
        if (first) el.log.removeChild(first);
    }
    el.log.scrollTop = el.log.scrollHeight;
}

function resetBattleState() {
    if (state.idleTimer) clearInterval(state.idleTimer);
    if (state.musicTimer) clearInterval(state.musicTimer);
    if (state.screamInterval) clearInterval(state.screamInterval);
    pauseTimer();
    state.idleTimer = null;
    state.musicTimer = null;
    state.screamInterval = null;
    state.equationBar = 0;
    state.screamActive = false;
    state.hasMinionActive = false;
    state.minionHp = 0;
    state.stunned = false;
    state.turn = 'player';

    if (el.screamOverlay) el.screamOverlay.className = el.screamOverlay.className.replace('show', '');
    if (el.minionContainer) el.minionContainer.className = el.minionContainer.className.replace('show', '');
    if (el.targetSelection) el.targetSelection.className = el.targetSelection.className.replace('show', '');
    if (el.babaValyaAttacksContainer) el.babaValyaAttacksContainer.innerHTML = '';
    if (el.specialBarContainer) el.specialBarContainer.className = el.specialBarContainer.className.replace('show', '');
    if (el.gameWrapper) el.gameWrapper.className = el.gameWrapper.className.replace('pvp-mode', '');
    if (el.pSprite) el.pSprite.className = el.pSprite.className.replace('dead', '');
    if (el.pImg) el.pImg.className = el.pImg.className.replace('dead', '');
    if (el.eSprite) el.eSprite.className = el.eSprite.className.replace('dead', '');
}

// === MAIN LOGIC ===
function updateMenuStats() {
    var titleEl = document.getElementById('menu-title');
    if (titleEl) titleEl.innerHTML = t('title') + '<br>' + t('sub');

    var sub2 = document.getElementById('menu-subtitle');
    if (sub2) sub2.textContent = t('sub2');

    var titles = document.getElementsByClassName('menu-section-title');
    if (titles[0]) titles[0].textContent = t('auth_title');

    var authName = document.getElementById('auth-name');
    if (authName) authName.placeholder = t('name_pl');
    var authPass = document.getElementById('auth-pass');
    if (authPass) authPass.placeholder = t('pass_pl');

    var authBtn = document.getElementById('auth-section');
    if (authBtn) {
        var nameSpan = authBtn.getElementsByClassName('name')[0];
        if (nameSpan) nameSpan.textContent = t('btn_go');
    }

    if (titles[1]) titles[1].textContent = t('menu_modes');
    if (titles[2]) titles[2].textContent = t('m_bosses');

    var storyBtn = document.getElementById('btn-save');
    if (storyBtn) {
        var allStoryBtns = document.getElementsByClassName('menu-btn story');
        if (allStoryBtns.length > 0) {
            var modeBtn = allStoryBtns[0];
            var n = modeBtn.getElementsByClassName('name')[0];
            if (n) n.textContent = t('m_story');
            var d = modeBtn.getElementsByClassName('desc')[0];
            if (d) {
                var level = state.storyLevel >= STORY_ENEMIES.length ? t('win') : (t('m_story_desc') + " " + (state.storyLevel + 1));
                d.textContent = level;
            }
        }
    }

    var pvpBtn = document.getElementsByClassName('menu-btn pvp')[0];
    if (pvpBtn) {
        var n = pvpBtn.getElementsByClassName('name')[0];
        if (n) n.textContent = t('m_pvp');
        var d = pvpBtn.getElementsByClassName('desc')[0];
        if (d) d.textContent = t('m_pvp_desc');
    }

    var endlessBtn = document.getElementsByClassName('menu-btn endless')[0];
    if (endlessBtn) {
        var n = endlessBtn.getElementsByClassName('name')[0];
        if (n) n.textContent = t('m_endless');
        var d = endlessBtn.getElementsByClassName('desc')[0];
        if (d) d.textContent = t('m_endless_desc');
    }

    var shopBtn = document.getElementById('btn-shop');
    if (shopBtn) {
        var n = qFind(shopBtn, '.name');
        setNodeText(n, t('m_shop'));
        var d = qFind(shopBtn, '.desc');
        setNodeText(d, t('m_shop_desc'));
    }

    var dailyBtn = document.getElementById('btn-daily');
    if (dailyBtn) {
        var n = qFind(dailyBtn, '.name');
        setNodeText(n, t('m_daily'));
        var d = qFind(dailyBtn, '.desc');
        setNodeText(d, t('daily_desc'));
    }

    var bossMap = [
        { id: 'btn-larisa', name: 'boss_larisa', desc: 'desc_larisa' },
        { id: 'btn-director', name: 'boss_director', desc: 'desc_director' },
        { id: 'btn-music', name: 'boss_music', desc: 'desc_music' },
        { id: 'btn-natalia', name: 'boss_natalia', desc: 'desc_natalia' },
        { id: 'btn-makar', name: 'en_makar', desc: 'desc_makar' }
    ];
    for (var i = 0; i < bossMap.length; i++) {
        var b = bossMap[i];
        var btn = document.getElementById(b.id);
        if (btn) {
            var n = qFind(btn, '.name');
            setNodeText(n, t(b.name));
            var d = qFind(btn, '.desc');
            setNodeText(d, t(b.desc));
        }
    }

    var lbBtn = document.getElementById('btn-lb');
    if (lbBtn) lbBtn.textContent = t('m_lb');
    var saveBtn = document.getElementById('btn-save');
    if (saveBtn) saveBtn.textContent = t('m_save');
    var loadBtn = document.getElementById('btn-load');
    if (loadBtn) loadBtn.textContent = t('m_load');
    var resetBtn = document.getElementById('btn-reset');
    if (resetBtn) resetBtn.textContent = t('m_reset');

    var nameDisp = document.getElementById('player-name-display');
    if (nameDisp) nameDisp.textContent = state.playerName || userProfile.name || "HRDCR";

    var mHp = document.getElementById('menu-hp');
    if (mHp) mHp.textContent = Math.floor(state.storyHp);
    var mMp = document.getElementById('menu-mp');
    if (mMp) mMp.textContent = Math.floor(state.storyMp);
    var mI0 = document.getElementById('menu-item-0');
    if (mI0) mI0.textContent = 'x' + state.storyInventory[0];
    var mI1 = document.getElementById('menu-item-1');
    if (mI1) mI1.textContent = 'x' + state.storyInventory[1];

    if (el.rpDisplay) el.rpDisplay.textContent = userProfile.rp;
}

function attemptLogin() {
    var name = document.getElementById('auth-name').value;
    if (name) name = name.replace(/^\s+|\s+$/g, '');
    var pass = document.getElementById('auth-pass').value;
    if (pass) pass = pass.replace(/^\s+|\s+$/g, '');

    if (!name) {
        window.isAnonymousLogin = true;
        setTextContent('hc-title', t('hc_title'));
        setTextContent('hardcore-yes', t('hc_yes'));
        setTextContent('hardcore-no', t('hc_no'));
        el.hardcoreModal.className = el.hardcoreModal.className + ' show';
        return;
    }

    setTextContent('auth-msg', 'Вход...');

    // Check if loginOrRegister is available and is a function
    if (typeof window.loginOrRegister === 'function') {
        try {
            window.loginOrRegister(name, pass);
        } catch (e) {
            console.error('Login error:', e);
            fallbackLogin(name, pass);
        }
    } else {
        // fallback for IE8 when firebase module fails to load
        console.log('Using local fallback login');
        fallbackLogin(name, pass);
    }
}

// Helper function for IE6 textContent compatibility
function setTextContent(id, text) {
    var el = document.getElementById(id);
    if (!el) return;
    if (el.textContent !== undefined) {
        el.textContent = text;
    } else if (el.innerText !== undefined) {
        el.innerText = text;
    } else {
        el.innerHTML = text;
    }
}

// IE6 compatible querySelector helper
function qFind(parent, selector) {
    // If querySelector is available, use it
    if (parent && parent.querySelector) return parent.querySelector(selector);
    if (!parent) return null;
    
    // Fallback for IE6: search by id (selector starts with #) or className
    if (selector.charAt(0) === '#') {
        return document.getElementById(selector.substring(1));
    }
    
    // Search by class in children
    if (selector.charAt(0) === '.') {
        var cls = selector.substring(1);
        var all = parent.getElementsByTagName('*');
        for (var i = 0; i < all.length; i++) {
            if (all[i].className && all[i].className.indexOf(cls) !== -1) return all[i];
        }
    }
    
    return null;
}

function setNodeText(el, text) {
    if (!el) return;
    if (el.textContent !== undefined) {
        el.textContent = text;
    } else if (el.innerText !== undefined) {
        el.innerText = text;
    } else {
        el.innerHTML = text;
    }
}

function getNodeText(el) {
    if (!el) return '';
    if (el.textContent !== undefined && el.textContent !== null) return String(el.textContent);
    if (el.innerText !== undefined && el.innerText !== null) return String(el.innerText);
    return el.innerHTML || '';
}

function getSafeRect(el) {
    var rect = null;
    if (el && el.getBoundingClientRect) {
        try {
            rect = el.getBoundingClientRect();
        } catch (e) {
            rect = null;
        }
    }
    if (rect) {
        var width = rect.width;
        var height = rect.height;
        if (typeof width !== 'number') width = (rect.right || 0) - (rect.left || 0);
        if (typeof height !== 'number') height = (rect.bottom || 0) - (rect.top || 0);
        return { left: rect.left || 0, top: rect.top || 0, width: width || 0, height: height || 0, right: rect.right || ((rect.left || 0) + (width || 0)), bottom: rect.bottom || ((rect.top || 0) + (height || 0)) };
    }
    var left = el ? (el.offsetLeft || 0) : 0;
    var top = el ? (el.offsetTop || 0) : 0;
    var fallbackWidth = el ? (el.offsetWidth || 0) : 0;
    var fallbackHeight = el ? (el.offsetHeight || 0) : 0;
    return { left: left, top: top, width: fallbackWidth, height: fallbackHeight, right: left + fallbackWidth, bottom: top + fallbackHeight };
}

function applyCompactLayout() {
    if (!document.body) return;
    var w = document.documentElement.clientWidth || document.body.clientWidth || 800;
    var cls = document.body.className || '';
    var hasCompact = cls.indexOf('compact-ui') !== -1;
    if (w < 760) {
        if (!hasCompact) document.body.className = cls ? (cls + ' compact-ui') : 'compact-ui';
    } else if (hasCompact) {
        document.body.className = cls.replace(/\bcompact-ui\b/g, '').replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, '');
    }
}

function logout() {
    window.location.reload();
}

function goToMenu() {
    resetBattleState();
    el.menuScreen.className = el.menuScreen.className.replace('hidden', '');
    el.gameWrapper.style.display = 'none';
    el.modal.className = el.modal.className.replace('show', '');
    el.modal.style.display = 'none';
    resetTimer();
    updateMenuStats();
    saveProgress();
}

function showEndlessMenu() {
    el.endlessModal.className = el.endlessModal.className + ' show';
    document.getElementById('endless-title').textContent = t('endless_title');
    document.getElementById('endless-sub').textContent = t('endless_sub');
    var cBtn = document.getElementById('btn-endless-cancel');
    if (cBtn) cBtn.textContent = t('endless_cancel');

    var btns = el.endlessModal.getElementsByClassName('selection-btn');
    for (var i = 0; i < btns.length; i++) {
        var btn = btns[i];
        var spans = btn.getElementsByTagName('span');
        if (spans.length > 1) {
            var sp = spans[1];
            var txt = getNodeText(sp);
            if (txt.indexOf('Случайные') !== -1 || txt.indexOf('Random') !== -1) {
                setNodeText(sp, t('endless_rand'));
            } else {
                setNodeText(sp, getLocName(txt));
            }
        }
    }
}

function startEndless(type) {
    el.endlessModal.className = el.endlessModal.className.replace('show', '');
    state.endlessType = type;
    state.endlessRound = 0;
    state.hp = PLAYER_MAX_HP;
    state.mp = 50;
    state.inventory = [1, 1];
    startBattle('endless');
}

function startPvP() {
    state.hp = PLAYER_MAX_HP;
    state.mp = 50;
    state.inventory = [1, 1];
    state.pvpMp = 50;
    state.pvpInventory = [1, 1];
    state.turn = 'player';
    startBattle('pvp');
}

function startBattle(mode) {
    resetBattleState();
    state.gameOver = false;
    state.turn = 'player';
    state.currentMode = mode;
    el.menuScreen.className = el.menuScreen.className + ' hidden';
    el.gameWrapper.style.display = 'block';
    state.battleStartTime = new Date().getTime();
    if (state.isSpeedrunPaused) { resetTimer(); startTimer(); }
    state.buffDamage = 1;
    state.skills = JSON.parse(JSON.stringify(BASE_SKILLS));
    state.items = JSON.parse(JSON.stringify(BASE_ITEMS));

    var currentSkinId = userProfile.currentSkin || 'default';
    var skinData = null;
    for (var i = 0; i < SKINS.length; i++) {
        if (SKINS[i].id === currentSkinId) {
            skinData = SKINS[i];
            break;
        }
    }
    if (!skinData) skinData = SKINS[0];

    if (skinData.type === 'image' && userProfile.customImage) {
        el.pSprite.style.display = 'none';
        el.pImg.style.display = 'block';
        el.pImg.src = userProfile.customImage;
    } else {
        el.pImg.style.display = 'none';
        el.pSprite.style.display = 'block';
        el.pSprite.textContent = skinData.icon;
    }

    var enemyData;

    if (el.bubblePlayer) el.bubblePlayer.style.display = 'none';
    if (el.bubbleEnemy) el.bubbleEnemy.style.display = 'none';

    if (mode === 'story') {
        if (state.storyLevel >= STORY_ENEMIES.length) {
            alert(t('game_beat'));
            goToMenu();
            return;
        }
        enemyData = JSON.parse(JSON.stringify(STORY_ENEMIES[state.storyLevel]));
        state.hp = state.storyHp;
        state.mp = state.storyMp;
        state.inventory = state.storyInventory.slice();
        if (state.hp <= 0) state.hp = PLAYER_MAX_HP;
        el.levelDisplay.textContent = t('m_story') + ' ' + (state.storyLevel + 1);
    } else if (mode === 'endless') {
        state.endlessRound++;
        if (state.endlessType === 'random') {
            var pool = STORY_ENEMIES.slice();
            var bossValues = [];
            for (var key in EXTRA_BOSSES) {
                if (EXTRA_BOSSES.hasOwnProperty(key) && !EXTRA_BOSSES[key].isBabaValya) {
                    bossValues.push(EXTRA_BOSSES[key]);
                }
            }
            pool = pool.concat(bossValues);
            enemyData = JSON.parse(JSON.stringify(pool[rand(0, pool.length - 1)]));
        } else if (state.endlessType.indexOf('story_') === 0) {
            var index = parseInt(state.endlessType.split('_')[1], 10);
            enemyData = JSON.parse(JSON.stringify(STORY_ENEMIES[index]));
        } else {
            enemyData = JSON.parse(JSON.stringify(EXTRA_BOSSES[state.endlessType]));
        }

        var scale = 1 + (state.endlessRound * 0.1);
        enemyData.hp = Math.floor(enemyData.hp * scale);
        enemyData.name = enemyData.name + ' (R' + state.endlessRound + ')';
        el.levelDisplay.textContent = t('round') + ' ' + state.endlessRound;

        if (enemyData.special === 'equation') {
            el.specialBarContainer.className = el.specialBarContainer.className + ' show';
            state.equationBar = 0;
            updateSpecialBar();
            startIdleTimer();
        }
        if (enemyData.special === 'music') startMusicTimer();
    } else if (mode === 'pvp') {
        el.gameWrapper.className = el.gameWrapper.className + ' pvp-mode';
        el.levelDisplay.textContent = t('pvp_duel');
        enemyData = { name: t('p2'), title: CONFIG.lang === 'en' ? "OPPONENT" : "ОППОНЕНТ", hp: PLAYER_MAX_HP, sprite: "P", moves: [] };
        el.eSprite.style.transform = 'scaleX(-1)';
    } else {
        enemyData = JSON.parse(JSON.stringify(EXTRA_BOSSES[mode]));
        state.hp = PLAYER_MAX_HP;
        state.mp = 50;
        state.inventory = [1, 1];
        el.levelDisplay.textContent = CONFIG.lang === 'en' ? 'BOSS' : 'БОСС';
        if (mode === 'larisa') {
            el.specialBarContainer.className = el.specialBarContainer.className + ' show';
            state.equationBar = 0;
            updateSpecialBar();
            startIdleTimer();
        }
        if (mode === 'music') startMusicTimer();
        if (mode === 'director') {
            state.inventory = enemyData.customInventory.slice();
            state.items = JSON.parse(JSON.stringify(enemyData.customItems));
            state.skills[3] = { name: "Сильный Аргумент", cost: 80, dmg: [70, 100], icon: "!" };
        }
    }

    if (state.hardcore && !enemyData.isBabaValya && mode !== 'pvp') {
        enemyData.hp = Math.round(enemyData.hp * 1.2);
    }

    state.currentEnemy = enemyData;
    state.enemyHp = state.currentEnemy.hp;
    el.eSprite.textContent = state.currentEnemy.sprite;
    el.eSprite.className = el.eSprite.className.replace('dead', '');
    el.pSprite.className = el.pSprite.className.replace('dead', '');
    el.eName.textContent = state.currentEnemy.name;
    el.enemyNameDisplay.textContent = state.currentEnemy.title;
    el.modal.className = el.modal.className.replace('show', '');

    state.enemy = enemyData;
    updateUI();

    var dialogue = null;
    var prefix = state.hardcore ? 'dh_' : 'd_';

    if (mode === 'story') {
        if (state.storyLevel === 0) dialogue = t(prefix + 'egor');
        if (state.storyLevel === 1) dialogue = t(prefix + 'vadim');
        if (state.storyLevel === 2) dialogue = t(prefix + 'zavuch');
    } else if (mode === 'larisa') {
        dialogue = t(prefix + 'larisa');
    } else if (mode === 'makar') {
        dialogue = t(prefix + 'makar');
    } else if (mode === 'music') {
        dialogue = t(prefix + 'music_boss');
    } else if (mode === 'natalia') {
        dialogue = t(prefix + 'music_adv');
    } else if (mode === 'director') {
        dialogue = t(prefix + 'director');
    } else if (mode === 'baba_valya') {
        dialogue = t(prefix + 'baba');
    }

    if (dialogue) {
        state.turn = 'busy';
        updateUI();
        // Skip speech bubble for IE8 - just show dialogue in alert or skip
        state.turn = 'player';
        updateUI();
    }

    updateItemsUI();
    if (mode === 'pvp') {
        log(CONFIG.lang === 'en' ? "PvP: Player 1's turn" : "PvP: Ход Игрока 1");
    } else {
        var enemyName = getLocName(state.currentEnemy.name);
        log(enemyName + ' ' + t('blocks_path'));
    }
}

function updateItemsUI() {
    var inv = (state.currentMode === 'pvp' && state.turn === 'enemy') ? state.pvpInventory : state.inventory;
    el.items[0].btn.innerHTML = '[P] ' + t('it_0') + '<span class="item-count" id="count-0">' + inv[0] + '</span>';
    el.items[1].btn.innerHTML = '[C] ' + t('it_1') + '<span class="item-count" id="count-1">' + inv[1] + '</span>';
    el.items[0].count = document.getElementById('count-0');
    el.items[1].count = document.getElementById('count-1');
}

// === SPECIAL BOSS LOGIC ===
function startIdleTimer() {
    if (state.idleTimer) clearInterval(state.idleTimer);
    state.idleTimer = setInterval(function () {
        if (state.turn === 'player' && state.currentEnemy && state.currentEnemy.special === 'equation' && !state.gameOver) {
            state.equationBar += state.currentEnemy.equationPerTurn;
            updateSpecialBar();
            checkEquationTrigger();
        }
    }, 1000);
}

function updateSpecialBar() {
    if (!state.currentEnemy || state.currentEnemy.special !== 'equation') return;
    state.equationBar = Math.max(0, Math.min(100, state.equationBar));
    el.specialBarVal.style.width = state.equationBar + '%';
    el.specialBarPercent.textContent = Math.floor(state.equationBar) + '%';
}

function checkEquationTrigger() {
    if (!state.currentEnemy || state.currentEnemy.special !== 'equation') return;
    if (state.equationBar >= 100) {
        state.equationBar = 0;
        updateSpecialBar();
        shakeScreen();
        flashRed(el.arena);
        log(t('test_atk'));
        state.mp = 0;
        state.hp -= 20;
        showFloat(el.pSprite, "-20 HP / 0 MP", "#ef4444");
        if (!state.hasMinionActive) {
            state.hasMinionActive = true;
            state.minionHp = state.minionMaxHp;
            el.minionContainer.className = el.minionContainer.className + ' show';
            log(t('minion_spawn'));
        }
        updateUI();
        if (state.hp <= 0) gameOver(false);
    }
}

function startMusicTimer() {
    if (state.musicTimer) clearInterval(state.musicTimer);
    state.musicTimer = setInterval(function () {
        if (state.currentEnemy && state.currentEnemy.special === 'music' && state.turn !== 'busy' && !state.gameOver) {
            var drain = state.currentEnemy.drainPerSecond;
            if (state.mp >= drain) {
                state.mp -= drain;
                showFloat(el.pSprite, '-' + drain + ' MP', "#a855f7");
            } else {
                var hpDrain = drain - state.mp;
                state.mp = 0;
                state.hp -= hpDrain;
                showFloat(el.pSprite, '-' + hpDrain + ' HP', "#ef4444");
                animHit(el.pSprite);
            }
            updateUI();
            if (state.hp <= 0) gameOver(false);
        }
    }, 1000);
}

// === ACTIONS ===
function getLocName(orig) {
    if (!orig) return "";
    if (orig.indexOf('Егор') !== -1) return t('en_egor');
    if (orig.indexOf('Вадим') !== -1) return t('en_vadim');
    if (orig.indexOf('Марьванна') !== -1) return t('en_marivanna');
    if (orig.indexOf('Лариса') !== -1) return t('boss_larisa');
    if (orig.indexOf('Дмитрий') !== -1 || orig.indexOf('Директор') !== -1) return t('boss_director');
    if (orig.indexOf('Лилия') !== -1) return t('boss_music');
    if (orig.indexOf('Наталья') !== -1) return t('boss_natalia');
    if (orig.indexOf('Макар') !== -1) return t('en_makar');
    if (orig.indexOf('Баба') !== -1 || orig.indexOf('Valya') !== -1 || orig.indexOf('Cleaner') !== -1) return t('en_baba');
    if (orig === 'МАТЕМАТИЧКА') return t('tit_math');
    if (orig === 'ДИРЕКТОР' || orig === 'PRINCIPAL') return t('tit_pupa');
    if (orig === 'УЧИТЕЛЬ МУЗЫКИ' || orig === 'MUSIC TEACHER') return t('tit_music');
    if (orig === 'КРИКУНЬЯ' || orig === 'SCREAMER') return t('tit_scream');
    if (orig === 'МЕЛКИЙ ШКЕТ' || orig === 'LITTLE KID') return t('tit_small');
    if (orig === 'УБОРЩИЦА' || orig === 'CLEANER') return t('tit_cleaner');
    if (orig === 'Школьник') return t('tit_shkolnik');
    if (orig === 'Старшак') return t('tit_starshak');
    if (orig === 'ЗАВУЧ') return t('tit_zavuch');
    return orig;
}

function getLocMsg(obj, field) {
    if (CONFIG.lang === 'ru') return obj[field];
    return obj[field + '_en'] || obj[field];
}

var updateUITimer = null;
function updateUI() {
    if (updateUITimer) return;
    updateUITimer = setTimeout(realUpdateUI, 50);
}

function realUpdateUI() {
    updateUITimer = null;
    document.getElementById('level-display').textContent = state.currentMode === 'pvp' ? t('pvp_duel') : (state.currentMode === 'endless' ? t('round') + " " + state.endlessRound : t('level'));
    var backBtn = document.getElementById('back-btn');
    if (backBtn) backBtn.textContent = t('menu_btn');
    var sbLabel = document.getElementById('special-bar-label-text');
    if (sbLabel) sbLabel.textContent = "[E] " + t('equation');

    var hpPct = (state.hp / PLAYER_MAX_HP) * 100;
    var mpPct = (state.mp / PLAYER_MAX_MP) * 100;
    el.pHpBar.style.width = (Math.max(0, hpPct) | 0) + '%';
    el.pMpBar.style.width = (Math.max(0, mpPct) | 0) + '%';
    el.pHpTxt.textContent = Math.floor(Math.max(0, state.hp));
    el.pMpTxt.textContent = Math.floor(Math.max(0, state.mp));

    var curEnemyMax = state.currentEnemy ? state.currentEnemy.hp : 100;
    var eHpPct = (state.enemyHp / curEnemyMax) * 100;
    el.eHpBar.style.width = (Math.max(0, eHpPct) | 0) + '%';
    el.eHpTxt.textContent = Math.floor(Math.max(0, state.enemyHp));

    if (state.currentEnemy) {
        el.eName.textContent = getLocName(state.currentEnemy.name);
        el.enemyNameDisplay.textContent = getLocName(state.currentEnemy.title || state.currentEnemy.name);
    }

    if (state.currentMode === 'pvp') {
        var pvpMpPct = (state.pvpMp / PLAYER_MAX_MP) * 100;
        el.eMpBar.style.width = (Math.max(0, pvpMpPct) | 0) + '%';
        el.eMpTxt.textContent = Math.floor(Math.max(0, state.pvpMp));
    }

    var isPvP = state.currentMode === 'pvp';
    var activeMp = (isPvP && state.turn === 'enemy') ? state.pvpMp : state.mp;
    var activeInv = (isPvP && state.turn === 'enemy') ? state.pvpInventory : state.inventory;
    var isTurn = isPvP ? (state.turn === 'player' || state.turn === 'enemy') : (state.turn === 'player');

    for (var idx = 0; idx < el.btns.length; idx++) {
        var btn = el.btns[idx];
        var cost = state.skills[idx].cost;
        var noMp = cost > 0 && activeMp < cost;
        btn.disabled = !isTurn || state.stunned || noMp;
        btn.style.filter = btn.disabled ? 'alpha(opacity=50)' : '';
        var skKey = 'sk_' + idx;
        var nameSpan = qFind(btn, '.btn-name');
        setNodeText(nameSpan, t(skKey) || state.skills[idx].name);
    }

    for (var j = 0; j < activeInv.length; j++) {
        el.items[j].count.textContent = activeInv[j];
        var disabled = (activeInv[j] <= 0 || !isTurn || state.stunned);
        el.items[j].btn.disabled = disabled;
        el.items[j].btn.style.filter = disabled ? 'alpha(opacity=50)' : '';
    }

    if (state.hasMinionActive) {
        var minionPct = (state.minionHp / state.minionMaxHp) * 100;
        el.minionHpBar.style.width = (Math.max(0, minionPct) | 0) + '%';
    } else {
        el.minionHpBar.style.width = '0%';
    }

    var headerHp = document.getElementById('header-hp');
    if (headerHp) headerHp.textContent = Math.floor(Math.max(0, state.hp));
    var headerMp = document.getElementById('header-mp');
    if (headerMp) headerMp.textContent = Math.floor(Math.max(0, state.mp));
}

function playerAction(idx) {
    if (state.stunned || state.gameOver) return;

    var isP1 = state.turn === 'player';
    var isP2 = state.turn === 'enemy' && state.currentMode === 'pvp';
    if (!isP1 && !isP2) return;

    var currentMp = isP1 ? state.mp : state.pvpMp;
    var skill = state.skills[idx];

    if (skill.cost > 0 && currentMp < skill.cost) {
        shake(isP1 ? el.pMpBar : el.eMpBar);
        return;
    }

    if (state.hasMinionActive && skill.dmg && skill.dmg[1] > 0 && isP1) {
        state.pendingSkill = idx;
        showTargetSelection();
        return;
    }

    executeSkill(idx, isP1 ? 'enemy' : 'player');
}

function showTargetSelection() {
    el.targetSelection.className = el.targetSelection.className + ' show';
    document.getElementById('target-enemy-emoji').textContent = state.currentEnemy.sprite;
    document.getElementById('target-enemy-name').textContent = getLocName(state.currentEnemy.name);
    var tm = document.getElementById('target-minion-name');
    if (tm) tm.textContent = t('equation');
}

function selectTarget(target) {
    el.targetSelection.className = el.targetSelection.className.replace('show', '');
    if (state.pendingSkill !== null) {
        executeSkill(state.pendingSkill, target);
        state.pendingSkill = null;
    }
}

function executeSkill(idx, target) {
    var skill = state.skills[idx];
    var isP1Attacking = (target === 'enemy' || target === 'minion');
    var attacker = isP1Attacking ? 'player' : 'enemy';
    state.turn = 'busy';

    if (isP1Attacking) {
        if (skill.cost > 0) state.mp -= skill.cost;
        else state.mp = Math.min(PLAYER_MAX_MP, state.mp - skill.cost);
    } else {
        if (skill.cost > 0) state.pvpMp -= skill.cost;
        else state.pvpMp = Math.min(PLAYER_MAX_MP, state.pvpMp - skill.cost);
    }

    var pSprite = (el.pImg.style.display !== 'none') ? el.pImg : el.pSprite;
    var attackerSprite = isP1Attacking ? pSprite : el.eSprite;
    var defenderSprite = isP1Attacking ? el.eSprite : pSprite;
    var dir = isP1Attacking ? 'right' : 'left';

    animAttack(attackerSprite, dir);

    setTimeout(function () {
        if (skill.dmg && skill.dmg[1] > 0) {
            var dmg = rand(skill.dmg[0], skill.dmg[1]);
            if (state.buffDamage > 1) {
                dmg = Math.floor(dmg * state.buffDamage);
                state.buffDamage = 1;
                showFloat(attackerSprite, "BUFF END", "#fbbf24");
            }
            if (Math.random() < 0.15) {
                dmg = Math.floor(dmg * 1.5);
                showFloat(defenderSprite, "CRIT!", "#fbbf24");
                shakeScreen();
            }

            if (target === 'enemy') {
                state.enemyHp -= dmg;
                showFloat(defenderSprite, '-' + dmg, "#ef4444");
                spawnParticles(defenderSprite, 10, '#ef4444');
                animHit(defenderSprite);
            } else if (target === 'player') {
                state.hp -= dmg;
                showFloat(defenderSprite, '-' + dmg, "#ef4444");
                spawnParticles(defenderSprite, 10, '#ef4444');
                animHit(defenderSprite);
            } else {
                state.minionHp -= dmg;
                showFloat(el.minionContainer, '-' + dmg, "#ef4444");
                spawnParticles(el.minionContainer, 8, '#ef4444');
                if (state.minionHp <= 0) {
                    state.hasMinionActive = false;
                    el.minionContainer.className = el.minionContainer.className.replace('show', '');
                    log("[E] Equation solved!");
                    state.mp = Math.min(PLAYER_MAX_MP, state.mp + 20);
                    showFloat(el.pSprite, "+20 MP", "#3b82f6");
                }
            }
            flashRed(el.arena);
        } else {
            showFloat(attackerSprite, "+MP", "#3b82f6");
            spawnParticles(attackerSprite, 5, '#3b82f6');
        }

        log((isP1Attacking ? t('you') : t('p2')) + ' ' + t('used') + ' ' + (t('sk_' + idx) || skill.name));

        if (state.currentEnemy && state.currentEnemy.special === 'equation') {
            state.equationBar += state.currentEnemy.equationPerTurn;
            updateSpecialBar();
            checkEquationTrigger();
        }

        updateUI();
        if (checkWin()) return;

        setTimeout(function () {
            if (state.currentMode === 'pvp') {
                state.turn = isP1Attacking ? 'enemy' : 'player';
                log(isP1Attacking ? "PvP: Ход Игрока 2" : "PvP: Ход Игрока 1");
                updateItemsUI();
                updateUI();
            } else {
                state.turn = 'enemy';
                enemyTurn();
            }
        }, 1000);
    }, 200);
}

function useItem(idx) {
    if (state.stunned || state.gameOver) return;

    var isP1 = state.turn === 'player';
    var isP2 = state.turn === 'enemy' && state.currentMode === 'pvp';
    if (!isP1 && !isP2) return;

    var activeInv = isP1 ? state.inventory : state.pvpInventory;
    if (activeInv[idx] <= 0) return;

    activeInv[idx]--;
    state.turn = 'busy';
    var item = state.items[idx];
    var actorSprite = isP1 ? ((el.pImg.style.display !== 'none') ? el.pImg : el.pSprite) : el.eSprite;

    log('Использовано: ' + item.name);
    animAttack(actorSprite, 'up');

    if (item.heal) {
        Sound.heal();
        if (isP1) state.hp = Math.min(PLAYER_MAX_HP, state.hp + item.heal);
        else state.enemyHp = Math.min(PLAYER_MAX_HP, state.enemyHp + item.heal);
        showFloat(actorSprite, '+' + item.heal, "#22c55e");
        spawnParticles(actorSprite, 15, '#22c55e');
    }
    if (item.buff) {
        Sound.heal();
        state.buffDamage = item.buff;
        showFloat(actorSprite, "POWER UP!", "#fbbf24");
        spawnParticles(actorSprite, 15, '#fbbf24');
    }

    if (state.currentEnemy && state.currentEnemy.special === 'equation') {
        state.equationBar += state.currentEnemy.equationPerTurn;
        updateSpecialBar();
        checkEquationTrigger();
    }

    updateUI();

    setTimeout(function () {
        if (state.currentMode === 'pvp') {
            state.turn = isP1 ? 'enemy' : 'player';
            log(isP1 ? "PvP: Ход Игрока 2" : "PvP: Ход Игрока 1");
            updateItemsUI();
            updateUI();
        } else {
            state.turn = 'enemy';
            enemyTurn();
        }
    }, 1000);
}

function enemyTurn() {
    if (state.currentMode === 'pvp') return;

    updateUI();

    if (state.currentEnemy && state.currentEnemy.phases) {
        var pct = (state.enemyHp / state.currentEnemy.hp) * 100;
        if (pct <= 20) el.eSprite.textContent = state.currentEnemy.phases[20];
        else if (pct <= 50) el.eSprite.textContent = state.currentEnemy.phases[50];
        else el.eSprite.textContent = state.currentEnemy.phases[100];
    }

    if (state.currentEnemy && state.currentEnemy.special === 'baba_valya') {
        babaValyaTurn();
        return;
    }

    if (state.currentEnemy && state.currentEnemy.special === 'scream' && Math.random() < state.currentEnemy.screamChance) {
        log(t('scream_start'));
        setTimeout(function () { startScreamBattle(); }, 500);
        return;
    }

    var attackCount = 1;
    if (state.currentEnemy && state.currentEnemy.special === 'dodge') attackCount = rand(2, 3);

    var attackIndex = 0;
    function doAttack() {
        if (state.hp <= 0 || attackIndex >= attackCount) {
            if (state.hasMinionActive && state.hp > 0) {
                setTimeout(function () {
                    executeEnemyAttack(true);
                    finishEnemyTurn();
                }, 500);
            } else {
                finishEnemyTurn();
            }
            return;
        }
        executeEnemyAttack(false);
        attackIndex++;
        if (attackIndex < attackCount) {
            setTimeout(doAttack, 600);
        } else {
            if (state.hasMinionActive && state.hp > 0) {
                setTimeout(function () {
                    executeEnemyAttack(true);
                    finishEnemyTurn();
                }, 500);
            } else {
                finishEnemyTurn();
            }
        }
    }
    doAttack();
}

function finishEnemyTurn() {
    if (state.hp <= 0) {
        gameOver(false);
        return;
    }
    setTimeout(function () {
        state.turn = 'player';
        if (state.stunned) {
            state.stunned = false;
            log(t('recover'));
            setTimeout(function () {
                state.mp = Math.min(PLAYER_MAX_MP, state.mp + 5);
                updateUI();
            }, 1000);
        } else {
            state.mp = Math.min(PLAYER_MAX_MP, state.mp + 5);
            updateUI();
        }
    }, 800);
}

function executeEnemyAttack(isMinion) {
    var enemy = state.currentEnemy;
    var moves = enemy.moves;
    var move;
    if (isMinion) {
        move = { name: "Сложение", dmg: [8, 15], msg: t('equation_atk') };
        animAttack(el.minionContainer, 'left');
    } else {
        move = moves[rand(0, moves.length - 1)];
        animAttack(el.eSprite, 'left');
    }

    var hits = move.hits || 1;
    var pTarget = (el.pImg.style.display !== 'none') ? el.pImg : el.pSprite;

    for (var h = 0; h < hits; h++) {
        if (move.dmg) {
            var dmg = rand(move.dmg[0], move.dmg[1]);
            state.hp -= dmg;
            showFloat(pTarget, '-' + dmg, "#ef4444");
            spawnParticles(pTarget, 8, '#ef4444');
            animHit(pTarget);
            if (dmg > 20) shakeScreen();
        }
    }
    if (move.heal) {
        var heal = rand(move.heal[0], move.heal[1]);
        state.enemyHp = Math.min(enemy.hp, state.enemyHp + heal);
        showFloat(el.eSprite, '+' + heal, "#22c55e");
    }
    if (move.drain) {
        state.mp = Math.max(0, state.mp - move.drain);
        showFloat(pTarget, '-' + move.drain + ' MP', "#3b82f6");
    }
    if (move.stun && Math.random() < move.stun) {
        state.stunned = true;
        showFloat(pTarget, t('stunned'), "#f59e0b");
    }
    log(getLocMsg(move, 'msg'));
    updateUI();
}

function babaValyaTurn() {
    if (Math.random() < 0.4) {
        log(t('baba_plan'));
        setTimeout(function () { launchMenuAttack(); }, 500);
    } else {
        executeEnemyAttack(false);
    }
    if (state.hp > 0) {
        state.turn = 'player';
        updateUI();
    } else {
        gameOver(false);
    }
}

function launchMenuAttack() {
    var icons = ['*', '#', '@', '!'];
    var attackIcon = icons[rand(0, icons.length - 1)];
    var attackEl = document.createElement('div');
    attackEl.className = 'baba-valya-attack';
    setNodeText(attackEl, attackIcon);
    var rect = getSafeRect(el.arena);
    var startY = rand(rect.top + 50, rect.bottom - 50);
    var startX = document.body.clientWidth;
    attackEl.style.top = startY + 'px';
    attackEl.style.left = startX + 'px';

    // IE8 compatible event handling
    attackEl.onmouseover = function () { handleMenuAttackHover(attackEl); };
    el.babaValyaAttacksContainer.appendChild(attackEl);

    // Simple animation for IE8
    var pos = startX;
    var animInterval = setInterval(function () {
        pos -= 10;
        attackEl.style.left = pos + 'px';
        if (pos < -100) {
            clearInterval(animInterval);
            if (attackEl.parentNode) attackEl.parentNode.removeChild(attackEl);
        }
    }, 16);
}

function handleMenuAttackHover(element) {
    if (!element.getAttribute('data-hit')) {
        element.setAttribute('data-hit', 'true');
        state.hp -= 15;
        showFloat(el.pSprite, "-15", "#ef4444");
        animHit(el.pSprite);
        updateUI();
        log("Ай! Не мешайся под ногами!");
        element.style.filter = 'alpha(opacity=30)';
        if (state.hp <= 0) gameOver(false);
    }
}

function startScreamBattle() {
    state.screamActive = true;
    state.screamPlayerPower = 50;
    state.screamTimer = 15;
    state.screamDamageToPlayer = 0;
    state.screamDamageToEnemy = 0;
    el.screamOverlay.className = el.screamOverlay.className + ' show';
    document.getElementById('scream-title').textContent = t('scream_title');
    document.getElementById('scream-instr').textContent = t('scream_instr');

    updateScreamUI();
    if (state.screamInterval) clearInterval(state.screamInterval);
    state.screamInterval = setInterval(function () {
        state.screamPlayerPower -= 2;
        if (state.screamPlayerPower < 50) {
            var dmgRate = Math.floor((50 - state.screamPlayerPower) / 10);
            state.screamDamageToPlayer += dmgRate;
            state.hp -= dmgRate * 0.5;
        } else {
            var dmgRate2 = Math.floor((state.screamPlayerPower - 50) / 10);
            state.screamDamageToEnemy += dmgRate2;
        }
        state.screamTimer -= 0.1;
        state.screamPlayerPower = Math.max(0, Math.min(100, state.screamPlayerPower));
        updateScreamUI();
        updateUI();
        if (state.screamTimer <= 0 || state.screamPlayerPower >= 100 || state.screamPlayerPower <= 0 || state.hp <= 0) {
            endScreamBattle();
        }
    }, 100);
}

function updateScreamUI() {
    el.screamBarPlayer.style.width = state.screamPlayerPower + '%';
    el.screamBarEnemy.style.width = (100 - state.screamPlayerPower) + '%';
    el.screamTimer.textContent = Math.ceil(state.screamTimer);
    el.screamDmgPlayer.textContent = '-' + Math.floor(state.screamDamageToPlayer);
    el.screamDmgEnemy.textContent = '-' + Math.floor(state.screamDamageToEnemy);
}

function endScreamBattle() {
    clearInterval(state.screamInterval);
    state.screamActive = false;
    el.screamOverlay.className = el.screamOverlay.className.replace('show', '');
    if (state.screamPlayerPower >= 100) {
        var reflectDmg = rand(40, 60);
        state.enemyHp -= reflectDmg;
        log(t('scream_reflect') + reflectDmg);
        shakeScreen();
    } else if (state.screamPlayerPower <= 0) {
        var dmg = rand(30, 50);
        state.hp -= dmg;
        log(t('scream_fail') + dmg + ' HP');
        animHit(el.pSprite);
    } else {
        state.enemyHp -= state.screamDamageToEnemy;
        log(t('scream_end'));
    }
    updateUI();
    if (state.hp <= 0) {
        gameOver(false);
        return;
    }
    if (checkWin()) return;
    setTimeout(function () {
        state.turn = 'player';
        updateUI();
    }, 500);
}

// IE8 compatible event handlers for scream
function handleScreamKeyDown(e) {
    e = e || window.event;
    var key = e.keyCode || e.which;
    var keyChar = String.fromCharCode(key).toLowerCase();
    if (state.screamActive && (keyChar === 'x' || keyChar === 'ч')) {
        state.screamPlayerPower += 4;
        el.screamKey.className = el.screamKey.className + ' pressed';
        setTimeout(function () {
            el.screamKey.className = el.screamKey.className.replace('pressed', '');
        }, 50);
    }
}

function handleScreamMouseDown() {
    if (state.screamActive) {
        state.screamPlayerPower += 4;
        el.screamKey.className = el.screamKey.className + ' pressed';
    }
}

function handleScreamMouseUp() {
    el.screamKey.className = el.screamKey.className.replace('pressed', '');
}

// Attach events using IE8 compatible method
if (document.addEventListener) {
    document.addEventListener('keydown', handleScreamKeyDown);
} else if (document.attachEvent) {
    document.attachEvent('onkeydown', handleScreamKeyDown);
}

function checkWin() {
    if (state.hp <= 0) return false;
    if (state.currentMode === 'pvp') {
        if (state.hp <= 0 || state.enemyHp <= 0) {
            state.gameOver = true;
            var winner = state.enemyHp <= 0 ? t('p1_win') : t('p2_win');
            if (state.enemyHp <= 0) el.eSprite.className = el.eSprite.className + ' dead';
            if (state.hp <= 0) {
                el.pSprite.className = el.pSprite.className + ' dead';
                el.pImg.className = el.pImg.className + ' dead';
            }
            resetBattleState();
            setTimeout(function () {
                var modal = el.modal;
                var modalEmoji = qFind(modal, '#modal-emoji');
                var modalTitle = qFind(modal, '#modal-title');
                var modalDesc = qFind(modal, '#modal-desc');
                var modalBtn = qFind(modal, '#modal-btn');
                var modalMenuBtn = qFind(modal, '#modal-btn-menu');
                setNodeText(modalEmoji, '!');
                setNodeText(modalTitle, winner);
                setNodeText(modalDesc, t('nice_fight'));
                if (modalBtn) modalBtn.onclick = function () {
                    modal.className = modal.className.replace('show', '');
                    modal.style.display = 'none';
                    startPvP();
                };
                setNodeText(modalBtn, t('rematch'));
                setNodeText(modalMenuBtn, t('menu'));
                if (modalMenuBtn) modalMenuBtn.style.display = 'block';
                modal.className = modal.className + ' show';
                modal.style.display = 'block';
            }, 800);
            return true;
        }
        return false;
    }

    if (state.enemyHp <= 0) {
        state.enemyHp = 0;
        updateUI();
        el.eSprite.className = el.eSprite.className + ' dead';
        resetBattleState();

        var rpReward = Math.floor(state.currentEnemy.hp / 2);
        userProfile.rp += rpReward;
        if (window.syncUserData) window.syncUserData();

        setTimeout(function () {
            if (state.currentMode === 'endless') {
                showFloat(el.pSprite, t('win'), "#fbbf24");
                setTimeout(function () { startBattle('endless'); }, 1000);
            } else if (state.currentMode === 'story') {
                state.storyHp = Math.min(PLAYER_MAX_HP, state.hp + 30);
                state.storyMp = state.mp;
                state.storyInventory = state.inventory.slice();
                if (state.storyLevel < STORY_ENEMIES.length - 1) {
                    showModal('win-round');
                } else {
                    showModal('win-game');
                }
            } else {
                showModal('win-boss');
            }
        }, 800);
        return true;
    }
    return false;
}

function gameOver(win) {
    if (state.gameOver) return;
    state.gameOver = true;
    var mode = state.currentMode;
    resetBattleState();
    state.gameOver = true;
    saveScore(false);

    if (state.currentMode === 'story') {
        state.storyLevel = 0;
        state.storyHp = PLAYER_MAX_HP;
        state.storyMp = 50;
        state.storyInventory = [1, 1];
        saveProgress();
    }

    el.pSprite.className = el.pSprite.className + ' dead';
    el.pImg.className = el.pImg.className + ' dead';

    userProfile.rp += 10;
    if (window.syncUserData) window.syncUserData();

    setTimeout(function () { showModal('lose'); }, 1000);
}

function showModal(type) {
    pauseTimer();
    var isStoryOver = state.storyLevel >= STORY_ENEMIES.length;
    var spawnChance = state.hardcore ? (isStoryOver ? 0.20 : 0.1) : 0.1;
    if (state.currentEnemy && state.currentEnemy.isBabaValya) spawnChance = 0;
    if (state.currentMode === 'endless') spawnChance = 0;

    if ((type === 'win-round' || type === 'win-boss') && Math.random() < spawnChance) {
        var modal = el.modal;
        var modalEmoji = qFind(modal, '#modal-emoji');
        var modalTitle = qFind(modal, '#modal-title');
        var modalDesc = qFind(modal, '#modal-desc');
        var btn = qFind(modal, '#modal-btn');
        var modalMenuBtn = qFind(modal, '#modal-btn-menu');
        setNodeText(modalEmoji, 'B');
        setNodeText(modalTitle, t('sudden'));
        if (modalTitle) modalTitle.style.color = '#ef4444';
        setNodeText(modalDesc, t('baba_desc'));
        setNodeText(btn, t('to_battle'));
        if (btn) btn.style.display = 'block';
        if (modalMenuBtn) modalMenuBtn.style.display = 'none';
        if (btn) btn.onclick = function () {
            modal.className = modal.className.replace('show', '');
            modal.style.display = 'none';
            startBattle('baba_valya');
        };
        modal.className = modal.className + ' show';
        modal.style.display = 'block';
        return;
    }

    var title = document.getElementById('modal-title');
    var desc = document.getElementById('modal-desc');
    var emoji = document.getElementById('modal-emoji');
    var btn = document.getElementById('modal-btn');
    var menuBtn = document.getElementById('modal-btn-menu');
    menuBtn.style.display = 'block';
    menuBtn.textContent = t('menu');

    if (type === 'win-round') {
        var winText = state.currentEnemy ? (getLocMsg(state.currentEnemy, 'xp_txt') || t('win')) : t('win');
        emoji.textContent = "^";
        title.textContent = t('win');
        title.style.color = "#fbbf24";
        desc.textContent = winText + t('hp_bonus');
        btn.textContent = t('next_lvl');
        btn.style.display = 'block';

        btn.onclick = function () {
            saveScore(true);
            state.storyLevel++;
            saveProgress();
            el.modal.className = el.modal.className.replace('show', '');
            el.modal.style.display = 'none';
            startBattle('story');
        };

        menuBtn.onclick = function () {
            saveScore(true);
            state.storyLevel++;
            saveProgress();
            goToMenu();
        };

    } else if (type === 'win-game') {
        emoji.textContent = "*";
        title.textContent = t('win');
        title.style.color = "#fbbf24";
        desc.textContent = t('game_beat');
        btn.textContent = t('menu');
        btn.style.display = 'block';
        btn.onclick = function () {
            state.storyLevel++;
            saveScore(true);
            saveProgress();
            goToMenu();
        };
    } else if (type === 'win-boss') {
        var winText2 = state.currentEnemy ? (getLocMsg(state.currentEnemy, 'xp_txt') || t('win')) : t('win');
        emoji.textContent = "!";
        title.textContent = t('win');
        title.style.color = "#fbbf24";
        desc.textContent = winText2;
        btn.textContent = t('menu');
        btn.style.display = 'block';
        btn.onclick = function () {
            saveScore(true);
            saveProgress();
            goToMenu();
        };
        menuBtn.style.display = 'none';
    } else {
        emoji.textContent = "X";
        title.textContent = t('lose');
        title.style.color = "#ef4444";
        if (state.currentMode === 'endless') {
            desc.textContent = t('round') + ' ' + (state.endlessRound - 1);
        } else {
            desc.textContent = t('wasted_desc');
        }
        btn.textContent = t('try_again');
        btn.style.display = 'block';
        btn.onclick = function () {
            if (state.currentMode === 'endless') {
                startEndless(state.endlessType);
            } else {
                storage.removeItem('schoolRpgSave');
                window.location.reload();
            }
        };
    }
    el.modal.className = el.modal.className + ' show';
    el.modal.style.display = 'block';
}

function animAttack(element, dir) {
    Sound.attack();
    if (!element) return;
    if (dir === 'right') element.style.marginLeft = '40px';
    else if (dir === 'left') element.style.marginLeft = '-40px';
    else element.style.marginTop = '-20px';
    setTimeout(function () {
        element.style.marginLeft = '0';
        element.style.marginTop = '0';
    }, 200);
}

function animHit(element) {
    Sound.hit();
    if (!element) return;
    element.className = element.className + ' hit';
    setTimeout(function () {
        element.className = element.className.replace('hit', '');
    }, 400);
}

function shakeScreen() {
    el.arena.className = el.arena.className + ' shake-screen';
    setTimeout(function () {
        el.arena.className = el.arena.className.replace('shake-screen', '');
    }, 300);
}

function flashRed(element) {
    if (!element) return;
    element.className = element.className + ' flash-red';
    setTimeout(function () {
        element.className = element.className.replace('flash-red', '');
    }, 300);
}

function shake(element) {
    if (!element) return;
    element.style.marginLeft = '-5px';
    setTimeout(function () {
        element.style.marginLeft = '5px';
        setTimeout(function () {
            element.style.marginLeft = '0';
        }, 100);
    }, 100);
}

function showFloat(target, text, color) {
    if (!target) return;
    var div = floatTextPool.get();
    setNodeText(div, text);
    div.style.color = color;
    var rect = getSafeRect(target);
    div.style.left = ((rect.left + rect.width / 2 + rand(-20, 20)) | 0) + 'px';
    div.style.top = (rect.top | 0) + 'px';
    document.body.appendChild(div);
    setTimeout(function () {
        if (div.parentNode) div.parentNode.removeChild(div);
        floatTextPool.recycle(div);
    }, 800);
}

function spawnParticles(target, count, color) {
    if (!target) return;
    if (window.LegacyOptions && !window.LegacyOptions.particlesEnabled) return;
    var rect = getSafeRect(target);
    var centerX = (rect.left + rect.width / 2) | 0;
    var centerY = (rect.top + rect.height / 2) | 0;
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < count; i++) {
        var p = particlePool.get();
        p.style.backgroundColor = color;
        p.style.left = centerX + 'px';
        p.style.top = centerY + 'px';
        fragment.appendChild(p);

        var angle = Math.random() * Math.PI * 2;
        var velocity = Math.random() * 60 + 20;
        var tx = getCos(angle) * velocity;
        var ty = getSin(angle) * velocity;

        // Simple animation for IE8
        (function (particle, startX, startY, endX, endY) {
            var startTime = new Date().getTime();
            var duration = rand(400, 600);
            var animInterval = setInterval(function () {
                var elapsed = new Date().getTime() - startTime;
                var progress = elapsed / duration;
                if (progress >= 1) {
                    clearInterval(animInterval);
                    if (particle.parentNode) particle.parentNode.removeChild(particle);
                    particlePool.recycle(particle);
                    return;
                }
                particle.style.left = ((startX + endX * progress) | 0) + 'px';
                particle.style.top = ((startY + endY * progress) | 0) + 'px';
                particle.style.filter = 'alpha(opacity=' + Math.floor((1 - progress) * 100) + ')';
            }, 30); // 33fps is enough for particles on IE8
        })(p, centerX, centerY, tx, ty);
    }
    document.body.appendChild(fragment);
}

function formatTime(ms) {
    var minutes = Math.floor(ms / 60000);
    var seconds = Math.floor((ms % 60000) / 1000);
    var milliseconds = ms % 1000;
    return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds + ':' + (milliseconds < 10 ? '00' : (milliseconds < 100 ? '0' : '')) + milliseconds;
}

function updateTimerDisplay() {
    el.speedrunTimer.textContent = formatTime(state.speedrunTime);
}

function startTimer() {
    if (!state.isSpeedrunPaused) return;
    state.isSpeedrunPaused = false;
    el.speedrunTimer.style.display = 'block';
    var startTime = new Date().getTime() - state.speedrunTime;
    state.speedrunInterval = setInterval(function () {
        state.speedrunTime = new Date().getTime() - startTime;
        updateTimerDisplay();
    }, 10);
}

function pauseTimer() {
    if (state.speedrunInterval) {
        clearInterval(state.speedrunInterval);
        state.speedrunInterval = null;
        state.isSpeedrunPaused = true;
    }
}

function resetTimer() {
    pauseTimer();
    state.speedrunTime = 0;
    state.isSpeedrunPaused = true;
    el.speedrunTimer.style.display = 'none';
    updateTimerDisplay();
}

function saveScore(isWin) {
    if (state.currentMode === 'pvp') return;

    var progress = state.storyLevel;
    var enemyName = state.currentEnemy ? state.currentEnemy.name : '—';
    if (state.currentMode === 'endless') {
        enemyName = 'Endless (' + (state.endlessType.indexOf('story_') === 0 ? 'Story' : state.endlessType) + ')';
        progress = state.endlessRound - 1;
    } else if (state.currentMode !== 'story') {
        var bossKeys = [];
        for (var key in EXTRA_BOSSES) {
            if (EXTRA_BOSSES.hasOwnProperty(key)) {
                bossKeys.push(key);
            }
        }
        progress = STORY_ENEMIES.length + bossKeys.indexOf(state.currentMode);
    } else {
        progress = state.storyLevel;
        if (progress < STORY_ENEMIES.length) {
            enemyName = STORY_ENEMIES[progress].name;
        } else {
            enemyName = "Выпускной";
        }
    }

    var used0 = 1 - state.inventory[0];
    var used1 = 1 - state.inventory[1];
    var itemsUsed = (used0 > 0 ? used0 : 0) + (used1 > 0 ? used1 : 0);

    var enemyMax = state.currentEnemy ? state.currentEnemy.hp : 100;

    var newScore = {
        name: state.playerName || userProfile.name || 'Хардкор',
        progress: progress,
        enemyName: enemyName,
        time: state.speedrunTime,
        hp: Math.floor(state.hp),
        mp: Math.floor(state.mp),
        hardcore: state.hardcore,
        isWin: isWin,
        itemsUsed: itemsUsed,
        enemyHpLeft: Math.floor(state.enemyHp),
        enemyMaxHp: enemyMax
    };

    var leaderboardStr = storage.getItem('schoolRpgLeaderboard') || '[]';
    var leaderboard = JSON.parse(leaderboardStr);
    leaderboard.push(newScore);
    storage.setItem('schoolRpgLeaderboard', JSON.stringify(leaderboard));

    if (window.saveScoreOnline) {
        window.saveScoreOnline(newScore);
    }
}

function showLeaderboard() {
    try {
        var modal = document.getElementById('leaderboard-modal');
        modal.className = modal.className + ' show';

        document.getElementById('lb-title').textContent = t('lb_title');
        document.getElementById('lb-opt-all').textContent = t('lb_all');
        document.getElementById('lb-opt-wins').textContent = t('lb_wins');
        document.getElementById('lb-opt-losses').textContent = t('lb_losses');
        document.getElementById('lb-th-name').textContent = t('lb_name');
        document.getElementById('lb-th-enemy').textContent = t('lb_enemy');
        document.getElementById('lb-th-pts').textContent = t('lb_pts');
        document.getElementById('lb-load-more').textContent = t('lb_load_more');
        document.getElementById('lb-btn-close').textContent = t('lb_close');

        if (window.loadLeaderboardOnline) {
            window.loadLeaderboardOnline();
        } else {
            showLocalLeaderboard();
        }
    } catch (e) {
        alert("Leaderboard Error: " + e.message);
    }
}

function showLocalLeaderboard() {
    var leaderboardStr = storage.getItem('schoolRpgLeaderboard') || '[]';
    var leaderboard = JSON.parse(leaderboardStr);
    var filter = document.getElementById('filter-select').value;

    for (var i = 0; i < leaderboard.length; i++) {
        var s = leaderboard[i];
        if (s.isWin === undefined) {
            s.isWin = (s.hp > 0);
        }
    }

    var filtered = leaderboard;
    if (filter === 'wins') {
        filtered = leaderboard.filter(function (s) { return s.isWin; });
    }
    if (filter === 'losses') {
        filtered = leaderboard.filter(function (s) { return !s.isWin; });
    }

    filtered.sort(function (a, b) {
        var scoreA = calculateSmartScore(a);
        var scoreB = calculateSmartScore(b);
        return scoreB - scoreA;
    });

    el.leaderboardTable.innerHTML = '';
    if (filtered.length === 0) {
        el.leaderboardTable.innerHTML = '<tr><td colspan="5" style="text-align:center;">Записей нет.</td></tr>';
        return;
    }

    for (var index = 0; index < filtered.length; index++) {
        var score = filtered[index];
        var row = el.leaderboardTable.insertRow();

        var isRealWin = (score.isWin === true) && (score.hp > 0);

        if (score.hardcore) row.className = row.className + ' hardcore-entry';
        if (isRealWin) row.className = row.className + ' win-row';

        var statusIcon = isRealWin ? "!" : "X";
        var pts = calculateSmartScore(score);
        var enemyName = getLocName(score.enemyName);

        row.innerHTML = '<td>' + (index + 1) + '</td><td>' + score.name + '</td><td>' + statusIcon + ' ' + enemyName + '</td><td>' + score.hp + '/' + score.mp + '</td><td class="score-val">' + pts + '</td>';
    }

    if (navigator && navigator.onLine === false) {
        var row = el.leaderboardTable.insertRow();
        row.innerHTML = '<td colspan="5" style="text-align:center; color: #9ca3af; font-size: 0.6rem;">' + t('lb_offline') + '</td>';
    }
}

// === TRUE BALANCE SCORING SYSTEM ===
window.calculateSmartScore = function (entry) {
    if (entry.isWin === undefined) entry.isWin = (entry.hp > 0);

    var basePoints = 0;
    var name = entry.enemyName || "";

    if (name.indexOf("Егор") !== -1) basePoints = 200;
    else if (name.indexOf("Макар") !== -1) basePoints = 500;
    else if (name.indexOf("Вадим") !== -1) basePoints = 1200;
    else if (name.indexOf("Лилия") !== -1) basePoints = 2800;
    else if (name.indexOf("Наталья") !== -1) basePoints = 2800;
    else if (name.indexOf("Лариса") !== -1) basePoints = 3000;
    else if (name.indexOf("Марьванна") !== -1 || name.indexOf("Завуч") !== -1) basePoints = 6000;
    else if (name.indexOf("Дмитрий") !== -1 || name.indexOf("Директор") !== -1) basePoints = 9000;
    else if (name.indexOf("Баба Валя") !== -1) basePoints = 15000;
    else if (name.indexOf("Endless") !== -1) {
        var roundMatch = entry.enemyName.match(/\(R(\d+)\)/);
        var round = roundMatch ? parseInt(roundMatch[1], 10) : 1;
        basePoints = round * 300;
    }

    var totalScore = 0;
    var hardcoreMult = entry.hardcore ? 1.5 : 1.0;
    var winBonus = 200;

    if (entry.isWin) {
        var itemsLeft = 2 - (entry.itemsUsed || 0);
        var itemBonus = (itemsLeft > 0) ? itemsLeft * 300 : 0;
        totalScore = (basePoints * hardcoreMult) + winBonus + (entry.hp * 5) + itemBonus;
    } else {
        var damagePercent = 0;
        if (entry.enemyMaxHp && entry.enemyHpLeft !== undefined) {
            damagePercent = 1 - (entry.enemyHpLeft / entry.enemyMaxHp);
            if (damagePercent < 0) damagePercent = 0;
        } else {
            damagePercent = 0.1;
        }
        totalScore = (basePoints * hardcoreMult) * damagePercent * 0.75;
    }

    return Math.floor(totalScore);
};

function saveProgress() {
    var save = {
        storyLevel: state.storyLevel,
        storyHp: state.storyHp,
        storyMp: state.storyMp,
        storyInventory: state.storyInventory,
        playerName: state.playerName,
        hardcore: state.hardcore
    };
    storage.setItem('schoolRpgSave', JSON.stringify(save));
}

function loadProgress() {
    var save = storage.getItem('schoolRpgSave');
    if (save) {
        var data = JSON.parse(save);
        state.storyLevel = data.storyLevel !== undefined ? data.storyLevel : 0;
        state.storyHp = data.storyHp !== undefined ? data.storyHp : PLAYER_MAX_HP;
        state.storyMp = data.storyMp !== undefined ? data.storyMp : 50;
        state.storyInventory = data.storyInventory || [1, 1];
        state.playerName = data.playerName || '';
        state.hardcore = data.hardcore || false;
        return true;
    }
    return false;
}

function resetProgress() {
    if (confirm(t('reset_confirm'))) {
        storage.removeItem('schoolRpgSave');
        storage.removeItem('schoolRpgProfile');
        window.location.reload();
    }
}

function tryStartGame() {
    var nameInput = document.getElementById('player-name-input');
    var name = nameInput.value;
    if (name) name = name.replace(/^\s+|\s+$/g, '');
    if (!name) {
        name = "Player";
        nameInput.value = name;
    }

    document.getElementById('hc-title').textContent = t('hc_title');
    document.getElementById('hardcore-yes').textContent = t('hc_yes');
    document.getElementById('hardcore-no').textContent = t('hc_no');
    el.hardcoreModal.className = el.hardcoreModal.className + ' show';
}

// Hardcore Handlers
document.getElementById('hardcore-yes').onclick = function () {
    if (window.isAnonymousLogin) {
        userProfile.loggedIn = false;
        userProfile.name = 'X';
        userProfile.rp = 0;
        userProfile.unlockedSkins = ['default'];
        userProfile.currentSkin = 'default';

        state.playerName = 'X';
        state.storyLevel = 0;
        state.storyHp = PLAYER_MAX_HP;
        state.storyMp = 50;
        state.storyInventory = [1, 1];
        state.hardcore = true;
        document.body.className = document.body.className + ' hardcore';
    } else {
        var name = document.getElementById('player-name-input').value;
        if (name) name = name.replace(/^\s+|\s+$/g, '');
        state.playerName = name;
        state.storyLevel = 0;
        state.storyHp = PLAYER_MAX_HP;
        state.storyMp = 50;
        state.storyInventory = [1, 1];
        state.hardcore = true;
        document.body.className = document.body.className + ' hardcore';
    }

    saveProgress();
    el.hardcoreModal.className = el.hardcoreModal.className.replace('show', '');
    setupMenu();
    window.isAnonymousLogin = false;
};

document.getElementById('hardcore-no').onclick = function () {
    if (window.isAnonymousLogin) {
        el.hardcoreModal.className = el.hardcoreModal.className.replace('show', '');
        window.isAnonymousLogin = false;
        return;
    }

    var name = document.getElementById('player-name-input').value;
    if (name) name = name.replace(/^\s+|\s+$/g, '');
    state.playerName = name;
    state.storyLevel = 0;
    state.storyHp = PLAYER_MAX_HP;
    state.storyMp = 50;
    state.storyInventory = [1, 1];
    state.hardcore = false;
    document.body.className = document.body.className.replace('hardcore', '');
    saveProgress();
    el.hardcoreModal.className = el.hardcoreModal.className.replace('show', '');
    setupMenu();
};

function setupMenu() {
    var langBtn = document.getElementById('lang-btn');
    if (langBtn) langBtn.textContent = CONFIG.lang.toUpperCase();
    var muteBtn = document.getElementById('mute-btn');
    if (muteBtn) muteBtn.textContent = CONFIG.muted ? '(X)' : '(O)';

    updateAllTexts();
    updateMenuStats();

    if (userProfile.loggedIn) {
        loadProgress();
        el.authSection.style.display = 'none';
        el.mainMenuContainer.style.display = 'block';

        var nameInput = document.getElementById('player-name-input');
        if (nameInput && userProfile.name) nameInput.value = userProfile.name;

        if (window.pendingHardcorePrompt) {
            window.pendingHardcorePrompt = false;
            setTimeout(function () { tryStartGame(); }, 500);
        }
    } else {
        var hasSave = loadProgress();
        if (hasSave) {
            el.authSection.style.display = 'none';
            el.mainMenuContainer.style.display = 'block';
            updateMenuStats();
        } else {
            el.authSection.style.display = 'block';
            el.mainMenuContainer.style.display = 'none';
        }
    }
}

// === SHOP LOGIC ===
function openShop() {
    el.shopRpDisplay.textContent = userProfile.rp;
    el.shopGrid.innerHTML = '';

    for (var i = 0; i < SKINS.length; i++) {
        var skin = SKINS[i];
        var item = document.createElement('div');
        var isOwned = false;
        for (var j = 0; j < userProfile.unlockedSkins.length; j++) {
            if (userProfile.unlockedSkins[j] === skin.id) {
                isOwned = true;
                break;
            }
        }
        var isEquipped = userProfile.currentSkin === skin.id;

        item.className = 'shop-item' + (isOwned ? ' owned' : '') + (isEquipped ? ' equipped' : '');

        var previewHtml = '<div class="preview">' + skin.icon + '</div>';
        if (skin.type === 'image' && userProfile.customImage) {
            previewHtml = '<img src="' + userProfile.customImage + '" class="preview-img">';
        }

        var skinName = (CONFIG.lang === 'en' && skin.name_en) ? skin.name_en : skin.name;
        var statusDict = CONFIG.lang === 'en' ? { own: 'OWNED', eq: 'EQUIPPED' } : { own: 'КУПЛЕНО', eq: 'ВЫБРАНО' };
        var statusText = isOwned ? (isEquipped ? statusDict.eq : statusDict.own) : skin.cost + ' RP';

        item.innerHTML = previewHtml + '<div class="name">' + skinName + '</div><div class="price">' + statusText + '</div>';

        item.setAttribute('data-skin-id', skin.id);
        el.shopGrid.appendChild(item);
    }

    if (!el.shopGrid._delegated) {
        el.shopGrid._delegated = true;
        var shopDelegate = function (e) {
            e = e || window.event;
            var target = e.target || e.srcElement;
            while (target && target !== el.shopGrid && !target.getAttribute('data-skin-id')) {
                target = target.parentNode;
            }
            if (target && target.getAttribute('data-skin-id')) {
                var sid = target.getAttribute('data-skin-id');
                var sData = null;
                for (var k = 0; k < SKINS.length; k++) {
                    if (SKINS[k].id === sid) { sData = SKINS[k]; break; }
                }
                if (sData) handleShopClick(sData);
            }
        };
        if (el.shopGrid.addEventListener) el.shopGrid.addEventListener('click', shopDelegate);
        else el.shopGrid.attachEvent('onclick', shopDelegate);
    }

    el.shopModal.className = el.shopModal.className + ' show';
}

function handleShopClick(skin) {
    Sound.click();
    var isOwned = false;
    for (var i = 0; i < userProfile.unlockedSkins.length; i++) {
        if (userProfile.unlockedSkins[i] === skin.id) {
            isOwned = true;
            break;
        }
    }

    if (isOwned) {
        if (skin.id === 'custom') {
            if (!userProfile.customImage) {
                document.getElementById('custom-skin-input').click();
                return;
            }
            if (userProfile.currentSkin === 'custom') {
                if (confirm(t('change_photo_confirm') || "Сменить фото?")) {
                    document.getElementById('custom-skin-input').click();
                }
                return;
            }
        }

        userProfile.currentSkin = skin.id;
        if (window.syncUserData) window.syncUserData();
        else saveLocalFallback();
        openShop();
    } else {
        if (userProfile.rp >= skin.cost) {
            if (confirm('Купить "' + skin.name + '" за ' + skin.cost + ' RP?')) {
                Sound.win();
                userProfile.rp -= skin.cost;
                userProfile.unlockedSkins.push(skin.id);
                if (skin.id === 'custom') alert("Теперь выбери этот скин снова, чтобы загрузить фото!");
                if (window.syncUserData) window.syncUserData();
                else saveLocalFallback();
                openShop();
            }
        } else {
            alert("Недостаточно RP!");
        }
    }
}

// IE8 compatible file input handler - wrapped in function to call on load
function initFileInput() {
    var customSkinInput = document.getElementById('custom-skin-input');
    if (customSkinInput) {
        if (customSkinInput.addEventListener) {
            customSkinInput.addEventListener('change', function (e) {
                handleCustomSkinChange(e);
            });
        } else if (customSkinInput.attachEvent) {
            customSkinInput.attachEvent('onchange', function (e) {
                handleCustomSkinChange(e);
            });
        }
    }
}

function handleCustomSkinChange(e) {
    var file = e.target.files ? e.target.files[0] : null;
    if (!file) return;

    // FileReader may not work in IE8, skip custom image functionality
    if (window.FileReader) {
        var reader = new FileReader();
        reader.onload = function (evt) {
            var img = new Image();
            img.onload = function () {
                var cvs = document.createElement('canvas');
                cvs.width = 100;
                cvs.height = 100;
                cvs.getContext('2d').drawImage(img, 0, 0, 100, 100);
                userProfile.customImage = cvs.toDataURL('image/jpeg', 0.8);
                userProfile.currentSkin = 'custom';
                if (window.syncUserData) window.syncUserData();
                else saveLocalFallback();
                openShop();
            };
            img.src = evt.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        alert("Custom images not supported in this browser");
    }
}

// === FALLBACK LOCAL STORAGE ACCOUNT SYSTEM ===
function fallbackLogin(name, pass) {
    console.warn("Using Local Fallback Auth");
    var msgEl = document.getElementById('auth-msg');

    try {
        var dbStr = storage.getItem('rpg_accounts_db') || '{}';
        var db = JSON.parse(dbStr);
        var userId = name.toLowerCase();

        if (db[userId]) {
            if (db[userId].password) {
                if (db[userId].password !== pass) {
                    msgEl.textContent = CONFIG.lang === 'en' ? "Wrong password!" : "Неверный пароль!";
                    return;
                }
            } else {
                if (!pass) {
                    msgEl.textContent = "Придумайте пароль!";
                    return;
                }
                db[userId].password = pass;
                storage.setItem('rpg_accounts_db', JSON.stringify(db));
            }

            for (var key in db[userId]) {
                if (db[userId].hasOwnProperty(key)) {
                    userProfile[key] = db[userId][key];
                }
            }
            userProfile.loggedIn = true;
            saveLocalFallback();
            state.storyLevel = userProfile.storyLevel || 0;
            msgEl.textContent = CONFIG.lang === 'en' ? "Logged in!" : "Вход выполнен!";
        } else {
            if (!pass) {
                msgEl.textContent = "Пароль обязателен!";
                return;
            }

            var newUser = {
                name: name,
                password: pass,
                rp: 100,
                unlockedSkins: ['default'],
                currentSkin: 'default',
                customImage: null,
                storyLevel: 0
            };
            db[userId] = newUser;
            storage.setItem('rpg_accounts_db', JSON.stringify(db));
            for (var key2 in newUser) {
                if (newUser.hasOwnProperty(key2)) {
                    userProfile[key2] = newUser[key2];
                }
            }
            userProfile.loggedIn = true;
            msgEl.textContent = "Аккаунт создан (+100 RP)!";
        }

        setTimeout(function () {
            window.setupMenu();
        }, 1000);

    } catch (e) {
        console.error(e);
        msgEl.textContent = "Ошибка сохранения";
    }
}

function saveLocalFallback() {
    if (!userProfile.name) return;

    storage.setItem('schoolRpgProfile', JSON.stringify(userProfile));

    var dbStr = storage.getItem('rpg_accounts_db') || '{}';
    var db = JSON.parse(dbStr);
    var userId = userProfile.name.toLowerCase();

    userProfile.storyLevel = state.storyLevel;
    db[userId] = {};
    for (var key in userProfile) {
        if (userProfile.hasOwnProperty(key) && key !== 'loggedIn') {
            db[userId][key] = userProfile[key];
        }
    }

    storage.setItem('rpg_accounts_db', JSON.stringify(db));
}

// Wrap Sync for global usage
window.syncUserData = function () {
    saveLocalFallback();
};

// === ADMIN KEYS ===
var pressedKeys = {};

function handleKeyDown(e) {
    e = e || window.event;
    var key = e.keyCode || e.which;
    var keyChar = String.fromCharCode(key).toUpperCase();
    pressedKeys[keyChar] = true;

    if (pressedKeys['A'] && pressedKeys['D'] && pressedKeys['M']) {
        var pass = prompt('ADMIN PANEL\nEnter Password:');
        if (pass === '4isi1362isi!') {
            var cmd = prompt('Commands:\n1. baba (Spawn Boss)\n2. clear (Wipe Save)\n3. god (Max Stats)\n4. win (Kill Enemy)\n5. story (Reset Story Progress)');
            if (cmd === 'baba') {
                el.menuScreen.className = el.menuScreen.className + ' hidden';
                startBattle('baba_valya');
            }
            if (cmd === 'clear') {
                storage.removeItem('schoolRpgSave');
                storage.removeItem('schoolRpgProfile');
                storage.removeItem('rpg_accounts_db');
                storage.removeItem('schoolRpgLeaderboard');
                window.location.reload();
            }
            if (cmd === 'god') {
                state.hp = 999;
                state.mp = 999;
                state.inventory = [99, 99];
                updateUI();
            }
            if (cmd === 'win') {
                state.enemyHp = 0;
                checkWin();
            }
            if (cmd === 'story') {
                state.storyLevel = 0;
                state.storyHp = 120;
                saveProgress();
                if (window.syncUserData) window.syncUserData();
                alert('Story Level reset to 0');
                window.location.reload();
            }
        }
        pressedKeys = {};
    }
}

function handleKeyUp(e) {
    e = e || window.event;
    var key = e.keyCode || e.which;
    var keyChar = String.fromCharCode(key).toUpperCase();
    delete pressedKeys[keyChar];
}

// Attach admin key events
if (document.addEventListener) {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
} else if (document.attachEvent) {
    document.attachEvent('onkeydown', handleKeyDown);
    document.attachEvent('onkeyup', handleKeyUp);
}

// === FILE EXPORT / IMPORT ===
function exportSave() {
    var save = storage.getItem('schoolRpgSave');
    if (!save) {
        alert('Нет сохранений для экспорта!');
        return;
    }
    // IE8 doesn't support Blob/download, show data in prompt
    if (window.Blob && window.URL) {
        var blob = new Blob([save], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'school_rpg_save.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } else {
        // Fallback for IE8 - show in textarea
        alert('Save data (copy this):\n' + save);
    }
}

function triggerImport() {
    document.getElementById('import-file').click();
}

function importSave(input) {
    var file = input.files ? input.files[0] : null;
    if (!file) return;

    if (window.FileReader) {
        var reader = new FileReader();
        reader.onload = function (e) {
            try {
                var data = JSON.parse(e.target.result);
                if (data.storyLevel !== undefined && data.storyHp !== undefined) {
                    storage.setItem('schoolRpgSave', JSON.stringify(data));
                    alert('Сохранение успешно загружено! Игра будет перезагружена.');
                    window.location.reload();
                } else {
                    alert('Ошибка: Файл не содержит данных игры.');
                }
            } catch (err) {
                alert('Ошибка чтения файла: ' + err.message);
            }
        };
        reader.readAsText(file);
    } else {
        alert('File import not supported in this browser');
    }
}

// === INITIALIZATION ===
// Wrap in window.onload for IE6 compatibility
function doInit() {
    initElements();
    setupMenu();
    initFileInput();
    applyCompactLayout();

    // Show connection status
    if (window.useLocalMode) {
        showConnectionStatus("offline");
    } else if (window.firebaseReady) {
        showConnectionStatus("online");
    } else {
        showConnectionStatus("connecting");
    }

    if (state.hardcore && document.body) document.body.className = document.body.className + ' hardcore';
}

if (window.attachEvent) {
    window.attachEvent('onload', doInit);
    window.attachEvent('onresize', applyCompactLayout);
} else if (window.addEventListener) {
    window.addEventListener('load', doInit, false);
    window.addEventListener('resize', applyCompactLayout, false);
} else {
    window.onload = doInit;
    window.onresize = applyCompactLayout;
}

// === DAILY REWARDS FALLBACK ===
window.openDailyMenu = window.openDailyMenu || function () {
    var modal = document.getElementById('daily-modal');
    if (!modal) return;
    modal.className = modal.className + ' show';
    var grid = document.getElementById('daily-grid');
    grid.innerHTML = '';

    var rewards = [100, 200, 300, 400, 500, 600, 1000];
    var today = new Date().setHours(0, 0, 0, 0);
    var lastClaim = userProfile.lastClaimDate ? new Date(userProfile.lastClaimDate).setHours(0, 0, 0, 0) : 0;

    if (lastClaim > 0 && today - lastClaim > 86400000) {
        userProfile.dailyStreak = 0;
    }

    var streak = userProfile.dailyStreak || 0;
    var canClaim = (today > lastClaim);

    for (var i = 0; i < rewards.length; i++) {
        var val = rewards[i];
        var dayEl = document.createElement('div');
        dayEl.className = 'daily-day' + (i === 6 ? ' big-prize' : '');

        if (i < streak) {
            dayEl.className = dayEl.className + ' claimed';
            dayEl.innerHTML = '<div>' + t('day') + ' ' + (i + 1) + '</div><div style="opacity:0.5">+' + val + ' RP</div>';
        } else if (i === streak) {
            dayEl.className = dayEl.className + ' available';
            dayEl.innerHTML = '<div>' + t('day') + ' ' + (i + 1) + '</div><div>+' + val + ' RP</div>';
        } else {
            dayEl.innerHTML = '<div>' + t('day') + ' ' + (i + 1) + '</div><div style="opacity:0.5">+' + val + ' RP</div>';
        }
        grid.appendChild(dayEl);
    }

    var btn = document.getElementById('daily-claim-btn');
    btn.disabled = !canClaim;
    btn.textContent = canClaim ? t('daily_claim') : t('daily_claimed');
};

window.claimDailyReward = window.claimDailyReward || function () {
    var rewards = [100, 200, 300, 400, 500, 600, 1000];
    var streak = userProfile.dailyStreak || 0;

    var reward = rewards[streak % 7];
    userProfile.rp += reward;
    userProfile.dailyStreak = (streak + 1) % 7;
    userProfile.lastClaimDate = new Date().getTime();

    if (window.syncUserData) window.syncUserData();
    else saveLocalFallback();

    Sound.win();
    window.openDailyMenu();
    window.updateMenuStats();
};

// === GLOBAL FUNCTIONS ===
window.getLocName = getLocName;
window.calculateSmartScore = calculateSmartScore;
window.reloadLeaderboard = function () {
    if (window.loadLeaderboardOnline) {
        window.loadLeaderboardOnline();
    } else {
        showLocalLeaderboard();
    }
};
