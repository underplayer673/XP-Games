/* --- CONFIG & DATA --- */
let currentLang = 'en'; // Default

const TRANSLATIONS = {
    en: {
        money: "Coins", level: "Level", hp: "Health", portal: "🌌 PORTAL", species: "📖 SPECIES",
        inventory: "🎒 Storage", garden: "Garden", shop: "🏪 Shop", plot: "PLOT", newPlot: "🧺 New Bed",
        rain: "🌧️ RAIN! Growth x2", rainStart: "🌧️ Rain started!",
        admin: "👨‍💻 ADMIN", godmode: "🔥 GOD MODE", toggleEn: "Toggle Enemies", toggleRain: "Toggle Rain", close: "Close",
        earth: "🌳 EARTH", sovereigns: "🧪 SOVEREIGNS",
        portalTitle: "🌌 GALACTIC PORTAL", galPrice: "Price: 10,000,000💰 / ea", yourGal: "Your Galaxies:", sellGal: "SELL ALL (🌀 -> 💰)",
        yggUp: "Yggdrasil Upgrades", buyUni: "👑 BUY UNIVERSE (10B💰)", closePortal: "Close Portal",
        yggMaxCap: "✅ MAX CAPACITY", yggMaxSpeed: "✅ MAX SPEED",
        starDust: "✨ Star Dust", speedUp: "Speed: 30s -> 10s",
        victory: "🎉 VICTORY! 🎉", vicText: "You have accumulated enough wealth to buy this Universe.\nYou are now the Sovereign.", cont: "CONTINUE PLAYING",
        buy: "Buy", bought: "OWNED", locked: "🔒 Lvl.",
        mix: "CROSSBREED", mixAll: "CROSSBREED ALL", need2: "Need 2!", noMoney: "No Money!", success: "Success: ", fail: "Failure...",
        discovered: "📖 Discovered: ", foundPart: "⚙️ Part found!", harvested: "Harvested",
        attack: "ATTACK!", hit: "HIT", dead: "YOU DIED", deathPenalty: "Lost 40% coins & plants", win: "VICTORY!", ok: "OK", pause: "PAUSE", play: "PLAYING",
        buyPrice: "Buy price", sellPrice: "Sell price", growTime: "Grow time", recipe: "Recipe",
        source: "Source", sourceShop: "Shop", sourceLab: "Laboratory", unknownRecipe: "Unknown",
        triadRecipe: "Any two L2 Triads (random)", yggRecipe: "Synthesis of all L3 Sovereigns", seconds: "s",
        enemies: {
            zombie: "Zombie Rabbit", wasp: "Mutant Wasp", tank: "Tank Zombie", titan: "Titan", boss: "WASTELAND LORD"
        }
    },
    ru: {
        money: "Монеты", level: "Уровень", hp: "Здоровье", portal: "🌌 ПОРТАЛ", species: "📖 ВИДЫ",
        inventory: "🎒 Склад", garden: "Сад", shop: "🏪 Магазин", plot: "УЧАСТОК", newPlot: "🧺 Новая грядка",
        rain: "🌧️ ДОЖДЬ! Рост x2", rainStart: "🌧️ Начинается дождь!",
        admin: "👨‍💻 АДМИН", godmode: "🔥 БОГ-РЕЖИМ", toggleEn: "Враги Вкл/Выкл", toggleRain: "Дождь Вкл/Выкл", close: "Закрыть",
        earth: "🌳 ЗЕМНОЙ", sovereigns: "🧪 СУВЕРЕНЫ",
        portalTitle: "🌌 ГАЛАКТИЧЕСКИЙ ПОРТАЛ", galPrice: "Цена: 10,000,000💰 / шт", yourGal: "Ваши Галактики:", sellGal: "ПРОДАТЬ ВСЕ (🌀 -> 💰)",
        yggUp: "Улучшения Иггдрасиля", buyUni: "👑 ВЫКУПИТЬ ВСЕЛЕННУЮ (10 МЛРД💰)", closePortal: "Закрыть портал",
        yggMaxCap: "✅ МАКС. ВМЕСТИМОСТЬ", yggMaxSpeed: "✅ МАКС. СКОРОСТЬ",
        starDust: "✨ Звёздная Пыль", speedUp: "Скорость: 30с -> 10с",
        victory: "🎉 ПОБЕДА! 🎉", vicText: "Вы накопили достаточно средств и выкупили эту Вселенную.\nТеперь вы - новый Суверен.", cont: "ПРОДОЛЖИТЬ",
        buy: "Купить", bought: "КУПЛЕНО", locked: "🔒 Ур.",
        mix: "СКРЕСТИТЬ", mixAll: "СКРЕСТИТЬ ВСЁ", need2: "Нужно 2!", noMoney: "Нет денег!", success: "Успех: ", fail: "Неудача...",
        discovered: "📖 Открыто: ", foundPart: "⚙️ Найдена деталь!", harvested: "Собрано",
        attack: "АТАКА!", hit: "БИТЬ", dead: "ВЫ ПОГИБЛИ", deathPenalty: "Потеряно 40% монет и растений", win: "ПОБЕДА!", ok: "ОК", pause: "ПАУЗА", play: "ИГРАЕМ",
        buyPrice: "Цена покупки", sellPrice: "Цена продажи", growTime: "Время роста", recipe: "Рецепт",
        source: "Источник", sourceShop: "Магазин", sourceLab: "Лаборатория", unknownRecipe: "Неизвестно",
        triadRecipe: "Любые 2 L2 триады (случайно)", yggRecipe: "Синтез всех L3 суверенов", seconds: "с",
        enemies: {
            zombie: "Зомби-кролик", wasp: "Мутант-оса", tank: "Танк-зомби", titan: "Титан", boss: "ПОВЕЛИТЕЛЬ ПУСТОШИ"
        }
    }
};

function t(key) { return TRANSLATIONS[currentLang][key] || key; }

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'ru' : 'en';
    document.getElementById('lang-btn').innerText = currentLang.toUpperCase();
    applyLanguage();
}

function applyLanguage() {
    const L = TRANSLATIONS[currentLang];
    document.getElementById('lbl-money').innerText = L.money;
    document.getElementById('lbl-level').innerText = L.level;
    document.getElementById('lbl-hp').innerText = L.hp;
    document.getElementById('lbl-portal').innerText = L.portal;
    document.getElementById('lbl-species').innerText = L.species;
    document.getElementById('hdr-inventory').innerText = L.inventory;
    document.getElementById('hdr-shop').innerText = L.shop;
    document.getElementById('lbl-plot').innerText = L.plot;
    document.getElementById('btn-new-plot').innerText = L.newPlot;
    document.getElementById('txt-rain').innerText = L.rain.split('!')[0] + "!"; // Simple hack
    document.getElementById('tab-earth').innerText = L.earth;
    document.getElementById('tab-sov').innerText = L.sovereigns;
    document.getElementById('btn-close-enc').innerText = L.close;
    document.getElementById('title-portal').innerText = L.portalTitle;
    document.getElementById('price-galaxy').innerText = L.galPrice;
    document.getElementById('lbl-galaxies').innerText = L.yourGal;
    document.getElementById('btn-sell-galaxy').innerText = L.sellGal;
    document.getElementById('hdr-upgrades').innerText = L.yggUp;
    document.getElementById('btn-buy-universe').innerText = L.buyUni;
    document.getElementById('btn-close-portal').innerText = L.closePortal;
    document.getElementById('txt-victory').innerText = L.vicText;
    document.getElementById('btn-continue').innerText = L.cont;
    document.getElementById('btn-reset').innerText = "🗑️ " + (currentLang === 'en' ? "RESET GAME" : "СБРОС ИГРЫ");

    updateUI();
}

