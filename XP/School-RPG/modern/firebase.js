// 🔥 FIREBASE MODULE (ОНЛАЙН РЕКОРДЫ + АККАУНТЫ) 🔥
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit, doc, getDoc, setDoc, updateDoc, startAfter } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAyatGz9z_EYXBAFrH2wrnX8snbDn1ESJk",
    authDomain: "schoolrpg-leaderboard.firebaseapp.com",
    projectId: "schoolrpg-leaderboard",
    storageBucket: "schoolrpg-leaderboard.firebasestorage.app",
    messagingSenderId: "942057524924",
    appId: "1:942057524924:web:4720f94710edd210ec8ab9",
    measurementId: "G-MR13BVCGZW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const scoresCol = collection(db, 'leaderboard');

console.log("Firebase подключен!");

// --- USER ACCOUNT FUNCTIONS (OVERWRITE GLOBAL) ---
window.loginOrRegister = async function (name, pass) {
    // FIX: Allow Russian chars (escape slash in regex)
    const userId = name.trim().replace(/[.#$\/\[\]]/g, '_');
    const userRef = doc(db, "users", userId);
    const msgEl = document.getElementById('auth-msg');

    try {
        const snap = await getDoc(userRef);
        if (snap.exists()) {
            const data = snap.data();

            if (data.password) {
                // Check existing
                if (data.password !== pass) {
                    msgEl.textContent = "❌ Неверный пароль!"; return;
                }
            } else {
                // No password -> Require setup
                if (!pass) {
                    msgEl.textContent = "⚠️ Придумайте пароль!"; return;
                }
                // Save new password
                await updateDoc(userRef, { password: pass });
                data.password = pass;
                msgEl.textContent = "🔒 Пароль установлен!";
            }
            // Load Data
            userProfile.loggedIn = true;
            userProfile.name = data.name;
            userProfile.rp = data.rp || 0;
            userProfile.unlockedSkins = data.unlockedSkins || ['default'];
            userProfile.currentSkin = data.currentSkin || 'default';
            userProfile.customImage = data.customImage || null;

            saveLocalFallback(); // Create Session

            state.storyLevel = data.storyLevel || 0;

            msgEl.textContent = "✅ Вход выполнен!";
        } else {
            // Register
            if (!pass) { msgEl.textContent = "❌ Пароль обязателен!"; return; }

            const newUser = {
                name: name,
                password: pass,
                rp: 100, // Starter bonus
                unlockedSkins: ['default'],
                currentSkin: 'default',
                customImage: null,
                storyLevel: 0
            };
            await setDoc(userRef, newUser);

            userProfile.loggedIn = true;
            userProfile.name = name;
            userProfile.rp = 100;

            saveLocalFallback(); // Create Session

            msgEl.textContent = "✨ Аккаунт создан (+100 RP)!";
        }

        setTimeout(() => {
            window.setupMenu();
        }, 1000);

    } catch (e) {
        console.warn("Firebase connect failed (likely CORS/file://). Using fallback.");
        fallbackLogin(name, pass); // Trigger the fallback defined in non-module script
    }
};

window.syncUserData = async function () {
    if (!userProfile.loggedIn || !userProfile.name) return;

    // Save locally first just in case
    saveLocalFallback();

    const userId = userProfile.name.trim().replace(/[.#$\/\[\]]/g, '_');
    const userRef = doc(db, "users", userId);

    try {
        await updateDoc(userRef, {
            rp: userProfile.rp,
            unlockedSkins: userProfile.unlockedSkins,
            currentSkin: userProfile.currentSkin,
            customImage: userProfile.customImage,
            storyLevel: state.storyLevel
        });
        console.log("Cloud Saved.");
    } catch (e) { console.warn("Cloud save failed (offline?), local save used."); }
};

// --- LEADERBOARD FUNCTIONS ---
window.saveScoreOnline = async function (scoreData) {
    try {
        scoreData.date = new Date().toISOString();
        scoreData.timestamp = Date.now();
        await addDoc(scoresCol, scoreData);
        console.log("✅ Рекорд успешно отправлен в облако!");
    } catch (e) {
        console.error("❌ Ошибка отправки рекорда:", e);
    }
}

let lastVisibleScore = null;
let cachedScores = [];

window.loadLeaderboardOnline = async function (loadMoreArg) {
    const loadMore = (loadMoreArg === true);
    const tableBody = document.querySelector('#leaderboard-table tbody');
    const filter = document.getElementById('filter-select').value;
    const loadBtn = document.getElementById('lb-load-more');

    if (!loadMore) {
        tableBody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:20px;">Загрузка данных из облака... ⏳</td></tr>';
        lastVisibleScore = null;
        cachedScores = [];
        loadBtn.style.display = 'none';
    } else {
        loadBtn.disabled = true;
        loadBtn.textContent = "...";
    }

    try {
        let q;
        if (lastVisibleScore) {
            q = query(scoresCol, orderBy("timestamp", "desc"), startAfter(lastVisibleScore), limit(100));
        } else {
            q = query(scoresCol, orderBy("timestamp", "desc"), limit(100));
        }

        const querySnapshot = await getDocs(q);

        if (querySnapshot.docs.length > 0) {
            lastVisibleScore = querySnapshot.docs[querySnapshot.docs.length - 1];
        }

        querySnapshot.forEach((doc) => {
            cachedScores.push(doc.data());
        });

        let processed = [...cachedScores];
        processed.forEach(s => {
            if (s.isWin === undefined) s.isWin = (s.hp > 0);
        });

        // 1. ФИЛЬТРАЦИЯ
        if (filter === 'wins') {
            processed = processed.filter(s => s.isWin === true);
        } else if (filter === 'losses') {
            processed = processed.filter(s => s.isWin !== true);
        }

        // 2. УМНАЯ СОРТИРОВКА
        processed.sort((a, b) => {
            const scoreA = window.calculateSmartScore(a);
            const scoreB = window.calculateSmartScore(b);
            return scoreB - scoreA;
        });

        // 3. ОТРИСОВКА
        tableBody.innerHTML = '';
        if (processed.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="5" style="text-align:center;">Записей по этому фильтру нет.</td></tr>';
            return;
        }

        processed.forEach((score, index) => {
            const row = tableBody.insertRow();
            const isRealWin = (score.isWin === true) && (score.hp > 0);
            if (score.hardcore) row.classList.add('hardcore-entry');
            if (isRealWin) row.classList.add('win-row');

            const statusIcon = isRealWin ? "🏆" : "💀";
            const pts = window.calculateSmartScore(score);

            row.innerHTML = `
            <td>${index + 1}</td>
            <td>${score.name}</td>
            <td>${statusIcon} ${window.getLocName(score.enemyName)}</td>
            <td>${score.hp}/${score.mp}</td>
            <td class="score-val">${pts}</td>
        `;
        });

        // Show button if we might have more records
        if (querySnapshot.docs.length === 100) {
            loadBtn.style.display = 'block';
            loadBtn.disabled = false;
            loadBtn.textContent = t('lb_load_more');
        } else {
            loadBtn.style.display = 'none';
        }

    } catch (e) {
        console.error("Ошибка загрузки:", e);
        if (!loadMore) tableBody.innerHTML = '<tr><td colspan="5" style="text-align:center;">Ошибка загрузки. Попробуйте позже.</td></tr>';
    }
}

// DAILY REWARDS LOGIC
window.openDailyMenu = function () {
    const modal = document.getElementById('daily-modal');
    if (!modal) { console.error("Daily modal not found!"); return; }
    modal.classList.add('show');
    const grid = document.getElementById('daily-grid');
    grid.innerHTML = '';

    const rewards = [100, 200, 300, 400, 500, 600, 1000];
    const today = new Date().setHours(0, 0, 0, 0);
    let lastClaim = userProfile.lastClaimDate ? new Date(userProfile.lastClaimDate).setHours(0, 0, 0, 0) : 0;

    // Сброс серии, если пропущен хотя бы один полный день 
    // (если между полночью дня последнего клейма и полночью сегодня прошло более 24 часов)
    if (lastClaim > 0 && today - lastClaim > 86400000) {
        userProfile.dailyStreak = 0;
    }

    const streak = userProfile.dailyStreak || 0;
    const canClaim = (today > lastClaim);

    rewards.forEach((val, i) => {
        const dayEl = document.createElement('div');
        dayEl.className = 'daily-day ' + (i === 6 ? 'big-prize' : '');

        if (i < streak) {
            dayEl.classList.add('claimed');
            dayEl.innerHTML = `<div>День ${i + 1}</div><div>✔</div>`;
        } else if (i === streak) {
            if (canClaim) {
                dayEl.classList.add('active');
                dayEl.innerHTML = `<div>День ${i + 1}</div><div style="font-weight:bold; color:#fbbf24">+${val} RP</div>`;
            } else {
                // Current step but already claimed
                dayEl.innerHTML = `<div>День ${i + 1}</div><div style="opacity:0.5">+${val} RP</div>`;
            }
        } else {
            dayEl.innerHTML = `<div>День ${i + 1}</div><div style="opacity:0.5">+${val} RP</div>`;
        }
        grid.appendChild(dayEl);
    });

    const btn = document.getElementById('daily-claim-btn');
    btn.disabled = !canClaim;
    btn.textContent = canClaim ? "ЗАБРАТЬ" : "УЖЕ ПОЛУЧЕНО (Ждите завтра)";
}

window.claimDailyReward = function () {
    const rewards = [100, 200, 300, 400, 500, 600, 1000];
    const streak = userProfile.dailyStreak || 0;

    const reward = rewards[streak % 7];
    userProfile.rp += reward;
    userProfile.dailyStreak = (streak + 1) % 7; // Loop 0-6
    userProfile.lastClaimDate = Date.now();

    if (window.syncUserData) window.syncUserData();
    else saveLocalFallback();

    Sound.win();
    openDailyMenu(); // Update UI
    updateMenuStats();
}

window.onload = setupMenu;

// FIX: Alias for HTML onchange handler
window.reloadLeaderboard = window.loadLeaderboardOnline;
