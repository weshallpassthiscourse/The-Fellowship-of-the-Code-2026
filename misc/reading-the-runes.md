# Reading the Runes  
> “All right then, keep your secrets” - Frodo Baggins


## What the Code Does and first impressions  

Das CSS ist jetzt nicht schön, aber wahrscheinlich in der Aufgabe nicht so wichtig. Diese App ist einfach ein Rations-Rechner mit einem Input-Feld und zwei Buttons, die eine Menge abziehen (Eat Rations) oder hinzufügen (Add Rations). Das Ziel ist von einer gegebenen Menge an Rationen, und zwar 10, eine beliebige Menge, die man selbst in dem Input-Feld eingibt, korrekt zu addieren bzw. zu subtrahieren.  
Bei der Verwendung sind uns sofort einige Sachen aufgefallen.  
1.	Die Addition ist nicht richtig. Ohne den Code zu sehen, vermuten wir bereits, dass durch den Add-Button ein String hinzugefügt wird und Kalkulation stattfindet.
2.	In dem Input Feld kann man auch Wörter einfügen! Subtrahiert man diese, dann dann bekommt man Fehler wie NaN. Beim Addieren wird der Text einfach an die Zahl gehängt. Außerdem kann man auch negative Zahlen oder auch einfach nichts einfügen.
3.	Wenn die „Kalkulation“ beendet ist, bleibt der Input stehen, bis man ihn selbst löscht.
4.	Auf den Eat-Button muss man 2x drücken, bis etwas passiert.
5.	Die Subtraktion funktioniert zwar richtig (man bekommt die richtige Menge raus), aber es kommt ein Popup-Fenster mit der Warnung, dass es nicht genug Rationen gibt, auch wenn die Input-Zahl kleiner ist als die verfügbaren Rationen. Vermutung: Das Popup-Fenster kommt zu früh.

---


## Identified Issues and why they matter  

Obwohl uns mehrere Fehler im Code aufgefallen sind, z.B. dass man negative Zahlen eingeben kann, dass das Input-Feld nicht geleert wird und dass man auch „nichts“ addieren/subtrahieren kann, haben wir uns entschieden, nur die folgenden zwei Bugs zu fixen, weil diese die grundlegenden zwei Funktionen betreffen. Addieren und Subtrahieren. Und der Rechner soll ja genau diese zwei Funktionen richtig machen.  
1.	Addition → funktioniert nicht richtig  
    *Beschreibung:* Wenn man zur angegebenen Menge 10 eine Zahl addieren will z.B. 6, dann ust das Ergebnis nicht 16, sondern 106. Außerdem kann man Wörter auch „addieren“, z.B. Hobbit. Dann kommt 10Hobbit raus. Das liegt daran, dass man in       JavaScript mit dem Plus Zeichen nicht nur mit Zahlen addieren, sondern auch Texte zusammenhängen kann.  
    *Impact:* Durch das bloße Aneinanderreihen von Strings sieht der Wert im Tracker zwar aus wie eine korrekte, hohe Zahl (106), mathematisch liegt der Wert aber komplett daneben. Das macht einen gewaltigen Unterschied: Die Hobbits könnten       durch diese Fehlkalkulation verhungern, denn man weiß ja, wie verfressen sie sind (second breakfast is a must!).
2.	Popup-Fenster → erscheint zu früh
    *Beschreibung:* Wenn man zur angegebenen Menge 10 eine Zahl z.B. 5 subtrahieren will, dann muss man den Button zweimal drücken, damit die Subtraktion erfolgt. Das Ergebnis (5) ist dann richtig. Zieht man aber von der gegeben Menge 10          beispielsweise 6 ab, dann bekommt man nach dem ersten Klick kein sichtbares Ergebnis. Die Rationen werden in der Anzeige nicht geupdatet und es bleibt 10 Rationen stehen, obwohl eigentlich 4 dastehen müssten. Nach dem 2. Klick (weil der      Input 6 ja noch drinnen steht), wird versucht, von den im Hintergrund gespeicherten 4 Rationen nochmals 6 abzuziehen. Da das Ergebnis kleiner als 0 wäre, kommt die Warnmeldung, dass die Rationen zu wenige sind.
    *Impact:* Das ist ein großes Problem, da man als User denkt, dass man nicht richtig geklickt hat. Man klickt nochmal drauf, nur um dann eine Fehlermeldung zu bekommen, obwohl ja 10 - 6 eigentlich noch genügend Rationen übriglassen. Es         sieht so aus, als wäre die Kalkulation falsch, dabei ist die Logikreihenfolge einfach nicht richtig. Die kleinen verfressenen Hobbits würde so ein verwirrendes Feedback nur frustrieren.

