// === SCHOOL RPG: REFACTORED JAVASCRIPT ===

// === LOCALIZATION & SOUND ===
const CONFIG = { lang: localStorage.getItem('school_rpg_lang') || 'ru', muted: localStorage.getItem('school_rpg_muted') === 'true' };

const STRINGS = {
    ru: {
        title: " ⚔️ ШКОЛЬНАЯ РПГ ⚔️", sub: "Ultimate Edition", sub2: "Ranked Fix: Precise Balance",
        auth_title: "Вход / Регистрация (Любой режим)", name_pl: "Имя (Логин)", pass_pl: "Пароль (для защиты)", btn_go: "ВОЙТИ / СОЗДАТЬ",
        m_story: "СЮЖЕТ", m_story_desc: "Уровень",
        m_pvp: "PvP", m_pvp_desc: "Игрок vs Игрок (1 экран)",
        m_endless: "БЕСКОНЕЧНЫЙ", m_endless_desc: "Выживание без лечения",
        m_shop: "МАГАЗИН СКИНОВ", m_shop_desc: "Трать RP на образы",
        m_daily: "ЕЖЕДНЕВНЫЙ БОНУС", daily_desc: "Заходи и получай RP!",
        m_bosses: "👹 ОТДЕЛЬНЫЕ БОССЫ",
        menu_modes: "РЕЖИМЫ",
        m_lb: "🏆 Таблица рекордов (Fair Play)", m_save: "💾 Сохранить в файл", m_load: "📂 Загрузить из файла", m_reset: "🔄 Сбросить прогресс",
        // Battle UI
        hp: "HP", mp: "MP", level: "УРОВЕНЬ", pvp_duel: "PvP ДУЭЛЬ", round: "РАУНД",
        battle_start: "Бой начинается!",
        win: "ПОБЕДА!", lose: "ПОТРАЧЕНО", draw: "НИЧЬЯ",
        you: "Ты", enemy: "Враг", p1: "Игрок 1", p2: "Игрок 2",
        used: "использует",
        menu_btn: "← Меню", equation: "УРАВНЕНИЕ",
        blocks_path: "преградил(а) путь!",
        // Skills & Items
        sk_0: "Подзатыльник", sk_1: "Фокус", sk_2: "Удар Ранцем", sk_3: "Звонок Маме",
        it_0: "Пирожок", it_1: "Шпора",
        // Bosses & Enemies
        en_egor: "Егор", en_vadim: "Вадим", en_marivanna: "Марьванна", en_larisa: "Лариса О.", en_director: "Дмитрий С.", en_music: "Лилия В.", en_natalia: "Наталья В.", en_makar: "Макар", en_baba: "Баба Валя",
        tit_shkolnik: "Школьник", tit_starshak: "Старшак", tit_zavuch: "ЗАВУЧ", tit_math: "МАТЕМАТИЧКА", tit_pupa: "ДИРЕКТОР", tit_music: "УЧИТЕЛЬ МУЗЫКИ", tit_scream: "КРИКУНЬЯ", tit_small: "МЕЛКИЙ ШКЕТ", tit_cleaner: "УБОРЩИЦА",
        boss_larisa: "Лариса Олеговна", boss_director: "Дмитрий Сергеевич", boss_music: "Лилия Васильевна", boss_natalia: "Наталья Викторовна",
        desc_larisa: "Математичка • Уравнения", desc_director: "Директор • Власть", desc_music: "Учитель Музыки • Песни", desc_natalia: "Крикунья • СПАМ X!", desc_makar: "Мелкий • Быстрый",
        // Modal & Misc
        p1_win: "ИГРОК 1 ПОБЕДИЛ!", p2_win: "ИГРОК 2 ПОБЕДИЛ!", nice_fight: "Славная битва!", rematch: "РЕВАНШ",
        sudden: "ВНЕЗАПНО...", baba_desc: "Появляется Баба Валя, недовольная шумом!", to_battle: "В БОЙ!",
        next_lvl: "СЛЕДУЮЩИЙ >>", game_beat: "Ты прошёл школу жизни!", game_beat_desc: "Поздравляем! Ты свободен.",
        wasted_desc: "Не расстраивайся, в школе всегда так.", try_again: "ЗАНОВО", menu: "В МЕНЮ", hp_bonus: " (+HP)",
        scream_start: "😱 НАТАЛЬЯ НАЧИНАЕТ КРИЧАТЬ!", recover: "Ты приходишь в себя...", equation_atk: "📐 Уравнение атакует!", stunned: "ОГЛУШЁН!", baba_plan: "Баба Валя что-то замышляет...",
        test_atk: "📐 КОНТРОЛЬНАЯ! (-MP, -HP)", minion_spawn: "Появилось Живое Уравнение!",
        // New Keys
        scream_title: "🗣️ БИТВА КРИКОВ! 🗣️", scream_instr: "ЖМИ КНОПКУ ЧТОБЫ ОРАТЬ!", scream_reflect: "ОТРАЖЕНО! Урон {dmg}!", scream_fail: "КРИК СНЕС ТЕБЯ! -{dmg} HP", scream_end: "Битва криков окончена!", baba_hit: "Ай! Не мешайся под ногами!",
        lb_title: "🏆 ТАБЛИЦА РЕКОРДОВ 🏆", lb_name: "Имя", lb_enemy: "Режим/Враг", lb_pts: "Очки", lb_all: "📜 Все записи", lb_wins: "🏆 Только победы", lb_losses: "💀 Только поражения", lb_close: "ЗАКРЫТЬ", lb_offline: "--- РЕЖИМ ОФФЛАЙН ---", lb_empty: "Записей нет.", lb_load_more: "ПОКАЗАТЬ ЕЩЁ (100)",
        endless_title: "♾️ БЕСКОНЕЧНЫЙ РЕЖИМ", endless_sub: "Выберите противника. HP/MP не восстанавливаются!", endless_rand: "Случайные", endless_cancel: "ОТМЕНА",
        reset_confirm: "Сбросить прогресс? (Рекорды останутся)",
        hc_title: "Вы уверены? Будет больно.", hc_yes: "Да, я готов(а)", hc_no: "Нет, я передумал(а)",
        // Story Dialogues
        d_egor: "Слушай, уйди, а? Если я не допишу его сочинение, меня в раздевалке закроют... И тетя Лариса съест за четверку!",
        d_vadim: "Зачем тронул Егора? Сотка есть? Нет? Тогда готовься к уроку «школьной жизни»! Завуч уже знает, что ты тут мутишь...",
        d_larisa: "Ты плохо влияешь на моего племянника! Он должен учиться, а не смотреть на твои выходки. Время интегралов!",
        d_makar: "Не поймаешь, тормоз! Я всё бабушке расскажу, и тебя завтра отчислят!",
        d_zavuch: "Макар, иди в кабинет, поешь суп... А ты... Твое личное дело уже у меня. Сейчас я выбью из тебя эту дурь!",
        d_music_adv: "Лилия Васильевна сказала: Просто кричи сильнее её! И уничтожишь её почти без реального боя!",
        d_music_boss: "Музыка должна звучать вечно. Ты — лишь шум, который я обязана заглушить своим искусством.",
        d_director: "Я... я провожу важное совещание! Живо в класс, иначе последствия будут крайне серьезными. Твоё поведение недопустимо.",
        d_baba: "Опять наследили! Я только что помыла! Сейчас я тобой пол протру!",
        d_director_win: "Спасибо... я просто хотел тишины... Но она... она не прощает пыль на подоконниках...",
        d_hint: "Кликни по экрану, чтобы продолжить...",
        // Hardcore (Dark) Dialogues
        dh_egor: "Егор? Забудь это имя. Я скормлю Вадима тете Ларисе, а тебя — им обоим, лишь бы этот кошмар закончился! В этой школе выживает только самый подлый!",
        dh_vadim: "Завуч боится меня, Директор прячется... А ты — просто кошелек на ножках. Я вытрясу из тебя не только сотку, но и всю душу!",
        dh_larisa: "Человечность — это погрешность. Мой племянник — неудачный эксперимент. А ты — ноль, на который я сейчас тебя разделю!",
        dh_makar: "Я вижу всё! Я знаю, где ты прячешься! Бабушка сотрет тебя в порошок, а я буду смеяться, глядя на твои слезы!",
        dh_zavuch: "Директор — жалкая марионетка. Я здесь закон! Макар — мои глаза, а ты — мусор, который я вымету из этой школы навсегда!",
        dh_music_adv: "Лилия Васильевна сказала: Ори так, чтобы у неё лопнули барабанные перепонки! Пусть её агония станет твоим финальным аккордом!",
        dh_music_boss: "Тишина — это единственная идеальная музыка. Я заставлю тебя замолчать навечно, и твой затухающий пульс станет моей последней нотой.",
        dh_director: "Мне не нужны подачки! Мне нужно полное подчинение! Эта школа — моя тюрьма, и я — ваш надзиратель. Живым из этого кабинета никто не выйдет!",
        dh_baba: "Пол залит кровью и слезами прошлых 'героев'. Я вычистила школу от сотен таких, как ты. Ты просто кусок мусора, который пора сжечь в котельной!",
        // Daily Rewards
        daily_title: "📅 ЕЖЕДНЕВНЫЕ НАГРАДЫ",
        daily_claim: "ЗАБРАТЬ",
        daily_claimed: "УЖЕ ПОЛУЧЕНО (Ждите завтра)",
        daily_streak_bonus: "БОНУС СЕРИИ",
        rp_balance: "БАЛАНС",
        // UI Elements
        close: "ЗАКРЫТЬ",
        day: "День",
        // Menu Elements
        shop_desc: "Трать RP на образы",
        daily_desc: "Заходи и получай RP!",
        defend: "ЗАЩИТА",
        defend_msg: "уходит в глухую оборону!",
        level_up: "НОВЫЙ УРОВЕНЬ!",
        boss_warn: "⚠️ ВНИМАНИЕ: БОСС ПРИБЛИЖАЕТСЯ! ⚠️",
        xp: "ОПЫТ",
        // NEW: Baba Valya buff messages
        baba_buff_on: "🧹 Баба Валя активировала МАКС.СИЛУ на этот бой!",
        baba_buff_off: "Бафф Бабы Вали снят. Характеристики восстановлены.",
        pvp_p1_dead: "Игрок 1 повержен! Бой окончен!"
    },
    en: {
        title: " ⚔️ SCHOOL RPG ⚔️", sub: "Ultimate Edition", sub2: "Ranked Fix: Precise Balance",
        auth_title: "Login / Register", name_pl: "Name (Login)", pass_pl: "Password (Optional)", btn_go: "LOGIN / CREATE",
        m_story: "STORY", m_story_desc: "Level",
        m_pvp: "PvP", m_pvp_desc: "Local Multiplayer",
        m_endless: "ENDLESS", m_endless_desc: "Survival (No Heals)",
        m_shop: "SKIN SHOP", m_shop_desc: "Spend RP on Skins",
        m_daily: "DAILY BONUS", daily_desc: "Login daily for RP!",
        m_bosses: "👹 BOSS BATTLES",
        menu_modes: "MODES",
        m_lb: "🏆 Leaderboard", m_save: "💾 Export Save", m_load: "📂 Import Save", m_reset: "🔄 Reset Progress",
        // Battle UI
        hp: "HP", mp: "MP", level: "LEVEL", pvp_duel: "PvP DUEL", round: "ROUND",
        battle_start: "Battle Starts!",
        win: "VICTORY!", lose: "WASTED", draw: "DRAW",
        you: "You", enemy: "Enemy", p1: "Player 1", p2: "Player 2",
        used: "uses",
        menu_btn: "← Menu", equation: "EQUATION",
        blocks_path: "blocks your path!",
        // Skills & Items
        sk_0: "Slap", sk_1: "Focus", sk_2: "Backpack Hit", sk_3: "Call Mom",
        it_0: "Pie", it_1: "Cheat Sheet",
        // Bosses
        en_egor: "Egor", en_vadim: "Vadim", en_marivanna: "Mary", en_larisa: "Mrs. Larisa", en_director: "The Principal", en_music: "Music Teacher", en_natalia: "Screamer", en_makar: "Makar", en_baba: "Cleaner Valya",
        tit_shkolnik: "Schoolboy", tit_starshak: "Bully", tit_zavuch: "HEAD TEACHER", tit_math: "MATH TEACHER", tit_pupa: "PRINCIPAL", tit_music: "MUSIC TEACHER", tit_scream: "THE SCREAMER", tit_small: "LITTLE KID", tit_cleaner: "THE CLEANER",
        boss_larisa: "Mrs. Larisa", boss_director: "Mr. Dmitry", boss_music: "Mrs. Lilia", boss_natalia: "Mrs. Natalia",
        desc_larisa: "Math • Equations", desc_director: "Principal • Power", desc_music: "Music • Songs", desc_natalia: "Screamer • SPAM X!", desc_makar: "Small • Fast",
        // Modal & Misc
        p1_win: "PLAYER 1 WINS!", p2_win: "PLAYER 2 WINS!", nice_fight: "Nice fight!", rematch: "REMATCH",
        sudden: "SUDDENLY...", baba_desc: "Cleaner Valya appears, angry at the noise!", to_battle: "FIGHT!",
        next_lvl: "NEXT >>", game_beat: "You beat the School of Life!", game_beat_desc: "Congrats! You are free.",
        wasted_desc: "Don't worry, school is always like this.", try_again: "TRY AGAIN", menu: "MENU", hp_bonus: " (+HP)",
        scream_start: "😱 NATALIA STARTS SCREAMING!", recover: "You recover...", equation_atk: "📐 Equation attacks!", stunned: "STUNNED!", baba_plan: "Cleaner Valya is plotting something...",
        test_atk: "📐 FINAL TEST! (-MP, -HP)", minion_spawn: "A Living Equation appears!",
        // New Keys
        scream_title: "🗣️ SCREAM BATTLE! 🗣️", scream_instr: "PRESS BUTTON TO SCREAM!", scream_reflect: "REFLECTED! Damage {dmg}!", scream_fail: "SCREAM BLEW YOU AWAY! -{dmg} HP", scream_end: "Scream battle is over!", baba_hit: "Ouch! Don't get under my feet!",
        lb_title: "🏆 LEADERBOARD 🏆", lb_name: "Name", lb_enemy: "Mode/Enemy", lb_pts: "PTS", lb_all: "📜 All Records", lb_wins: "🏆 Only Wins", lb_losses: "💀 Only Losses", lb_close: "CLOSE", lb_offline: "--- OFFLINE MODE ---", lb_empty: "No records.", lb_load_more: "LOAD MORE (100)",
        endless_title: "♾️ ENDLESS MODE", endless_sub: "Choose opponent. No HP/MP regen!", endless_rand: "Random", endless_cancel: "CANCEL",
        reset_confirm: "Reset progress? (Records will remain)",
        hc_title: "Are you sure? It will hurt.", hc_yes: "Yes, I am ready", hc_no: "No, I changed my mind",
        // Story Dialogues
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
        // Hardcore (Dark) Dialogues
        dh_egor: "Egor? Forget that name. I'll feed Vadim to Aunt Larisa, and you to both of them, just to end this nightmare! Only the most vicious survive here!",
        dh_vadim: "The Head Teacher is afraid of me, the Principal hides... And you're just a walking wallet. I'll squeeze more than a hundred out of you!",
        dh_larisa: "Humanity is an error. My nephew is a failed experiment. And you are the zero I'm about to divide you by!",
        dh_makar: "I see everything! I know where you sleep! Grandma will crush you, and I'll be the one laughing at your tears!",
        dh_zavuch: "The Principal is a pathetic puppet. I am the law! Makar is my eyes, and you are trash I'll sweep out of this school forever!",
        dh_music_adv: "Mrs. Lilia said: Scream until her eardrums burst! Let her agony be your final chord!",
        dh_music_boss: "Silence is the only perfect harmony. I will silence you forever, and your fading pulse will be my last note.",
        dh_director: "I don't need cookies! I need absolute submission! This school is my prison, and I am the warden. No one leaves my office alive!",
        dh_baba: "This floor is stained with the tears of past 'heroes'. I've cleaned out hundreds like you. You're just more trash for the furnace!",
        // Daily Rewards
        daily_title: "📅 DAILY REWARDS",
        daily_claim: "CLAIM",
        daily_claimed: "ALREADY CLAIMED (Wait for tomorrow)",
        daily_streak_bonus: "STREAK BONUS",
        rp_balance: "BALANCE",
        // UI Elements
        close: "CLOSE",
        day: "Day",
        // Menu Elements
        shop_desc: "Spend RP on Skins",
        daily_desc: "Login daily for RP!",
        defend: "DEFEND",
        defend_msg: "is playing defensively!",
        level_up: "LEVEL UP!",
        boss_warn: "⚠️ WARNING: BOSS APPROACHING! ⚠️",
        boss_seq_warn: "⚠️ WARNING! Beat easy enemies first to gain XP! The Head Teacher, Director, and Math Teacher are very strong!",
        xp: "XP",
        // NEW: Baba Valya buff messages
        baba_buff_on: "🧹 Cleaner Valya activated MAX POWER for this fight!",
        baba_buff_off: "Cleaner Valya's buff removed. Stats restored.",
        pvp_p1_dead: "Player 1 is down! Fight over!"
    },
    ru: {
        title: " ⚔️ ШКОЛЬНАЯ РПГ ⚔️", sub: "Ultimate Edition", sub2: "Ranked Fix: Precise Balance",
        auth_title: "ВХОД В АККАУНТ", name_pl: "Имя (ник)", pass_pl: "Пароль", btn_go: "ПОЕХАЛИ!",
        menu_modes: "ИГРОВЫЕ РЕЖИМЫ", m_story: "СЮЖЕТ", m_story_desc: "Пройди школу! Уровень", m_pvp: "PVP ДУЭЛЬ", m_pvp_desc: "Битва на одном ПК", m_endless: "БЕСКОНЕЧНЫЙ", m_endless_desc: "Сколько продержишься?",
        m_bosses: "БОССЫ", m_shop: "МАГАЗИН", m_shop_desc: "Купи скины", m_daily: "БОНУС", m_lb: "РЕКОРДЫ", m_save: "СОХРАНИТЬ", m_load: "ЗАГРУЗИТЬ", m_reset: "СБРОСИТЬ",
        battle_start: "БИТВА НАЧИНАЕТСЯ!",
        win: "ПОБЕДА!", lose: "ПОТРАЧЕНО", draw: "НИЧЬЯ",
        you: "Вы", enemy: "Враг", p1: "Игрок 1", p2: "Игрок 2",
        used: "использовал",
        menu_btn: "← Меню", equation: "УРАВНЕНИЕ",
        blocks_path: "преграждает путь!",
        sk_0: "Лещ", sk_1: "Фокус", sk_2: "Удар рюкзаком", sk_3: "Звонок маме",
        it_0: "Пирожок", it_1: "Шпаргалка",
        en_egor: "Егор", en_vadim: "Вадим", en_marivanna: "Марь Ванна", en_larisa: "Лариса (Завуч)", en_director: "Директор", en_music: "Математичка", en_natalia: "Скример", en_makar: "Макар", en_baba: "Баба Валя",
        tit_shkolnik: "Школьник", tit_starshak: "Старшак", tit_zavuch: "ЗАВУЧ", tit_math: "МАТЕМАТИЧКА", tit_pupa: "ДИРЕКТОР", tit_music: "УЧИТЕЛЬ МУЗЫКИ", tit_scream: "СКРИМЕРША", tit_small: "МЕЛКИЙ", tit_cleaner: "УБОРЩИЦА",
        boss_larisa: "Лариса Аркадьевна", boss_director: "Дмитрий Петрович", boss_music: "Лилия Степановна", boss_natalia: "Наталья Ивановна",
        desc_larisa: "Матеша • Уравнения", desc_director: "Директор • Власть", desc_music: "Музыка • Песни", desc_natalia: "Скример • СПАМЬ X!", desc_makar: "Мелкий • Быстрый",
        p1_win: "ИГРОК 1 ПОБЕДИЛ!", p2_win: "ИГРОК 2 ПОБЕДИЛ!", nice_fight: "Славная была битва!", rematch: "РЕВАНШ",
        sudden: "ВНЕЗАПНО...", baba_desc: "Баба Валя пришла, злая за шум!", to_battle: "В БОЙ!",
        next_lvl: "ДАЛЕЕ >>", game_beat: "Ты прошел Школу Жизни!", game_beat_desc: "Красавчик! Ты свободен.",
        wasted_desc: "Не расстраивайся, школа такая всегда.", try_again: "ЗАНОВО", menu: "МЕНЮ", hp_bonus: " (+ОЗ)",
        scream_start: "😱 НАТАЛЬЯ НАЧИНАЕТ ОРАТЬ!", recover: "Ты пришел в себя...", equation_atk: "📐 Уравнение атакует!", stunned: "ОГЛУШЕН!", baba_plan: "Баба Валя что-то замышляет...",
        test_atk: "📐 ИТОГОВЫЙ ТЕСТ! (-МП, -ОЗ)", minion_spawn: "Живое Уравнение!",
        scream_title: "🗣️ БИТВА ОРОВ! 🗣️", scream_instr: "ЖМИ КНОПКУ ОРА!", scream_reflect: "ОТРАЖЕНО! Урон {dmg}!", scream_fail: "ТЕБЯ СДУЛО КРИКОМ! -{dmg} ОЗ", scream_end: "Битва оров окончена!", baba_hit: "Ой! Не путайся под ногами!",
        lb_title: "🏆 ТАБЛИЦА ЛИДЕРОВ 🏆", lb_name: "Имя", lb_enemy: "Режим/Враг", lb_pts: "ОЧКИ", lb_all: "📜 Все Записи", lb_wins: "🏆 Только Победы", lb_losses: "💀 Только Поражения", lb_close: "ЗАКРЫТЬ", lb_offline: "--- ОФЛАЙН РЕЖИМ ---", lb_empty: "Нет записей.", lb_load_more: "ЗАГРУЗИТЬ ЕЩЕ (100)",
        endless_title: "♾️ БЕСКОНЕЧНЫЙ РЕЖИМ", endless_sub: "Выбери врага. Без регена ОЗ/МП!", endless_rand: "Случайно", endless_cancel: "ОТМЕНА",
        reset_confirm: "Сбросить прогресс? (Рекорды останутся)",
        hc_title: "Ты уверен? Будет больно.", hc_yes: "Да, я готов", hc_no: "Нет, я передумал",
        d_egor: "Пожалуйста, уйди! Если я не допишу ему сочинение, меня запрут... и тетя Лариса съест за тройку!",
        d_vadim: "Ты зачем Егора тронул? Сотка есть? Нет? Тогда готовься к уроку жизни! Завуч уже в курсе...",
        d_larisa: "Ты плохо влияешь на моего племянника! Он должен учиться, а не смотреть на тебя. Время интегралов!",
        d_makar: "Не поймаешь! Я всё бабушке расскажу, тебя завтра исключат!",
        d_zavuch: "Макар, иди в кабинет, поешь супа... А ты... Твое личное дело у меня на столе. Повыбиваю из тебя дурь!",
        d_music_adv: "Лилия Степановна сказала: Просто ори громче неё! И ты уничтожишь её почти без драки!",
        d_music_boss: "Музыка должна звучать вечно. Ты лишь шум, который я заглушу своим искусством.",
        d_director: "Я... провожу важное совещание! Живо в класс, иначе последствия будут крайне серьезными. Ваше поведение недопустимо.",
        d_baba: "Опять натоптали! Только помыла! Я из тебя сейчас половую тряпку сделаю!",
        d_director_win: "Спасибо... Я просто хотел тишины... Но она... она не прощает пыли на подоконниках...",
        d_hint: "Нажми в любое место, чтобы продолжить...",
        dh_egor: "Егор? Забудь это имя. Я скормлю Вадима тете Ларисе, а тебя обоим, лишь бы этот кошмар кончился! Здесь выживают только злейшие!",
        dh_vadim: "Завуч меня боится, директор прячется... А ты просто ходячий кошелек. Вытрясу из тебя больше, чем сотку!",
        dh_larisa: "Человечество — это ошибка. Мой племянник — неудачный эксперимент. А ты — ноль, на который я тебя сейчас разделю!",
        dh_makar: "Я всё вижу! Я знаю, где ты спишь! Бабушка тебя в порошок сотрет, а я буду смеяться над твоими слезами!",
        dh_zavuch: "Директор — жалкая марионетка. Я — закон! Макар — мои глаза, а ты — мусор, который я вымету из этой школы навсегда!",
        dh_music_adv: "Лилия Степановна сказала: Ори, пока у нее перепонки не лопнут! Пусть её агония будет твоим финальным аккордом!",
        dh_music_boss: "Тишина — единственная гармония. Я замолчу тебя навечно, и твой затихающий пульс будет моей последней нотой.",
        dh_director: "Мне не нужны печеньки! Мне нужно абсолютное подчинение! Эта школа — моя тюрьма, а я в ней — надзиратель. Из кабинета живым никто не выйдет!",
        dh_baba: "Этот пол полит слезами прошлых 'героев'. Я вычистила сотни таких. Ты просто очередной мусор для топки!",
        daily_title: "📅 ЕЖЕДНЕВНЫЕ НАГРАДЫ",
        daily_claim: "ЗАБРАТЬ",
        daily_claimed: "УЖЕ ЗАБРАНО (Жди завтра)",
        daily_streak_bonus: "БОНУС ЗА СЕРИЮ",
        rp_balance: "БАЛАНС",
        close: "ЗАКРЫТЬ",
        day: "День",
        shop_desc: "Трать RP на Скины",
        daily_desc: "Заходи каждый день за RP!",
        defend: "ЗАЩИТА",
        defend_msg: "уходит в глухую оборону!",
        level_up: "НОВЫЙ УРОВЕНЬ!",
        boss_warn: "⚠️ ВНИМАНИЕ: БОСС БЛИЗКО! ⚠️",
        boss_seq_warn: "⚠️ ВНИМАНИЕ! Сначала победи легких врагов, чтобы набрать XP! Завуч, Директор и Математичка очень сильны!",
        xp: "ОПЫТ",
        // NEW: Baba Valya buff messages
        baba_buff_on: "🧹 Баба Валя активировала МАКС.СИЛУ на этот бой!",
        baba_buff_off: "Бафф Бабы Вали снят. Характеристики восстановлены.",
        pvp_p1_dead: "Игрок 1 повержен! Бой окончен!"
    }
};

