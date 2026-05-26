# The Red Book of Westmarch - Chapter 4: When things react

> “I like less than half of you half as well as you deserve.” - Bilbo


## Table of Contents

 + [Summary](#-summary)  
 + [Artifact](#-artifact)  
 + [AI Assistance](#-ai-assistance)  
 + [Lessons Learned](#-lessons-learned)  

---

### 📝 Summary

In dieser Aufgabe haben wir unser statisches HTML- und CSS-Dokument mithilfe von JavaScript interaktiv gestaltet und zum Leben erweckt. Die Applikation simuliert den Anmeldeprozess für berechtigte und unberechtigte Nutzer. In der Theorie würde unsere Login-Maske bei einem erfolgreichen Scan (grüner Status) direkt auf eine Verteilerseite weiterleiten, die zu den verbleibenden Systemfunktionen führt. Für diesen Prototyp haben wir die tatsächliche Weiterleitung jedoch bewusst noch nicht programmiert. Unser Fokus lag stattdessen darauf, die Kernfunktion – eine sichere und visuell eindeutige Zugangskontrolle – fehlerfrei abzubilden.  

Learning Outcomes  

+ Logisches Denken wie der Einsatz von `if/else` - Bedingungen ist essenziell, um Code zu verstehen und Ablaufdiagramme/Workflows in echten Code zu verwandeln.  
+ Wir haben zum ersten Mal weitgehend selbstständig JavaScript implementiert und dabei die Entwicklungsumgebung Visual Studio Code (VS Code) genutzt, um unseren Code professionell zu strukturieren.  
+ Wir haben gelernt, wie wichtig klares visuelles Feedback ist. Farbcodes je nach Authentifizierungsstatus sorgen für eine eindeutige Kommunikation mit dem User (UX).  
+ Durch das DRY-Prinzip ("Don't Repeat Yourself") und das Schreiben eigener Funktionen halten wir unseren Code sauber und effizient.  
+ Wir haben die praktische Anwendung von Befehlen wie `setTimeout`, `getElementById` und `Math.random()` (als Zufallsgenerator zur Simulation des biometrischen Scans) gelernt.
+ Bei der Implementierung von JavaScript fällt oft auf, dass man noch Details in HTML oder CSS anpassen muss – bei uns war es beispielsweise das Schloss-Icon in der Status section.

---  

### 💎 Artifact


File: [Artifact 4](../artifacts/artifact-4/artifact-4-logic-state.md)  


Build: JavaScript Implementation


Focus:
Erstellung des Login-Bildschirms der WayBread Watcher App **mit** Interaktivität und dynamischem Status-Feedback.  

---

### 🤖 AI Assistance  

Wir haben die KI gezielt als Tutor genutzt und sie gebeten, uns zunächst nur strukturelle Hinweise zu geben, anstatt uns fertigen Code zu liefern. Unser Ziel war es, nicht einfach nur Copy & Paste zu betreiben, sondern die Logik Zeile für Zeile zu verstehen – auch um für unser erstes Code Review bestens vorbereitet zu sein.  
Bei konkreten Hürden haben wir uns dann Hilfe geholt: Zum Beispiel haben wir die KI gebeten, uns die genaue Funktionsweise von getElementById (welches wir in "Reading the Runes" gesehen hatten) noch einmal verständlich zu erklären und uns bei der Benennung unserer const-Variablen zu beraten.  
Ein großer Lernerfolg war das "Trocknen" unseres Codes: Die KI hat uns geholfen, unseren Code "DRY" zu machen, woraus unsere kompakte Funktion updateStatus(title, message, color) entstanden ist.  
Zuletzt hat uns die KI bei der Umsetzung unseres UX-Gedankens unterstützt: Mithilfe von scannerButton.style.backgroundColor und einem setTimeout haben wir den Fingerabdruck-Button so gestaltet, dass er beim Klicken kurz aufblitzt und so dem User direkt signalisiert, dass sein Click/Touch registriert wurde. Genau diesen Fokus auf schnelles, visuelles Feedback haben wir mit Hilfe der KI auch auf unsere Status-Box übertragen: Die Status-Box färbt sich nun markant Grün (Erfolg) oder Rot (Ablehnung). Der Grund dafür ist tief in unserer Story verwurzelt: Wenn wir Hobbits hungrig, extrem müde und gestresst auf der Flucht sind, ist das genaue Lesen von Texten viel zu mühsam. Durch den starken Farbkontrast erkennen wir nun aus dem Augenwinkel und auf den allerersten Blick, ob wir Zugriff auf das Lembas haben.  

---

### 🤓 Lessons Learned  

+ JavaScript kann entweder direkt im HTML-Dokument geschrieben oder als externe Datei verlinkt werden – letzteres hält das Projekt deutlich aufgeräumter.  
+ Die Arbeit mit Visual Studio Code erfordert anfangs etwas Eingewöhnung, erleichtert das Coden durch farbliche Markierungen, Fehlererkennung aber enorm. Ein riesiger Vorteil war für uns auch, dass man den geschriebenen Code sofort „in Action“ im Browser testen kann. Dieses direkte, visuelle Feedback macht es viel einfacher zu verstehen, wie logische Änderungen im JavaScript das Interface beeinflussen.  
+ Vorarbeit ist weiterhin die halbe Miete.  
+ Eine frühzeitige Terminfindung ist extrem wichtig, um Puffer zu haben, falls Aufgaben doch einmal länger dauern oder Treffen verschoben werden müssen.  
+ Teamwork: Die Kommunikation innerhalb der Gruppe ist essenziell. Gerade bei logischen Problemen im Code (Debugging) hilft es enorm, wenn vier Augen auf den Bildschirm schauen.
+ Wir haben uns gefragt, ob WET dann das Gegenteil von DRY ist und Gemini hat das bestätigt!
+ Mit Backticks kann man Code-Schnipsel grau hinterlegen.
+ Mit CMD und Z kann man retour machen in GitHub.
