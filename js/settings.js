/* =========================================================
   NEXTRA SETTINGS V10
   Appearance Engine
   ========================================================= */

(function () {

  "use strict";

  const STORAGE_KEY = "nextra_appearance";


  /* =======================================================
     GET SAVED APPEARANCE
     ======================================================= */

  function getSavedAppearance() {

    const saved =
      localStorage.getItem(STORAGE_KEY);

    if (
      saved === "dark" ||
      saved === "light" ||
      saved === "system"
    ) {
      return saved;
    }

    return "dark";
  }


  /* =======================================================
     GET SYSTEM THEME
     ======================================================= */

  function getSystemTheme() {

    if (
      window.matchMedia &&
      window.matchMedia(
        "(prefers-color-scheme: light)"
      ).matches
    ) {
      return "light";
    }

    return "dark";
  }


  /* =======================================================
     APPLY APPEARANCE
     ======================================================= */

  function applyAppearance(mode) {

    const theme =
      mode === "system"
        ? getSystemTheme()
        : mode;


    document.documentElement
      .setAttribute(
        "data-theme",
        theme
      );


    document.body
      .setAttribute(
        "data-theme",
        theme
      );


    if (theme === "light") {

      document.documentElement
        .classList
        .add("light");

      document.body
        .classList
        .add("light");

    } else {

      document.documentElement
        .classList
        .remove("light");

      document.body
        .classList
        .remove("light");

    }


    localStorage.setItem(
      STORAGE_KEY,
      mode
    );


    updateAppearanceControls(mode);

  }


  /* =======================================================
     UPDATE APPEARANCE CONTROLS
     ======================================================= */

  function updateAppearanceControls(mode) {

    const controls =
      document.querySelectorAll(
        "[data-appearance]"
      );


    controls.forEach(function (control) {

      const value =
        control.getAttribute(
          "data-appearance"
        );


      const active =
        value === mode;


      control.classList.toggle(
        "active",
        active
      );


      control.setAttribute(
        "aria-selected",
        active
          ? "true"
          : "false"
      );


      if (
        control.tagName ===
        "INPUT"
      ) {

        control.checked =
          active;

      }

    });

  }


  /* =======================================================
     BIND APPEARANCE CONTROLS
     ======================================================= */

  function bindAppearanceControls() {

    const controls =
      document.querySelectorAll(
        "[data-appearance]"
      );


    controls.forEach(function (control) {

      control.addEventListener(
        "click",
        function () {

          const mode =
            control.getAttribute(
              "data-appearance"
            );


          if (
            mode === "dark" ||
            mode === "light" ||
            mode === "system"
          ) {

            applyAppearance(mode);

          }

        }
      );

    });

  }


  /* =======================================================
     SYSTEM THEME LISTENER
     ======================================================= */

  function watchSystemTheme() {

    if (!window.matchMedia) {
      return;
    }


    const mediaQuery =
      window.matchMedia(
        "(prefers-color-scheme: light)"
      );


    function handleChange() {

      const saved =
        getSavedAppearance();


      if (saved === "system") {

        applyAppearance(
          "system"
        );

      }

    }


    if (
      typeof mediaQuery.addEventListener ===
      "function"
    ) {

      mediaQuery.addEventListener(
        "change",
        handleChange
      );

    } else if (
      typeof mediaQuery.addListener ===
      "function"
    ) {

      mediaQuery.addListener(
        handleChange
      );

    }

  }


  /* =======================================================
     THEME TOGGLE
     ======================================================= */

  function bindThemeToggle() {

    const button =
      document.getElementById(
        "theme-toggle"
      );


    if (!button) {
      return;
    }


    button.addEventListener(
      "click",
      function () {

        const current =
          getSavedAppearance();


        const next =
          current === "dark"
            ? "light"
            : "dark";


        applyAppearance(next);

      }
    );

  }


  /* =======================================================
     INITIALIZE
     ======================================================= */

  function initSettings() {

    const saved =
      getSavedAppearance();


    applyAppearance(
      saved
    );


    bindAppearanceControls();


    watchSystemTheme();


    bindThemeToggle();

  }


  /* =======================================================
     PUBLIC API
     ======================================================= */

  window.NEXTRASettings = {

    getAppearance:
      getSavedAppearance,

    setAppearance:
      applyAppearance,

    getSystemTheme:
      getSystemTheme

  };


  /* =======================================================
     START
     ======================================================= */

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      initSettings
    );

  } else {

    initSettings();

  }

})();