``` mermaid
flowchart TD
    %% Initialisierung & Nutzerverwaltung (Loop von unten)
    A([Admin authentifizieren]) --> B{Verwaltung wählen}
    B -- Registrieren --> C1[Abdrücke registrieren]
    B -- Löschen --> C2[Abdrücke löschen]
    
    C1 --> D[Daten speichern]
    C2 --> D
    D --> E([Standby aktivieren])

    %% Start des regulären Zugriffs
    E --> F[Näherung erkennen]
    F --> G[Finger scannen]
    G --> H[Identität prüfen]
    H --> I{Identität bestätigen}

    %% Weg: Nein (Unbekannter User)
    I -- Nein --> J[Zugriff verweigern]
    J --> K[Zugang sperren]
    K --> L[Versuch protokollieren]
    L --> E

    %% Weg: Ja (Autorisierung erfolgreich)
    I -- Ja --> M[Autorisierung bestätigen]
    
    %% Pop-Up für vorherige Fehlversuche
    M --> N{Fehlgeschlagene Login-Versuche stattgefunden?}
    N -- Ja --> O[Warnung anzeigen]
    O --> P[Schloss öffnen]
    N -- Nein --> P
    
    %% Entscheidungspunkt: 4 Möglichkeiten
    P --> Q{Aktion wählen}
    
    Q -- Option 1 --> R[Inventar verwalten]
    Q -- Option 2 --> S[Nutzer verwalten]
    Q -- Option 3 --> T[Protokoll ansehen]
    
    %% Loop zurück zur Admin-Authentifizierung für die Nutzerverwaltung
    S --> A
    
    %% Loop zurück zum Menü für Option 1 und 3
    R --> Q
    T --> Q
    
    %% Option 4: Prozess beenden
    Q -- Option 4 --> U[Schloss verriegeln]
    
    %% Abschluss und Logout
    U --> V[Abmeldung scannen]
    V --> W[Abmeldung protokollieren]
    W --> X[Daten sichern]
    X --> E

    V --> W[Daten sichern]
    W --> D