const ITEMS = {
    carrot: { type: 'plant', cat: 'seeds', name_ru: "Морковь", name_en: "Carrot", cost: 10, sell: 15, time: 5, xp: 5, icon: "🥕", req: 1, tier: 1 },
    potato: { type: 'plant', cat: 'seeds', name_ru: "Картофель", name_en: "Potato", cost: 30, sell: 45, time: 10, xp: 10, icon: "🥔", req: 2, tier: 1 },
    tomato: { type: 'plant', cat: 'seeds', name_ru: "Томат", name_en: "Tomato", cost: 70, sell: 110, time: 20, xp: 20, icon: "🍅", req: 3 },
    corn: { type: 'plant', cat: 'seeds', name_ru: "Кукуруза", name_en: "Corn", cost: 200, sell: 320, time: 45, xp: 45, icon: "🌽", req: 5 },
    pumpkin: { type: 'plant', cat: 'seeds', name_ru: "Тыква", name_en: "Pumpkin", cost: 1500, sell: 4500, time: 180, xp: 250, icon: "🎃", req: 12 },
    watermelon: { type: 'plant', cat: 'rare', name_ru: "Арбуз", name_en: "Watermelon", cost: 8000, sell: 12000, time: 240, xp: 800, icon: "🍉", req: 15, rare: true, triad: true },
    crystal: { type: 'plant', cat: 'rare', name_ru: "Кристалл", name_en: "Crystal", cost: 20000, sell: 30000, time: 480, xp: 2000, icon: "💎", req: 20, rare: true, triad: true },
    dragon: { type: 'plant', cat: 'rare', name_ru: "Дракон", name_en: "Dragon Fruit", cost: 50000, sell: 75000, time: 600, xp: 5000, icon: "🐉", req: 25, rare: true, triad: true },
    doom: { type: 'plant', cat: 'rare', name_ru: "Плод Рока", name_en: "Doom Fruit", cost: 250000, sell: 1000000, time: 600, xp: 50000, icon: "🌑", req: 35, hardcore: true, apocalypse: true },
    part: { type: 'plant', cat: 'rare', name_ru: "Деталь", name_en: "Part", cost: 500000, sell: 1, time: 300, xp: 10000, icon: "⚙️", req: 40, hardcore: true, drops: true },
    trophy: { type: 'special', cat: 'rare', name_ru: "КУБОК", name_en: "TROPHY", cost: 5000000, icon: "🏆", req: 50, win: true },

    fertilizer: { type: 'tool', cat: 'upgrades', name_ru: "Удобрение", name_en: "Fertilizer", cost: 3500, icon: "⚡", req: 2 },
    repair_kit: { type: 'tool', cat: 'upgrades', name_ru: "Ремкомплект", name_en: "Repair Kit", cost: 100, heal: 25, icon: "🔧", req: 1 },
    engineer_kit: { type: 'tool', cat: 'upgrades', name_ru: "Набор Инженера", name_en: "Engineer Kit", cost: 2000, heal: 500, icon: "🛠️", req: 15 },
    nano_repair: { type: 'tool', cat: 'upgrades', name_ru: "Нано-Восстановление", name_en: "Nano Repair", cost: 50000, heal: 'full', icon: "🧬✨", req: 30 },

    steel_plates: { type: 'tool', cat: 'upgrades', name_ru: "Стальные Пластины", name_en: "Steel Plates", cost: 5000, maxHpPlus: 1000, icon: "🛡️", req: 10 },
    force_field: { type: 'tool', cat: 'upgrades', name_ru: "Силовое Поле", name_en: "Force Field", cost: 250000, maxHpPlus: 14000, icon: "🪐", req: 45 },
    scarecrow: { type: 'weapon', cat: 'upgrades', name_ru: "Пугало", name_en: "Scarecrow", cost: 100, damage: 5, icon: "🎃", req: 3 },
    shotgun: { type: 'weapon', cat: 'upgrades', name_ru: "Ружье", name_en: "Shotgun", cost: 1000, damage: 50, icon: "🔫", req: 10 },
    railgun: { type: 'weapon', cat: 'upgrades', name_ru: "Рельсотрон", name_en: "Railgun", cost: 100000, damage: 2000, icon: "⚡🔋", req: 30 },
    annihilator: { type: 'weapon', cat: 'upgrades', name_ru: "АННИГИЛЯТОР", name_en: "ANNIHILATOR", cost: 1000000, damage: 50000, icon: "🌌🌀", req: 50, craft: true, hardcore: true },

    // Tier 2
    mega_carrot: { type: 'plant', cat: 'rare', name_ru: "Мега-Морковь", name_en: "Mega-Carrot", sell: 100, time: 60, xp: 500, icon: "🥕⏫", hybrid: true, tier: 2 },
    super_potato: { type: 'plant', cat: 'rare', name_ru: "Супер-Картофель", name_en: "Super-Potato", sell: 300, time: 80, xp: 800, icon: "🥔⏫", hybrid: true, tier: 2 },
    ultra_tomato: { type: 'plant', cat: 'rare', name_ru: "Ультра-Томат", name_en: "Ultra-Tomato", sell: 700, time: 100, xp: 1200, icon: "🍅⏫", hybrid: true, tier: 2 },
    king_corn: { type: 'plant', cat: 'rare', name_ru: "Царь-Кукуруза", name_en: "King-Corn", sell: 2000, time: 150, xp: 2000, icon: "🌽👑", hybrid: true, tier: 2 },
    titan_pumpkin: { type: 'plant', cat: 'rare', name_ru: "Титан-Тыква", name_en: "Titan-Pumpkin", sell: 15000, time: 400, xp: 5000, icon: "🎃🏠", hybrid: true, tier: 2 },
    markofel: { type: 'plant', cat: 'rare', name_ru: "Моркофель", name_en: "Carrotato", sell: 200, time: 70, xp: 600, icon: "🥕🥔", hybrid: true, tier: 2 },
    tomorkov: { type: 'plant', cat: 'rare', name_ru: "Томорковь", name_en: "Tomarrot", sell: 400, time: 85, xp: 800, icon: "🍅🥕", hybrid: true, tier: 2 },
    kukurkov: { type: 'plant', cat: 'rare', name_ru: "Кукурковь", name_en: "Cornrot", sell: 1050, time: 110, xp: 1200, icon: "🌽🥕", hybrid: true, tier: 2 },
    tykvomorkov: { type: 'plant', cat: 'rare', name_ru: "Тыквоморковь", name_en: "Pumpcarrot", sell: 7550, time: 300, xp: 3000, icon: "🎃🥕", hybrid: true, tier: 2 },
    pomato: { type: 'plant', cat: 'rare', name_ru: "Помато", name_en: "Pomato", sell: 500, time: 90, xp: 1000, icon: "🥔🍅", hybrid: true, tier: 2 },
    kukuruzofel: { type: 'plant', cat: 'rare', name_ru: "Кукурузофель", name_en: "Cornato", sell: 1150, time: 130, xp: 1500, icon: "🥔🌽", hybrid: true, tier: 2 },
    tykvofel: { type: 'plant', cat: 'rare', name_ru: "Тыквофель", name_en: "Pumpato", sell: 7650, time: 320, xp: 3500, icon: "🎃🥔", hybrid: true, tier: 2 },
    kukurmat: { type: 'plant', cat: 'rare', name_ru: "Кукурмат", name_en: "Cornmato", sell: 1350, time: 120, xp: 2000, icon: "🍅🌽", hybrid: true, tier: 2 },
    tykvomat: { type: 'plant', cat: 'rare', name_ru: "Тыквомат", name_en: "Pumpmato", sell: 7850, time: 350, xp: 4000, icon: "🎃🍅", hybrid: true, tier: 2 },
    tykvokukuruza: { type: 'plant', cat: 'rare', name_ru: "Тыквокукуруза", name_en: "Pumpcorn", sell: 8500, time: 380, xp: 4500, icon: "🎃🌽", hybrid: true, tier: 2 },

    // Tier 3
    hyper_carrot: { type: 'plant', cat: 'rare', name_ru: "Гипер-Морковь", name_en: "Hyper-Carrot", sell: 25000, time: 300, xp: 2500, icon: "🥕🔝", hybrid: true, tier: 3 },
    mega_markofel: { type: 'plant', cat: 'rare', name_ru: "Мега-Моркофель", name_en: "Mega-Carrotato", sell: 30000, time: 400, xp: 3000, icon: "🥕🥔", hybrid: true, tier: 3 },
    mega_tomorkov: { type: 'plant', cat: 'rare', name_ru: "Мега-Томорковь", name_en: "Mega-Tomarrot", sell: 35000, time: 450, xp: 3500, icon: "🍅🥕", hybrid: true, tier: 3 },
    mega_kukurkov: { type: 'plant', cat: 'rare', name_ru: "Мега-Кукурковь", name_en: "Mega-Cornrot", sell: 40000, time: 500, xp: 4000, icon: "🌽🥕", hybrid: true, tier: 3 },
    mega_tykvomorkov: { type: 'plant', cat: 'rare', name_ru: "Мега-Тыквоморковь", name_en: "Mega-Pumpcarrot", sell: 50000, time: 600, xp: 5000, icon: "🎃🥕", hybrid: true, tier: 3 },

    morko_super_potato: { type: 'plant', cat: 'rare', name_ru: "Морко-Суперкартофель", name_en: "Carro-Superpotato", sell: 35000, time: 450, xp: 3500, icon: "🥕🥔", hybrid: true, tier: 3 },
    hyper_potato: { type: 'plant', cat: 'rare', name_ru: "Гипер-Картофель", name_en: "Hyper-Potato", sell: 60000, time: 800, xp: 6000, icon: "🥔🔝", hybrid: true, tier: 3 },
    super_pomato: { type: 'plant', cat: 'rare', name_ru: "Супер-Помато", name_en: "Super-Pomato", sell: 40000, time: 500, xp: 4000, icon: "🥔🍅", hybrid: true, tier: 3 },
    karto_king_corn: { type: 'plant', cat: 'rare', name_ru: "Карто-Царь-Кукуруза", name_en: "Pota-King-Corn", sell: 45000, time: 550, xp: 4500, icon: "🌽🥔", hybrid: true, tier: 3 },
    tykvo_super_potato: { type: 'plant', cat: 'rare', name_ru: "Тыкво-Суперкартофель", name_en: "Pump-Superpotato", sell: 70000, time: 900, xp: 7000, icon: "🎃🥔", hybrid: true, tier: 3 },

    morko_ultra_tomato: { type: 'plant', cat: 'rare', name_ru: "Морко-Ультратомат", name_en: "Carro-Ultratomato", sell: 38000, time: 480, xp: 3800, icon: "🍅🥕", hybrid: true, tier: 3 },
    karto_ultra_tomato: { type: 'plant', cat: 'rare', name_ru: "Карто-Ультратомат", name_en: "Pota-Ultratomato", sell: 42000, time: 520, xp: 4200, icon: "🍅🥔", hybrid: true, tier: 3 },
    hyper_tomato: { type: 'plant', cat: 'rare', name_ru: "Гипер-Томат", name_en: "Hyper-Tomato", sell: 80000, time: 1000, xp: 8000, icon: "🍅🔝", hybrid: true, tier: 3 },
    corn_ultra_tomato: { type: 'plant', cat: 'rare', name_ru: "Кукурузо-Ультратомат", name_en: "Corn-Ultratomato", sell: 55000, time: 650, xp: 5500, icon: "🍅🌽", hybrid: true, tier: 3 },
    tykvo_ultra_tomato: { type: 'plant', cat: 'rare', name_ru: "Тыкво-Ультратомат", name_en: "Pump-Ultratomato", sell: 90000, time: 1200, xp: 9000, icon: "🎃🍅", hybrid: true, tier: 3 },

    morko_king_corn: { type: 'plant', cat: 'rare', name_ru: "Морко-Царь-Кукуруза", name_en: "Carro-King-Corn", sell: 50000, time: 500, xp: 10000, icon: "🌽🥕", hybrid: true, tier: 3 },
    karto_king_corn_v2: { type: 'plant', cat: 'rare', name_ru: "Карто-Царь-Куку", name_en: "Pota-King-Corn V2", sell: 55000, time: 550, xp: 12000, icon: "🌽🥔", hybrid: true, tier: 3 },
    tomato_king_corn: { type: 'plant', cat: 'rare', name_ru: "Томато-Царь-Кукуруза", name_en: "Toma-King-Corn", sell: 60000, time: 600, xp: 15000, icon: "🌽🍅", hybrid: true, tier: 3 },
    hyper_corn: { type: 'plant', cat: 'rare', name_ru: "Гипер-Кукуруза", name_en: "Hyper-Corn", sell: 150000, time: 1300, xp: 30000, icon: "🌽🔝", hybrid: true, tier: 3 },
    tykvo_king_corn: { type: 'plant', cat: 'rare', name_ru: "Тыкво-Царь-Кукуруза", name_en: "Pump-King-Corn", sell: 200000, time: 1400, xp: 40000, icon: "🌽🎃", hybrid: true, tier: 3 },

    morko_titan_pumpkin: { type: 'plant', cat: 'rare', name_ru: "Морко-Титан-Тыква", name_en: "Carro-Titan-Pump", sell: 250000, time: 1500, xp: 50000, icon: "🎃🥕", hybrid: true, tier: 3 },
    karto_titan_pumpkin: { type: 'plant', cat: 'rare', name_ru: "Карто-Титан-Тыква", name_en: "Pota-Titan-Pump", sell: 280000, time: 1600, xp: 55000, icon: "🎃🥔", hybrid: true, tier: 3 },
    tomato_titan_pumpkin: { type: 'plant', cat: 'rare', name_ru: "Томато-Титан-Тыква", name_en: "Toma-Titan-Pump", sell: 300000, time: 1700, xp: 60000, icon: "🎃🍅", hybrid: true, tier: 3 },
    corn_titan_pumpkin: { type: 'plant', cat: 'rare', name_ru: "Кукурузо-Титан-Тыква", name_en: "Corn-Titan-Pump", sell: 350000, time: 1800, xp: 70000, icon: "🎃🌽", hybrid: true, tier: 3 },
    hyper_pumpkin_v2: { type: 'plant', cat: 'rare', name_ru: "Гипер-Тыква L3", name_en: "Hyper-Pumpkin L3", sell: 500000, time: 2500, xp: 100000, icon: "🎃🔝", hybrid: true, tier: 3 },

    markofelemat: { type: 'plant', cat: 'rare', name_ru: "Моркофелемат", name_en: "Carrotomat", sell: 40000, time: 600, xp: 4000, icon: "🥗", hybrid: true, tier: 3 },
    markofelezuza: { type: 'plant', cat: 'rare', name_ru: "Моркофелезуза", name_en: "Carrotozuz", sell: 45000, time: 650, xp: 4500, icon: "🥗", hybrid: true, tier: 3 },
    markofeletykv: { type: 'plant', cat: 'rare', name_ru: "Моркофелетыкв", name_en: "Carrotompkin", sell: 50000, time: 700, xp: 5000, icon: "🥗", hybrid: true, tier: 3 },
    // Simplified remaining massive hybrids for brevity while maintaining keys
    tomorkofel: { type: 'plant', cat: 'rare', name_ru: "Томоркофель", name_en: "Tomarroto", sell: 35000, time: 550, xp: 3500, icon: "🥗", hybrid: true, tier: 3 },
    tomorkuza: { type: 'plant', cat: 'rare', name_ru: "Томоркуза", name_en: "Tomorcorn", sell: 40000, time: 600, xp: 4000, icon: "🥗", hybrid: true, tier: 3 },
    tomorktykv: { type: 'plant', cat: 'rare', name_ru: "Томортыкв", name_en: "Tomorpump", sell: 45000, time: 650, xp: 4500, icon: "🥗", hybrid: true, tier: 3 },
    kukurkofel: { type: 'plant', cat: 'rare', name_ru: "Кукуркофель", name_en: "Cornroto", sell: 42000, time: 620, xp: 4200, icon: "🥗", hybrid: true, tier: 3 },
    kukurkomat: { type: 'plant', cat: 'rare', name_ru: "Кукуркомат", name_en: "Cornromato", sell: 48000, time: 680, xp: 4800, icon: "🥗", hybrid: true, tier: 3 },
    kukurkotykv: { type: 'plant', cat: 'rare', name_ru: "Кукуркотыкв", name_en: "Cornropump", sell: 55000, time: 750, xp: 5500, icon: "🥗", hybrid: true, tier: 3 },
    pomatokuza: { type: 'plant', cat: 'rare', name_ru: "Поматокуза", name_en: "Pomatocorn", sell: 50000, time: 700, xp: 5000, icon: "🥗", hybrid: true, tier: 3 },
    pomatotykv: { type: 'plant', cat: 'rare', name_ru: "Поматотыкв", name_en: "Pomatopump", sell: 60000, time: 800, xp: 6000, icon: "🥗", hybrid: true, tier: 3 },
    pomatomorkov: { type: 'plant', cat: 'rare', name_ru: "Поматоморковь", name_en: "Pomatocarrot", sell: 45000, time: 650, xp: 4500, icon: "🥗", hybrid: true, tier: 3 },
    kukuruzofelemat: { type: 'plant', cat: 'rare', name_ru: "Кукурузофелемат", name_en: "Cornatomat", sell: 52000, time: 720, xp: 5200, icon: "🥗", hybrid: true, tier: 3 },
    kukuruzofele_tykv: { type: 'plant', cat: 'rare', name_ru: "Кукурузофелетыкв", name_en: "Cornatopump", sell: 65000, time: 850, xp: 6500, icon: "🥗", hybrid: true, tier: 3 },
    kukuruzofele_mork: { type: 'plant', cat: 'rare', name_ru: "Кукурузофелеморковь", name_en: "Cornatocarrot", sell: 48000, time: 680, xp: 4800, icon: "🥗", hybrid: true, tier: 3 },
    tykvofele_mork: { type: 'plant', cat: 'rare', name_ru: "Тыквофелеморковь", name_en: "Pumpatocarrot", sell: 70000, time: 900, xp: 7000, icon: "🥗", hybrid: true, tier: 3 },
    tykvofelemat: { type: 'plant', cat: 'rare', name_ru: "Тыквофелемат", name_en: "Pumpatomat", sell: 75000, time: 950, xp: 7500, icon: "🥗", hybrid: true, tier: 3 },
    tykvofelezuza: { type: 'plant', cat: 'rare', name_ru: "Тыквофелезуза", name_en: "Pumpatocorn", sell: 80000, time: 1000, xp: 8000, icon: "🥗", hybrid: true, tier: 3 },

    // Some mass generated English names for the massive list to prevent errors
    kukurmote_mork: { type: 'plant', cat: 'rare', name_ru: "Кукурмотоморковь", name_en: "Cornmato-Carrot", sell: 55000, time: 750, xp: 5500, icon: "🥗", hybrid: true, tier: 3 },
    kukurmote_fel: { type: 'plant', cat: 'rare', name_ru: "Кукурмотофель", name_en: "Cornmato-Potato", sell: 58000, time: 780, xp: 5800, icon: "🥗", hybrid: true, tier: 3 },
    kukurmote_tykv: { type: 'plant', cat: 'rare', name_ru: "Кукурмототыкв", name_en: "Cornmato-Pumpkin", sell: 70000, time: 900, xp: 7000, icon: "🥗", hybrid: true, tier: 3 },
    tykvomato_mork: { type: 'plant', cat: 'rare', name_ru: "Тыквоматоморковь", name_en: "Pumpmato-Carrot", sell: 85000, time: 1100, xp: 8500, icon: "🥗", hybrid: true, tier: 3 },
    tykvomato_fel: { type: 'plant', cat: 'rare', name_ru: "Тыквоматофель", name_en: "Pumpmato-Potato", sell: 90000, time: 1200, xp: 9000, icon: "🥗", hybrid: true, tier: 3 },
    tykvomato_kuza: { type: 'plant', cat: 'rare', name_ru: "Тыквоматокуза", name_en: "Pumpmato-Corn", sell: 100000, time: 1300, xp: 10000, icon: "🥗", hybrid: true, tier: 3 },
    kukurtykvo_mork: { type: 'plant', cat: 'rare', name_ru: "Кукуртыквоморковь", name_en: "Pumpcorn-Carrot", sell: 95000, time: 1250, xp: 9500, icon: "🥗", hybrid: true, tier: 3 },
    kukurtykvo_fel: { type: 'plant', cat: 'rare', name_ru: "Кукуртыквофель", name_en: "Pumpcorn-Potato", sell: 105000, time: 1400, xp: 10500, icon: "🥗", hybrid: true, tier: 3 },
    kukurtykvo_mat: { type: 'plant', cat: 'rare', name_ru: "Кукуртыквомат", name_en: "Pumpcorn-Tomato", sell: 115000, time: 1550, xp: 11500, icon: "🥗", hybrid: true, tier: 3 },

    // Absolute
    absolute_carrot: { type: 'plant', cat: 'rare', name_ru: "Абсолютная Морковь", name_en: "Absolute Carrot", sell: 1000000, time: 3600, xp: 50000, icon: "🥕💎", hybrid: true, tier: 3 },
    absolute_potato: { type: 'plant', cat: 'rare', name_ru: "Абсолютный Картофель", name_en: "Absolute Potato", sell: 1200000, time: 4200, xp: 60000, icon: "🥔💎", hybrid: true, tier: 3 },
    absolute_tomato: { type: 'plant', cat: 'rare', name_ru: "Абсолютный Томат", name_en: "Absolute Tomato", sell: 1500000, time: 4800, xp: 70000, icon: "🍅💎", hybrid: true, tier: 3 },
    absolute_corn: { type: 'plant', cat: 'rare', name_ru: "Абсолютная Кукуруза", name_en: "Absolute Corn", sell: 2000000, time: 5400, xp: 100000, icon: "🌽💎", hybrid: true, tier: 3 },
    absolute_pumpkin: { type: 'plant', cat: 'rare', name_ru: "Абсолютная Тыква", name_en: "Absolute Pumpkin", sell: 5000000, time: 7200, xp: 200000, icon: "🎃💎", hybrid: true, tier: 3 },

    // Masters
    master_markofel: { type: 'plant', cat: 'rare', name_ru: "Мастер-Моркофель", name_en: "Master-Carrotato", sell: 100000, time: 2400, xp: 30000, icon: "🧫", hybrid: true, tier: 3 },
    master_tomorkov: { type: 'plant', cat: 'rare', name_ru: "Мастер-Томорковь", name_en: "Master-Tomarrot", sell: 120000, time: 2600, xp: 35000, icon: "🧫", hybrid: true, tier: 3 },
    master_kukurkov: { type: 'plant', cat: 'rare', name_ru: "Мастер-Кукурковь", name_en: "Master-Cornrot", sell: 150000, time: 2800, xp: 40000, icon: "🧫", hybrid: true, tier: 3 },
    master_tykvomorkov: { type: 'plant', cat: 'rare', name_ru: "Мастер-Тыквоморковь", name_en: "Master-Pumpcarrot", sell: 200000, time: 3200, xp: 50000, icon: "🧫", hybrid: true, tier: 3 },
    master_pomato: { type: 'plant', cat: 'rare', name_ru: "Мастер-Помато", name_en: "Master-Pomato", sell: 180000, time: 3000, xp: 45000, icon: "🧫", hybrid: true, tier: 3 },
    master_kukuruzofel: { type: 'plant', cat: 'rare', name_ru: "Мастер-Кукурузофель", name_en: "Master-Cornato", sell: 220000, time: 3400, xp: 55000, icon: "🧫", hybrid: true, tier: 3 },
    master_tykvofel: { type: 'plant', cat: 'rare', name_ru: "Мастер-Тыквофель", name_en: "Master-Pumpato", sell: 250000, time: 4000, xp: 70000, icon: "🧫", hybrid: true, tier: 3 },
    master_kukurmat: { type: 'plant', cat: 'rare', name_ru: "Мастер-Кукурмат", name_en: "Master-Cornmato", sell: 300000, time: 3800, xp: 60000, icon: "🧫", hybrid: true, tier: 3 },
    master_tykvomat: { type: 'plant', cat: 'rare', name_ru: "Мастер-Тыквомат", name_en: "Master-Pumpmato", sell: 400000, time: 4500, xp: 80000, icon: "🧫", hybrid: true, tier: 3 },
    master_tykvokukuruza: { type: 'plant', cat: 'rare', name_ru: "Мастер-Тыквокукуруза", name_en: "Master-Pumpcorn", sell: 500000, time: 5000, xp: 90000, icon: "🧫", hybrid: true, tier: 3 },

    // Ultimate
    biosynthesis_x: { type: 'plant', cat: 'rare', name_ru: "Био-Синтез Х", name_en: "Bio-Synthesis X", sell: 75000000, time: 14400, xp: 1000000, icon: "🧬⚛️", hybrid: true, tier: 4 },
    void_seed: { type: 'plant', cat: 'rare', name_ru: "Иггдрасиль Пустоты", name_en: "Void Yggdrasil", sell: 0, time: 0, xp: 0, icon: "🌳🌌", hybrid: true, tier: 5, triad: true, special: true },

    // --- TRIAD L2 ---
    void_melon: { type: 'plant', cat: 'rare', name_ru: "Пустотная Дыня", name_en: "Void Melon", sell: 50000, time: 600, xp: 5000, icon: "🍉⚫", hybrid: true, tier: 2, triad: true },
    pure_crystal: { type: 'plant', cat: 'rare', name_ru: "Чистый Кристалл", name_en: "Pure Crystal", sell: 80000, time: 800, xp: 8000, icon: "💎✨", hybrid: true, tier: 2, triad: true },
    elder_dragon: { type: 'plant', cat: 'rare', name_ru: "Древний Дракон", name_en: "Elder Dragon", sell: 150000, time: 1200, xp: 15000, icon: "🐉👑", hybrid: true, tier: 2, triad: true },
    crystal_melon: { type: 'plant', cat: 'rare', name_ru: "Кристальный Арбуз", name_en: "Crystal Melon", sell: 60000, time: 700, xp: 6000, icon: "🍉💎", hybrid: true, tier: 2, triad: true },
    dragon_melon: { type: 'plant', cat: 'rare', name_ru: "Драконий Арбуз", name_en: "Dragon Melon", sell: 100000, time: 900, xp: 10000, icon: "🍉🐉", hybrid: true, tier: 2, triad: true },
    crystal_dragon: { type: 'plant', cat: 'rare', name_ru: "Кристальный Дракон", name_en: "Crystal Dragon", sell: 120000, time: 1000, xp: 12000, icon: "💎🐉", hybrid: true, tier: 2, triad: true },

    // --- TRIAD L3 (Kingdom of Sovereigns) ---
    tr_l3_01: { type: 'plant', cat: 'rare', name_ru: "Астральный Арбуз", name_en: "Astral Melon", sell: 200000, time: 1500, xp: 20000, icon: "🌌🍉", hybrid: true, tier: 3, triad: true },
    tr_l3_02: { type: 'plant', cat: 'rare', name_ru: "Кристалл Бездны", name_en: "Void Crystal", sell: 220000, time: 1600, xp: 22000, icon: "💎⚫", hybrid: true, tier: 3, triad: true },
    tr_l3_03: { type: 'plant', cat: 'rare', name_ru: "Дракон Хаоса", name_en: "Chaos Dragon", sell: 250000, time: 1700, xp: 25000, icon: "🐉🌀", hybrid: true, tier: 3, triad: true },
    tr_l3_04: { type: 'plant', cat: 'rare', name_ru: "Фрукт Туманности", name_en: "Nebula Fruit", sell: 210000, time: 1550, xp: 21000, icon: "🌫️🍎", hybrid: true, tier: 3, triad: true },
    tr_l3_05: { type: 'plant', cat: 'rare', name_ru: "Ягода Квазара", name_en: "Quasar Berry", sell: 230000, time: 1650, xp: 23000, icon: "✨🍓", hybrid: true, tier: 3, triad: true },
    tr_l3_06: { type: 'plant', cat: 'rare', name_ru: "Корень Пульсара", name_en: "Pulsar Root", sell: 260000, time: 1750, xp: 26000, icon: "⚡🥕", hybrid: true, tier: 3, triad: true },
    tr_l3_07: { type: 'plant', cat: 'rare', name_ru: "Сорняк ЧД", name_en: "Blackhole Weed", sell: 240000, time: 1600, xp: 24000, icon: "⚫🌿", hybrid: true, tier: 3, triad: true },
    tr_l3_08: { type: 'plant', cat: 'rare', name_ru: "Цветок Горизонта", name_en: "Horizon Flower", sell: 270000, time: 1800, xp: 27000, icon: "🌅🌻", hybrid: true, tier: 3, triad: true },
    tr_l3_09: { type: 'plant', cat: 'rare', name_ru: "Грави-Мох", name_en: "Gravi-Moss", sell: 280000, time: 1850, xp: 28000, icon: "🧱🦠", hybrid: true, tier: 3, triad: true },
    tr_l3_10: { type: 'plant', cat: 'rare', name_ru: "Фотонный Лист", name_en: "Photon Leaf", sell: 250000, time: 1700, xp: 25000, icon: "💡🍃", hybrid: true, tier: 3, triad: true },
    tr_l3_11: { type: 'plant', cat: 'rare', name_ru: "Тахионный Бутон", name_en: "Tachyon Bud", sell: 290000, time: 1900, xp: 29000, icon: "⏩🌷", hybrid: true, tier: 3, triad: true },
    tr_l3_12: { type: 'plant', cat: 'rare', name_ru: "Росток Тьмы", name_en: "Dark Sprout", sell: 300000, time: 2000, xp: 30000, icon: "🌑🌱", hybrid: true, tier: 3, triad: true },
    tr_l3_13: { type: 'plant', cat: 'rare', name_ru: "Стебель Антиматерии", name_en: "Antimatter Stem", sell: 310000, time: 2100, xp: 31000, icon: "⚛️🎋", hybrid: true, tier: 3, triad: true },
    tr_l3_14: { type: 'plant', cat: 'rare', name_ru: "Лепесток Потока", name_en: "Flux Petal", sell: 320000, time: 2200, xp: 32000, icon: "🌊🌸", hybrid: true, tier: 3, triad: true },
    tr_l3_15: { type: 'plant', cat: 'rare', name_ru: "Эфирная Роза", name_en: "Aether Rose", sell: 330000, time: 2300, xp: 33000, icon: "👻🌹", hybrid: true, tier: 3, triad: true },
    tr_l3_16: { type: 'plant', cat: 'rare', name_ru: "Лилия Незера", name_en: "Nether Lily", sell: 340000, time: 2400, xp: 34000, icon: "🔥⚜️", hybrid: true, tier: 3, triad: true },
    tr_l3_17: { type: 'plant', cat: 'rare', name_ru: "Орхидея Разлома", name_en: "Rift Orchid", sell: 350000, time: 2500, xp: 35000, icon: "⚡🌺", hybrid: true, tier: 3, triad: true },
    tr_l3_18: { type: 'plant', cat: 'rare', name_ru: "Лоза Измерения", name_en: "Dimension Vine", sell: 360000, time: 2600, xp: 36000, icon: "🌀🍇", hybrid: true, tier: 3, triad: true },
    tr_l3_19: { type: 'plant', cat: 'rare', name_ru: "Тростник Времени", name_en: "Time Reed", sell: 400000, time: 3000, xp: 40000, icon: "⏳🌾", hybrid: true, tier: 3, triad: true },
    tr_l3_20: { type: 'plant', cat: 'rare', name_ru: "Папоротник Искривления", name_en: "Warp Fern", sell: 420000, time: 3100, xp: 42000, icon: "➰🌿", hybrid: true, tier: 3, triad: true },
    tr_l3_21: { type: 'plant', cat: 'rare', name_ru: "Квантовый Кактус", name_en: "Quantum Cactus", sell: 440000, time: 3200, xp: 44000, icon: "🌵🔬", hybrid: true, tier: 3, triad: true },
    tr_l3_22: { type: 'plant', cat: 'rare', name_ru: "Куст Струн", name_en: "String Bush", sell: 460000, time: 3300, xp: 46000, icon: "🎻🌳", hybrid: true, tier: 3, triad: true },
    tr_l3_23: { type: 'plant', cat: 'rare', name_ru: "Гриб Мультивселенной", name_en: "Multiverse Shroom", sell: 480000, time: 3400, xp: 48000, icon: "🍄🌌", hybrid: true, tier: 3, triad: true },
    tr_l3_24: { type: 'plant', cat: 'rare', name_ru: "Пальма Парадокса", name_en: "Paradox Palm", sell: 500000, time: 3500, xp: 50000, icon: "🌴❓", hybrid: true, tier: 3, triad: true },
    tr_l3_25: { type: 'plant', cat: 'rare', name_ru: "Плющ Бесконечности", name_en: "Infinity Ivy", sell: 520000, time: 3600, xp: 52000, icon: "♾️🍃", hybrid: true, tier: 3, triad: true },
    tr_l3_26: { type: 'plant', cat: 'rare', name_ru: "Трава Нулевой Точки", name_en: "Zero Point Grass", sell: 540000, time: 3700, xp: 54000, icon: "0️⃣🌱", hybrid: true, tier: 3, triad: true },
    tr_l3_27: { type: 'plant', cat: 'rare', name_ru: "Куст Сингулярности", name_en: "Singularity Bush", sell: 560000, time: 3800, xp: 56000, icon: "🕳️🌳", hybrid: true, tier: 3, triad: true },
    tr_l3_28: { type: 'plant', cat: 'rare', name_ru: "Цвет Большого Взрыва", name_en: "Big Bang Bloom", sell: 600000, time: 4000, xp: 60000, icon: "💥🌻", hybrid: true, tier: 3, triad: true },
    tr_l3_29: { type: 'plant', cat: 'rare', name_ru: "Древо Энтропии", name_en: "Entropy Tree", sell: 620000, time: 4100, xp: 62000, icon: "🍂🌲", hybrid: true, tier: 3, triad: true },
    tr_l3_30: { type: 'plant', cat: 'rare', name_ru: "Корень Энигмы", name_en: "Enigma Root", sell: 640000, time: 4200, xp: 64000, icon: "🧩🍠", hybrid: true, tier: 3, triad: true },
    tr_l3_31: { type: 'plant', cat: 'rare', name_ru: "Мистический Мох", name_en: "Mystic Moss", sell: 660000, time: 4300, xp: 66000, icon: "🔮🦠", hybrid: true, tier: 3, triad: true },
    tr_l3_32: { type: 'plant', cat: 'rare', name_ru: "Аркановый Алоэ", name_en: "Arcane Aloe", sell: 680000, time: 4400, xp: 68000, icon: "📜🌵", hybrid: true, tier: 3, triad: true },
    tr_l3_33: { type: 'plant', cat: 'rare', name_ru: "Небесный Осколок", name_en: "Celestial Shard", sell: 700000, time: 4500, xp: 70000, icon: "🌤️💎", hybrid: true, tier: 3, triad: true },
    tr_l3_34: { type: 'plant', cat: 'rare', name_ru: "Космическая Призма", name_en: "Cosmic Prism", sell: 720000, time: 4600, xp: 72000, icon: "🌈🔺", hybrid: true, tier: 3, triad: true },
    tr_l3_35: { type: 'plant', cat: 'rare', name_ru: "Галактический Самоцвет", name_en: "Galactic Gem", sell: 750000, time: 4700, xp: 75000, icon: "🌌💍", hybrid: true, tier: 3, triad: true },
    tr_l3_36: { type: 'plant', cat: 'rare', name_ru: "Звездное Ядро", name_en: "Star Core", sell: 800000, time: 4800, xp: 80000, icon: "☀️🔮", hybrid: true, tier: 3, triad: true },
    tr_l3_37: { type: 'plant', cat: 'rare', name_ru: "Сердце Пустоты", name_en: "Void Heart", sell: 900000, time: 5000, xp: 90000, icon: "🖤💓", hybrid: true, tier: 3, triad: true },
    tr_l3_38: { type: 'plant', cat: 'rare', name_ru: "Омега-Семечко", name_en: "Omega Seed", sell: 1000000, time: 5500, xp: 100000, icon: "🌰Ω", hybrid: true, tier: 3, triad: true },
    tr_l3_39: { type: 'plant', cat: 'rare', name_ru: "Альфа-Корень", name_en: "Alpha Root", sell: 1000000, time: 5500, xp: 100000, icon: "🅰️🥕", hybrid: true, tier: 3, triad: true }
};

