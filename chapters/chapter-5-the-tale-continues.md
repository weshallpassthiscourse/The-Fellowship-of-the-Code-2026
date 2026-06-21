# The Red Book of Westmarch - Chapter 4: The Tale continiues
> “I like less than half of you half as well as you deserve.” - Bilbo


## Table of Contents

 + [Summary](#-summary)  
 + [Artifact](#-artifact)  
 + [AI Assistance](#-ai-assistance)  
 + [Lessons Learned](#-lessons-learned)  

---

### 📝 Summary
Im Artifact V haben wir zum ersten mal eine ganze System-Capability erstellt. Dafür haben wir zu Beginn die Entscheidung getroffen, welche Capability sich für die Aufgabe am besten eignet. Einstimmig haben wir uns für die Profilverwaltung entschieden, da  das Feature der nächste logische Schrittinnerhalb der Anwendung ist. Unsere Capability kann eine Profilübersicht darstellen, Profile hinzufügen, bearbeiten und löschen.  
Danach haben wir mit Hilfe eines Wireframes und eines Flow-Charts das grobe Design sowie den logischen Ablauf festgelegt. Dieser Schritt ist uns recht leicht gefallen, da wir das schon einmal gemacht haben und wussten, worauf wir uns konzentrieren müssen.  
Als nächstes ging es an die Umsetzung, wir haben im ersten Schritt AI verwendet, um 3 Erstversionen von Codes zu erstellen, die alle unsere gewünschen Funktionen beinhaltet. Im Anschluss folgten mehrere Grupperntermine, in welchen wir den Code mehrfach durchgegangen sind, um auf die Prinzipen DRY & YAGNI einzugehen und sicherzustellen, dass die klare Trennung von Struktur, Styling und Funktion in HTML, CSS und Java Script eingehalten wird.  
Hierbei haben wir eindeutig am meisten Zeit dafür verwendet, Fehler, Auslassungen, und Missverständnisse der AIs auszubessen, aber mehr dazu unten.  



Learning Outcomes  

+ 

---  

### 💎 Artifact


File: [Artifact 5](../artifacts/artifact-5/artifact-5-integration-extension.md)  


Build: [Mermaid flow / wireframe / HTML + CSS page / JavaScript page / low-code extension]


Focus:
 

---

### 🤖 AI Assistance  
Nachdem wir uns für eine Capability entschieden hatten, haben wir die KI gefragt, welche API oder Library wir am besten einbinden könnten. Uns war wichtig, dass diese Extension – genau wie in der Aufgabenstellung gefordert – nicht nur hübsches Design ist, sondern dem System echte Bedeutung verleiht. Wir sind die Vorschläge der KI durchgegangen und haben uns für „The One API“ entschieden, weil sie vom Thema her einfach perfekt zu unserem Projekt passt. Da wir davor noch nie mit einer API gearbeitet hatten und absolut nicht wussten, wie man so etwas anknüpft, haben wir uns den gesamten Prozess Schritt für Schritt erklären lassen und das dann umgesetzt – vom Besorgen des Access-Tokens bis zur eigentlichen Abfrage im Skript.
Der größte Unterschied zur letzten Abgabe lag diesmal aber in unserer grundsätzlichen Herangehensweise. Statt die KI nur als Tutor zu nutzen und den Code mühsam selbst zu tippen, haben wir den Spieß diesmal umgedreht und den Code gänzlich von ihr schreiben lassen. Unser Fokus lag also nicht mehr auf der Syntax, sondern auf der Rolle der Regie: Wir haben der KI die exakte Logik und das Design unseres Wireframes vorgegeben, den Output im Browser getestet und sie in mehreren Feedback-Schleifen korrigiert.
So haben wir ihr nach und nach beigebracht, was sie anpassen muss – zum Beispiel, dass die App den Lembas-Bedarf je nach ausgewählter Spezies vollautomatisch berechnet, dass wir kleine Pop-up-Meldungen (Toasts) statt klobiger Browser-Alerts wollen oder dass die englischen Rohdaten der API auf Deutsch übersetzt werden müssen. Anstatt außerdem drei separate, fehleranfällige HTML-Dokumente für unsere drei Wireframe-Screens zu basteln, haben wir das Konzept der *Single Page Application* gelernt: Wir steuern den Zustand der App rein über JavaScript und blenden die jeweiligen Container einfach dynamisch ein und aus (display: none/flex).
Dass Theorie und Praxis trotzdem zwei verschiedene Paar Schuhe sind, merkten wir beim ersten Live-Test: Unsere Gefährten-Liste blieb komplett leer. Hier führte uns die KI weg vom blinden Herumraten hin zur gezielten Inspektion der Browser-Konsole (via Cmd + Opt + K in Firefox). Der Übeltäter war am Ende ein einziger, fehlerhafter Buchstabe in unserem Bearer-Token – eine heilsame Lektion in Demut vor der Syntax.
Im letzten Schritt half uns die KI dabei, das Interface vom Gefühl eines „Prototyps“ zu einer echten „App“ zu trimmen: Wir entfernten den klassischen Maus-Cursor über den klickbaren Elementen, ersetzten unprofessionelle Emojis durch saubere, skalierbare SVG-Vektorgrafiken (wie beim Fingerabdruck-Symbol), bauten Sicherheitsabfragen beim Verwerfen von Eingaben ein und wandelten generische System-Abstürze in präzise Toast-Meldungen um, die dem User genau auflisten, *welche* Felder er vergessen hat. Das Ergebnis ist kein zusammenkopiertes Skript mehr, sondern ein funktionierendes System, dessen Logik wir von der ersten Skizze bis zum fertigen Code selbst gesteuert haben.
Nachdem wir uns für eine Capability entschieden hatten, haben wir die KI gefragt, welche API oder Library wir am besten einfügen könnten. Uns war wichtig, dass die Extension – wie in der Aufgabe gefordert – nicht nur das Design betrifft, sondern dem System eine echte Bedeutung gibt. Wir sind die Vorschläge der KI durchgegangen und haben uns für „The One API“ entschieden, weil sie perfekt zu unserem Projekt passt.
Da wir vorher noch nie mit einer API gearbeitet haben und nicht wussten, wie man so etwas genau einbindet, haben wir uns den Prozess Schritt für Schritt erklären lassen und anschließend durchgeführt (vom Besorgen des Access-Tokens bis zur Abfrage im Skript).
Der größte Unterschied zur letzten Abgabe war aber unsere Herangehensweise: Statt die KI diesmal nur als Tutor zu verwenden und den Code selbst zu tippen wie beim letzten Mal, haben wir uns dazu entschlossen, den Code gänzlich von ihr schreiben zu lassen. Unser Fokus lag diesmal also nicht auf der Syntax, sondern darauf, der KI die Logik und das Design unseres Wireframes exakt vorzugeben. Wir haben den generierten Code dann im Browser getestet und der KI in mehreren Schleifen Feedback gegeben, was sie anpassen soll – zum Beispiel, dass die App den Lembas-Bedarf je nach Spezies automatisch ausrechnet, dass wir kleine Pop-up-Meldungen (Toasts) statt hässlicher Browser-Alerts wollen oder dass die englischen API-Daten auf Deutsch übersetzt werden müssen. Als unsere Gefährten-Liste beim ersten Test komplett leer blieb, führte uns die KI weg vom blinden Raten hin zur gezielten Inspektion der Browser-Konsole (via Cmd + Opt + K in Firefox). Der Übeltäter war am Ende ein einziger fehlerhafter Buchstabe in unserem Bearer-Token – eine heilsame Lektion in Demut vor der Syntax.
Anstatt drei separate, fehleranfällige HTML-Dokumente für unsere drei Wireframe-Screens zu erstellen, lernten wir, den Zustand der App über JavaScript zu steuern und Container dynamisch ein- und auszublenden (display: none/flex).
Im letzten Schritt half uns die KI, das Interface von „Prototyp“ auf „App“ zu trimmen: Wir entfernten den Maus-Cursor über klickbaren Elementen, ersetzten unprofessionelle Emojis durch saubere, skalierbare SVG-Vektorgrafiken (für das Fingerabdruck-Symbol), bauten Sicherheits-Abfragen beim Verwerfen von Daten ein und ersetzten generische System-Abstürze durch präzise Toasts, die dem User exakt auflisten, welche Eingabefelder noch fehlen.



---

### 🤓 Lessons Learned  

+ 
