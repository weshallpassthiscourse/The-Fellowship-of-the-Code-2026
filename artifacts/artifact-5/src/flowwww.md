``` mermaid
graph TD
    %% --- EINSTIEG AUS DEM HAUPTMENÜ ---
    Menu([Hauptmenü: Aktion wählen]) --> Req[Admin-Login anfordern]
    
    Req --> Scan[Admin-Finger scannen]
    Scan --> CheckAuth{Ist User ein Admin?}
    
    %% 1. ÄNDERUNG: Direkt zur 3er-Prüfung (ohne Zähler-Kachel)
    CheckAuth -- Nein --> CheckLimit{Max. 3 Versuche erreicht?}
    
    CheckLimit -- Nein --> Req
    %% 2. ÄNDERUNG: Bei 3 Fehlversuchen Abbruch & zurück ins Hauptmenü
    CheckLimit -- Ja --> Menu
    
    CheckAuth -- Ja --> Dash[Dashboard: Profilübersicht]

    %% --- ADMIN-DASHBOARD ---
    
    %% 3. ÄNDERUNG: Abmelden führt exakt ans selbe Ziel wie der Abbruch oben
    Dash -- "Klick: Abmelden" --> Menu

    Dash -- "Klick: + Neues Profil" --> ActionNew[Eingabemaske öffnen]
    Dash -- "Klick: Bestehendes Profil" --> ActionView[Profildetails anzeigen]
    
    %% STRANG A: NEUES PROFIL
    ActionNew --> J[Eingabe: Name]
    J --> K[Auswahl: Geschlecht]
    K --> L[Auswahl: Spezies]
    L --> T[Berechnung: Bedarf]
    T --> Z[Fingerabdruck scannen]
    Z --> SaveDB
    
    %% STRANG B: BESTEHENDES PROFIL 
    ActionView -- "Klick: Bearbeiten" --> Edit[Nutzerprofil bearbeiten]
    ActionView -- "Klick: Löschen" --> Delete[Nutzerprofil löschen]
    ActionView -- "Klick: Zurück" --> Dash
    
    %% DRY-PRINZIP
    Edit --> SaveDB[Datenbank aktualisieren]
    Delete --> SaveDB
    
    SaveDB --> Dash