const BASE_GROWTH_SPEED = 1.35;

// ... Same BREEDING_RECIPES code ...
const BREEDING_RECIPES = {
    // Basic L1+L1
    'carrot-carrot': 'mega_carrot', 'potato-potato': 'super_potato', 'tomato-tomato': 'ultra_tomato',
    'corn-corn': 'king_corn', 'pumpkin-pumpkin': 'titan_pumpkin', 'carrot-potato': 'markofel',
    'carrot-tomato': 'tomorkov', 'carrot-corn': 'kukurkov', 'carrot-pumpkin': 'tykvomorkov',
    'potato-tomato': 'pomato', 'potato-corn': 'kukuruzofel', 'potato-pumpkin': 'tykvofel',
    'tomato-corn': 'kukurmat', 'tomato-pumpkin': 'tykvomat', 'corn-pumpkin': 'tykvokukuruza',
    // Triad L1 + L1
    'watermelon-watermelon': 'void_melon',
    'crystal-crystal': 'pure_crystal',
    'dragon-dragon': 'elder_dragon',
    'crystal-watermelon': 'crystal_melon',
    'dragon-watermelon': 'dragon_melon',
    'crystal-dragon': 'crystal_dragon',
    // --- L2 + L2 (Same -> L3 Tier 3 Hyper) ---
    'mega_carrot-mega_carrot': 'hyper_carrot', 'super_potato-super_potato': 'hyper_potato',
    'ultra_tomato-ultra_tomato': 'hyper_tomato', 'king_corn-king_corn': 'hyper_corn',
    'titan_pumpkin-titan_pumpkin': 'hyper_pumpkin_v2',

    // --- L2 + L2 (Mixed Identical -> L3 Tier 3 Mega-Mixed) ---
    'markofel-markofel': 'mega_markofel', 'tomorkov-tomorkov': 'mega_tomorkov',
    'kukurkov-kukurkov': 'mega_kukurkov', 'tykvomorkov-tykvomorkov': 'mega_tykvomorkov',
    'pomato-pomato': 'super_pomato',

    // --- L1 + L2 (Tier 3 Mixes) ---
    'carrot-super_potato': 'morko_super_potato', 'carrot-ultra_tomato': 'morko_ultra_tomato',
    'carrot-king_corn': 'morko_king_corn', 'carrot-titan_pumpkin': 'morko_titan_pumpkin',
    'potato-ultra_tomato': 'karto_ultra_tomato', 'potato-king_corn': 'karto_king_corn_v2', 'potato-titan_pumpkin': 'karto_titan_pumpkin',
    'tomato-king_corn': 'tomato_king_corn', 'tomato-titan_pumpkin': 'tomato_titan_pumpkin',
    'corn-ultra_tomato': 'corn_ultra_tomato', 'corn-titan_pumpkin': 'corn_titan_pumpkin',
    'pumpkin-super_potato': 'tykvo_super_potato', 'pumpkin-ultra_tomato': 'tykvo_ultra_tomato', 'pumpkin-king_corn': 'tykvo_king_corn',

    // --- Complex L3 Hybrids ---
    'markofel-tomato': 'markofelemat', 'markofel-corn': 'markofelezuza', 'markofel-pumpkin': 'markofeletykv',
    'tomorkov-potato': 'tomorkofel', 'tomorkov-corn': 'tomorkuza', 'tomorkov-pumpkin': 'tomorktykv',
    'kukurkov-potato': 'kukurkofel', 'kukurkov-tomato': 'kukurkomat', 'kukurkov-pumpkin': 'kukurkotykv',
    'pomato-corn': 'pomatokuza', 'pomato-pumpkin': 'pomatotykv', 'pomato-carrot': 'pomatomorkov',
    'kukuruzofel-tomato': 'kukuruzofelemat', 'kukuruzofel-pumpkin': 'kukuruzofele_tykv', 'kukuruzofel-carrot': 'kukuruzofele_mork',
    'tykvofel-carrot': 'tykvofele_mork', 'tykvofel-tomato': 'tykvofelemat', 'tykvofel-corn': 'tykvofelezuza',
    'kukurmat-carrot': 'kukurmote_mork', 'kukurmat-potato': 'kukurmote_fel', 'kukurmat-pumpkin': 'kukurmote_tykv',
    'tykvomat-carrot': 'tykvomato_mork', 'tykvomat-potato': 'tykvomato_fel', 'tykvomat-corn': 'tykvomato_kuza',
    'tykvokukuruza-carrot': 'kukurtykvo_mork', 'tykvokukuruza-potato': 'kukurtykvo_fel', 'tykvokukuruza-tomato': 'kukurtykvo_mat',

    // --- Super Hybrids ---
    'hyper_carrot-hyper_carrot': 'absolute_carrot', 'hyper_potato-hyper_potato': 'absolute_potato',
    'hyper_tomato-hyper_tomato': 'absolute_tomato', 'hyper_corn-hyper_corn': 'absolute_corn',
    'hyper_pumpkin_v2-hyper_pumpkin_v2': 'absolute_pumpkin',

    'mega_markofel-mega_markofel': 'master_markofel', 'mega_tomorkov-mega_tomorkov': 'master_tomorkov',
    'mega_kukurkov-mega_kukurkov': 'master_kukurkov', 'mega_tykvomorkov-mega_tykvomorkov': 'master_tykvomorkov',
    'super_pomato-super_pomato': 'master_pomato',
    'kukuruzofel-kukuruzofel': 'master_kukuruzofel', 'tykvofel-tykvofel': 'master_tykvofel',
    'kukurmat-kukurmat': 'master_kukurmat', 'tykvomat-tykvomat': 'master_tykvomat',
    'tykvokukuruza-tykvokukuruza': 'master_tykvokukuruza',

    // --- Ultimate ---
    'absolute_carrot-absolute_potato': 'biosynthesis_x',
    'absolute_tomato-absolute_corn': 'biosynthesis_x', 'absolute_pumpkin-absolute_carrot': 'biosynthesis_x',

};
// Add core logic for missing recipes if needed or assume user keeps old list. 
// For safety, I'm including the loop that handles reverse keys.
for (let key in BREEDING_RECIPES) {
    const parts = key.split('-');
    if (parts.length === 2) {
        const rev = parts[1] + '-' + parts[0];
        if (!BREEDING_RECIPES[rev]) BREEDING_RECIPES[rev] = BREEDING_RECIPES[key];
    }
}

