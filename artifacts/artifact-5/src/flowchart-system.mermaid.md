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
    
    %% NEUE ENTSCHEIDUNG: Was auf dem Dashboard tun?
    G --> V{Profilaktion wählen}
    
    %% Dashboard-Optionen
    V -- Profil ansehen --> N[Profil anklicken]
    V -- Profil hinzufügen --> I[Neues Profil hinzufügen]
    
    %% Prozess: Bestehende Profile verwalten
    N --> O[Profildetails ansehen]
    O --> U{Bearbeitungsart auswählen}
    
    %% Bearbeiten/Löschen-Entscheidungen
    U -- Zurück --> G
    U -- Ändern --> P[Nutzerprofil bearbeiten]
    P --> R[Änderungen speichern]
    R --> U
    U -- Löschen --> Q[Nutzerprofil löschen]
    Q --> H[Löschung speichern]
    H --> G
    
    %% Prozess: Neuen Nutzer hinzufügen
    I --> J[Eingabe: Name]
    J --> K[Auswahl: Geschlecht]
    K --> L[Auswahl: Spezies]
    L --> T[Berechnung: Bedarf]
    T --> Z[Fingerabdruck anlegen]
    Z --> M[Profil speichern]
    M --> G

