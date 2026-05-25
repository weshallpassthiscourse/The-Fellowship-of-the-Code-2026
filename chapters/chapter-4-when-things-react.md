# The Red Book of Westmarch - Chapter 4: When things react

> “Who knows? Have patience. Go where you must go, and hope!” - Gandalf


## Table of Contents

**The Red Book of Westmarch - Chapter 4: When things react**
 + [Summary](#-summary)  
 + [Artifact](#-artifact)  
 + [AI Assistance](#-ai-assistance)  
 + [Lessons Learned](#-lessons-learned)  

---

### 📝 Summary

In dieser Aufgabe haben wir unser HTML- und CSS-Dokument mithilfe von JavaScript interaktiv gestaltet. Wir haben Funktionen implementiert, sodass User das Interface benutzen können. 

Die Funktionalität, die wir eingebaut haben, zeigt, wie die Applikation bei registrierten und Nicht-Registrierten Usern funktioniert. Unsere Login-Maske leitet je nach Registrierungsstatus direkt auf die Verteilerseite weiter, die dann zu den verbleibenden System Capabilities führt.

Learning Outcomes  

+ Logisches Denken bei den Workflows ist essentiell, um Code zu verstehen 
+ Erstes Mal fast selbstständig JavaScript implementiert und mit Hilfe von "Visual Studio Code" anschaulich gemacht
+ Farbcodes je nach Authentifizierungsstatus implementiert für eine klare Visualisierung und deutliche Kommunikation
+ Funktionen sind gut, um den Code dry zu halten
+ setTimeOut und getElementByID gelernt
+ Math.random als Zufallsgenerator verwendet, weil es für uns nicht möglich ist, einen richtigen biometrischen Login zu machen
+ Bei der Implementation von JavaScript können sich noch Details in (HTML und) CSS ändern - bei uns war es das Schloss in der "Status"-Card

---

### 💎 Artifact


File: [Artifact 4](../artifacts/artifact-4/artifact-4-logic-state.md)  


Build: JavaScript Implementation


Focus:
Erstellung des Login-Bildschirms der WayBread Watcher App **mit** Interaktivität.  

---

### 🤖 AI Assistance  

Wir haben die Implementierung mit AI gestartet und gebeten, uns eine Struktur zu geben und nicht den kompletten Code. Wir wollten auf die richtige Spur geleitet werden, damit wir nicht nur Copy&Pasten, sondern wirklich auch verstehen, was wir da coden. 

Um uns auf das erste Code Review vorzubereiten, haben wir so wenig wie möglich mit AI gemacht.  Bei einzelnen Problemen, die im Code aufgetaucht sind, haben wir AI hinzugezogen, um uns bei konkreten Fragestellungen zu unterstützen. Wir haben getElementById in "Reading the Runes" gesehen und uns diese Funktion nochmal von der KI erklären lassen. Dann wussten wir, was durch die Interaktivität geändert werden soll und haben mit Hilfe von AI die "const" benannt. Wir haben die KI auch benutzt, um unseren Code dry-er zu machen. So sind wir zur Dunktion updateStatus(title, message, color). Am ende sind wir draufgekommen, dass wir die Status-Card gerne farblich anpassungsfähig machen wollen. Die KI hat uns geholfen, mit scannerButton.style.backgroundColor und dem setTimeout die Fingerabdrucks-Card so zu gestalten, dass ersichtlich ist, dass gerade auf diesen Block geklickt wird.

---

### 🤓 Lessons Learned  

+ Vorarbeit ist weiterhin die halbe Miete.
+ Terminfindung früh ansetzen ist hilfreich, falls doch etwas dazwischen kommt und der Termin verschoben werden muss.
+ Kommunikation innerhalb der Gruppe ist sehr wichtig.
