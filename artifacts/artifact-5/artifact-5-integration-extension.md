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
Für unsere Aufgabe zum Thema „Integration & Extension“ haben wir uns für die System Capability Profilverwaltung entschieden. Nachdem wir im vorherigen Meilenstein bereits den biometrischen Login für den System-Admin Maxwise umgesetzt hatten, war dies für uns der logische nächste Schritt. Ein sicheres Rucksack-Schloss bringt schließlich wenig, wenn das System nicht weiß, wer überhaupt zur Reisegruppe gehört und wie viel Waybread (Lembas) die einzelnen Mitglieder benötigen. Unsere Capability deckt den gesamten Lebenszyklus eines Profils ab und verbindet externe API-Daten mit unserer eigenen Story. 
Das System verwaltet sowohl manuell angelegte Team-Profile als auch die offiziellen neun Gefährten der Ringgemeinschaft, die beim Start asynchron über The One API importiert werden. Je nach Spezies (z.B. Hobbit, Mensch, Elb, Zwerg oder Maia) berechnet die Anwendung den täglichen Lembas-Bedarf automatisch im Hintergrund. Ein Hobbit benötigt beispielsweise drei Lembas pro Tag, ein Elb dagegen nur 0,25. 

Im Betrieb besteht die Capability aus vier zentralen Funktionen:  
1. Einsehen: Das Dashboard zeigt alle Gefährten alphabetisch sortiert an, wobei Admin Maxwise immer an erster Stelle bleibt. Ein Klick auf die Profilkarte öffnet die Detailansicht inklusive des Status des hinterlegten Fingerabdrucks.
2. Anlegen: Für ein neues Profil müssen Name, Geschlecht, Spezies und ein biometrischer Fingerabdruck angegeben werden. Fehlen Informationen, verhindert das System das Speichern und zeigt per Toast-Nachricht genau an, welche Eingaben noch fehlen.
3. Bearbeiten: Bestehende Daten können jederzeit angepasst werden. Auch der Fingerabdruck lässt sich neu hinterlegen, beispielsweise dann, wenn im Kampf ein Finger verloren geht. Wird der Vorgang abgebrochen, erscheint eine Sicherheitsabfrage, ob die Änderungen wirklich verworfen werden sollen.
4. Löschen: Während Admin Maxwise systemseitig vor der Löschung geschützt ist, können alle anderen Profile nach einer Bestätigung dauerhaft entfernt werden.  
Erfolgreiche Aktionen werden durch zentrierte Toast-Nachrichten bestätigt. Gleichzeitig schaffen die standardisierten Profile die Grundlage für spätere Funktionen wie die Inventarverwaltung und die automatische Vorratsberechnung auf der Flucht.

<br>

---  

## 2. Static Interface Implementation
> **[Mermaid](src/flowchart-system.mermaid.md)**  

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
Die Profilverwaltung ist die logische Weiterentwicklung unserer ursprünglichen „GollumProofing“-Funktion. Während der erste Meilenstein (der Login) hauptsächlich das System absicherte und einen Administrator definierte, entwickelt sich die Anwendung durch diese Capability zu einem tatsächlichen Management-Tool. Das Zugriffsmanagement bildet den Kern unseres WayBread-Watchers. Ohne saubere Datensätze zu den einzelnen Gruppenmitgliedern könnten spätere Funktionen wie Inventarverwaltung und Bedarfsberechnung nicht sinnvoll arbeiten. Erst durch die Profilverwaltung erhält der Admin die Möglichkeit, die Reisegruppe aktiv zu verwalten und neue Mitglieder hinzuzufügen, die ebenfalls Zugriff auf die Rucksack-Infrastruktur erhalten sollen.
Auch technisch hat sich das System deutlich weiterentwickelt. Während unser erster Prototyp noch überwiegend auf statischem HTML basierte, handelt es sich inzwischen um eine dynamische, JavaScript-gesteuerte Single Page Application. Die Anbindung einer externen, asynchronen API und deren Verknüpfung mit lokalen Datenstrukturen hat die Komplexität und gleichzeitig die Robustheit unseres Codes erhöht.
Durch die Implementierung von Formularvalidierungen und einem dynamischen Feedback-System mit Toast-Nachrichten ist die Anwendung nicht mehr nur ein theoretisches Konzept, sondern bietet bereits eine intuitive und alltagstaugliche Benutzerführung.
