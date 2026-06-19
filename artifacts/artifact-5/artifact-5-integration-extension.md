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
FÜr unsere Aufgabe zu "Integration & Ext." haben wir uns die System Capability "Profilverwaltung" ausgesucht. Unsere erste Funktionalität war der Login, daher war der nächste logische Schritt, die Profilverwaltung zu implementieren.
Unsere Capability kann eine Profilübersicht darstellen, User hinzufügen, bearbeiten und löschen. 
Um einen User hinzuzufügen, muss im allerersten Schritt der Admin seinen Fingerprint registrieren. Danach kann der Admin nach dem biometrischen Login ein neues Profil anlegen. Dazu sammeln wir den Namen, das Geschlecht, die Spezies und den Fingerardruck. Darauf wird automatisch der durchschnittliche Bedarf der Person berechnet (out of scope). Diese Daten erfassen wir, damit sie uns in Zukunft für die Übersicht und bei weiteren Capabilites (Inventarverwaltung, Bedarfsberechnung) helfen können. 

Hinzugefügte Profile werden in einer Listenansicht auf der Übersichtsseite angezeigt. Dort ist es möglich, mit einem Klick auf das Augen-Icon in die Detailansicht des Profils zu wechseln. Dort gibt es die Möglichkeiten, das Profil zu bearbeiten oder zu löschen.

Im Bearbeitungsmodus können wir alle zuvor erfassten Daten ändern. Hier ist wichtig, dass der Fingerabdruck auch neu erfasst werden kann, falls in einem Kampf der zuvor ausgewählte Finger verloren geht. Nach dem Speichern der Änderungen wird der User ins Dashboard (Profilverwaltung) weitergeleitet und erhält per Toast-Message die Information, dass die Änderungen erfolgreich gespeichert wurden. 
Wenn man in der Detailansicht das Profil löschen möchte, wird das Profil aus der Profilübersicht entfernt und es erscheint ebenfalls in der Profilübersicht der Toast, dass das Löschen erfolgreich durchgeführt werden konnte.


### Why this capability?  

### What state this capability depends on or modifies?  


### Why this capability matters for the Fellowship at this stage of the journey?  

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

### How individual slices connect meaningfully?  
<br>  

### Why your chosen extension makes sense?  
<br>  

### What you intentionally did not build?  
<br> 

---

## 4. Reflection on system evolution  
Reflect on how your understanding of the system has changed since Phase 1.
Think like a developer or architect near the end of a first iteration: "What did we actually build, how does it fit together, and what changed along the way?" 
