# The Fellowship Companion – Artifact II: Deciding  

---

## Table of Contents

- [1. Chosen System Capability](#1-chosen-system-capability)
- [2. Flowchart](#2-flowchart)
- [3. Wireframe](#3-wireframe)

---

### 1. Chosen System Capability  

Gollum-Proofing

#### Capability Description  
Die von uns gewählte Capability ist die Sicherheitsmaßnahme die den Rucksack verschließt. Um zu verhindern, dass Gollum oder andere unerwünschte User auf den Rucksack und seine inhalte zugreifen können, haben wir einen Verschließmechanismus eingebaut. Dieser funktionier per Scan des Fingerabdrucks und lässt somit nur vorher vom Admin berechtigte User auf die Inhalte zugreifen.  
#### Why this capability?
Ausgewählt haben wir diese Capability weil sie zum Einen essenziell für die Sicherheit der Reise der Gefährten ist und zum Anderen haben wir eine Abschätzung durchgeführt welche unserer Capabilities das richtige Maß an Komplexität für diese Arbeitsaufgabe hat. Wir wollten keine zu schiwerige Capability für unseren ersten Versuch der Beschreibung auswählen aber dennoch eine, die genug Inhalt für die Aufgabe bietet.  
#### Why is it meaningful for us at this stage the journey?  

Wie im Chapter I beschrieben hilft die Capability in erster Linie an der Stelle der Reise in der Frodo, Sam und Gollum den Schicksalsberg erklimmen und Gollum versucht Sam und Frodo zu entzweien indem er die letzten Lembas den Berg hinuter wirft und Sam die Schuld dafür gibt. Abgesehen davon ist ein sicher verschließbarer Rucksack auch an vielen anderen Stellen der Reise eine große Hilfe, da er sicherstellt, dass keine Vorräte gestohlen werden können und die Gefährten stehts genug Proviant dabei haben.

---  

### 2. Flowchart  

[Flowchart](artifacts/artifact-2/src/decisions-mermaid.md)

So funktioniert der Ablauf – Schritt für Schritt 

1. Näherung erkennen  
Standby aktivieren - das System befindet sich im Ruhezustand und wird durch Bewegung oder Annäherung geweckt. 

2. Bildschirm aufleuchten  
Ein Sensor erfasst den relevanten haptischen Kontakt, um den Erkennungsprozess einzuleiten. 

3. Finger scannen  
Der erkannte Finger wird per Fingerabdruckscan erfasst. 

4. Identität bestätigen 
Der gescannte Fingerabdruck wird mit den gespeicherten Identitätsdaten abgeglichen. 

5. Identität bestätigen?  
    + Bei einer fehlerhaften Identitätsprüfung wird der Zugriff verweigert und der Versuch protokolliert, damit kehrt das System zurück auf Standby.  
    + Bei erfolgreicher Bestätigung der Identität bestätigt das System die Autorisierung.  

6. Fehlversuche stattgefunden?  
Das System prüft, ob ein Transfer oder eine Weiterreise erfolgt ist:  
    + Findet kein Fehlversuch statt, kann das Schloss geöffnet werden.  
    + Findet ein Fehlversuch statt, wird eine Warnung angezeigt, worauf infolge erst das Schloss geöffnet werden kann.  

7. Schloss öffnen  
Das Schloss wird entriegelt und somit kann in weiterer Folge das Aktionsmenü bedient werden. 

8. Aktion wählen  
Der Nutzer wählt zwischen den Optionen Inventar verwalten, Nutzer verwalten, Protokoll ansehen und Schloss verriegeln. 
Die Systemoption Inventar verwalten verschafft den Zugriff ausschließlich auf das Inventar, daher kehrt das System nach der Nutzung zurück auf die Aktionenübersicht. 
Unter “Nutzer verwalten “ gelangt der Nutzer auf die Option sich als Admin zu authentifizieren. Erfolg die Authentifizierung erfolgreich, erhält der Nutzer Zugriff auf die Verwaltung der Nutzer und kann diese somit registrieren oder löschen. Die Daten der Verwaltungsschritte müssen gespeichert werden, damit der Nutzer auf das Aktionsmenü zurückkehrt. 
“Protokoll ansehen” ermöglicht dem Nutzer jegliche vom System erstellen Protokolle einzusehen. Nach der Einsicht kehrt das System zurück auf “Aktion wählen”. 
Die Aktionswahl “Schloss verriegeln“ delegiert den Benutzer durch den Abmeldungsscan, wobei ein weitere Identitätsprüfung durchzuführen ist. Anschließend wird die Abmeldung protokolliert sowie die Daten gesichert und das System kehrt in “Standby aktivieren” zurück. 

  
---  

### 3. Wireframe

[Wireframe](artifacts/artifact-2/src/decisions.png)

#### How does this design support the intent and value defined in your Assignment 1?  

Das Design des ersten Wireframes ist die “Login-Maske” für registrierte Gefährten. Durch das Login haben wir erstens direkten Zugang zu den Inhalten des Rucksacks, zweitens sind sie auch vor ungewollten Mitbenutzern geschützt. Unser Wireframe setzt auf eine strikte biometrische Authentifizierung (Fingerabdruck-Scan). Da Passwörter von Dritten belauscht oder erraten werden könnten, bietet der biometrische Zugang die absolut höchste Sicherheit. Gollum z.B. kann das System nicht öffnen, keine Rationen fälschen und keinen Zugriff auf den Proviantbeutel erlangen. Das große Schloss-Symbol und das Fingerabdruck-Symbol visualisieren diese kompromisslose Sicherheit.  
Außerdem gibt die Hinweismeldung die Information, dass eine Registrierung nicht ohne einen autorisierten Gefährten möglich ist. Das Design ist simpel gehalten, da in einer Umgebung mit toxischen Dämpfen und Hitze, sowie bei mentaler und/oder physischer Erschöpfung von uns Gefährten kognitive Anstrengung nicht von Vorteil ist. Die Schrift ist auch deswegen groß gehalten. Der Fingerabdruck ist mittig platziert, damit er füruns alle ersichtlich ist und gut benutzt werden kann.  
Die klare Statusmeldung („Status: Wartet auf Authentifizierung“) und der Hinweis unten („Registrierung nur durch autorisierte Gefährten“) stellen sicher, dass es ein in sich geschlossenes, sicheres System ist, was objektives Vertrauen zwischen den uns als Gefährten fördert.

#### What did you deliberately leave out?  

Auf dem Login-Screen gibt es keine Passwort-Eingabe und keinen “Passwort vergessen?”-Button, weil wir uns bewusst gegen ein passwortgeschütztes System entschieden haben. Die Gründe dafür sind, dass man auf so einer anstrengenden Reise eher einfache Passwörter verwendet, weil man sonst Gefahr läuft, sie zu vergessen.  Einfache Passwörter können von anderen schnell erraten werden. So können wir unsere Gedächtnisleistung für die Reise aufsparen. Daher gibt es auch keinen Nummernblock für eine PIN-Eingabe und keine Textfelder zur Passworteingabe.  
Es gibt auch keinen Gast-Zugang oder “Skip”-Button, damit der Weg des autorisierten Logins auf keinen Fall umgangen werden kann. Die harte Barriere schützt die “WayBread Watcher"-Datenbank.

#### What assumptions or constraints influenced your design?  

Der Screen ist visuell sehr übersichtlich und kontrastreich gestaltet, damit man ihn auch im Dark-Mode verwenden kann. Dadurch wird das Risiko, von Feinden entdeckt zu werden, minimiert.  
Der Status “Wartet auf Authentifizierung” impliziert, dass das System lokal arbeitet, weil es keine Ladebalken gibt, die “Verbinde mit dem Server” anzeigen. Egal, ob es in Mittelerde eine gute Internetverbindung gibt oder nicht, kann das Gerät lokal und offline betrieben werden, sodass der Nahrungsversorgung nichts im Weg steht.  
Die freundliche Sprache senkt unsere Hemmschwelle, da wir nicht technikvertraut sind, und baut das nötige Vertrauen in die Maschine auf.  
Außerdem kann der Rucksack auch bei großer Erschöpfung und zittrigen Händen bedient werden, da die Buttons groß gehalten sind.  



