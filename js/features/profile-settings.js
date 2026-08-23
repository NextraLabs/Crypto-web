/* =========================================================
   NEXTRA PROFILE SETTINGS — MULTI LANGUAGE V2
========================================================= */

(() => {

  const SETTINGS_KEY = "nextra_settings";

  const DEFAULT_SETTINGS = {

    notifications: true,

    priceAlerts: true,

    marketAlerts: true,

    futuresAlerts: true,

    appearance: "dark",

    language: "id"

  };


  let settings = {

    ...DEFAULT_SETTINGS,

    ...(JSON.parse(
      localStorage.getItem(SETTINGS_KEY) || "{}"
    ))

  };


  function saveSettings() {

    localStorage.setItem(
      SETTINGS_KEY,
      JSON.stringify(settings)
    );

  }


  function applyAppearance() {

    document.documentElement.dataset.theme =
      settings.appearance;

  }


  function notifyLanguageChanged() {

    window.dispatchEvent(
      new CustomEvent(
        "nextra:languageChanged",
        {
          detail: {
            language: settings.language
          }
        }
      )
    );

  }


  function toggleSetting(key) {

    settings[key] =
      !settings[key];

    saveSettings();

    applyAppearance();

    render();

  }


  function render() {

    document
      .querySelectorAll("[data-setting]")
      .forEach(element => {

        const key =
          element.dataset.setting;

        const enabled =
          Boolean(settings[key]);

        element.classList.toggle(
          "is-on",
          enabled
        );

        element.setAttribute(
          "aria-checked",
          String(enabled)
        );

      });


    document
      .querySelectorAll("[data-appearance]")
      .forEach(element => {

        element.classList.toggle(
          "selected",
          element.dataset.appearance ===
          settings.appearance
        );

      });


    document
      .querySelectorAll("[data-language]")
      .forEach(element => {

        element.classList.toggle(
          "selected",
          element.dataset.language ===
          settings.language
        );

      });


    if (
      window.NEXTRA_I18N &&
      typeof window.NEXTRA_I18N.translatePage ===
      "function"
    ) {

      window.NEXTRA_I18N.translatePage();

    }

  }


  function createToggle(key) {

    return `

      <button
        type="button"
        class="setting-toggle"
        data-setting="${key}"
        aria-checked="false"
        role="switch"
      >

        <span></span>

      </button>

    `;

  }


  function buildSettings() {

    const existing =
      document.getElementById(
        "profileSettingsPanel"
      );

    if (existing) {

      render();

      return;

    }


    const profileSections =
      document.querySelectorAll(
        ".profile-section"
      );


    if (!profileSections.length)
      return;


    const section =
      document.createElement(
        "section"
      );


    section.id =
      "profileSettingsPanel";

    section.className =
      "profile-section";


    section.innerHTML = `

      <div
        class="section-label"
        data-i18n="notifications"
      >
        NOTIFICATIONS
      </div>


      <div class="settings-card">

        <div class="setting-row">

          <div>

            <strong
              data-i18n="notifications"
            >
              Notifications
            </strong>

            <span>
              Enable NEXTRA notifications
            </span>

          </div>

          ${createToggle("notifications")}

        </div>


        <div class="setting-row">

          <div>

            <strong
              data-i18n="priceAlerts"
            >
              Price Alerts
            </strong>

            <span>
              Notify when price targets are reached
            </span>

          </div>

          ${createToggle("priceAlerts")}

        </div>


        <div class="setting-row">

          <div>

            <strong
              data-i18n="marketAlerts"
            >
              Market Alerts
            </strong>

            <span>
              Important market movements
            </span>

          </div>

          ${createToggle("marketAlerts")}

        </div>


        <div class="setting-row">

          <div>

            <strong
              data-i18n="futuresAlerts"
            >
              Futures Alerts
            </strong>

            <span>
              Futures market notifications
            </span>

          </div>

          ${createToggle("futuresAlerts")}

        </div>

      </div>


      <div
        class="section-label settings-label"
        data-i18n="appearance"
      >
        APPEARANCE
      </div>


      <div class="settings-choice">

        <button
          type="button"
          data-appearance="dark"
        >

          <span class="choice-icon">
            ◐
          </span>

          <span>

            <strong
              data-i18n="dark"
            >
              Dark
            </strong>

            <small>
              NEXTRA default
            </small>

          </span>

        </button>


        <button
          type="button"
          data-appearance="light"
        >

          <span class="choice-icon">
            ☀
          </span>

          <span>

            <strong
              data-i18n="light"
            >
              Light
            </strong>

            <small>
              Bright interface
            </small>

          </span>

        </button>

      </div>


      <div
        class="section-label settings-label"
        data-i18n="language"
      >
        LANGUAGE
      </div>


      <div
        class="settings-choice"
        id="nextraLanguageList"
      >

        ${createLanguageButtons()}

      </div>

    `;


    const footer =
      document.querySelector(
        ".profile-footer"
      );


    if (footer) {

      footer.before(section);

    } else {

      document.body.appendChild(
        section
      );

    }


    section
      .querySelectorAll(
        "[data-setting]"
      )
      .forEach(button => {

        button.addEventListener(
          "click",
          () => {

            toggleSetting(
              button.dataset.setting
            );

          }
        );

      });


    section
      .querySelectorAll(
        "[data-appearance]"
      )
      .forEach(button => {

        button.addEventListener(
          "click",
          () => {

            settings.appearance =
              button.dataset.appearance;

            saveSettings();

            applyAppearance();

            render();

          }
        );

      });


    section
      .querySelectorAll(
        "[data-language]"
      )
      .forEach(button => {

        button.addEventListener(
          "click",
          () => {

            settings.language =
              button.dataset.language;

            saveSettings();

            notifyLanguageChanged();

            render();

          }
        );

      });


    render();

  }


  function createLanguageButtons() {

    const languages =
      window.NEXTRA_I18N &&
      window.NEXTRA_I18N.languages
        ? window.NEXTRA_I18N.languages
        : {

            id: {
              native: "Bahasa Indonesia"
            },

            en: {
              native: "English"
            }

          };


    return Object.entries(
      languages
    )
      .map(
        ([code, language]) => `

          <button
            type="button"
            data-language="${code}"
          >

            <span class="choice-icon">
              ${code
                .replace(
                  "-",
                  ""
                )
                .toUpperCase()
                .slice(
                  0,
                  3
                )}
            </span>

            <span>

              <strong>
                ${language.native}
              </strong>

              <small>
                ${language.name}
              </small>

            </span>

          </button>

        `
      )
      .join("");

  }


  applyAppearance();


  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      buildSettings
    );

  } else {

    buildSettings();

  }


})();
