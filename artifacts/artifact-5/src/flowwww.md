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
    
    Z --> SaveNew[Neues Profil in DB anlegen]
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

