import React, { useEffect, useState } from 'react'
import { Panel, View, Page, Navbar, Block, BlockTitle, Button, Icon, Preloader, useStore } from 'framework7-react'
import localforage from 'localforage'
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
    store.dispatch('newDestination', position)
    store.dispatch('openRoutePanel')
    store.dispatch('newReloadMap', position)
  }

  function startEqualsEnd() {
    console.log('start', start, 'end', currentEntry.coords)
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
                    <BlockTitle>Mehr Infos zur {currentEntry.city}</BlockTitle>
                    <Block strong>
                      <p>{'Land: ' +currentEntry.wikiData.country}</p>
                      <p>{'Postleitzahl: ' + currentEntry.wikiData.postalCodes}</p>
                      <p>{'Einwohnerzahl: ' + currentEntry.wikiData.population}</p>
                      <p>{'Bürgermeister: ' + currentEntry.wikiData.mayor}</p>
                    </Block>
                    <img src={currentEntry.wikiData.image} width='225' />
                    <Block><p>{currentEntry.wikiData.summary}</p></Block>
                    <Button fill raised onClick={() => {OpenWikipedia()}}>
                      <Icon f7='info_circle' size='18' style={{marginRight: '10px'}} />Mehr lesen
                    </Button>
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
