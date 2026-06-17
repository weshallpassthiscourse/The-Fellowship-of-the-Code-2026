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
    F --> G[Nutzerverwaltung Dashboard]
    
    %% NEUE ENTSCHEIDUNG: Was auf dem Dashboard tun?
    G --> V{Aktion wählen}
    
    %% Dashboard-Optionen
    V -- Nutzer ansehen --> N[Nutzer anklicken]
    V -- Nutzer hinzufügen --> I[Neuen Nutzer hinzufügen]
    
    %% Prozess: Bestehende Nutzer verwalten
    N --> O[Nutzerdetails ansehen]
    O --> U{Profilaktion wählen}
    
    %% Bearbeiten/Löschen-Entscheidungen
    U -- Zurück --> G
    U -- Ändern --> P[Nutzerprofil bearbeiten]
    P --> R[Änderungen speichern]
    R --> G
    U -- Löschen --> Q[Nutzerprofil löschen]
    Q --> R
    
    %% Prozess: Neuen Nutzer hinzufügen
    I --> J[Eingabe: Name]
    J --> K[Auswahl: Geschlecht]
    K --> L[Auswahl: Spezies/Rasse]
    L --> T[Eingabe/Berechnung: Bedarf]
    T --> M([Profil speichern])
    M --> G

