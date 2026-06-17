``` mermaid
graph TD
    Start([Aktionsmenü]) --> A[Nutzer verwalten]
    
    %% Authentifizierungsprozess
    A --> B[Admin Finger scannen]
    B --> C[Identität prüfen]
    C --> D{Identität bestätigen}
    
    %% Strang: Zugriff verweigert
    D -- Nein --> E[Zugriff verweigern]
    E --> A
    
    %% Strang: Zugriff gestattet
    D -- Ja --> F[Zugriff gestatten]
    F --> G[Nutzerverwaltung Dashboard]
    
    %% Ansicht im Dashboard
    G --> H[Bestehende Nutzerliste anzeigen]
    G --> I[Neuen Nutzer hinzufügen]
    
    %% Prozess: Bestehende Nutzer ansehen & bearbeiten
    H --> N[Nutzer anklicken]
    N --> O[Nutzerdetails ansehen]
    
    %% ENTSCHEIDUNG: Was soll mit dem Profil passieren?
    O --> U{Aktion wählen}
    
    %% Die 3 Auswahlmöglichkeiten
    U -- Zurück --> G
    
    U -- Ändern --> P[Nutzerprofil bearbeiten]
    P --> R[Änderungen speichern]
    R --> G
    
    U -- Löschen --> Q[Löschen bestätigen] --> R

    
    %% Prozess: Nutzer hinzufügen
    I --> J[Eingabe: Name]
    J --> K[Auswahl: Geschlecht]
    K --> L[Auswahl: Spezies/Rasse]
    L --> T[Eingabe/Berechnung: Bedarf]
    T --> M([Profil speichern])
    
    %% Zurück zur Übersicht nach dem Speichern (Neuer Nutzer)
    M --> G
