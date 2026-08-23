/* =========================================================
   NEXTRA i18n — MULTI LANGUAGE SYSTEM V1
========================================================= */

(() => {

  const LANGUAGE_KEY = "nextra_settings";

  const LANGUAGES = {

    id: {
      name: "Bahasa Indonesia",
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


  const TRANSLATIONS = {

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

      priceAlerts: "Peringatan Harga",
      marketAlerts: "Peringatan Market",
      futuresAlerts: "Peringatan Futures",

      on: "Aktif",
      off: "Nonaktif",

      save: "Simpan",
      cancel: "Batal",
      close: "Tutup"

    },


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

      priceAlerts: "Price Alerts",
      marketAlerts: "Market Alerts",
      futuresAlerts: "Futures Alerts",

      on: "On",
      off: "Off",

      save: "Save",
      cancel: "Cancel",
      close: "Close"

    },


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

      priceAlerts: "Alertas de precio",
      marketAlerts: "Alertas del mercado",
      futuresAlerts: "Alertas de futuros"

    },


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
      light: "Clair"

    },


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
      light: "Hell"

    },


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
      appearance: "Aspetto"

    },


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
      appearance: "Aparência"

    },


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
      appearance: "Aparência"

    },


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
      appearance: "Внешний вид"

    },


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
      appearance: "外观"

    },


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
      appearance: "外觀"

    },


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
      appearance: "外観"

    },


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
      appearance: "화면"

    },


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
      appearance: "Görünüm"

    },


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
      appearance: "Giao diện"

    },


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
      appearance: "รูปลักษณ์"

    },


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
      appearance: "المظهر"

    },


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
      appearance: "रूप"

    },


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
      appearance: "Weergave"

    },


    pl: {

      home: "Strona główna",
      markets: "Rynki",
      trending: "Trendy",
      futures: "Kontrakty terminowe",
      tools: "Narzędzia",
      education: "Edukacja",
      profile: "Profil",

      search: "Szukaj",
      settings: "Ustawienia",
      notifications: "Powiadomienia",
      language: "Język",
      appearance: "Wygląd"

    }

  };


  function getSettings() {

    try {

      return JSON.parse(
        localStorage.getItem(LANGUAGE_KEY) || "{}"
      );

    } catch {

      return {};

    }

  }


  function getLanguage() {

    const settings = getSettings();

    return LANGUAGES[settings.language]
      ? settings.language
      : "en";

  }


  function t(key) {

    const language = getLanguage();

    return (
      TRANSLATIONS[language]?.[key] ??
      TRANSLATIONS.en[key] ??
      key
    );

  }


  function translatePage() {

    document
      .querySelectorAll("[data-i18n]")
      .forEach(element => {

        const key =
          element.dataset.i18n;

        const translated =
          t(key);

        if (
          element.tagName === "INPUT" ||
          element.tagName === "TEXTAREA"
        ) {

          element.placeholder =
            translated;

        } else {

          element.textContent =
            translated;

        }

      });


    document.documentElement.lang =
      getLanguage();

  }


  window.NEXTRA_I18N = {

    languages: LANGUAGES,

    translations: TRANSLATIONS,

    getLanguage,

    t,

    translatePage

  };


  window.addEventListener(
    "nextra:languageChanged",
    translatePage
  );


  if (
    document.readyState === "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      translatePage
    );

  } else {

    translatePage();

  }


})();
