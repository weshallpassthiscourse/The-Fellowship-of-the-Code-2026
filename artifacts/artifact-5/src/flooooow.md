``` mermaid
graph TD
    Start([Aktion wählen]) --> A[Profile verwalten]
    
    %% Authentifizierungsprozess
    A --> B[Admin Finger scannen]
    B --> C[Identität prüfen]
    C --> D{Identität bestätigen}
    
    %% DEINE IPHONE-SPERRE (Zähler + Lockout)
    D -- Nein --> Fehlversuch[Fehlversuch registrieren]
    Fehlversuch --> Limit{Max. 3 Versuche<br>erreicht?}
    Limit -- Nein --> B
    Limit -- Ja --> Lock[System für 5 Min. sperren]
    Lock --> Start
    
    %% Strang: Zugriff gestattet
    D -- Ja --> F[Zugriff gestatten]
    F --> G[Profileübersicht]
    
    %% Dashboard-Optionen (Inklusive deines fehlenden "Notausgangs")
    G -- Profil ansehen --> N[Profil anklicken]
    G -- Profil hinzufügen --> I[Neues Profil hinzufügen]
    G -- "Logout / Zurück" --> Start
    
    %% Prozess: Bestehende Profile verwalten
    N --> O[Profildetails ansehen]
    
    O -- Zurück --> G
    O -- Ändern --> P[Nutzerprofil bearbeiten]
    O -- Löschen --> Q[Nutzerprofil löschen]
    
    %% Prozess: Neuen Nutzer hinzufügen
    I --> J[Eingabe: Name]
    J --> K[Auswahl: Geschlecht]
    K --> L[Auswahl: Spezies]
    L --> T[Berechnung: Bedarf]
    T --> Z[Fingerabdruck anlegen]
    
    %% DRY-PRINZIP: Speichern
    Z --> M[Profil speichern]
    P --> M
    Q --> M
    
    M --> G

