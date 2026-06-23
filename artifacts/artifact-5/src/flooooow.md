``` mermaid
graph TD
    Start([Aktion wählen]) --> A[Profile verwalten]
    
    %% Authentifizierungsprozess
    A --> B[Admin Finger scannen]
    B --> C[Identität prüfen]
    C --> D{Identität bestätigen}
    
    %% Strang: Zugriff verweigert
    D -- Nein --> E[Zugriff verweigern]
    E --> Start
    
    %% Strang: Zugriff gestattet
    D -- Ja --> F[Zugriff gestatten]
    F --> G[Profileübersicht]
    
    %% Dashboard-Optionen (Korrektur: Gehen direkt von G ab, ohne Raute)
    G -- Profil ansehen --> N[Profil anklicken]
    G -- Profil hinzufügen --> I[Neues Profil hinzufügen]
    
    %% Prozess: Bestehende Profile verwalten
    N --> O[Profildetails ansehen]
    
    %% Bearbeiten/Löschen (Korrektur: Gehen direkt von O ab, ohne Raute)
    O -- Zurück --> G
    O -- Ändern --> P[Nutzerprofil bearbeiten]
    O -- Löschen --> Q[Nutzerprofil löschen]
    
    %% Prozess: Neuen Nutzer hinzufügen
    I --> J[Eingabe: Name]
    J --> K[Auswahl: Geschlecht]
    K --> L[Auswahl: Spezies]
    L --> T[Berechnung: Bedarf]
    T --> Z[Fingerabdruck anlegen]
    
    %% DRY-PRINZIP: Alle drei Wege nutzen denselben Speicher-Knoten M
    Z --> M[Profil speichern]
    P --> M
    Q --> M
    
    %% Nach dem Speichern springen alle zurück auf die Übersicht
    M --> G
