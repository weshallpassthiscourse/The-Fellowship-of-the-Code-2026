``` mermaid
graph TD
    Start([Aktion wählen]) --> A[Nutzer verwalten]
    
    %% Authentifizierungsprozess
    A --> B[Admin Finger scannen]
    B --> C[Identität prüfen]
    C --> D{Identität bestätigen}
    
    %% Strang: Zugriff verweigert
    D -- Nein --> E[Zugriff verweigern]
    E --> Start
    
    %% Strang: Zugriff gestattet
    D -- Ja --> F[Zugriff gestatten]
    F --> G[Übersicht]
    
    %% NEUE ENTSCHEIDUNG: Was auf dem Dashboard tun?
    G --> V{Profilaktion wählen}
    
    %% Dashboard-Optionen
    V -- Nutzer ansehen --> N[Nutzer anklicken]
    V -- Nutzer hinzufügen --> I[Neuen Nutzer hinzufügen]
    
    %% Prozess: Bestehende Nutzer verwalten
    N --> O[Nutzerdetails ansehen]
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
    T --> M[Profil speichern]
    M --> G

