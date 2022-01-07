# LocationBasedService
## Rahmenbedingungen
Entwicklung der Anwendung im Rahmen der Vorlesung **Web Engineering**.  
Ziel der Aufgabenstellung war die Entwicklung einer Web Applikation in Form einer PWA, welche eine Karte darstellt, auf welcher der Nutzer seine Position einsehen kann. Der Nutzer kann dann Orte suchen, zu welchen er eine Navigation starten und einen Auszug des dazugehörigen Wikipedia-Artikels einsehen kann.
## Verwendete Technologien
- React/JSX
- Framework7
- Leaflet
- Wikipedia API
- Discord (Kommunikation)
## Beschreibung der Anwendung
### Beschreibung der Funktionalitäten
- Karte im Vollbildformat mit der Möglichkeit, diese zu vergrößern/verkleinern/verschieben
  - Ansicht des eigenen Standorts (bei deaktivierten Standortdiensten der Standort der DHBW)
  - Anzeige des Zielstandorts mit Route (wenn angefordert)  
- Zentrale Suchleiste mit Search History zur Suche nach Orten
- Nach Eingabe einer Suche öffnet sich links eine Side Card mit Informationen zu dem Ort und der Möglichkeit die Route dorthin zu starten oder die dazugehörige Wikipedia-Seite aufzurufen
- Starten einer Route öffnet rechte Side Card mit Routen-Beschreibung
- Alle Side Cards können durch Klicken auf die Karte verlassen werden und über folgende Buttons wieder eingeblendet werden
- Benachrichtigungen können über den "Glocke"-Button deaktiviert/aktiviert werden und erinnern den Nutzer, wenn nötig, in regelmäßigen Abständen seinen Standort dauerhaft zu aktivieren
- Folgende Funktionalitäten sind am oberen Bildschirmrand über Buttons gegeben (von links nach rechts):
  - Plus/Minus-Button: Vergrößern und Verkleinern der Karte
  - Lupen-Button: Suchen des eingegebenen Standortes (und Öffnen der dazugehörigen Informationen mit Anzeige auf der Karte)
- Folgende Funktionalitäten sind am unteren Bildschirmrand über Buttons gegeben (von links nach rechts):
  - Info-Button: Information zum Zielstandort
  - Pfeil-Button: Informationen zum aktuellen Standort
  - Zentrieren-Button: Fokus der Karte auf aktuelle Position/Route
  - Glocke-Button: (De)Aktivieren von Benachrichtigungen
  - Route-Button: Einblenden der aktuellen Wegbeschreibung
### Screenshots
<img src="readme-screenshots/Screenshot_main_page.png" width=252 height=264> <img src="readme-screenshots/Screenshot_left_card.png" width=98 height=264> <img src="readme-screenshots/Screenshot_right_card.png" width=98 height=264>
## Ausführen der Anwendung
### Lokal
1. Repository klonen
2. Dependencies installieren `npm install`
3. Development Server starten `npm start`
4. [Seite im Browser öffnen](http://localhost:3000/)
### Online
[Seite im Browser aufrufen](https://webeng.fwapis.com/)

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
