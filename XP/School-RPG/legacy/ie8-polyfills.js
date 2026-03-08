// IE8 Compatibility Polyfills Library
// Обеспечивает базовую совместимость с Internet Explorer 8

/* === LEGACY BROWSER DETECTION & SMART SWITCHING === */
(function () {
    var ua = navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    var version = 999; // Default to modern

    if (msie > 0) {
        version = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    // Global Flags
    window.IS_LEGACY = msie > 0; // Any IE
    window.IS_IE8 = version === 8;
    window.IS_IE7 = version === 7;
    window.IS_IE6 = version <= 6; // IE6 and below (Ultra Legacy)

    // Smart Game Settings
    window.LegacyOptions = {
        // Graphics Quality
        // IE8 handles particles okay-ish via VML, IE6-7 will struggle
        particlesEnabled: version >= 8,

        // VML Shadows are expensive
        shadowsEnabled: version >= 9,

        // General quality flag
        highQuality: version >= 8,

        // Audio capabilities
        webAudioEnabled: !!(window.AudioContext || window.webkitAudioContext),

        // Hardware limits
        maxParticles: window.IS_IE6 ? 0 : (window.IS_IE7 ? 5 : 40),

        renderInterval: window.IS_IE6 ? 100 : 33, // 10fps for IE6, 30fps for others

        log: function (msg) {
            if (window.console && window.console.log) {
                window.console.log('[Legacy] ' + msg);
            }
        }
    };

    // Potato Mode for IE6
    if (window.IS_IE6) {
        // Force minimal redraws
        window.LegacyOptions.log('Activated IE6 POTATO MODE');
    }
})();

// Определение IE8 legacy variables (kept for backward compatibility)
var isIE8 = navigator.userAgent.indexOf('MSIE 8') !== -1;
var isIE = navigator.userAgent.indexOf('MSIE') !== -1;

// Console polyfill
if (!window.console) {
    window.console = {
        log: function () { },
        warn: function () { },
        error: function () { },
        info: function () { }
    };
}

// JSON polyfill
if (!window.JSON) {
    window.JSON = {
        parse: function (text) {
            try {
                return eval('(' + text + ')');
            } catch (e) {
                throw new Error('Invalid JSON');
            }
        },
        stringify: function (obj) {
            var type = typeof obj;
            if (type === 'string' || type === 'boolean' || type === 'number') {
                return obj.toString();
            }
            if (obj === null) return 'null';
            if (type === 'object') {
                var parts = [];
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        parts.push('"' + key + '":' + this.stringify(obj[key]));
                    }
                }
                return '{' + parts.join(',') + '}';
            }
            return 'null';
        }
    };
}

// Array polyfills
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (obj, start) {
        for (var i = (start || 0), j = this.length; i < j; i++) {
            if (this[i] === obj) { return i; }
        }
        return -1;
    };
}

if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (callback, thisArg) {
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

if (!Array.prototype.map) {
    Array.prototype.map = function (callback, thisArg) {
        var result = [];
        for (var i = 0; i < this.length; i++) {
            result.push(callback.call(thisArg, this[i], i, this));
        }
        return result;
    };
}

// Array.prototype.filter
if (!Array.prototype.filter) {
    Array.prototype.filter = function (callback, thisArg) {
        'use strict';
        if (this === void 0 || this === null) {
            throw new TypeError('Array.prototype.filter called on null or undefined');
        }
        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }
        var O = Object(this);
        var len = O.length >>> 0;
        var result = [];
        for (var i = 0; i < len; i++) {
            if (i in O) {
                var val = O[i];
                if (callback.call(thisArg, val, i, O)) {
                    result.push(val);
                }
            }
        }
        return result;
    };
}

// Object.keys polyfill - CRITICAL for IE8
if (!Object.keys) {
    Object.keys = function (obj) {
        var keys = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) keys.push(key);
        }
        return keys;
    };
}

// ========================================
// CRITICAL: querySelector/querySelectorAll polyfills
// Required for: Night Racer, School-RPG, and other games
// ========================================

