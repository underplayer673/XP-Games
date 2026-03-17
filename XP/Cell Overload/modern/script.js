const GRID_SIZE = 6;
const CRITICAL_MASS = 3;
const DELAY = 150;

let board = [];
let currentPlayer = 'blue';
let gameActive = false;
let isAIProcessing = false;
let isExploding = false;
let movesMade = 0;
let currentLang = 'en';
let playerElo = parseInt(localStorage.getItem('cell_elo') || '1200');

const firebaseConfig = {
    apiKey: "AIzaSyAyatGz9z_EYXBAFrH2wrnX8snbDn1ESJk",
    authDomain: "schoolrpg-leaderboard.firebaseapp.com",
    projectId: "schoolrpg-leaderboard",
    storageBucket: "schoolrpg-leaderboard.firebasestorage.app",
    messagingSenderId: "942057524924",
    appId: "1:942057524924:web:4720f94710edd210ec8ab9"
};

const LeaderboardSystem = {
    isOnline: false, db: null, scoresCol: null, gameId: 'cell_overload_modern',
    async init() {
        this.isOnline = navigator.onLine;
        if (this.isOnline) {
            try {
                if (!window.fbApp) {
                    const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js");
                    window.fbApp = initializeApp(firebaseConfig);
                    const { getFirestore } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");
                    window.fbDb = getFirestore(window.fbApp);
                }
                this.db = window.fbDb;
                const { collection } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");
                this.scoresCol = collection(this.db, 'leaderboards', this.gameId, 'scores');
            } catch (e) { this.isOnline = false; }
        }
    },
    async saveScore(name, score, desc = "") {
        const entry = { name: name || localStorage.getItem('player_name') || "Player", score: Number(score), desc: desc, timestamp: Date.now() };
        if (this.isOnline && this.db) {
            try { const { addDoc } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"); await addDoc(this.scoresCol, entry); }
            catch (e) { this.saveLocal(entry); }
        } else this.saveLocal(entry);
    },
    saveLocal(entry) {
        let scores = this.getLocalRaw(); scores.push(entry);
        scores.sort((a, b) => b.score - a.score);
        localStorage.setItem(`lb_${this.gameId}`, JSON.stringify(scores.slice(0, 50)));
    },
    getLocalRaw() { try { return JSON.parse(localStorage.getItem(`lb_${this.gameId}`) || "[]"); } catch (e) { return []; } },
    async getScores(limitCount = 10) {
        if (this.isOnline && this.db) {
            try {
                const { getDocs, query, orderBy, limit } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");
                const q = query(this.scoresCol, orderBy("score", "desc"), limit(limitCount));
                const snap = await getDocs(q); return snap.docs.map(doc => doc.data());
            } catch (e) { return this.getLocalRaw().slice(0, limitCount); }
        } else return this.getLocalRaw().slice(0, limitCount);
    }
};

const LeaderboardUI = {
    show() {
        let s = document.getElementById('lb-screen') || document.createElement('div');
        s.id = 'lb-screen';
        s.style = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);z-index:10000;display:flex;align-items:center;justify-content:center;color:white;backdrop-filter:blur(10px);font-family:'Rajdhani', sans-serif;";
        document.body.appendChild(s); s.style.display = 'flex';
        s.innerHTML = `<div style="width:90%;max-width:400px;background:#050510;border:2px solid #00f3ff;border-radius:15px;padding:25px;box-shadow:0 0 20px #00f3ff55;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
                <h2 style="margin:0;color:#00f3ff;font-family:'Orbitron', sans-serif;letter-spacing:2px;">TOP COMMANDERS</h2>
                <button onclick="document.getElementById('lb-screen').style.display='none'" style="background:none;border:none;color:white;font-size:24px;cursor:pointer;">✕</button>
            </div>
            <div id="lb-list" style="max-height:60vh;overflow-y:auto;">Loading...</div>
        </div>`;
        LeaderboardSystem.getScores(50).then(scores => {
            const list = document.getElementById('lb-list');
            if (!scores || scores.length === 0) { list.innerHTML = '<div style="text-align:center;padding:20px;opacity:0.5;">No records yet</div>'; return; }
            list.innerHTML = scores.map((s, i) => `
                <div style="display:flex;justify-content:space-between;padding:12px;margin-bottom:8px;background:rgba(0,243,255,0.05);border-radius:10px;border:1px solid rgba(0,243,255,0.2);">
                    <span>${i + 1}. ${s.name}</span> <b style="color:#00f3ff;">${Math.floor(s.score)} ELO</b>
                </div>
            `).join('');
        });
    },
    showNamePrompt(callback) {
        if (localStorage.getItem('player_name')) { if (callback) callback(localStorage.getItem('player_name')); return; }
        let p = document.getElementById('lb-prompt') || document.createElement('div');
        p.id = 'lb-prompt';
        p.style = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);z-index:20000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(15px);";
        document.body.appendChild(p); p.style.display = 'flex';
        p.innerHTML = `<div style="width:85%;max-width:320px;background:#050510;border:2px solid #00f3ff;padding:30px;border-radius:15px;text-align:center;">
            <h2 style="color:white;margin-top:0;font-family:'Orbitron', sans-serif;">COMMANDER NAME</h2>
            <input type="text" id="lb-name-input" placeholder="Enter ID" style="width:100%;padding:12px;background:#111;border:1px solid #00f3ff;color:white;border-radius:8px;margin-bottom:20px;text-align:center;font-family:'Rajdhani', sans-serif;">
            <button id="lb-confirm-btn" style="width:100%;padding:12px;background:#00f3ff;color:black;border:none;border-radius:8px;font-weight:bold;cursor:pointer;font-family:'Orbitron', sans-serif;">INITIALIZE</button>
        </div>`;
        document.getElementById('lb-confirm-btn').onclick = () => {
            const n = document.getElementById('lb-name-input').value.trim();
            if (n) { localStorage.setItem('player_name', n); document.getElementById('lb-prompt').style.display = 'none'; if (callback) callback(n); }
        };
    }
};

