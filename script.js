// Tabs wechseln
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

fetch("tools.json")
  .then((res) => res.json())
  .then((data) => {
    const grid = document.getElementById("tool-grid");

    const sortiertKategorien = Object.entries(data.categories).sort(
      (a, b) => a[1].order - b[1].order,
    );

    sortiertKategorien.forEach(([key, kategorie]) => {
      const kasten = document.createElement("div");
      kasten.className = "kategorie-kasten";

      const anzahl = data.tools.filter((tool) => tool.category === key).length;

      const header = document.createElement("div");
      header.className = "kategorie-kasten__header";
      header.innerHTML = `
        <span>${kategorie.icon} ${kategorie.label}</span>
        <button class="kategorie-kasten__toggle">${anzahl} Tools ▼</button>
      `;
      kasten.appendChild(header);

      const kartenGrid = document.createElement("div");
      kartenGrid.className = "kategorie-kasten__grid";

      data.tools
        .filter((tool) => tool.category === key)
        .forEach((tool) => {
          const card = document.createElement("div");
          card.className = "card";
          card.innerHTML = `
            <p>${tool.name}</p>
            <p>${tool.desc}</p>
          `;
          kartenGrid.appendChild(card);
        });

      kasten.appendChild(kartenGrid);
      grid.appendChild(kasten);
    });
  });