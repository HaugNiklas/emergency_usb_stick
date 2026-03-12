# 🛠️ Ventoy USB Toolkit

> **Persönlicher IT-Rettungsstick auf Basis von [Ventoy](https://www.ventoy.net).**  
> Dieses Repository enthält **keine Binaries oder ISOs** – nur Dokumentation, Konfiguration und Download-Scripts.  
> Alle verlinkten Tools sind Freeware/Open Source oder haben eine Portable-Lizenz.
> [!WARNING]
> **🚧 WORK IN PROGRESS – Aktiv in Bearbeitung**  
> Dieses Repository ist noch nicht fertig. Tool-Listen, Ordnerstruktur, Scripts und Dashboard befinden sich im Aufbau und können sich jederzeit ändern. Nichts hier ist als abgeschlossen zu betrachten.

---

## 📋 TODO / Geplante Features

- [ ] **Tool-Links im Dashboard** – Klick auf einen Tool-Namen soll direkt zur Datei auf dem USB-Stick weiterleiten (z.B. via relativem Pfad oder `file://`-Link). Erfordert, dass das Dashboard vom Stick geöffnet wird, nicht aus dem Browser.

---

## 📁 Struktur des USB-Sticks

```de
USB-Stick/
├── ISOs/
│   ├── Windows/               ← Win 10 / Win 11 ISOs
│   ├── Rettung/               ← Hiren's, ESET, Memtest86+, UBCD, Clonezilla, ShredOS
│   └── Linux/                 ← SystemRescue, Ubuntu, Mint, Tails
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
└── _SETUP/                    ← Dieser Ordner = GitHub Repo
    ├── README.md
    ├── ventoy/
    │   └── ventoy.json
    └── scripts/
        └── download-tools.ps1
```

> 💡 Nummerierung der Ordner sorgt für konsistente Sortierung auf jedem System

---

## 🗂️ Was ist wo enthalten?

Nicht jedes Tool muss manuell heruntergeladen werden. Dieses README listet **nur Standalone-Tools**, die separat auf den Stick müssen.

| Quelle | Beschreibung | Tool-Liste |
| --- | --- | --- |
| **Hiren's BootCD PE** (ISO) | ~300 Tools vorinstalliert, läuft im Windows PE | [hirensbootcd.org/tools](https://www.hirensbootcd.org/tools/) |
| **MediCat USB** (ISO) | Große PortableApps-Sammlung | [docs.medicat.dev](https://docs.medicat.dev/usb/tools/portable-apps/list-of-portapps) |
| **Tools/ (Standalone)** | Diese README → manuell herunterladen | 👇 unten |

Das interaktive **Dashboard** (`_SETUP/dashboard.html`) zeigt alle Tools aller Quellen mit Filter nach Quelle – ideal für den Einsatz direkt vom Stick.

---

## ⚙️ Ventoy Konfiguration

Die `ventoy/ventoy.json` sorgt für ein übersichtliches Bootmenü mit Kategorien und lesbaren Namen.  
Datei in den `/ventoy/` Ordner auf dem Stick kopieren.

```json
{
    "control": [
        { "VTOY_MENU_TIMEOUT": "30" },
        { "VTOY_FILT_DOT_UNDERSCORE_FILE": "1" },
        { "VTOY_DEFAULT_MENU_MODE": "0" }
    ],

    "theme": {
        "file": "/ventoy/theme/theme.txt",
        "gfxmode": "1920x1080",
        "display_mode": "GUI",
        "ventoy_left": "5%",
        "ventoy_top": "95%",
        "ventoy_color": "#00aaff"
    },

    "menu_alias": [
        { "dir": "/ISOs/Windows", "alias": "🪟  Windows Installation" },
        { "image": "/ISOs/Windows/Win11.iso", "alias": "Windows 11 – Neuinstallation" },
        { "image": "/ISOs/Windows/Win10.iso", "alias": "Windows 10 – Neuinstallation" },
        { "dir": "/ISOs/Rettung", "alias": "🛠️  Rettung & Reparatur" },
        { "image": "/ISOs/Rettung/Hirens-BootCD-PE.iso", "alias": "Hiren's BootCD PE – Allzweck-Rettungssystem" },
        { "image": "/ISOs/Rettung/ESET-SysRescue.iso", "alias": "ESET SysRescue Live – Virenscanner (Offline)" },
        { "image": "/ISOs/Rettung/Memtest86plus.iso", "alias": "Memtest86+ – RAM-Test" },
        { "image": "/ISOs/Rettung/UBCD.iso", "alias": "Ultimate Boot CD – Hardware-Diagnose Sammlung" },
        { "image": "/ISOs/Rettung/Clonezilla.iso", "alias": "Clonezilla – Festplatten & Partitionen klonen" },
        { "image": "/ISOs/Rettung/ShredOS.iso", "alias": "ShredOS – Festplatten sicher löschen (vor PC-Verkauf)" },
        { "image": "/ISOs/Rettung/SuperGRUB2.iso", "alias": "Super GRUB2 Disk – Startet Systeme die nicht mehr booten" },
        { "dir": "/ISOs/Linux", "alias": "🐧  Linux Live" },
        { "image": "/ISOs/Linux/SystemRescue.iso", "alias": "SystemRescue – Linux Rettungssystem (inkl. GParted)" },
        { "image": "/ISOs/Linux/Ubuntu-Live.iso", "alias": "Ubuntu Live – Dateien retten wenn Windows nicht bootet" },
        { "image": "/ISOs/Linux/LinuxMint.iso", "alias": "Linux Mint – Windows-ähnlich, einfache Dateirettung" },
        { "image": "/ISOs/Linux/Tails.iso", "alias": "Tails OS – Anonym surfen, hinterlässt keine Spuren" }
    ],

    "menu_class": [
        { "key": "Win11",        "class": "windows" },
        { "key": "Win10",        "class": "windows" },
        { "key": "Hirens",       "class": "hiren" },
        { "key": "ESET",         "class": "linux" },
        { "key": "Memtest",      "class": "memtest" },
        { "key": "UBCD",         "class": "linux" },
        { "key": "Clonezilla",   "class": "linux" },
        { "key": "ShredOS",      "class": "linux" },
        { "key": "SuperGRUB2",   "class": "linux" },
        { "key": "SystemRescue", "class": "linux" },
        { "key": "Ubuntu",       "class": "ubuntu" },
        { "key": "LinuxMint",    "class": "linux" },
        { "key": "Tails",        "class": "linux" }
    ]
}
```

> 💡 Für ein grafisches Theme: [Ventoy Themes auf GitHub](https://github.com/topics/ventoy-theme) → entpacken nach `/ventoy/theme/`

---

## 🪟 Windows-Optimierung

| Tool | Beschreibung | Download |
| --- | --- | --- |
| **O&O ShutUp10++** | Datenschutz & Telemetrie deaktivieren | [Download](https://www.oo-software.com/en/shutup10) |
| **O&O AppBuster** | Vorinstallierte Bloatware entfernen | [Download](https://www.oo-software.com/en/ooappbuster) |
| **Autoruns** | Autostart-Einträge verwalten (SysInternals) | [Download](https://learn.microsoft.com/en-us/sysinternals/downloads/autoruns) |

---

## 💾 Festplatte & Speicher

| Tool | Beschreibung | Download |
| --- | --- | --- |
| **CrystalDiskInfo** | SMART-Daten & HDD/SSD-Health überwachen | [Download](https://crystalmark.info/en/software/crystaldiskinfo/) |
| **CrystalDiskMark** | Lese-/Schreibgeschwindigkeit benchmarken | [Download](https://crystalmark.info/en/software/crystaldiskmark/) |
| **Victoria** | Low-Level HDD-Diagnose & Bad Sector Remapping | [Download](https://hdd.by/victoria/) |
| **WizTree** | Speicherplatzbelegung (NTFS direkt, sehr schnell) | [Download](https://www.diskanalyzer.com/) |
| **AOMEI Partition Assistant** | Partitionen verschieben, verkleinern & verwalten | [Download](https://www.aomeitech.com/aomei-partition-assistant.html) |

---

## 🛡️ Sicherheit & Viren

| Tool | Beschreibung | Download |
| --- | --- | --- |
| **Malwarebytes** | On-Demand Malware-Scanner (Free: kein Echtzeit-Schutz) | [Download](https://www.malwarebytes.com/) |
| **Emsisoft Emergency Kit** | Portable Malware-Scanner, kein Install nötig | [Download](https://www.emsisoft.com/en/home/emergencykit/) |
| **Dr. Web CureIt!** | Scanner mit anderer Engine – findet was andere übersehen | [Download](https://free.drweb.com/cureit/) |
| **Kaspersky TDSSKiller** | Spezialist für Rootkits & Bootkits | [Download](https://support.kaspersky.com/viruses/disinfection/5350) |
| **Ransomware Decryption Tools** | No More Ransom Entschlüsselungs-Sammlung | [Download](https://www.nomoreransom.org/) |
| **VeraCrypt** | Verschlüsselte Container erstellen & öffnen | [Download](https://www.veracrypt.fr/en/Downloads.html) |

---

## 💿 Backup & Imaging

> ⚡ **Wichtig:** Vor jeder größeren Reparatur ein Image erstellen!

| Tool | Beschreibung | Download |
| --- | --- | --- |
| **Macrium Reflect Free** | System-Backup & Images erstellen, bootfähige Rettungs-USB | [Download](https://www.macrium.com/reflectfree.aspx) |
| **Unstoppable Copier** | Kopiert Dateien von beschädigten Datenträgern trotz Lesefehler | [Download](https://www.roadkil.net/program.php?ProgramID=29) |

---

## 🧰 NirSoft – NirLauncher

**[NirLauncher](https://www.nirsoft.net/utils/nirlauncher.html)** ist ein Sammelpaket mit **200+ Portable-Tools** von NirSoft – ein einziger Download ersetzt Dutzende Einzeldownloads.

Besonders nützliche enthaltene Tools:

| Bereich | Tool | Funktion |
| --- | --- | --- |
| 🔑 **Keys** | ProduKey | Windows + Office Lizenzkeys auslesen |
| 🔑 **Passwörter** | WebBrowserPassView | Gespeicherte Browser-Passwörter anzeigen |
| 🔑 **Passwörter** | WirelessKeyView | WLAN-Passwörter (WEP/WPA) anzeigen |
| 🔑 **Passwörter** | VaultPasswordView | Windows Vault / Credential Manager entschlüsseln |
| 🔍 **Forensik** | LastActivityView | Vollständige Zeitlinie aller PC-Aktionen |
| 🔍 **Forensik** | USBDeview | Alle USB-Geräte die je angeschlossen waren |
| 🔍 **Forensik** | ShellBagsView | Welche Ordner wurden wann geöffnet – auch gelöschte |
| 🔍 **Forensik** | BrowsingHistoryView | Browser-Verlauf aller Browser auf einmal |
| 🌐 **Netzwerk** | CurrPorts | Alle offenen TCP/UDP-Verbindungen live |
| 🌐 **Netzwerk** | WifiInfoView | WLAN-Netzwerke in der Umgebung analysieren |
| 🌐 **Netzwerk** | NetworkLatencyView | Netzwerklatenz zu allen Hops messen |
| 🖥️ **System** | BlueScreenView | BSOD-Crashdumps analysieren |
| 🖥️ **System** | DriverView | Alle geladenen Treiber auf einen Blick |

> 💡 ProduKey & WebBrowserPassView lohnen sich zusätzlich als **Einzeldownload** für schnellen Direktstart ohne den ganzen Launcher zu öffnen.  
> 🔗 [Vollständige Tool-Liste auf launcher.nirsoft.net](https://launcher.nirsoft.net/utilities_list.html)

---

## ⚙️ Microsoft – SysInternals Suite

**[SysInternals Suite](https://learn.microsoft.com/en-us/sysinternals/downloads/sysinternals-suite)** ist eine Sammlung von **70+ Diagnose- und Verwaltungstools** von Microsoft (ursprünglich Mark Russinovich). Goldstandard für tiefe Windows-Analyse.

Besonders nützliche enthaltene Tools:

| Bereich | Tool | Funktion |
| --- | --- | --- |
| 🚀 **Autostart** | Autoruns | Alle Autostart-Einträge an einem Ort – Browser-Erweiterungen, Dienste, Tasks |
| 🔍 **Prozesse** | Process Explorer | Erweiterter Task-Manager mit VirusTotal-Integration & DLL-Ansicht |
| 🔍 **Prozesse** | Process Monitor | Datei-, Registry- & Prozessaktivität in Echtzeit mitschneiden |
| 🔍 **Prozesse** | ProcDump | Prozess-Dumps bei CPU-Spitzen oder Abstürzen erstellen |
| 🌐 **Netzwerk** | TCPView | Alle TCP/UDP-Verbindungen live mit Prozesszuordnung |
| 🌐 **Netzwerk** | PsPing | Netzwerklatenz & Bandbreite messen |
| 🖥️ **System-Info** | RAMMap | Windows RAM-Nutzung auf Seitenebene analysieren |
| 🖥️ **System-Info** | VMMap | Virtuellen Adressraum eines einzelnen Prozesses analysieren |
| 💾 **Festplatte** | Disk2vhd | Laufendes System direkt als VHD-Image exportieren |
| 💾 **Festplatte** | SDelete | Dateien & freien Speicher sicher überschreiben (DoD-Standard) |
| 🔒 **Sicherheit** | Sigcheck | Datei-Signaturen & VirusTotal-Scan direkt aus Explorer |
| 🔒 **Sicherheit** | AccessChk | Effektive Berechtigungen auf Dateien, Registry & Dienste prüfen |
| 📋 **Registry** | Autoruns | Auch Registry-Autostart-Einträge (bereits oben genannt) |
| 🖥️ **Remote** | PsExec | Prozesse auf Remote-Systemen ausführen – ohne VPN/RDP |

> 💡 Alternativ einzelne Tools herunterladen – alle sind auf [learn.microsoft.com/sysinternals](https://learn.microsoft.com/en-us/sysinternals/downloads/) einzeln verfügbar.  
> 🔗 [SysInternals Suite als ZIP (alle Tools)](https://download.sysinternals.com/files/SysinternalsSuite.zip)

---

## 🔑 Keys & Passwörter

> 💡 Die meisten Tools hier sind bereits in **NirLauncher** (s.o.) enthalten. Einzeldownloads nur für schnellen Direktstart sinnvoll.

| Tool | Beschreibung | Download |
| --- | --- | --- |
| **ProduKey** | Windows + Office Lizenzkeys auslesen | [Download](https://www.nirsoft.net/utils/product_cd_key_viewer.html) |
| **WebBrowserPassView** | Gespeicherte Browser-Passwörter anzeigen | [Download](https://www.nirsoft.net/utils/web_browser_password.html) |
| **WirelessKeyView** | WLAN-Passwörter anzeigen | [Download](https://www.nirsoft.net/utils/wireless_key.html) |

---

## 🔍 Forensik & Analyse

| Tool | Beschreibung | Download |
| --- | --- | --- |
| **USBDeview** *(NirSoft)* | Alle USB-Geräte die je angeschlossen waren | [Download](https://www.nirsoft.net/utils/usb_devices_view.html) |
| **LastActivityView** *(NirSoft)* | Vollständige Zeitlinie aller Aktionen auf dem PC | [Download](https://www.nirsoft.net/utils/computer_activity_view.html) |
| **BrowsingHistoryView** *(NirSoft)* | Browser-Verlauf aller Browser auf einmal anzeigen | [Download](https://www.nirsoft.net/utils/browsing_history_view.html) |
| **ShellBagsView** *(NirSoft)* | Welche Ordner wurden wann geöffnet – auch gelöschte | [Download](https://www.nirsoft.net/utils/shell_bags_view.html) |
| **Process Explorer** *(SysInternals)* | Erweiterter Task-Manager mit VirusTotal-Integration | [Download](https://learn.microsoft.com/en-us/sysinternals/downloads/process-explorer) |

> 💡 Die NirSoft-Tools sind alle in **NirLauncher** enthalten, Process Explorer ist Teil der **SysInternals Suite** – kein separater Download nötig, wenn diese bereits auf dem Stick sind.

---

## 🌐 Netzwerk & Diagnose

| Tool | Beschreibung | Download |
| --- | --- | --- |
| **NetAdapter Repair** | Netzwerkadapter reparieren & zurücksetzen | [Download](https://www.bleepingcomputer.com/download/netadapter-repair-all-in-one/) |
| **Advanced IP Scanner** | Alle Geräte im lokalen Netzwerk finden | [Download](https://www.advanced-ip-scanner.com/) |
| **TCPView** *(SysInternals)* | Netzwerkverbindungen live überwachen | [Download](https://learn.microsoft.com/en-us/sysinternals/downloads/tcpview) |
| **Wireshark** | Netzwerkverkehr mitschneiden & analysieren | [Download](https://www.wireshark.org/download.html) |

> 💡 TCPView ist Teil der **SysInternals Suite** – kein separater Download nötig, wenn die Suite bereits auf dem Stick ist.

---

## 🖥️ Hardware-Info

| Tool | Beschreibung | Download |
| --- | --- | --- |
| **HWiNFO64** | Vollständige Hardware-Diagnose – Temps, Voltages, Sensoren | [Download](https://www.hwinfo.com/download/) |
| **CPU-Z** | CPU, RAM & Mainboard Details | [Download](https://www.cpuid.com/softwares/cpu-z.html) |
| **GPU-Z** | GPU-Details, VRAM, Takt & Sensoren | [Download](https://www.techpowerup.com/gpuz/) |
| **BlueScreenView** *(NirSoft)* | BSOD-Crashdumps analysieren – fehlerhaften Treiber finden | [Download](https://www.nirsoft.net/utils/blue_screen_view.html) |

---

## 🔥 Stress-Tests

| Tool | Beschreibung | Download |
| --- | --- | --- |
| **OCCT** | All-in-One Stress-Test – CPU, GPU, RAM & Netzteil | [Download](https://www.ocbase.com/) |
| **Prime95** | CPU Stress-Test & Stabilitätstest (Goldstandard) | [Download](https://www.mersenne.org/download/) |
| **FurMark** | Aggressivster GPU Stress-Test | [Download](https://geeks3d.com/furmark/) |
| **Memtest86+** | RAM-Test außerhalb von Windows → **ISO ins Bootmenü** | [Download](https://www.memtest.org/) |

---

## 🔧 System-Reparatur

| Tool | Beschreibung | Download |
| --- | --- | --- |
| **Windows Repair (Tweaking.com)** | Repariert kaputte Windows-Funktionen (Registry, Update, Firewall usw.) | [Download](https://www.tweaking.com/content/page/windows_repair_all_in_one.html) |
| **DDU (Display Driver Uninstaller)** | Grafiktreiber rückstandslos entfernen | [Download](https://www.guru3d.com/download/display-driver-uninstaller-download/) |

---

## 🗃️ Datenrettung

| Tool | Beschreibung | Download |
| --- | --- | --- |
| **Recuva Portable** | Gelöschte Dateien einfach wiederherstellen | [Download](https://www.ccleaner.com/recuva/download) |
| **TestDisk / PhotoRec** | Partitionen & Dateien tief wiederherstellen | [Download](https://www.cgsecurity.org/wiki/TestDisk_Download) |
| **Unstoppable Copier** | Kopiert Dateien von beschädigten Datenträgern trotz Lesefehler | [Download](https://www.roadkil.net/program.php?ProgramID=29) |

> 💡 Recuva für einfache Fälle → TestDisk/PhotoRec für schwere Fälle

---

## 🖥️ Fernwartung

| Tool | Beschreibung | Download |
| --- | --- | --- |
| **AnyDesk Portable** | Fernwartung ohne Installation | [Download](https://anydesk.com/en/downloads/windows) |

---

## 🚗 Treiber

| Tool | Beschreibung | Download |
| --- | --- | --- |
| **Snappy Driver Installer Origin (SDIO)** | Treiber sichern, wiederherstellen & aktualisieren – riesige Offline-Datenbank | [Download](https://www.glenn.delahoy.com/snappy-driver-installer-origin/) |

---

## 📦 Sonstiges & Hilfsprogramme

| Tool | Beschreibung | Download |
| --- | --- | --- |
| **Ventoy** | USB-Stick mit Ventoy aufsetzen oder aktualisieren | [Download](https://www.ventoy.net/en/download.html) |
| **Rufus** | Bootfähige USBs erstellen (Alternative für Einzelsticks) | [Download](https://rufus.ie/) |
| **Everything** | Blitzschnelle Dateisuche auf NTFS | [Download](https://www.voidtools.com/) |
| **FastCopy** | Sehr schnelles Kopieren & Sichern | [Download](https://fastcopy.jp/en/) |
| **7-Zip** | Archivhandling (alle Formate) | [Download](https://www.7-zip.org/) |
| **Notepad++** | Configs & Logs komfortabel bearbeiten | [Download](https://notepad-plus-plus.org/downloads/) |

---

## 📀 ISOs – Ventoy-Bootmenü

### 🪟 Windows

| ISO | Beschreibung | Download |
| --- | --- | --- |
| **Windows 11** | Neuinstallation | [Microsoft Media Creation Tool](https://www.microsoft.com/de-de/software-download/windows11) |
| **Windows 10** | Neuinstallation | [Microsoft Media Creation Tool](https://www.microsoft.com/de-de/software-download/windows10) |

### 🛠️ Rettung & Reparatur

| ISO | Beschreibung | Download |
| --- | --- | --- |
| **Hiren's BootCD PE** | All-in-One Rettungssystem (Win PE + ~300 Tools) | [Download](https://www.hirensbootcd.org/download/) |
| **ESET SysRescue Live** | Bootbarer Offline-Virenscanner | [Download](https://www.eset.com/int/support/sysrescue/) |
| **Memtest86+** | RAM-Test außerhalb von Windows | [Download](https://www.memtest.org/) |
| **Ultimate Boot CD (UBCD)** | Hardware-Diagnose Sammlung, ergänzt Hiren's | [Download](https://www.ultimatebootcd.com/download.html) |
| **Clonezilla Live** | Festplatten & Partitionen 1:1 klonen | [Download](https://clonezilla.org/downloads.php) |
| **ShredOS** | Festplatten sicher löschen vor PC-Verkauf (DoD-Standard) | [Download](https://github.com/PartialVolume/shredos.x86_64) |
| **Super GRUB2 Disk** | Startet Systeme die nach Updates nicht mehr booten | [Download](https://www.supergrubdisk.org/) |

### 🐧 Linux Live

| ISO | Beschreibung | Download |
| --- | --- | --- |
| **SystemRescue** | Mächtiges Linux-Rettungssystem (inkl. GParted) | [Download](https://www.system-rescue.org/Download/) |
| **Ubuntu Live** | Dateien retten wenn Windows nicht bootet – einfachste GUI | [Download](https://ubuntu.com/download/desktop) |
| **Linux Mint Live** | Windows-ähnlich, ideal für Einsteiger & Dateirettung | [Download](https://linuxmint.com/download.php) |
| **Tails OS** | Anonym surfen, alles verschlüsselt, hinterlässt keine Spuren | [Download](https://tails.boum.org/install/) |

---

## ⚠️ Rechtliche Hinweise

- Dieses Repository enthält **keine urheberrechtlich geschützten Dateien**
- Alle Tools werden direkt von den offiziellen Quellen heruntergeladen
- Windows ISOs bitte direkt über das [Microsoft Media Creation Tool](https://www.microsoft.com/de-de/software-download/) beziehen
- Hiren's BootCD PE und MediCat USB sind **Boot-Umgebungen** (Windows PE) – die enthaltenen Tools laufen nicht unter laufendem Windows
- Standalone-Tools laufen direkt unter laufendem Windows

---

## 📝 Lizenz

Eigene Scripts und Konfigurationsdateien in diesem Repository: [MIT License](LICENSE)
