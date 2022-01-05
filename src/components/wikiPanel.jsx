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
      wikiData: { //Example
        area: '90.56',
        country: 'Deutschland',
        image: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Pfullendorf_Innenstadt_-_St._Jakob_im_Stadtbild.JPG',
        mayor: 'Thomas Kugler',
        population: '13437',
        postalCodes: '88630',
        summary: 'Pfullendorf ist eine Kleinstadt im baden-württembergischen Landkreis Sigmaringen. Pfullendorf erhielt 1220 das Stadtrecht und war von 1282 bis 1803 freie Reichsstadt....',
        url: 'https://en.wikipedia.org/wiki/Pfullendorf',
        website: 'http://www.pfullendorf.de/'
      }
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
    this.setState({wikiData: currentSearchHistoryEntry.wikiData}, () => {
      this.setState({loadedData: true})
    })
  }

  OpenWikipedia = () => {
    window.open(this.state.wikiData.url, '_blank')
  }
  StartRoute = () =>{
    const position = {
      lat: this.state.wikiData.lat,
      lng: this.state.wikiData.lon
    }
    
    store.dispatch('newAddress', position)
    // window.open('https://www.ravensburg.dhbw.de/fileadmin/Ravensburg/Dokumente_Bilder_Contentbereich/Pruefungsamt/DHBW_RV_Pruefungsamt_Exmatrikulation_Antrag.pdf')
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
            <Navbar title={this.state.wikiData.city}/>
            {this.state.loadedData ?
              <Block>
                <BlockTitle>Adresse</BlockTitle>
                <Block><p>{this.state.wikiData.address}</p></Block>
                <Button fill raised
                  style={{marginTop: '10px'}}
                  onClick={() => {this.StartRoute()}}
                ><Icon f7="location" size="18" style={{marginRight: '10px'}} />Route starten</Button>
                <img src={this.state.wikiData.image} width='225' />
                <BlockTitle>{this.state.wikiData.city}</BlockTitle>
                <Block strong>
                  <p>{'Land: ' + this.state.wikiData.country}</p>
                  <p>{'Postleitzahl: ' + this.state.wikiData.postalCodes}</p>
                  <p>{'Einwohnerzahl: ' + this.state.wikiData.population}</p>
                  <p>{'Bürgermeister: ' + this.state.wikiData.mayor}</p>
                </Block>
                <Block><p>{this.state.wikiData.summary}</p></Block>
                <Button fill raised
                  onClick={() => {this.OpenWikipedia()}}
                ><Icon f7='escape' size='18' style={{marginRight: '10px'}} />Mehr lesen</Button>
              </Block>
              :
              <Block>
                <Block strong className="text-align-center">
                  <Preloader color="blue" />
                </Block>
                <Block><p>{this.state.wikiData.summary}</p></Block>
                <Button fill raised
                  onClick={() => {this.OpenWikipedia()}}
                ><Icon f7="info_circle" size="18" style={{marginRight: '10px'}} />Mehr lesen</Button>
              </Block>
            }
          </Page>
        </View>
      </Panel>
    )
  }
}
export default WikiPanel