function t(key) { return STRINGS[CONFIG.lang][key] || key; }

function toggleLang() {
    CONFIG.lang = CONFIG.lang === 'ru' ? 'en' : 'ru';
    localStorage.setItem('school_rpg_lang', CONFIG.lang);
    document.getElementById('lang-btn').textContent = CONFIG.lang.toUpperCase();
    updateAllTexts();
    location.reload();
}

function updateAllTexts() {
    // Update page title
    const pageTitle = document.getElementById('page-title');
    if (pageTitle) pageTitle.textContent = t('title') + ': Ultimate';

    // Update menu title
    const menuTitle = document.getElementById('menu-title');
    if (menuTitle) menuTitle.innerHTML = t('title') + '<br>' + t('sub');

    // Update shop elements
    const shopName = document.getElementById('shop-name');
    if (shopName) shopName.textContent = t('m_shop');
    const shopDesc = document.getElementById('shop-desc');
    if (shopDesc) shopDesc.textContent = t('shop_desc');

    // Update daily elements
    const dailyName = document.getElementById('daily-name');
    if (dailyName) dailyName.textContent = t('m_daily') || 'ЕЖЕДНЕВНЫЙ БОНУС';
    const dailyDesc = document.getElementById('daily-desc');
    if (dailyDesc) dailyDesc.textContent = t('daily_desc');

    // Update daily modal title
    const dailyTitle = document.getElementById('daily-title');
    if (dailyTitle) dailyTitle.textContent = t('daily_title');

    // Update shop balance
    const shopBalance = document.getElementById('shop-balance');
    if (shopBalance) shopBalance.innerHTML = `${t('rp_balance')}: <span id="shop-rp-display">${userProfile.rp}</span> RP`;

    // Update close buttons
    document.querySelectorAll('.modal-btn').forEach(btn => {
        if (btn.textContent.includes('ЗАКРЫТЬ') || btn.textContent.includes('CLOSE')) {
            btn.textContent = t('close');
        }
    });
}

// === SOUND SYSTEM ===
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const Sound = {
    playTone: (freq, type, duration, vol = 0.1) => {
        if (CONFIG.muted || audioCtx.state === 'suspended') { audioCtx.resume().catch(e => console.log(e)); if (CONFIG.muted) return; }
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(vol, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
        osc.connect(gain); gain.connect(audioCtx.destination);
        osc.start(); osc.stop(audioCtx.currentTime + duration);
    },
    hit: () => { Sound.playTone(150, 'sawtooth', 0.1, 0.2); setTimeout(() => Sound.playTone(100, 'square', 0.1, 0.2), 50); },
    attack: () => Sound.playTone(300, 'square', 0.05, 0.1),
    heal: () => {
        if (CONFIG.muted) return;
        const osc = audioCtx.createOscillator(); const gain = audioCtx.createGain();
        osc.frequency.setValueAtTime(400, audioCtx.currentTime); osc.frequency.linearRampToValueAtTime(800, audioCtx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime); gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.3);
        osc.connect(gain); gain.connect(audioCtx.destination); osc.start(); osc.stop(audioCtx.currentTime + 0.3);
    },
    click: () => Sound.playTone(600, 'sine', 0.05, 0.05),
    win: () => { Sound.playTone(500, 'square', 0.1); setTimeout(() => Sound.playTone(700, 'square', 0.2), 150); setTimeout(() => Sound.playTone(900, 'square', 0.4), 300); },
    lose: () => { Sound.playTone(400, 'sawtooth', 0.3); setTimeout(() => Sound.playTone(300, 'sawtooth', 0.3), 300); },
    bgm: () => { /* Placeholder for BGM logic if needed */ }
};

