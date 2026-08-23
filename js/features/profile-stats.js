/* =========================================================
   NEXTRA PROFILE STATS — V1
   XP + WATCHLIST + ACHIEVEMENTS
========================================================= */

(() => {

  const XP_KEY = "nextra_xp";

  const WATCHLIST_KEY =
    "nextra_watchlist";


  const DEFAULT_XP = {

    xp: 120,

    level: 1

  };


  function getXP() {

    try {

      return JSON.parse(
        localStorage.getItem(XP_KEY)
        || JSON.stringify(DEFAULT_XP)
      );

    }

    catch {

      return {
        ...DEFAULT_XP
      };

    }

  }


  function getWatchlist() {

    try {

      const data =
        JSON.parse(
          localStorage.getItem(
            WATCHLIST_KEY
          ) || "[]"
        );


      return Array.isArray(data)
        ? data
        : [];

    }

    catch {

      return [];

    }

  }


  function getLevel(xp) {

    if (xp >= 10000) return 10;

    if (xp >= 5000) return 8;

    if (xp >= 2500) return 6;

    if (xp >= 1000) return 4;

    if (xp >= 500) return 2;

    return 1;

  }


  function getLevelName(level) {

    const names = {

      1: "Rookie Trader",

      2: "Market Scout",

      4: "Market Hunter",

      6: "Pro Trader",

      8: "Elite Trader",

      10: "NEXTRA Master"

    };


    return (
      names[level]
      || "Rookie Trader"
    );

  }


  function updateProfile() {

    const data =
      getXP();


    const watchlist =
      getWatchlist();


    const level =
      getLevel(data.xp);


    const levelName =
      getLevelName(level);


    /* =========================
       WATCHLIST
    ========================== */

    const watchlistEl =
      document.getElementById(
        "watchlistCount"
      );


    if (watchlistEl) {

      watchlistEl.textContent =
        watchlist.length;

    }


    /* =========================
       LEVEL
    ========================== */

    const levelTitle =
      document.querySelector(
        ".trader-level-top h3"
      );


    if (levelTitle) {

      levelTitle.textContent =
        levelName;

    }


    const levelNumber =
      document.querySelector(
        ".level-number"
      );


    if (levelNumber) {

      levelNumber.textContent =
        `LVL ${String(level).padStart(2, "0")}`;

    }


    /* =========================
       XP
    ========================== */

    const xpRow =
      document.querySelector(
        ".xp-row"
      );


    const xpProgress =
      document.querySelector(
        ".xp-progress"
      );


    if (xpProgress) {

      const currentLevelXP =
        level === 1
          ? 0
          : level === 2
          ? 500
          : level === 4
          ? 1000
          : level === 6
          ? 2500
          : level === 8
          ? 5000
          : 10000;


      const nextLevelXP =
        level === 1
          ? 500
          : level === 2
          ? 1000
          : level === 4
          ? 2500
          : level === 6
          ? 5000
          : level === 8
          ? 10000
          : 10000;


      let progress;


      if (level === 10) {

        progress = 100;

      }

      else {

        progress =
          (
            (data.xp - currentLevelXP)
            /
            (nextLevelXP - currentLevelXP)
          ) * 100;

      }


      progress =
        Math.max(
          0,
          Math.min(
            100,
            progress
          )
        );


      xpProgress.style.width =
        `${progress}%`;


      if (xpRow) {

        xpRow.innerHTML = `

          <span>
            ${data.xp.toLocaleString()} XP
          </span>

          <span>
            ${nextLevelXP.toLocaleString()} XP
          </span>

        `;

      }

    }


    /* =========================
       ACHIEVEMENTS
    ========================== */

    const achievements =
      document.querySelectorAll(
        ".achievement-card"
      );


    if (achievements.length) {

      /* First Look */

      if (data.xp >= 120) {

        achievements[0]
          ?.classList.add("active");

      }


      /* Watcher */

      if (watchlist.length >= 1) {

        achievements[1]
          ?.classList.add("active");

      }


      /* Futures */

      if (
        localStorage.getItem(
          "nextra_futures_visited"
        ) === "true"
      ) {

        achievements[2]
          ?.classList.add("active");

      }


      /* Market Hunter */

      if (watchlist.length >= 5) {

        achievements[3]
          ?.classList.add("active");

      }

    }


  }


  /* =======================================================
     PUBLIC XP FUNCTION
     Bisa dipanggil halaman lain:
     
     window.NEXTRA_XP.add(50)
  ======================================================== */

  window.NEXTRA_XP = {

    add(amount = 10) {

      const data =
        getXP();


      data.xp =
        Math.max(
          0,
          data.xp + Number(amount)
        );


      data.level =
        getLevel(
          data.xp
        );


      localStorage.setItem(
        XP_KEY,
        JSON.stringify(data)
      );


      updateProfile();

    },


    get() {

      return getXP();

    }

  };


  /* =======================================================
     INITIALIZE
  ======================================================== */

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      updateProfile
    );

  }

  else {

    updateProfile();

  }


})();