// Helper function to match element by selector
function matchesSelector(element, selector) {
    selector = selector.trim();

    // ID selector: #id
    if (selector.charAt(0) === '#') {
        return element.id === selector.substring(1);
    }

    // Class selector: .class
    if (selector.charAt(0) === '.') {
        var className = selector.substring(1);
        var classes = element.className;
        if (!classes) return false;
        // Handle multiple classes
        var classArray = classes.split(/\s+/);
        for (var i = 0; i < classArray.length; i++) {
            if (classArray[i] === className) return true;
        }
        return false;
    }

    // Tag selector: div, span, etc.
    if (selector.match(/^[a-zA-Z][a-zA-Z0-9]*$/)) {
        return element.tagName && element.tagName.toLowerCase() === selector.toLowerCase();
    }

    // Tag with class: div.class
    if (selector.match(/^[a-zA-Z][a-zA-Z0-9]*\.[a-zA-Z][a-zA-Z0-9-]*$/)) {
        var parts = selector.split('.');
        var tag = parts[0].toLowerCase();
        var cls = parts[1];
        if (!element.tagName || element.tagName.toLowerCase() !== tag) return false;
        var elementClasses = element.className;
        if (!elementClasses) return false;
        var classArr = elementClasses.split(/\s+/);
        for (var j = 0; j < classArr.length; j++) {
            if (classArr[j] === cls) return true;
        }
        return false;
    }

    // Tag with ID: div#id
    if (selector.match(/^[a-zA-Z][a-zA-Z0-9]*#[a-zA-Z][a-zA-Z0-9-]*$/)) {
        var tagIdParts = selector.split('#');
        var tagName = tagIdParts[0].toLowerCase();
        var id = tagIdParts[1];
        return element.tagName &&
            element.tagName.toLowerCase() === tagName &&
            element.id === id;
    }

    return false;
}

// Helper to get all descendant elements
function getAllDescendants(element) {
    var result = [];
    var children = element.childNodes;
    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        if (child.nodeType === 1) { // Element node
            result.push(child);
            // Recursively get descendants
            var descendants = getAllDescendants(child);
            for (var j = 0; j < descendants.length; j++) {
                result.push(descendants[j]);
            }
        }
    }
    return result;
}

// document.querySelector polyfill
if (!document.querySelector) {
    document.querySelector = function (selector) {
        selector = selector.trim();

        // Fast path for ID selector
        if (selector.charAt(0) === '#') {
            return document.getElementById(selector.substring(1));
        }

        // Fast path for tag selector
        if (selector.match(/^[a-zA-Z][a-zA-Z0-9]*$/)) {
            return document.getElementsByTagName(selector)[0] || null;
        }

        // For more complex selectors, iterate all elements
        var allElements = document.getElementsByTagName('*');
        for (var i = 0; i < allElements.length; i++) {
            if (matchesSelector(allElements[i], selector)) {
                return allElements[i];
            }
        }

        return null;
    };
}

// document.querySelectorAll polyfill
if (!document.querySelectorAll) {
    document.querySelectorAll = function (selector) {
        selector = selector.trim();
        var result = [];

        // Fast path for ID selector
        if (selector.charAt(0) === '#') {
            var el = document.getElementById(selector.substring(1));
            if (el) result.push(el);
        } else if (selector.charAt(0) === '.') {
            // Fast path for class selector
            var className = selector.substring(1);
            var classElements = document.getElementsByClassName ? document.getElementsByClassName(className) : null;
            if (classElements) {
                for (var i = 0; i < classElements.length; i++) result.push(classElements[i]);
            } else {
                var allEl = document.getElementsByTagName('*');
                for (var j = 0; j < allEl.length; j++) {
                    var cls = allEl[j].className;
                    if (cls && (" " + cls + " ").indexOf(" " + className + " ") !== -1) result.push(allEl[j]);
                }
            }
        } else if (selector.match(/^[a-zA-Z][a-zA-Z0-9]*$/)) {
            // Fast path for tag selector
            var tagElements = document.getElementsByTagName(selector);
            for (var m = 0; m < tagElements.length; m++) result.push(tagElements[m]);
        } else {
            // Complex selectors
            var allElements = document.getElementsByTagName('*');
            for (var n = 0; n < allElements.length; n++) {
                if (matchesSelector(allElements[n], selector)) result.push(allElements[n]);
            }
        }

        result.item = function (index) { return this[index] || null; };
        return result;
    };
}

// document.getElementsByClassName polyfill
if (!document.getElementsByClassName) {
    document.getElementsByClassName = function (search) {
        var d = document, results = [];
        var elements = d.getElementsByTagName("*");
        var pattern = new RegExp("(^|\\s)" + search + "(\\s|$)");
        for (var i = 0; i < elements.length; i++) {
            if (pattern.test(elements[i].className)) results.push(elements[i]);
        }
        results.item = function (index) { return this[index] || null; };
        return results;
    };
}

// Element.prototype polyfills
if (window.Element) {
    if (!Element.prototype.querySelector) {
        Element.prototype.querySelector = function (selector) {
            var descendants = getAllDescendants(this);
            for (var i = 0; i < descendants.length; i++) {
                if (matchesSelector(descendants[i], selector)) return descendants[i];
            }
            return null;
        };
    }
    if (!Element.prototype.querySelectorAll) {
        Element.prototype.querySelectorAll = function (selector) {
            var result = [], descendants = getAllDescendants(this);
            for (var i = 0; i < descendants.length; i++) {
                if (matchesSelector(descendants[i], selector)) result.push(descendants[i]);
            }
            result.item = function (index) { return this[index] || null; };
            return result;
        };
    }
    if (!Element.prototype.getElementsByClassName) {
        Element.prototype.getElementsByClassName = function (search) {
            var results = [], elements = this.getElementsByTagName("*");
            var pattern = new RegExp("(^|\\s)" + search + "(\\s|$)");
            for (var i = 0; i < elements.length; i++) {
                if (pattern.test(elements[i].className)) results.push(elements[i]);
            }
            results.item = function (index) { return this[index] || null; };
            return results;
        };
    }
}