function toggleMute() {
    CONFIG.muted = !CONFIG.muted;
    localStorage.setItem('school_rpg_muted', CONFIG.muted);
    document.getElementById('mute-btn').textContent = CONFIG.muted ? '🔇' : '🔊';
}

// === SKINS DATA ===
const SKINS = [
    { id: 'default', icon: '😎', cost: 0, name: 'Ученик', name_en: 'Student' },
    { id: 'nerd', icon: '🤓', cost: 500, name: 'Ботан', name_en: 'Nerd' },
    { id: 'muscles', icon: '💪', cost: 1200, name: 'Качок', name_en: 'Jock' },
    { id: 'cool', icon: '🕶️', cost: 2500, name: 'Крутой', name_en: 'Cool Guy' },
    { id: 'robot', icon: '🤖', cost: 4000, name: 'Робот', name_en: 'Robot' },
    { id: 'custom', icon: '🖼️', cost: 10000, name: 'СВОЁ ФОТО', type: 'image', name_en: 'CUSTOM PHOTO' }
];

// === CONSTANTS ===
const XP_TABLE = [0, 100, 250, 500, 1000, 2000, 4000, 8000, 15000, 30000];
let PLAYER_MAX_HP = 120;
let PLAYER_MAX_MP = 100;

// === NEW: Baba Valya temporary buff storage ===
let babaValyaBuffActive = false;
let preBuffStats = {
    level: 1,
    maxHp: 120,
    maxMp: 100
};

// === ENEMIES DATA (With Emoji Phases) ===
const STORY_ENEMIES = [
    { name: "Егор", title: "Школьник", hp: 150, sprite: "😈", phases: { 100: "😈", 50: "😠", 20: "😭" }, xp_txt: "Егор убежал жаловаться!", xp_txt_en: "Egor ran to complain!", moves: [{ name: "Плюнуть", dmg: [8, 12], msg: "Егор плюётся!", msg_en: "Egor spits!" }, { name: "Нытье", drain: 15, msg: "Егор ноет! Ты теряешь MP.", msg_en: "Egor whines! You lose MP." }, { name: "Удар линейкой", dmg: [12, 18], msg: "Егор достаёт линейку!", msg_en: "Egor pulls out a ruler!" }] },
    { name: "Вадим", title: "Старшак", hp: 250, sprite: "🦍", phases: { 100: "🦍", 50: "🐒", 20: "🤕" }, xp_txt: "Вадим отдал мелочь и ушёл.", xp_txt_en: "Vadim gave back the change and left.", moves: [{ name: "Бычка", dmg: [15, 25], msg: "Вадим быкует!", msg_en: "Vadim bullies you!" }, { name: "Подсечка", dmg: [10, 15], stun: 0.3, msg: "Вадим делает подсечку!", msg_en: "Vadim trips you!" }, { name: "Энергетик", heal: [20, 30], msg: "Вадим пьёт энергетик.", msg_en: "Vadim drinks an energy drink." }] },
    { name: "Марьванна", title: "ЗАВУЧ", hp: 400, sprite: "👺", phases: { 100: "👺", 50: "👹", 20: "🤬" }, xp_txt: "Школа захвачена! Ты герой!", xp_txt_en: "School is taken over! You are a hero!", moves: [{ name: "КРИК", dmg: [20, 30], msg: "ГРОМКИЙ КРИК!", msg_en: "LOUD SCREAM!" }, { name: "Двойка", dmg: [35, 50], msg: "Критический удар по будущему!", msg_en: "Critical hit on your future!" }, { name: "Вызов родителей", dmg: [60, 80], msg: "ОНА ЗВОНИТ РОДИТЕЛЯМ!", msg_en: "SHE IS CALLING YOUR PARENTS!" }] }
];

const EXTRA_BOSSES = {
    larisa: { name: "Лариса Олеговна", title: "МАТЕМАТИЧКА", hp: 350, sprite: "👩‍🏫", phases: { 100: "👩‍🏫", 50: "🤯", 20: "🧟‍♀️" }, special: "equation", equationBar: 0, equationMax: 100, equationPerTurn: 15, equationPerSecond: 2, xp_txt: "Лариса Олеговна отпустила тебя!", xp_txt_en: "Mrs. Larisa let you go!", moves: [{ name: "Мелом в лоб", dmg: [12, 18], msg: "Летит мел!", msg_en: "Chalk incoming!" }, { name: "Сложная задача", dmg: [15, 22], drain: 10, msg: "Мозг кипит!", msg_en: "Brain overheat!" }, { name: "Двойка", dmg: [20, 30], msg: "Двойка в журнал!", msg_en: "F grade in the register!" }] },
    director: { name: "Дмитрий Сергеевич", title: "ДИРЕКТОР", hp: 500, sprite: "🎩", phases: { 100: "🎩", 50: "👔", 20: "💀" }, special: "director", xp_txt: "Директор пожал тебе руку!", xp_txt_en: "The Director shook your hand!", customItems: [{ name: "Пирожок", heal: 60 }, { name: "Вера в себя", buff: 1.5 }], customInventory: [2, 1], moves: [{ name: "Выговор", dmg: [18, 28], msg: "Директор делает выговор!", msg_en: "Director reprimands you!" }, { name: "Печать", dmg: [30, 45], msg: "Угрожает отчислением!", msg_en: "Threatens expulsion!" }, { name: "На ковёр", dmg: [25, 35], drain: 15, msg: "Вызывает на ковёр!", msg_en: "Calls you to the office!" }, { name: "Указ", heal: [40, 60], msg: "Директор восстанавливается!", msg_en: "Director restores health!" }] },
    music: { name: "Лилия Васильевна", title: "УЧИТЕЛЬ МУЗЫКИ", hp: 280, sprite: "🎵", phases: { 100: "🎵", 50: "🎶", 20: "🔇" }, special: "music", drainPerSecond: 2, xp_txt: "Поставила пятёрку!", xp_txt_en: "Gave you an A!", moves: [{ name: "Высокая нота", dmg: [10, 15], msg: "♪ Ла-ла-ЛААА! ♪", msg_en: "♪ La-la-LAAA! ♪" }, { name: "Припев", dmg: [8, 12], hits: 2, msg: "♫ Поёт два раза! ♫", msg_en: "♫ Sings twice! ♫" }, { name: "Соло", dmg: [20, 30], msg: "🎤 Мощное соло!", msg_en: "🎤 Powerful solo!" }, { name: "Колыбельная", dmg: [5, 10], stun: 0.4, msg: "♪ Баю-бай... ♪", msg_en: "♪ Hush little baby... ♪" }] },
    natalia: { name: "Наталья Викторовна", title: "КРИКУНЬЯ", hp: 320, sprite: "😱", phases: { 100: "😱", 50: "🤬", 20: "😵" }, special: "scream", screamChance: 0.35, xp_txt: "Наталья потеряла голос!", xp_txt_en: "Natalia lost her voice!", moves: [{ name: "Замечание", dmg: [12, 18], msg: "Делает замечание!", msg_en: "Makes a remark!" }, { name: "Претензия", dmg: [15, 22], msg: "Высказывает претензии!", msg_en: "Expresses complaints!" }, { name: "Угроза", dmg: [20, 28], drain: 8, msg: "Угрожает последствиями!", msg_en: "Threatens consequences!" }] },
    makar: { name: "Макар", title: "МЕЛКИЙ ШКЕТ", hp: 180, sprite: "👦", phases: { 100: "👦", 50: "🥺", 20: "👶" }, special: "dodge", dodgeChance: 0.35, multiAttack: true, xp_txt: "Макар убежал плакать!", xp_txt_en: "Makar ran away crying!", moves: [{ name: "Пинок", dmg: [5, 8], msg: "Пинается!", msg_en: "Kicks!" }, { name: "Укус", dmg: [6, 10], msg: "Кусается!", msg_en: "Bites!" }, { name: "Плевок", dmg: [4, 7], msg: "Плюётся!", msg_en: "Spits!" }] },
    baba_valya: { name: "Баба Валя", title: "УБОРЩИЦА", hp: 666, sprite: "🧹", phases: { 100: "🧹", 50: "🪣", 20: "☠️" }, special: "baba_valya", isBabaValya: true, xp_txt: "Баба Валя ушла... оставив за собой идеальную чистоту.", xp_txt_en: "Cleaner Valya left... leaving behind perfect cleanliness.", moves: [{ name: "Мокрая Тряпка", dmg: [30, 40], msg: "Баба Валя запускает в тебя мокрой тряпкой!", msg_en: "Throws a wet rag at you!" }, { name: "Удар Шваброй", dmg: [40, 55], stun: 0.1, msg: "Мощный удар шваброй!", msg_en: "Powerful mop hit!" }, { name: "Ведро на Голову", dmg: [60, 70], msg: "На голову падает ведро с водой!", msg_en: "A bucket of water falls on your head!" }] }
};

const BASE_SKILLS = [{ name: "Подзатыльник", cost: 0, dmg: [10, 15] }, { name: "Фокус", cost: -40, dmg: [0, 0] }, { name: "Удар Ранцем", cost: 35, dmg: [30, 45] }, { name: "Звонок Маме", cost: 80, dmg: [70, 100], icon: "📞" }];
const BASE_ITEMS = [{ name: "Пирожок", heal: 60 }, { name: "Шпора", buff: 1.5 }];

// === STATE ===
let state = {
    playerName: '', hardcore: false, storyLevel: 0, storyHp: PLAYER_MAX_HP, storyMp: 50, storyInventory: [1, 1],
    hp: PLAYER_MAX_HP, mp: 50, inventory: [1, 1], items: [...BASE_ITEMS], skills: [...BASE_SKILLS],
    buffDamage: 1, enemyHp: 100, currentEnemy: null, currentMode: 'story', turn: 'player', gameOver: false, stunned: false, battleStartTime: null,
    speedrunTime: 0, speedrunInterval: null, isSpeedrunPaused: true,
    equationBar: 0, minionHp: 0, minionMaxHp: 50, hasMinionActive: false, pendingSkill: null, idleTimer: null, musicTimer: null,
    screamActive: false, screamPlayerPower: 50, screamTimer: 15, screamInterval: null, screamDamageToPlayer: 0, screamDamageToEnemy: 0,
    // Endless & PvP
    endlessRound: 0, endlessType: null,
    pvpMp: 50, pvpInventory: [1, 1],
    // RPG Features
    level: 1, xp: 0, defending: false,
    defeatedEnemies: []
};

// === NEW: USER ACCOUNT STATE ===
let userProfile = {
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
    const savedP = localStorage.getItem('schoolRpgProfile');
    if (savedP) userProfile = { ...userProfile, ...JSON.parse(savedP), loggedIn: true };
} catch (e) { }

// === ELEMENTS ===
const el = {
    menuScreen: document.getElementById('menu-screen'), nameInputContainer: document.getElementById('name-input-container'), mainMenuContainer: document.getElementById('main-menu-container'), hardcoreModal: document.getElementById('hardcore-modal'), gameWrapper: document.getElementById('game-wrapper'), speedrunTimer: document.getElementById('speedrun-timer'),
    babaValyaAttacksContainer: document.getElementById('baba-valya-attacks-container'), arena: document.getElementById('arena'),
    pSprite: document.getElementById('player-sprite'), pImg: document.getElementById('player-custom-img'), eSprite: document.getElementById('enemy-sprite'),
    pHpBar: document.getElementById('p-hp-bar'), pMpBar: document.getElementById('p-mp-bar'), pHpTxt: document.getElementById('p-hp-txt'), pMpTxt: document.getElementById('p-mp-txt'),
    eHpBar: document.getElementById('e-hp-bar'), eHpTxt: document.getElementById('e-hp-txt'), eMpBar: document.getElementById('e-mp-bar'), eMpTxt: document.getElementById('e-mp-txt'),
    eName: document.getElementById('e-name-ui'), log: document.getElementById('log'), modal: document.getElementById('modal'),
    btns: [0, 1, 2, 3].map(i => document.getElementById(`btn-${i}`)), items: [0, 1].map(i => ({ btn: document.getElementById(`item-${i}`), count: document.getElementById(`count-${i}`) })),
    levelDisplay: document.getElementById('level-display'), enemyNameDisplay: document.getElementById('enemy-name-display'), specialBarContainer: document.getElementById('special-bar-container'), specialBarVal: document.getElementById('special-bar-val'), specialBarPercent: document.getElementById('special-bar-percent'), minionContainer: document.getElementById('minion-container'), minionHpBar: document.getElementById('minion-hp-bar'), targetSelection: document.getElementById('target-selection'),
    screamOverlay: document.getElementById('scream-overlay'), screamBarPlayer: document.getElementById('scream-bar-player'), screamBarEnemy: document.getElementById('scream-bar-enemy'), screamTimer: document.getElementById('scream-timer'), screamKey: document.getElementById('scream-key'), screamDmgPlayer: document.getElementById('scream-dmg-player'), screamDmgEnemy: document.getElementById('scream-dmg-enemy'),
    leaderboardModalFull: document.getElementById('leaderboard-modal'), leaderboardTable: document.getElementById('leaderboard-table').getElementsByTagName('tbody')[0],
    endlessModal: document.getElementById('endless-modal'), actionPanel: document.getElementById('action-panel'),
    // New UI Elements
    authSection: document.getElementById('auth-section'), shopModal: document.getElementById('shop-modal'), shopGrid: document.getElementById('shop-grid'),
    rpDisplay: document.getElementById('rp-display'), shopRpDisplay: document.getElementById('shop-rp-display'),
    dailyModal: document.getElementById('daily-modal'),
    bubblePlayer: document.getElementById('bubble-player'), bubbleEnemy: document.getElementById('bubble-enemy')
};

// === HELPERS ===
function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function log(msg) { if (el.log) el.log.textContent = msg; }