const RECIPE_LOOKUP = {};
for (let key in BREEDING_RECIPES) {
    const parts = key.split('-');
    if (parts.length !== 2) continue;
    const res = BREEDING_RECIPES[key];
    if (!RECIPE_LOOKUP[res]) RECIPE_LOOKUP[res] = [];
    RECIPE_LOOKUP[res].push([parts[0], parts[1]]);
}
for (let k in ITEMS) {
    if (ITEMS[k]?.type !== 'plant') continue;
    const parts = k.split('_');
    if (parts.length !== 2) continue;
    if (!ITEMS[parts[0]] || !ITEMS[parts[1]]) continue;
    if (!RECIPE_LOOKUP[k]) RECIPE_LOOKUP[k] = [];
    RECIPE_LOOKUP[k].push([parts[0], parts[1]]);
}

function resolveBreedingResult(a, b) {
    const key = [a, b].sort().join('-');
    if (BREEDING_RECIPES[key]) return BREEDING_RECIPES[key];

    const direct1 = `${a}_${b}`;
    const direct2 = `${b}_${a}`;
    if (ITEMS[direct1]) return direct1;
    if (ITEMS[direct2]) return direct2;

    const itA = ITEMS[a];
    const itB = ITEMS[b];
    if (itA?.triad && itB?.triad && (itA.tier || 1) === 2 && (itB.tier || 1) === 2) {
        const list = getTriadL3Keys();
        if (list.length) return list[Math.floor(Math.random() * list.length)];
    }

    return null;
}