// Settings
let gameMode = 'pve';
let aiDifficulty = 3;
let playerSide = 'blue';

let boardEl, turnText, blueScoreEl, redScoreEl, setupScreen, boardContainer, gameOverScreen, winnerText;
let bgMusic, toggleMusicBtn, musicIcon, langBtn, tutorialBtn, tutorialScreen, tutContent, tutTitle, diffDescEl;
let musicEnabled = true;

const difficultyNames = {
    ru: ["Обезьяна", "Новичок", "Тактик", "Мастер", "ЛЕГЕНДА", "ГРОССМЕЙСТЕР", "ТЕРМИНАТОР"],
    en: ["Monkey", "Novice", "Tactician", "Master", "LEGEND", "GRANDMASTER", "TERMINATOR"]
};

const loc = {
    ru: {
        turn: "Ход",
        blue: "Синие",
        red: "Красные",
        mode: "Режим игры",
        side: "Ваша сторона",
        diff: "Сложность ИИ",
        pve: "Игрок vs ИИ",
        pvp: "1 vs 1 (ПК)",
        blueSide: "Синие (1-й)",
        redSide: "Красные (2-й)",
        start: "НАЧАТЬ БИТВУ",
        restart: "МЕНЮ",
        winSuffix: " ПОБЕДИЛИ!",
        tutTitle: "Как играть",
        tutorial: `
            <p>1. Кликайте по пустым или своим клеткам (+1 масса).</p>
            <p>2. При массе 4 клетка <b>ВЗРЫВАЕТСЯ</b>.</p>
            <p>3. Взрыв захватывает соседние клетки врага.</p>
            <p>4. Взрывы вызывают цепные реакции.</p>
            <p>5. Захватите всё поле!</p>`
    },
    en: {
        turn: "Turn",
        blue: "Blue",
        red: "Red",
        mode: "Game Mode",
        side: "Your Side",
        diff: "AI Difficulty",
        pve: "Player vs AI",
        pvp: "1 vs 1 (Local)",
        blueSide: "Blue (1st)",
        redSide: "Red (2nd)",
        start: "START BATTLE",
        restart: "MENU",
        winSuffix: " WINS!",
        tutTitle: "How to Play",
        tutorial: `
            <p>1. Click cells to add mass (+1).</p>
            <p>2. At mass 4, the cell <b>EXPLODES</b>.</p>
            <p>3. Explosions capture neighbor enemy cells.</p>
            <p>4. Create chain reactions to dominate.</p>
            <p>5. Capture the entire board!</p>`
    }
};

