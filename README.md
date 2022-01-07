# DHBW Maps | Der Kartenservice
### ⚠️ Achtung ⚠️
Wir nutzen für die Berechnung der Route einen kostenlosen Demoserver, der nicht für Production geeignet ist. Dieser ist nicht hochverfügbar und kann zeitweise ausfallen.
## Rahmenbedingungen
Entwicklung der Anwendung im Rahmen der Vorlesung **Web Engineering**.  
Ziel der Aufgabenstellung war die Entwicklung einer Web Applikation in Form einer PWA, welche eine Karte darstellt, auf welcher der Nutzer seine Position einsehen kann. Der Nutzer kann dann Orte suchen, zu welchen er eine Navigation starten und einen Auszug des dazugehörigen Wikipedia-Artikels einsehen kann.
## Verwendete Technologien
- React/JSX
- Framework7
- Leaflet
- Wikipedia API
## Beschreibung der Anwendung
### Beschreibung der Funktionalitäten
- Karte im Vollbildformat mit der Möglichkeit, diese zu vergrößern/verkleinern/verschieben
  - Ansicht des eigenen Standorts (bei deaktivierten Standortdiensten der Standort der DHBW)
  - Anzeige des Zielstandorts mit Route (wenn angefordert)  
- Zentrale Suchleiste mit Verlauf zur Suche
  - nach Orten, z.B. `Berlin`, `Hamburg`, ...
  - nach Adressen, z.B. `Fallenbrunnen 2, 88045 Friedrichshafen`, ...
  - und nach Geokoordinaten, z.B. `49.79899569636492, 9.939880371093752`.
  - Der Verlauf wird außerdem lokal gesichert und die Suche lässt sich offline wiederholen.
- Nach Eingabe einer Suche öffnet sich links eine Side-Card mit Informationen zu dem Ort und der Möglichkeit die Route dorthin zu starten oder die dazugehörige Wikipedia-Seite aufzurufen
- Starten einer Route öffnet rechte Side-Card mit einer Routen-Beschreibung
- Alle Side-Cards können durch Klicken auf die Karte verlassen werden und über folgende Buttons wieder eingeblendet werden
- Benachrichtigungen können über den "Glocke"-Button deaktiviert/aktiviert werden und erinnern den Nutzer, wenn nötig, in regelmäßigen Abständen seinen Standort dauerhaft zu aktivieren
- Folgende Funktionalitäten sind am oberen Bildschirmrand über Buttons gegeben (von links nach rechts):
  - Plus/Minus-Button: Vergrößern und Verkleinern der Karte
  - Lupen-Button: Suchen des eingegebenen Standortes (und Öffnen der dazugehörigen Informationen mit Anzeige auf der Karte)
- Folgende Funktionalitäten sind am unteren Bildschirmrand über Buttons gegeben (von links nach rechts):
  - Info-Button: Information zum Zielstandort
  - Pfeil-Button: Informationen zum aktuellen Standort
  - Zentrieren-Button: Fokus der Karte auf aktuelle Position/Route und Aktualisieren des eigenen Standortes
  - Glocke-Button: (De)Aktivieren von Benachrichtigungen
  - Route-Button: Einblenden der aktuellen Wegbeschreibung
### Screenshots
![image](https://user-images.githubusercontent.com/28830219/148594459-a1c418c8-b023-440a-aaa3-391770b8c763.png)
![image](https://user-images.githubusercontent.com/28830219/148594523-19e68566-bc35-45e5-8139-d13f4ba295ac.png)
![image](https://user-images.githubusercontent.com/28830219/148594625-b6ecdbf3-0415-4fff-86d0-084819f91e9a.png)
![image](https://user-images.githubusercontent.com/28830219/148594692-02beb32e-cbfd-4f2b-8ee6-dd74608e5734.png)

## Ausführen der Anwendung
### Lokal
1. Repository klonen
2. Dependencies installieren `npm install`
3. Development Server starten `npm start`
4. Seite im Browser öffnen
### Online
[Seite im Browser aufrufen](https://webeng.fwapis.com/)
### Anmerkung
Um die volle Funktionalität der Seite (vor allem nach Versionsänderungen) zu gewährleisten, sollte der Zwischenspeicher zu Beginn geleert werden:  
z.B. in Chrome: Inspect :arrow_right: Application :arrow_right: Storage :arrow_right: Clear Site Data :arrow_right: Seite neu laden

## Entwickler
Alle Entwickler sind Studenten des TIT19-Kurses der DHBW Ravensburg/Campus Friedrichshafen
- Manuel Bonke
- Greta Buckenmaier
- Jakob Däubel
- Mirijam Flüs
- Moritz Gärtner
- Julius Henle
- Niklas Leinz
- Gary Lude
- Lars Strölin
- Finn Weiler (Scrum Master)
- Kai Weinmann
- Julian Basri Yaman (Scrum Master)

## Known Issues
- Es gibt in der Leaflet Routing Machine Bibliothek eine [known Issue](https://github.com/mapbox/owlviewer/issues/21), die gelegentlich eine Fehlermeldung in der Konsole produziert. Das schränkt die Funktion unserer Anwendung allerdings nicht weiter ein. 
- Leider wird das Anzeigen von Benachrichtigungen von den folgdenen Browser nicht unterstützt:
  - Safari
  - Safari on iOS
  - WebView Android
  - Internet Explorer
