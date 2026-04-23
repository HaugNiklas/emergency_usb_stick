// ═══════════════════════════════════════════
// HEADER STATS & MODE SWITCHER
// ═══════════════════════════════════════════

let currentMode = 'usb';
let appData = null;

function switchMode(m) {
  currentMode = m;

  document.querySelectorAll('.mode-btn').forEach((b, i) => {
    b.className = 'mode-btn';
    if (i === 0 && m === 'usb') b.classList.add('active-usb');
    if (i === 1 && m === 'pc')  b.classList.add('active-pc');
  });

  const title = document.getElementById('main-title');
  if (m === 'usb') {
    title.innerHTML = '<span class="orange">Notfall</span> USB<br>Tool-Sammlung';
  } else {
    title.innerHTML = '<span class="teal">PC Setup</span><br>Tool-Liste';
  }

  const sectionMap = { usb: 'tools', pc: 'programme' };
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('tab--aktiv'));
  document.getElementById(sectionMap[m])?.classList.add('tab--aktiv');

  buildStats();
}

function buildStats() {
  const el = document.getElementById('header-stats');
  if (!appData) return;

  if (currentMode === 'usb') {
    const tools  = appData.notfall.tools;
    const cats   = Object.keys(appData.notfall.categories).length;
    const tier0  = tools.filter(t => t.tier === 0).length;
    el.innerHTML = `
      <div class="stat">
        <div class="stat-num" style="color:var(--accent-usb)">${tools.length}</div>
        <div class="stat-label">Tools</div>
      </div>
      <div class="stat">
        <div class="stat-num">${cats}</div>
        <div class="stat-label">Kategorien</div>
      </div>
      <div class="stat">
        <div class="stat-num" style="color:#ffd700">${tier0}</div>
        <div class="stat-label">Schnellzugriff</div>
      </div>
    `;
  } else {
    const tools = appData.setup.tools;
    const cats  = Object.keys(appData.setup.categories).length;
    el.innerHTML = `
      <div class="stat">
        <div class="stat-num" style="color:var(--accent-pc)">${tools.length}</div>
        <div class="stat-label">Tools</div>
      </div>
      <div class="stat">
        <div class="stat-num">${cats}</div>
        <div class="stat-label">Kategorien</div>
      </div>
    `;
  }
}

// ═══════════════════════════════════════════
// TABS WECHSELN
// ═══════════════════════════════════════════

const navButtons = document.querySelectorAll(".navigation__btn");
const tabs = document.querySelectorAll(".tab");

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const ziel = button.dataset.tab;
    navButtons.forEach((btn) => btn.classList.remove("navigation__btn--aktiv"));
    tabs.forEach((tab) => tab.classList.remove("tab--aktiv"));
    button.classList.add("navigation__btn--aktiv");
    document.getElementById(ziel).classList.add("tab--aktiv");
  });
});

// ═══════════════════════════════════════════
// STATISTIK AKTUALISIEREN
// ═══════════════════════════════════════════

function statistikAktualisieren() {
  const sichtbar = document.querySelectorAll(
    "#tool-grid .card:not(.versteckt)",
  ).length;
  document.querySelector(".statistik__wert--sichtbar").textContent = sichtbar;
}

// ═══════════════════════════════════════════
// DATEN LADEN
// ═══════════════════════════════════════════