function initDOMElements() {
    boardEl = document.getElementById('gameBoard');
    turnText = document.querySelector('.player-name');
    blueScoreEl = document.getElementById('blueScore');
    redScoreEl = document.getElementById('redScore');
    setupScreen = document.getElementById('setupScreen');
    boardContainer = document.getElementById('boardContainer');
    gameOverScreen = document.getElementById('gameOverScreen');
    winnerText = document.getElementById('winnerText');
    diffDescEl = document.getElementById('diffDescription');

    bgMusic = document.getElementById('bgMusic');
    toggleMusicBtn = document.getElementById('toggleMusicBtn');
    musicIcon = document.getElementById('musicIcon');
    langBtn = document.getElementById('langBtn');
    tutorialBtn = document.getElementById('tutorialBtn');
    tutorialScreen = document.getElementById('tutorialScreen');
    tutContent = document.getElementById('tutContent');
    tutTitle = document.getElementById('tutTitle');

    // Music handling specifically for mobile compliance
    if (bgMusic) {
        bgMusic.volume = 0.4;
        // Attempt play, if blocked, wait for first interaction
        const playPromise = bgMusic.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                musicEnabled = false;
                updateMusicIcon();
                const startMusic = () => {
                    if (!musicEnabled && bgMusic.paused) {
                        bgMusic.play().then(() => {
                            musicEnabled = true;
                            updateMusicIcon();
                        }).catch(e => console.log(e));
                    }
                };
                document.addEventListener('click', startMusic, { once: true });
                document.addEventListener('touchstart', startMusic, { once: true });
            });
        }
    }

    // Touch optimization for buttons
    const bindTouch = (id, handler) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.onclick = (e) => {
            e.preventDefault();
            handler();
        };
        // Add touchend for faster mobile response
        el.ontouchend = (e) => {
            e.preventDefault();
            handler();
        };
    };

    bindTouch('startGameBtn', startGame);
    bindTouch('restartBtn', resetToMenu);
    bindTouch('closeTutorialBtn', () => tutorialScreen.classList.add('hidden'));
    bindTouch('toggleMusicBtn', toggleMusic);
    bindTouch('langBtn', toggleLang);
    bindTouch('tutorialBtn', showTutorial);

    // Setup mode buttons
    document.getElementById('btnPvE').onclick = () => setGameMode('pve');
    document.getElementById('btnPvP').onclick = () => setGameMode('pvp');
    document.getElementById('btnBlueSide').onclick = () => setPlayerSide('blue');
    document.getElementById('btnRedSide').onclick = () => setPlayerSide('red');

    // Difficulty buttons
    document.querySelectorAll('.diff-btn').forEach(btn => {
        const setDiff = (e) => {
            if (e) e.preventDefault();
            document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            aiDifficulty = parseInt(btn.dataset.level);
            updateDiffDesc();
        };
        btn.onclick = setDiff;
        btn.ontouchend = setDiff;
    });

    updateUIStrings();
    LeaderboardSystem.init();
    setTimeout(() => LeaderboardUI.showNamePrompt(), 2000);

    const lbBtn = document.createElement('button');
    lbBtn.className = 'icon-btn'; lbBtn.innerHTML = '<span>🏆</span>';
    lbBtn.onclick = () => LeaderboardUI.show();
    document.querySelector('.settings-panel').prepend(lbBtn);

    // Prevent board from scrolling on mobile when trying to play
    if (boardEl) {
        boardEl.addEventListener('touchmove', (e) => {
            if (gameActive) e.preventDefault();
        }, { passive: false });
    }
}

