/* =========================================================
   NEXTRA PROFILE SETTINGS — V1
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
          element.dataset.appearance
            === settings.appearance
        );

      });


    document
      .querySelectorAll("[data-language]")
      .forEach(element => {

        element.classList.toggle(
          "selected",
          element.dataset.language
            === settings.language
        );

      });

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


    if (existing) return;


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

      <div class="section-label">
        NOTIFICATIONS
      </div>


      <div class="settings-card">

        <div class="setting-row">

          <div>

            <strong>
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

            <strong>
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

            <strong>
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

            <strong>
              Futures Alerts
            </strong>

            <span>
              Futures market notifications
            </span>

          </div>

          ${createToggle("futuresAlerts")}

        </div>

      </div>



      <div class="section-label settings-label">
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

            <strong>
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

            <strong>
              Light
            </strong>

            <small>
              Bright interface
            </small>

          </span>

        </button>

      </div>



      <div class="section-label settings-label">
        LANGUAGE
      </div>


      <div class="settings-choice">

        <button
          type="button"
          data-language="id"
        >

          <span class="choice-icon">
            ID
          </span>

          <span>

            <strong>
              Bahasa Indonesia
            </strong>

            <small>
              Indonesian
            </small>

          </span>

        </button>


        <button
          type="button"
          data-language="en"
        >

          <span class="choice-icon">
            EN
          </span>

          <span>

            <strong>
              English
            </strong>

            <small>
              English interface
            </small>

          </span>

        </button>

      </div>

    `;


    document
      .querySelector(".profile-footer")
      .before(section);


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

            render();

          }
        );

      });


    render();

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

  }

  else {

    buildSettings();

  }


})();
