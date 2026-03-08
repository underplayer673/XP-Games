// === OFFLINE MODE STUB FOR IE6 COMPATIBILITY ===
// Firebase removed - local-only storage mode

// Mark Firebase as disabled and local mode as active
window.firebaseReady = false;
window.useLocalMode = true;

// Show Local Mode status immediately
function showLocalModeStatus() {
    var statusEl = document.getElementById('connection-status');
    if (statusEl) {
        statusEl.innerHTML = "Local Mode";
        statusEl.style.display = "inline";
        statusEl.style.color = "#86efac";
    }
}

// Call status on load
if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", showLocalModeStatus);
} else if (document.attachEvent) {
    document.attachEvent("onreadystatechange", function() {
        if (document.readyState === "complete") {
            showLocalModeStatus();
        }
    });
}

// === USER ACCOUNT FUNCTIONS (LOCAL ONLY) ===

// Login/Register - uses local fallback
window.loginOrRegister = function(name, pass) {
    fallbackLogin(name, pass);
};

// Sync user data - no-op (local only)
window.syncUserData = function() {
    saveLocalFallback();
};

// Save score online - no-op (local only)
window.saveScoreOnline = function(scoreData) {
    console.log("Local mode: Score saved locally only");
};

// Load leaderboard - shows local scores only
window.loadLeaderboardOnline = function(loadMoreArg) {
    var tableBody = document.getElementById('leaderboard-table').getElementsByTagName('tbody')[0];
    if (!tableBody) return;
    
    var filter = document.getElementById('filter-select') ? document.getElementById('filter-select').value : 'all';
    
    // Load from local storage
    var localScores = [];
    try {
        var saved = storage.getItem('schoolRpgScores');
        if (saved) {
            localScores = JSON.parse(saved);
        }
    } catch (e) {
        console.log("No local scores found");
    }
    
    // Show message about local mode
    tableBody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:20px;">Local Mode - Offline Only</td></tr>';
    
    if (localScores.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No local records yet.</td></tr>';
        return;
    }
    
    // Filter scores
    var filtered = [];
    for (var i = 0; i < localScores.length; i++) {
        var score = localScores[i];
        if (score.isWin === undefined) score.isWin = (score.hp > 0);
        
        if (filter === 'wins') {
            if (score.isWin === true) filtered.push(score);
        } else if (filter === 'losses') {
            if (score.isWin !== true) filtered.push(score);
        } else {
            filtered.push(score);
        }
    }
    
    // Sort by timestamp descending
    filtered.sort(function(a, b) {
        return (b.timestamp || 0) - (a.timestamp || 0);
    });
    
    // Display
    tableBody.innerHTML = '';
    for (var j = 0; j < filtered.length; j++) {
        var s = filtered[j];
        var row = tableBody.insertRow();
        var statusIcon = (s.isWin === true && s.hp > 0) ? "W" : "L";
        var pts = window.calculateSmartScore ? window.calculateSmartScore(s) : (s.hp + s.mp);
        
        var html = '<td>' + (j + 1) + '</td>';
        html = html + '<td>' + (s.name || 'Player') + '</td>';
        html = html + '<td>' + statusIcon + ' ' + (s.enemyName || 'Unknown') + '</td>';
        html = html + '<td>' + s.hp + '/' + s.mp + '</td>';
        html = html + '<td>' + pts + '</td>';
        
        row.innerHTML = html;
    }
};

// Daily rewards menu - IE6 compatible
window.openDailyMenu = function() {
    var modal = document.getElementById('daily-modal');
    if (!modal) return;
    
    modal.className = modal.className + ' show';
    
    var grid = document.getElementById('daily-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    var rewards = [100, 200, 300, 400, 500, 600, 1000];
    var today = Math.floor(new Date().getTime() / (24 * 60 * 60 * 1000));
    var lastClaim = userProfile.lastClaimDate ? Math.floor(userProfile.lastClaimDate / (24 * 60 * 60 * 1000)) : 0;
    
    if (lastClaim > 0 && today > lastClaim) {
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
            dayEl.innerHTML = '<div>Day ' + (i + 1) + '</div><div>OK</div>';
        } else if (i === streak) {
            if (canClaim) {
                dayEl.className = dayEl.className + ' active';
                dayEl.innerHTML = '<div>Day ' + (i + 1) + '</div><div style="font-weight:bold; color:#fbbf24">+' + val + ' RP</div>';
            } else {
                dayEl.innerHTML = '<div>Day ' + (i + 1) + '</div><div style="opacity:0.5">+' + val + ' RP</div>';
            }
        } else {
            dayEl.innerHTML = '<div>Day ' + (i + 1) + '</div><div style="opacity:0.5">+' + val + ' RP</div>';
        }
        
        grid.appendChild(dayEl);
    }
    
    var btn = document.getElementById('daily-claim-btn');
    if (btn) {
        btn.disabled = !canClaim;
        btn.textContent = canClaim ? 'CLAIM' : 'ALREADY CLAIMED (Wait for tomorrow)';
    }
};

// Claim daily reward - IE6 compatible
window.claimDailyReward = function() {
    var rewards = [100, 200, 300, 400, 500, 600, 1000];
    var streak = userProfile.dailyStreak || 0;
    
    var reward = rewards[streak % 7];
    userProfile.rp = (userProfile.rp || 0) + reward;
    userProfile.dailyStreak = (streak + 1) % 7;
    userProfile.lastClaimDate = new Date().getTime();
    
    saveLocalFallback();
    
    if (window.Sound && window.Sound.win) {
        window.Sound.win();
    }
    
    if (window.openDailyMenu) {
        window.openDailyMenu();
    }
    
    if (window.updateMenuStats) {
        window.updateMenuStats();
    }
};

// Setup menu on load
window.onload = function() {
    if (window.setupMenu) {
        window.setupMenu();
    }
};

// Alias for HTML onchange handler
window.reloadLeaderboard = window.loadLeaderboardOnline;