// DOM Polyfills for IE8
if (!document.getElementsByClassName) {
    document.getElementsByClassName = function (search) {
        var d = document, elements, pattern, i, results = [];
        if (d.querySelectorAll) {
            return d.querySelectorAll("." + search);
        }
        if (d.evaluate) {
            pattern = ".//*[contains(concat(' ', @class, ' '), ' " + search + " ')]";
            elements = d.evaluate(pattern, d, null, 0, null);
            while ((i = elements.iterateNext())) {
                results.push(i);
            }
        } else {
            elements = d.getElementsByTagName("*");
            pattern = new RegExp("(^|\\s)" + search + "(\\s|$)");
            for (i = 0; i < elements.length; i++) {
                if (pattern.test(elements[i].className)) {
                    results.push(elements[i]);
                }
            }
        }
        return results;
    };
}

if (!document.querySelectorAll) {
    document.querySelectorAll = function (selectors) {
        var style = document.createStyleSheet(), elements, results = [];
        document.all._qsa = null;
        style.addRule(selectors, "{x:expression(document.all._qsa?null:document.all._qsa=this)}");
        window.scrollBy(0, 0);
        style.removeRule(0);
        if (document.all._qsa) {
            results.push(document.all._qsa);
        }
        return results;
    };
}
if (!document.querySelector) {
    document.querySelector = function (selectors) {
        var elements = document.querySelectorAll(selectors);
        return elements.length ? elements[0] : null;
    };
}

// localStorage polyfill using cookies
var ie8Storage = {
    getItem: function (key) {
        var nameEQ = key + '=';
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return unescape(c.substring(nameEQ.length, c.length));
        }
        return null;
    },
    setItem: function (key, value) {
        var days = 365;
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = '; expires=' + date.toGMTString();
        document.cookie = key + '=' + escape(value) + expires + '; path=/';
    },
    removeItem: function (key) {
        this.setItem(key, '', -1);
    },
    // Keep backward compat or short names
    get: function (k) { return this.getItem(k); },
    set: function (k, v) { this.setItem(k, v); },
    remove: function (k) { this.removeItem(k); }
};

// Подмена localStorage для IE8
if (!window.localStorage) {
    window.localStorage = ie8Storage;
}

