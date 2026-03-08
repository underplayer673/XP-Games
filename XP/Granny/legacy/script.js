// === GRANNY XP ENGINE ===

var screenW, screenH;
var stripWidth = 20; // Меньше полос = легче старому Pentium
var fov = 0.66;
var viewport;
var strips = [];
var gameTimer = null;
var gameState = 'start'; // start | running | dead | win
var deadSequenceStarted = false;
var frameDelay = 45;
var lastMouseTurn = 0;

// IE6-safe global error handler: suppress script error dialogs.
window.onerror = function() { return true; };

// РРіСЂРѕРє
var p = { 
    x: 2.5, y: 2.5, // РРіСЂРѕРє РЅР° 2.5
    dir: 0, // РЎРјРѕС‚СЂРёС‚ РЅР°РїСЂР°РІРѕ (Р’РѕСЃС‚РѕРє)
    rotSpeed: 0.05, 
    moveSpeed: 0.08, 
    trapped: false, trapTimer: 0 
};

// РљР»Р°РІРёС€Рё
var keys = { w:0, s:0, a:0, d:0, e:0, space:0 };

// РљР°СЂС‚Р°: 1=РЎС‚РµРЅР°, 0=РџСѓСЃС‚Рѕ, 9=РљР°РїРєР°РЅ, 5=Р”РІРµСЂСЊ, 4=Р’С‹С…РѕРґ
var map = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,1,1,1,1,0,0,0,0,0,1,0,0,1],
    [1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,1],
    [1,0,0,5,0,0,5,0,0,0,0,0,5,0,0,1], // Р”РІРµСЂРё
    [1,1,0,1,1,1,1,0,0,0,0,0,1,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1],
    [1,0,0,1,1,1,1,0,0,0,0,0,1,0,0,1],
    [1,0,0,1,0,0,1,0,0,9,9,0,1,0,0,1], // РљР°РїРєР°РЅС‹
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,1,0,0,0,0,4,0,1], // Р’С‹С…РѕРґ
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

// РЎРїРёСЃРѕРє РѕР±СЉРµРєС‚РѕРІ
var sprites = [];

function Sprite(type, x, y) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.dist = 0;
    
    // РЎРѕР·РґР°РµРј СЌР»РµРјРµРЅС‚
    this.el = document.createElement('div');
    this.el.className = 'sprite';
    
    var inner = document.createElement('div');
    if (type === 'granny') {
        inner.className = 'granny-box';
        inner.innerHTML = "<br/>GRANNY"; // РўРµРєСЃС‚, С‡С‚РѕР±С‹ С‚РѕС‡РЅРѕ СѓРІРёРґРµС‚СЊ
    } else {
        inner.className = 'trap-box';
        inner.innerHTML = "TRAP";
    }
    this.el.appendChild(inner);
    viewport.appendChild(this.el);
}

// === INIT ===

window.onload = function() {
    viewport = document.getElementById('viewport');
    resize();
    window.onresize = resize;

    // === РЎРџРђР’РќРРњ Р“Р Р•РќРќР РџР РЇРњРћ РџР•Р Р•Р” РР“Р РћРљРћРњ ===
    // РРіСЂРѕРє (2.5), Р“СЂРµРЅРЅРё (4.5). Р Р°СЃСЃС‚РѕСЏРЅРёРµ 2 РєР»РµС‚РєРё.
    // РћРЅР° РґРѕР»Р¶РЅР° Р±С‹С‚СЊ РІРёРґРЅР° РєР°Рє РљР РђРЎРќР«Р™ РџР РЇРњРћРЈР“РћР›Р¬РќРРљ.
    sprites.push(new Sprite('granny', 10.5, 7.5));

    // РЎРїР°РІРЅРёРј РєР°РїРєР°РЅС‹
    for(var y=0; y<15; y++) {
        for(var x=0; x<16; x++) {
            if(map[y][x] === 9) {
                sprites.push(new Sprite('trap', x+0.5, y+0.5));
                map[y][x] = 0;
            }
        }
    }

    // РЈРїСЂР°РІР»РµРЅРёРµ
    document.onkeydown = function(e) {
        var c = (e||window.event).keyCode;
        if(c==87) keys.w=1; if(c==83) keys.s=1;
        if(c==65) keys.a=1; if(c==68) keys.d=1;
        if(c==69) keys.e=1; if(c==32) keys.space=1;
    };
    document.onkeyup = function(e) {
        var c = (e||window.event).keyCode;
        if(c==87) keys.w=0; if(c==83) keys.s=0;
        if(c==65) keys.a=0; if(c==68) keys.d=0;
        if(c==69) keys.e=0; if(c==32) keys.space=0;
    };
    
    // РњС‹С€СЊ
    document.onmousemove = function(e) {
        if(p.trapped) return;
        e = e || window.event;
        var now = new Date().getTime();
        if(now - lastMouseTurn < 50) return;
        lastMouseTurn = now;
        var center = screenW / 2;
        if(e.clientX < center - 50) p.dir -= 0.04;
        if(e.clientX > center + 50) p.dir += 0.04;
    };
};

