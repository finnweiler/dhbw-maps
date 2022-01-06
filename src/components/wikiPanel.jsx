import React from 'react'
import { Panel, View, Page, Navbar, Block, BlockTitle, Button, Icon, Preloader } from 'framework7-react'
import localforage from 'localforage'
import store from '../js/store'

class WikiPanel extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      panelOpened: false,
      loadedData: false,
      currentEntry: null,
    }
  }

  componentDidMount() {
    this.UpdatePanelOpenedState()
  }

  UpdatePanelOpenedState = async () => {
    let panelOpened = await localforage.getItem('wikiPanelOpened')
    this.setState({panelOpened: panelOpened}, () => {
      setTimeout(() => this.UpdatePanelOpenedState(), 200)
    })
  }
  
  PanelClosing = () => {
    this.setState({
      panelOpened: false,
      loadedData: false
    })
    localforage.setItem('wikiPanelOpened', false)
  }

  PanelOpening = async () => {
    let currentSearchHistoryEntry = await localforage.getItem('currentSearchHistoryEntry')
    this.setState({currentEntry: currentSearchHistoryEntry}, () => {
      this.setState({loadedData: true})
    })
  }

  OpenWikipedia = () => {
    window.open(this.state.currentEntry.wikiData.url, '_blank')
  }
  StartRoute = () =>{
    const position = {
      lat: this.state.currentEntry.lat,
      lng: this.state.currentEntry.lon
    }
    
    store.dispatch('newAddress', position)
  }
  
  render() {
    return (
      <Panel
        left
        cover
        themeDark
        opened={this.state.panelOpened}
        onPanelOpened={() => {this.PanelOpening()}}
        onPanelClose={() => {this.PanelClosing()}}
      >
        <View>
          <Page>
            {this.state.loadedData ?
              <React.Fragment>
                <Navbar title={this.state.currentEntry.city}/>
                <Block>
                  <BlockTitle>Adresse</BlockTitle>
                  <Block><p>{this.state.currentEntry.address}</p></Block>
                  <Button fill raised
                    style={{marginTop: '10px', marginBottom: '10px'}}
                    onClick={() => {this.StartRoute()}}
                  ><Icon f7="location" size="18" style={{marginRight: '10px'}} />Route starten</Button>
                  {this.state.currentEntry.wikiData != 'not found' ? 
                    <React.Fragment>
                      <img src={this.state.currentEntry.wikiData.image} width='225' />
                      <BlockTitle>{this.state.currentEntry.city}</BlockTitle>
                      <Block strong>
                        <p>{'Land: ' + this.state.currentEntry.wikiData.country}</p>
                        <p>{'Postleitzahl: ' + this.state.currentEntry.wikiData.postalCodes}</p>
                        <p>{'Einwohnerzahl: ' + this.state.currentEntry.wikiData.population}</p>
                        <p>{'Bürgermeister: ' + this.state.currentEntry.wikiData.mayor}</p>
                      </Block>
                      <Block><p>{this.state.currentEntry.wikiData.summary}</p></Block>
                      <Button fill raised onClick={() => {this.OpenWikipedia()}}>
                        <Icon f7='info_circle' size='18' style={{marginRight: '10px'}} />Mehr lesen
                      </Button>
                    </React.Fragment>
                    : 
                    <Block><p>{ this.state.currentEntry.city + ' hat keinen Wikipedia Eintrag'}</p></Block>}
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
}
export default WikiPanel