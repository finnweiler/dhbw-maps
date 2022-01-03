import React from 'react'
import { Panel, View, Page, Navbar, Block, BlockTitle, Button, Icon } from 'framework7-react'
//import getWikiData from '../js/wikipedia'

class WikiPanel extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      city: props.city,
      wikiData: {
        population: '13437',
        area: '90.56',
        country: 'Deutschland',
        postalCodes: '88630',
        url: 'https://de.wikipedia.org/wiki/Pfullendorf',
        mayor: 'Thomas Kugler',
        website: 'https://pfullendorf.de/',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Pfullendorf_Innenstadt_-_St._Jakob_im_Stadtbild.JPG/1280px-Pfullendorf_Innenstadt_-_St._Jakob_im_Stadtbild.JPG',
        summary: 'Pfullendorf ist eine Kleinstadt im baden-württembergischen Landkreis Sigmaringen. Pfullendorf erhielt 1220 das Stadtrecht und war von 1282 bis 1803 freie Reichsstadt....'
      }
    }
    
    //this.setWikiData()
  }

  /*setWikiData = async () => {
    let wikiData = await getWikiData(this.state.city)
    this.setState({wikiData: wikiData})
  }*/

  OpenWikipedia = () => {
    window.open(this.state.wikiData.url, '_blank')
  }
  StartRoute = () =>{
    window.open('https://www.ravensburg.dhbw.de/fileadmin/Ravensburg/Dokumente_Bilder_Contentbereich/Pruefungsamt/DHBW_RV_Pruefungsamt_Exmatrikulation_Antrag.pdf')
  }
  
  render() {
    return (
      <Panel left cover themeDark>
        <View>
          <Page>
            <Navbar title='Left Panel'/>
            <Block>
              <img src={this.state.wikiData.image} width="225" />
              <BlockTitle>{this.state.city}</BlockTitle>
              <Block strong>
                <p>{'Land: ' + this.state.wikiData.country}</p>
                <p>{'Postleitzahl: ' + this.state.wikiData.postalCodes}</p>
                <p>{'Einwohnerzahl: ' + this.state.wikiData.population}</p>
                <p>{'Bürgermeister: ' + this.state.wikiData.mayor}</p>
              </Block>
              <Block><p>{this.state.wikiData.summary}</p></Block>
              <Button fill raised
                onClick={() => {this.OpenWikipedia()}}
              ><Icon f7="info_circle" size="18" style={{marginRight: '10px'}} />Mehr lesen</Button>
              <Button fill raised
                style={{marginTop: '10px'}}
                onClick={() => {this.StartRoute()}}
              ><Icon f7="location" size="18" style={{marginRight: '10px'}} />Route starten</Button>
            </Block>
          </Page>
        </View>
      </Panel>
    )
  }
}
  
export default WikiPanel