function resize() {
    if(document.body.clientWidth) {
        screenW = document.body.clientWidth;
        screenH = document.body.clientHeight;
    } else {
        screenW = 800; screenH = 600;
    }

    // РЈРґР°Р»СЏРµРј СЃС‚Р°СЂС‹Рµ РїРѕР»РѕСЃРєРё
    for(var i=0; i<strips.length; i++) {
        if(strips[i].parentNode) strips[i].parentNode.removeChild(strips[i]);
    }
    strips = [];

    // РЎРѕР·РґР°РµРј СЃС‚РµРЅС‹ (DOM Raycasting)
    var numStrips = Math.ceil(screenW / stripWidth);
    for(var i=0; i<numStrips; i++) {
        var d = document.createElement('div');
        d.className = 'strip';
        d.style.left = (i * stripWidth) + 'px';
        d.style.width = (stripWidth+1) + 'px';
        d.style.backgroundColor = '#666';
        viewport.appendChild(d);
        strips.push(d);
    }
}

function startGame() {
    if (gameState === 'running') return;
    gameState = 'running';
    deadSequenceStarted = false;
    document.getElementById('screen-start').style.display = 'none';
    gameTimer = setInterval(gameLoop, frameDelay);
}

function stopGame() {
    if (gameTimer !== null) {
        clearInterval(gameTimer);
        gameTimer = null;
    }
}

function deadGame() {
    if (gameState !== 'running' || deadSequenceStarted) return;
    gameState = 'dead';
    deadSequenceStarted = true;
    stopGame();
    document.getElementById('jumpscare').style.display = 'block';
    setTimeout(function() {
        document.getElementById('screen-dead').style.display = 'block';
    }, 1000);
}

function winGame() {
    if (gameState !== 'running') return;
    gameState = 'win';
    stopGame();
    document.getElementById('screen-win').style.display = 'block';
}

// === GAME LOOP ===

