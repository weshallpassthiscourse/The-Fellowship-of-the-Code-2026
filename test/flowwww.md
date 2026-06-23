``` mermaid
graph TD

    %% --- EINSTIEG AUS DEM HAUPTMENÜ ---
    Menu([Hauptmenü]) -- "Klick: Profile verwalten" --> Req[Admin-Login anfordern]
    
    Req -- "Klick: Abbrechen" --> Menu
    
    Req --> Scan[Admin-Finger scannen]
    Scan --> CheckAuth{Ist User ein Admin?}
    
    CheckAuth -- Nein --> CheckLimit{Max. 3 Versuche erreicht?}
    CheckLimit -- Nein --> Req
    CheckLimit -- Ja --> LogLock[Sperrung protokollieren]
    
    LogLock --> Lock[System für 3 Min. sperren]
    Lock --> Menu
    
    CheckAuth -- Ja --> Dash[Dashboard: Profilübersicht]

    %% --- ADMIN-DASHBOARD ---
    
    Dash -- "Klick: Abmelden" --> Menu
    Dash -- "Klick: + Neues Profil" --> ActionNew[Eingabemaske öffnen]
    Dash -- "Klick: Bestehendes Profil" --> ActionView[Profildetails anzeigen]
    
    %% STRANG A: NEUES PROFIL
    ActionNew -- "Klick: Abbrechen" --> Dash
    
    ActionNew --> J[Eingabe: Name]
    J --> K[Auswahl: Geschlecht]
    K --> L[Auswahl: Spezies]
    L --> T[Berechnung: Bedarf]
    T --> Z[Fingerabdruck scannen]
    
    Z --> SaveNew[Neues Profil in DB anlegen]
    SaveNew --> Dash
    
    %% STRANG B: BESTEHENDES PROFIL
    ActionView -- "Klick: Zurück" --> Dash
    ActionView -- "Klick: Bearbeiten" --> Edit[Nutzerprofil bearbeiten]
    ActionView -- "Klick: Löschen" --> Delete[Nutzerprofil löschen]
    
    %% DIE NEUEN FLUCHTWEGE BEIM BESTEHENDEN PROFIL
    Edit -- "Klick: Abbrechen" --> ActionView
    Delete -- "Klick: Abbrechen" --> ActionView
    
    %% SPEICHER-WEGE
    Edit --> UpdateDB[Änderungen in DB speichern]
    UpdateDB --> ActionView
    
    Delete --> DeleteDB[Profil aus DB entfernen]
    DeleteDB --> Dash
```

``` mermaid
graph TD
    %% === FARB-THEMES (LotR Palette: Salbei, Mithril-Blau & Mordor-Rot) ===
    classDef default fill:#f4f7f5,stroke:#84a98c,stroke-width:1px,color:#2f3e46;
    classDef menu fill:#2d4a3e,stroke:#a2e8dd,stroke-width:2px,color:#ffffff;
    classDef check fill:#fefae0,stroke:#d4af37,stroke-width:2px,color:#283618;
    classDef db fill:#1e3a8a,stroke:#7dd3fc,stroke-width:2px,color:#ffffff;
    classDef mordor fill:#991b1b,stroke:#fca5a5,stroke-width:2px,color:#ffffff;
    classDef grant fill:#065f46,stroke:#6ee7b7,stroke-width:2px,color:#ffffff;

    %% --- LEGENDE ---
    subgraph Legende ["Farb- & Symbollegende"]
        direction TB
        L1([System-Einstieg]):::menu
        L2[Modul-Zentrum / Hub]:::menu
        L3{System-Prüfung}:::check
        L4[Datenbank-Eingriff]:::db
        L5[Sicherheits-Sperre]:::mordor
        L6[Zugriff gestattet]:::grant
        L7[Reguläre User-Aktion]
    end

    %% --- EINSTIEG AUS DEM HAUPTMENÜ ---
    Menu([Hauptmenü]):::menu -- "Klick: Profile verwalten" --> Req[Admin-Login anfordern]

    %% --- EINSTIEG AUS DEM HAUPTMENÜ ---
    Menu([Hauptmenü]) -- "Klick: Profile verwalten" --> Req[Admin-Login anfordern]
    
    Req -- "Klick: Abbrechen" --> Menu
    
    Req --> Scan[Admin-Finger scannen]
    Scan --> CheckAuth{Ist User ein Admin?}
    
    %% --- DER NEGATIVE WEG (Mit Zwischenschritt) ---
    CheckAuth -- Nein --> Deny[Zugriff verweigern]
    Deny --> CheckLimit{Max. 3 Versuche erreicht?}
    
    CheckLimit -- Nein --> Req
    
    CheckLimit -- Ja --> Block[Zugang sperren]
    Block --> LogLock[Sperrung in DB protokollieren]
    LogLock --> Cooldown[3 Min. Cooldown abwarten]
    Cooldown --> Menu
    
    %% --- DER POSITIVE WEG (Mit Zwischenschritt) ---
    CheckAuth -- Ja --> Grant[Zugriff gestatten]
    Grant --> Dash[Dashboard: Profilübersicht]

    %% --- ADMIN-DASHBOARD ---
    Dash -- "Klick: Abmelden" --> Menu
    Dash -- "Klick: + Neues Profil" --> ActionNew[Eingabemaske öffnen]
    Dash -- "Klick: Bestehendes Profil" --> ActionView[Profildetails anzeigen]
    
    %% --- STRANG A: NEUES PROFIL ---
    ActionNew -- "Klick: Abbrechen" --> Dash
    
    ActionNew --> J[Eingabe: Name]
    J --> K[Auswahl: Geschlecht]
    K --> L[Auswahl: Spezies]
    L --> T[Berechnung: Bedarf]
    T --> Z[Fingerabdruck scannen]
    
    Z --> SaveNew[Neues Profil in DB hinzufügen]
    SaveNew --> Dash
    
    %% --- STRANG B: BESTEHENDES PROFIL ---
    ActionView -- "Klick: Zurück" --> Dash
    ActionView -- "Klick: Bearbeiten" --> Edit[Nutzerprofil bearbeiten]
    ActionView -- "Klick: Löschen" --> Delete[Nutzerprofil löschen]
    
    %% FLUCHTWEGE
    Edit -- "Klick: Abbrechen" --> ActionView
    Delete -- "Klick: Abbrechen" --> ActionView
    
    %% SPEICHER-WEGE
    Edit --> UpdateDB[Änderungen in DB speichern]
    UpdateDB --> ActionView
    
    Delete --> DeleteDB[Profil aus DB entfernen]
    DeleteDB --> Dash
```

