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
    // Statische Statistik-Zahlen setzen
    document.querySelector(".statistik__wert--alle").textContent =
      data.tools.length;
    document.querySelector(".statistik__wert--hirens").textContent =
      data.tools.filter((t) => t.includes.includes("hirens")).length;
    document.querySelector(".statistik__wert--medicat").textContent =
      data.tools.filter((t) => t.includes.includes("medicat")).length;
    document.querySelector(".statistik__wert--standalone").textContent =
      data.tools.filter((t) => t.includes.includes("standalone")).length;

    // Lokale Software — provisorisch 0
    document.querySelector(".statistik__wert--lokal").textContent = 0;

    // ───────────────────────────────────────
    // SCHNELLZUGRIFF (Tier 0)
    // ───────────────────────────────────────

    const schnellzugriff = document.getElementById("schnellzugriff-grid");

    data.tools
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
    const sortiertKategorien = Object.entries(data.categories).sort(
      (a, b) => a[1].order - b[1].order,
    );

    sortiertKategorien.forEach(([key, kategorie]) => {
      const kasten = document.createElement("div");
      kasten.className = "kategorie-kasten";
      kasten.id = `kategorie-${key}`;

      // Anzahl Tools in dieser Kategorie zählen
      const anzahl = data.tools.filter((tool) => tool.category === key).length;
      const tier2Anzahl = data.tools.filter(
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
      data.tools
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

    // ═══════════════════════════════════════════
    // ALLE EINKLAPPEN BUTTON
    // ═══════════════════════════════════════════

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
      if (card.classList.contains("card--erweitert")) return;

      if (!filter) {
        card.classList.remove("versteckt");
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
    if (card.classList.contains("card--erweitert")) return;

    const name =
      card.querySelector(".card__name")?.textContent.toLowerCase() ?? "";
    const desc =
      card.querySelector(".card__desc")?.textContent.toLowerCase() ?? "";

    const treffer = name.includes(begriff) || desc.includes(begriff);
    card.classList.toggle("versteckt", !treffer);
  });
});