function gameLoop() {
    if (gameState !== 'running') return;

    // 1. Р›РѕРіРёРєР° РєР°РїРєР°РЅР°
    if (p.trapped) {
        document.getElementById('trap-warn').style.display = 'block';
        if(keys.space) {
            p.trapTimer++;
            if(p.trapTimer > 30) {
                p.trapped = false; p.trapTimer = 0;
                document.getElementById('trap-warn').style.display = 'none';
            }
        }
        return; 
    }

    // Р”РІРёР¶РµРЅРёРµ
    if (keys.a) p.dir -= p.rotSpeed;
    if (keys.d) p.dir += p.rotSpeed;

    var moveX = 0, moveY = 0;
    if (keys.w) { moveX = Math.cos(p.dir)*p.moveSpeed; moveY = Math.sin(p.dir)*p.moveSpeed; }
    if (keys.s) { moveX = -Math.cos(p.dir)*p.moveSpeed; moveY = -Math.sin(p.dir)*p.moveSpeed; }

    // РљРѕР»Р»РёР·РёРё РРіСЂРѕРєР°
    if(map[Math.floor(p.y)][Math.floor(p.x + moveX*3)] <= 0) p.x += moveX;
    if(map[Math.floor(p.y + moveY*3)][Math.floor(p.x)] <= 0) p.y += moveY;

    // === Р›РћР“РРљРђ Р“Р Р•РќРќР ===
    for(var i=0; i<sprites.length; i++) {
        var s = sprites[i];
        
        // РљР°РїРєР°РЅ
        if(s.type === 'trap') {
            var d = Math.sqrt((p.x - s.x)*(p.x - s.x) + (p.y - s.y)*(p.y - s.y));
            if(d < 0.5) {
                p.trapped = true;
                s.x = -100; // РЈР±СЂР°С‚СЊ РєР°РїРєР°РЅ
                s.el.style.display = 'none';
            }
        }

        // Р“СЂРµРЅРЅРё
        if(s.type === 'granny') {
            var distG = Math.sqrt((p.x - s.x)*(p.x - s.x) + (p.y - s.y)*(p.y - s.y));
            
            // РЎРєСЂРёРјРµСЂ
            if(distG < 0.7) {
                deadGame();
                return;
            }

            // РџРѕРіРѕРЅСЏ (РР)
            var speedG = 0.04; 
            if(distG < 15) { // Р’РёРґРёС‚ РґР°Р»РµРєРѕ
                var dx = p.x - s.x;
                var dy = p.y - s.y;
                var len = Math.sqrt(dx*dx + dy*dy);
                dx = (dx/len) * speedG;
                dy = (dy/len) * speedG;

                // РџСЂРѕРІРµСЂРєР° СЃС‚РµРЅ РґР»СЏ РІСЂР°РіР°
                if(map[Math.floor(s.y)][Math.floor(s.x + dx*2)] <= 0) s.x += dx;
                if(map[Math.floor(s.y + dy*2)][Math.floor(s.x)] <= 0) s.y += dy;
            }
        }
    }

    // Р”РІРµСЂРё
    var tx = Math.floor(p.x + Math.cos(p.dir));
    var ty = Math.floor(p.y + Math.sin(p.dir));
    var blk = map[ty][tx];
    var msg = document.getElementById('msg');
    
    msg.style.display = 'none';
    if(blk===5) {
        msg.innerHTML = "OPEN DOOR [E]";
        msg.style.display = 'block';
        if(keys.e) { map[ty][tx] = 0; keys.e=0; }
    }
    if(blk===4) {
        msg.innerHTML = "EXIT [E]";
        msg.style.display = 'block';
        if(keys.e) { winGame(); }
    }

    render();
}

// === 5. RENDER ===

