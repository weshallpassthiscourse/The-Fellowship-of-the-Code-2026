``` mermaid

flowchart TD
    %% Initialisierung durch Admin Macwise
    A([Admin authentifizieren]) --> B[Abdrücke registrieren]
    B --> C[Daten speichern]
    C --> D([Standby aktivieren])

    %% Start des Zugriffs
    D --> Z[Näherung erkannt]
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
    
    %% Pop-Up für vorherige Fehlversuche (ausführlicher beschrieben)
    L --> M{Haben fehlgeschlagene Login-Versuche stattgefunden?}
    M -- Ja --> N[Warnung anzeigen]
    N --> O[Schloss öffnen]
    M -- Nein --> O
    
    %% Entscheidungspunkt: 4 Möglichkeiten
    O --> P{Aktion wählen}
    
    P -- Option 1 --> Q[Inventar verwalten]
    P -- Option 2 --> R[Nutzer verwalten]
    P -- Option 3 --> S[Protokoll ansehen]
    
    %% Loop zurück zum Menü für die ersten drei Optionen
    Q --> P
    R --> P
    S --> P
    
    %% Option 4: Prozess beenden
    P -- Option 4 --> T[Schloss verriegeln]
    
    %% Abschluss und Logout
    T --> U[Abmeldung scannen]
    U --> V[Abmeldung protokollieren]
    V --> W[Daten sichern]
    W --> D


