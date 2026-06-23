# The Fellowship Companion - Artifact V: Integration & Extension  

> "The world is not in your books and maps. It's out there." – Gandalf

---

## Table of Contents

**[1. System Capability](#1-system-capability)**  
**[2. Static Interface Implementation](#2-static-interface-implementation)**  
**[3. Design Rationale](#3-design-rationale)**  
**[4. Reflection On System Evolution](#4-reflection-on-system-evolution)**  

---

## 1. System Capability  

> **Profilverwaltung**

### Capability Description  
Für unsere Aufgabe zum Thema „Integration & Extension“ haben wir uns für die System Capability „Profilverwaltung“ entschieden. Nachdem wir im vorherigen Meilenstein den biometrischen Login für den System-Admin Maxwise implementiert hatten, war dies der logische nächste Schritt: Ein hochsicheres Rucksack-Schloss nützt wenig, wenn das System nicht weiß, welche Personen zur Reisegruppe gehören und wie viele Rationen Waybread (Lembas) das jeweilige Mitglied zum Überleben benötigt. Unsere Capability deckt den vollständigen Lebenszyklus eines Profils ab und verbindet externe API-Daten mit unserer Story.  
Das Herzstück ist die Zusammenführung zweier Datenwelten: Das System verwaltet sowohl manuell erfasste Team-Profile als auch die offiziellen neun Gefährten der Ringgemeinschaft, die beim Start asynchron über The One API importiert werden. Je nach Spezies (Hobbit, Mensch, Elb, Zwerg oder Maia) berechnet die Applikation den täglichen Lembas-Bedarf automatisch im Hintergrund (z. B. drei Lembas für Hobbits, aber nur 0,25 für Elben).  
Im Betrieb gliedert sich die Capability in vier Kernprozesse:  
1. Einsehen: Das Dashboard zeigt alle Gefährten alphabetisch sortiert an, wobei Admin Maxwise stets oben fixiert bleibt. Ein Klick auf die Profilkarte öffnet die Detailansicht inklusive des visuellen Status des erfassten Fingerabdrucks.
2. Anlegen: Das Formular fordert Name, Geschlecht, Spezies und zwingend einen biometrischen Fingerabdruck. Bei unvollständigen Eingaben blockiert das System die Speicherung und listet über einen Toast-Alarm exakt auf, welche Daten fehlen.
3. Bearbeiten: Bestehende Attribute lassen sich modifizieren. Als wichtiges Lore-Detail kann auch der Fingerabdruck neu hinterlegt werden, falls im Kampf ein Finger verloren geht. Ein Abbruch über den Zurück-Button öffnet eine Sicherheitsabfrage (Änderung verwerfen?).
4. Löschen: Während Admin Maxwise systemseitig vor der Löschung geschützt ist, können reguläre Profile nach einer Bestätigung (Bist du sicher?) dauerhaft entfernt werden.  
Erfolgreiche Aktionen werden durch zentrierte Toast-Nachrichten belegt. Die so normierten Profile bilden das Fundament für zukünftige Capabilities wie die Rucksack-Inventarverwaltung und die Vorratsberechnung auf der Flucht.

<br>

---  

## 2. Static Interface Implementation
> **[Mermaid](src/flowchart-system.mermaid.md)**  

Unser Prozess beginnt bei der Entscheidung "Aktion wählen". An diesem Punkt gibt es im Gesamtsystem eigentlich vier Möglichkeiten, wie man auch in unserem vorherigen Mermaid erkennen kann: Inventar verwalten, Protokoll ansehen, Schloss verriegeln und eben Profile verwalten. Um unser aktuelles Diagramm übersichtlich zu halten, haben wir die anderen drei Optionen hier ausgeblendet und konzentrieren uns ausschließlich auf den Pfad der Profilverwaltung.
Sobald man sich für diesen Weg entscheidet, fordert das System zur Sicherheit zunächst einen Fingerabdruck-Scan des Admins, um dessen Identität zu prüfen. Schlägt dies fehl, wird der Zugriff verweigert und man landet wieder bei der anfänglichen Aktionsauswahl. Ist die Prüfung jedoch erfolgreich, wird der Zugriff gestattet und man wird direkt auf das Dashboard, also die Profilübersicht, weitergeleitet.  
Auf dieser zentralen Übersicht hat man nun zwei wesentliche Handlungsstränge zur Auswahl. Der erste Weg ist das Hinzufügen eines neuen Profils. Wählt man diesen, durchläuft man eine logische Eingabemaske: Zuerst gibt man den Namen ein, wählt das Geschlecht und die Spezies aus, woraufhin das System automatisch den individuellen Lembas-Bedarf berechnet. Nach dem abschließenden Scannen des Fingerabdrucks wird das neue Profil gespeichert und man kehrt automatisch zur Übersicht zurück.  
Der zweite Weg auf dem Dashboard führt über den Klick auf ein bestehendes Profil direkt in die zugehörigen Profildetails. Aus dieser Detailansicht heraus ergeben sich dann die restlichen Optionen: Man kann über einen Zurück-Button einfach wieder auf die Profilübersicht wechseln, oder man entscheidet sich dafür, das Profil zu bearbeiten beziehungsweise zu löschen. Wenn man die Daten ändert und speichert, bleibt man zur Kontrolle in der aktualisierten Detailansicht. Wählt man hingegen den Pfad zum Löschen aus, wird die Entfernung des Profils vom System registriert und man landet anschließend direkt wieder auf der allgemeinen Profilübersicht.  

Unser Prozess nimmt seinen Ursprung im Zustand des Hauptmenüs. Von den vier prinzipiellen Handlungsmöglichkeiten des Gesamtsystems fokussiert sich dieses Diagramm isoliert auf den Pfad der Profilverwaltung. Wählt der User diese Option, fordert das System die Authentifizierung per Fingerabdruck des Admins, wobei dem User hier bereits ein optionaler Abbruch zurück ins Hauptmenü gewährt wird. Schlägt der Scan fehl, kann man den Scan nochmal probieren. Nach dem dritten Fehlversuch aber tritt eine temporäre Sperre (3 Minuten) ein, die auch protokolliert wird, und das System wirft den User auf das Hauptmenü zurück.  
Bei erfolgreicher Autorisierung öffnet sich das Dashboard (Profile verwalten). Hier teilt sich der User Flow in zwei Stränge:  
Der erste Strang ist die Neuanlage. Nach Eingabe der Stammdaten und der automatischen Lembas-Bedarfsberechnung schließt der biometrische Scan den Vorgang ab. Das Profil wird in der DB hinterlegt und das System geht zurück auf das Dashboard. Ein Abbruch leitet hier ebenfalls direkt auf das Dashboard zurück.  
Der zweite Strang führt über den Klick auf eine bestehende Profilkarte in deren Detailansicht. Von hier aus kann der User entweder zum Dashboard zurückkehren, die bestehenden Infos ändern oder das Profil löschen. Brechen User einen Änderungs- oder Löschvorgang ab, verbleiben sie logisch in der Detailansicht des jeweiligen Gefährten. Bestätigen sie hingegen eine Änderung, verbleibt das Interface zur direkten Sichtprüfung in den aktualisierten Profildetails. Bestätigen sie die Löschung, wird der Datensatz entfernt und das Interface leitet zwingend auf das Dashboard zurück.

> **[Wireframes](src/wireframes-system.jpg)**  
> **[HTML](src/interface.html)**  
> **[Stylesheet](src/style.css)**  
> **[JavaScript](src/logic.js)**

   
<br>

---

## 3. Design Rationale  

### How the integrated system still reflects the original intent and value?  
Der Hauptnutzen unseres Systems besteht darin, einen gesicherten Rucksack mit automatischer Bedarfsrechnung und Inventarverwaltung für die Gefährten zur Verfügung zu stellen. Die neue System Capability „Profilverwaltung“ spiegelt diese Kernabsicht wider, indem sie das fundamentale Access-Management etabliert. Erst durch das Hinzufügen verifizierter Profile erhalten legitime Gruppenmitglieder Zugriff auf den Rucksack und den Proviant, während ungewollte Mitbenutzer oder Diebe (Gollum) konsequent ausgesperrt bleiben. Die Entscheidungsgewalt über neue Zugänge obliegt dabei strikt dem Systemadmin (Maxwise). Darüber hinaus ist die Erhebung spezifischer Profildaten – insbesondere die Zuordnung zu einer Spezies und die daraus resultierende automatische Berechnung des Lembas-Bedarfs – keine bloße Spielerei, sondern die zwingende technische Voraussetzung, um die zukünftigen Kern-Features „Inventarverwaltung“ und „automatische Bedarfsberechnung“ überhaupt umsetzen zu können.  

### How individual slices connect meaningfully?  
Das System ist als Single Page Application (SPA) aufgebaut, wodurch die einzelnen Ansichten (Slices) nahtlos und ohne störende Seitenladezeiten ineinandergreifen. Im Zentrum steht das Dashboard (Listenansicht), welches alle angelegten Profile übersichtlich bündelt. Von hier aus verzweigen sich die Handlungsstränge logisch:
Das Anlegen eines neuen Profils leitet den User in ein Formular, nach dessen erfolgreichem Abschluss (inklusive biometrischem Scan) das System automatisch zur aktualisierten Listenansicht zurückkehrt. Klickt man auf ein bestehendes Profil, öffnet sich die Detailansicht. Der Bearbeitungsmodus ist hierbei eine besonders bedeutungsvolle Verknüpfung von Interface und Story-Logik: Er erlaubt es, bestehende Datenfelder zu aktualisieren und insbesondere den Fingerabdruck neu zu erfassen – ein essenzielles Feature, falls im Kampf ein Finger verloren gehen sollte. Begleitet werden all diese Übergänge durch ein klares, User-zentriertes Feedback-System. Statt generischer System-Abstürze oder klobiger Browser-Alerts nutzen wir zentrierte Toast-Messages, die den Erfolg einer Aktion (z. B. nach dem Löschen) bestätigen oder bei Fehlern präzise auflisten, welche Formularfelder noch nachgetragen werden müssen.  

### Why your chosen extension makes sense?  
Die Wahl von „The One API“ (https://the-one-api.dev/) als externe Datenquelle verleiht dem System eine enorme Skalierbarkeit und verhindert redundanten Code. Anstatt die Daten aller potenziellen Gefährten hardcodiert in das HTML-Dokument zu schreiben, importiert das Skript die Charaktere asynchron und fusioniert sie im Arbeitsspeicher mit unseren lokal angelegten Profilen. Die umfangreiche Datenbank der API minimiert den manuellen Mehraufwand erheblich: Das System liest die englischen Rohdaten aus, übersetzt das Geschlecht ins Deutsche, mappt die Rassen (z.B. „Elf“ zu „Elb“) und nutzt diese Information sofort, um den täglichen Lembas-Bedarf für den jeweiligen Gefährten vollautomatisch zu berechnen. Sollten im Laufe der Reise weitere bekannte Charaktere zur Gruppe stoßen, lassen sich diese durch eine einfache Erweiterung des Arrays nahtlos in das bestehende System integrieren.  

### What you intentionally did not build?  
Um den Fokus auf ein stabiles Minimum Viable Product (MVP) zu wahren, haben wir folgende Aspekte bewusst ausgeklammert:  
+ Multi-Admin-Rechte: Es gibt aktuell keine Möglichkeit, weitere Admins zu ernennen. Priorität hat zunächst die schnelle Zugriffsverteilung an die regulären Gefährten. Ein System zur Vergabe von Admin-Rechten an vertrauenswürdige Anwärter ist für spätere Iterationen angedacht.
+ Erneute Authentifizierung vor dem Dashboard: Den vorgeschalteten Fingerabdruck-Scan, um überhaupt in die Profilverwaltung zu gelangen, haben wir im Flow zwar dargestellt, aber die tatsächliche Ausprogrammierung in HTML/JS bewusst übersprungen. Da wir die Funktionsweise des biometrischen Logins bereits im vorherigen Feature (Artifact 4) ausführlich behandelt haben, wurde dieser Schritt zugunsten eines effizienteren Testings der Verwaltungs-Logik übersprungen.
+ Übergreifendes Startmenü: Eine zentrale Landing-Page zur Auswahl der verschiedenen Capabilities (Inventar, Protokoll, Nutzerverwaltung) wurde nach dem YAGNI-Prinzip („You aren't gonna need it“) noch nicht implementiert. Ein solches Menü wird erst strukturell notwendig, wenn mindestens zwei funktionierende Haupt-Features zur Auswahl stehen.  
+ Allgemeine Profilbilder: Wir haben uns aktiv gegen die ursprünglich angedachten Profilbilder entschieden und entsprechende Platzhalter aus dem Code entfernt. Da der Rucksack weder über eine Kamera noch über eine visuelle Bilddatenbank verfügt, bietet dieses Feature logisch keinen Mehrwert für die Anwendung. Die Profile bleiben stattdessen rein datenbasiert. Den durch diesen Verzicht frei gewordenen Platz haben wir gezielt genutzt, um das Status-Icon des Fingerabdrucks als skalierbare SVG-Vektorgrafik signifikant zu vergrößern. Dies folgt dem Fitts’schen Gesetz („Fitts’s Law“): Indem wir den interaktiven Zielbereich für den biometrischen Scan maximiert haben, reduzieren wir die kognitive und motorische Last für den User. Ein großflächiges, klar abgrenzbares Element lässt sich deutlich schneller und präziser erfassen.    

---

## 4. Reflection on system evolution  
Profilverwaltung die konsequente evolutionäre Weiterentwicklung unserer anfänglichen „GollumProofing“-Funktion dar. Während der erste Meilenstein (der Login) lediglich das System verriegelte und einen initialen Administrator definierte, transformiert diese neue Capability die Software von einem simplen Schloss zu einem dynamischen Management-Tool. Access-Management ist der absolute Kernbestandteil des WayBread-Watchers: Ohne saubere Datensätze zu den einzelnen Gruppenmitgliedern würden die darauf aufbauenden Module (wie die Inventarverwaltung und die Bedarfsrechnung) ins Leere laufen. Erst durch diese Erweiterung erhält der Admin die Befugnis, die Reisegruppe aktiv zu verwalten und neue Mitglieder hinzuzufügen, die ebenfalls Zugriff auf die Rucksack-Infrastruktur erhalten sollen – eine essenzielle Erweiterung der Nutzbarkeit für die gesamte Gruppe.  
Auch auf technischer Ebene hat das System einen signifikanten Sprung vollzogen: Während unser Prototyp in der letzten Abgabe noch auf einer eher statischen HTML-Struktur basierte, ist die Anwendung nun zu einer dynamischen, JavaScript-gesteuerten Single Page Application (SPA) herangereift. Die Herausforderung, eine externe, asynchrone API-Schnittstelle fehlerfrei mit lokalen Daten zu verknüpfen, hat die Robustheit unseres Codes deutlich erhöht. Durch die Implementierung präziser Formular-Validierungen und eines dynamischen Feedback-Systems (Toasts) ist die Nutzbarkeit für die Gruppe nicht mehr nur ein theoretisches Konzept, sondern auf einem professionellen Level angekommen, das eine intuitive Bedienung in jeder Situation ermöglicht.