function render() {
    var numStrips = strips.length;

    // --- РЎРўР•РќР« ---
    for(var i=0; i<numStrips; i++) {
        var cameraX = 2 * i / numStrips - 1;
        var rayDirX = Math.cos(p.dir) + Math.cos(p.dir + 1.57) * 0.66 * cameraX;
        var rayDirY = Math.sin(p.dir) + Math.sin(p.dir + 1.57) * 0.66 * cameraX;

        var mapX = Math.floor(p.x);
        var mapY = Math.floor(p.y);
        var sideDistX, sideDistY;
        var deltaDistX = Math.abs(1/rayDirX);
        var deltaDistY = Math.abs(1/rayDirY);
        var stepX, stepY;
        var hit = 0, side = 0;
        var wallType = 0;

        if (rayDirX < 0) { stepX = -1; sideDistX = (p.x - mapX) * deltaDistX; }
        else { stepX = 1; sideDistX = (mapX + 1.0 - p.x) * deltaDistX; }
        if (rayDirY < 0) { stepY = -1; sideDistY = (p.y - mapY) * deltaDistY; }
        else { stepY = 1; sideDistY = (mapY + 1.0 - p.y) * deltaDistY; }

        while (hit == 0) {
            if (sideDistX < sideDistY) { sideDistX += deltaDistX; mapX += stepX; side = 0; }
            else { sideDistY += deltaDistY; mapY += stepY; side = 1; }
            if (map[mapY][mapX] > 0) { hit = 1; wallType = map[mapY][mapX]; }
        }

        var perpWallDist;
        if (side == 0) perpWallDist = (mapX - p.x + (1 - stepX) / 2) / rayDirX;
        else           perpWallDist = (mapY - p.y + (1 - stepY) / 2) / rayDirY;

        var h = Math.floor(screenH / perpWallDist);
        if (h > 2000) h = 2000;

        var strip = strips[i];
        strip.style.height = h + 'px';
        strip.style.top = (screenH/2 - h/2) + 'px';
        
        var col = '#666';
        if(wallType===5) col = '#632'; // Р”РІРµСЂСЊ (РєРѕСЂРёС‡РЅРµРІР°СЏ)
        if(wallType===4) col = '#00f'; // Р’С‹С…РѕРґ (СЃРёРЅРёР№)
        if(side===1) col = (wallType===5)? '#421':'#444'; // РўРµРЅСЊ
        
        strip.style.backgroundColor = col;
        
        // Z-Index: Р”Р°Р»СЊРЅРёРµ СЃС‚РµРЅС‹ (РјРµРЅСЊС€РёР№ Z) РїРµСЂРµРєСЂС‹РІР°СЋС‚СЃСЏ Р±Р»РёР¶РЅРёРјРё
        var z = Math.floor(1000 - perpWallDist * 50);
        if(z < 0) z = 0;
        strip.style.zIndex = z;
    }

    // --- РЎРџР РђР™РўР« ---
    // РЎРѕСЂС‚РёСЂРѕРІРєР° (СЂРёСЃСѓРµРј РѕС‚ РґР°Р»СЊРЅРµРіРѕ Рє Р±Р»РёР¶РЅРµРјСѓ)
    for(var k=0; k<sprites.length; k++) {
        sprites[k].dist = ((p.x - sprites[k].x)*(p.x - sprites[k].x) + (p.y - sprites[k].y)*(p.y - sprites[k].y));
    }
    sprites.sort(function(a,b){ return b.dist - a.dist; });

    for(var k=0; k<sprites.length; k++) {
        var sp = sprites[k];
        var spriteX = sp.x - p.x;
        var spriteY = sp.y - p.y;

        // РўСЂР°РЅСЃС„РѕСЂРјР°С†РёСЏ (РјР°С‚СЂРёС†Р° РєР°РјРµСЂС‹)
        var invDet = 1.0 / (0.66 * Math.cos(p.dir+1.57) * Math.sin(p.dir) - Math.cos(p.dir) * 0.66 * Math.sin(p.dir+1.57));
        var transformX = invDet * (Math.sin(p.dir) * spriteX - Math.cos(p.dir) * spriteY);
        var transformY = invDet * (-Math.cos(p.dir) * 0.66 * spriteX + -Math.sin(p.dir) * 0.66 * spriteY);

        if(transformY > 0.2) {
            var spriteScreenX = Math.floor((screenW / 2) * (1 + transformX / transformY));
            var spriteHeight = Math.abs(Math.floor(screenH / transformY));
            var spriteWidth = Math.floor(spriteHeight * 0.6); // Р“СЂРµРЅРЅРё РІС‹СЃРѕРєР°СЏ
            var spriteTop = (screenH / 2) - (spriteHeight / 2);

            // РљР°РїРєР°РЅС‹ - РјР°Р»РµРЅСЊРєРёРµ Рё РІРЅРёР·Сѓ
            if(sp.type === 'trap') {
                spriteWidth = spriteHeight;
                spriteHeight = Math.floor(spriteHeight * 0.3);
                spriteTop = (screenH / 2) + spriteHeight * 2;
            }

            if(spriteHeight < 2000) {
                sp.el.style.display = 'block';
                sp.el.style.left = (spriteScreenX - spriteWidth/2) + 'px';
                sp.el.style.top = spriteTop + 'px';
                sp.el.style.width = spriteWidth + 'px';
                sp.el.style.height = spriteHeight + 'px';

                // РҐРђРљ: РЎРїСЂР°Р№С‚С‹ РІСЃРµРіРґР° РїРѕРІРµСЂС… СЃС‚РµРЅ РЅР° С‚РѕР№ Р¶Рµ РґРёСЃС‚Р°РЅС†РёРё
                var z = Math.floor(1000 - transformY * 50) + 20; 
                if(z < 0) z = 0;
                sp.el.style.zIndex = z;
            } else {
                sp.el.style.display = 'none';
            }
        } else {
            sp.el.style.display = 'none';
        }
    }
}
