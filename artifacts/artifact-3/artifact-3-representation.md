# The Fellowship Companion – Artifact III: Representation  

> "We wants it, we needs it – but we must not let them have it." - Gollum


---

## Table of Contents

- **[1. System Capability](#1-system-capability)**
- **[2. Static Interface](#3-static-interface)**
- **[3. Design Rationale](4-design-rationale)**

---

## 1. System Capability  

> **Gollum-Proofing**
<br>

### Capability Description  
Die von uns gewählte Capability ist die Sicherheitsmaßnahme, die den Rucksack verschließt. Um zu verhindern, dass Gollum oder andere unerwünschte User auf den Rucksack und seine Inhalte zugreifen können, haben wir einen Verschließmechanismus eingebaut. Dieser funktioniert per Scan des Fingerabdrucks und lässt somit nur vom Admin berechtigte User auf die Inhalte zugreifen.  
<br>
### Why this capability?
Ausgewählt haben wir diese Capability, weil sie einerseits essenziell für die Sicherheit unserer Reise ist und andererseits, weil diese Capability, das richtige Maß an Komplexität für diese Arbeitsaufgabe bzw. für das erste Mal hat. Wir wollten keine zu schiwerige Capability für unseren ersten Versuch der Beschreibung auswählen, aber dennoch eine, die genug Inhalt für die Aufgabe bietet.  
Außerdem ist die gewählte Capability für unsere weiteren geplanten Capabilities sehr wichtig. Die spezienbasierte Verbrauchsrechnung zum Beispiel baut auf den in der Sicherheismaßnahme erstellten Nutzerprofilen auf. Auch für den Inventory-Tracker ist es essenziell, dass nicht jeder X-beliebige Mittelerdebewohner auf unseren Rucksack Zugriff hat und womöglich Proviant stehlen kann. Das Schloss ist somit logisch gesehen, der erste Schritt.  
<br>
### Why is it meaningful for us at this stage of the journey?  
Das biometrische Zugangskontrollsystem wurde bewusst als erste Capability gewählt: Es ist komplex genug, um inhaltlich relevant zu sein, aber handhabbar genug für einen ersten Implementierungsversuch. Vor allem aber ist es das logische Fundament für alles, was folgt, die speziesbasierte Verbrauchsrechnung baut auf den hier erstellten Nutzerprofilen auf, und der Inventory-Tracker funktioniert nur, wenn der Zugriff auf den Rucksack kontrolliert ist. 

---  


## 2. Static Interface

> **[Wireframe](../artifact-2/src/decisions.png)**  

> **[HTML](src/interface.html)**

<br>


---

## 3. Design Rationale  

### How does this interface support the intent and value defined in Assignment 1?  
Das Interface schützt den gemeinsamen Proviantbeutel der Gefährten vor unbefugtem Zugriff. Ohne Authentifizierung bleibt der Beutel gesperrt – niemand kann heimlich Vorräte entwenden oder manipulieren. Ein konkretes Szenario wäre etwa Gollum, der unbemerkt Vorräte stiehlt oder gezielt Misstrauen sät, indem er einem Gefährten einredet, ein anderer habe heimlich gegessen. Der Fingerabdruck-Scan stellt sicher, dass nur wirklich autorisierte Personen Zugang erhalten und solche Intrigen von vornherein verhindert werden. 

### How does it reflect the wireframe from Assignment 2?  
Das Interface bildet den ersten Schritt unseres Wireframes ab: den Anmeldevorgang. Aufbau und Struktur – Header, Willkommensbereich, Scanner-Sektion, Statusanzeige und Hinweis – entsprechen direkt dem geplanten Layout. Der visuelle Stil mit dem Oliv-Farbschema unterstreicht dabei die mittelalterlich-rustikale Atmosphäre der Anwendung.  
### What did you deliberately not implement yet?  
Bewusst ausgespart wurden eine echte Fingerabdruck-Datenbank, der vollständige Autorisierungsprozess (da dieser Java voraussetzen würde, das im Kurs noch nicht behandelt wurde) sowie die Weiterleitung zum Hauptmenü nach erfolgreicher Anmeldung. Diese Elemente sind konzeptuell vorgesehen, lagen aber außerhalb des aktuellen Umsetzungsrahmens.  
### What assumptions or constraints shaped your decisions?  
Zwei wesentliche Faktoren haben unsere Entscheidungen geprägt: Zum einen der verfügbare Zeitrahmen und Arbeitsaufwand innerhalb des Projekts. Zum anderen eine bewusste Weltannahme – wir gehen davon aus, dass der Bildschirm auf einem kleinen, im Rucksack integrierten Gerät läuft. Dementsprechend wurde das UI kompakt und mobil-first gestaltet: schmales Layout, klare Schriftgrößen und ein reduziertes Design, das auch auf engem Raum gut lesbar und bedienbar bleibt.  