function resetBattleState() {
    if (state.idleTimer) clearInterval(state.idleTimer);
    if (state.musicTimer) clearInterval(state.musicTimer);
    if (state.screamInterval) clearInterval(state.screamInterval);
    pauseTimer();
    state.idleTimer = null; state.musicTimer = null; state.screamInterval = null;
    state.equationBar = 0; state.screamActive = false; state.hasMinionActive = false; state.minionHp = 0; state.stunned = false;
    el.screamOverlay.classList.remove('show'); el.minionContainer.classList.remove('show'); el.targetSelection.classList.remove('show'); el.babaValyaAttacksContainer.innerHTML = ''; el.specialBarContainer.classList.remove('show');
    el.gameWrapper.classList.remove('pvp-mode');
    // Reset player sprite direction in case it was flipped in PvP
    el.eSprite.style.transform = 'scaleX(1)';
    el.pSprite.classList.remove('dead'); el.pImg.classList.remove('dead'); el.eSprite.classList.remove('dead');

    // NEW: Remove Baba Valya buff when leaving battle
    removeBabaValyaBuff();
}

// === NEW: Baba Valya Buff Functions (Temporary, only for this fight) ===
function applyBabaValyaBuff() {
    // Save current real stats before buffing
    preBuffStats.level = state.level;
    preBuffStats.maxHp = PLAYER_MAX_HP;
    preBuffStats.maxMp = PLAYER_MAX_MP;

    // Calculate the max level that normal grinding could achieve
    // (This is what the old code did: set level to max)
    const buffLevel = XP_TABLE.length - 1;
    const buffMaxHp = 120 + (buffLevel * 20);
    const buffMaxMp = 100 + (buffLevel * 10);

    // Apply temporary buff
    PLAYER_MAX_HP = buffMaxHp;
    PLAYER_MAX_MP = buffMaxMp;
    state.hp = PLAYER_MAX_HP;
    state.mp = PLAYER_MAX_MP;
    state.inventory[0] = Math.max(state.inventory[0], 2); // Give 2 pies minimum

    babaValyaBuffActive = true;
    log(t('baba_buff_on'));
}

function removeBabaValyaBuff() {
    if (!babaValyaBuffActive) return;

    // Restore original stats
    PLAYER_MAX_HP = preBuffStats.maxHp;
    PLAYER_MAX_MP = preBuffStats.maxMp;
    // Note: state.level is NOT changed by the buff — it was only for HP/MP scaling
    // The old code set state.level = max which was the bug

    babaValyaBuffActive = false;
    console.log(t('baba_buff_off'));
}

// === MAIN LOGIC ===
function updateMenuStats() {
    // Localization Updates - WRAPPED IN CHECKS
    const titleEl = document.querySelector('.menu-title');
    if (titleEl) titleEl.innerHTML = t('title') + '<br>' + t('sub');

    const sub2 = document.getElementById('menu-subtitle');
    if (sub2) sub2.textContent = t('sub2');

    const titles = document.querySelectorAll('.menu-section-title');
    if (titles[0]) titles[0].textContent = t('auth_title');

    const authName = document.getElementById('auth-name');
    if (authName) authName.placeholder = t('name_pl');
    const authPass = document.getElementById('auth-pass');
    if (authPass) authPass.placeholder = t('pass_pl');

    const authBtn = document.querySelector('.menu-btn.story .name');
    if (authBtn) authBtn.textContent = t('btn_go');

    if (titles[1]) titles[1].textContent = t('menu_modes');
    if (titles[2]) titles[2].textContent = t('m_bosses');

    // Menu Buttons - Modes
    const storyBtn = document.querySelector('.menu-btn.story');
    if (storyBtn) {
        const allStoryBtns = document.querySelectorAll('.menu-btn.story');
        if (allStoryBtns.length > 1) {
            const modeBtn = allStoryBtns[1];
            const n = modeBtn.querySelector('.name'); if (n) n.textContent = t('m_story');
            const d = modeBtn.querySelector('.desc');
            if (d) {
                const level = state.storyLevel >= STORY_ENEMIES.length ? t('win') : (t('m_story_desc') + " " + (state.storyLevel + 1));
                d.textContent = level;
            }
        }
    }

    const pvpBtn = document.querySelector('.menu-btn.pvp');
    if (pvpBtn) {
        const n = pvpBtn.querySelector('.name'); if (n) n.textContent = t('m_pvp');
        const d = pvpBtn.querySelector('.desc'); if (d) d.textContent = t('m_pvp_desc');
    }
    const endlessBtn = document.querySelector('.menu-btn.endless');
    if (endlessBtn) {
        const n = endlessBtn.querySelector('.name'); if (n) n.textContent = t('m_endless');
        const d = endlessBtn.querySelector('.desc'); if (d) d.textContent = t('m_endless_desc');
    }

    // Shop button
    const shopBtn = document.getElementById('btn-shop');
    if (shopBtn) {
        const n = shopBtn.querySelector('.name'); if (n) n.textContent = t('m_shop');
        const d = shopBtn.querySelector('.desc'); if (d) d.textContent = t('m_shop_desc');
    }

    // Daily bonus button
    const dailyBtn = document.getElementById('btn-daily');
    if (dailyBtn) {
        const n = dailyBtn.querySelector('.name'); if (n) n.textContent = t('m_daily');
        const d = dailyBtn.querySelector('.desc'); if (d) d.textContent = t('daily_desc');
    }

    // Boss buttons
    const bossMap = [
        { id: 'btn-larisa', name: 'boss_larisa', desc: 'desc_larisa' },
        { id: 'btn-director', name: 'boss_director', desc: 'desc_director' },
        { id: 'btn-music', name: 'boss_music', desc: 'desc_music' },
        { id: 'btn-natalia', name: 'boss_natalia', desc: 'desc_natalia' },
        { id: 'btn-makar', name: 'en_makar', desc: 'desc_makar' }
    ];
    bossMap.forEach(b => {
        const btn = document.getElementById(b.id);
        if (btn) {
            const n = btn.querySelector('.name'); if (n) n.textContent = t(b.name);
            const d = btn.querySelector('.desc'); if (d) d.textContent = t(b.desc);
        }
    });

    // Bottom buttons
    const lbBtn = document.getElementById('btn-lb'); if (lbBtn) lbBtn.textContent = t('m_lb');
    const saveBtn = document.getElementById('btn-save'); if (saveBtn) saveBtn.textContent = t('m_save');
    const loadBtn = document.getElementById('btn-load'); if (loadBtn) loadBtn.textContent = t('m_load');
    const resetBtn = document.getElementById('btn-reset'); if (resetBtn) resetBtn.textContent = t('m_reset');

    // Standard Stats UI
    const nameDisp = document.getElementById('player-name-display');
    if (nameDisp) nameDisp.textContent = state.playerName || userProfile.name || "HRDCR";

    const mHp = document.getElementById('menu-hp'); if (mHp) mHp.textContent = Math.floor(state.storyHp);
    const mMp = document.getElementById('menu-mp'); if (mMp) mMp.textContent = Math.floor(state.storyMp);
    const mI0 = document.getElementById('menu-item-0'); if (mI0) mI0.textContent = `x${state.storyInventory[0]}`;
    const mI1 = document.getElementById('menu-item-1'); if (mI1) mI1.textContent = `x${state.storyInventory[1]}`;

    if (el.rpDisplay) el.rpDisplay.textContent = userProfile.rp;
}

function attemptLogin() {
    let name = document.getElementById('auth-name').value.trim();
    const pass = document.getElementById('auth-pass').value.trim();

    // NEW: If name is empty, Prompt Hardcore Guest Mode
    if (!name) {
        window.isAnonymousLogin = true;

        // Show Confirmation
        document.getElementById('hc-title').textContent = t('hc_title');
        document.getElementById('hardcore-yes').textContent = t('hc_yes');
        document.getElementById('hardcore-no').textContent = t('hc_no');
        el.hardcoreModal.classList.add('show');
        return;
    }

    document.getElementById('auth-msg').textContent = "Вход...";
    if (window.loginOrRegister) {
        window.loginOrRegister(name, pass);
    } else {
        fallbackLogin(name, pass);
    }
}

function logout() { location.reload(); }

function goToMenu() { resetBattleState(); el.menuScreen.classList.remove('hidden'); el.gameWrapper.style.display = 'none'; el.modal.classList.remove('show'); resetTimer(); updateMenuStats(); saveProgress(); }

function showEndlessMenu() {
    el.endlessModal.classList.add('show');
    document.getElementById('endless-title').textContent = t('endless_title');
    document.getElementById('endless-sub').textContent = t('endless_sub');
    const cBtn = document.getElementById('btn-endless-cancel'); if (cBtn) cBtn.textContent = t('endless_cancel');

    const btns = el.endlessModal.querySelectorAll('.selection-btn');
    btns.forEach(btn => {
        const sp = btn.querySelectorAll('span')[1];
        if (sp) {
            const txt = sp.textContent;
            if (txt.includes('Случайные') || txt.includes('Random')) sp.textContent = t('endless_rand');
            else sp.textContent = getLocName(txt);
        }
    });
}

function startEndless(type) {
    el.endlessModal.classList.remove('show');
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
    state.turn = 'player'; // Player 1 starts
    startBattle('pvp');
}

async function startBattle(mode) {
    resetBattleState();
    state.gameOver = false; state.turn = 'player'; state.defending = false;
    state.currentMode = mode;
    el.menuScreen.classList.add('hidden');
    el.gameWrapper.style.display = 'block';
    state.battleStartTime = Date.now();
    if (state.isSpeedrunPaused) resetTimer(); startTimer();
    state.buffDamage = 1; state.skills = JSON.parse(JSON.stringify(BASE_SKILLS)); state.items = JSON.parse(JSON.stringify(BASE_ITEMS));

    const eb = EXTRA_BOSSES[mode];
    if ((eb && (mode === 'larisa' || mode === 'director')) || (mode === 'story' && state.storyLevel >= 2)) {
        log(t('boss_seq_warn'));
    } else if ((eb && eb.isBoss) || (mode === 'story' && STORY_ENEMIES[state.storyLevel].isBoss)) {
        log(t('boss_warn'));
    }

    // NEW: Baba Valya buff is now TEMPORARY (only for this fight)
    if (mode === 'baba_valya') {
        applyBabaValyaBuff();
    }

    // APPLY SKIN
    const currentSkinId = userProfile.currentSkin || 'default';
    const skinData = SKINS.find(s => s.id === currentSkinId) || SKINS[0];

    if (skinData.type === 'image' && userProfile.customImage) {
        el.pSprite.style.display = 'none';
        el.pImg.style.display = 'block';
        el.pImg.src = userProfile.customImage;
    } else {
        el.pImg.style.display = 'none';
        el.pSprite.style.display = 'block';
        el.pSprite.textContent = skinData.icon;
    }

    let enemyData;

    el.bubblePlayer.style.display = 'none';
    el.bubbleEnemy.style.display = 'none';

    if (mode === 'story') {
        if (state.storyLevel >= STORY_ENEMIES.length) {
            alert(t('game_beat'));
            goToMenu();
            return;
        }
        enemyData = JSON.parse(JSON.stringify(STORY_ENEMIES[state.storyLevel]));
        state.hp = state.storyHp; state.mp = state.storyMp; state.inventory = [...state.storyInventory];
        if (state.hp <= 0) state.hp = PLAYER_MAX_HP; // Safety fix for 0 HP bug
        el.levelDisplay.textContent = `${t('m_story')} ${state.storyLevel + 1}`;
    }
    else if (mode === 'endless') {
        state.endlessRound++;
        // Don't reset HP/MP here, they carry over

        if (state.endlessType === 'random') {
            const pool = [...STORY_ENEMIES, ...Object.values(EXTRA_BOSSES).filter(b => !b.isBabaValya)];
            enemyData = JSON.parse(JSON.stringify(pool[rand(0, pool.length - 1)]));
        }
        else if (state.endlessType.startsWith('story_')) {
            const index = parseInt(state.endlessType.split('_')[1]);
            enemyData = JSON.parse(JSON.stringify(STORY_ENEMIES[index]));
        }
        else {
            enemyData = JSON.parse(JSON.stringify(EXTRA_BOSSES[state.endlessType]));
        }

        // Increase enemy stats per round
        const scale = 1 + (state.endlessRound * 0.1);
        enemyData.hp = Math.floor(enemyData.hp * scale);
        enemyData.name = `${enemyData.name} (R${state.endlessRound})`;
        el.levelDisplay.textContent = `${t('round')} ${state.endlessRound}`;

        // Check for special mechanics using properties, not mode string
        if (enemyData.special === 'equation') { el.specialBarContainer.classList.add('show'); state.equationBar = 0; updateSpecialBar(); startIdleTimer(); }
        if (enemyData.special === 'music') startMusicTimer();
        if (enemyData.special === 'director') {
            // Director has special items, but in endless we keep player items constant for challenge, 
            // OR we can give the player the Director's buffs. Let's keep challenge.
            // But we should enable his special skill if he is the enemy? No, skills are player's.
            // Wait, in boss mode director gave specific items. In endless, let's keep base items for challenge.
        }
    }
    else if (mode === 'pvp') {
        el.gameWrapper.classList.add('pvp-mode');
        el.levelDisplay.textContent = t('pvp_duel');
        enemyData = { name: t('p2'), title: CONFIG.lang === 'en' ? "OPPONENT" : "ОППОНЕНТ", hp: PLAYER_MAX_HP, sprite: "🧢", moves: [] }; // Moves not used in PvP
        // Flip enemy sprite to look left
        el.eSprite.style.transform = 'scaleX(-1)';
    }
    else {
        enemyData = JSON.parse(JSON.stringify(EXTRA_BOSSES[mode]));
        // NEW: Don't reset HP/MP if baba_valya (buff already applied above)
        if (mode !== 'baba_valya') {
            state.hp = PLAYER_MAX_HP; state.mp = 50; state.inventory = [1, 1];
        }
        el.levelDisplay.textContent = CONFIG.lang === 'en' ? 'BOSS' : 'БОСС';
        if (mode === 'larisa') { el.specialBarContainer.classList.add('show'); state.equationBar = 0; updateSpecialBar(); startIdleTimer(); }
        if (mode === 'music') startMusicTimer();
        if (mode === 'director') { state.inventory = [...enemyData.customInventory]; state.items = JSON.parse(JSON.stringify(enemyData.customItems)); state.skills[3] = { name: "Сильный Аргумент", cost: 80, dmg: [70, 100], icon: "💪" }; }
    }

    if (state.hardcore && !enemyData.isBabaValya && mode !== 'pvp') enemyData.hp = Math.round(enemyData.hp * 1.2);

    state.currentEnemy = enemyData; state.enemyHp = state.currentEnemy.hp;
    el.eSprite.textContent = state.currentEnemy.sprite; el.eSprite.classList.remove('dead'); el.pSprite.classList.remove('dead');
    el.eName.textContent = state.currentEnemy.name; el.enemyNameDisplay.textContent = state.currentEnemy.title;
    el.modal.classList.remove('show');

    state.enemy = enemyData;
    updateUI();

    // === STORY DIALOGUES (Show after setup) ===
    let dialogue = null;
    const prefix = state.hardcore ? 'dh_' : 'd_';

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
        try {
            state.turn = 'busy';
            updateUI();
            await new Promise(r => setTimeout(r, 100));
            await showSpeechBubble(mode === 'natalia' ? 'player' : 'enemy', dialogue);
        } catch (e) {
            console.error("Dialogue error:", e);
        } finally {
            state.turn = 'player';
            updateUI();
        }
    }

    updateItemsUI();
    if (mode === 'pvp') log(CONFIG.lang === 'en' ? "PvP: Player 1's turn" : "PvP: Ход Игрока 1");
    else {
        const enemyName = getLocName(state.currentEnemy.name);
        log(`${enemyName} ${t('blocks_path')}`);
    }
}

