``` mermaid
flowchart TD
    %% Start mit Standby
    D([Standby aktivieren]) --> Z[Näherung erkennen]

    %% Start des Zugriffs
    Z --> E[Bildschirm aufleuchten]
    E --> F[Finger scannen]
    F --> G[Identität prüfen]
    G --> H{Identität bestätigen}

    %% Weg: Nein (Unbekannter User)
    H -- Nein --> I[Zugriff verweigern]
    I --> J[Zugang sperren]
    J --> K[Versuch protokollieren]
    K --> D

    %% Weg: Ja (Autorisierung erfolgreich)
    H -- Ja --> L[Autorisierung bestätigen]
    
    %% Pop-Up für vorherige Fehlversuche
    L --> M{Fehlversuche stattgefunden?}
    M -- Ja --> N[Warnung anzeigen]
    N --> O[Schloss öffnen]
    M -- Nein --> O
    
    %% Entscheidungspunkt: Hauptmenü
    O --> P{Aktion wählen}
    
    P -- Option 1 --> Q[Inventar verwalten]
    P -- Option 2 --> R[Nutzer verwalten]
    P -- Option 3 --> S[Protokoll ansehen]
    
    %% Loops für Option 1 und 3
    Q --> P
    S --> P
    
    %% Strang für Option 2: Nutzerverwaltung durch Admin
    R --> A[Admin authentifizieren]
    A --> B{Verwaltung wählen}
    
    B  --> C1[Nutzer registrieren]
    B  --> C2[Nutzer löschen]
    
    C1 --> C[Daten speichern]
    C2 --> C
    
    %% Loop zurück ins Hauptmenü nach der Verwaltung
    C --> P
    
    %% Option 4: Prozess beenden
    P -- Option 4 --> T[Schloss verriegeln]
    
    %% Abschluss und Logout
    T --> U[Abmeldung scannen]
    U --> V[Abmeldung protokollieren]
    V --> W[Daten sichern]
    W --> D