function setGameMode(mode) {
    gameMode = mode;
    document.getElementById('btnPvE').className = `opt-btn ${mode === 'pve' ? 'active' : ''}`;
    document.getElementById('btnPvP').className = `opt-btn ${mode === 'pvp' ? 'active' : ''}`;
    const sideDiv = document.getElementById('sideSelection');
    const diffDiv = document.getElementById('diffSelection');
    if (mode === 'pvp') {
        sideDiv.classList.add('hidden');
        diffDiv.classList.add('hidden');
    } else {
        sideDiv.classList.remove('hidden');
        diffDiv.classList.remove('hidden');
    }
}

function setPlayerSide(side) {
    playerSide = side;
    document.getElementById('btnBlueSide').className = `opt-btn ${side === 'blue' ? 'active' : ''}`;
    document.getElementById('btnRedSide').className = `opt-btn ${side === 'red' ? 'active' : ''}`;
}

function updateDiffDesc() {
    diffDescEl.textContent = difficultyNames[currentLang][aiDifficulty - 1];
    if (aiDifficulty === 1) diffDescEl.style.color = '#888';
    else if (aiDifficulty === 2) diffDescEl.style.color = '#00ff00';
    else if (aiDifficulty === 3) diffDescEl.style.color = '#ffff00';
    else if (aiDifficulty === 4) diffDescEl.style.color = '#ffaa00';
    else if (aiDifficulty === 5) {
        diffDescEl.style.color = '#ff0055';
        diffDescEl.style.fontWeight = 'bold';
        diffDescEl.style.textShadow = '0 0 10px #ff0055';
    } else {
        diffDescEl.style.color = 'var(--blue-glow)';
    }
}

function showTutorial() {
    tutTitle.textContent = loc[currentLang].tutTitle;
    tutContent.innerHTML = loc[currentLang].tutorial;
    tutorialScreen.classList.remove('hidden');
}

function toggleLang() {
    currentLang = currentLang === 'ru' ? 'en' : 'ru';
    langBtn.querySelector('span').textContent = currentLang.toUpperCase();
    updateUIStrings();
    updateDiffDesc();
    if (!tutorialScreen.classList.contains('hidden')) showTutorial();
    if (!gameActive) renderBoard();
}

function updateUIStrings() {
    const s = loc[currentLang];
    document.getElementById('txtTurn').textContent = s.turn;
    document.getElementById('txtMode').textContent = s.mode;
    document.getElementById('btnPvE').textContent = s.pve;
    document.getElementById('btnPvP').textContent = s.pvp;
    document.getElementById('txtSide').textContent = s.side;
    document.getElementById('btnBlueSide').textContent = s.blueSide;
    document.getElementById('btnRedSide').textContent = s.redSide;
    document.getElementById('txtChooseDiff').textContent = s.diff;
    document.getElementById('startGameBtn').textContent = s.start;
    document.getElementById('restartBtn').textContent = s.restart;

    // Show Elo in Menu
    const eloDisplay = document.getElementById('eloDisplay');
    if (eloDisplay) eloDisplay.textContent = `ELO: ${playerElo}`;

    updateDiffDesc();
    updateTurnUI();
}

function toggleMusic() {
    if (!bgMusic) return;
    if (musicEnabled) {
        bgMusic.pause();
    } else {
        bgMusic.play();
    }
    musicEnabled = !musicEnabled;
    updateMusicIcon();
}

function updateMusicIcon() {
    musicIcon.textContent = musicEnabled ? '🔊' : '🔇';
}

function startGame() {
    initBoardData();
    setupScreen.classList.add('hidden');
    boardContainer.classList.remove('hidden');
    gameOverScreen.classList.add('hidden');
    renderBoard();

    if (gameMode === 'pve' && playerSide === 'red') {
        isAIProcessing = true;
        setTimeout(aiMove, 800);
    }
}

function resetToMenu() {
    gameActive = false;
    gameOverScreen.classList.add('hidden');
    boardContainer.classList.add('hidden');
    setupScreen.classList.remove('hidden');
}

function initBoardData() {
    board = Array(GRID_SIZE).fill().map(() =>
        Array(GRID_SIZE).fill().map(() => ({ mass: 0, owner: null }))
    );
    currentPlayer = 'blue';
    gameActive = true;
    movesMade = 0;
    isAIProcessing = false;
    isExploding = false;
    blueScoreEl.textContent = '0';
    redScoreEl.textContent = '0';
    updateTurnUI();
}