---

## Fixes ans AI Assistance Reflection

I fixed the code by converting everything to numbers and moving some lines around.

    rations = Number(rations) + Number(value);

## AI Assistance Reflection

- I asked ChatGPT to fix the code. It gave me the correct solution.
- I learned that JavaScript has problems with strings and numbers.


What the code is supposed to do and first impression

Description of Fixes and AI use
1.	Addition
Wir haben zunächst den type des Inputs im HTML von text in number geändert. Zudem wurden bei let rations = "10" die Gänsefüßchen entfernt, damit es eine echte Zahl ist und kein String. Wir dachten, dass durch diese Änderungen die Addition dann richtig sein würde, aber es wurde trotzdem als String zusammengeklebt.
Daraufhin wurde Gemini konsultiert und gebeten, uns – ohne die Lösung direkt zu verraten – auf die richtige Fährte zu bringen. Wir sollten mit console.log(typeof value) unter dem addButton schauen, was für ein Datentyp eigentlich herauskommt. Nachdem wir ein Number erwartet, aber einen String herausbekommen hatten und erst mal verdutzt schauten, hat uns Gemini erklärt, dass ein HTML-Input-Feld standardmäßig immer einen String liefert, selbst wenn man es auf type="number" stellt. Um das Problem zu lösen, mussten wir an zwei Enden ansetzen: Erstens durfte unsere gegebene Menge kein Text sein (was wir davor bereits geändert hatten). Zweitens mussten wir den Text aus dem Input-Feld zwingend mit dem Befehl parseInt() in eine mathematische Zahl umwandeln. Wenn auf beiden Seiten des Plus-Zeichens echte Zahlen stehen, rechnet JavaScript endlich richtig, statt nur Text aneinanderzukleben
Aber danach kam die Frage auf, warum das Subtrahieren auch vorher schon ohne parseInt funktioniert hat. Laut Gemini liegt es an der sogenannten „Type Coercion“. Kurz gesagt fühlt sich JavaScript bei allen anderen Rechenzeichen außer dem + gezwungen, wirklich zu rechnen, und wandelt den String automatisch um (braucht das parseInt da also streng genommen nicht). Beim Addieren kann das Plus-Zeichen die Strings aber eben auch „zusammenkleben“, weshalb das parseInt dort zwingend benötigt wird, um als Ergebnis eine Zahl zu erzwingen. Wir haben es der Sauberkeit halber auch beim Subtrahieren hinzugefügt, auch wenn dort vorher schon ein richtiges Ergebnis herauskam. JavaScript ist zwar sehr "forgiving", aber wenn der Code irgendwann länger wäre, kann es sein, dass wir dann genau deswegen auf Fehler stoßen.
Unser Martini nach dem Ende dieses Kurses darf zwar WET sein, aber unser Codestück nicht! Um den Code nicht WET (write everything twice) zu lassen, haben wir das Umwandeln des Wertes in eine eigene Funktion turnInputValue() ausgelagert und ihn damit geDRY-ed (don’t repeat yourself).
2.	das Popup Fenster
Nach Betrachtung des Codestückes war die Überlegung zunächst, ob man nicht vielleicht einen anderen Loop braucht. Nach Durchsehen der Zusammenfassung sind wir schnell draufgekommen, dass das keinen Sinn macht, sondern die Reihenfolge das Problem ist. Das Programm soll zuerst Rechnen. Wenn das Ergebnis unter 0 ist, dann bekommt man eine Warnmeldung. Wenn nicht, dann soll einfach das Ergebnis oben eingefügt werden, sprich: die Rationen sollen geupdatet werden.
Nach einigem Herumprobieren und Verschieben sind wir draufgekommen, dass man, damit genau das erfolgreich passiert, einfach die updateStatus() Funktion nach dem else einfügen muss. Das haben wir mit Trial and Error (und unseren eigenen Hobbitgehirnen) gemacht, ganz ohne AI. Nur indem wir das updateStatus() nach unten verschoben haben, haben wir zwei Fliegen (das Problem des Doppelklickens und die zu frühe Warnmeldung) mit einer Klappe geschlagen.
3.	Für das Formulieren des Textes wurde natürlich AI verwendet, um das schöner und flüssiger auszudrücken ohne dabei unsere Hobbit-Essenz zu überschatten.