(function expandRecipeLookup() {
    const plantKeys = Object.keys(ITEMS).filter(k => ITEMS[k]?.type === 'plant');
    for (let i = 0; i < plantKeys.length; i++) {
        for (let j = i; j < plantKeys.length; j++) {
            const a = plantKeys[i];
            const b = plantKeys[j];
            const itA = ITEMS[a];
            const itB = ITEMS[b];
            if (itA?.triad && itB?.triad && (itA.tier || 1) === 2 && (itB.tier || 1) === 2) continue;
            const res = resolveBreedingResult(a, b);
            if (!res) continue;
            if (!RECIPE_LOOKUP[res]) RECIPE_LOOKUP[res] = [];
            const exists = RECIPE_LOOKUP[res].some(pair => pair[0] === a && pair[1] === b);
            if (!exists) RECIPE_LOOKUP[res].push([a, b]);
        }
    }
})();

const ENEMIES = [
    { id: 'zombie', lvl: 1, hp: 10000, dmg: 5, rew: 50, icon: '🐰🧟' },
    { id: 'wasp', lvl: 5, hp: 50000, dmg: 10, rew: 200, icon: '🐝👺' },
    { id: 'tank', lvl: 15, hp: 100000, dmg: 40, rew: 15000, icon: '🛡️🧟' },
    { id: 'titan', lvl: 30, hp: 200000, dmg: 100, rew: 50000, icon: '🧟🏚️' },
    { id: 'boss', lvl: 50, hp: 500000, dmg: 1000, rew: 250000, icon: '👺👹' }
];

const YGG_PARAMS = {
    1: { cap: 1, delay: 30000, cost: 0, name_en: "Seed of Yggdrasil", name_ru: "Семя Иггдрасиля" },
    2: { cap: 10, delay: 30000, cost: 50000000, name_en: "Yggdrasil Sapling", name_ru: "Саженец Иггдрасиля" },
    3: { cap: 60, delay: 30000, cost: 200000000, name_en: "World Tree", name_ru: "Древо Миров" },
    4: { cap: 120, delay: 30000, cost: 1000000000, name_en: "Elder Yggdrasil", name_ru: "Старший Иггдрасиль" },
    5: { cap: 999999, delay: 30000, cost: 5000000000, name_en: "Infinity Heart", name_ru: "Сердце Бесконечности" },
};

function normalizeYggLevel() {
    const raw = parseInt(state.yggLevel || 1);
    if (YGG_PARAMS[raw]) {
        state.yggLevel = raw;
        return;
    }
    const capToLevel = {};
    for (let lvl in YGG_PARAMS) {
        capToLevel[YGG_PARAMS[lvl].cap] = parseInt(lvl);
    }
    state.yggLevel = capToLevel[raw] || 1;
}

function getTriadL3Keys() {
    return Object.keys(ITEMS)
        .filter(k => ITEMS[k].triad && ITEMS[k].tier === 3)
        .sort();
}

/* --- STATE --- */
let state = {
    money: 50, xp: 0, level: 1, hp: 100, maxHp: 100,
    plots: Array(9).fill().map(() => ({ state: 'empty', key: null, time: 0, fert: false, gh: false })),
    inventory: { carrot: 2 }, weapons: [], parts: 0, hardcore: false,
    rainUntil: 0, gardenPage: 0, discovered: {}, yggLevel: 1, won: false,
    yggSpeed: false, noRain: false, peaceful: false
};

let selected = null, tab = 'seeds', currentEnemy = null, combo = 0, comboMult = 1, comboTimer = null;
let breeding = { a: null, b: null };
let isPaused = false;
let battleInterval = null;
let lastTick = Date.now();
const keysDown = {};

/* --- CORE FUNCTIONS --- */
function save() { localStorage.setItem('sergey_final_v10', JSON.stringify(state)); }
function load() {
    let s = localStorage.getItem('sergey_final_v10');
    if (!s) s = localStorage.getItem('sergey_final_v9'); // legacy support
    if (s) {
        try {
            const loaded = JSON.parse(s);
            state = { ...state, ...loaded };
            if (!state.plots) state.plots = Array(9).fill().map(() => ({ state: 'empty' }));
            if (!state.inventory) state.inventory = { carrot: 2 };
        } catch (e) { }
    }
    if (state.hardcore) document.body.classList.add('hardcore');
    normalizeYggLevel();
}

/* --- UI --- */
function updateUI() {
    if (state.maxHp > 15000) state.maxHp = 15000;
    if (state.hp > state.maxHp) state.hp = state.maxHp;

    document.getElementById('money').innerText = Math.floor(state.money).toLocaleString();
    document.getElementById('level').innerText = state.level;
    document.getElementById('hp').innerText = `${Math.floor(state.hp)}/${state.maxHp}`;

    const next = Math.floor(Math.pow(state.level, 1.6) * 100);
    document.getElementById('xp-fill').style.width = (state.xp / next * 100) + '%';
    document.getElementById('xp-text').innerText = `${Math.floor(state.xp)}/${next} XP`;
    document.getElementById('plot-cost').innerText = (Math.max(0, state.plots.length - 8) * 50).toLocaleString() + 'k';
    document.getElementById('garden-page').innerText = state.gardenPage + 1;

    const hasSeed = (state.inventory.void_seed > 0) || state.plots.some(p => p.key === 'void_seed');
    document.getElementById('btn-portal').style.display = hasSeed ? 'block' : 'none';

    renderInventory();
    renderShop();
    renderGarden();
    checkDiscovery();
}

function getItemName(key) {
    const it = ITEMS[key];
    if (!it) return key;
    return currentLang === 'en' ? it.name_en : it.name_ru;
}

function getNextPlantKey(currentKey) {
    const keys = Object.keys(state.inventory)
        .filter(k => ITEMS[k]?.type === 'plant' && state.inventory[k] > 0);
    if (!keys.length) return null;
    for (let k of keys) {
        if (k !== currentKey) return k;
    }
    return null;
}

function getItemRecipeLines(key) {
    const it = ITEMS[key];
    if (!it) return [t('unknownRecipe')];
    if (key === 'void_seed') return [t('yggRecipe')];
    if (!it.hybrid) return [t('sourceShop')];

    const recipes = RECIPE_LOOKUP[key];
    if (recipes && recipes.length) {
        return recipes.map(pair => `${getItemName(pair[0])} + ${getItemName(pair[1])}`);
    }
    if (it.triad && it.tier === 3) return [t('triadRecipe')];
    return [t('unknownRecipe')];
}