``` mermaid
graph TD
    %% === FARB-THEMES (Rivendell Sage Palette) ===
    classDef default fill:#f3f6f3,stroke:#8fa89b,stroke-width:1px,color:#2c3e35;
    classDef menu fill:#2d4a3e,stroke:#a2e8dd,stroke-width:2px,color:#ffffff;
    classDef check fill:#fefcf7,stroke:#c5b397,stroke-width:2px,color:#3d332a;
    classDef mordor fill:#9e3c36,stroke:#f5b0a4,stroke-width:2px,color:#ffffff;
    classDef db fill:#374151,stroke:#9ca3af,stroke-width:2px,color:#ffffff;

    %% --- LEGENDE ---
    subgraph Legende ["Farb- & Symbollegende"]
        direction TB
        L1([System-Einstieg]):::menu
        L2[Dashboard]:::menu
        L3{System-Prüfung}:::check
        L4[Datenbank-Eingriff]:::db
        L5[Sicherheits-Sperre]:::mordor
        L6[Reguläre User-Aktion]
    end

    %% --- EINSTIEG AUS DEM HAUPTMENÜ ---
    Menu([Hauptmenü]):::menu -- "Klick: Profile verwalten" --> Req[Admin-Login anfordern]
    
    Req -- "Klick: Abbrechen" --> Menu
    
    Req --> Scan[Admin-Finger scannen]
    Scan --> CheckAuth{Ist User ein Admin?}:::check
    
    CheckAuth -- Nein --> CheckLimit{Max. 3 Versuche erreicht?}:::check
    CheckLimit -- Nein --> Req
    CheckLimit -- Ja --> LogLock[Sperrung protokollieren]:::db
    
    LogLock --> Lock[System für 3 Min. sperren]:::mordor
    Lock --> Menu
    
    %% KORREKTUR: Das Dashboard ist wieder ECKIG (weil interner Zustand)
    CheckAuth -- Ja --> Dash[Dashboard: Profilübersicht]:::menu

    %% --- ADMIN-DASHBOARD ---
    
    Dash -- "Klick: Abmelden" --> Menu
    Dash -- "Klick: + Neues Profil" --> ActionNew[Eingabemaske öffnen]
    Dash -- "Klick: Bestehendes Profil" --> ActionView[Profildetails anzeigen]
    
    %% STRANG A: NEUES PROFIL
    ActionNew -- "Klick: Abbrechen" --> Dash
    
    ActionNew --> J[Eingabe: Name]
    J --> K[Auswahl: Geschlecht]
    K --> L[Auswahl: Spezies]
    L --> T[Berechnung: Bedarf]
    T --> Z[Fingerabdruck scannen]
    
    Z --> SaveNew[Neues Profil in DB anlegen]:::db
    SaveNew --> Dash
    
    %% STRANG B: BESTEHENDES PROFIL
    ActionView -- "Klick: Zurück" --> Dash
    ActionView -- "Klick: Bearbeiten" --> Edit[Nutzerprofil bearbeiten]
    ActionView -- "Klick: Löschen" --> Delete[Nutzerprofil löschen]
    
    %% FLUCHTWEGE
    Edit -- "Klick: Abbrechen" --> ActionView
    Delete -- "Klick: Abbrechen" --> ActionView
    
    %% SPEICHER-WEGE
    Edit --> UpdateDB[Änderungen in DB speichern]:::db
    UpdateDB --> ActionView
    
    Delete --> DeleteDB[Profil aus DB entfernen]:::db
    DeleteDB --> Dash
```

