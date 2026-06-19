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
<br>
+ Für unsere Aufgabe zu "Integration & Ext." haben wir uns die System Capability "Profilverwaltung" ausgesucht. Unsere erste Funktionalität war der Login, daher war der nächste logische Schritt, die Profilverwaltung zu implementieren. So können wir alle auf den Rucksack zugreifen, nachdem uns Maxwise, der Admin des WayBread Watchers, hinzugefügt hat.

Unsere Capability kann eine Profilübersicht darstellen, User hinzufügen, bearbeiten und löschen. <br>

Um einen User hinzuzufügen, muss im allerersten Schritt der Admin seinen Fingerprint registrieren. Danach kann der Admin nach dem biometrischen Login ein neues Profil anlegen. Dazu sammeln wir den Namen, das Geschlecht, die Spezies und den Fingerardruck. Darauf wird automatisch der durchschnittliche Bedarf der Person berechnet (out of scope). Diese Daten erfassen wir, damit sie uns in Zukunft für die Übersicht und bei weiteren Capabilites (Inventarverwaltung, Bedarfsberechnung) helfen können. 

Hinzugefügte Profile werden in einer Listenansicht auf der Übersichtsseite angezeigt. Dort ist es möglich, mit einem Klick auf das Augen-Icon in die Detailansicht des Profils zu wechseln. Dort gibt es die Möglichkeiten, das Profil zu bearbeiten oder zu löschen.

Im Bearbeitungsmodus können wir alle zuvor erfassten Daten ändern. Hier ist wichtig, dass der Fingerabdruck auch neu erfasst werden kann, falls in einem Kampf der zuvor ausgewählte Finger verloren geht. Nach dem Speichern der Änderungen wird der User ins Dashboard (Profilverwaltung) weitergeleitet und erhält per Toast-Message die Information, dass die Änderungen erfolgreich gespeichert wurden. 
Wenn man in der Detailansicht das Profil löschen möchte, wird das Profil aus der Profilübersicht entfernt und es erscheint ebenfalls in der Profilübersicht der Toast, dass das Löschen erfolgreich durchgeführt werden konnte.

<br>

---  

## 2. Static Interface Implementation
> **[Mermaid](src/flowchart-system.mermaid.md)**
In worte nochmal erklären

> **[Wireframes](src/wireframes-system.jpg)**  
> **[HTML](src/interface.html)**  
> **[Stylesheet](src/style.css)**  
> **[JavaScript](src/logic.js)**

Meaningful Extension - Add exactly one extension to your system  
   a. An API call (e.g., weather influencing the quest) or  
   b. A library (e.g., Bootstrap, DaisyUI, Moment.js, ...)  
   
<br>

---

## 3. Design Rationale  

### How the integrated system still reflects the original intent and value?  
<br>  
Der Hauptnutzen unseres Rucksacks ist es, einen gesicherten Rucksack mit automatischer Bedarfsrechnung und Verwaltung für uns Gefährten zur Verfügung zu stellen. Die neue System Capability erlaubt es uns, die Reise einfacher zu gestalten, da wir nach dem Hinzufügen der Profile alle Zugriff auf den Rucksack und unseren Proviant haben. Wir als Gruppe können gemeinsam entscheiden, wer Zugriff auf den Rucksack bekommt und nur der Systemadmin darf das Profil hinzufügen. Das schützt uns vor ungewollten MitbenutzerInnen und DiebInnen. Mit den erhobenen Daten bei der Anlage der Profile können in weiterer Folge die Features "Inventarverwaltung" und "automatische Bedarfsberechnung" implementiert werden.

### How individual slices connect meaningfully?  
<br>  
Im Zentrum unserer Anwendung steht, nachdem man auf "Profile verwalten" klickt, unsere Profilliste (Dashboard). Dort wird eine Übersicht über die angelegten Profile gegeben, es gibt die Möglichkeit für den Systemadministrator, ein Profil hinzuzufügen und bereits angelegte Profile können in der Detailansicht bearbeitet werden. Durch die Toast-Messages, die die Anwendung anzeigt, wenn Funktionen erfolgreich durchgeführt werden, gibt es klares Feedback für den User. Wenn ein User hinzugefügt wurde, kommt man zurück in die Listenansicht und kann das neue Profil sehen. Wenn ein Profil bearbeitet wurde, gibt es die Erfolgsmeldung im Toast und man wird in die Detailansicht des Profils zurückgeleitet. Ein wichtiges Feature der System Capability ist die Bearbeitung der Profile, um Daten zu ändern, aber um insbesondere auch den Fingerabdruck neu aufzunehmen (sollte dies erforderlich sein). Von dort aus kommt man per "Zurück"-Button in die Profilverwaltung zurück. Wenn ein Profil gelöscht wurde, wird man in die Listenansicht weitergeleitet und per Toast-Message über den Erfolg informiert.

### Why your chosen extension makes sense?  
<br>  
NOCH PRÜFEN 
Wir haben uns für die API "The One API" (https://the-one-api.dev/) entschieden, da sie uns wertvolle Daten über die Spezies liefert, die wir im Zuge unserer Reise anlegen könnten.
Die API enthält eine umfangreiche Datenbank zu den LotR-Charakteren, die uns bei der Profilanlage unterstützt. Die API kann nach der Einbindung in unsere System Capability Profile ausfüllen, sodass Mehraufwand für uns minimiert wird. 

### What you intentionally did not build?  
<br> 
Wir haben absichtlich noch keine Möglichkeit erstellt, weitere Admins hinzuzufügen, da wir uns im ersten Schritt darauf fokussieren wollten, dass alle Gefährten, die Zugriff auf den Rucksack brauchen, diesen schnellstmöglich bekommen. Im Zuge der Reise wird sich herauskristallisieren, welcher Gefährte/in noch das Zeug zum Admin hat. Mit einem Button, der Adminrechte vergibt, wollen wir dem Admin in der Zukunft die Möglichkeit geben, Admin-AnwärterInnen die entsprechnenden Rechte zuweisen können. 

Außerdem haben wir die Startseite nach erfolgreichem Login noch nicht implementiert, da diese erst notwendig ist, wenn mindestens zwei unserer Haupt-Features erstellt sind. Hier haben wir uns bisher auf YAGNI bezogen. Was nicht ist, kann später immer noch werden. 

Wir haben uns auch aktiv gegen Profilbilder entschieden, die wir ursprünglich einbauen wollten. Unser Rucksack verfügt weder über eine Kamera, noch über eine Bilder-Datenbank, daher ist das Feature für uns nicht nutzbar.

---

## 4. Reflection on system evolution  
Reflect on how your understanding of the system has changed since Phase 1.
Think like a developer or architect near the end of a first iteration: "What did we actually build, how does it fit together, and what changed along the way?" 