function renderBoard() {
    if (!boardEl) return;
    boardEl.innerHTML = '';
    let blueCount = 0;
    let redCount = 0;
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            const cellData = board[r][c];
            const cell = document.createElement('div');
            cell.className = `cell ${cellData.owner ? 'owner-' + cellData.owner : ''}`;
            if (cellData.mass > CRITICAL_MASS) cell.classList.add('exploding');
            cell.textContent = cellData.mass > 0 ? cellData.mass : '';

            // Optimized touch handling
            const handleTouch = (e) => {
                // Prevent phantom clicks
                if (e.type === 'touchend') e.preventDefault();
                handleCellClick(r, c);
            };

            cell.onclick = handleTouch;
            cell.ontouchend = handleTouch;

            if (cellData.owner === 'blue') blueCount++;
            if (cellData.owner === 'red') redCount++;
            boardEl.appendChild(cell);
        }
    }
    blueScoreEl.textContent = blueCount;
    redScoreEl.textContent = redCount;
    if (gameActive && movesMade >= 2) {
        if (blueCount === 0) endGame(loc[currentLang].red.toUpperCase() + loc[currentLang].winSuffix);
        else if (redCount === 0) endGame(loc[currentLang].blue.toUpperCase() + loc[currentLang].winSuffix);
    }
}

async function handleCellClick(r, c) {
    if (!gameActive || isAIProcessing || isExploding) return;

    if (gameMode === 'pve') {
        if (currentPlayer !== playerSide) return;
    }

    const cell = board[r][c];
    if (cell.owner && cell.owner !== currentPlayer) return;

    movesMade++;
    await executeMove(r, c, currentPlayer);

    if (gameActive) {
        currentPlayer = currentPlayer === 'blue' ? 'red' : 'blue';
        updateTurnUI();

        if (gameMode === 'pve' && currentPlayer !== playerSide) {
            setTimeout(aiMove, 600);
        }
    }
}

async function executeMove(r, c, player) {
    board[r][c].mass++;
    board[r][c].owner = player;
    if (board[r][c].mass > CRITICAL_MASS) {
        isExploding = true;
        await explode(r, c, player);
        isExploding = false;
    }
    renderBoard();
}

async function explode(r, c, player) {
    const cell = board[r][c];
    cell.mass = 0;
    cell.owner = null;
    const neighbors = getNeighbors(r, c);
    neighbors.forEach(([nr, nc]) => {
        if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE) {
            board[nr][nc].mass++;
            board[nr][nc].owner = player;
        }
    });
    renderBoard();
    await new Promise(resolve => setTimeout(resolve, DELAY));
    for (const [nr, nc] of neighbors) {
        if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE) {
            if (board[nr][nc].mass > CRITICAL_MASS) {
                await explode(nr, nc, player);
            }
        }
    }
}

function updateTurnUI() {
    if (!turnText) return;
    const s = loc[currentLang];
    turnText.textContent = currentPlayer === 'blue' ? s.blue : s.red;
    turnText.className = `player-name ${currentPlayer}`;
}

function endGame(msg) {
    gameActive = false;
    winnerText.textContent = msg;
    const isBlueWon = msg.includes(loc[currentLang].blue.toUpperCase());
    winnerText.style.color = isBlueWon ? 'var(--blue-glow)' : 'var(--red-glow)';

    // Update ELO
    if (gameMode === 'pve') {
        const winner = isBlueWon ? 'blue' : 'red';
        const gain = updateElo(winner);
        const eloSub = document.createElement('div');
        eloSub.style.fontSize = '0.7em';
        eloSub.style.marginTop = '10px';
        eloSub.style.opacity = '0.8';
        eloSub.textContent = `ELO: ${playerElo} (${gain >= 0 ? '+' : ''}${gain})`;
        winnerText.appendChild(eloSub);
    }

    gameOverScreen.classList.remove('hidden');
}

// ================= PERSONALITY AI SYSTEM =================

