(function () {
    const MODAL_ID = 'xp-player-profile-modal';

    function escapeHtml(value) {
        return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function keyFor(gameId) {
        return 'xp_profile_' + gameId;
    }

    function readProfile(gameId, fallbackName) {
        try {
            const raw = localStorage.getItem(keyFor(gameId));
            if (raw) {
                const parsed = JSON.parse(raw);
                return {
                    name: (parsed.name || '').trim(),
                    askEveryRecord: parsed.askEveryRecord !== false
                };
            }
        } catch (e) {}
        return {
            name: (localStorage.getItem('player_name') || fallbackName || '').trim(),
            askEveryRecord: true
        };
    }

    function saveProfile(gameId, profile) {
        const clean = {
            name: (profile.name || '').trim(),
            askEveryRecord: profile.askEveryRecord !== false
        };
        localStorage.setItem(keyFor(gameId), JSON.stringify(clean));
        if (clean.name) localStorage.setItem('player_name', clean.name);
        return clean;
    }

    function removeModal() {
        const old = document.getElementById(MODAL_ID);
        if (old) old.remove();
    }

    function showModal(config) {
        removeModal();
        const overlay = document.createElement('div');
        overlay.id = MODAL_ID;
        overlay.style.cssText = 'position:fixed;inset:0;z-index:50000;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.82);backdrop-filter:blur(8px);padding:18px;box-sizing:border-box;';
        overlay.innerHTML =
            '<div style="width:min(420px,100%);background:#111;color:#fff;border:1px solid rgba(255,255,255,0.18);border-radius:18px;padding:22px;box-sizing:border-box;box-shadow:0 20px 60px rgba(0,0,0,0.5);font-family:inherit;">' +
                '<div style="display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:14px;">' +
                    '<div style="font-size:22px;font-weight:700;">' + escapeHtml(config.title) + '</div>' +
                    '<button type="button" id="xp-profile-close" style="background:none;border:none;color:#fff;font-size:26px;cursor:pointer;line-height:1;">×</button>' +
                '</div>' +
                '<div style="font-size:13px;opacity:0.72;line-height:1.45;margin-bottom:16px;">' + escapeHtml(config.subtitle || '') + '</div>' +
                '<label style="display:block;font-size:13px;opacity:0.82;margin-bottom:8px;">Name</label>' +
                '<input type="text" id="xp-profile-name" maxlength="20" value="' + escapeHtml(config.name) + '" style="width:100%;box-sizing:border-box;padding:12px 14px;border-radius:12px;border:1px solid rgba(255,255,255,0.2);background:#1b1b1b;color:#fff;outline:none;font:inherit;">' +
                (config.showAskToggle ? (
                    '<label style="display:flex;align-items:center;gap:10px;margin-top:16px;font-size:14px;cursor:pointer;">' +
                        '<input type="checkbox" id="xp-profile-ask" ' + (config.askEveryRecord ? 'checked' : '') + '>' +
                        '<span>Ask for name after each new record</span>' +
                    '</label>'
                ) : '') +
                '<div style="display:flex;gap:10px;margin-top:18px;">' +
                    '<button type="button" id="xp-profile-save" style="flex:1;padding:12px 14px;border:none;border-radius:12px;background:#f0c419;color:#111;font-weight:700;cursor:pointer;">Save</button>' +
                    (config.secondaryLabel ? '<button type="button" id="xp-profile-secondary" style="flex:1;padding:12px 14px;border:1px solid rgba(255,255,255,0.2);border-radius:12px;background:#1b1b1b;color:#fff;font-weight:700;cursor:pointer;">' + escapeHtml(config.secondaryLabel) + '</button>' : '') +
                '</div>' +
            '</div>';
        document.body.appendChild(overlay);

        const nameInput = document.getElementById('xp-profile-name');
        const askInput = document.getElementById('xp-profile-ask');
        const close = function () { removeModal(); };

        document.getElementById('xp-profile-close').onclick = close;
        overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
        nameInput.focus();
        nameInput.select();

        document.getElementById('xp-profile-save').onclick = function () {
            const name = (nameInput.value || '').trim();
            if (!name) {
                nameInput.style.borderColor = '#ff5c5c';
                nameInput.focus();
                return;
            }
            close();
            config.onSave({
                name: name,
                askEveryRecord: askInput ? askInput.checked : config.askEveryRecord
            });
        };

        if (config.secondaryLabel) {
            document.getElementById('xp-profile-secondary').onclick = function () {
                close();
                if (config.onSecondary) config.onSecondary();
            };
        }
    }

    window.XPPlayerProfile = {
        read: readProfile,
        save: saveProfile,
        getName: function (gameId, fallbackName) {
            return readProfile(gameId, fallbackName).name || fallbackName || 'Player';
        },
        shouldAsk: function (gameId) {
            return readProfile(gameId, '').askEveryRecord !== false;
        },
        openSettings: function (options) {
            const profile = readProfile(options.gameId, options.defaultName);
            showModal({
                title: options.title || 'Player Settings',
                subtitle: options.subtitle || 'Change the displayed player name.',
                name: profile.name || options.defaultName || '',
                askEveryRecord: profile.askEveryRecord,
                showAskToggle: options.showAskToggle !== false,
                onSave: function (next) {
                    const saved = saveProfile(options.gameId, next);
                    if (options.onSave) options.onSave(saved);
                }
            });
        },
        requestRecordIdentity: function (options) {
            const profile = readProfile(options.gameId, options.defaultName);
            const mustAsk = !profile.name || (options.showAskToggle !== false && profile.askEveryRecord !== false);
            if (!mustAsk) {
                if (options.onDone) options.onDone(saveProfile(options.gameId, profile));
                return;
            }
            showModal({
                title: options.title || 'Record Saved',
                subtitle: options.subtitle || 'Set the name that will appear in the leaderboard.',
                name: profile.name || options.defaultName || '',
                askEveryRecord: profile.askEveryRecord,
                showAskToggle: options.showAskToggle !== false,
                secondaryLabel: profile.name ? 'Use Current Name' : '',
                onSave: function (next) {
                    const saved = saveProfile(options.gameId, next);
                    if (options.onDone) options.onDone(saved);
                },
                onSecondary: function () {
                    if (options.onDone) options.onDone(saveProfile(options.gameId, profile));
                }
            });
        }
    };
})();