function showItemDetails(key) {
    const it = ITEMS[key];
    if (!it) return;
    document.getElementById('item-detail-overlay')?.remove();
    const name = getItemName(key);
    const buyText = (typeof it.cost === 'number') ? it.cost.toLocaleString() + "💰" : "—";
    const sellText = (typeof it.sell === 'number') ? it.sell.toLocaleString() + "💰" : "—";
    const baseTime = (typeof it.time === 'number') ? it.time : null;
    const effectiveTime = (baseTime && baseTime > 0) ? Math.max(1, Math.round(baseTime / BASE_GROWTH_SPEED)) : baseTime;
    const timeText = (typeof effectiveTime === 'number')
        ? (effectiveTime === 0 ? "∞" : `${effectiveTime}${t('seconds')}`)
        : "—";
    const recipeLines = getItemRecipeLines(key);
    const displayLines = recipeLines.slice(0, 6);
    const hasMore = recipeLines.length > 6;

    const overlay = document.createElement('div');
    overlay.className = 'enemy-overlay';
    overlay.id = 'item-detail-overlay';
    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
    overlay.innerHTML = `
        <div class="item-detail-panel">
            <div class="item-detail-header">
                <div class="item-detail-icon">${it.icon}</div>
                <div>
                    <div class="item-detail-name">${name}</div>
                    <div class="item-detail-sub">${it.tier ? `L${it.tier}` : ''}</div>
                </div>
            </div>
            <div class="item-detail-grid">
                <div class="item-detail-row"><span>${t('buyPrice')}</span><b>${buyText}</b></div>
                <div class="item-detail-row"><span>${t('sellPrice')}</span><b>${sellText}</b></div>
                <div class="item-detail-row"><span>${t('growTime')}</span><b>${timeText}</b></div>
                <div class="item-detail-row"><span>${t('source')}</span><b>${it.hybrid ? t('sourceLab') : t('sourceShop')}</b></div>
            </div>
            <div class="item-detail-recipe">
                <div class="item-detail-recipe-title">${t('recipe')}</div>
                ${displayLines.map(line => `<div class="recipe-line">${line}</div>`).join('')}
                ${hasMore ? `<div class="recipe-line">…</div>` : ''}
            </div>
            <button class="btn full-width" onclick="document.getElementById('item-detail-overlay')?.remove()">${t('close')}</button>
        </div>
    `;
    document.body.appendChild(overlay);
}

function renderInventory() {
    const c = document.getElementById('inventory');
    c.innerHTML = '';
    for (let k in state.inventory) {
        if (state.inventory[k] <= 0) continue;
        const it = ITEMS[k];
        if (!it) continue;
        const d = document.createElement('div');
        d.className = `item-card ${selected === k ? 'active' : ''}`;
        d.onclick = () => {
            if (tab === 'lab') addToBreeding(k);
            else selected = (selected === k ? null : k);
            updateUI();
        };
        const name = getItemName(k);
        d.innerHTML = `<span>${it.icon}</span><div style="flex:1"><b>${name}</b><br><small>x${state.inventory[k]}</small></div>`;
        c.appendChild(d);
    }
}

function renderShop() {
    const c = document.getElementById('shop');
    c.innerHTML = '';
    if (tab === 'lab') return renderLaboratory(c);

    for (let k in ITEMS) {
        const it = ITEMS[k];
        if (it.cat !== tab) continue;
        if (state.hardcore && it.win) continue;
        if (!state.hardcore && it.hardcore) continue;
        if (it.hybrid) continue;

        const lock = state.level < it.req;
        const owned = it.type === 'weapon' && state.weapons.includes(k);
        const name = getItemName(k);

        const d = document.createElement('div');
        d.className = `item-card ${lock ? 'locked' : ''}`;
        d.innerHTML = `
            <span>${it.icon}</span>
            <div style="flex:1"><b>${name}</b><br><small>${owned ? '✅ ' + t('bought') : (lock ? t('locked') + it.req : it.cost.toLocaleString() + '💰')}</small></div>
            ${!lock && !owned ? `<button class="btn" onclick="buy('${k}')">${t('buy')}</button>` : ''}
        `;
        c.appendChild(d);
    }
}

function renderGarden() {
    const c = document.getElementById('garden');
    c.innerHTML = '';

    for (let i = 0; i < 9; i++) {
        const idx = state.gardenPage * 9 + i;
        const p = state.plots[idx];
        const d = document.createElement('div');

        if (!p) {
            d.className = 'plot locked';
            d.innerHTML = '🔒';
            c.appendChild(d);
            continue;
        }

        d.className = `plot ${p.state === 'ready' ? 'ready' : ''}`;
        d.style.background = p.gh ? 'rgba(76,175,80,0.1)' : '';
        d.onclick = (e) => clickPlot(idx, e);
        d.oncontextmenu = (e) => { e.preventDefault(); upgradePlot(idx); };

        if (p.state === 'empty') {
            d.innerHTML = `<span style="opacity:0.1">🕳️</span>${p.fert ? '<div class="badge">⚡</div>' : ''}`;
        } else if (p.key === 'void_seed') {
            const lvl = parseInt(state.yggLevel || 1);
            const cap = YGG_PARAMS[lvl].cap;
            const isReady = (p.galaxyCount || 0) >= cap;
            d.className = `plot ${isReady ? 'ready' : ''}`;
            d.innerHTML = `
                <div class="yggdrasil-container">
                    <div class="yggdrasil-aura"></div>
                    <div id="ygg-counter-${idx}" class="yggdrasil-counter">[ 🌌 ${p.galaxyCount || 0} / ${cap >= 999999 ? '∞' : cap} ]</div>
                    <div style="font-size:60px; z-index:2; text-shadow:0 0 20px #d0f">🌳</div>
                </div>`;
        } else {
            const it = ITEMS[p.key];
            if (!it) {
                p.state = 'empty'; d.innerHTML = 'Error';
            } else {
                const pct = p.progress || 0;
                const scale = p.state === 'ready' ? 1 : 0.3 + (pct / 100 * 0.7);
                d.innerHTML = `
                    <span id="pemoji-${idx}" class="plant-emoji" style="font-size:40px; transform: scale(${scale})">${it.icon}</span>
                    ${p.state === 'growing' ? `<div class="progress-mini"><div class="progress-mini-fill" id="pfill-${idx}" style="width:${pct}%"></div></div>` : ''}
                    ${p.fert ? '<div class="badge">⚡</div>' : ''}
                `;
            }
        }
        c.appendChild(d);
    }
}

/* --- GAME LOOP --- */
function loop() {
    if (isPaused) { setTimeout(loop, 100); return; }

    const now = Date.now();
    const dt = now - lastTick;
    lastTick = now;

    const isRain = !state.noRain && state.rainUntil > now;
    if (state.noRain) {
        state.rainUntil = 0;
        document.body.classList.remove('rain-active');
    } else if (isRain) {
        document.body.classList.add('rain-active');
        document.getElementById('weather-banner').style.display = 'block';
        document.getElementById('rain-timer').innerText = Math.ceil((state.rainUntil - now) / 1000);
    } else {
        document.body.classList.remove('rain-active');
        document.getElementById('weather-banner').style.display = 'none';
        if (Math.random() < 0.0005) {
            state.rainUntil = now + (20 + Math.random() * 30) * 1000;
            showToast(t('rainStart'));
            playSfx('rain');
        }
    }

    state.plots.forEach((p, i) => {
        if (!p || p.state !== 'growing') return;
        const globalIdx = state.gardenPage * 9 + i;

        if (p.key === 'void_seed') {
            if (!p.galaxyTimer) p.galaxyTimer = Date.now();
            const lvl = parseInt(state.yggLevel || 1);
            const params = YGG_PARAMS[lvl];
            const delay = state.yggSpeed ? 10000 : 30000;

            if (Date.now() - p.galaxyTimer >= delay) {
                if ((p.galaxyCount || 0) < params.cap) {
                    p.galaxyCount = (p.galaxyCount || 0) + 1;
                    p.galaxyTimer = Date.now();
                    const el = document.getElementById(`ygg-counter-${globalIdx}`);
                    if (el) el.innerText = `[ 🌌 ${p.galaxyCount} / ${params.cap >= 999999 ? '∞' : params.cap} ]`;
                }
            }
        } else {
            const it = ITEMS[p.key];
            if (!it) return;

            let speed = (p.fert ? 2 : 1) * (isRain ? 2 : 1);
            const baseTime = Math.max(1, it.time || 1);
            p.progress = (p.progress || 0) + (100 / (baseTime * 1000)) * dt * speed * BASE_GROWTH_SPEED;

            const fill = document.getElementById(`pfill-${i}`);
            const emoji = document.getElementById(`pemoji-${i}`);

            if (fill) fill.style.width = Math.min(100, p.progress) + '%';
            if (emoji) emoji.style.transform = `scale(${0.3 + (p.progress / 100 * 0.7)})`;

            if (p.progress >= 100) {
                p.state = 'ready';
                p.progress = 100;
                save(); updateUI();
            }
        }
    });

    if (!currentEnemy) spawnEnemy();
    drawRain();

    const target = document.getElementById('money').getBoundingClientRect();
    document.documentElement.style.setProperty('--tx-target', target.left + 'px');
    document.documentElement.style.setProperty('--ty-target', target.top + 'px');

    setTimeout(loop, 100);
}

/* --- ACTIONS --- */
function clickPlot(i, event) {
    if (isPaused) return;
    const p = state.plots[i];

    if (p.state === 'empty' && selected && ITEMS[selected].type === 'plant') {
        const itemKey = selected;
        const it = ITEMS[itemKey];

        if (it.rare && !p.gh) return showToast("❌ Greenhouse needed!");
        if (it.triad && !p.gh) return showToast("❌ Greenhouse needed!");
        if (itemKey === 'void_seed' && state.plots.some(x => x.key === 'void_seed')) return showToast("❌ Already planted!");

        if (state.inventory[itemKey] > 0) {
            state.inventory[itemKey]--;
            p.state = 'growing';
            p.key = itemKey;
            p.time = Date.now();
            p.progress = 0;

            if (state.inventory[itemKey] <= 0) {
                delete state.inventory[itemKey];
                selected = getNextPlantKey(itemKey);
            }
            if (itemKey === 'void_seed') {
                selected = getNextPlantKey(itemKey);
            }

            if (!state.discovered[itemKey]) {
                state.discovered[itemKey] = true;
                showToast(t('discovered') + getItemName(itemKey));
            }
            checkDiscovery();
            playSfx('plant');
        } else {
            showToast("❌ " + t('noMoney'));
            selected = null;
        }

    } else if (p.state === 'ready') {
        const it = ITEMS[p.key];
        if (!it) { p.state = 'empty'; return; }

        state.money = Math.floor(state.money + it.sell);
        addXp(it.xp);
        spawnCoin(event.clientX, event.clientY);
        playSfx('harvest');

        if (it.drops) { state.parts++; showToast(t('foundPart')); }
        p.state = 'empty'; p.key = null; p.progress = 0;

    } else if (p.state === 'growing' && selected === 'fertilizer') {
        if (state.inventory.fertilizer > 0) {
            state.inventory.fertilizer--;
            if (state.inventory.fertilizer <= 0) selected = null;
            p.progress = Math.min(99, p.progress + 10);
            playSfx('click');
        }

    } else if (p.key === 'void_seed') {
        const c = p.galaxyCount || 0;
        if (c > 0) {
            state.inventory.galaxy = (state.inventory.galaxy || 0) + c;
            p.galaxyCount = 0;
            showToast(`🌌 ${t('harvested')}: ${c}`);
            playSfx('harvest');
        }
    }
    save(); updateUI();
}

function buy(k) {
    const it = ITEMS[k];
    if (state.money < it.cost) return showToast("❌ " + t('noMoney'));

    if (it.heal) {
        if (state.hp >= state.maxHp) return showToast("Full HP!");
        state.money -= it.cost;
        state.hp = it.heal === 'full' ? state.maxHp : Math.min(state.maxHp, state.hp + it.heal);
    } else if (it.maxHpPlus) {
        if (state.maxHp >= 15000) return showToast("Max Armor!");
        state.money -= it.cost;
        state.maxHp += it.maxHpPlus;
        state.hp += it.maxHpPlus;
    } else if (it.win) {
        state.money -= it.cost;
        state.hardcore = true;
        document.body.classList.add('hardcore');
        alert("💀 HARDCORE MODE! Enemy prices up!");
        save(); updateUI();
        return;
    } else {
        state.money -= it.cost;
        if (it.type === 'weapon') state.weapons.push(k);
        else state.inventory[k] = (state.inventory[k] || 0) + 1;
    }
    save(); updateUI();
}