async function aiMove() {
    if (!gameActive) return;
    isAIProcessing = true;

    const aiColor = currentPlayer;
    const humanColor = currentPlayer === 'blue' ? 'red' : 'blue';
    const validMoves = getValidMoves(board, aiColor);

    if (validMoves.length === 0) {
        isAIProcessing = false;
        return;
    }

    let move;

    switch (aiDifficulty) {
        case 1:
            // ОБЕЗЬЯНА
            move = validMoves[Math.floor(Math.random() * validMoves.length)];
            break;

        case 2:
            // НОВИЧОК
            validMoves.sort((a, b) => {
                const cellA = board[a.r][a.c];
                const cellB = board[b.r][b.c];
                return cellB.mass - cellA.mass || Math.random() - 0.5;
            });
            move = validMoves[0];
            break;

        case 3:
            // ТАКТИК
            move = getTacticianMove(validMoves, aiColor);
            break;

        case 4:
            // МАСТЕР
            move = getMasterMove(validMoves, aiColor, humanColor);
            break;

        case 5:
            // ЛЕГЕНДА
            move = getLegendMove(validMoves, aiColor, humanColor);
            break;
        case 6:
            // ГРОССМЕЙСТЕР
            move = getGrandmasterMove(validMoves, aiColor, humanColor);
            break;
        case 7:
            // ТЕРМИНАТОР
            move = getTerminatorMove(validMoves, aiColor, humanColor);
            break;
    }

    movesMade++;
    await executeMove(move.r, move.c, aiColor);

    currentPlayer = humanColor;
    updateTurnUI();
    isAIProcessing = false;
}

// ========== AI LOGIC IMPLEMENTATIONS (UNCHANGED) ==========

function getTacticianMove(moves, player) {
    let bestMove = moves[0];
    let maxDamage = -1;
    for (const m of moves) {
        const tempBoard = cloneBoard(board);
        const result = simulateExplosion(tempBoard, m.r, m.c, player);
        let score = result.captured * 10;
        if (board[m.r][m.c].mass === CRITICAL_MASS) score += 5;
        score += Math.random() * 2;
        if (score > maxDamage) {
            maxDamage = score;
            bestMove = m;
        }
    }
    return bestMove;
}

function getMasterMove(moves, player, opponent) {
    let bestScore = -Infinity;
    let bestMove = moves[0];
    const searchMoves = moves.sort(() => 0.5 - Math.random()).slice(0, 15);
    for (const m of searchMoves) {
        const boardCopy = cloneBoard(board);
        simulateExplosion(boardCopy, m.r, m.c, player);
        const oppMoves = getValidMoves(boardCopy, opponent);
        let minOpponentScore = Infinity;
        if (oppMoves.length === 0) {
            minOpponentScore = -10000;
        } else {
            for (const om of oppMoves.slice(0, 5)) {
                const boardAfterOpp = cloneBoard(boardCopy);
                simulateExplosion(boardAfterOpp, om.r, om.c, opponent);
                const score = evaluateBoardSimple(boardAfterOpp, player, opponent);
                if (score < minOpponentScore) minOpponentScore = score;
            }
        }
        if (minOpponentScore > bestScore) {
            bestScore = minOpponentScore;
            bestMove = m;
        }
    }
    return bestMove;
}

function evaluateBoardSimple(b, player, opponent) {
    let score = 0;
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            if (b[r][c].owner === player) score += 10;
            if (b[r][c].owner === opponent) score -= 10;
        }
    }
    return score;
}

function getLegendMove(moves, player, opponent) {
    let bestScore = -Infinity;
    let bestMove = moves[0];
    moves.sort((a, b) => board[b.r][b.c].mass - board[a.r][a.c].mass);
    const searchMoves = moves.slice(0, 20);
    for (const m of searchMoves) {
        const boardCopy = cloneBoard(board);
        simulateExplosion(boardCopy, m.r, m.c, player);
        const depth = countAllCells(board) < 10 ? 4 : 3;
        const score = minimax(boardCopy, depth - 1, false, player, opponent, -Infinity, Infinity, evaluateLegend);
        if (score > bestScore) {
            bestScore = score;
            bestMove = m;
        }
    }
    return bestMove;
}

