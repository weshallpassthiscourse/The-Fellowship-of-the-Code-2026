# The Red Book of Westmarch - Chapter 5: The Tale continiues
> “I like less than half of you half as well as you deserve.” - Bilbo


## Table of Contents

 + [Summary](#-summary)  
 + [Artifact](#-artifact)  
 + [AI Assistance](#-ai-assistance)  
 + [Lessons Learned](#-lessons-learned)  

---

### 📝 Summary  
Im Artifact V haben wir zum ersten mal eine ganze System-Capability erstellt. Dafür haben wir zu Beginn die Entscheidung getroffen, welche Capability sich für die Aufgabe am besten eignet. Einstimmig haben wir uns für die Profilverwaltung entschieden, da  das Feature der nächste logische Schritt innerhalb der Anwendung ist. Unsere Capability kann eine Profilübersicht darstellen, Profile hinzufügen, bearbeiten und löschen.  
Danach haben wir mit Hilfe eines Wireframes und eines Flow-Charts das grobe Design sowie den logischen Ablauf festgelegt. Dieser Schritt ist uns recht leicht gefallen, da wir das schon einmal gemacht haben und wussten, worauf wir uns konzentrieren müssen.  
Als nächstes ging es an die Umsetzung. Wir haben im ersten Schritt AI verwendet, um 3 Erstversionen von Codes zu erstellen, die alle unsere gewünschten Funktionen beinhaltet. Im Anschluss folgten mehrere Gruppentermine, in welchen wir den Code mehrfach durchgegangen sind, um auf die Prinzipen DRY & YAGNI & KISS einzugehen und sicherzustellen, dass die klare Trennung von Struktur, Styling und Funktion in HTML, CSS und Java Script (Separation of Concerns) eingehalten wird.  
Hierbei haben wir eindeutig am meisten Zeit dafür verwendet, Fehler, Auslassungen, und Missverständnisse der AIs auszubessen, aber mehr dazu unten.  


Learning Outcomes  

+	Wireframe ist ein gutes Visualisierungstool aber muss nicht den fertigen Endzustand zeigen. In der Implementierung kommt man auf einige Sachen die noch abgeändert werden.
+	In den letzten Aufgaben haben wir uns vorgenommen die Tasks  besser aufzuteilen und die Arbeit auf kleinere Gruppen zu verteilen. Dies haben wir diesmal geschafft umzusetzen und wir haben uns damit viel Zeit und Aufwand erspart. Natürlich hat die Vorarbeit auch gut geholfen.
+	Einbinden einer API.
+	Vibe-Coding funktioniert sehr gut. Auch wenn die AI gerne viele seltsame Fehler macht.
+	Wir haben einen ersten Einblick in den debugging-Prozess bekommen und mussten viele KI-Fehler beheben. Wir haben gesehen das rigoröses Testing essenziell ist, um alle Fehler zu finden.
+	Wir haben gelernt wie man eine Single-Page-Application erstellt, auf der mehrere Seiten angezeigt werden und wie wir die Navigation zwischen den Seiten ermöglichen.



---  

### 💎 Artifact  

File: [Artifact 5](../artifacts/artifact-5/artifact-5-integration-extension.md)  


Build: [Mermaid flow / wireframe / HTML + CSS page / JavaScript page / low-code extension]


Focus: Nicht nur Teile einer Capability, sondern eine Capability komplett von Anfang bis Ende gebaut.
 

---

### 🤖 AI Assistance  
Wir wollten, dass unser Projekt nicht nur gut aussieht, sondern auch richtig was kann, wie gefordert wurde. Deshalb haben wir uns passend zum Thema für „The One API“ entschieden. Weil wir vorher noch nie mit einer API gearbeitet hatten, mussten wir uns von der KI erst einmal Schritt für Schritt erklären lassen, wie das überhaupt funktioniert, vom Access-Token bis zur eigentlichen Abfrage.  
Diesmal sind wir das Ganze komplett anders angegangen als bei der letzten Abgabe. Statt uns selbst durch den Code zu quälen, haben wir den Spieß umgedreht: Die KI hat programmiert, und wir haben Regie geführt. Wir haben ihr genau vorgegeben, wie die Logik und das Design unserer Wireframes aussehen sollen, das Ergebnis im Browser getestet und ihr dann in mehreren Runden gesagt, was sie noch anpassen muss. So haben wir auch gelernt, eine echte Single Page Application zu bauen. Statt drei separater, fehleranfälliger HTML-Seiten läuft jetzt alles über JavaScript, das die Container einfach dynamisch ein- und ausblendet. Nach und nach haben wir mit Hilfe von Vibe-Coding hilfreiche Funktionen hinzugefügt bzw. unnötige entfernt: Sie berechnet jetzt automatisch den Lembas-Bedarf je nach Spezies, übersetzt die englischen API-Daten ins Deutsche und nutzt schöne kleine Pop-up-Toasts statt klobiger Browser-Warnungen.  
Dass Theorie und Praxis oft weit auseinanderliegen, haben wir beim ersten Live-Test gemerkt. Unsere Gefährten-Liste blieb nämlich einfach leer. Statt blind herumzuraten, haben wir uns von der KI zeigen lassen, wie man über die Browser-Konsole gezielt auf Fehlersuche geht. Der Übeltäter war am Ende ein einziger falscher Buchstabe im Bearer-Token.


---

### 🤓 Lessons Learned  
+ Testen des Features von Freunden war besonders wertvoll, um die App mehr User-Centric zu gestalten.
+ Man muss nicht zu sechst an jedem Schritt des Projekts arbeiten, aber auf jeden Fall gemeinsam am Ende all Schritte durchgehen, um etwaige Fehler zu beheben.
+ Programmieren ist weniger Scary als erwartet.
+ Einhaltung der Prinzipien (YAGNI, KISS, SOC, DRY) ist wichtig.