function addXp(n) {
    state.xp += n;
    let next = Math.floor(Math.pow(state.level, 1.6) * 100);
    while (state.xp >= next) {
        state.xp -= next;
        state.level++;
        state.hp = state.maxHp;
        next = Math.floor(Math.pow(state.level, 1.6) * 100);
        showToast("⭐ LEVEL UP!");
    }
    save(); updateUI();
}

function buyPlot() {
    const cost = (state.plots.length - 8) * 50000;
    if (state.money >= cost) {
        state.money -= cost;
        state.plots.push({ state: 'empty', key: null, time: 0 });
        save(); updateUI();
    }
}

function renderLaboratory(c) {
    const pA = ITEMS[breeding.a], pB = ITEMS[breeding.b];
    const cA = pA ? (pA.cost || pA.sell / 2 || 10) : 0;
    const cB = pB ? (pB.cost || pB.sell / 2 || 10) : 0;
    const cost = Math.floor((cA + cB) * 1.5);

    const countA = breeding.a ? (state.inventory[breeding.a] || 0) : 0;
    const countB = breeding.b ? (state.inventory[breeding.b] || 0) : 0;
    const maxPairs = (breeding.a && breeding.b)
        ? (breeding.a === breeding.b ? Math.floor(countA / 2) : Math.min(countA, countB))
        : 0;
    const totalCost = cost * maxPairs;
    const canSingle = !!(breeding.a && breeding.b);
    const canAll = maxPairs > 0;

    const singleBtn = `<button class="btn full-width ${canSingle ? '' : 'disabled'}" ${canSingle ? `onclick="doBreeding()"` : ''}>${t('mix')} (${cost.toLocaleString()})</button>`;
    const allBtn = `<button class="btn full-width ${canAll ? '' : 'disabled'}" ${canAll ? `onclick="doBreedingAll()"` : ''}>${t('mixAll')} x${maxPairs} (${totalCost.toLocaleString()})</button>`;

    c.innerHTML = `
    <div style="text-align:center">
        <div style="display:flex;justify-content:center;gap:10px;margin:10px">
            <div class="plot" onclick="breeding.a=null;updateUI()">${pA?.icon || '❓'}</div>
            <div class="plot" onclick="breeding.b=null;updateUI()">${pB?.icon || '❓'}</div>
        </div>
        ${singleBtn}
        ${allBtn}
    </div>`;
}

function addToBreeding(k) {
    if (ITEMS[k].type !== 'plant') return showToast("Plants only!");
    if (!breeding.a) breeding.a = k; else breeding.b = k;
}

function doBreeding() {
    if (!breeding.a || !breeding.b) return showToast(t('need2'));

    const itemA = ITEMS[breeding.a];
    const itemB = ITEMS[breeding.b];
    const cA = itemA.cost || itemA.sell / 2 || 10;
    const cB = itemB.cost || itemB.sell / 2 || 10;
    const cost = Math.floor((cA + cB) * 1.5);

    if (state.money < cost) return showToast(t('noMoney'));
    if (state.inventory[breeding.a] < 1 || state.inventory[breeding.b] < 1) return showToast("Missing Items!");

    state.money = Math.floor(state.money - cost);
    state.inventory[breeding.a]--; state.inventory[breeding.b]--;
    const res = resolveBreedingResult(breeding.a, breeding.b);
    if (res) {
        state.inventory[res] = (state.inventory[res] || 0) + 1;
        showToast(t('success') + getItemName(res));
        if (!state.discovered[res]) { state.discovered[res] = true; checkDiscovery(); }
    } else {
        showToast(t('fail'));
        state.inventory['carrot'] = (state.inventory['carrot'] || 0) + 1;
    }
    breeding = { a: null, b: null };
    save(); updateUI();
}

function doBreedingAll() {
    if (!breeding.a || !breeding.b) return showToast(t('need2'));

    const itemA = ITEMS[breeding.a];
    const itemB = ITEMS[breeding.b];
    const cA = itemA.cost || itemA.sell / 2 || 10;
    const cB = itemB.cost || itemB.sell / 2 || 10;
    const cost = Math.floor((cA + cB) * 1.5);

    const countA = state.inventory[breeding.a] || 0;
    const countB = state.inventory[breeding.b] || 0;
    let maxPairs = breeding.a === breeding.b ? Math.floor(countA / 2) : Math.min(countA, countB);
    if (maxPairs < 1) return showToast("Missing Items!");

    const maxAffordable = Math.floor(state.money / cost);
    const runs = Math.min(maxPairs, maxAffordable);
    if (runs < 1) return showToast(t('noMoney'));
    const wasPartial = runs < maxPairs;

    state.money = Math.floor(state.money - cost * runs);
    if (breeding.a === breeding.b) {
        state.inventory[breeding.a] -= runs * 2;
    } else {
        state.inventory[breeding.a] -= runs;
        state.inventory[breeding.b] -= runs;
    }

    const results = {};
    for (let i = 0; i < runs; i++) {
        const res = resolveBreedingResult(breeding.a, breeding.b);
        if (res) {
            state.inventory[res] = (state.inventory[res] || 0) + 1;
            results[res] = (results[res] || 0) + 1;
            if (!state.discovered[res]) { state.discovered[res] = true; }
        } else {
            state.inventory['carrot'] = (state.inventory['carrot'] || 0) + 1;
            results['carrot'] = (results['carrot'] || 0) + 1;
        }
    }

    const summary = Object.keys(results).slice(0, 3)
        .map(k => `${getItemName(k)} x${results[k]}`).join(', ');
    showToast(`${t('success')}${summary}${Object.keys(results).length > 3 ? '…' : ''}${wasPartial ? ` (x${runs}/${maxPairs})` : ''}`);

    breeding = { a: null, b: null };
    save(); updateUI();
}

function upgradePlot(i) {
    if (isPaused) return;
    const p = state.plots[i];
    const d = document.createElement('div'); d.className = 'enemy-overlay'; d.id = 'up-ui';
    const fertBtn = `<button class="btn ${p.fert ? 'disabled' : ''}" onclick="applyUp(${i},'fert',500)">${p.fert ? 'OWNED' : 'Fertilizer (500)'}</button>`;
    const ghBtn = `<button class="btn ${p.gh ? 'disabled' : ''}" onclick="applyUp(${i},'gh',2000)">${p.gh ? 'OWNED' : 'Greenhouse (2000)'}</button>`;
    d.innerHTML = `<div class="enemy-panel"><h3>Plot #${i + 1}</h3>${fertBtn}<br><br>${ghBtn}<br><br><button class="btn full-width" onclick="document.getElementById('up-ui').remove()">Close</button></div>`;
    document.body.appendChild(d);
}

function applyUp(i, t, c) {
    if (state.money >= c && !state.plots[i][t]) {
        state.money -= c;
        state.plots[i][t] = true;
        document.getElementById('up-ui').remove();
        save(); updateUI(); showToast(t('bought'));
    }
}

/* --- YGGDRASIL --- */
function renderYggUpgrades() {
    const container = document.getElementById('ygg-upgrades');
    container.innerHTML = '';
    const lvl = parseInt(state.yggLevel || 1);
    const nextLvl = lvl + 1;
    const nextParam = YGG_PARAMS[nextLvl];

    if (nextParam) {
        const name = currentLang === 'en' ? nextParam.name_en : nextParam.name_ru;
        const capText = nextParam.cap >= 999999 ? '∞' : nextParam.cap;
        const btn = document.createElement('button');
        btn.className = 'btn gradient-btn full-width';
        btn.style.marginBottom = '10px';
        btn.innerHTML = `${name}<br><small>Cap: ${capText}</small><br>💰 ${nextParam.cost.toLocaleString()}`;
        btn.onclick = function () { buyYggUpgrade(nextLvl); };
        container.appendChild(btn);
    } else {
        container.innerHTML += `<div style="color:#0f0; margin-bottom:10px; border:1px solid #0f0; padding:5px">${t('yggMaxCap')}</div>`;
    }

    if (!state.yggSpeed) {
        const btn2 = document.createElement('button');
        btn2.className = 'btn gradient-btn full-width';
        btn2.innerHTML = `${t('starDust')} <br><small>${t('speedUp')}</small><br>💰 2,000,000,000`;
        btn2.onclick = buyStarDust;
        container.appendChild(btn2);
    } else {
        container.innerHTML += `<div style="color:#0f0">${t('yggMaxSpeed')}</div>`;
    }
}

function buyYggUpgrade(targetLvl) {
    targetLvl = parseInt(targetLvl);
    const p = YGG_PARAMS[targetLvl];
    if (!p) return showToast("Max level!");
    if (state.money >= p.cost) {
        state.money -= p.cost;
        state.yggLevel = targetLvl;
        playSfx('upgrade');
        renderYggUpgrades();
        updateUI();
        save();
        showToast("Upgraded!");
    } else {
        showToast(`Need ${p.cost.toLocaleString()}💰`);
    }
}

function buyStarDust() {
    const cost = 2000000000;
    if (state.money >= cost) {
        state.money -= cost;
        state.yggSpeed = true;
        playSfx('upgrade');
        renderYggUpgrades();
        updateUI();
        save();
    } else showToast("Need 2B!");
}

/* --- ADMIN --- */
function godMode() {
    state.money += 15000000000;
    state.level = 50;
    state.hp = state.maxHp;
    for (let k in ITEMS) {
        if (ITEMS[k].type === 'plant') {
            state.inventory[k] = (state.inventory[k] || 0) + 10;
        }
    }
    save(); updateUI(); showToast(t('godmode'));
}

function addTriadL3Set() {
    const keys = getTriadL3Keys();
    if (!state.discovered) state.discovered = {};
    keys.forEach(k => {
        state.inventory[k] = Math.max(state.inventory[k] || 0, 1);
        state.discovered[k] = true;
    });
    save(); updateUI(); showToast("L3 Sovereigns +39");
}

document.addEventListener('keydown', (e) => {
    keysDown[e.code] = true;
    if (keysDown['KeyA'] && keysDown['KeyD'] && keysDown['KeyM']) {
        const el = document.getElementById('admin-menu');
        el.style.display = el.style.display === 'block' ? 'none' : 'block';
    }
});
document.addEventListener('keyup', (e) => keysDown[e.code] = false);

function toggleAdmin() { document.getElementById('admin-menu').style.display = 'none'; }
function addMoney(n) { state.money += n; save(); updateUI(); }

function checkDiscovery() {
    if (!state.discovered) state.discovered = {};
    for (let k in state.inventory) if (state.inventory[k] > 0) state.discovered[k] = true;
    let cE = 0, tE = 0, cS = 0, tS = 0;
    for (let k in ITEMS) {
        if (ITEMS[k].type !== 'plant') continue;
        const isS = ITEMS[k].triad;
        if (isS) { tS++; if (state.discovered[k]) cS++; }
        else { tE++; if (state.discovered[k]) cE++; }
    }
    document.getElementById('encyclopedia-count').innerText = `${cE + cS}/${tE + tS}`;
    document.getElementById('count-earth').innerText = `${cE}/${tE}`;
    document.getElementById('count-sovereign').innerText = `${cS}/${tS}`;
}

