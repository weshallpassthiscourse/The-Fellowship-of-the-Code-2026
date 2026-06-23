``` mermaid
graph TD
    %% --- VORGELAGERTER STRANG: Admin-Login ---
    Start([System gestartet]) --> Req[Admin-Login anfordern]
    Req --> Scan[Admin-Finger scannen]
    Scan --> CheckAuth{Ist User ein Admin?}
    
    %% 1. DIE IPHONE-SPERRE (Brute-Force Schutz)
    CheckAuth -- Nein --> Fail[Fehlversuch registrieren]
    Fail --> CheckLimit{Max. 3 Versuche erreicht?}
    
    CheckLimit -- Nein --> Req
    CheckLimit -- Ja --> Lock[System für 5 Min. sperren]
    Lock --> Start
    
    CheckAuth -- Ja --> MainMenu[Dashboard: Profilübersicht]

    %% --- HAUPTMENÜ ---
    
    %% 2. DER NOTAUSGANG (Logout)
    MainMenu -- "Klick: Abmelden" --> Start

    MainMenu -- "Klick: + Neues Profil" --> ActionNew[Eingabemaske öffnen]
    MainMenu -- "Klick: Bestehendes Profil" --> ActionView[Profildetails anzeigen]
    
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
    ActionView -- "Klick: Zurück" --> MainMenu
    
    %% DRY-PRINZIP: Zusammenführung der Speicher-Wege
    Edit --> SaveDB[Datenbank aktualisieren]
    Delete --> SaveDB
    
    SaveDB --> MainMenu