``` mermaid
graph TD
    %% === FARB-THEMES (LotR Palette: Salbei, Mithril-Blau & Mordor-Rot) ===
    classDef default fill:#f4f7f5,stroke:#84a98c,stroke-width:1px,color:#2f3e46;
    classDef menu fill:#2d4a3e,stroke:#a2e8dd,stroke-width:2px,color:#ffffff;
    classDef check fill:#fefae0,stroke:#d4af37,stroke-width:2px,color:#283618;
    classDef db fill:#1e3a8a,stroke:#7dd3fc,stroke-width:2px,color:#ffffff;
    classDef mordor fill:#991b1b,stroke:#fca5a5,stroke-width:2px,color:#ffffff;
    classDef grant fill:#065f46,stroke:#6ee7b7,stroke-width:2px,color:#ffffff;

    %% --- EINSTIEG AUS DEM HAUPTMENÜ ---
    Menu([Hauptmenü]):::menu -- "Klick: Profile verwalten" --> Req[Admin-Login anfordern]
    
    Req -- "Klick: Abbrechen" --> Menu
    
    Req --> Scan[Admin-Finger scannen]
    Scan --> CheckAuth{Ist User ein Admin?}:::check
    
    %% --- DER NEGATIVE WEG ---
    CheckAuth -- Nein --> Deny[Zugriff verweigern]:::mordor
    Deny --> CheckLimit{Max. 3 Versuche erreicht?}:::check
    
    CheckLimit -- Nein --> Req
    
    CheckLimit -- Ja --> Block[Zugang sperren]:::mordor
    Block --> LogLock[Sperrung in DB protokollieren]:::db
    LogLock --> Cooldown[3 Min. Cooldown abwarten]:::mordor
    Cooldown --> Menu
    
    %% --- DER POSITIVE WEG ---
    CheckAuth -- Ja --> Grant[Zugriff gestatten]:::grant
    Grant --> Dash[Dashboard: Profilübersicht]:::menu

    %% --- ADMIN-DASHBOARD ---
    Dash -- "Klick: Abmelden" --> Menu
    Dash -- "Klick: + Neues Profil" --> ActionNew[Eingabemaske öffnen]
    Dash -- "Klick: Bestehendes Profil" --> ActionView[Profildetails anzeigen]
    
    %% --- STRANG A: NEUES PROFIL ---
    ActionNew -- "Klick: Abbrechen" --> Dash
    
    ActionNew --> J[Eingabe: Name]
    J --> K[Auswahl: Geschlecht]
    K --> L[Auswahl: Spezies]
    L --> T[Berechnung: Bedarf]
    T --> Z[Fingerabdruck scannen]
    
    Z --> SaveNew[Neues Profil in DB hinzufügen]:::db
    SaveNew --> Dash
    
    %% --- STRANG B: BESTEHENDES PROFIL ---
    ActionView -- "Klick: Zurück" --> Dash
    ActionView -- "Klick: Bearbeiten" --> Edit[Nutzerprofil bearbeiten]
    ActionView -- "Klick: Löschen" --> Delete[Nutzerprofil löschen]
    
    %% FLUCHTWEGE
    Edit -- "Klick: Abbrechen" --> ActionView
    Delete -- "Klick: Abbrechen" --> ActionView
    
    %% SPEICHER-WEGE
    Edit --> UpdateDB[Änderungen in DB speichern]:::db
    UpdateDB --> ActionView
    
    Delete --> DeleteDB[Profil aus DB entfernen]:::db
    DeleteDB --> Dash

    %% ========================================================
    %% --- LEGENDE (Nach unten verschoben + Rechts-Anker) ---
    
    subgraph Legende ["Farb- & Symbollegende"]
        direction TB
        L1([System-Einstieg]):::menu
        L2[Modul-Zentrum / Hub]:::menu
        L3{System-Prüfung}:::check
        L4[Datenbank-Eingriff]:::db
        L5[Sicherheits-Sperre]:::mordor
        L6[Zugriff gestattet]:::grant
        L7[Reguläre User-Aktion]

        L1 ~~~ L2 ~~~ L3 ~~~ L4 ~~~ L5 ~~~ L6 ~~~ L7
    end

    %% Der unsichtbare Abstandshalter zwingt die Legende nach rechts:
    Menu ~~~ L1

