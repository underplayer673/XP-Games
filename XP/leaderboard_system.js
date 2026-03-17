/**
 * UNIVERSAL LEADERBOARD SYSTEM (Local + Firebase)
 */
const firebaseConfig = {
    apiKey: "AIzaSyAyatGz9z_EYXBAFrH2wrnX8snbDn1ESJk",
    authDomain: "schoolrpg-leaderboard.firebaseapp.com",
    projectId: "schoolrpg-leaderboard",
    storageBucket: "schoolrpg-leaderboard.firebasestorage.app",
    messagingSenderId: "942057524924",
    appId: "1:942057524924:web:4720f94710edd210ec8ab9",
    measurementId: "G-MR13BVCGZW"
};

const LeaderboardSystem = {
    isOnline: false,
    db: null,
    scoresCol: null,
    gameId: null,

    async init(gameId) {
        this.gameId = gameId;
        this.isOnline = window.navigator.onLine;
        
        if (this.isOnline) {
            try {
                // Check if already initialized in this session
                if (!window.firebase_app_instance) {
                    const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js");
                    window.firebase_app_instance = initializeApp(firebaseConfig);
                    
                    const { getFirestore } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");
                    window.firebase_db_instance = getFirestore(window.firebase_app_instance);
                }
                
                this.db = window.firebase_db_instance;
                const { collection } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");
                this.scoresCol = collection(this.db, 'leaderboards', this.gameId, 'scores');
            } catch (e) {
                console.warn("Firebase Init Error (Using Local):", e);
                this.isOnline = false;
            }
        }
    },

    async saveScore(name, score, desc = "") {
        const entry = {
            name: name || "Player",
            score: score,
            desc: desc,
            timestamp: Date.now(),
            date: new Date().toISOString(),
            userAgent: navigator.userAgent
        };

        if (this.isOnline && this.db) {
            try {
                const { addDoc } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");
                await addDoc(this.scoresCol, entry);
                console.log("Global Score Saved!");
            } catch (e) {
                console.warn("Global Save Failed, using Local:", e);
                this.saveLocal(entry);
            }
        } else {
            this.saveLocal(entry);
            console.log("Local Score Saved!");
        }
    },

    saveLocal(entry) {
        let scores = this.getLocalRaw();
        scores.push(entry);
        // Sort descending (highest score first)
        scores.sort((a, b) => b.score - a.score);
        scores = scores.slice(0, 50);
        localStorage.setItem(`lb_${this.gameId}`, JSON.stringify(scores));
    },

    getLocalRaw() {
        try {
            return JSON.parse(localStorage.getItem(`lb_${this.gameId}`) || "[]");
        } catch (e) { return []; }
    },

    async getScores(limitCount = 10) {
        if (this.isOnline && this.db) {
            try {
                const { getDocs, query, orderBy, limit } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");
                const q = query(this.scoresCol, orderBy("score", "desc"), limit(limitCount));
                const snap = await getDocs(q);
                return snap.docs.map(doc => doc.data());
            } catch (e) {
                console.warn("Global Load Failed, using Local:", e);
                return this.getLocal(limitCount);
            }
        } else {
            return this.getLocal(limitCount);
        }
    },

    getLocal(limitCount) {
        let scores = this.getLocalRaw();
        return scores.slice(0, limitCount);
    },

    /** UI COMPONENTS */
    showPrompt(score, callback) {
        const name = prompt("NEW RECORD! Enter your name:", localStorage.getItem('player_name') || "");
        if (name) {
            localStorage.setItem('player_name', name);
            callback(name);
        }
    }
};
