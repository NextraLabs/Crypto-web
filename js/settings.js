/* =========================================================
   NEXTRA SETTINGS V10
   File: js/settings.js
========================================================= */

"use strict";


/* =========================================================
   STORAGE HELPERS
========================================================= */

function getSetting(key, fallback) {

  const value = localStorage.getItem(key);

  if (value === null) {
    return fallback;
  }

  return value;
}


function setSetting(key, value) {

  localStorage.setItem(key, value);

}


/* =========================================================
   THEME
========================================================= */

const themeSelect =
  document.getElementById("theme-select");


function applyTheme(theme) {

  if (theme === "dark") {

    document.documentElement.setAttribute(
      "data-theme",
      "dark"
    );

    return;
  }


  if (theme === "light") {

    document.documentElement.setAttribute(
      "data-theme",
      "light"
    );

    return;
  }


  document.documentElement.removeAttribute(
    "data-theme"
  );

}


if (themeSelect) {

  themeSelect.value =
    getSetting(
      "nextra_theme",
      "dark"
    );


  applyTheme(
    themeSelect.value
  );


  themeSelect.addEventListener(
    "change",
    function () {

      setSetting(
        "nextra_theme",
        this.value
      );

      applyTheme(
        this.value
      );

    }
  );

}


/* =========================================================
   LANGUAGE
========================================================= */

const languageSelect =
  document.getElementById(
    "language-select"
  );


if (languageSelect) {

  languageSelect.value =
    getSetting(
      "nextra_language",
      "id"
    );


  languageSelect.addEventListener(
    "change",
    function () {

      setSetting(
        "nextra_language",
        this.value
      );

    }
  );

}


/* =========================================================
   CURRENCY
========================================================= */

const currencySelect =
  document.getElementById(
    "currency-select"
  );


if (currencySelect) {

  currencySelect.value =
    getSetting(
      "nextra_currency",
      "usd"
    );


  currencySelect.addEventListener(
    "change",
    function () {

      setSetting(
        "nextra_currency",
        this.value
      );

    }
  );

}


/* =========================================================
   TRADING MODE
========================================================= */

const tradingModeSelect =
  document.getElementById(
    "trading-mode-select"
  );


if (tradingModeSelect) {

  tradingModeSelect.value =
    getSetting(
      "nextra_trading_mode",
      "spot"
    );


  tradingModeSelect.addEventListener(
    "change",
    function () {

      setSetting(
        "nextra_trading_mode",
        this.value
      );

    }
  );

}


/* =========================================================
   TOGGLE SYSTEM
========================================================= */

function setupToggle(
  elementId,
  storageKey,
  defaultValue
) {

  const element =
    document.getElementById(
      elementId
    );


  if (!element) {
    return;
  }


  const saved =
    getSetting(
      storageKey,
      String(defaultValue)
    );


  updateToggleUI(
    element,
    saved === "true"
  );


  element.addEventListener(
    "click",
    function () {

      const active =
        !this.classList.contains(
          "active"
        );


      updateToggleUI(
        this,
        active
      );


      setSetting(
        storageKey,
        String(active)
      );

    }
  );

}


/* =========================================================
   TOGGLE UI
========================================================= */

function updateToggleUI(
  element,
  active
) {

  if (active) {

    element.classList.add(
      "active"
    );

    element.setAttribute(
      "aria-pressed",
      "true"
    );

  } else {

    element.classList.remove(
      "active"
    );

    element.setAttribute(
      "aria-pressed",
      "false"
    );

  }

}


/* =========================================================
   COMPACT MODE
========================================================= */

setupToggle(
  "compact-toggle",
  "nextra_compact_mode",
  false
);


/* =========================================================
   PRICE ALERTS
========================================================= */

setupToggle(
  "price-alert-toggle",
  "nextra_price_alerts",
  true
);


/* =========================================================
   AUTO REFRESH
========================================================= */

setupToggle(
  "refresh-toggle",
  "nextra_auto_refresh",
  true
);


/* =========================================================
   RISK DISPLAY
========================================================= */

setupToggle(
  "risk-toggle",
  "nextra_risk_display",
  true
);


/* =========================================================
   MARKET ALERTS
========================================================= */

setupToggle(
  "market-alert-toggle",
  "nextra_market_alerts",
  true
);


/* =========================================================
   COMMUNITY UPDATES
========================================================= */

setupToggle(
  "community-toggle",
  "nextra_community_updates",
  true
);


/* =========================================================
   LEARN UPDATES
========================================================= */

setupToggle(
  "learn-toggle",
  "nextra_learn_updates",
  true
);


/* =========================================================
   SECURE MODE
========================================================= */

setupToggle(
  "secure-toggle",
  "nextra_secure_mode",
  false
);


/* =========================================================
   SAVE PREFERENCES
========================================================= */

setupToggle(
  "save-toggle",
  "nextra_save_preferences",
  true
);


/* =========================================================
   RESET SETTINGS
========================================================= */

const resetButton =
  document.getElementById(
    "reset-settings"
  );


if (resetButton) {

  resetButton.addEventListener(
    "click",
    function () {

      const confirmed =
        confirm(
          "Reset semua pengaturan NEXTRA?"
        );


      if (!confirmed) {
        return;
      }


      const keys = [

        "nextra_theme",

        "nextra_language",

        "nextra_currency",

        "nextra_trading_mode",

        "nextra_compact_mode",

        "nextra_price_alerts",

        "nextra_auto_refresh",

        "nextra_risk_display",

        "nextra_market_alerts",

        "nextra_community_updates",

        "nextra_learn_updates",

        "nextra_secure_mode",

        "nextra_save_preferences"

      ];


      keys.forEach(
        function (key) {

          localStorage.removeItem(
            key
          );

        }
      );


      location.reload();

    }
  );

}


/* =========================================================
   PRIVACY
========================================================= */

const privacyLink =
  document.getElementById(
    "privacy-link"
  );


if (privacyLink) {

  privacyLink.addEventListener(
    "click",
    function (event) {

      event.preventDefault();

      alert(
        "Privacy settings NEXTRA akan tersedia pada modul Privacy."
      );

    }
  );

}


/* =========================================================
   ABOUT
========================================================= */

const aboutLink =
  document.getElementById(
    "about-link"
  );


if (aboutLink) {

  aboutLink.addEventListener(
    "click",
    function (event) {

      event.preventDefault();

      alert(
        "NEXTRA — Your Market. Your Intelligence."
      );

    }
  );

}


/* =========================================================
   EXPORT SETTINGS API
   Bisa dipakai halaman NEXTRA lainnya
========================================================= */

window.NEXTRA_SETTINGS = {

  get: function (key, fallback) {

    return getSetting(
      key,
      fallback
    );

  },


  set: function (key, value) {

    setSetting(
      key,
      value
    );

  },


  remove: function (key) {

    localStorage.removeItem(
      key
    );

  },


  reset: function () {

    const keys = [

      "nextra_theme",
      "nextra_language",
      "nextra_currency",
      "nextra_trading_mode",
      "nextra_compact_mode",
      "nextra_price_alerts",
      "nextra_auto_refresh",
      "nextra_risk_display",
      "nextra_market_alerts",
      "nextra_community_updates",
      "nextra_learn_updates",
      "nextra_secure_mode",
      "nextra_save_preferences"

    ];


    keys.forEach(
      function (key) {

        localStorage.removeItem(
          key
        );

      }
    );

  }

};


/* =========================================================
   READY
========================================================= */

document.documentElement.setAttribute(
  "data-settings-ready",
  "true"
);