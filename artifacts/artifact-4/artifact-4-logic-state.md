# The Fellowship Companion - Artifact IV: Logic & State  

> "He’s eaten it! He’s eaten it all! He’s finished the last of our lembas!" — Gollum


---

## Table of Contents

**[1. System Capability](#1-system-capability)**  
**[2. Static Interface Implementation](#2-static-interface-implementation)**  
**[3. Design Rationale](#3-design-rationale)**  

---

## 1. System Capability  

> **Gollum-Proofing**

### Capability Description  
Die von uns gewählte Capability ist die Sicherheitsmaßnahme, die den Rucksack verschließt. Um zu verhindern, dass Gollum oder andere unerwünschte User auf den Rucksack und seine Inhalte zugreifen können, haben wir einen Verschließmechanismus eingebaut. Dieser funktioniert per Scan des Fingerabdrucks und lässt somit nur vom Admin berechtigte User auf die Inhalte zugreifen.  
<br>
### What state this capability depends on or modifies?  
Diese Funktion verändert die explizite Boolean-Statusvariable isAuthorized. Das System startet standardmäßig in einem gesicherten Zustand (isAuthorized = false). Wenn ein Benutzer mit dem biometrischen Scanner interagiert, ändert die zugrundeliegende Logik diesen Zustand entweder auf true (Zugriff gewährt) oder false (Zugriff verweigert). Die Benutzeroberfläche hängt strikt von dieser Zustandsänderung ab, um die Status-Box (Farben, Text und Schloss-Symbole) visuell zu aktualisieren und den Gefährten zu zeigen, ob der Proviantbeutel aktuell verschlossen oder zugänglich ist. Wenn der Zustand dann true ist, werden neue Bereiche freigeschalten und andere Interface Zustände können erlebt werden.

### Why this capability matters for the Fellowship at this stage of the journey?  
Gerade jetzt, tief in den pechschwarzen Minen von Moria (Khazad-dûm), ist diese biometrische Zugangskontrolle absolut überlebenswichtig. Die Gemeinschaft ist komplett von der Außenwelt abgeschnitten, und es ist unmöglich, neuen Proviant zu besorgen. Das verbleibende WayBread (Lembas) muss also streng rationiert und geschützt werden.  
Hinzu kommt die unmittelbare Gefahr: Gollum schleicht ihnen im Dunkeln nach und könnte versuchen, Rationen zu stehlen, während Orks und Höhlentrolle in den Schatten lauern. Ein biometrischer Scanner ist hier die perfekte Lösung: Er funktioniert völlig lautlos (ein klapperndes mechanisches Schloss könnte in den hallenden Minen tödlich enden!) und erfordert keinen physischen Schlüssel, den man im Kampfgetümmel verlieren könnte. Diese Funktion stellt sicher, dass der wertvolle Proviant selbst dann verschlossen bleibt, wenn der Rucksack im Chaos von Moria in die Klauen der Feinde fallen sollte.

---  


## 2. Static Interface Implementation
 
> **[HTML](src/interface.html)**  
> **[Stylesheet](src/style.css)**  
> **[JavaScript](link einfügen)**


<br>


---

## 3. Design Rationale  


### How does your logic support the intent and value defined in Assignment 1?  
Die implementierte Logik spiegelt exakt die in Assignment 1 definierte Notwendigkeit des "Gollum-Proofings" wider. Der Kern des JavaScript-Codes ist die State-Variable isAuthorized, die standardmäßig auf false gesetzt ist ("Secure by Default"). Dies unterstützt den Intent, das lebensrettende Lembas-Brot vor unbefugtem Zugriff (insbesondere durch Gollum) zu schützen.
Indem der Status nur durch den simulierten, erfolgreichen Scan auf true wechselt, liefert der Code den definierten Value: Die Rationen bleiben sicher, und objektiv kontrollierter Zugang verhindert Misstrauen und Streit innerhalb der ohnehin schon psychisch und physisch erschöpften Gemeinschaft. Das System nimmt den Gefährten die Last der ständigen Bewachung ab.
<br>  


### How does the implemented behavior reflect your flow and wireframe from Assignment 2?  
Das System ist eine direkte technische Übersetzung der Dokumente aus Assignment 2:  
+ Wireframe: Die HTML-Struktur entspricht exakt dem Aufbau des Wireframes (Willkommens-Nachricht, markanter Scanner-Button mit Fingerabdruck-Icon, dynamische Status-Box und der Hinweis unten).
+ Flowchart: Die JavaScript-Logik arbeitet die zentralen Knotenpunkte des Flowcharts ab. Der addEventListener repräsentiert den Schritt "Finger scannen". Die Zufallsberechnung (Math.random()) simuliert den Schritt "Identität prüfen". Die if/else-Bedingung setzt die Verzweigung "Identität bestätigen (Ja/Nein)" um und gibt durch die Farb- und Textwechsel in der UI unmittelbares Feedback ("Zugriff verweigert" vs. "Autorisierung bestätigen"). Der eingebaute 3-Sekunden-Timer (setTimeout) spiegelt zudem den Pfeil wider, der das System nach einer Aktion wieder in den Modus "Standby aktivieren" zurückversetzt.  
<br>  

### What constraints or assumptions shaped your logic?  
Das System ist eine direkte technische Übersetzung von Assignment 2:  
+ Wireframe: Die HTML-Struktur entspricht exakt dem Aufbau des Wireframes (Willkommens-Nachricht, markanter Scanner-Button mit Fingerabdruck-Icon, dynamische Status-Box und der Hinweis unten).
+ Flowchart: Die JavaScript-Logik arbeitet die zentralen Knotenpunkte des Flowcharts ab. Der addEventListener repräsentiert den Schritt "Finger scannen". Die Zufallsberechnung (Math.random()) simuliert den Schritt "Identität prüfen". Die if/else-Bedingung setzt die Verzweigung "Identität bestätigen (Ja/Nein)" um und gibt durch die Farb- und Textwechsel in der UI unmittelbares Feedback ("Zugriff verweigert" vs. "Autorisierung bestätigen"). Der eingebaute 5-Sekunden-Timer (setTimeout) spiegelt zudem den Pfeil wider, der das System nach einer Aktion wieder in den Modus "Standby aktivieren" zurückversetzt.
<br>  

### What did you deliberately not implement yet?  
1. Das Aktionsmenü (Schritt 9 im Flow): Nach erfolgreicher Entsperrung öffnet sich im Code momentan noch nicht das Untermenü zur Inventarverwaltung (Verbrauchsrechnung), zur Nutzerverwaltung oder für das Protokoll. Wir haben uns auf den "Türsteher" – die reine Authentifizierungshürde – konzentriert.  
2. Näherungssensor (Schritt 2 im Flow): Das automatische Aufwecken des Bildschirms durch eine Näherungserkennung wurde nicht implementiert; der Prototyp startet direkt im wachen Standby-Modus.  
3. Spezifische Nutzerprofile: Das System unterscheidet in der Simulation (durch die Zufallszahl) aktuell nur generisch zwischen "Autorisiert" und "Nicht autorisiert", anstatt wie in Assignment 1 geplant echte, spezies-spezifische Profile (Hobbits vs. Elben) abzugleichen.  