function openEncyclopedia(tabName) {
    const modal = document.getElementById('encyclopedia-modal');
    modal.style.display = 'flex';
    const content = document.getElementById('encyclopedia-content');
    content.innerHTML = '';

    document.getElementById('tab-btn-earth').style.opacity = tabName === 'earth' ? 1 : 0.5;
    document.getElementById('tab-btn-sovereign').style.opacity = tabName === 'sovereign' ? 1 : 0.5;

    const isSov = tabName === 'sovereign';
    const keys = Object.keys(ITEMS).filter(k => ITEMS[k].type === 'plant' && (isSov ? ITEMS[k].triad : !ITEMS[k].triad));
    keys.sort((a, b) => (ITEMS[a].tier || 1) - (ITEMS[b].tier || 1));

    const grid = document.createElement('div');
    grid.style.display = 'grid'; grid.style.gridTemplateColumns = 'repeat(auto-fill, 80px)'; grid.style.gap = '10px';

    keys.forEach(k => {
        const item = ITEMS[k];
        const known = state.discovered[k];
        const d = document.createElement('div');
        d.style.border = '1px solid ' + (known ? (isSov ? '#0ff' : '#ca8') : '#333');
        d.style.background = known ? 'rgba(255,255,255,0.1)' : '#000';
        d.style.padding = '5px';
        d.style.textAlign = 'center';
        d.style.borderRadius = '5px';
        const name = getItemName(k);

        if (known) {
            d.innerHTML = `<div style="font-size:24px">${item.icon}</div><div style="font-size:9px">${name}</div>`;
            d.onclick = () => showItemDetails(k);
        } else {
            d.innerHTML = `<div style="font-size:24px;opacity:0.3">❓</div><div style="font-size:9px">???</div>`;
        }
        grid.appendChild(d);
    });
    content.appendChild(grid);

    if (isSov) {
        const triadsL3 = getTriadL3Keys();
        let count = 0;
        triadsL3.forEach(k => { if (state.inventory[k] > 0) count++; });

        const fuseDiv = document.createElement('div');
        fuseDiv.style.marginTop = '20px';
        fuseDiv.style.textAlign = 'center';
        fuseDiv.style.border = '1px solid #d0f';
        fuseDiv.style.padding = '10px';

        if (count >= triadsL3.length) {
            fuseDiv.innerHTML = `<h3 style="color:#0f0">SINGULARITY READY</h3><button class="btn gradient-btn" onclick="fuseSingularity()">CREATE YGGDRASIL</button>`;
        } else {
            fuseDiv.innerHTML = `<h3 style="color:#555">SYNTHESIS (${count}/${triadsL3.length})</h3><p style="font-size:10px;color:#aaa">Collect all ${triadsL3.length} L3 Sovereigns</p>`;
        }
        content.appendChild(fuseDiv);
    }
}

function fuseSingularity() {
    if (!confirm("Create Yggdrasil? Consumes 1 of each L3.")) return;
    const triadsL3 = getTriadL3Keys();
    for (let k of triadsL3) {
        if (!state.inventory[k] || state.inventory[k] < 1) return showToast("Missing: " + getItemName(k));
    }
    triadsL3.forEach(k => state.inventory[k]--);
    state.inventory.void_seed = (state.inventory.void_seed || 0) + 1;
    state.discovered.void_seed = true;
    playSfx('upgrade');
    alert("🌌 VOID SEED OBTAINED!");
    save(); updateUI(); openEncyclopedia('sovereign');
}

function setBattleMode(active) {
    document.body.classList.toggle('battle-active', active);
    const existing = document.getElementById('battle-flash');
    if (active) {
        if (!existing) {
            const flash = document.createElement('div');
            flash.id = 'battle-flash';
            flash.className = 'battle-flash';
            document.body.appendChild(flash);
        }
    } else {
        existing?.remove();
    }
}

function spawnEnemy() {
    if (state.peaceful) return;
    let chance = 0.0003 + state.level * 0.0001;
    if (Math.random() > chance * (1 - (state.hp / state.maxHp) * 0.8)) return;

    const pool = ENEMIES.filter(e => e.lvl <= state.level && (!e.hardcoreOnly || state.hardcore));
    if (!pool.length) return;

    let enemy;
    if (Math.random() < 0.05 && state.level > 40) {
        enemy = ENEMIES.find(e => e.id === 'boss');
    }
    if (!enemy) enemy = pool[Math.floor(Math.random() * pool.length)];

    const hp = state.hardcore ? enemy.hp * 5 : enemy.hp;
    currentEnemy = { ...enemy, curHp: hp, maxHp: hp };
    setBattleMode(true);

    const div = document.createElement('div');
    div.className = 'enemy-overlay';
    div.id = 'bat-over';
    const enName = TRANSLATIONS[currentLang].enemies[enemy.id] || enemy.id;
    div.innerHTML = `<div class="enemy-panel"><h2 style="color:red">${t('attack')}</h2><div style="font-size:60px">${enemy.icon}</div><div>${enName}</div><div class="xp-bar-bg" style="width:100%"><div id="ehp" class="xp-bar-fill" style="background:red;width:100%"></div></div><button class="btn full-width" onclick="attack(event)" style="margin-top:10px;height:50px;font-size:20px">⚔️ ${t('hit')}</button></div>`;
    document.body.appendChild(div);

    battleInterval = setInterval(() => {
        if (!isPaused && currentEnemy) {
            state.hp -= enemy.dmg;
            if (state.hp <= 0) gameOver();
            updateUI();
        }
    }, 2000);
}

function attack(e) {
    if (!currentEnemy) return;
    combo++;
    clearTimeout(comboTimer);
    comboTimer = setTimeout(() => combo = 0, 1000);

    let dmg = 10;
    state.weapons.forEach(w => dmg += ITEMS[w].damage);
    dmg *= (1 + combo * 0.05);

    currentEnemy.curHp -= dmg;
    spawnTxt(e.clientX, e.clientY, Math.floor(dmg));

    if (currentEnemy.curHp <= 0) {
        clearInterval(battleInterval);
        state.money = Math.floor(state.money + currentEnemy.rew);
        document.getElementById('bat-over').remove();
        currentEnemy = null;
        setBattleMode(false);
        showToast(t('win'));
        save(); updateUI();
    } else {
        document.getElementById('ehp').style.width = (currentEnemy.curHp / currentEnemy.maxHp * 100) + '%';
    }
}

function gameOver() {
    clearInterval(battleInterval);
    document.getElementById('bat-over')?.remove();
    currentEnemy = null;
    setBattleMode(false);
    const d = document.createElement('div');
    d.className = 'enemy-overlay';
    d.innerHTML = `<div class="enemy-panel"><h1 style="color:red">${t('dead')}</h1><div style="margin:10px 0;color:#ff7777">${t('deathPenalty')}</div><button class="btn" onclick="location.reload()">${t('ok')}</button></div>`;
    document.body.appendChild(d);
    state.money = Math.floor(state.money * 0.6);
    for (let k in state.inventory) {
        if (ITEMS[k]?.type !== 'plant') continue;
        const loss = Math.floor((state.inventory[k] || 0) * 0.4);
        if (loss > 0) {
            state.inventory[k] -= loss;
            if (state.inventory[k] <= 0) delete state.inventory[k];
        }
    }
    state.plots.forEach(p => {
        if (!p || p.state === 'empty') return;
        if (p.key === 'void_seed') return;
        if (Math.random() < 0.4) {
            p.state = 'empty';
            p.key = null;
            p.progress = 0;
            p.time = 0;
        }
    });
    state.hp = state.maxHp;
    save(); updateUI();
}

function spawnTxt(x, y, t, c = 'red') {
    const el = document.createElement('div');
    el.className = 'damage-text';
    el.innerText = t; el.style.color = c;
    el.style.left = x + 'px'; el.style.top = y + 'px';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 800);
}

function spawnCoin(x, y) {
    const el = document.createElement('div');
    el.className = 'coin-particle';
    el.innerText = '💰';
    const target = document.getElementById('money').getBoundingClientRect();
    el.style.setProperty('--tx', (target.left - x) + 'px');
    el.style.setProperty('--ty', (target.top - y) + 'px');
    el.style.left = x + 'px'; el.style.top = y + 'px';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 800);
}

function drawRain() {
    if (!document.body.classList.contains('rain-active')) return;
    const ctx = document.getElementById('rain-canvas').getContext('2d');
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.strokeStyle = 'rgba(100,150,255,0.5)';
    ctx.beginPath();
    for (let i = 0; i < 50; i++) {
        let x = Math.random() * ctx.canvas.width, y = Math.random() * ctx.canvas.height;
        ctx.moveTo(x, y); ctx.lineTo(x, y + 10);
    }
    ctx.stroke();
}

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playSfx(t) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    osc.connect(g); g.connect(audioCtx.destination);
    osc.start(); osc.stop(audioCtx.currentTime + 0.1);
}

function showToast(t) {
    const el = document.getElementById('toast');
    el.innerText = t; el.style.display = 'block';
    setTimeout(() => el.style.display = 'none', 2000);
}

document.getElementById('next-page').onclick = () => {
    if (state.plots.length > (state.gardenPage + 1) * 9) { state.gardenPage++; updateUI(); }
    else showToast("Buy Plots!");
}
document.getElementById('prev-page').onclick = () => { if (state.gardenPage > 0) state.gardenPage--; updateUI(); }
document.getElementById('plot-btn').onclick = buyPlot;
document.getElementById('pause-btn').onclick = () => { isPaused = !isPaused; showToast(isPaused ? t('pause') : t('play')); }
document.getElementById('btn-portal').onclick = openPortal;
document.getElementById('btn-encyclopedia').onclick = () => openEncyclopedia('earth');
document.getElementById('btn-sell-galaxy').onclick = sellGalaxies;
document.getElementById('btn-buy-universe').onclick = buyUniverse;
document.getElementById('btn-close-portal').onclick = () => document.getElementById('portal-modal').style.display = 'none';
document.querySelectorAll('.close-btn').forEach(b => b.onclick = (e) => e.target.parentElement.parentElement.parentElement.style.display = 'none');
document.getElementById('tab-btn-earth').onclick = () => openEncyclopedia('earth');
document.getElementById('tab-btn-sovereign').onclick = () => openEncyclopedia('sovereign');
document.querySelectorAll('.tab-btn').forEach(b => b.onclick = (e) => {
    document.querySelectorAll('.tab-btn').forEach(x => x.classList.remove('active'));
    e.target.classList.add('active'); tab = e.target.dataset.tab; updateUI();
});
document.getElementById('btn-toggle-enemies').onclick = () => { state.peaceful = !state.peaceful; showToast("Enemies: " + (state.peaceful ? "OFF" : "ON")); };
document.getElementById('btn-toggle-rain').onclick = () => { state.noRain = !state.noRain; showToast("Rain: " + (state.noRain ? "OFF" : "ON")); };

function buyUniverse() {
    if (state.won) return;
    if (state.money >= 10000000000) {
        state.money -= 10000000000;
        state.won = true;
        document.getElementById('victory-modal').style.display = 'flex';
        openPortal();
        save(); updateUI();
    } else showToast("Need 10B!");
}
function sellGalaxies() {
    const g = state.inventory.galaxy || 0;
    if (g > 0) { state.money += g * 10000000; state.inventory.galaxy = 0; save(); updateUI(); openPortal(); }
}
function resetGame() { if (confirm("Reset?")) { localStorage.clear(); location.reload(); } }
function closeVictory() { document.getElementById('victory-modal').style.display = 'none'; }

function openPortal() {
    document.getElementById('portal-modal').style.display = 'flex';
    document.getElementById('portal-galaxy-count').innerText = state.inventory.galaxy || 0;
    renderYggUpgrades();
    const btn = document.getElementById('btn-buy-universe');
    if (state.won) {
        btn.innerText = "YOU OWN THIS";
        btn.style.background = "gold";
        btn.style.color = "black";
        btn.classList.add('disabled');
    }
}

// Init
load();
applyLanguage(); // This calls updateUI
loop();
