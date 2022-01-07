import React from 'react'
import { Panel, View, Page, Navbar, Block, BlockTitle, Button, Icon, Preloader, useStore } from 'framework7-react'
import store from '../js/store'

const WikiPanel = () => {

  const isPanelOpen = useStore('isWikiPanelOpen')
  const currentEntry = useStore('currentWikiEntry')
  const start = useStore('currentPosition')

  const OpenWikipedia = () => {
    window.open(currentEntry.wikiData.url, '_blank')
  }

  const StartRoute = () =>{
    const position = {
      lat: currentEntry.coords.lat,
      lng: currentEntry.coords.lng
    }
    store.dispatch('newAddress', position)
    store.dispatch('newPanelOpened', true)
    store.dispatch('newReloadMap', position)
  }

  function startEqualsEnd() {
    // Prüft ob Ziel und Startpunkt identisch sind
    return (start.lat == Number(currentEntry.coords.lat)
      && start.lng == Number(currentEntry.coords.lng))
  }

  return (
    <Panel
      left
      cover
      themeDark
      opened={isPanelOpen}
      onPanelClose={() => {store.dispatch('closeWikiPanel')}}
    >
      <View>
        <Page>
          {currentEntry != null ?
            <React.Fragment>
              {startEqualsEnd() ?
                <Navbar title='Aktuelle Position'/>
                :
                <Navbar title={currentEntry.city}/>
              }
              <Block>
                {startEqualsEnd() ?
                  <BlockTitle>Aktuelle Position</BlockTitle>
                  :
                  <BlockTitle>Ziel-Adresse</BlockTitle>
                }
                <Block>{currentEntry.address}</Block>
                {!startEqualsEnd() ?
                  <Button fill raised
                    style={{marginTop: '10px', marginBottom: '25px'}}
                    onClick={() => {StartRoute()}}
                  ><Icon f7="location" size="18" style={{marginRight: '10px'}} />Route starten</Button>
                  :
                  <div></div>
                }
              </Block>
              <hr />
              <Block>
                {currentEntry.wikiData != 'not found' ?
                  <React.Fragment>
                    {/* Eine Städtenamen sind nicht Eindeutig oder haben mehrere Wikipedia Einträge (disambiguation = true). 
                        In dem Fall werden kein Infos zur Stadt oder Bild gezeigt, sondern auf die Wikipedia Begriffsklärung verwiesen */}
                    {currentEntry.wikiData.disambiguation ? 
                      <React.Fragment>
                        <BlockTitle>Mehr Infos zur {currentEntry.city}</BlockTitle>
                        <Block><p>{currentEntry.wikiData.summary}</p></Block>
                        <Button fill raised onClick={() => {OpenWikipedia()}}>
                          <Icon f7='info_circle' size='18' style={{marginRight: '10px'}} />Begriffsklärung
                        </Button>
                      </React.Fragment>
                      :
                      <React.Fragment>
                        <BlockTitle>Mehr Infos zu {currentEntry.city}</BlockTitle>
                        <Block strong>
                          <p>{'Land: ' + currentEntry.wikiData.country}</p>
                          <p>{'Postleitzahl: ' + currentEntry.wikiData.postalCodes || 'Unbekannt'}</p>
                          <p>{'Einwohnerzahl: ' + currentEntry.wikiData.population || 'Unbekannt'}</p>
                          <p>{'Bürgermeister: ' + currentEntry.wikiData.mayor || 'Unbekannt'}</p>
                        </Block>
                        <img src={currentEntry.wikiData.image} width='225' />
                        <Block><p>{currentEntry.wikiData.summary}</p></Block>
                        <Button fill raised onClick={() => {OpenWikipedia()}}>
                          <Icon f7='info_circle' size='18' style={{marginRight: '10px'}} />Mehr lesen
                        </Button>
                      </React.Fragment>
                    }
                  </React.Fragment>
                  :
                  <Block><p>{ currentEntry.city + ' hat keinen Wikipedia Eintrag'}</p></Block>}
              </Block>
            </React.Fragment>
            :
            <React.Fragment>
              <Navbar title=''/>
              <Block className="text-align-center">
                <Preloader color="blue" />
              </Block>
            </React.Fragment>
          }
        </Page>
      </View>
    </Panel>
  )

}

export default WikiPanel