// VML Canvas replacement with full raycasting support
function createVMLCanvas(width, height) {
    if (!isIE) {
        // Для современных браузеров создаем обычный canvas
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        return canvas;
    }

    // Для IE8 создаем VML контейнер
    var container = document.createElement('div');
    container.style.width = width + 'px';
    container.style.height = height + 'px';
    container.style.position = 'relative';
    container.style.overflow = 'hidden';
    container.style.backgroundColor = '#000';
    container.width = width;
    container.height = height;

    // Добавляем VML namespace если еще не добавлен
    if (document.namespaces && !document.namespaces['v']) {
        document.namespaces.add('v', 'urn:schemas-microsoft-com:vml');
    }

    // Создаем VML group для всех элементов
    var group = document.createElement('v:group');
    group.style.width = width + 'px';
    group.style.height = height + 'px';
    group.style.position = 'absolute';
    group.style.left = '0px';
    group.style.top = '0px';
    group.coordsize = width + ',' + height;
    container.appendChild(group);

    // Буфер для хранения пикселей (программный рендеринг)
    var pixelBuffer = [];
    for (var i = 0; i < width * height; i++) {
        pixelBuffer.push({ r: 0, g: 0, b: 0, a: 255 });
    }

    // Добавляем методы для совместимости с canvas
    container.getContext = function (type) {
        var ctx = {
            fillStyle: '#000000',
            strokeStyle: '#000000',
            lineWidth: 1,
            globalAlpha: 1,
            font: '12px Arial',

            // Парсинг цвета
            _parseColor: function (color) {
                if (!color) return { r: 0, g: 0, b: 0, a: 255 };
                if (color.charAt(0) === '#') {
                    var hex = color.substring(1);
                    if (hex.length === 3) {
                        return {
                            r: parseInt(hex.charAt(0) + hex.charAt(0), 16),
                            g: parseInt(hex.charAt(1) + hex.charAt(1), 16),
                            b: parseInt(hex.charAt(2) + hex.charAt(2), 16),
                            a: 255
                        };
                    }
                    return {
                        r: parseInt(hex.substring(0, 2), 16) || 0,
                        g: parseInt(hex.substring(2, 4), 16) || 0,
                        b: parseInt(hex.substring(4, 6), 16) || 0,
                        a: 255
                    };
                }
                // rgb/rgba
                var match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
                if (match) {
                    return {
                        r: parseInt(match[1]) || 0,
                        g: parseInt(match[2]) || 0,
                        b: parseInt(match[3]) || 0,
                        a: match[4] ? Math.round(parseFloat(match[4]) * 255) : 255
                    };
                }
                return { r: 0, g: 0, b: 0, a: 255 };
            },

            fillRect: function (x, y, w, h) {
                var c = this._parseColor(this.fillStyle);
                c.a = Math.round(c.a * this.globalAlpha);
                x = Math.floor(x);
                y = Math.floor(y);
                w = Math.floor(w);
                h = Math.floor(h);
                for (var py = y; py < y + h && py < height; py++) {
                    for (var px = x; px < x + w && px < width; px++) {
                        if (px >= 0 && py >= 0) {
                            var idx = py * width + px;
                            if (c.a === 255) {
                                pixelBuffer[idx] = { r: c.r, g: c.g, b: c.b, a: c.a };
                            } else {
                                var a1 = c.a / 255;
                                var a0 = 1 - a1;
                                pixelBuffer[idx].r = Math.round(c.r * a1 + pixelBuffer[idx].r * a0);
                                pixelBuffer[idx].g = Math.round(c.g * a1 + pixelBuffer[idx].g * a0);
                                pixelBuffer[idx].b = Math.round(c.b * a1 + pixelBuffer[idx].b * a0);
                            }
                        }
                    }
                }
            },

            clearRect: function (x, y, w, h) {
                x = Math.floor(x);
                y = Math.floor(y);
                w = Math.floor(w);
                h = Math.floor(h);
                for (var py = y; py < y + h && py < height; py++) {
                    for (var px = x; px < x + w && px < width; px++) {
                        if (px >= 0 && py >= 0) {
                            var idx = py * width + px;
                            pixelBuffer[idx] = { r: 0, g: 0, b: 0, a: 255 };
                        }
                    }
                }
            },

            drawImage: function (image, sx, sy, sw, sh, dx, dy, dw, dh) {
                // Упрощенная версия drawImage для текстур
                if (sw === undefined) {
                    dx = sx; dy = sy; dw = image.width; dh = image.height;
                    sx = 0; sy = 0; sw = image.width; sh = image.height;
                }
                if (dw === undefined) {
                    dw = sw; dh = sh;
                }

                // Получаем данные изображения
                var imgData;
                try {
                    if (image.getContext) {
                        var imgCtx = image.getContext('2d');
                        imgData = imgCtx.getImageData(0, 0, image.width, image.height);
                    } else if (image._pixelBuffer) {
                        imgData = { data: [], width: image.width, height: image.height };
                        for (var i = 0; i < image._pixelBuffer.length; i++) {
                            imgData.data.push(image._pixelBuffer[i].r);
                            imgData.data.push(image._pixelBuffer[i].g);
                            imgData.data.push(image._pixelBuffer[i].b);
                            imgData.data.push(image._pixelBuffer[i].a);
                        }
                    }
                } catch (e) { }

                if (!imgData) return;

                // Масштабирование и отрисовка
                dx = Math.floor(dx);
                dy = Math.floor(dy);
                dw = Math.floor(dw);
                dh = Math.floor(dh);

                for (var py = 0; py < dh; py++) {
                    for (var px = 0; px < dw; px++) {
                        var destX = dx + px;
                        var destY = dy + py;
                        if (destX < 0 || destX >= width || destY < 0 || destY >= height) continue;

                        var srcX = Math.floor(sx + (px / dw) * sw);
                        var srcY = Math.floor(sy + (py / dh) * sh);
                        if (srcX < 0 || srcX >= image.width || srcY < 0 || srcY >= image.height) continue;

                        var srcIdx = (srcY * image.width + srcX) * 4;
                        var r = imgData.data[srcIdx] || 0;
                        var g = imgData.data[srcIdx + 1] || 0;
                        var b = imgData.data[srcIdx + 2] || 0;
                        var a = imgData.data[srcIdx + 3] || 255;

                        var destIdx = destY * width + destX;
                        var alpha = (a / 255) * this.globalAlpha;

                        if (alpha >= 1) {
                            pixelBuffer[destIdx] = { r: r, g: g, b: b, a: 255 };
                        } else if (alpha > 0) {
                            var a1 = alpha;
                            var a0 = 1 - a1;
                            pixelBuffer[destIdx].r = Math.round(r * a1 + pixelBuffer[destIdx].r * a0);
                            pixelBuffer[destIdx].g = Math.round(g * a1 + pixelBuffer[destIdx].g * a0);
                            pixelBuffer[destIdx].b = Math.round(b * a1 + pixelBuffer[destIdx].b * a0);
                        }
                    }
                }
            },

            getImageData: function (x, y, w, h) {
                var data = [];
                for (var py = y; py < y + h; py++) {
                    for (var px = x; px < x + w; px++) {
                        if (px >= 0 && px < width && py >= 0 && py < height) {
                            var idx = py * width + px;
                            data.push(pixelBuffer[idx].r);
                            data.push(pixelBuffer[idx].g);
                            data.push(pixelBuffer[idx].b);
                            data.push(pixelBuffer[idx].a);
                        } else {
                            data.push(0, 0, 0, 255);
                        }
                    }
                }
                return { data: data, width: w, height: h };
            },

            putImageData: function (imgData, x, y) {
                for (var py = 0; py < imgData.height; py++) {
                    for (var px = 0; px < imgData.width; px++) {
                        var destX = x + px;
                        var destY = y + py;
                        if (destX >= 0 && destX < width && destY >= 0 && destY < height) {
                            var srcIdx = (py * imgData.width + px) * 4;
                            var destIdx = destY * width + destX;
                            pixelBuffer[destIdx] = {
                                r: imgData.data[srcIdx] || 0,
                                g: imgData.data[srcIdx + 1] || 0,
                                b: imgData.data[srcIdx + 2] || 0,
                                a: imgData.data[srcIdx + 3] || 255
                            };
                        }
                    }
                }
            },

            fillText: function (text, x, y) {
                // Упрощенная реализация текста
                var textEl = document.createElement('v:textbox');
                textEl.style.position = 'absolute';
                textEl.style.left = x + 'px';
                textEl.style.top = (y - 12) + 'px';
                textEl.style.color = this.fillStyle;
                textEl.style.font = this.font;
                textEl.innerHTML = text;
                group.appendChild(textEl);
            },

            strokeRect: function (x, y, w, h) {
                // Рисуем контур прямоугольника
                var rect = document.createElement('v:rect');
                rect.style.position = 'absolute';
                rect.style.left = x + 'px';
                rect.style.top = y + 'px';
                rect.style.width = w + 'px';
                rect.style.height = h + 'px';
                rect.strokecolor = this.strokeStyle;
                rect.strokeweight = this.lineWidth + 'px';
                rect.fillcolor = 'none';
                group.appendChild(rect);
            },

            // ========================================
            // Canvas Path Methods - Functional Implementation
            // Required for: The Deepest Dunk and other canvas games
            // ========================================

            // Path state
            _pathPoints: [],
            _currentX: 0,
            _currentY: 0,
            _transformStack: [],
            _currentTransform: { dx: 0, dy: 0, rotate: 0, scaleX: 1, scaleY: 1 },

            // Save and restore context state
            save: function () {
                this._transformStack.push({
                    dx: this._currentTransform.dx,
                    dy: this._currentTransform.dy,
                    rotate: this._currentTransform.rotate,
                    scaleX: this._currentTransform.scaleX,
                    scaleY: this._currentTransform.scaleY
                });
            },

            restore: function () {
                if (this._transformStack.length > 0) {
                    this._currentTransform = this._transformStack.pop();
                }
            },

            // Transform a point through current transformation
            _transformPoint: function (x, y) {
                var t = this._currentTransform;
                // Apply scale
                x = x * t.scaleX;
                y = y * t.scaleY;
                // Apply rotation
                if (t.rotate !== 0) {
                    var cos = Math.cos(t.rotate);
                    var sin = Math.sin(t.rotate);
                    var rx = x * cos - y * sin;
                    var ry = x * sin + y * cos;
                    x = rx;
                    y = ry;
                }
                // Apply translation
                x += t.dx;
                y += t.dy;
                return { x: x, y: y };
            },

            // Translation
            translate: function (x, y) {
                this._currentTransform.dx += x;
                this._currentTransform.dy += y;
            },

            // Rotation
            rotate: function (angle) {
                this._currentTransform.rotate += angle;
            },

            // Scale
            scale: function (x, y) {
                this._currentTransform.scaleX *= x;
                this._currentTransform.scaleY *= (y !== undefined ? y : x);
            },

            // Begin a new path
            beginPath: function () {
                this._pathPoints = [];
                this._currentX = 0;
                this._currentY = 0;
            },

            // Move to a point (start new subpath)
            moveTo: function (x, y) {
                var p = this._transformPoint(x, y);
                this._pathPoints.push({ type: 'move', x: p.x, y: p.y });
                this._currentX = p.x;
                this._currentY = p.y;
            },

            // Draw line to point
            lineTo: function (x, y) {
                var p = this._transformPoint(x, y);
                this._pathPoints.push({ type: 'line', x: p.x, y: p.y });
                this._currentX = p.x;
                this._currentY = p.y;
            },

            // Draw arc
            arc: function (x, y, radius, startAngle, endAngle, anticlockwise) {
                var p = this._transformPoint(x, y);
                radius = radius * this._currentTransform.scaleX;

                // Convert to line segments
                var steps = Math.max(8, Math.floor(radius * Math.abs(endAngle - startAngle)));
                var step = (endAngle - startAngle) / steps;
                if (anticlockwise) {
                    step = -step;
                }

                for (var i = 0; i <= steps; i++) {
                    var angle = startAngle + step * i;
                    var px = p.x + radius * Math.cos(angle);
                    var py = p.y + radius * Math.sin(angle);

                    if (i === 0 && this._pathPoints.length === 0) {
                        this._pathPoints.push({ type: 'move', x: px, y: py });
                    } else {
                        this._pathPoints.push({ type: 'line', x: px, y: py });
                    }
                }

                this._currentX = p.x + radius * Math.cos(endAngle);
                this._currentY = p.y + radius * Math.sin(endAngle);
            },

            // Arc to
            arcTo: function (x1, y1, x2, y2, radius) {
                // Simplified implementation
                this.lineTo(x1, y1);
            },

            // Bezier curve
            bezierCurveTo: function (cp1x, cp1y, cp2x, cp2y, x, y) {
                var p1 = this._transformPoint(cp1x, cp1y);
                var p2 = this._transformPoint(cp2x, cp2y);
                var p3 = this._transformPoint(x, y);

                // Approximate with line segments
                var steps = 10;
                for (var i = 1; i <= steps; i++) {
                    var t = i / steps;
                    var t1 = 1 - t;
                    var px = t1 * t1 * t1 * this._currentX + 3 * t1 * t1 * t * p1.x + 3 * t1 * t * t * p2.x + t * t * t * p3.x;
                    var py = t1 * t1 * t1 * this._currentY + 3 * t1 * t1 * t * p1.y + 3 * t1 * t * t * p2.y + t * t * t * p3.y;
                    this._pathPoints.push({ type: 'line', x: px, y: py });
                }
                this._currentX = p3.x;
                this._currentY = p3.y;
            },

            // Quadratic curve
            quadraticCurveTo: function (cpx, cpy, x, y) {
                var cp = this._transformPoint(cpx, cpy);
                var p = this._transformPoint(x, y);

                // Approximate with line segments
                var steps = 10;
                for (var i = 1; i <= steps; i++) {
                    var t = i / steps;
                    var t1 = 1 - t;
                    var px = t1 * t1 * this._currentX + 2 * t1 * t * cp.x + t * t * p.x;
                    var py = t1 * t1 * this._currentY + 2 * t1 * t * cp.y + t * t * p.y;
                    this._pathPoints.push({ type: 'line', x: px, y: py });
                }
                this._currentX = p.x;
                this._currentY = p.y;
            },

            // Close path
            closePath: function () {
                if (this._pathPoints.length > 0) {
                    var first = this._pathPoints[0];
                    this._pathPoints.push({ type: 'close', x: first.x, y: first.y });
                }
            },

            // Fill path using scanline algorithm
            fill: function () {
                if (this._pathPoints.length < 3) return;

                var c = this._parseColor(this.fillStyle);
                c.a = Math.round(c.a * this.globalAlpha);

                // Get bounding box
                var minX = this._pathPoints[0].x;
                var maxX = minX;
                var minY = this._pathPoints[0].y;
                var maxY = minY;

                for (var i = 1; i < this._pathPoints.length; i++) {
                    var pt = this._pathPoints[i];
                    if (pt.x < minX) minX = pt.x;
                    if (pt.x > maxX) maxX = pt.x;
                    if (pt.y < minY) minY = pt.y;
                    if (pt.y > maxY) maxY = pt.y;
                }

                // Clamp to canvas bounds
                minX = Math.max(0, Math.floor(minX));
                maxX = Math.min(width - 1, Math.ceil(maxX));
                minY = Math.max(0, Math.floor(minY));
                maxY = Math.min(height - 1, Math.ceil(maxY));

                // Scanline fill
                for (var y = minY; y <= maxY; y++) {
                    var intersections = [];

                    for (var j = 0; j < this._pathPoints.length; j++) {
                        var p1 = this._pathPoints[j];
                        var p2 = this._pathPoints[(j + 1) % this._pathPoints.length];

                        if (p1.type === 'move') continue;
                        if (p2.type === 'move') continue;

                        if ((p1.y <= y && p2.y > y) || (p2.y <= y && p1.y > y)) {
                            var x = p1.x + (y - p1.y) / (p2.y - p1.y) * (p2.x - p1.x);
                            intersections.push(x);
                        }
                    }

                    // Sort intersections
                    intersections.sort(function (a, b) { return a - b; });

                    // Fill between pairs
                    for (var k = 0; k < intersections.length - 1; k += 2) {
                        var xStart = Math.max(0, Math.floor(intersections[k]));
                        var xEnd = Math.min(width - 1, Math.ceil(intersections[k + 1]));

                        for (var x = xStart; x <= xEnd; x++) {
                            var idx = y * width + x;
                            if (c.a === 255) {
                                pixelBuffer[idx] = { r: c.r, g: c.g, b: c.b, a: c.a };
                            } else {
                                var a1 = c.a / 255;
                                var a0 = 1 - a1;
                                pixelBuffer[idx].r = Math.round(c.r * a1 + pixelBuffer[idx].r * a0);
                                pixelBuffer[idx].g = Math.round(c.g * a1 + pixelBuffer[idx].g * a0);
                                pixelBuffer[idx].b = Math.round(c.b * a1 + pixelBuffer[idx].b * a0);
                            }
                        }
                    }
                }
            },

            // Stroke path using Bresenham's line algorithm
            stroke: function () {
                if (this._pathPoints.length < 2) return;

                var c = this._parseColor(this.strokeStyle);
                c.a = Math.round(c.a * this.globalAlpha);
                var lw = Math.max(1, Math.round(this.lineWidth));

                // Draw lines between path points
                var prevPoint = null;
                for (var i = 0; i < this._pathPoints.length; i++) {
                    var pt = this._pathPoints[i];

                    if (pt.type === 'move') {
                        prevPoint = pt;
                        continue;
                    }

                    if (pt.type === 'close' && prevPoint) {
                        // Find first point
                        for (var j = 0; j < this._pathPoints.length; j++) {
                            if (this._pathPoints[j].type === 'move') {
                                this._drawLine(prevPoint.x, prevPoint.y, this._pathPoints[j].x, this._pathPoints[j].y, c, lw);
                                break;
                            }
                        }
                        prevPoint = null;
                        continue;
                    }

                    if (prevPoint) {
                        this._drawLine(prevPoint.x, prevPoint.y, pt.x, pt.y, c, lw);
                    }
                    prevPoint = pt;
                }
            },

            // Bresenham's line algorithm
            _drawLine: function (x0, y0, x1, y1, color, lineWidth) {
                x0 = Math.round(x0);
                y0 = Math.round(y0);
                x1 = Math.round(x1);
                y1 = Math.round(y1);

                var dx = Math.abs(x1 - x0);
                var dy = Math.abs(y1 - y0);
                var sx = x0 < x1 ? 1 : -1;
                var sy = y0 < y1 ? 1 : -1;
                var err = dx - dy;

                var halfWidth = Math.floor(lineWidth / 2);

                while (true) {
                    // Draw pixel with line width
                    for (var ox = -halfWidth; ox <= halfWidth; ox++) {
                        for (var oy = -halfWidth; oy <= halfWidth; oy++) {
                            var px = x0 + ox;
                            var py = y0 + oy;
                            if (px >= 0 && px < width && py >= 0 && py < height) {
                                var idx = py * width + px;
                                if (color.a === 255) {
                                    pixelBuffer[idx] = { r: color.r, g: color.g, b: color.b, a: color.a };
                                } else {
                                    var a1 = color.a / 255;
                                    var a0 = 1 - a1;
                                    pixelBuffer[idx].r = Math.round(color.r * a1 + pixelBuffer[idx].r * a0);
                                    pixelBuffer[idx].g = Math.round(color.g * a1 + pixelBuffer[idx].g * a0);
                                    pixelBuffer[idx].b = Math.round(color.b * a1 + pixelBuffer[idx].b * a0);
                                }
                            }
                        }
                    }

                    if (x0 === x1 && y0 === y1) break;

                    var e2 = 2 * err;
                    if (e2 > -dy) {
                        err -= dy;
                        x0 += sx;
                    }
                    if (e2 < dx) {
                        err += dx;
                        y0 += sy;
                    }
                }
            },

            // Clip path (simplified - just stores for reference)
            clip: function () {
                // Simplified implementation
            },

            // Measure text (simplified)
            measureText: function (text) {
                return { width: text.length * 8 };
            },

            // Метод для рендеринга буфера на экран
            _flush: function () {
                // Оптимизированный рендеринг для raycasting
                // Рендерим по строкам с группировкой одинаковых цветов
                var scale = 4; // Масштаб для производительности
                var html = [];

                // Проходим по строкам
                for (var py = 0; py < height; py += scale) {
                    var startX = 0;
                    var lastColor = null;

                    for (var px = 0; px <= width; px += scale) {
                        var color;
                        if (px < width) {
                            var idx = py * width + px;
                            var p = pixelBuffer[idx];
                            color = p.r + ',' + p.g + ',' + p.b;
                        } else {
                            color = null;
                        }

                        if (color !== lastColor) {
                            if (lastColor !== null) {
                                // Рисуем прямоугольник от startX до px
                                html.push('<v:rect style="position:absolute;left:' + startX + ';top:' + py + ';width:' + (px - startX) + ';height:' + scale + '" fillcolor="rgb(' + lastColor + ')" stroked="false"/>');
                            }
                            startX = px;
                            lastColor = color;
                        }
                    }
                }

                group.innerHTML = html.join('');
            }
        };

        return ctx;
    };

    // Метод toDataURL
    container.toDataURL = function () {
        // Возвращаем пустой data URL для IE8
        return 'data:image/png;base64,';
    };

    // Сохраняем буфер для drawImage
    container._pixelBuffer = pixelBuffer;

    return container;
}