function getGrandmasterMove(moves, player, opponent) {
    let bestScore = -Infinity;
    let bestMove = moves[0];
    moves.sort((a, b) => board[b.r][b.c].mass - board[a.r][a.c].mass);
    // Expand search space to top 30 moves
    const searchMoves = moves.slice(0, 30);
    for (const m of searchMoves) {
        const boardCopy = cloneBoard(board);
        simulateExplosion(boardCopy, m.r, m.c, player);
        // Deeper search depth 5/4
        const depth = countAllCells(board) < 12 ? 5 : 4;
        const score = minimax(boardCopy, depth - 1, false, player, opponent, -Infinity, Infinity, evaluateLegend);
        if (score > bestScore) {
            bestScore = score;
            bestMove = m;
        }
    }
    return bestMove;
}

function getTerminatorMove(moves, player, opponent) {
    let bestScore = -Infinity;
    let bestMove = moves[0];
    moves.sort((a, b) => board[b.r][b.c].mass - board[a.r][a.c].mass);
    // Search almost all reasonable moves
    const searchMoves = moves.slice(0, 40);
    for (const m of searchMoves) {
        const boardCopy = cloneBoard(board);
        simulateExplosion(boardCopy, m.r, m.c, player);
        // Deepest search depth 6/5
        const depth = countAllCells(board) < 15 ? 6 : 5;
        // Use terminator evaluation function
        const score = minimax(boardCopy, depth - 1, false, player, opponent, -Infinity, Infinity, evaluateTerminator);
        if (score > bestScore) {
            bestScore = score;
            bestMove = m;
        }
    }
    return bestMove;
}

function minimax(nodeBoard, depth, isMaximizing, player, opponent, alpha, beta, evalFunc = evaluateLegend) {
    if (isWin(nodeBoard, player)) return 10000 + depth * 100;
    if (isWin(nodeBoard, opponent)) return -10000 - depth * 100;
    if (depth === 0) return evalFunc(nodeBoard, player, opponent);

    const currentPlayerForNode = isMaximizing ? player : opponent;
    const moves = getValidMoves(nodeBoard, currentPlayerForNode);
    moves.sort((a, b) => nodeBoard[b.r][b.c].mass - nodeBoard[a.r][a.c].mass);
    const limit = 8;
    const movesToCheck = moves.slice(0, limit);

    if (isMaximizing) {
        let maxScore = -Infinity;
        for (const m of movesToCheck) {
            const childBoard = cloneBoard(nodeBoard);
            simulateExplosion(childBoard, m.r, m.c, player);
            const score = minimax(childBoard, depth - 1, false, player, opponent, alpha, beta, evalFunc);
            maxScore = Math.max(maxScore, score);
            alpha = Math.max(alpha, score);
            if (beta <= alpha) break;
        }
        return maxScore;
    } else {
        let minScore = Infinity;
        for (const m of movesToCheck) {
            const childBoard = cloneBoard(nodeBoard);
            simulateExplosion(childBoard, m.r, m.c, opponent);
            const score = minimax(childBoard, depth - 1, true, player, opponent, alpha, beta, evalFunc);
            minScore = Math.min(minScore, score);
            beta = Math.min(beta, score);
            if (beta <= alpha) break;
        }
        return minScore;
    }
}

function evaluateLegend(b, player, opponent) {
    let score = 0;
    let myCells = 0;
    let oppCells = 0;
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            const cell = b[r][c];
            if (cell.owner === player) {
                myCells++;
                score += cell.mass * 10;
                const neighbors = getNeighbors(r, c);
                for (const [nr, nc] of neighbors) {
                    const n = b[nr][nc];
                    if (n.owner === opponent && n.mass === CRITICAL_MASS) {
                        score -= 500;
                    }
                }
            } else if (cell.owner === opponent) {
                oppCells++;
            }
        }
    }
    score += myCells * 100;
    score -= oppCells * 100;
    return score;
}

