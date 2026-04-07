**The Fellowship Companion - Artifact I: Situation & Intent**

**Waybread Watcher (App)**

 
Situation

Frodo und Sam befinden sich in der finalen Phase ihrer Reise, nachdem sie Gollum in ihrem Team aufgenommen haben. Sie marschieren zum Schicksalsberg nach Mordor und überqueren Felsengebirge und Totensümpfe. Die physische und psychische Belastung ist am absoluten Limit. Die Gruppe hat nur einen sehr begrenzten Vorrat an Lembas (elbisches Brot). Das Problem ist die Kombination aus extremer Ressourcenknappheit und aktiver Sabotage. Gollum agiert als unzuverlässiger Dritter, der versucht, durch psychologische Manipulation und den Diebstahl/das Vortäuschen von Ressourcenverlust das Vertrauen zwischen den Gefährten zu zerstören. Die Situation ist nicht trivial, da Hunger zu Erschöpfung und Streit führt. In einer Umgebung mit toxischen Dämpfen und extremer Hitze gibt es keine Möglichkeit Nahrung zu finden und die manuelle Berechnung, ob die verbleibenden Lembas-Krümel für den finalen Aufstieg reichen, ist für das erschöpfte Gehirn der Hobbits unmöglich. Das bedeutet, dass jede Fehlkalkulation oder jede durch Gollum provozierte Fehlentscheidung zum sofortigen Scheitern der gesamten Mission führt. 

 
Intent

Die Anwendung dient Samweis als intelligenter Rationsmanager, der berechnet, wieviel Lembas und Wasser pro Tag konsumiert werden darf um das Ziel lebend zu erreichen. Sie schützt vor Diebstahl durch Unbefugte (Gollum) und warnt vor kritischer Unterernährung. Das System soll objektive Daten liefern, um Gollums Manipulationen (z.B. die Behauptung, das Brot sei bereits aufgezehrt) durch präzise Bestands- und Verbrauchslogik zu entlarven. Die App dient nicht zur Beschaffung von Lebensmitteln, zur Identifikation giftiger Nahrung oder als Wegweiser zur nächsten Wasserquelle. 

 
Value 

Die Hobbits behalten genug Kraft für den letzten Aufstieg am Schicksalsberg und vermeiden tödliche Missverständnisse über die Vorratsmenge. Ohne die App könnte Sam die Vorräte zu früh aufbrauchen, oder Gollum könnte sie unbemerkt entwenden und Intrigen zwischen den Gefährten spinnen, indem er z.B. Frodo einredet, Sam habe die Vorräte heimlich gegessen. Die App verhindert so den emotionalen Zusammenbruch der Gruppe. Sie maximiert die Chance, dass Frodo die letzten Meter aus eigener Kraft bewältigen kann. 


System Capabilities 

Verwaltung verschiedener Profile: Das System muss die Erstellung und Pflege von Nutzerprofilen mit spezies-spezifischen Basis-Verbrauchsraten (z.B. erhöhter Bedarf für Hobbits, reduzierter Bedarf für Elben) ermöglichen. 
Verbrauchs- und Bedarfsrechnung: Das System muss die Vorräte basierend auf der Gruppenzusammensetzung, dem täglichen Aktivitätslevel und dem Schwierigkeitsgrad des Geländes in Tagesschrittenautomatisch berechnen und abziehen können. 
Frühwarnsystem: Das System muss Warnungen ausgeben, wenn der berechnete Restvorrat für eine spezifische Person oder die Gesamtgruppe einen kritischen Schwellenwert (z.B. Vorratsreichweite unter 3 Tage) unterschreitet. 
Gollum-Proofing: Ein digitaler Verschluss für den Proviantbeutel, der nur durch Sams Fingerabdruck oder Gesichtsscan geöffnet werden kann mit Zeitangaben. 
Inventory Tracker: Ein Gewichtssensor im Rucksack, der genau registriert, wann und wieviel Brot entnommen wird. 
 

Assumptions

Technologie-Akzeptanz: Wir nehmen an, dass Sam und Frodo bereit sind, einem digitalen Gerät zu vertrauen, obwohl sie aus dem eher technikfernen Auenland kommen. 
Konstante Nährwerte: Wir gehen davon aus, dass ein Stück Lembas immer die gleiche Menge an Energie liefert und die Hobbits einen messbaren Grundumsatz an Kalorien haben. 
Hardware-Haltbarkeit: Wir setzen voraus, dass das Gerät robust genug ist, um Stürze, Matsch, Wasser und die Hitze in der Nähe von Mordor auszuhalten. 

Constraints

Energiequelle: In Mittelerde gibt es keine Steckdosen. Das System muss also über Solarzellen (schwierig bei Saurons Staubwolken) oder kinetische Energie (durch das Gehen) geladen werden.
Unzuverlässige Informationen: Da die genaue Entfernung zum Schicksalsberg nicht auf Google Maps steht, basieren alle Berechnungen auf Schätzungen. Wenn der Weg durch einen Umweg länger wird, stimmen die Rationspläne nicht mehr. 
Offline-Betrieb: In Mittelerde existiert keinerlei Netzwerkverbindung (weder Mobilfunk noch WLAN). Die Anwendung und alle Datenstrukturen müssen vollständig lokal und offline auf dem Gerät funktionieren (“Edge Computing”). 
Manuelle Dateneingabe: Sam muss beim Packen des Rucksacks angeben, was er mitnimmt. Jedes Mal, wenn er Brot oder Wasser oder etwas anderes herausnimmt, muss er antippen, um was es sich handelt. Durch Stress und körperliche Belastung kann es sein, dass Sam das falsche Nahrungsmittel antippt, und somit stimmen die Werte und Daten nicht mehr. 
Hardware-Limitationen für Tarnung: Das Gerät darf in der Wildnis nachts keine starken Lichtemissionen erzeugen (strikter Dark-Mode erforderlich), um das Risiko der Entdeckung durch Späher zu minimieren. 
 
