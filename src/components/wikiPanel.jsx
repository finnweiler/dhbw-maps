import React, { useEffect, useState } from 'react'
import { Panel, View, Page, Navbar, Block, BlockTitle, Button, Icon, Preloader, useStore } from 'framework7-react'
import localforage from 'localforage'
import store from '../js/store'

const WikiPanel = () => {

  //    this.state = {
  //      panelOpened: false,
  //      loadedData: false,
  //      currentEntry: null,
  //    }
  //  }

  //  componentDidMount() {
  //    this.UpdatePanelOpenedState()
  //  }

  const [currentEntry, setCurrentEntry] = useState(null)
  const isPanelOpen = useStore('isWikiPanelOpen')

  useEffect(() => {
    console.log(isPanelOpen)

  }, [isPanelOpen])

 // useEffect(() => {
 //   UpdatePanelOpenedState()
 // }, []
  //)

 // const UpdatePanelOpenedState = async () => {
 //   let panelOpened = await localforage.getItem('wikiPanelOpened')
 //   this.setState({panelOpened: panelOpened}, () => {
 //     setTimeout(() => this.UpdatePanelOpenedState(), 200)
 //   })
 // }
  
  const PanelClosing = () => {
    //this.setState({
    //  panelOpened: false,
    //  loadedData: false
    //})
    store.dispatch('closeWikiPanel')
  }

  const PanelOpening = async () => {
    setCurrentEntry(await localforage.getItem('currentSearchHistoryEntry'))
    store.dispatch('openWikiPanel')
    //this.setState({currentEntry: currentSearchHistoryEntry}, () => {
    //  this.setState({loadedData: true})
    //})
  }

  const OpenWikipedia = () => {
    window.open(currentEntry.wikiData.url, '_blank')
  }
  const StartRoute = () =>{
    const position = {
      lat: currentEntry.lat,
      lng: currentEntry.lon
    }
    
    store.dispatch('newAddress', position)
  }
  
  
  return (
    <Panel
      left
      cover
      themeDark
      opened={isPanelOpen}
      onPanelOpened={() => {PanelOpening()}}
      onPanelClose={() => {PanelClosing()}}
    >
      <View>
        <Page>
          {currentEntry != null ?
            <React.Fragment>
              <Navbar title={currentEntry.city}/>
              <Block>
                <BlockTitle>Adresse</BlockTitle>
                <Block><p>{currentEntry.address}</p></Block>
                <Button fill raised
                  style={{marginTop: '10px', marginBottom: '10px'}}
                  onClick={() => {StartRoute()}}
                ><Icon f7="location" size="18" style={{marginRight: '10px'}} />Route starten</Button>
                {currentEntry.wikiData != 'not found' ? 
                  <React.Fragment>
                    <img src={currentEntry.wikiData.image} width='225' />
                    <BlockTitle>{currentEntry.city}</BlockTitle>
                    <Block strong>
                      <p>{'Land: ' +currentEntry.wikiData.country}</p>
                      <p>{'Postleitzahl: ' + currentEntry.wikiData.postalCodes}</p>
                      <p>{'Einwohnerzahl: ' + currentEntry.wikiData.population}</p>
                      <p>{'Bürgermeister: ' + currentEntry.wikiData.mayor}</p>
                    </Block>
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
              <Navbar title='Ziel'/>
              <Block>
                <Block strong className="text-align-center">
                  <Preloader color="blue" />
                </Block>
              </Block>
            </React.Fragment>
          }
        </Page>
      </View>
    </Panel>
  )
  
}
export default WikiPanel