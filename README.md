# Notfall USB Tool-Sammlung

Eine interaktive Web-Übersicht aller Tools auf Niklas' Notfall-USB-Stick – inklusive PC-Setup-Programmliste.

## Features

- **Zwei Modi:** Notfall USB (Hiren's / MediCat / Standalone) und PC Setup (Programme)
- **Schnellzugriff-Grid** für die wichtigsten Tier-0-Tools
- **Kategorisierte Tool-Übersicht** mit ein-/ausklappbaren Kategorien
- **Filter** nach Tool-Quelle (Hiren's BootCD PE, MediCat, Standalone)
- **Suche** über alle Tool-Namen und Beschreibungen
- **Erweiterte Tools** (Tier 2) können global oder pro Kategorie eingeblendet werden
- **Live-Statistiken** im Header (Tool-Anzahl, Kategorien, Schnellzugriff-Count)

## Projektstruktur (Dashboard)

```text
├── index.html      # Haupt-UI mit Header, Mode-Switcher und Tab-Sektionen
├── script.js       # Daten laden, DOM-Rendering, Filter- & Suchlogik
├── styles.css      # Styling (dark theme, CSS-Variablen)
└── tools.json      # Tool-Datenbank (notfall + setup)
```

## Struktur des USB-Sticks

```text
USB-Stick/
├── ISOs/
│   ├── Windows/               # Win 10 / Win 11 ISOs
│   ├── Rettung/               # Hiren's, ESET, Kaspersky Rescue, Memtest86+, UBCD, Clonezilla, ShredOS
│   └── Linux/                 # SystemRescue, Ubuntu, Mint, Tails
├── Tools/
│   ├── 01_Windows-Optimierung/
│   ├── 02_Festplatte-Speicher/
│   ├── 03_Sicherheit-Viren/
│   ├── 04_Backup-Imaging/
│   ├── 05_Keys-Passwoerter/
│   ├── 06_Forensik-Analyse/
│   ├── 07_Netzwerk-Diagnose/
│   ├── 08_Hardware-Info/
│   ├── 09_Stress-Tests/
│   ├── 10_System-Reparatur/
│   ├── 11_Datenrettung/
│   ├── 12_Fernwartung/
│   ├── 13_Treiber/
│   └── 14_Sonstiges/
└── _SETUP/                    # Dieses Repo
    ├── index.html
    ├── script.js
    ├── styles.css
    ├── tools.json
    ├── README.md
    ├── ventoy/
    │   └── ventoy.json TODO
    └── scripts/
        └── download-tools.ps1 TODO
```

## tools.json Format

```json
{
  "notfall": {
    "categories": {
      "kategorie-key": { "label": "Name", "icon": "🔧", "order": 1 }
    },
    "tools": [
      {
        "name": "Tool Name",
        "short": "Kurzbeschreibung (für Schnellzugriff)",
        "desc": "Längere Beschreibung",
        "category": "kategorie-key",
        "tier": 0,
        "includes": ["hirens", "medicat", "standalone"]
      }
    ]
  },
  "setup": {
    "categories": {},
    "tools": []
  }
}
```

### Tier-System (Notfall-Modus)

| Tier | Bedeutung                                  |
| ---- | ------------------------------------------ |
| `0`  | Schnellzugriff – erscheint oben im Grid    |
| `1`  | Standard – immer sichtbar in der Kategorie |
| `2`  | Erweitert – standardmäßig ausgeblendet     |

### Quellen (`includes`-Werte)

| Wert           | Quelle                  |
| -------------- | ----------------------- |
| `hirens`       | Hiren's BootCD PE       |
| `medicat`      | MediCat PortableApps    |
| `standalone`   | Standalone Tools-Ordner |

## Quellen & Offizielle Downloads

| Sammlung          | Link                                                              |
| ----------------- | ----------------------------------------------------------------- |
| Hiren's BootCD PE | <https://www.hirensbootcd.org/download/>                          |
| MediCat USB       | <https://docs.medicat.dev/usb/tools/antivirus/>                   |
| NirSoft Tools     | <https://launcher.nirsoft.net/utilities_list.html>                |

## Geplante Features (TODO)

- **Tool-Links im Dashboard** – Klick auf einen Tool-Namen soll direkt zur Datei auf dem USB-Stick weiterleiten (z. B. via relativem Pfad oder `file://`-Link). Erfordert, dass das Dashboard vom Stick geöffnet wird, nicht aus dem Browser.

## Rechtliche Hinweise

Alle aufgeführten Tools sind Eigentum ihrer jeweiligen Entwickler und Rechteinhaber. Dieses Dashboard ist ein rein privates, nicht-kommerzielles Organisationswerkzeug.

- Die Tools werden nicht neu verteilt – es handelt sich ausschließlich um eine persönliche Übersicht bereits lizenzierter oder frei verfügbarer Software.
- Hiren's BootCD PE basiert auf Windows PE und unterliegt den Microsoft-Lizenzbedingungen für WinPE.
- MediCat und enthaltene Tools unterliegen den jeweiligen Open-Source- bzw. Freeware-Lizenzen der einzelnen Programme.
- NirSoft-Tools sind Freeware für den persönlichen Gebrauch – kommerzielle Nutzung erfordert eine Lizenz.
- Die Nutzung von Diagnose- und Wiederherstellungstools auf fremden Systemen ist nur mit ausdrücklicher Erlaubnis des Eigentümers zulässig.
