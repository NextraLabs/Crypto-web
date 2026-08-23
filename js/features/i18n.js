/* =========================================================
   NEXTRA i18n — MULTI LANGUAGE SYSTEM V3
   20 LANGUAGES
   Persistent Language
   RTL Support
   Profile Support
========================================================= */

(() => {

  "use strict";


  /* =====================================================
     CONFIG
  ====================================================== */

  const SETTINGS_KEY = "nextra_settings";

  const DEFAULT_LANGUAGE = "id";


  /* =====================================================
     LANGUAGES
  ====================================================== */

  const LANGUAGES = {

    id: {
      name: "Indonesian",
      native: "Bahasa Indonesia"
    },

    en: {
      name: "English",
      native: "English"
    },

    es: {
      name: "Spanish",
      native: "Español"
    },

    fr: {
      name: "French",
      native: "Français"
    },

    de: {
      name: "German",
      native: "Deutsch"
    },

    it: {
      name: "Italian",
      native: "Italiano"
    },

    pt: {
      name: "Portuguese",
      native: "Português"
    },

    "pt-BR": {
      name: "Portuguese (Brazil)",
      native: "Português (Brasil)"
    },

    ru: {
      name: "Russian",
      native: "Русский"
    },

    zh: {
      name: "Chinese",
      native: "简体中文"
    },

    "zh-TW": {
      name: "Chinese Traditional",
      native: "繁體中文"
    },

    ja: {
      name: "Japanese",
      native: "日本語"
    },

    ko: {
      name: "Korean",
      native: "한국어"
    },

    tr: {
      name: "Turkish",
      native: "Türkçe"
    },

    vi: {
      name: "Vietnamese",
      native: "Tiếng Việt"
    },

    th: {
      name: "Thai",
      native: "ไทย"
    },

    ar: {
      name: "Arabic",
      native: "العربية"
    },

    hi: {
      name: "Hindi",
      native: "हिन्दी"
    },

    nl: {
      name: "Dutch",
      native: "Nederlands"
    },

    pl: {
      name: "Polish",
      native: "Polski"
    }

  };


  /* =====================================================
     TRANSLATIONS
  ====================================================== */

  const TRANSLATIONS = {


    /* ===================================================
       INDONESIAN
    =================================================== */

    id: {

      home: "Beranda",
      markets: "Markets",
      trending: "Trending",
      futures: "Futures",
      tools: "Tools",
      education: "Edukasi",
      profile: "Profil",

      search: "Cari",
      settings: "Pengaturan",
      notifications: "Notifikasi",
      language: "Bahasa",
      appearance: "Tampilan",

      dark: "Gelap",
      light: "Terang",

      save: "Simpan",
      cancel: "Batal",
      close: "Tutup",

      profileTitle: "Profil",
      profileSubtitle: "Identitas NEXTRA kamu",
      editProfile: "Edit Profil",
      active: "Aktif",

      traderLevel: "LEVEL TRADER",
      rookieTrader: "Rookie Trader",

      currentPlan: "PAKET SAAT INI",
      freePlan: "NEXTRA Free",
      coreIntelligence: "Inteligensi market inti",
      upgrade: "Upgrade",

      watchlist: "Watchlist",
      alerts: "Alert",
      marketsCount: "Markets",

      achievements: "PENCAPAIAN",
      firstLook: "First Look",
      exploredNextra: "Menjelajahi NEXTRA",
      watcher: "Watcher",
      buildWatchlist: "Buat watchlist",
      futuresAchievement: "Futures",
      openFutures: "Buka futures",
      marketHunter: "Market Hunter",
      trackMarkets: "Pantau market",

      account: "AKUN",
      email: "Email",
      notConnected: "Belum terhubung",
      accountStatus: "Status Akun",
      activeAccount: "Akun aktif",

      quickActions: "AKSI CEPAT",
      manageFavoriteAssets: "Kelola aset favorit",
      binanceFuturesMarket: "Market Binance Futures",
      manageMarketAlerts: "Kelola alert market",

      preferences: "PREFERENSI",
      darkMode: "Mode gelap",

      aboutNextra: "TENTANG NEXTRA",
      yourMarketIntelligence:
        "Your Market. Your Intelligence.",

      displayName: "Nama tampilan",
      username: "Username",
      yourName: "Nama kamu",
      saveChanges: "Simpan perubahan",

      languageTitle: "Bahasa",
      selectLanguage: "Pilih bahasa",

      traderDescription:
        "Terus jelajahi NEXTRA untuk membuka level berikutnya.",

      xp: "XP"

    },


    /* ===================================================
       ENGLISH
    =================================================== */

    en: {

      home: "Home",
      markets: "Markets",
      trending: "Trending",
      futures: "Futures",
      tools: "Tools",
      education: "Education",
      profile: "Profile",

      search: "Search",
      settings: "Settings",
      notifications: "Notifications",
      language: "Language",
      appearance: "Appearance",

      dark: "Dark",
      light: "Light",

      save: "Save",
      cancel: "Cancel",
      close: "Close",

      profileTitle: "Profile",
      profileSubtitle: "Your NEXTRA identity",
      editProfile: "Edit Profile",
      active: "Active",

      traderLevel: "TRADER LEVEL",
      rookieTrader: "Rookie Trader",

      currentPlan: "CURRENT PLAN",
      freePlan: "NEXTRA Free",
      coreIntelligence: "Core market intelligence",
      upgrade: "Upgrade",

      watchlist: "Watchlist",
      alerts: "Alerts",
      marketsCount: "Markets",

      achievements: "ACHIEVEMENTS",
      firstLook: "First Look",
      exploredNextra: "Explored NEXTRA",
      watcher: "Watcher",
      buildWatchlist: "Build watchlist",
      futuresAchievement: "Futures",
      openFutures: "Open futures",
      marketHunter: "Market Hunter",
      trackMarkets: "Track markets",

      account: "ACCOUNT",
      email: "Email",
      notConnected: "Not connected",
      accountStatus: "Account Status",
      activeAccount: "Active account",

      quickActions: "QUICK ACTIONS",
      manageFavoriteAssets: "Manage favorite assets",
      binanceFuturesMarket: "Binance Futures market",
      manageMarketAlerts: "Manage market alerts",

      preferences: "PREFERENCES",
      darkMode: "Dark mode",

      aboutNextra: "ABOUT NEXTRA",
      yourMarketIntelligence:
        "Your Market. Your Intelligence.",

      displayName: "Display name",
      username: "Username",
      yourName: "Your name",
      saveChanges: "Save changes",

      languageTitle: "Language",
      selectLanguage: "Select language",

      traderDescription:
        "Keep exploring NEXTRA to unlock your next level.",

      xp: "XP"

    },


    /* ===================================================
       SPANISH
    =================================================== */

    es: {

      home: "Inicio",
      markets: "Mercados",
      trending: "Tendencias",
      futures: "Futuros",
      tools: "Herramientas",
      education: "Educación",
      profile: "Perfil",

      search: "Buscar",
      settings: "Configuración",
      notifications: "Notificaciones",
      language: "Idioma",
      appearance: "Apariencia",

      dark: "Oscuro",
      light: "Claro",

      save: "Guardar",
      cancel: "Cancelar",
      close: "Cerrar",

      profileTitle: "Perfil",
      profileSubtitle: "Tu identidad NEXTRA",
      editProfile: "Editar perfil",
      active: "Activo",

      traderLevel: "NIVEL DE TRADER",
      rookieTrader: "Trader principiante",

      currentPlan: "PLAN ACTUAL",
      freePlan: "NEXTRA Free",
      coreIntelligence: "Inteligencia de mercado",
      upgrade: "Mejorar",

      watchlist: "Lista de seguimiento",
      alerts: "Alertas",
      marketsCount: "Mercados",

      achievements: "LOGROS",
      firstLook: "Primera mirada",
      exploredNextra: "Exploraste NEXTRA",
      watcher: "Observador",
      buildWatchlist: "Crear lista",
      futuresAchievement: "Futuros",
      openFutures: "Abrir futuros",
      marketHunter: "Cazador de mercados",
      trackMarkets: "Seguir mercados",

      account: "CUENTA",
      email: "Correo",
      notConnected: "No conectado",
      accountStatus: "Estado de cuenta",
      activeAccount: "Cuenta activa",

      quickActions: "ACCIONES RÁPIDAS",
      manageFavoriteAssets: "Gestionar activos favoritos",
      binanceFuturesMarket: "Mercado Binance Futures",
      manageMarketAlerts: "Gestionar alertas",

      preferences: "PREFERENCIAS",
      darkMode: "Modo oscuro",

      aboutNextra: "ACERCA DE NEXTRA",
      yourMarketIntelligence:
        "Tu mercado. Tu inteligencia.",

      displayName: "Nombre para mostrar",
      username: "Nombre de usuario",
      yourName: "Tu nombre",
      saveChanges: "Guardar cambios",

      languageTitle: "Idioma",
      selectLanguage: "Seleccionar idioma",

      traderDescription:
        "Sigue explorando NEXTRA para desbloquear tu próximo nivel.",

      xp: "XP"

    },


    /* ===================================================
       FRENCH
    =================================================== */

    fr: {

      home: "Accueil",
      markets: "Marchés",
      trending: "Tendances",
      futures: "Futures",
      tools: "Outils",
      education: "Éducation",
      profile: "Profil",

      search: "Rechercher",
      settings: "Paramètres",
      notifications: "Notifications",
      language: "Langue",
      appearance: "Apparence",

      dark: "Sombre",
      light: "Clair",

      save: "Enregistrer",
      cancel: "Annuler",
      close: "Fermer",

      profileTitle: "Profil",
      profileSubtitle: "Votre identité NEXTRA",
      editProfile: "Modifier le profil",
      active: "Actif",

      traderLevel: "NIVEAU TRADER",
      rookieTrader: "Trader débutant",

      currentPlan: "FORFAIT ACTUEL",
      freePlan: "NEXTRA Free",
      coreIntelligence: "Intelligence du marché",
      upgrade: "Améliorer",

      watchlist: "Liste de suivi",
      alerts: "Alertes",
      marketsCount: "Marchés",

      achievements: "SUCCÈS",
      firstLook: "Premier regard",
      exploredNextra: "NEXTRA exploré",
      watcher: "Observateur",
      buildWatchlist: "Créer une liste",
      futuresAchievement: "Futures",
      openFutures: "Ouvrir les futures",
      marketHunter: "Chasseur de marchés",
      trackMarkets: "Suivre les marchés",

      account: "COMPTE",
      email: "E-mail",
      notConnected: "Non connecté",
      accountStatus: "État du compte",
      activeAccount: "Compte actif",

      quickActions: "ACTIONS RAPIDES",
      manageFavoriteAssets: "Gérer les actifs favoris",
      binanceFuturesMarket: "Marché Binance Futures",
      manageMarketAlerts: "Gérer les alertes",

      preferences: "PRÉFÉRENCES",
      darkMode: "Mode sombre",

      aboutNextra: "À PROPOS DE NEXTRA",
      yourMarketIntelligence:
        "Votre marché. Votre intelligence.",

      displayName: "Nom affiché",
      username: "Nom d'utilisateur",
      yourName: "Votre nom",
      saveChanges: "Enregistrer les modifications",

      languageTitle: "Langue",
      selectLanguage: "Choisir la langue",

      traderDescription:
        "Continuez à explorer NEXTRA pour débloquer votre prochain niveau.",

      xp: "XP"

    },


    /* ===================================================
       GERMAN
    =================================================== */

    de: {

      home: "Startseite",
      markets: "Märkte",
      trending: "Trends",
      futures: "Futures",
      tools: "Werkzeuge",
      education: "Bildung",
      profile: "Profil",

      search: "Suchen",
      settings: "Einstellungen",
      notifications: "Benachrichtigungen",
      language: "Sprache",
      appearance: "Darstellung",

      dark: "Dunkel",
      light: "Hell",

      save: "Speichern",
      cancel: "Abbrechen",
      close: "Schließen",

      profileTitle: "Profil",
      profileSubtitle: "Deine NEXTRA-Identität",
      editProfile: "Profil bearbeiten",
      active: "Aktiv",

      traderLevel: "TRADER-LEVEL",
      rookieTrader: "Anfänger-Trader",

      currentPlan: "AKTUELLER TARIF",
      freePlan: "NEXTRA Free",
      coreIntelligence: "Kern-Marktintelligenz",
      upgrade: "Upgrade",

      watchlist: "Watchlist",
      alerts: "Alarme",
      marketsCount: "Märkte",

      achievements: "ERFOLGE",
      firstLook: "Erster Blick",
      exploredNextra: "NEXTRA erkundet",
      watcher: "Beobachter",
      buildWatchlist: "Watchlist erstellen",
      futuresAchievement: "Futures",
      openFutures: "Futures öffnen",
      marketHunter: "Marktjäger",
      trackMarkets: "Märkte verfolgen",

      account: "KONTO",
      email: "E-Mail",
      notConnected: "Nicht verbunden",
      accountStatus: "Kontostatus",
      activeAccount: "Aktives Konto",

      quickActions: "SCHNELLZUGRIFFE",
      manageFavoriteAssets: "Favoriten verwalten",
      binanceFuturesMarket: "Binance Futures Markt",
      manageMarketAlerts: "Marktalarme verwalten",

      preferences: "EINSTELLUNGEN",
      darkMode: "Dunkelmodus",

      aboutNextra: "ÜBER NEXTRA",
      yourMarketIntelligence:
        "Dein Markt. Deine Intelligenz.",

      displayName: "Anzeigename",
      username: "Benutzername",
      yourName: "Dein Name",
      saveChanges: "Änderungen speichern",

      languageTitle: "Sprache",
      selectLanguage: "Sprache auswählen",

      traderDescription:
        "Erkunde NEXTRA weiter, um dein nächstes Level freizuschalten.",

      xp: "XP"

    },


    /* ===================================================
       ITALIAN
    =================================================== */

    it: {

      home: "Home",
      markets: "Mercati",
      trending: "Tendenze",
      futures: "Futures",
      tools: "Strumenti",
      education: "Formazione",
      profile: "Profilo",

      search: "Cerca",
      settings: "Impostazioni",
      notifications: "Notifiche",
      language: "Lingua",
      appearance: "Aspetto",

      dark: "Scuro",
      light: "Chiaro",

      save: "Salva",
      cancel: "Annulla",
      close: "Chiudi",

      profileTitle: "Profilo",
      profileSubtitle: "La tua identità NEXTRA",
      editProfile: "Modifica profilo",
      active: "Attivo",

      traderLevel: "LIVELLO TRADER",
      rookieTrader: "Trader principiante",

      currentPlan: "PIANO ATTUALE",
      freePlan: "NEXTRA Free",
      coreIntelligence: "Intelligenza di mercato",
      upgrade: "Upgrade",

      watchlist: "Watchlist",
      alerts: "Avvisi",
      marketsCount: "Mercati",

      achievements: "OBIETTIVI",
      firstLook: "Primo sguardo",
      exploredNextra: "Hai esplorato NEXTRA",
      watcher: "Osservatore",
      buildWatchlist: "Crea watchlist",
      futuresAchievement: "Futures",
      openFutures: "Apri futures",
      marketHunter: "Cacciatore di mercati",
      trackMarkets: "Segui i mercati",

      account: "ACCOUNT",
      email: "Email",
      notConnected: "Non connesso",
      accountStatus: "Stato account",
      activeAccount: "Account attivo",

      quickActions: "AZIONI RAPIDE",
      manageFavoriteAssets: "Gestisci asset preferiti",
      binanceFuturesMarket: "Mercato Binance Futures",
      manageMarketAlerts: "Gestisci avvisi",

      preferences: "PREFERENZE",
      darkMode: "Modalità scura",

      aboutNextra: "INFORMAZIONI SU NEXTRA",
      yourMarketIntelligence:
        "Il tuo mercato. La tua intelligenza.",

      displayName: "Nome visualizzato",
      username: "Nome utente",
      yourName: "Il tuo nome",
      saveChanges: "Salva modifiche",

      languageTitle: "Lingua",
      selectLanguage: "Seleziona lingua",

      traderDescription:
        "Continua a esplorare NEXTRA per sbloccare il prossimo livello.",

      xp: "XP"

    },


    /* ===================================================
       PORTUGUESE
    =================================================== */

    pt: {

      home: "Início",
      markets: "Mercados",
      trending: "Tendências",
      futures: "Futuros",
      tools: "Ferramentas",
      education: "Educação",
      profile: "Perfil",

      search: "Pesquisar",
      settings: "Configurações",
      notifications: "Notificações",
      language: "Idioma",
      appearance: "Aparência",

      dark: "Escuro",
      light: "Claro",

      save: "Salvar",
      cancel: "Cancelar",
      close: "Fechar",

      profileTitle: "Perfil",
      profileSubtitle: "Sua identidade NEXTRA",
      editProfile: "Editar perfil",
      active: "Ativo",

      traderLevel: "NÍVEL DO TRADER",
      rookieTrader: "Trader iniciante",

      currentPlan: "PLANO ATUAL",
      freePlan: "NEXTRA Free",
      coreIntelligence: "Inteligência de mercado",
      upgrade: "Atualizar",

      watchlist: "Lista de observação",
      alerts: "Alertas",
      marketsCount: "Mercados",

      achievements: "CONQUISTAS",
      firstLook: "Primeiro olhar",
      exploredNextra: "Explorou o NEXTRA",
      watcher: "Observador",
      buildWatchlist: "Criar lista",
      futuresAchievement: "Futuros",
      openFutures: "Abrir futuros",
      marketHunter: "Caçador de mercados",
      trackMarkets: "Acompanhar mercados",

      account: "CONTA",
      email: "E-mail",
      notConnected: "Não conectado",
      accountStatus: "Status da conta",
      activeAccount: "Conta ativa",

      quickActions: "AÇÕES RÁPIDAS",
      manageFavoriteAssets: "Gerenciar ativos favoritos",
      binanceFuturesMarket: "Mercado Binance Futures",
      manageMarketAlerts: "Gerenciar alertas",

      preferences: "PREFERÊNCIAS",
      darkMode: "Modo escuro",

      aboutNextra: "SOBRE O NEXTRA",
      yourMarketIntelligence:
        "Seu mercado. Sua inteligência.",

      displayName: "Nome de exibição",
      username: "Nome de usuário",
      yourName: "Seu nome",
      saveChanges: "Salvar alterações",

      languageTitle: "Idioma",
      selectLanguage: "Selecionar idioma",

      traderDescription:
        "Continue explorando o NEXTRA para desbloquear seu próximo nível.",

      xp: "XP"

    },


    /* ===================================================
       PORTUGUESE BRAZIL
    =================================================== */

    "pt-BR": {

      home: "Início",
      markets: "Mercados",
      trending: "Tendências",
      futures: "Futuros",
      tools: "Ferramentas",
      education: "Educação",
      profile: "Perfil",

      search: "Pesquisar",
      settings: "Configurações",
      notifications: "Notificações",
      language: "Idioma",
      appearance: "Aparência",

      dark: "Escuro",
      light: "Claro",

      save: "Salvar",
      cancel: "Cancelar",
      close: "Fechar",

      profileTitle: "Perfil",
      profileSubtitle: "Sua identidade NEXTRA",
      editProfile: "Editar perfil",
      active: "Ativo",

      traderLevel: "NÍVEL DO TRADER",
      rookieTrader: "Trader iniciante",

      currentPlan: "PLANO ATUAL",
      freePlan: "NEXTRA Free",
      coreIntelligence: "Inteligência de mercado",
      upgrade: "Atualizar",

      watchlist: "Lista de observação",
      alerts: "Alertas",
      marketsCount: "Mercados",

      achievements: "CONQUISTAS",
      firstLook: "Primeiro olhar",
      exploredNextra: "Explorou o NEXTRA",
      watcher: "Observador",
      buildWatchlist: "Criar lista",
      futuresAchievement: "Futuros",
      openFutures: "Abrir futuros",
      marketHunter: "Caçador de mercados",
      trackMarkets: "Acompanhar mercados",

      account: "CONTA",
      email: "E-mail",
      notConnected: "Não conectado",
      accountStatus: "Status da conta",
      activeAccount: "Conta ativa",

      quickActions: "AÇÕES RÁPIDAS",
      manageFavoriteAssets: "Gerenciar ativos favoritos",
      binanceFuturesMarket: "Mercado Binance Futures",
      manageMarketAlerts: "Gerenciar alertas",

      preferences: "PREFERÊNCIAS",
      darkMode: "Modo escuro",

      aboutNextra: "SOBRE O NEXTRA",
      yourMarketIntelligence:
        "Seu mercado. Sua inteligência.",

      displayName: "Nome de exibição",
      username: "Nome de usuário",
      yourName: "Seu nome",
      saveChanges: "Salvar alterações",

      languageTitle: "Idioma",
      selectLanguage: "Selecionar idioma",

      traderDescription:
        "Continue explorando o NEXTRA para desbloquear seu próximo nível.",

      xp: "XP"

    },


    /* ===================================================
       RUSSIAN
    =================================================== */

    ru: {

      home: "Главная",
      markets: "Рынки",
      trending: "Тренды",
      futures: "Фьючерсы",
      tools: "Инструменты",
      education: "Обучение",
      profile: "Профиль",

      search: "Поиск",
      settings: "Настройки",
      notifications: "Уведомления",
      language: "Язык",
      appearance: "Внешний вид",

      dark: "Темная",
      light: "Светлая",

      save: "Сохранить",
      cancel: "Отмена",
      close: "Закрыть",

      profileTitle: "Профиль",
      profileSubtitle: "Ваша идентичность NEXTRA",
      editProfile: "Изменить профиль",
      active: "Активен",

      traderLevel: "УРОВЕНЬ ТРЕЙДЕРА",
      rookieTrader: "Начинающий трейдер",

      currentPlan: "ТЕКУЩИЙ ПЛАН",
      freePlan: "NEXTRA Free",
      coreIntelligence: "Рыночная аналитика",
      upgrade: "Обновить",

      watchlist: "Избранное",
      alerts: "Оповещения",
      marketsCount: "Рынки",

      achievements: "ДОСТИЖЕНИЯ",
      firstLook: "Первый взгляд",
      exploredNextra: "NEXTRA изучен",
      watcher: "Наблюдатель",
      buildWatchlist: "Создать список",
      futuresAchievement: "Фьючерсы",
      openFutures: "Открыть фьючерсы",
      marketHunter: "Охотник за рынком",
      trackMarkets: "Отслеживать рынки",

      account: "АККАУНТ",
      email: "Электронная почта",
      notConnected: "Не подключено",
      accountStatus: "Статус аккаунта",
      activeAccount: "Активный аккаунт",

      quickActions: "БЫСТРЫЕ ДЕЙСТВИЯ",
      manageFavoriteAssets: "Управление избранными активами",
      binanceFuturesMarket: "Рынок Binance Futures",
      manageMarketAlerts: "Управление оповещениями",

      preferences: "ПРЕДПОЧТЕНИЯ",
      darkMode: "Темный режим",

      aboutNextra: "О NEXTRA",
      yourMarketIntelligence:
        "Ваш рынок. Ваш интеллект.",

      displayName: "Отображаемое имя",
      username: "Имя пользователя",
      yourName: "Ваше имя",
      saveChanges: "Сохранить изменения",

      languageTitle: "Язык",
      selectLanguage: "Выберите язык",

      traderDescription:
        "Продолжайте изучать NEXTRA, чтобы открыть следующий уровень.",

      xp: "XP"

    },


    /* ===================================================
       CHINESE
    =================================================== */

    zh: {

      home: "首页",
      markets: "市场",
      trending: "趋势",
      futures: "期货",
      tools: "工具",
      education: "教育",
      profile: "个人资料",

      search: "搜索",
      settings: "设置",
      notifications: "通知",
      language: "语言",
      appearance: "外观",

      dark: "深色",
      light: "浅色",

      save: "保存",
      cancel: "取消",
      close: "关闭",

      profileTitle: "个人资料",
      profileSubtitle: "你的 NEXTRA 身份",
      editProfile: "编辑资料",
      active: "活跃",

      traderLevel: "交易员等级",
      rookieTrader: "新手交易员",

      currentPlan: "当前方案",
      freePlan: "NEXTRA Free",
      coreIntelligence: "核心市场情报",
      upgrade: "升级",

      watchlist: "自选列表",
      alerts: "提醒",
      marketsCount: "市场",

      achievements: "成就",
      firstLook: "初次探索",
      exploredNextra: "探索 NEXTRA",
      watcher: "观察者",
      buildWatchlist: "建立自选列表",
      futuresAchievement: "期货",
      openFutures: "打开期货",
      marketHunter: "市场猎手",
      trackMarkets: "追踪市场",

      account: "账户",
      email: "邮箱",
      notConnected: "未连接",
      accountStatus: "账户状态",
      activeAccount: "账户活跃",

      quickActions: "快捷操作",
      manageFavoriteAssets: "管理收藏资产",
      binanceFuturesMarket: "Binance Futures 市场",
      manageMarketAlerts: "管理市场提醒",

      preferences: "偏好设置",
      darkMode: "深色模式",

      aboutNextra: "关于 NEXTRA",
      yourMarketIntelligence:
        "你的市场，你的智能。",

      displayName: "显示名称",
      username: "用户名",
      yourName: "你的名字",
      saveChanges: "保存更改",

      languageTitle: "语言",
      selectLanguage: "选择语言",

      traderDescription:
        "继续探索 NEXTRA，解锁下一个等级。",

      xp: "XP"

    },


    /* ===================================================
       TRADITIONAL CHINESE
    =================================================== */

    "zh-TW": {

      home: "首頁",
      markets: "市場",
      trending: "趨勢",
      futures: "期貨",
      tools: "工具",
      education: "教育",
      profile: "個人資料",

      search: "搜尋",
      settings: "設定",
      notifications: "通知",
      language: "語言",
      appearance: "外觀",

      dark: "深色",
      light: "淺色",

      save: "儲存",
      cancel: "取消",
      close: "關閉",

      profileTitle: "個人資料",
      profileSubtitle: "你的 NEXTRA 身份",
      editProfile: "編輯個人資料",
      active: "啟用",

      traderLevel: "交易員等級",
      rookieTrader: "新手交易員",

      currentPlan: "目前方案",
      freePlan: "NEXTRA Free",
      coreIntelligence: "核心市場情報",
      upgrade: "升級",

      watchlist: "自選清單",
      alerts: "提醒",
      marketsCount: "市場",

      achievements: "成就",
      firstLook: "初次探索",
      exploredNextra: "探索 NEXTRA",
      watcher: "觀察者",
      buildWatchlist: "建立自選清單",
      futuresAchievement: "期貨",
      openFutures: "開啟期貨",
      marketHunter: "市場獵人",
      trackMarkets: "追蹤市場",

      account: "帳戶",
      email: "電子郵件",
      notConnected: "未連接",
      accountStatus: "帳戶狀態",
      activeAccount: "帳戶啟用",

      quickActions: "快速操作",
      manageFavoriteAssets: "管理收藏資產",
      binanceFuturesMarket: "Binance Futures 市場",
      manageMarketAlerts: "管理市場提醒",

      preferences: "偏好設定",
      darkMode: "深色模式",

      aboutNextra: "關於 NEXTRA",
      yourMarketIntelligence:
        "你的市場，你的智慧。",

      displayName: "顯示名稱",
      username: "使用者名稱",
      yourName: "你的名字",
      saveChanges: "儲存變更",

      languageTitle: "語言",
      selectLanguage: "選擇語言",

      traderDescription:
        "繼續探索 NEXTRA，解鎖下一個等級。",

      xp: "XP"

    },


    /* ===================================================
       JAPANESE
    =================================================== */

    ja: {

      home: "ホーム",
      markets: "市場",
      trending: "トレンド",
      futures: "先物",
      tools: "ツール",
      education: "教育",
      profile: "プロフィール",

      search: "検索",
      settings: "設定",
      notifications: "通知",
      language: "言語",
      appearance: "外観",

      dark: "ダーク",
      light: "ライト",

      save: "保存",
      cancel: "キャンセル",
      close: "閉じる",

      profileTitle: "プロフィール",
      profileSubtitle: "あなたのNEXTRAアイデンティティ",
      editProfile: "プロフィールを編集",
      active: "アクティブ",

      traderLevel: "トレーダーレベル",
      rookieTrader: "ルーキートレーダー",

      currentPlan: "現在のプラン",
      freePlan: "NEXTRA Free",
      coreIntelligence: "市場インテリジェンス",
      upgrade: "アップグレード",

      watchlist: "ウォッチリスト",
      alerts: "アラート",
      marketsCount: "市場",

      achievements: "実績",
      firstLook: "ファーストルック",
      exploredNextra: "NEXTRAを探索",
      watcher: "ウォッチャー",
      buildWatchlist: "ウォッチリストを作成",
      futuresAchievement: "先物",
      openFutures: "先物を開く",
      marketHunter: "マーケットハンター",
      trackMarkets: "市場を追跡",

      account: "アカウント",
      email: "メール",
      notConnected: "未接続",
      accountStatus: "アカウント状態",
      activeAccount: "アクティブ",

      quickActions: "クイックアクション",
      manageFavoriteAssets: "お気に入り資産を管理",
      binanceFuturesMarket: "Binance Futures市場",
      manageMarketAlerts: "市場アラートを管理",

      preferences: "環境設定",
      darkMode: "ダークモード",

      aboutNextra: "NEXTRAについて",
      yourMarketIntelligence:
        "あなたの市場。あなたのインテリジェンス。",

      displayName: "表示名",
      username: "ユーザー名",
      yourName: "あなたの名前",
      saveChanges: "変更を保存",

      languageTitle: "言語",
      selectLanguage: "言語を選択",

      traderDescription:
        "NEXTRAを探索して次のレベルを解除しましょう。",

      xp: "XP"

    },


    /* ===================================================
       KOREAN
    =================================================== */

    ko: {

      home: "홈",
      markets: "시장",
      trending: "트렌딩",
      futures: "선물",
      tools: "도구",
      education: "교육",
      profile: "프로필",

      search: "검색",
      settings: "설정",
      notifications: "알림",
      language: "언어",
      appearance: "화면",

      dark: "어둡게",
      light: "밝게",

      save: "저장",
      cancel: "취소",
      close: "닫기",

      profileTitle: "프로필",
      profileSubtitle: "나의 NEXTRA 아이덴티티",
      editProfile: "프로필 수정",
      active: "활성",

      traderLevel: "트레이더 레벨",
      rookieTrader: "초보 트레이더",

      currentPlan: "현재 플랜",
      freePlan: "NEXTRA Free",
      coreIntelligence: "핵심 시장 인텔리전스",
      upgrade: "업그레이드",

      watchlist: "관심 목록",
      alerts: "알림",
      marketsCount: "시장",

      achievements: "업적",
      firstLook: "첫 탐색",
      exploredNextra: "NEXTRA 탐색",
      watcher: "워처",
      buildWatchlist: "관심 목록 만들기",
      futuresAchievement: "선물",
      openFutures: "선물 열기",
      marketHunter: "마켓 헌터",
      trackMarkets: "시장 추적",

      account: "계정",
      email: "이메일",
      notConnected: "연결되지 않음",
      accountStatus: "계정 상태",
      activeAccount: "활성 계정",

      quickActions: "빠른 작업",
      manageFavoriteAssets: "즐겨찾기 자산 관리",
      binanceFuturesMarket: "Binance Futures 시장",
      manageMarketAlerts: "시장 알림 관리",

      preferences: "환경설정",
      darkMode: "다크 모드",

      aboutNextra: "NEXTRA 정보",
      yourMarketIntelligence:
        "당신의 시장. 당신의 인텔리전스.",

      displayName: "표시 이름",
      username: "사용자 이름",
      yourName: "이름",
      saveChanges: "변경사항 저장",

      languageTitle: "언어",
      selectLanguage: "언어 선택",

      traderDescription:
        "NEXTRA를 계속 탐색하여 다음 레벨을 잠금 해제하세요.",

      xp: "XP"

    },


    /* ===================================================
       TURKISH
    =================================================== */

    tr: {

      home: "Ana Sayfa",
      markets: "Piyasalar",
      trending: "Trendler",
      futures: "Vadeli İşlemler",
      tools: "Araçlar",
      education: "Eğitim",
      profile: "Profil",

      search: "Ara",
      settings: "Ayarlar",
      notifications: "Bildirimler",
      language: "Dil",
      appearance: "Görünüm",

      dark: "Koyu",
      light: "Açık",

      save: "Kaydet",
      cancel: "İptal",
      close: "Kapat",

      profileTitle: "Profil",
      profileSubtitle: "NEXTRA kimliğiniz",
      editProfile: "Profili düzenle",
      active: "Aktif",

      traderLevel: "TRADER SEVİYESİ",
      rookieTrader: "Acemi Trader",

      currentPlan: "MEVCUT PLAN",
      freePlan: "NEXTRA Free",
      coreIntelligence: "Temel piyasa istihbaratı",
      upgrade: "Yükselt",

      watchlist: "İzleme Listesi",
      alerts: "Uyarılar",
      marketsCount: "Piyasalar",

      achievements: "BAŞARILAR",
      firstLook: "İlk Bakış",
      exploredNextra: "NEXTRA keşfedildi",
      watcher: "İzleyici",
      buildWatchlist: "Liste oluştur",
      futuresAchievement: "Vadeli İşlemler",
      openFutures: "Vadeli işlemleri aç",
      marketHunter: "Piyasa Avcısı",
      trackMarkets: "Piyasaları takip et",

      account: "HESAP",
      email: "E-posta",
      notConnected: "Bağlı değil",
      accountStatus: "Hesap Durumu",
      activeAccount: "Aktif hesap",

      quickActions: "HIZLI İŞLEMLER",
      manageFavoriteAssets: "Favori varlıkları yönet",
      binanceFuturesMarket: "Binance Futures piyasası",
      manageMarketAlerts: "Piyasa uyarılarını yönet",

      preferences: "TERCİHLER",
      darkMode: "Koyu mod",

      aboutNextra: "NEXTRA HAKKINDA",
      yourMarketIntelligence:
        "Piyasanız. İstihbaratınız.",

      displayName: "Görünen ad",
      username: "Kullanıcı adı",
      yourName: "Adınız",
      saveChanges: "Değişiklikleri kaydet",

      languageTitle: "Dil",
      selectLanguage: "Dil seç",

      traderDescription:
        "Sonraki seviyenin kilidini açmak için NEXTRA'yı keşfetmeye devam edin.",

      xp: "XP"

    },


    /* ===================================================
       VIETNAMESE
    =================================================== */

    vi: {

      home: "Trang chủ",
      markets: "Thị trường",
      trending: "Xu hướng",
      futures: "Hợp đồng tương lai",
      tools: "Công cụ",
      education: "Giáo dục",
      profile: "Hồ sơ",

      search: "Tìm kiếm",
      settings: "Cài đặt",
      notifications: "Thông báo",
      language: "Ngôn ngữ",
      appearance: "Giao diện",

      dark: "Tối",
      light: "Sáng",

      save: "Lưu",
      cancel: "Hủy",
      close: "Đóng",

      profileTitle: "Hồ sơ",
      profileSubtitle: "Danh tính NEXTRA của bạn",
      editProfile: "Chỉnh sửa hồ sơ",
      active: "Đang hoạt động",

      traderLevel: "CẤP ĐỘ TRADER",
      rookieTrader: "Trader mới",

      currentPlan: "GÓI HIỆN TẠI",
      freePlan: "NEXTRA Free",
      coreIntelligence: "Thông tin thị trường cốt lõi",
      upgrade: "Nâng cấp",

      watchlist: "Danh sách theo dõi",
      alerts: "Cảnh báo",
      marketsCount: "Thị trường",

      achievements: "THÀNH TÍCH",
      firstLook: "Khám phá đầu tiên",
      exploredNextra: "Đã khám phá NEXTRA",
      watcher: "Người theo dõi",
      buildWatchlist: "Tạo danh sách",
      futuresAchievement: "Futures",
      openFutures: "Mở Futures",
      marketHunter: "Thợ săn thị trường",
      trackMarkets: "Theo dõi thị trường",

      account: "TÀI KHOẢN",
      email: "Email",
      notConnected: "Chưa kết nối",
      accountStatus: "Trạng thái tài khoản",
      activeAccount: "Tài khoản hoạt động",

      quickActions: "THAO TÁC NHANH",
      manageFavoriteAssets: "Quản lý tài sản yêu thích",
      binanceFuturesMarket: "Thị trường Binance Futures",
      manageMarketAlerts: "Quản lý cảnh báo",

      preferences: "TÙY CHỌN",
      darkMode: "Chế độ tối",

      aboutNextra: "VỀ NEXTRA",
      yourMarketIntelligence:
        "Thị trường của bạn. Trí tuệ của bạn.",

      displayName: "Tên hiển thị",
      username: "Tên người dùng",
      yourName: "Tên của bạn",
      saveChanges: "Lưu thay đổi",

      languageTitle: "Ngôn ngữ",
      selectLanguage: "Chọn ngôn ngữ",

      traderDescription:
        "Tiếp tục khám phá NEXTRA để mở khóa cấp độ tiếp theo.",

      xp: "XP"

    },


    /* ===================================================
       THAI
    =================================================== */

    th: {

      home: "หน้าหลัก",
      markets: "ตลาด",
      trending: "กำลังมาแรง",
      futures: "ฟิวเจอร์ส",
      tools: "เครื่องมือ",
      education: "การศึกษา",
      profile: "โปรไฟล์",

      search: "ค้นหา",
      settings: "การตั้งค่า",
      notifications: "การแจ้งเตือน",
      language: "ภาษา",
      appearance: "รูปลักษณ์",

      dark: "มืด",
      light: "สว่าง",

      save: "บันทึก",
      cancel: "ยกเลิก",
      close: "ปิด",

      profileTitle: "โปรไฟล์",
      profileSubtitle: "ตัวตน NEXTRA ของคุณ",
      editProfile: "แก้ไขโปรไฟล์",
      active: "ใช้งานอยู่",

      traderLevel: "ระดับเทรดเดอร์",
      rookieTrader: "เทรดเดอร์มือใหม่",

      currentPlan: "แพ็กเกจปัจจุบัน",
      freePlan: "NEXTRA Free",
      coreIntelligence: "ข้อมูลตลาดหลัก",
      upgrade: "อัปเกรด",

      watchlist: "รายการติดตาม",
      alerts: "การแจ้งเตือน",
      marketsCount: "ตลาด",

      achievements: "ความสำเร็จ",
      firstLook: "เริ่มต้นสำรวจ",
      exploredNextra: "สำรวจ NEXTRA",
      watcher: "ผู้ติดตาม",
      buildWatchlist: "สร้างรายการติดตาม",
      futuresAchievement: "ฟิวเจอร์ส",
      openFutures: "เปิดฟิวเจอร์ส",
      marketHunter: "นักล่าตลาด",
      trackMarkets: "ติดตามตลาด",

      account: "บัญชี",
      email: "อีเมล",
      notConnected: "ไม่ได้เชื่อมต่อ",
      accountStatus: "สถานะบัญชี",
      activeAccount: "บัญชีใช้งานอยู่",

      quickActions: "การดำเนินการด่วน",
      manageFavoriteAssets: "จัดการสินทรัพย์โปรด",
      binanceFuturesMarket: "ตลาด Binance Futures",
      manageMarketAlerts: "จัดการการแจ้งเตือน",

      preferences: "การตั้งค่า",
      darkMode: "โหมดมืด",

      aboutNextra: "เกี่ยวกับ NEXTRA",
      yourMarketIntelligence:
        "ตลาดของคุณ ปัญญาของคุณ",

      displayName: "ชื่อที่แสดง",
      username: "ชื่อผู้ใช้",
      yourName: "ชื่อของคุณ",
      saveChanges: "บันทึกการเปลี่ยนแปลง",

      languageTitle: "ภาษา",
      selectLanguage: "เลือกภาษา",

      traderDescription:
        "สำรวจ NEXTRA ต่อไปเพื่อปลดล็อกระดับถัดไป",

      xp: "XP"

    },


    /* ===================================================
       ARABIC
    =================================================== */

    ar: {

      home: "الرئيسية",
      markets: "الأسواق",
      trending: "الرائج",
      futures: "العقود الآجلة",
      tools: "الأدوات",
      education: "التعليم",
      profile: "الملف الشخصي",

      search: "بحث",
      settings: "الإعدادات",
      notifications: "الإشعارات",
      language: "اللغة",
      appearance: "المظهر",

      dark: "داكن",
      light: "فاتح",

      save: "حفظ",
      cancel: "إلغاء",
      close: "إغلاق",

      profileTitle: "الملف الشخصي",
      profileSubtitle: "هويتك في NEXTRA",
      editProfile: "تعديل الملف الشخصي",
      active: "نشط",

      traderLevel: "مستوى المتداول",
      rookieTrader: "متداول مبتدئ",

      currentPlan: "الخطة الحالية",
      freePlan: "NEXTRA Free",
      coreIntelligence: "ذكاء السوق الأساسي",
      upgrade: "ترقية",

      watchlist: "قائمة المراقبة",
      alerts: "التنبيهات",
      marketsCount: "الأسواق",

      achievements: "الإنجازات",
      firstLook: "النظرة الأولى",
      exploredNextra: "استكشفت NEXTRA",
      watcher: "مراقب",
      buildWatchlist: "إنشاء قائمة",
      futuresAchievement: "العقود الآجلة",
      openFutures: "فتح العقود الآجلة",
      marketHunter: "صياد السوق",
      trackMarkets: "تتبع الأسواق",

      account: "الحساب",
      email: "البريد الإلكتروني",
      notConnected: "غير متصل",
      accountStatus: "حالة الحساب",
      activeAccount: "حساب نشط",

      quickActions: "إجراءات سريعة",
      manageFavoriteAssets: "إدارة الأصول المفضلة",
      binanceFuturesMarket: "سوق Binance Futures",
      manageMarketAlerts: "إدارة تنبيهات السوق",

      preferences: "التفضيلات",
      darkMode: "الوضع الداكن",

      aboutNextra: "حول NEXTRA",
      yourMarketIntelligence:
        "سوقك. ذكاؤك.",

      displayName: "الاسم المعروض",
      username: "اسم المستخدم",
      yourName: "اسمك",
      saveChanges: "حفظ التغييرات",

      languageTitle: "اللغة",
      selectLanguage: "اختر اللغة",

      traderDescription:
        "استمر في استكشاف NEXTRA لفتح المستوى التالي.",

      xp: "XP"

    },


    /* ===================================================
       HINDI
    =================================================== */

    hi: {

      home: "होम",
      markets: "बाज़ार",
      trending: "ट्रेंडिंग",
      futures: "फ्यूचर्स",
      tools: "टूल्स",
      education: "शिक्षा",
      profile: "प्रोफ़ाइल",

      search: "खोजें",
      settings: "सेटिंग्स",
      notifications: "सूचनाएं",
      language: "भाषा",
      appearance: "रूप",

      dark: "डार्क",
      light: "लाइट",

      save: "सहेजें",
      cancel: "रद्द करें",
      close: "बंद करें",

      profileTitle: "प्रोफ़ाइल",
      profileSubtitle: "आपकी NEXTRA पहचान",
      editProfile: "प्रोफ़ाइल संपादित करें",
      active: "सक्रिय",

      traderLevel: "ट्रेडर स्तर",
      rookieTrader: "नए ट्रेडर",

      currentPlan: "वर्तमान प्लान",
      freePlan: "NEXTRA Free",
      coreIntelligence: "मुख्य मार्केट इंटेलिजेंस",
      upgrade: "अपग्रेड",

      watchlist: "वॉचलिस्ट",
      alerts: "अलर्ट",
      marketsCount: "बाज़ार",

      achievements: "उपलब्धियां",
      firstLook: "पहली नज़र",
      exploredNextra: "NEXTRA एक्सप्लोर किया",
      watcher: "वॉचर",
      buildWatchlist: "वॉचलिस्ट बनाएं",
      futuresAchievement: "फ्यूचर्स",
      openFutures: "फ्यूचर्स खोलें",
      marketHunter: "मार्केट हंटर",
      trackMarkets: "मार्केट ट्रैक करें",

      account: "खाता",
      email: "ईमेल",
      notConnected: "कनेक्ट नहीं है",
      accountStatus: "खाता स्थिति",
      activeAccount: "सक्रिय खाता",

      quickActions: "त्वरित कार्य",
      manageFavoriteAssets: "पसंदीदा एसेट प्रबंधित करें",
      binanceFuturesMarket: "Binance Futures मार्केट",
      manageMarketAlerts: "मार्केट अलर्ट प्रबंधित करें",

      preferences: "प्राथमिकताएं",
      darkMode: "डार्क मोड",

      aboutNextra: "NEXTRA के बारे में",
      yourMarketIntelligence:
        "आपका बाज़ार। आपकी बुद्धिमत्ता।",

      displayName: "प्रदर्शित नाम",
      username: "उपयोगकर्ता नाम",
      yourName: "आपका नाम",
      saveChanges: "परिवर्तन सहेजें",

      languageTitle: "भाषा",
      selectLanguage: "भाषा चुनें",

      traderDescription:
        "अगले स्तर को अनलॉक करने के लिए NEXTRA को एक्सप्लोर करते रहें।",

      xp: "XP"

    },


    /* ===================================================
       DUTCH
    =================================================== */

    nl: {

      home: "Home",
      markets: "Markten",
      trending: "Trending",
      futures: "Futures",
      tools: "Tools",
      education: "Educatie",
      profile: "Profiel",

      search: "Zoeken",
      settings: "Instellingen",
      notifications: "Meldingen",
      language: "Taal",
      appearance: "Weergave",

      dark: "Donker",
      light: "Licht",

      save: "Opslaan",
      cancel: "Annuleren",
      close: "Sluiten",

      profileTitle: "Profiel",
      profileSubtitle: "Jouw NEXTRA-identiteit",
      editProfile: "Profiel bewerken",
      active: "Actief",

      traderLevel: "TRADER-NIVEAU",
      rookieTrader: "Beginnende trader",

      currentPlan: "HUIDIG PLAN",
      freePlan: "NEXTRA Free",
      coreIntelligence: "Marktintelligentie",
      upgrade: "Upgraden",

      watchlist: "Volglijst",
      alerts: "Meldingen",
      marketsCount: "Markten",

      achievements: "PRESTATIES",
      firstLook: "Eerste blik",
      exploredNextra: "NEXTRA verkend",
      watcher: "Watcher",
      buildWatchlist: "Volglijst maken",
      futuresAchievement: "Futures",
      openFutures: "Futures openen",
      marketHunter: "Marktjager",
      trackMarkets: "Markten volgen",

      account: "ACCOUNT",
      email: "E-mail",
      notConnected: "Niet verbonden",
      accountStatus: "Accountstatus",
      activeAccount: "Actief account",

      quickActions: "SNELLE ACTIES",
      manageFavoriteAssets: "Favoriete activa beheren",
      binanceFuturesMarket: "Binance Futures-markt",
      manageMarketAlerts: "Marktwaarschuwingen beheren",

      preferences: "VOORKEUREN",
      darkMode: "Donkere modus",

      aboutNextra: "OVER NEXTRA",
      yourMarketIntelligence:
        "Jouw markt. Jouw intelligentie.",

      displayName: "Weergavenaam",
      username: "Gebruikersnaam",
      yourName: "Jouw naam",
      saveChanges: "Wijzigingen opslaan",

      languageTitle: "Taal",
      selectLanguage: "Taal selecteren",

      traderDescription:
        "Blijf NEXTRA ontdekken om je volgende niveau vrij te spelen.",

      xp: "XP"

    },


    /* ===================================================
       POLISH
    =================================================== */

    pl: {

      home: "Strona główna",
      markets: "Rynki",
      trending: "Trendy",
      futures: "Futures",
      tools: "Narzędzia",
      education: "Edukacja",
      profile: "Profil",

      search: "Szukaj",
      settings: "Ustawienia",
      notifications: "Powiadomienia",
      language: "Język",
      appearance: "Wygląd",

      dark: "Ciemny",
      light: "Jasny",

      save: "Zapisz",
      cancel: "Anuluj",
      close: "Zamknij",

      profileTitle: "Profil",
      profileSubtitle: "Twoja tożsamość NEXTRA",
      editProfile: "Edytuj profil",
      active: "Aktywny",

      traderLevel: "POZIOM TRADERA",
      rookieTrader: "Początkujący trader",

      currentPlan: "AKTUALNY PLAN",
      freePlan: "NEXTRA Free",
      coreIntelligence: "Podstawowa inteligencja rynkowa",
      upgrade: "Ulepsz",

      watchlist: "Lista obserwowanych",
      alerts: "Alerty",
      marketsCount: "Rynki",

      achievements: "OSIĄGNIĘCIA",
      firstLook: "Pierwsze spojrzenie",
      exploredNextra: "Poznano NEXTRA",
      watcher: "Obserwator",
      buildWatchlist: "Utwórz listę",
      futuresAchievement: "Futures",
      openFutures: "Otwórz futures",
      marketHunter: "Łowca rynków",
      trackMarkets: "Śledź rynki",

      account: "KONTO",
      email: "E-mail",
      notConnected: "Niepołączone",
      accountStatus: "Status konta",
      activeAccount: "Aktywne konto",

      quickActions: "SZYBKIE AKCJE",
      manageFavoriteAssets: "Zarządzaj ulubionymi aktywami",
      binanceFuturesMarket: "Rynek Binance Futures",
      manageMarketAlerts: "Zarządzaj alertami",

      preferences: "PREFERENCJE",
      darkMode: "Tryb ciemny",

      aboutNextra: "O NEXTRA",
      yourMarketIntelligence:
        "Twój rynek. Twoja inteligencja.",

      displayName: "Nazwa wyświetlana",
      username: "Nazwa użytkownika",
      yourName: "Twoje imię",
      saveChanges: "Zapisz zmiany",

      languageTitle: "Język",
      selectLanguage: "Wybierz język",

      traderDescription:
        "Odkrywaj NEXTRA dalej, aby odblokować kolejny poziom.",

      xp: "XP"

    }

  };


  /* =====================================================
     GET SAVED SETTINGS
  ====================================================== */

  function getSettings() {

    try {

      const saved =
        JSON.parse(
          localStorage.getItem(
            SETTINGS_KEY
          ) || "{}"
        );

      return saved &&
        typeof saved === "object"
        ? saved
        : {};

    }

    catch {

      return {};

    }

  }


  /* =====================================================
     SAVE SETTINGS
  ====================================================== */

  function saveSettings(settings) {

    try {

      localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify(settings)
      );

    }

    catch {

      console.warn(
        "NEXTRA: Unable to save language settings."
      );

    }

  }


  /* =====================================================
     GET LANGUAGE
  ====================================================== */

  function getLanguage() {

    const settings =
      getSettings();

    let language =
      settings.language ||
      DEFAULT_LANGUAGE;


    if (!LANGUAGES[language]) {

      language =
        DEFAULT_LANGUAGE;

    }


    return language;

  }


  /* =====================================================
     TRANSLATE
  ====================================================== */

  function translate(key) {

    const language =
      getLanguage();

    const current =
      TRANSLATIONS[language] ||
      TRANSLATIONS[DEFAULT_LANGUAGE];

    return (
      current[key] ??
      TRANSLATIONS[DEFAULT_LANGUAGE][key] ??
      key
    );

  }


  /* =====================================================
     APPLY DOCUMENT DIRECTION
  ====================================================== */

  function applyDirection(language) {

    const rtlLanguages = [
      "ar"
    ];

    const direction =
      rtlLanguages.includes(language)
        ? "rtl"
        : "ltr";


    document.documentElement.dir =
      direction;


    document.documentElement.lang =
      language;

  }


  /* =====================================================
     DATA-I18N SUPPORT
  ====================================================== */

  function translateDataAttributes() {

    const elements =
      document.querySelectorAll(
        "[data-i18n]"
      );


    elements.forEach(
      element => {

        const key =
          element.dataset.i18n;

        if (!key) return;


        element.textContent =
          translate(key);

      }
    );


    const placeholders =
      document.querySelectorAll(
        "[data-i18n-placeholder]"
      );


    placeholders.forEach(
      element => {

        const key =
          element.dataset.i18nPlaceholder;

        if (!key) return;


        element.placeholder =
          translate(key);

      }
    );

  }


  /* =====================================================
     PROFILE PAGE SUPPORT
  ====================================================== */

  function translateProfilePage() {

    const page =
      document.title
        .toLowerCase()
        .includes("profile");


    if (!page) return;


    const map = {

      ".title":
        "profileTitle",

      ".subtitle":
        "profileSubtitle",

      "#editProfileBtn":
        "editProfile",

      ".profile-status":
        "active",

      ".mini-label":
        null

    };


    Object.entries(map)
      .forEach(
        ([selector, key]) => {

          if (!key) return;


          const element =
            document.querySelector(
              selector
            );


          if (element) {

            if (
              selector ===
              ".profile-status"
            ) {

              const icon =
                element.querySelector(
                  "i"
                );

              element.textContent =
                "";

              if (icon) {

                element.appendChild(
                  icon
                );

              }

              element.append(
                " " +
                translate(key)
              );

            }

            else {

              element.textContent =
                translate(key);

            }

          }

        }
      );


    /* -------------------------------------------------
       PROFILE SECTION LABELS
    ------------------------------------------------- */

    const labels =
      document.querySelectorAll(
        ".section-label"
      );


    const labelTranslations = {

      "EDIT PROFILE":
        "languageTitle",

      "ACHIEVEMENTS":
        "achievements",

      "ACCOUNT":
        "account",

      "QUICK ACTIONS":
        "quickActions",

      "PREFERENCES":
        "preferences",

      "ABOUT NEXTRA":
        "aboutNextra"

    };


    labels.forEach(
      label => {

        const text =
          label.textContent
            .trim()
            .toUpperCase();


        const key =
          labelTranslations[text];


        if (key) {

          label.textContent =
            translate(key);

        }

      }
    );


    /* -------------------------------------------------
       PROFILE LEVEL
    ------------------------------------------------- */

    const traderLevel =
      document.querySelector(
        ".trader-level-card h3"
      );


    if (traderLevel) {

      traderLevel.textContent =
        translate(
          "rookieTrader"
        );

    }


    const traderLabel =
      document.querySelector(
        ".trader-level-card .mini-label"
      );


    if (traderLabel) {

      traderLabel.textContent =
        translate(
          "traderLevel"
        );

    }


    /* -------------------------------------------------
       XP DESCRIPTION
    ------------------------------------------------- */

    const xpDescription =
      document.querySelector(
        ".xp-description"
      );


    if (xpDescription) {

      xpDescription.textContent =
        translate(
          "traderDescription"
        );

    }


    /* -------------------------------------------------
       PLAN
    ------------------------------------------------- */

    const plan =
      document.querySelector(
        ".plan-card"
      );


    if (plan) {

      const labels =
        plan.querySelectorAll(
          ".mini-label"
        );


      if (labels[0]) {

        labels[0].textContent =
          translate(
            "currentPlan"
          );

      }


      const strong =
        plan.querySelector(
          "strong"
        );


      if (strong) {

        strong.textContent =
          translate(
            "freePlan"
          );

      }


      const spans =
        plan.querySelectorAll(
          ".plan-content > span"
        );


      if (spans[1]) {

        spans[1].textContent =
          translate(
            "coreIntelligence"
          );

      }


      const button =
        plan.querySelector(
          ".plan-button"
        );


      if (button) {

        button.textContent =
          translate(
            "upgrade"
          );

      }

    }


    /* -------------------------------------------------
       STATS
    ------------------------------------------------- */

    const statLabels =
      document.querySelectorAll(
        ".profile-stat span"
      );


    const statKeys = [

      "watchlist",
      "alerts",
      "marketsCount"

    ];


    statLabels.forEach(
      (element, index) => {

        if (statKeys[index]) {

          element.textContent =
            translate(
              statKeys[index]
            );

        }

      }
    );


    /* -------------------------------------------------
       ACHIEVEMENTS
    ------------------------------------------------- */

    const achievements =
      document.querySelectorAll(
        ".achievement-card"
      );


    const achievementKeys = [

      [
        "firstLook",
        "exploredNextra"
      ],

      [
        "watcher",
        "buildWatchlist"
      ],

      [
        "futuresAchievement",
        "openFutures"
      ],

      [
        "marketHunter",
        "trackMarkets"
      ]

    ];


    achievements.forEach(
      (card, index) => {

        const keys =
          achievementKeys[index];

        if (!keys) return;


        const strong =
          card.querySelector(
            "strong"
          );


        const span =
          card.querySelector(
            "span"
          );


        if (strong) {

          strong.textContent =
            translate(
              keys[0]
            );

        }


        if (span) {

          span.textContent =
            translate(
              keys[1]
            );

        }

      }
    );


    /* -------------------------------------------------
       ACCOUNT
    ------------------------------------------------- */

    const accountItems =
      document.querySelectorAll(
        ".profile-section .profile-item"
      );


    accountItems.forEach(
      item => {

        const strong =
          item.querySelector(
            "strong"
          );


        const span =
          item.querySelector(
            "span"
          );


        if (!strong) return;


        const text =
          strong.textContent
            .trim()
            .replace(
              /^[^A-Za-zÀ-ÿ\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7af\u0600-\u06ff]+/,
              ""
            );


        if (
          text === "Email"
        ) {

          strong.textContent =
            translate(
              "email"
            );


          if (span) {

            span.textContent =
              translate(
                "notConnected"
              );

          }

        }


        if (
          text === "Account Status"
        ) {

          strong.textContent =
            translate(
              "accountStatus"
            );


          if (span) {

            span.textContent =
              translate(
                "activeAccount"
              );

          }

        }

      }
    );


    /* -------------------------------------------------
       EDIT PROFILE FORM
    ------------------------------------------------- */

    const editLabels =
      document.querySelectorAll(
        ".profile-edit-card label"
      );


    editLabels.forEach(
      label => {

        const text =
          label.textContent
            .trim()
            .toLowerCase();


        if (
          text ===
          "display name"
        ) {

          label.textContent =
            translate(
              "displayName"
            );

        }


        if (
          text ===
          "username"
        ) {

          label.textContent =
            translate(
              "username"
            );

        }

      }
    );


    const nameInput =
      document.getElementById(
        "nameInput"
      );


    const usernameInput =
      document.getElementById(
        "usernameInput"
      );


    if (nameInput) {

      nameInput.placeholder =
        translate(
          "yourName"
        );

    }


    if (usernameInput) {

      usernameInput.placeholder =
        "nextra_user";

    }


    const cancelButton =
      document.getElementById(
        "cancelProfileBtn"
      );


    const saveButton =
      document.getElementById(
        "saveProfileBtn"
      );


    if (cancelButton) {

      cancelButton.textContent =
        translate(
          "cancel"
        );

    }


    if (saveButton) {

      saveButton.textContent =
        translate(
          "saveChanges"
        );

    }

  }


  /* =====================================================
     GENERIC NAVIGATION TRANSLATION
  ====================================================== */

  function translateNavigation() {

    const navMap = {

      "Home": "home",
      "Markets": "markets",
      "Trending": "trending",
      "Futures": "futures",
      "Tools": "tools",
      "Education": "education",
      "Profile": "profile"

    };


    document
      .querySelectorAll(
        "a, button"
      )
      .forEach(
        element => {

          const text =
            element.textContent
              .trim();


          const key =
            navMap[text];


          if (!key) return;


          /*
             Hanya translate elemen
             yang benar-benar berupa
             label navigasi.
          */

          const hasComplexContent =
            element.children.length > 1;


          if (!hasComplexContent) {

            element.textContent =
              translate(key);

          }

        }
      );

  }


  /* =====================================================
     APPLY TRANSLATION
  ====================================================== */

  function applyLanguage() {

    const language =
      getLanguage();


    applyDirection(
      language
    );


    translateDataAttributes();


    translateNavigation();


    translateProfilePage();


    /*
       Update language selectors
       yang menggunakan data-language.
    */

    document
      .querySelectorAll(
        "[data-language]"
      )
      .forEach(
        element => {

          const selected =
            element.dataset.language ===
            language;


          element.classList.toggle(
            "active",
            selected
          );


          element.setAttribute(
            "aria-selected",
            selected
              ? "true"
              : "false"
          );

        }
      );


    /*
       Event global.
    */

    document.dispatchEvent(
      new CustomEvent(
        "nextraLanguageChanged",
        {
          detail: {
            language,
            translations:
              TRANSLATIONS[language]
          }
        }
      )
    );

  }


  /* =====================================================
     SET LANGUAGE
  ====================================================== */

  function setLanguage(language) {

    if (
      !LANGUAGES[language]
    ) {

      console.warn(
        "NEXTRA: Unsupported language:",
        language
      );

      return false;

    }


    const settings =
      getSettings();


    settings.language =
      language;


    saveSettings(
      settings
    );


    applyLanguage();


    return true;

  }


  /* =====================================================
     LANGUAGE SELECTOR
  ====================================================== */

  function createLanguageSelector(
    container
  ) {

    if (!container) return;


    container.innerHTML =
      "";


    Object.entries(
      LANGUAGES
    )
      .forEach(
        ([code, language]) => {

          const button =
            document.createElement(
              "button"
            );


          button.type =
            "button";


          button.dataset.language =
            code;


          button.className =
            "nextra-language-option";


          button.innerHTML = `

            <span class="language-native">
              ${language.native}
            </span>

            <span class="language-name">
              ${language.name}
            </span>

          `;


          button.addEventListener(
            "click",
            () => {

              setLanguage(
                code
              );

            }
          );


          container.appendChild(
            button
          );

        }
      );


    applyLanguage();

  }


  /* =====================================================
     GLOBAL API
  ====================================================== */

  window.NEXTRA_I18N = {

    languages:
      LANGUAGES,

    translations:
      TRANSLATIONS,

    getLanguage,

    setLanguage,

    translate,

    applyLanguage,

    createLanguageSelector

  };


  /* =====================================================
     INITIALIZE
  ====================================================== */

  function initialize() {

    applyLanguage();

  }


  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      initialize,
      {
        once: true
      }
    );

  }

  else {

    initialize();

  }


})();
