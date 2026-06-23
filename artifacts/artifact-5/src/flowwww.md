``` mermaid
graph TD
    %% --- EINSTIEG AUS DEM HAUPTMENÜ ---
    Menu([Hauptmenü: Aktion wählen]) --> Req[Admin-Login anfordern]
    
    Req --> Scan[Admin-Finger scannen]
    Scan --> CheckAuth{Ist User ein Admin?}
    
    CheckAuth -- Nein --> CheckLimit{Max. 3 Versuche erreicht?}
    CheckLimit -- Nein --> Req
    CheckLimit -- Ja --> Menu
    
    CheckAuth -- Ja --> Dash[Dashboard: Profilübersicht]

    %% --- ADMIN-DASHBOARD ---
    
    Dash -- "Klick: Abmelden" --> Menu
    Dash -- "Klick: + Neues Profil" --> ActionNew[Eingabemaske öffnen]
    Dash -- "Klick: Bestehendes Profil" --> ActionView[Profildetails anzeigen]
    
    %% STRANG A: NEUES PROFIL
    ActionNew --> J[Eingabe: Name]
    J --> K[Auswahl: Geschlecht]
    K --> L[Auswahl: Spezies]
    L --> T[Berechnung: Bedarf]
    T --> Z[Fingerabdruck scannen]
    
    %% DRY-Knoten 1: Erstellen und Bearbeiten nutzen denselben Speicher-Befehl
    Z --> SaveProfile[Profil-Datenbank aktualisieren]
    
    %% STRANG B: BESTEHENDES PROFIL (Die Detailansicht)
    ActionView -- "Klick: Zurück" --> Dash
    ActionView -- "Klick: Bearbeiten" --> Edit[Nutzerprofil bearbeiten]
    ActionView -- "Klick: Löschen" --> Delete[Nutzerprofil löschen]
    
    Edit --> SaveProfile
    
    %% NACH DEM SPEICHERN: Zurück in die Detailansicht des Profils
    SaveProfile --> ActionView
    
    %% DRY-Knoten 2: Der Lösch-Befehl (muss das Profil zerstören)
    Delete --> DeleteDB[Profil aus DB entfernen]
    
    %% NACH DEM LÖSCHEN: Gezwungenermaßen zurück aufs Dashboard
    DeleteDB --> Dash

