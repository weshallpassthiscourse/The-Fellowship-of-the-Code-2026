``` mermaid

flowchart TD

    %% Initialisierung durch Admin Macwise
    A([Admin authentifizieren]) --> NV1[Nutzerprofil anlegen / auswählen]

    %% Detaillierte Nutzerverwaltung (Wird am Anfang und aus dem Menü genutzt)
    subgraph Nutzerverwaltung [Prozess: Nutzerverwaltung]
        NV1 --> NV2[Fingerabdrücke scannen / entfernen]
        NV2 --> NV3[Zugriffsrechte & Rollen definieren]
        NV3 --> C[Nutzerdaten speichern]
    end

    %% Routing nach dem Speichern (je nachdem woher man kam)
    C -- "Abschluss Ersteinrichtung" --> D([Standby aktivieren])
    C -- "Änderung aus Hauptmenü" --> P

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
    
    %% Pop-Up für vorherige Fehlversuche
    L --> M{Fehlgeschlagene Login-Versuche?}
    M -- Ja --> N[Warnung anzeigen]
    N --> O[Schloss öffnen]
    M -- Nein --> O
    
    %% Entscheidungspunkt: 4 Möglichkeiten
    O --> P{Aktion wählen}
    
    P -- Option 1 --> Q[Inventar verwalten]
    P -- Option 2 --> R([Nutzerverwaltung aufrufen])
    P -- Option 3 --> S[Protokoll ansehen]
    
    %% Loops zurück zum Menü für Option 1 und 3
    Q --> P
    S --> P
    
    %% Verbindung von unten nach oben zur detaillierten Nutzerverwaltung (Option 2)
    R --> |"Verzweigung nach oben"| NV1
    
    %% Option 4: Prozess beenden
    P -- Option 4 --> T[Schloss verriegeln]
    
    %% Abschluss und Logout
    T --> U[Abmeldung scannen]
    U --> V[Abmeldung protokollieren]
    V --> W[Daten sichern]
    W --> D