// Audio system for IE8
var ie8Audio = {
    sounds: {},
    muted: false,

    load: function (id, src) {
        this.sounds[id] = src;
    },

    play: function (id) {
        if (this.muted) return;

        if (isIE) {
            // Используем bgsound для IE8
            var sound = document.createElement('bgsound');
            sound.src = this.sounds[id];
            sound.loop = 1;
            document.body.appendChild(sound);

            // Удаляем элемент после воспроизведения
            setTimeout(function () {
                if (sound.parentNode) {
                    sound.parentNode.removeChild(sound);
                }
            }, 3000);
        } else {
            // Для современных браузеров
            var audio = new Audio(this.sounds[id]);
            audio.play();
        }
    },

    setMuted: function (muted) {
        this.muted = muted;
    }
};

// Event handling polyfill
var ie8Events = {
    addListener: function (element, event, handler) {
        if (element.addEventListener) {
            element.addEventListener(event, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + event, function () {
                handler.call(element, window.event);
            });
        }
    },

    removeListener: function (element, event, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(event, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent('on' + event, handler);
        }
    },

    preventDefault: function (e) {
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
    },

    stopPropagation: function (e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
    }
};

// RequestAnimationFrame polyfill
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback) {
        return setTimeout(callback, 1000 / 60); // 60 FPS
    };
}