fetch("tools.json")
  .then((res) => res.json())
  .then((data) => {
    appData = data;
    buildStats();

    const notfall = data.notfall;
    const setup   = data.setup;

    // Statische Statistik-Zahlen setzen

    const statAlle = document.querySelector(".statistik__wert--alle");
    if (statAlle) statAlle.textContent = notfall.tools.length;
    const statHirens = document.querySelector(".statistik__wert--hirens");
    if (statHirens) statHirens.textContent = notfall.tools.filter((t) => t.includes.includes("hirens")).length;
    const statMedicat = document.querySelector(".statistik__wert--medicat");
    if (statMedicat) statMedicat.textContent = notfall.tools.filter((t) => t.includes.includes("medicat")).length;
    const statStandalone = document.querySelector(".statistik__wert--standalone");
    if (statStandalone) statStandalone.textContent = notfall.tools.filter((t) => t.includes.includes("standalone")).length;
    const statLokal = document.querySelector(".statistik__wert--lokal");
    if (statLokal) statLokal.textContent = 0;

    // ───────────────────────────────────────
    // SCHNELLZUGRIFF (Tier 0)
    // ───────────────────────────────────────

    const schnellzugriff = document.getElementById("schnellzugriff-grid");

    notfall.tools
      .filter((tool) => tool.tier === 0)
      .forEach((tool) => {
        const card = document.createElement("div");
        card.className = "card";
        card.style.cursor = "pointer";

        card.innerHTML = `
          <p class="card__name">${tool.name}</p>
          <p class="card__desc">${tool.short}</p>
          <div class="punkt__card">
            ${tool.includes.includes("hirens") ? '<span class="punkt punkt--hirens"></span>' : '<span class="punkt punkt--leer"></span>'}
            ${tool.includes.includes("medicat") ? '<span class="punkt punkt--medicat"></span>' : '<span class="punkt punkt--leer"></span>'}
            ${tool.includes.includes("standalone") ? '<span class="punkt punkt--standalone"></span>' : '<span class="punkt punkt--leer"></span>'}
          </div>
        `;

        // Klick → zum Kategorie-Kasten scrollen
        card.addEventListener("click", () => {
          const ziel = document.getElementById(`kategorie-${tool.category}`);
          if (ziel) ziel.scrollIntoView({ behavior: "smooth", block: "start" });
        });

        schnellzugriff.appendChild(card);
      });

    // ───────────────────────────────────────
    // TOOL-GRID (Kategorien)
    // ───────────────────────────────────────

    const grid = document.getElementById("tool-grid");

    // Kategorien nach "order" sortieren
    const sortiertKategorien = Object.entries(notfall.categories).sort(
      (a, b) => a[1].order - b[1].order,
    );

    sortiertKategorien.forEach(([key, kategorie]) => {
      const kasten = document.createElement("div");
      kasten.className = "kategorie-kasten";
      kasten.id = `kategorie-${key}`;

      // Anzahl Tools in dieser Kategorie zählen
      const anzahl = notfall.tools.filter((tool) => tool.category === key).length;
      const tier2Anzahl = notfall.tools.filter(
        (tool) => tool.category === key && tool.tier === 2,
      ).length;

      // Header mit Titel und Toggle
      const header = document.createElement("div");
      header.className = "kategorie-kasten__header";
      header.innerHTML = `
        <span>${kategorie.icon} ${kategorie.label}</span>
        <span class="kategorie-kasten__info"><span class="toggle-anzahl">${anzahl} Tools</span> <span class="toggle-pfeil">▼</span></span>
      `;
      kasten.appendChild(header);

      // Karten-Grid für die Tools
      const kartenGrid = document.createElement("div");
      kartenGrid.className = "kategorie-kasten__grid";

      // Header klicken → Kategorie ein-/ausklappen
      header.addEventListener("click", () => {
        const eingeklappt = kartenGrid.classList.toggle("versteckt");
        header.querySelector(".toggle-pfeil").textContent = eingeklappt
          ? "▶"
          : "▼";
      });

      // Tools der Kategorie als Karten einfügen
      notfall.tools
        .filter((tool) => tool.category === key)
        .forEach((tool) => {
          const card = document.createElement("div");
          card.className =
            tool.tier === 2 ? "card card--erweitert versteckt" : "card";
          card.innerHTML = `
            <p class="card__name">${tool.name}</p>
            <p class="card__desc">${tool.desc}</p>
            <div class="punkt__card">
              ${tool.includes.includes("hirens") ? '<span class="punkt punkt--hirens"></span>' : '<span class="punkt punkt--leer"></span>'}
              ${tool.includes.includes("medicat") ? '<span class="punkt punkt--medicat"></span>' : '<span class="punkt punkt--leer"></span>'}
              ${tool.includes.includes("standalone") ? '<span class="punkt punkt--standalone"></span>' : '<span class="punkt punkt--leer"></span>'}
            </div>
          `;
          kartenGrid.appendChild(card);
        });

      kasten.appendChild(kartenGrid);

      // Footer mit "Erweiterte anzeigen" Button
      const footer = document.createElement("div");
      footer.className = "kategorie-kasten__footer";
      footer.innerHTML = `<button class="filter__btn erweiterte-btn">+ ${tier2Anzahl} Weitere anzeigen</button>`;
      kasten.appendChild(footer);

      // Tier 2 Tools ein-/ausblenden
      const erweiterteBtn = footer.querySelector(".erweiterte-btn");
      erweiterteBtn.addEventListener("click", () => {
        const tier2Cards = kartenGrid.querySelectorAll(".card--erweitert");
        if (tier2Cards.length === 0) return;
        const versteckt = tier2Cards[0].classList.toggle("versteckt");
        tier2Cards.forEach((c) => c.classList.toggle("versteckt", versteckt));
        erweiterteBtn.textContent = versteckt
          ? `+ ${tier2Cards.length} Weitere anzeigen`
          : `− ${tier2Cards.length} Ausblenden`;
      });

      grid.appendChild(kasten);
    });

    // ───────────────────────────────────────
    // PROGRAMME-GRID (Setup)
    // ───────────────────────────────────────

    const programmGrid = document.getElementById("programm-grid");

    Object.entries(setup.categories)
      .sort((a, b) => a[1].order - b[1].order)
      .forEach(([key, kategorie]) => {
        const kasten = document.createElement("div");
        kasten.className = "kategorie-kasten";

        const header = document.createElement("div");
        header.className = "kategorie-kasten__header";
        const anzahl = setup.tools.filter((t) => t.category === key).length;
        header.innerHTML = `
          <span>${kategorie.icon} ${kategorie.label}</span>
          <span class="kategorie-kasten__info"><span class="toggle-anzahl">${anzahl} Programme</span> <span class="toggle-pfeil">▼</span></span>
        `;
        kasten.appendChild(header);

        const kartenGrid = document.createElement("div");
        kartenGrid.className = "kategorie-kasten__grid";

        header.addEventListener("click", () => {
          const eingeklappt = kartenGrid.classList.toggle("versteckt");
          header.querySelector(".toggle-pfeil").textContent = eingeklappt ? "▶" : "▼";
        });

        setup.tools
          .filter((t) => t.category === key)
          .forEach((tool) => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
              <p class="card__name">${tool.name}</p>
              <p class="card__desc">${tool.desc}</p>
            `;
            kartenGrid.appendChild(card);
          });

        kasten.appendChild(kartenGrid);
        programmGrid.appendChild(kasten);
      });

    // ═══════════════════════════════════════════
    // ALLE EINKLAPPEN BUTTON
    // ═══════════════════════════════════════════

    // ═══════════════════════════════════════════
    // GLOBALER "ERWEITERTE ANZEIGEN" BUTTON
    // ═══════════════════════════════════════════

    document.getElementById("erweiterte-anzeigen").addEventListener("click", () => {
      const alleErweiterten = document.querySelectorAll(".card--erweitert");
      const btn = document.getElementById("erweiterte-anzeigen");
      const aktuellVersteckt = alleErweiterten[0]?.classList.contains("versteckt") ?? true;

      alleErweiterten.forEach((c) => c.classList.toggle("versteckt", !aktuellVersteckt));

      // Auch die Footer-Buttons in jedem Kasten aktualisieren
      document.querySelectorAll(".erweiterte-btn").forEach((b) => {
        const kasten = b.closest(".kategorie-kasten");
        const anzahl = kasten?.querySelectorAll(".card--erweitert").length ?? 0;
        b.textContent = aktuellVersteckt
          ? `− ${anzahl} Ausblenden`
          : `+ ${anzahl} Weitere anzeigen`;
      });

      btn.textContent = aktuellVersteckt
        ? "− Erweiterte ausblenden"
        : "+ Erweiterte anzeigen";
    });

    document.getElementById("alle-einklappen").addEventListener("click", () => {
      const alleGrids = document.querySelectorAll(".kategorie-kasten__grid");
      const alleTogglePfeile = document.querySelectorAll(".toggle-pfeil");
      const btn = document.getElementById("alle-einklappen");

      const einklappen = !alleGrids[0].classList.contains("versteckt");

      alleGrids.forEach((g) => g.classList.toggle("versteckt", einklappen));
      alleTogglePfeile.forEach((p) => {
        p.textContent = einklappen ? "▶" : "▼";
      });

      btn.textContent = einklappen ? "▶ Alle ausklappen" : "▼ Alle einklappen";
    });
  });

// ═══════════════════════════════════════════
// FILTER BUTTONS
// ═══════════════════════════════════════════

document.querySelectorAll(".filter__optionen .filter__btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".filter__optionen .filter__btn")
      .forEach((b) => b.classList.remove("filter__btn--aktiv"));
    btn.classList.add("filter__btn--aktiv");

    let filter = null;
    if (btn.classList.contains("filter__btn--hiren")) filter = "hirens";
    if (btn.classList.contains("filter__btn--medicat")) filter = "medicat";
    if (btn.classList.contains("filter__btn--standalone"))
      filter = "standalone";

    document.querySelectorAll("#tool-grid .card").forEach((card) => {
      // Tier-2-Karten nur filtern wenn sie gerade sichtbar sind
      const istErweitert = card.classList.contains("card--erweitert");
      const istAufgeklappt = !card.classList.contains("versteckt");
      if (istErweitert && !istAufgeklappt) return;

      if (!filter) {
        if (!istErweitert) card.classList.remove("versteckt");
      } else {
        const hatPunkt = card.querySelector(`.punkt--${filter}`);
        card.classList.toggle("versteckt", !hatPunkt);
      }
    });
  });
});

// ═══════════════════════════════════════════
// SUCHLEISTE
// ═══════════════════════════════════════════

document.querySelector(".filter__suche").addEventListener("input", (e) => {
  const begriff = e.target.value.toLowerCase().trim();

  document.querySelectorAll("#tool-grid .card").forEach((card) => {
    // Tier-2-Karten nur durchsuchen wenn sie gerade sichtbar sind
    const istErweitert = card.classList.contains("card--erweitert");
    const istAufgeklappt = !card.classList.contains("versteckt");
    if (istErweitert && !istAufgeklappt) return;

    const name =
      card.querySelector(".card__name")?.textContent.toLowerCase() ?? "";
    const desc =
      card.querySelector(".card__desc")?.textContent.toLowerCase() ?? "";

    const treffer = name.includes(begriff) || desc.includes(begriff);
    if (!istErweitert) card.classList.toggle("versteckt", !treffer);
    else if (treffer) card.classList.remove("versteckt");
    else card.classList.add("versteckt");
  });
});
