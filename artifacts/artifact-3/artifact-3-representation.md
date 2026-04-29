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
Obwohl wir uns aktuell in der Formierungs- und Planungsphase in Bree und Bruchtal befinden – und die akute Bedrohung durch Gollums Sabotage oder extremer Hunger noch in der Zukunft liegen – ist genau jetzt der entscheidende Zeitpunkt für die Entwicklung dieses Features. Wir betreiben hier eine vorausschauende Sicherheitsplanung: Ein sicheres Zugriffssystem muss entwickelt und getestet werden, bevor wir in feindliches Gebiet aufbrechen. Wenn wir erst in Mordor merken, dass uns Vorräte gestohlen werden, haben wir weder die Zeit noch die sichere Umgebung, um eine Lösung zu bauen.  
Gleichzeitig adressiert dieses System schon jetzt ein zentrales Problem der Gruppendynamik: Der Rat von Elrond hat gezeigt, dass die Gefährten aus verschiedenen Völkern stammen und die korrumpierende Macht des Ringes leicht Misstrauen säen kann (wie z. B. bei Boromir). Ein fälschungssicheres, objektives Zugangssystem durch Biometrie etabliert von Anfang an klare Regeln. Es schützt uns also nicht nur vor externen Feinden, sondern schafft auch intern Vertrauen, bevor Paranoia oder Ressourcenknappheit die Mission von innen heraus gefährden können.


---  


## 2. Static Interface

> **[Wireframe](artifact-2/src/decisions.png)**  

> **[HTML](src/interface.html)

<br>


---

## 3. Design Rationale  