if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
        clearTimeout(id);
    };
}

// CSS3 Animation polyfill
var ie8Animations = {
    animate: function (element, properties, duration) {
        duration = duration || 300;
        var start = {};
        var changes = {};

        for (var prop in properties) {
            start[prop] = this.getStyle(element, prop);
            changes[prop] = properties[prop];
        }

        var startTime = new Date().getTime();
        var self = this;

        function update() {
            var elapsed = new Date().getTime() - startTime;
            var progress = Math.min(elapsed / duration, 1);

            for (var prop in changes) {
                var startVal = parseFloat(start[prop]) || 0;
                var endVal = parseFloat(changes[prop]) || 0;
                var currentVal = startVal + (endVal - startVal) * progress;

                if (prop === 'opacity') {
                    element.style.filter = 'alpha(opacity=' + (currentVal * 100) + ')';
                } else {
                    element.style[prop] = currentVal + 'px';
                }
            }

            if (progress < 1) {
                setTimeout(update, 16);
            }
        }

        update();
    },

    getStyle: function (element, prop) {
        if (element.currentStyle) {
            return element.currentStyle[prop];
        } else if (window.getComputedStyle) {
            return document.defaultView.getComputedStyle(element, null)[prop];
        }
        return element.style[prop];
    }
};

// Touch events polyfill
if (!('ontouchstart' in window)) {
    window.ontouchstart = null;
    window.ontouchmove = null;
    window.ontouchend = null;
}