function updateItemsUI() {
    const inv = (state.currentMode === 'pvp' && state.turn === 'enemy') ? state.pvpInventory : state.inventory;
    el.items[0].btn.innerHTML = `💊 ${t('it_0')}<span class="item-count" id="count-0">${inv[0]}</span>`;
    el.items[1].btn.innerHTML = `📜 ${t('it_1')}<span class="item-count" id="count-1">${inv[1]}</span>`;
    el.items[0].count = document.getElementById('count-0'); el.items[1].count = document.getElementById('count-1');
}

// === SPECIAL BOSS LOGIC ===
function startIdleTimer() {
    if (state.idleTimer) clearInterval(state.idleTimer);
    state.idleTimer = setInterval(() => {
        // Check for enemy special property, not just mode string
        if (state.turn === 'player' && state.currentEnemy?.special === 'equation' && !state.gameOver) {
            state.equationBar += state.currentEnemy.equationPerTurn; updateSpecialBar(); checkEquationTrigger();
        }
    }, 1000);
}
function updateSpecialBar() { if (state.currentEnemy?.special !== 'equation') return; state.equationBar = Math.max(0, Math.min(100, state.equationBar)); el.specialBarVal.style.width = `${state.equationBar}%`; el.specialBarPercent.textContent = `${Math.floor(state.equationBar)}%`; }
function checkEquationTrigger() {
    if (state.currentEnemy?.special !== 'equation') return;
    if (state.equationBar >= 100) {
        state.equationBar = 0; updateSpecialBar(); shakeScreen(); flashRed(el.arena); log(t('test_atk')); state.mp = 0; state.hp -= 20; showFloat(el.pSprite, "-20 HP / 0 MP", "#ef4444");
        if (!state.hasMinionActive) { state.hasMinionActive = true; state.minionHp = state.minionMaxHp; el.minionContainer.classList.add('show'); log(t('minion_spawn')); }
        updateUI(); if (state.hp <= 0) gameOver(false);
    }
}
function startMusicTimer() {
    if (state.musicTimer) clearInterval(state.musicTimer);
    state.musicTimer = setInterval(() => {
        if (state.currentEnemy?.special === 'music' && state.turn !== 'busy' && !state.gameOver) {
            const drain = state.currentEnemy.drainPerSecond; spawnMusicNotes();
            if (state.mp >= drain) { state.mp -= drain; showFloat(el.pSprite, `-${drain} MP`, "#a855f7"); }
            else { const hpDrain = drain - state.mp; state.mp = 0; state.hp -= hpDrain; showFloat(el.pSprite, `-${hpDrain} HP`, "#ef4444"); animHit(el.pSprite); }
            updateUI(); if (state.hp <= 0) gameOver(false);
        }
    }, 1000);
}

