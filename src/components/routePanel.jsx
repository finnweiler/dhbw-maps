import React from 'react'
import { Panel, View, Page, Navbar, Block, BlockTitle, Button, Icon } from 'framework7-react'
//import getWikiData from '../js/wikipedia'

class RoutePanel extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = { title: "Fallenbrunnen, Klufterner Straße", summary: {"totalDistance":3943.8,"totalTime":398.8}, instructions: [{"type":"Head","distance":19.4,"time":3.9,"road":"Fallenbrunnen","direction":"N","index":0,"mode":"driving","modifier":"Left","text":"Fahren Sie Richtung Nordwesten auf Fallenbrunnen"},{"type":"Right","distance":547.2,"time":81.7,"road":"Fallenbrunnen","direction":"NE","exit":1,"index":3,"mode":"driving","modifier":"Right","text":"Rechts abbiegen auf Fallenbrunnen"},{"type":"EndOfRoad","distance":63.2,"time":9.5,"road":"Sparbruck","direction":"SE","index":25,"mode":"driving","modifier":"Right","text":"Rechts abbiegen auf Sparbruck (L 328b)"},{"type":"Left","distance":800.9,"time":76.3,"road":"Sonnenbergstraße","direction":"NE","index":29,"mode":"driving","modifier":"Left","text":"Links abbiegen auf Sonnenbergstraße (K 7740)"},{"type":"EndOfRoad","distance":994.9,"time":95.2,"road":"Waggershauser Straße","direction":"NE","index":64,"mode":"driving","modifier":"Left","text":"Links abbiegen auf Waggershauser Straße (K 7740)"},{"type":"Right","distance":360.4,"time":38.3,"road":"Colsmanstraße","direction":"S","index":101,"mode":"driving","modifier":"Right","text":"Rechts abbiegen auf Colsmanstraße (K 7739)"},{"type":"Left","distance":353.7,"time":37.8,"road":"Am Sportpark","direction":"S","index":119,"mode":"driving","modifier":"Left","text":"Links abbiegen auf Am Sportpark"},{"type":"Roundabout","distance":19.3,"time":2.1,"road":"Meistershofener Straße","direction":"SE","exit":1,"index":137,"mode":"driving","modifier":"Right","text":"Im Kreisverkehr die erste Ausfahrt nehmen auf Meistershofener Straße (K 7735)"},{"type":"Right","distance":133.5,"time":12,"road":"Meistershofener Straße","direction":"SE","exit":1,"index":143,"mode":"driving","modifier":"Right","text":"Rechts abbiegen auf Meistershofener Straße (K 7735)"},{"type":"Roundabout","distance":24.7,"time":2.5,"road":"Meistershofener Straße","direction":"S","exit":2,"index":153,"mode":"driving","modifier":"SlightRight","text":"Im Kreisverkehr die zweite Ausfahrt nehmen auf Meistershofener Straße (K 7735)"},{"type":"Right","distance":191.1,"time":24.4,"road":"Meistershofener Straße","direction":"SE","exit":2,"index":161,"mode":"driving","modifier":"Right","text":"Rechts abbiegen auf Meistershofener Straße (K 7735)"},{"type":"Left","distance":436,"time":41.7,"road":"Ailinger Straße","direction":"NE","index":175,"mode":"driving","modifier":"Left","text":"Links abbiegen auf Ailinger Straße (L 328a)"},{"type":"Roundabout","distance":9.4,"time":1.1,"road":"Mühlöschstraße","direction":"E","exit":1,"index":192,"mode":"driving","modifier":"Right","text":"Im Kreisverkehr die erste Ausfahrt nehmen auf Mühlöschstraße"},{"type":"Right","distance":417.1,"time":37.4,"road":"Mühlöschstraße","direction":"SE","exit":1,"index":195,"mode":"driving","modifier":"Right","text":"Rechts abbiegen auf Mühlöschstraße"},{"type":"DestinationReached","distance":0,"time":0,"road":"Mühlöschstraße","direction":"N","index":209,"mode":"driving","modifier":"Left","text":"Sie haben Ihr Ziel erreicht, es befindet sich links"}]}

    
    //this.setWikiData()
  }

  /*setWikiData = async () => {
    let wikiData = await getWikiData(this.state.city)
    this.setState({wikiData: wikiData})
  }*/

  OpenWikipedia = () => {
    window.open(this.state.wikiData.url, '_blank')
  }

  render() {
    let i = 0;
    // totalTime Sekunden in Minuten umrechnen und aufrunden
    let totalTime = secondsToTime(this.state.summary.totalTime)
    // totalDistance Meter in Km umrechnen mit X.X km oder bei Meter < 1000 Meter -> 500m
    let totalDistance = meterToMKM(this.state.summary.totalDistance)
    
    console.log(totalTime)
    console.log(totalDistance)
    
    return (
      <Panel right cover themeDark>
        <View>
          <Page>
            <Navbar title='Wegbeschreibung'/>
            <Block>
              <BlockTitle>{this.state.title}</BlockTitle>
              <Block strong>
              <BlockTitle>Zusammenfassung</BlockTitle>
                {/* Hier noch in M / Km umrechnen */}
                <p>Distanz: {totalDistance}</p>
                <p>Zeit: {totalTime}</p>
              </Block>
              <Block strong>
              <BlockTitle>Wegbeschreibung</BlockTitle>
              {this.state.instructions.map(instruction => {
                  i=i+1
                  return (
                      <p key={instruction.text + i} >{i}. {instruction.text}</p>
                      
                  )
                })}
              </Block>
            </Block>
          </Page>
        </View>
      </Panel>
    )
  }
}

function secondsToTime(secs)
{
  let hours = Math.floor(secs / (60 * 60));

  let divisor_for_minutes = secs % (60 * 60);
  let minutes = Math.floor(divisor_for_minutes / 60);

  // let divisor_for_seconds = divisor_for_minutes % 60;
  // let seconds = Math.ceil(divisor_for_seconds);

  let output
  if (hours == 0) {
    output = `${minutes} min`
  } else {
    output = `${hours} h ${minutes} min`
  }

  return output;
}

function meterToMKM(meter)
{
  let output
  if (meter < 1000) {
    // Round on 880 m
    let converted = Math.round(meter / 10) * 10
    output = `${converted} m`
  } else {
    // Round on 1.2 km
    let km = meter / 1000
    let converted = km.toFixed(1)
    output = `${converted} km`
  }

  return output
}
  
export default RoutePanel