function evaluateTerminator(b, player, opponent) {
    let score = 0;
    let myCells = 0;
    let oppCells = 0;
    const size = GRID_SIZE;

    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            const cell = b[r][c];
            if (cell.owner === player) {
                myCells++;
                // Position Weights
                let posWeight = 10;
                if ((r === 0 || r === size - 1) && (c === 0 || c === size - 1)) posWeight = 100; // Corners
                else if (r === 0 || r === size - 1 || c === 0 || c === size - 1) posWeight = 40; // Edges

                score += posWeight + cell.mass * 5;

                // Vulnerability check
                const neighbors = getNeighbors(r, c);
                for (const [nr, nc] of neighbors) {
                    const n = b[nr][nc];
                    if (n.owner === opponent) {
                        if (n.mass === CRITICAL_MASS) {
                            score -= 150; // High threat
                        }
                    }
                }
            } else if (cell.owner === opponent) {
                oppCells++;
                let oppPosWeight = 10;
                if ((r === 0 || r === size - 1) && (c === 0 || c === size - 1)) oppPosWeight = 100;
                score -= (oppPosWeight + cell.mass * 5);
            }
        }
    }

    // Win/Loss bias
    if (oppCells === 0 && myCells > 0) return 20000;
    if (myCells === 0 && oppCells > 0) return -20000;

    score += myCells * 50;
    score -= oppCells * 50;
    return score;
}

function calculateEloGain(playerElo, botRank, won) {
    const k = 32;
    const botEloValue = Object.values(botElo)[botRank - 1] || 1200;
    const expected = 1 / (1 + Math.pow(10, (botEloValue - playerElo) / 400));
    const actual = won ? 1 : 0;
    return Math.round(k * (actual - expected));
}

function updateElo(winner) {
    if (gameMode !== 'pve') return;
    const won = (winner === playerSide);
    const gain = calculateEloGain(playerElo, aiDifficulty, won);
    playerElo += gain;
    localStorage.setItem('cell_elo', playerElo);
    LeaderboardSystem.saveScore(null, playerElo, won ? "Victory" : "Defeat");
    return gain;
}

// ========== UTILS ==========

function getValidMoves(currentBoard, player) {
    const moves = [];
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            if (currentBoard[r][c].owner === null || currentBoard[r][c].owner === player) {
                moves.push({ r, c });
            }
        }
    }
    return moves;
}

function cloneBoard(b) {
    const newBoard = new Array(GRID_SIZE);
    for (let i = 0; i < GRID_SIZE; i++) {
        newBoard[i] = new Array(GRID_SIZE);
        for (let j = 0; j < GRID_SIZE; j++) {
            newBoard[i][j] = { mass: b[i][j].mass, owner: b[i][j].owner };
        }
    }
    return newBoard;
}

function countAllCells(b) {
    let count = 0;
    for (let r = 0; r < GRID_SIZE; r++)
        for (let c = 0; c < GRID_SIZE; c++)
            if (b[r][c].owner) count++;
    return count;
}

function isWin(b, player) {
    let oppCount = 0;
    let myCount = 0;
    const opponent = player === 'blue' ? 'red' : 'blue';
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            if (b[r][c].owner === opponent) oppCount++;
            if (b[r][c].owner === player) myCount++;
        }
    }
    return oppCount === 0 && myCount > 0;
}

function simulateExplosion(tempBoard, r, c, player) {
    let captured = 0;
    const queue = [[r, c]];
    const opponent = player === 'blue' ? 'red' : 'blue';
    let safetyCounter = 0;
    while (queue.length > 0 && safetyCounter < 600) {
        safetyCounter++;
        const [currR, currC] = queue.shift();
        const cell = tempBoard[currR][currC];
        cell.mass++;
        if (cell.owner === opponent) captured++;
        cell.owner = player;
        if (cell.mass > CRITICAL_MASS) {
            cell.mass = 0;
            cell.owner = null;
            const neighbors = getNeighbors(currR, currC);
            neighbors.forEach(([nr, nc]) => {
                queue.push([nr, nc]);
            });
        }
    }
    return { captured };
}

function getNeighbors(r, c) {
    const n = [];
    if (r > 0) n.push([r - 1, c]);
    if (r < GRID_SIZE - 1) n.push([r + 1, c]);
    if (c > 0) n.push([r, c - 1]);
    if (c < GRID_SIZE - 1) n.push([r, c + 1]);
    return n;
}

window.addEventListener('DOMContentLoaded', initDOMElements);