// === ACTIONS ===
function getLocName(orig) {
    if (!orig) return "";
    // Bosses
    if (orig.includes('Егор')) return t('en_egor'); if (orig.includes('Вадим')) return t('en_vadim'); if (orig.includes('Марьванна')) return t('en_marivanna');
    if (orig.includes('Лариса')) return t('boss_larisa'); if (orig.includes('Дмитрий') || orig.includes('Директор')) return t('boss_director');
    if (orig.includes('Лилия')) return t('boss_music'); if (orig.includes('Наталья')) return t('boss_natalia'); if (orig.includes('Макар')) return t('en_makar');
    if (orig.includes('Баба') || orig.includes('Valya') || orig.includes('Cleaner')) return t('en_baba');

    // Titles
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

function updateUI() {
    // Translate Labels
    const lvlText = state.currentMode === 'pvp' ? t('pvp_duel') : (state.currentMode === 'endless' ? t('round') + " " + state.endlessRound : `${t('level')} ${state.level || 1} (${state.xp || 0} ${t('xp')})`);
    document.getElementById('level-display').textContent = lvlText;
    const backBtn = document.getElementById('back-btn'); if (backBtn) backBtn.textContent = t('menu_btn');
    const sbLabel = document.getElementById('special-bar-label-text'); if (sbLabel) sbLabel.textContent = "📐 " + t('equation');

    const hpPct = (state.hp / PLAYER_MAX_HP) * 100; const mpPct = (state.mp / PLAYER_MAX_MP) * 100;
    el.pHpBar.style.width = `${Math.max(0, hpPct)}%`; el.pMpBar.style.width = `${Math.max(0, mpPct)}%`;
    el.pHpTxt.textContent = Math.floor(Math.max(0, state.hp)); el.pMpTxt.textContent = Math.floor(Math.max(0, state.mp));

    const curEnemyMax = state.currentEnemy ? state.currentEnemy.hp : 100; const eHpPct = (state.enemyHp / curEnemyMax) * 100;
    el.eHpBar.style.width = `${Math.max(0, eHpPct)}%`; el.eHpTxt.textContent = Math.floor(Math.max(0, state.enemyHp));

    // Name Translation
    if (state.currentEnemy) {
        el.eName.textContent = getLocName(state.currentEnemy.name);
        // Also update top header name
        el.enemyNameDisplay.textContent = getLocName(state.currentEnemy.title || state.currentEnemy.name);
    }

    // PvP MP Bar
    if (state.currentMode === 'pvp') {
        const pvpMpPct = (state.pvpMp / PLAYER_MAX_MP) * 100;
        el.eMpBar.style.width = `${Math.max(0, pvpMpPct)}%`; el.eMpTxt.textContent = Math.floor(Math.max(0, state.pvpMp));
    }

    // Buttons state
    const isPvP = state.currentMode === 'pvp';
    const activeMp = (isPvP && state.turn === 'enemy') ? state.pvpMp : state.mp;
    const activeInv = (isPvP && state.turn === 'enemy') ? state.pvpInventory : state.inventory;
    const isTurn = isPvP ? (state.turn === 'player' || state.turn === 'enemy') : (state.turn === 'player');

    // Translate Skills and Items
    el.btns.forEach((btn, idx) => {
        const cost = state.skills[idx].cost;
        const noMp = cost > 0 && activeMp < cost;
        btn.disabled = !isTurn || state.stunned || noMp;
        btn.style.opacity = btn.disabled ? 0.5 : 1;
        // Translate Skill Name
        const skKey = `sk_${idx}`;
        const nameSpan = btn.querySelector('.btn-name');
        if (nameSpan) nameSpan.textContent = t(skKey) || state.skills[idx].name;
    });

    activeInv.forEach((count, idx) => {
        el.items[idx].count.textContent = count;
        const disabled = (count <= 0 || !isTurn || state.stunned);
        el.items[idx].btn.disabled = disabled;
        el.items[idx].btn.style.opacity = disabled ? 0.5 : 1;
        // Translate Item Name (Extract icon first? No, easier to just reset HTML but keep count)
        // el.items[idx].btn.innerHTML = `${idx===0?'💊':'📜'} ${t('it_'+idx)}...` -> NO, this resets the count span reference
        // Just update text node if possible, or simpler:
        const btn = el.items[idx].btn;
        const icon = idx === 0 ? '💊' : '📜';
        const name = t('it_' + idx);
        // Preserve count span
        btn.childNodes[0].nodeValue = `${icon} ${name}`;
    });

    if (state.hasMinionActive) { const minionPct = (state.minionHp / state.minionMaxHp) * 100; el.minionHpBar.style.width = `${Math.max(0, minionPct)}%`; } else { el.minionHpBar.style.width = `0%`; }
    document.getElementById('header-hp').textContent = Math.floor(Math.max(0, state.hp)); document.getElementById('header-mp').textContent = Math.floor(Math.max(0, state.mp));
}

async function playerAction(idx) {
    if (state.stunned || state.gameOver) return;

    if (idx === 'defend') {
        executeDefend();
        return;
    }

    // Logic for whose turn it is
    const isP1 = state.turn === 'player';
    const isP2 = state.turn === 'enemy' && state.currentMode === 'pvp';
    if (!isP1 && !isP2) return;

    const currentMp = isP1 ? state.mp : state.pvpMp;
    const skill = state.skills[idx];

    if (skill.cost > 0 && currentMp < skill.cost) {
        shake(isP1 ? el.pMpBar : el.eMpBar); return;
    }

    if (state.hasMinionActive && skill.dmg && skill.dmg[1] > 0 && isP1) {
        state.pendingSkill = idx; showTargetSelection(); return;
    }

    await executeSkill(idx, isP1 ? 'enemy' : 'player');
}

function showTargetSelection() {
    el.targetSelection.classList.add('show');
    document.getElementById('target-enemy-emoji').textContent = state.currentEnemy.sprite;
    document.getElementById('target-enemy-name').textContent = getLocName(state.currentEnemy.name);
    const tm = document.getElementById('target-minion-name'); if (tm) tm.textContent = t('equation');
}
function selectTarget(target) { el.targetSelection.classList.remove('show'); if (state.pendingSkill !== null) { executeSkill(state.pendingSkill, target); state.pendingSkill = null; } }

async function executeDefend() {
    state.turn = 'busy';
    state.defending = true;
    const actorSprite = (el.pImg.style.display !== 'none') ? el.pImg : el.pSprite;
    animAttack(actorSprite, 'up');
    showFloat(actorSprite, "GUARD", "#94a3b8");
    log(`${t('you')} ${t('defend_msg')}`);
    await sleep(800);
    state.turn = 'enemy';
    await enemyTurn();
}

async function executeSkill(idx, target) {
    const skill = state.skills[idx];
    const isP1Attacking = (target === 'enemy' || target === 'minion');
    const attacker = isP1Attacking ? 'player' : 'enemy'; // Who is using the skill
    state.turn = 'busy';

    // Spend MP
    if (isP1Attacking) {
        if (skill.cost > 0) state.mp -= skill.cost; else state.mp = Math.min(PLAYER_MAX_MP, state.mp - skill.cost);
    } else {
        if (skill.cost > 0) state.pvpMp -= skill.cost; else state.pvpMp = Math.min(PLAYER_MAX_MP, state.pvpMp - skill.cost);
    }

    // Determine correct sprite elements based on skin
    const pSprite = (el.pImg.style.display !== 'none') ? el.pImg : el.pSprite;
    const attackerSprite = isP1Attacking ? pSprite : el.eSprite;
    const defenderSprite = isP1Attacking ? el.eSprite : pSprite;
    const dir = isP1Attacking ? 'right' : 'left';

    animAttack(attackerSprite, dir); await sleep(200);

    // FIXED: Check if it's actually an attack (dmg[1] > 0)
    if (skill.dmg && skill.dmg[1] > 0) {
        let dmg = rand(skill.dmg[0], skill.dmg[1]);
        if (state.buffDamage > 1) { dmg = Math.floor(dmg * state.buffDamage); state.buffDamage = 1; showFloat(attackerSprite, "BUFF END", "#fbbf24"); }
        if (Math.random() < 0.15) { dmg = Math.floor(dmg * 1.5); showFloat(defenderSprite, "КРИТ!", "#fbbf24"); shakeScreen(); }

        if (target === 'enemy') {
            state.enemyHp -= dmg; showFloat(defenderSprite, `-${dmg}`, "#ef4444"); spawnParticles(defenderSprite, 10, '#ef4444'); animHit(defenderSprite);
        } else if (target === 'player') {
            state.hp -= dmg; showFloat(defenderSprite, `-${dmg}`, "#ef4444"); spawnParticles(defenderSprite, 10, '#ef4444'); animHit(defenderSprite);
        } else {
            // Minion
            state.minionHp -= dmg; showFloat(el.minionContainer, `-${dmg}`, "#ef4444"); spawnParticles(el.minionContainer, 8, '#ef4444');
            if (state.minionHp <= 0) { state.hasMinionActive = false; el.minionContainer.classList.remove('show'); log("📐 Уравнение решено!"); state.mp = Math.min(PLAYER_MAX_MP, state.mp + 20); showFloat(el.pSprite, "+20 MP", "#3b82f6"); }
        }
        flashRed(el.arena);
    } else {
        // Heal MP logic (Focus) - Does not hit enemy, just floats text
        showFloat(attackerSprite, "+MP", "#3b82f6"); spawnParticles(attackerSprite, 5, '#3b82f6');
    }

    log(`${isP1Attacking ? t('you') : t('p2')} ${t('used')} ${t('sk_' + idx) || skill.name}`);

    if (state.currentEnemy?.special === 'equation') { state.equationBar += state.currentEnemy.equationPerTurn; updateSpecialBar(); checkEquationTrigger(); }

    updateUI();
    if (checkWin()) return;

    // NEW: PvP instant stop if P1 has 0 HP after P2 attacks
    if (state.currentMode === 'pvp' && state.hp <= 0) {
        pvpInstantStop('p2');
        return;
    }

    // Turn switching logic
    await sleep(1000);
    if (state.currentMode === 'pvp') {
        state.turn = isP1Attacking ? 'enemy' : 'player';
        log(isP1Attacking ? "PvP: Ход Игрока 2" : "PvP: Ход Игрока 1");
        updateItemsUI();
        updateUI();
    } else {
        state.turn = 'enemy';
        await enemyTurn();
    }
}

// NEW: PvP instant stop when Player 1 reaches 0 HP
function pvpInstantStop(winner) {
    state.gameOver = true;
    resetBattleState();
    state.gameOver = true; // Keep after reset

    if (winner === 'p2') {
        el.pSprite.classList.add('dead');
        el.pImg.classList.add('dead');
    } else {
        el.eSprite.classList.add('dead');
    }

    setTimeout(() => {
        const modal = el.modal;
        modal.querySelector('#modal-emoji').textContent = '⚔️';
        modal.querySelector('#modal-title').textContent = winner === 'p1' ? t('p1_win') : t('p2_win');
        modal.querySelector('#modal-desc').textContent = t('nice_fight');
        modal.querySelector('#modal-btn').onclick = () => { modal.classList.remove('show'); startPvP(); };
        modal.querySelector('#modal-btn').textContent = t('rematch');
        modal.querySelector('#modal-btn-menu').textContent = t('menu');
        modal.querySelector('#modal-btn-menu').style.display = 'block';
        modal.classList.add('show');
    }, 800);
}

async function useItem(idx) {
    if (state.stunned || state.gameOver) return;

    const isP1 = state.turn === 'player';
    const isP2 = state.turn === 'enemy' && state.currentMode === 'pvp';
    if (!isP1 && !isP2) return;

    const activeInv = isP1 ? state.inventory : state.pvpInventory;
    if (activeInv[idx] <= 0) return;

    activeInv[idx]--;
    state.turn = 'busy';
    const item = state.items[idx];
    const actorSprite = isP1 ? ((el.pImg.style.display !== 'none') ? el.pImg : el.pSprite) : el.eSprite;

    log(`Использовано: ${item.name}`);
    animAttack(actorSprite, 'up');

    if (item.heal) {
        Sound.heal();
        if (isP1) state.hp = Math.min(PLAYER_MAX_HP, state.hp + item.heal);
        else state.enemyHp = Math.min(PLAYER_MAX_HP, state.enemyHp + item.heal);
        showFloat(actorSprite, `+${item.heal}`, "#22c55e"); spawnParticles(actorSprite, 15, '#22c55e');
    }
    if (item.buff) {
        Sound.heal(); // Buff sound same as heal for now
        state.buffDamage = item.buff;
        showFloat(actorSprite, "СИЛА UP!", "#fbbf24"); spawnParticles(actorSprite, 15, '#fbbf24');
    }

    if (state.currentEnemy?.special === 'equation') { state.equationBar += state.currentEnemy.equationPerTurn; updateSpecialBar(); checkEquationTrigger(); }

    updateUI();
    await sleep(1000);

    if (state.currentMode === 'pvp') {
        state.turn = isP1 ? 'enemy' : 'player';
        log(isP1 ? "PvP: Ход Игрока 2" : "PvP: Ход Игрока 1");
        updateItemsUI();
        updateUI();
    } else {
        state.turn = 'enemy';
        await enemyTurn();
    }
}

async function enemyTurn() {
    if (state.currentMode === 'pvp') return; // Should not happen, but safety check

    updateUI();

    // --- DYNAMIC BOSS EMOJIS ---
    if (state.currentEnemy && state.currentEnemy.phases) {
        const pct = (state.enemyHp / state.currentEnemy.hp) * 100;
        if (pct <= 20) el.eSprite.textContent = state.currentEnemy.phases[20];
        else if (pct <= 50) el.eSprite.textContent = state.currentEnemy.phases[50];
        else el.eSprite.textContent = state.currentEnemy.phases[100];
    }

    if (state.currentEnemy && state.currentEnemy.special === 'baba_valya') { await babaValyaTurn(); return; }

    // Use property check instead of mode check for Scream
    if (state.currentEnemy?.special === 'scream' && Math.random() < state.currentEnemy.screamChance) { log(t('scream_start')); await sleep(500); startScreamBattle(); return; }

    let attackCount = 1; if (state.currentEnemy?.special === 'dodge') attackCount = rand(2, 3); // Makar check

    for (let i = 0; i < attackCount; i++) { if (state.hp <= 0) break; await executeEnemyAttack(false); if (i < attackCount - 1) await sleep(600); }
    if (state.hasMinionActive && state.hp > 0) { await sleep(500); await executeEnemyAttack(true); }
    if (state.hp <= 0) { gameOver(false); return; }
    await sleep(800);
    state.turn = 'player';
    state.defending = false; // Reset defense after enemy turn
    if (state.stunned) { state.stunned = false; log(t('recover')); await sleep(1000); }
    state.mp = Math.min(PLAYER_MAX_MP, state.mp + 5); updateUI();
}

async function executeEnemyAttack(isMinion = false) {
    const enemy = state.currentEnemy; const moves = enemy.moves; let move;
    if (isMinion) { move = { name: "Сложение", dmg: [8, 15], msg: t('equation_atk') }; animAttack(el.minionContainer, 'left'); }
    else { move = moves[rand(0, moves.length - 1)]; animAttack(el.eSprite, 'left'); }
    await sleep(300);
    const hits = move.hits || 1;
    const pTarget = (el.pImg.style.display !== 'none') ? el.pImg : el.pSprite;

    for (let h = 0; h < hits; h++) {
        if (move.dmg) {
            let dmg = rand(move.dmg[0], move.dmg[1]);
            if (state.defending) {
                dmg = Math.floor(dmg * 0.5);
                showFloat(pTarget, "BLOCK", "#94a3b8");
            }
            state.hp -= dmg;
            showFloat(pTarget, `-${dmg}`, "#ef4444"); spawnParticles(pTarget, 8, '#ef4444'); animHit(pTarget);
            if (dmg > 20) shakeScreen(); if (h < hits - 1) await sleep(300);
        }
    }
    if (move.heal) { const heal = rand(move.heal[0], move.heal[1]); state.enemyHp = Math.min(enemy.hp, state.enemyHp + heal); showFloat(el.eSprite, `+${heal}`, "#22c55e"); }
    if (move.drain) { state.mp = Math.max(0, state.mp - move.drain); showFloat(pTarget, `-${move.drain} MP`, "#3b82f6"); }
    if (move.stun && Math.random() < move.stun) { state.stunned = true; showFloat(pTarget, t('stunned'), "#f59e0b"); }
    log(getLocMsg(move, 'msg')); updateUI();
}

async function babaValyaTurn() {
    if (Math.random() < 0.4) { log(t('baba_plan')); await sleep(500); await launchMenuAttack(); }
    else { await executeEnemyAttack(false); }
    if (state.hp > 0) { state.turn = 'player'; updateUI(); } else { gameOver(false); }
}
async function launchMenuAttack() {
    const icons = ['🧹', '🗑️', '🪣', '🧼']; const attackIcon = icons[rand(0, icons.length - 1)];
    const attackEl = document.createElement('div'); attackEl.className = 'baba-valya-attack'; attackEl.textContent = attackIcon;
    const rect = el.arena.getBoundingClientRect(); const startY = rand(rect.top + 50, rect.bottom - 50); const startX = window.innerWidth; const endX = -100;
    attackEl.style.top = `${startY}px`; attackEl.style.left = `${startX}px`;
    attackEl.onmouseover = () => handleMenuAttackHover(attackEl); attackEl.ontouchstart = () => handleMenuAttackHover(attackEl);
    el.babaValyaAttacksContainer.appendChild(attackEl);
    const animation = attackEl.animate([{ transform: `translateX(0px)` }, { transform: `translateX(${endX - startX}px)` }], { duration: 1500, easing: 'linear' });
    await animation.finished; attackEl.remove();
}
function handleMenuAttackHover(element) {
    if (!element.dataset.hit) {
        element.dataset.hit = 'true'; state.hp -= 15; showFloat(el.pSprite, "-15", "#ef4444"); animHit(el.pSprite); updateUI();
        log("Ай! Не мешайся под ногами!"); element.style.opacity = 0.3; if (state.hp <= 0) gameOver(false);
    }
}

function startScreamBattle() {
    state.screamActive = true; state.screamPlayerPower = 50; state.screamTimer = 15; state.screamDamageToPlayer = 0; state.screamDamageToEnemy = 0;
    el.screamOverlay.classList.add('show');
    // Localize Scream Overlay
    document.getElementById('scream-title').textContent = t('scream_title');
    document.getElementById('scream-instr').textContent = t('scream_instr');

    updateScreamUI(); if (state.screamInterval) clearInterval(state.screamInterval);
    state.screamInterval = setInterval(() => {
        state.screamPlayerPower -= 2;
        if (state.screamPlayerPower < 50) { const dmgRate = Math.floor((50 - state.screamPlayerPower) / 10); state.screamDamageToPlayer += dmgRate; state.hp -= dmgRate * 0.5; }
        else { const dmgRate = Math.floor((state.screamPlayerPower - 50) / 10); state.screamDamageToEnemy += dmgRate; }
        state.screamTimer -= 0.1; state.screamPlayerPower = Math.max(0, Math.min(100, state.screamPlayerPower)); updateScreamUI(); updateUI();
        if (state.screamTimer <= 0 || state.screamPlayerPower >= 100 || state.screamPlayerPower <= 0 || state.hp <= 0) { endScreamBattle(); }
    }, 100);
}
function updateScreamUI() { el.screamBarPlayer.style.width = state.screamPlayerPower + '%'; el.screamBarEnemy.style.width = (100 - state.screamPlayerPower) + '%'; el.screamTimer.textContent = Math.ceil(state.screamTimer); el.screamDmgPlayer.textContent = `-${Math.floor(state.screamDamageToPlayer)}`; el.screamDmgEnemy.textContent = `-${Math.floor(state.screamDamageToEnemy)}`; }
function endScreamBattle() {
    clearInterval(state.screamInterval); state.screamActive = false; el.screamOverlay.classList.remove('show');
    if (state.screamPlayerPower >= 100) { const reflectDmg = rand(40, 60); state.enemyHp -= reflectDmg; log(t('scream_reflect').replace('{dmg}', reflectDmg)); shakeScreen(); }
    else if (state.screamPlayerPower <= 0) { const dmg = rand(30, 50); state.hp -= dmg; log(t('scream_fail').replace('{dmg}', dmg)); animHit(el.pSprite); }
    else { state.enemyHp -= state.screamDamageToEnemy; log(t('scream_end')); }
    updateUI(); if (state.hp <= 0) { gameOver(false); return; } if (checkWin()) return; setTimeout(() => { state.turn = 'player'; updateUI(); }, 500);
}
document.addEventListener('keydown', (e) => { if (state.screamActive && (e.key.toLowerCase() === 'x' || e.key.toLowerCase() === 'ч')) { state.screamPlayerPower += 4; el.screamKey.classList.add('pressed'); setTimeout(() => el.screamKey.classList.remove('pressed'), 50); } });
el.screamKey.addEventListener('touchstart', (e) => { e.preventDefault(); if (state.screamActive) { state.screamPlayerPower += 4; el.screamKey.classList.add('pressed'); } });
el.screamKey.addEventListener('touchend', () => el.screamKey.classList.remove('pressed'));
el.screamKey.addEventListener('mousedown', () => { if (state.screamActive) { state.screamPlayerPower += 4; el.screamKey.classList.add('pressed'); } });
el.screamKey.addEventListener('mouseup', () => el.screamKey.classList.remove('pressed'));

function checkWin() {
    if (state.hp <= 0) return false; // Prevent winning if dead

    // PvP Win — UPDATED: instant stop if P1 has 0 HP
    if (state.currentMode === 'pvp') {
        if (state.hp <= 0) {
            pvpInstantStop('p2');
            return true;
        }
        if (state.enemyHp <= 0) {
            pvpInstantStop('p1');
            return true;
        }
        return false;
    }

    if (state.enemyHp <= 0) {
        state.enemyHp = 0; updateUI(); el.eSprite.classList.add('dead'); resetBattleState();

        // XP REWARD (Only for first victory)
        const enemyId = state.currentEnemy.name;
        if (!state.defeatedEnemies.includes(enemyId)) {
            const xpGain = Math.floor(state.currentEnemy.hp * 0.75); // Buffed XP
            state.xp = (state.xp || 0) + xpGain;
            state.defeatedEnemies.push(enemyId);
            log(`+${xpGain} XP (First Win!)`);
            checkLevelUp();
        } else {
            log(t('xp') + ": 0 (Already defeated)");
        }

        // RP REWARD
        const rpReward = Math.floor((state.currentEnemy.hp / 2) / 2);
        userProfile.rp += rpReward;
        if (window.syncUserData) window.syncUserData();

        setTimeout(() => {
            if (state.currentMode === 'endless') {
                // Endless continue logic
                showFloat(el.pSprite, t('win'), "#fbbf24");
                setTimeout(() => startBattle('endless'), 1000);
            }
            else if (state.currentMode === 'story') {
                state.storyHp = Math.min(PLAYER_MAX_HP, state.hp + 30); state.storyMp = state.mp; state.storyInventory = [...state.inventory];
                if (state.storyLevel < STORY_ENEMIES.length - 1) showModal('win-round'); else showModal('win-game');
            } else { showModal('win-boss'); }
        }, 800);
        return true;
    } return false;
}

function checkLevelUp() {
    state.level = state.level || 1;
    const nextXp = XP_TABLE[state.level];
    if (state.xp >= nextXp && state.level < XP_TABLE.length - 1) {
        state.level++;
        PLAYER_MAX_HP += 20;
        PLAYER_MAX_MP += 10;
        state.hp = PLAYER_MAX_HP;
        state.mp = PLAYER_MAX_MP;
        log(t('level_up'));
        showFloat(el.pSprite, t('level_up'), "#fbbf24");
        Sound.win();
        saveProgress();
    }
}

function gameOver(win) {
    if (state.gameOver) return;
    state.gameOver = true;
    const mode = state.currentMode;
    resetBattleState();
    state.gameOver = true; // Keep it true after reset
    saveScore(false);

    if (state.currentMode === 'story') {
        state.storyLevel = 0; // RESET PROGRESS ON LOSS (Permadeath)
        state.storyHp = PLAYER_MAX_HP; state.storyMp = 50; state.storyInventory = [1, 1];
        saveProgress();
    }

    el.pSprite.classList.add('dead'); el.pImg.classList.add('dead');

    // Pity RP
    userProfile.rp += 10;
    if (window.syncUserData) window.syncUserData();

    setTimeout(() => showModal('lose'), 1000);
}

function showModal(type) {
    pauseTimer();
    const isStoryOver = state.storyLevel >= STORY_ENEMIES.length;
    let spawnChance = state.hardcore ? (isStoryOver ? 0.20 : 0.1) : 0.1;
    if (state.currentEnemy && state.currentEnemy.isBabaValya) spawnChance = 0;

    // Disable secret boss in endless
    if (state.currentMode === 'endless') spawnChance = 0;

    if ((type === 'win-round' || type === 'win-boss') && Math.random() < spawnChance) {
        const modal = el.modal; modal.querySelector('#modal-emoji').textContent = '🧹'; modal.querySelector('#modal-title').textContent = t('sudden'); modal.querySelector('#modal-title').style.color = '#ef4444'; modal.querySelector('#modal-desc').textContent = t('baba_desc');
        const btn = modal.querySelector('#modal-btn'); btn.textContent = t('to_battle'); btn.style.display = 'block'; modal.querySelector('#modal-btn-menu').style.display = 'none';
        btn.onclick = () => { modal.classList.remove('show'); startBattle('baba_valya'); }; modal.classList.add('show'); return;
    }
    const title = document.getElementById('modal-title'); const desc = document.getElementById('modal-desc'); const emoji = document.getElementById('modal-emoji'); const btn = document.getElementById('modal-btn'); const menuBtn = document.getElementById('modal-btn-menu'); menuBtn.style.display = 'block'; menuBtn.textContent = t('menu');
    if (type === 'win-round') {
        const winText = state.currentEnemy ? (getLocMsg(state.currentEnemy, 'xp_txt') || t('win')) : t('win');
        emoji.textContent = "🆙"; title.textContent = t('win'); title.style.color = "#fbbf24"; desc.textContent = winText + t('hp_bonus');
        btn.textContent = t('next_lvl'); btn.style.display = 'block';

        btn.onclick = () => {
            saveScore(true);
            state.storyLevel++;
            saveProgress();
            el.modal.classList.remove('show');
            startBattle('story');
        };

        menuBtn.onclick = () => {
            saveScore(true);
            state.storyLevel++;
            saveProgress();
            goToMenu();
        };

    } else if (type === 'win-game') {
        emoji.textContent = "🎓"; title.textContent = t('win'); title.style.color = "#fbbf24"; desc.textContent = t('game_beat');
        btn.textContent = t('menu'); btn.style.display = 'block'; btn.onclick = () => { state.storyLevel++; saveScore(true); saveProgress(); goToMenu(); };
    } else if (type === 'win-boss') {
        const winText = state.currentEnemy ? (getLocMsg(state.currentEnemy, 'xp_txt') || t('win')) : t('win');
        emoji.textContent = "🏆"; title.textContent = t('win'); title.style.color = "#fbbf24"; desc.textContent = winText;
        btn.textContent = t('menu'); btn.style.display = 'block'; btn.onclick = () => { saveScore(true); saveProgress(); goToMenu(); }; menuBtn.style.display = 'none';
    } else {
        emoji.textContent = "☠️"; title.textContent = t('lose'); title.style.color = "#ef4444";
        if (state.currentMode === 'endless') desc.textContent = `${t('round')} ${state.endlessRound - 1}`;
        else desc.textContent = t('wasted_desc');
        btn.textContent = t('try_again'); btn.style.display = 'block'; btn.onclick = () => {
            if (state.currentMode === 'endless') { startEndless(state.endlessType); }
            else { localStorage.removeItem('schoolRpgSave'); window.location.reload(); }
        };
    }
    el.modal.classList.add('show');
}

function animAttack(element, dir) { Sound.attack(); if (!element) return; if (dir === 'right') element.style.transform = 'translateX(40px)'; else if (dir === 'left') element.style.transform = 'translateX(-40px)'; else element.style.transform = 'translateY(-20px)'; setTimeout(() => element.style.transform = 'none', 200); }
function animHit(element) { Sound.hit(); if (!element) return; element.classList.add('hit'); setTimeout(() => element.classList.remove('hit'), 400); }
function shakeScreen() { el.arena.classList.add('shake-screen'); setTimeout(() => el.arena.classList.remove('shake-screen'), 300); }
function flashRed(element) { element.classList.add('flash-red'); setTimeout(() => element.classList.remove('flash-red'), 300); }
function shake(element) { if (!element) return; element.style.transform = "translateX(-5px)"; setTimeout(() => { element.style.transform = "translateX(5px)"; setTimeout(() => element.style.transform = "none", 100); }, 100); }
function showFloat(target, text, color) { if (!target) return; const div = document.createElement('div'); div.className = 'float-text'; div.textContent = text; div.style.color = color; const rect = target.getBoundingClientRect(); div.style.left = (rect.left + rect.width / 2 + rand(-20, 20)) + 'px'; div.style.top = rect.top + 'px'; document.body.appendChild(div); setTimeout(() => div.remove(), 800); }
function spawnParticles(target, count, color) { if (!target) return; const rect = target.getBoundingClientRect(); const centerX = rect.left + rect.width / 2; const centerY = rect.top + rect.height / 2; for (let i = 0; i < count; i++) { const p = document.createElement('div'); p.className = 'particle'; p.style.backgroundColor = color; p.style.left = centerX + 'px'; p.style.top = centerY + 'px'; document.body.appendChild(p); const angle = Math.random() * Math.PI * 2; const velocity = Math.random() * 60 + 20; const tx = Math.cos(angle) * velocity; const ty = Math.sin(angle) * velocity; p.animate([{ transform: 'translate(0,0) scale(1)', opacity: 1 }, { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }], { duration: rand(400, 600), easing: 'cubic-bezier(0, .9, .57, 1)' }).onfinish = () => p.remove(); } }
function spawnMusicNotes() { const notes = ['♪', '♫', '♬', '🎵', '🎶']; for (let i = 0; i < 5; i++) { setTimeout(() => { const note = document.createElement('div'); note.className = 'music-note'; note.textContent = notes[rand(0, notes.length - 1)]; note.style.left = rand(100, 500) + 'px'; note.style.top = rand(200, 400) + 'px'; note.style.color = `hsl(${rand(260, 320)}, 80%, 60%)`; document.body.appendChild(note); setTimeout(() => note.remove(), 2000); }, i * 150); } }

function formatTime(ms) { const minutes = Math.floor(ms / 60000); const seconds = Math.floor((ms % 60000) / 1000); const milliseconds = ms % 1000; return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(3, '0')}`; }
function updateTimerDisplay() { el.speedrunTimer.textContent = formatTime(state.speedrunTime); }
function startTimer() { if (!state.isSpeedrunPaused) return; state.isSpeedrunPaused = false; el.speedrunTimer.style.display = 'block'; const startTime = Date.now() - state.speedrunTime; state.speedrunInterval = setInterval(() => { state.speedrunTime = Date.now() - startTime; updateTimerDisplay(); }, 10); }
function pauseTimer() { if (state.speedrunInterval) { clearInterval(state.speedrunInterval); state.speedrunInterval = null; state.isSpeedrunPaused = true; } }
function resetTimer() { pauseTimer(); state.speedrunTime = 0; state.isSpeedrunPaused = true; el.speedrunTimer.style.display = 'none'; updateTimerDisplay(); }

async function showSpeechBubble(who, text) {
    const bubble = who === 'player' ? el.bubblePlayer : el.bubbleEnemy;
    const target = who === 'player' ? el.pSprite : el.eSprite;
    const rect = target.getBoundingClientRect();
    const arenaRect = el.arena.getBoundingClientRect();

    bubble.innerHTML = `${text}<span class="speech-hint">${t('d_hint')}</span>`;
    bubble.style.display = 'block';

    // Position
    const left = who === 'player' ? (rect.left - arenaRect.left) : (rect.right - arenaRect.left - 250);
    bubble.style.left = left + 'px';
    bubble.style.top = (rect.top - arenaRect.top - 80) + 'px';

    return new Promise(resolve => {
        const handleClick = () => {
            document.removeEventListener('mousedown', handleClick);
            document.removeEventListener('touchstart', handleClick);
            bubble.style.display = 'none';
            resolve();
        };
        document.addEventListener('mousedown', handleClick);
        document.addEventListener('touchstart', handleClick);
    });
}

function saveScore(isWin) {
    if (state.currentMode === 'pvp') return;

    let progress = state.storyLevel; let enemyName = state.currentEnemy ? state.currentEnemy.name : '—';
    if (state.currentMode === 'endless') {
        enemyName = `Endless (${state.endlessType.startsWith('story_') ? 'Story' : state.endlessType})`;
        progress = state.endlessRound - 1;
    } else if (state.currentMode !== 'story') {
        const bossKeys = Object.keys(EXTRA_BOSSES); progress = STORY_ENEMIES.length + bossKeys.indexOf(state.currentMode);
    } else {
        progress = state.storyLevel;
        if (progress < STORY_ENEMIES.length) {
            enemyName = STORY_ENEMIES[progress].name;
        } else {
            enemyName = "Выпускной";
        }
    }

    const used0 = 1 - state.inventory[0];
    const used1 = 1 - state.inventory[1];
    const itemsUsed = (used0 > 0 ? used0 : 0) + (used1 > 0 ? used1 : 0);

    // Get actual Max HP for calc
    let enemyMax = state.currentEnemy ? state.currentEnemy.hp : 100;

    const newScore = {
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

    const leaderboard = JSON.parse(localStorage.getItem('schoolRpgLeaderboard') || '[]');
    leaderboard.push(newScore);
    localStorage.setItem('schoolRpgLeaderboard', JSON.stringify(leaderboard));

    if (window.saveScoreOnline) {
        window.saveScoreOnline(newScore);
    }
}

function showLeaderboard() {
    try {
        const modal = document.getElementById('leaderboard-modal');
        modal.classList.add('show');

        // Set localized static texts
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
        console.error(e);
    }
}

function showLocalLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('schoolRpgLeaderboard') || '[]');
    const filter = document.getElementById('filter-select').value;

    leaderboard.forEach(s => {
        if (s.isWin === undefined) {
            s.isWin = (s.hp > 0);
        }
    });

    let filtered = leaderboard;
    if (filter === 'wins') filtered = leaderboard.filter(s => s.isWin);
    if (filter === 'losses') filtered = leaderboard.filter(s => !s.isWin);

    // УМНАЯ СОРТИРОВКА (ТОЧНО ТАКАЯ ЖЕ, КАК В ОНЛАЙНЕ)
    filtered.sort((a, b) => {
        const scoreA = calculateSmartScore(a);
        const scoreB = calculateSmartScore(b);
        return scoreB - scoreA;
    });

    el.leaderboardTable.innerHTML = '';
    if (filtered.length === 0) {
        el.leaderboardTable.innerHTML = '<tr><td colspan="5" style="text-align:center;">Записей нет.</td></tr>';
        return;
    }

    filtered.forEach((score, index) => {
        const row = el.leaderboardTable.insertRow();

        // FIX: Prevent negative HP from showing as a win (Green text)
        // Even if score.isWin is true in DB, if HP <= 0, treat visually as loss
        const isRealWin = (score.isWin === true) && (score.hp > 0);

        if (score.hardcore) row.classList.add('hardcore-entry');
        if (isRealWin) row.classList.add('win-row');

        const statusIcon = isRealWin ? "🏆" : "💀";
        const pts = calculateSmartScore(score);
        const enemyName = getLocName(score.enemyName);

        row.innerHTML = `<td>${index + 1}</td><td>${score.name}</td><td>${statusIcon} ${enemyName}</td><td>${score.hp}/${score.mp}</td><td class="score-val">${pts}</td>`;
    });

    if (navigator && navigator.onLine === false) {
        const row = el.leaderboardTable.insertRow();
        row.innerHTML = `<td colspan="5" style="text-align:center; color: #9ca3af; font-size: 0.6rem;">${t('lb_offline')}</td>`;
    }
}

// === TRUE BALANCE SCORING SYSTEM (HIERARCHY FIRST) ===
window.calculateSmartScore = function (entry) {
    if (entry.isWin === undefined) entry.isWin = (entry.hp > 0);

    let basePoints = 0;
    const name = entry.enemyName || "";

    // === ИЕРАРХИЯ СИЛЫ (ОБНОВЛЕННАЯ ПОД ТВОИ УСЛОВИЯ) ===
    // Лилия = 2800. Хардкор Победа = 4200.
    // Завуч = 6000. Хардкор Победа = 9000.
    // Директор = 9000.

    if (name.includes("Егор")) basePoints = 200;
    else if (name.includes("Макар")) basePoints = 500;
    else if (name.includes("Вадим")) basePoints = 1200;
    else if (name.includes("Лилия")) basePoints = 2800; // Хардкор ~4200
    else if (name.includes("Наталья")) basePoints = 2800;
    else if (name.includes("Лариса")) basePoints = 3000;
    else if (name.includes("Марьванна") || name.includes("Завуч")) basePoints = 6000; // Завуч >> Лилии HC
    else if (name.includes("Дмитрий") || name.includes("Директор")) basePoints = 9000; // Директор >> Всех
    else if (name.includes("Баба Валя")) basePoints = 15000;
    else if (name.includes("Endless")) {
        const roundMatch = entry.enemyName.match(/\(R(\d+)\)/);
        const round = roundMatch ? parseInt(roundMatch[1]) : 1;
        basePoints = round * 300;
    }

    let totalScore = 0;
    const hardcoreMult = entry.hardcore ? 1.5 : 1.0;
    const winBonus = 200;

    if (entry.isWin) {
        // ФОРМУЛА ПОБЕДЫ (С учетом красивой игры)
        // (База * Хардкор) + Бонус + (ХП * 5)
        // Добавляем очки за неиспользованные предметы (считаем что у нас было 2, вычитаем использованные)
        const itemsLeft = 2 - (entry.itemsUsed || 0);
        const itemBonus = (itemsLeft > 0) ? itemsLeft * 300 : 0;

        totalScore = (basePoints * hardcoreMult) + winBonus + (entry.hp * 5) + itemBonus;

    } else {
        // ФОРМУЛА ПОРАЖЕНИЯ
        // База * Хардкор * %Урона * 0.75
        // Штраф 0.75 гарантирует, что только ОЧЕНЬ близкий бой с Директором (9000)
        // перебьет ОБЫЧНУЮ победу над Лилией (2800).

        let damagePercent = 0;
        if (entry.enemyMaxHp && entry.enemyHpLeft !== undefined) {
            damagePercent = 1 - (entry.enemyHpLeft / entry.enemyMaxHp);
            if (damagePercent < 0) damagePercent = 0;
        } else {
            damagePercent = 0.1;
        }

        totalScore = (basePoints * hardcoreMult) * damagePercent * 0.75;
    }

    return Math.floor(totalScore);
}

function saveProgress() {
    const save = {
        storyLevel: state.storyLevel, storyHp: state.storyHp, storyMp: state.storyMp, storyInventory: state.storyInventory,
        playerName: state.playerName, hardcore: state.hardcore,
        level: state.level, xp: state.xp, maxHp: PLAYER_MAX_HP, maxMp: PLAYER_MAX_MP,
        defeatedEnemies: state.defeatedEnemies // NEW: Save defeated enemies list for XP tracking
    };
    localStorage.setItem('schoolRpgSave', JSON.stringify(save));
}

function loadProgress() {
    const save = localStorage.getItem('schoolRpgSave');
    if (save) {
        const data = JSON.parse(save);
        state.storyLevel = data.storyLevel ?? 0;
        state.storyHp = data.storyHp ?? PLAYER_MAX_HP;
        state.storyMp = data.storyMp ?? 50;
        state.storyInventory = data.storyInventory ?? [1, 1];
        state.playerName = data.playerName ?? '';
        state.hardcore = data.hardcore ?? false;
        state.level = data.level ?? 1;
        state.xp = data.xp ?? 0;
        PLAYER_MAX_HP = data.maxHp ?? 120;
        PLAYER_MAX_MP = data.maxMp ?? 100;
        state.defeatedEnemies = data.defeatedEnemies ?? []; // NEW: Load defeated enemies
        return true;
    }
    return false;
}

function resetProgress() { if (confirm(t('reset_confirm'))) { localStorage.removeItem('schoolRpgSave'); localStorage.removeItem('schoolRpgProfile'); window.location.reload(); } }

function tryStartGame() {
    const nameInput = document.getElementById('player-name-input');
    let name = nameInput.value.trim();
    if (!name) {
        // Auto-fill if empty to show Hardcore menu immediately
        name = "Player";
        nameInput.value = name;
    }

    document.getElementById('hc-title').textContent = t('hc_title');
    document.getElementById('hardcore-yes').textContent = t('hc_yes');
    document.getElementById('hardcore-no').textContent = t('hc_no');
    el.hardcoreModal.classList.add('show');
}

// Hardcore Handlers
document.getElementById('hardcore-yes').onclick = function () {
    if (window.isAnonymousLogin) {
        // Guest Setup for Anonymous
        userProfile.loggedIn = false;
        userProfile.name = '💀';
        userProfile.rp = 0;
        userProfile.unlockedSkins = ['default'];
        userProfile.currentSkin = 'default';

        state.playerName = '💀';
        state.storyLevel = 0; state.storyHp = PLAYER_MAX_HP; state.storyMp = 50; state.storyInventory = [1, 1];
        state.hardcore = true;
        document.body.classList.add('hardcore');

        // Switch Screens manually since setupMenu handles loggedIn check, but we are guest (loggedIn=false)
        // Actually setupMenu checks loadProgress. We will saveProgress below, so loads logic will work.
    } else {
        // Standard logic from Menu
        const name = document.getElementById('player-name-input').value.trim();
        state.playerName = name;
        state.storyLevel = 0; state.storyHp = PLAYER_MAX_HP; state.storyMp = 50; state.storyInventory = [1, 1];
        state.hardcore = true;
        document.body.classList.add('hardcore');
    }

    saveProgress();
    el.hardcoreModal.classList.remove('show');
    setupMenu();
    window.isAnonymousLogin = false;
};
document.getElementById('hardcore-no').onclick = function () {
    if (window.isAnonymousLogin) {
        // Cancel Anonymous Login -> Stay on Auth
        el.hardcoreModal.classList.remove('show');
        window.isAnonymousLogin = false;
        return;
    }

    const name = document.getElementById('player-name-input').value.trim();
    state.playerName = name;
    state.storyLevel = 0; state.storyHp = PLAYER_MAX_HP; state.storyMp = 50; state.storyInventory = [1, 1];
    state.hardcore = false;
    document.body.classList.remove('hardcore');
    saveProgress();
    el.hardcoreModal.classList.remove('show');
    setupMenu();
};
function setupMenu() {
    // Init language and mute buttons on every load
    const langBtn = document.getElementById('lang-btn');
    if (langBtn) langBtn.textContent = CONFIG.lang.toUpperCase();
    const muteBtn = document.getElementById('mute-btn');
    if (muteBtn) muteBtn.textContent = CONFIG.muted ? '🔇' : '🔊';

    // Update all menu texts
    updateAllTexts();

    const skDef = document.getElementById('sk-defend-name');
    if (skDef) skDef.textContent = t('defend');

    // Always apply translations first
    updateMenuStats();

    if (userProfile.loggedIn) {
        // RESTORE GAME STATE for logged in users
        loadProgress();

        el.authSection.style.display = 'none';
        el.mainMenuContainer.style.display = 'block';

        // Sync name to input
        const nameInput = document.getElementById('player-name-input');
        if (nameInput && userProfile.name) nameInput.value = userProfile.name;

        if (window.pendingHardcorePrompt) {
            window.pendingHardcorePrompt = false;
            setTimeout(() => tryStartGame(), 500);
        }
    } else {
        const hasSave = loadProgress();
        if (hasSave) {
            el.authSection.style.display = 'none';
            el.mainMenuContainer.style.display = 'block';
            updateMenuStats(); // Re-apply after loadProgress updates state
        } else {
            // Show login screen, hide main menu
            el.authSection.style.display = 'flex';
            el.mainMenuContainer.style.display = 'none';
        }
    }
}

// === SHOP LOGIC ===
function openShop() {
    el.shopRpDisplay.textContent = userProfile.rp;
    el.shopGrid.innerHTML = '';

    SKINS.forEach(skin => {
        const item = document.createElement('div');
        const isOwned = userProfile.unlockedSkins.includes(skin.id);
        const isEquipped = userProfile.currentSkin === skin.id;

        item.className = `shop-item ${isOwned ? 'owned' : ''} ${isEquipped ? 'equipped' : ''}`;

        let previewHtml = `<div class="preview">${skin.icon}</div>`;
        if (skin.type === 'image' && userProfile.customImage) {
            previewHtml = `<img src="${userProfile.customImage}" class="preview-img">`;
        }

        // Localization logic
        const skinName = (CONFIG.lang === 'en' && skin.name_en) ? skin.name_en : skin.name;
        const statusDict = CONFIG.lang === 'en' ? { own: 'OWNED', eq: 'EQUIPPED' } : { own: 'КУПЛЕНО', eq: 'ВЫБРАНО' };
        const statusText = isOwned ? (isEquipped ? statusDict.eq : statusDict.own) : skin.cost + ' RP';

        item.innerHTML = `
        ${previewHtml}
        <div class="name">${skinName}</div>
        <div class="price">${statusText}</div>
    `;

        item.onclick = () => handleShopClick(skin);
        el.shopGrid.appendChild(item);
    });

    el.shopModal.classList.add('show');
}

function handleShopClick(skin) {
    Sound.click();
    if (userProfile.unlockedSkins.includes(skin.id)) {

        // Logic for Custom Skin Re-upload
        if (skin.id === 'custom') {
            if (!userProfile.customImage) {
                // First upload
                document.getElementById('custom-skin-input').click();
                return;
            }
            if (userProfile.currentSkin === 'custom') {
                // Already equipped -> Allow change
                if (confirm(t('change_photo_confirm') || "Сменить фото?")) {
                    document.getElementById('custom-skin-input').click();
                }
                return;
            }
        }

        userProfile.currentSkin = skin.id;
        if (window.syncUserData) window.syncUserData();
        else saveLocalFallback(); // Fallback Save
        openShop();
    } else {
        // Buy
        if (userProfile.rp >= skin.cost) {
            if (confirm(`Купить "${skin.name}" за ${skin.cost} RP?`)) {
                Sound.win();
                userProfile.rp -= skin.cost;
                userProfile.unlockedSkins.push(skin.id);
                if (skin.id === 'custom') alert("Теперь выбери этот скин снова, чтобы загрузить фото!");
                if (window.syncUserData) window.syncUserData();
                else saveLocalFallback(); // Fallback Save
                openShop();
            }
        } else {
            alert("Недостаточно RP!");
        }
    }
}

document.getElementById('custom-skin-input').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (evt) {
        const img = new Image();
        img.onload = function () {
            const cvs = document.createElement('canvas');
            cvs.width = 100; cvs.height = 100;
            cvs.getContext('2d').drawImage(img, 0, 0, 100, 100);
            userProfile.customImage = cvs.toDataURL('image/jpeg', 0.8);
            userProfile.currentSkin = 'custom';
            if (window.syncUserData) window.syncUserData();
            else saveLocalFallback(); // Fallback Save
            openShop();
        }
        img.src = evt.target.result;
    }
    reader.readAsDataURL(file);
});

// === FALLBACK LOCAL STORAGE ACCOUNT SYSTEM ===
// This allows registration/login even if Firebase fails
function fallbackLogin(name, pass) {
    console.warn("Using Local Fallback Auth");
    const msgEl = document.getElementById('auth-msg');

    try {
        const db = JSON.parse(localStorage.getItem('rpg_accounts_db') || '{}');
        const userId = name.toLowerCase();

        if (db[userId]) {
            // Login
            if (db[userId].password) {
                // Check existing password
                if (db[userId].password !== pass) {
                    msgEl.textContent = CONFIG.lang === 'en' ? "❌ Wrong password!" : "❌ Неверный пароль!";
                    return;
                }
            } else {
                // Account has NO password -> Require setup
                if (!pass) {
                    msgEl.textContent = "⚠️ Придумайте пароль!"; return;
                }
                db[userId].password = pass;
                localStorage.setItem('rpg_accounts_db', JSON.stringify(db));
            }

            userProfile = { ...db[userId], loggedIn: true };
            saveLocalFallback(); // Create Session
            state.storyLevel = userProfile.storyLevel || 0;
            msgEl.textContent = CONFIG.lang === 'en' ? "✅ Logged in!" : "✅ Вход выполнен!";
        } else {
            // Register
            if (!pass) { msgEl.textContent = "❌ Пароль обязателен!"; return; }

            const newUser = {
                name: name,
                password: pass,
                rp: 100,
                unlockedSkins: ['default'],
                currentSkin: 'default',
                customImage: null,
                storyLevel: 0
            };
            db[userId] = newUser;
            localStorage.setItem('rpg_accounts_db', JSON.stringify(db));
            userProfile = { ...newUser, loggedIn: true };
            msgEl.textContent = "✨ Аккаунт создан (+100 RP)!";
        }

        setTimeout(() => {
            window.setupMenu();
        }, 1000);

    } catch (e) {
        console.error(e);
        msgEl.textContent = "Ошибка сохранения";
    }
}

function saveLocalFallback() {
    if (!userProfile.name) return;

    // Persist current session
    localStorage.setItem('schoolRpgProfile', JSON.stringify(userProfile));

    const db = JSON.parse(localStorage.getItem('rpg_accounts_db') || '{}');
    const userId = userProfile.name.toLowerCase();

    userProfile.storyLevel = state.storyLevel; // Sync level
    db[userId] = { ...userProfile }; // Update DB
    delete db[userId].loggedIn; // Don't save session state

    localStorage.setItem('rpg_accounts_db', JSON.stringify(db));
    console.log("Local Fallback Saved");
}

// Wrap Sync for global usage
window.syncUserData = function () {
    // This will be overwritten by Firebase module if it loads,
    // otherwise it defaults to local save.
    saveLocalFallback();
};

// === ADMIN KEYS ===
const pressedKeys = new Set();
document.addEventListener('keydown', (e) => {
    pressedKeys.add(e.key.toUpperCase());
    if (pressedKeys.has('A') && pressedKeys.has('D') && pressedKeys.has('M')) {
        const pass = prompt('🔴 ADMIN PANEL 🔴\nEnter Password:');
        if (pass === '4isi1362isi!') {
            const cmd = prompt('Commands:\n1. baba (Spawn Boss)\n2. clear (Wipe Save)\n3. god (Max Stats)\n4. win (Kill Enemy)\n5. story (Reset Story Progress)');
            if (cmd === 'baba') { el.menuScreen.classList.add('hidden'); startBattle('baba_valya'); }
            if (cmd === 'clear') { localStorage.clear(); location.reload(); }
            if (cmd === 'god') { state.hp = 999; state.mp = 999; state.inventory = [99, 99]; updateUI(); }
            if (cmd === 'win') { state.enemyHp = 0; checkWin(); }
            if (cmd === 'story') { state.storyLevel = 0; state.storyHp = 120; saveProgress(); if (window.syncUserData) window.syncUserData(); alert('Story Level reset to 0'); location.reload(); }
        }
        pressedKeys.clear();
    }
});
document.addEventListener('keyup', (e) => {
    pressedKeys.delete(e.key.toUpperCase());
});

// === FILE EXPORT / IMPORT ===
function exportSave() {
    const save = localStorage.getItem('schoolRpgSave');
    if (!save) { alert('Нет сохранений для экспорта!'); return; }
    const blob = new Blob([save], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'school_rpg_save.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function triggerImport() {
    document.getElementById('import-file').click();
}

function importSave(input) {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            if (data.storyLevel !== undefined && data.storyHp !== undefined) {
                localStorage.setItem('schoolRpgSave', JSON.stringify(data));
                alert('Сохранение успешно загружено! Игра будет перезагружена.');
                location.reload();
            } else {
                if (data.storyLevel !== undefined) {
                    localStorage.setItem('schoolRpgSave', JSON.stringify(data));
                    alert('Сохранение загружено.');
                    location.reload();
                } else {
                    alert('Ошибка: Файл не содержит данных игры.');
                }
            }
        } catch (err) {
            alert('Ошибка чтения файла: ' + err.message);
        }
    };
    reader.readAsText(file);
}

// === INITIALIZATION ===
setupMenu();
if (state.hardcore) document.body.classList.add('hardcore');

// === DAILY REWARDS FALLBACK (If Firebase module not loaded) ===
window.openDailyMenu = window.openDailyMenu || function () {
    const modal = document.getElementById('daily-modal');
    if (!modal) { console.error("Daily modal not found!"); return; }
    modal.classList.add('show');
    const grid = document.getElementById('daily-grid');
    grid.innerHTML = '';

    const rewards = [100, 200, 300, 400, 500, 600, 1000];
    const today = new Date().setHours(0, 0, 0, 0);
    let lastClaim = userProfile.lastClaimDate ? new Date(userProfile.lastClaimDate).setHours(0, 0, 0, 0) : 0;

    // Сброс серии, если пропущен хотя бы один полный день 
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
            dayEl.innerHTML = `<div>${t('day')} ${i + 1}</div><div style="opacity:0.5">+${val} RP</div>`;
        } else if (i === streak) {
            dayEl.classList.add('available');
            dayEl.innerHTML = `<div>${t('day')} ${i + 1}</div><div>+${val} RP</div>`;
        } else {
            dayEl.innerHTML = `<div>${t('day')} ${i + 1}</div><div style="opacity:0.5">+${val} RP</div>`;
        }
        grid.appendChild(dayEl);
    });

    const btn = document.getElementById('daily-claim-btn');
    btn.disabled = !canClaim;
    btn.textContent = canClaim ? t('daily_claim') : t('daily_claimed');
};

window.claimDailyReward = window.claimDailyReward || function () {
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
};

// === GLOBAL FUNCTIONS FOR FIREBASE MODULE ===
window.getLocName = getLocName;
window.calculateSmartScore = calculateSmartScore;
window.reloadLeaderboard = function () {
    if (window.loadLeaderboardOnline) {
        window.loadLeaderboardOnline();
    } else {
        showLocalLeaderboard();
    }
};