// Экспорт глобальных функций
// Экспорт глобальных функций
window.ie8Polyfills = {
    isIE8: isIE8,
    isIE: isIE,
    createCanvas: createVMLCanvas,
    audio: ie8Audio,
    events: ie8Events,
    animations: ie8Animations,
    storage: ie8Storage
};

// === GLOBAL OPTIMIZATIONS ===

// 1. Disable Selection
document.onselectstart = function (e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return true;
    return false;
};

// 2. UI Throttling Helper
window.ThrottleUI = function (fn, delay) {
    var timer = null;
    return function () {
        var context = this, args = arguments;
        if (!timer) {
            timer = setTimeout(function () {
                fn.apply(context, args);
                timer = null;
            }, delay || 200);
        }
    };
};

// 3. Object Pool Utility
window.ObjectPool = function (createFn, resetFn) {
    this.createFn = createFn;
    this.resetFn = resetFn;
    this.pool = [];
};

window.ObjectPool.prototype = {
    get: function () {
        var obj;
        if (this.pool.length > 0) {
            obj = this.pool.pop();
        } else {
            obj = this.createFn();
        }
        if (this.resetFn) {
            this.resetFn(obj);
        }
        return obj;
    },

    recycle: function (obj) {
        this.pool.push(obj);
    },

    preallocate: function (count) {
        for (var i = 0; i < count; i++) {
            this.pool.push(this.createFn());
        }
    }
};

// 4. Date.now Polyfill
if (!Date.now) {
    Date.now = function () {
        return new Date().getTime();
    };
}

// 5. classList Polyfill (Basic support for add/remove/toggle/contains)
if (!("classList" in document.documentElement)) {
    Object.defineProperty(HTMLElement.prototype, 'classList', {
        get: function () {
            var self = this;
            function update(fn) {
                return function (value) {
                    var classes = self.className.split(/\s+/),
                        index = -1;

                    for (var i = 0; i < classes.length; i++) {
                        if (classes[i] === value) {
                            index = i;
                            break;
                        }
                    }

                    fn(classes, index, value);
                    self.className = classes.join(" ");
                };
            }

            return {
                add: update(function (classes, index, value) {
                    if (index === -1) classes.push(value);
                }),

                remove: update(function (classes, index) {
                    if (index !== -1) classes.splice(index, 1);
                }),

                toggle: update(function (classes, index, value) {
                    if (index !== -1) classes.splice(index, 1);
                    else classes.push(value);
                }),

                contains: function (value) {
                    return self.className.indexOf(value) !== -1;
                }
            };
        }
    });
}
