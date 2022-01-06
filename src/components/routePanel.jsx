import React from 'react'
import L from 'leaflet'
import { Panel, View, Page, Navbar, Block, BlockTitle, useStore } from 'framework7-react'
import store from '../js/store'


const RoutePanel = () => {

  const route = useStore('route')
  const panelOpened = useStore('panelOpened')

  const formatter = new L.Routing.Formatter({language: 'de'})

  function PanelClosing() {
    store.dispatch('newPanelOpened', false)
  }


  return (
    <Panel
      right
      cover
      themeDark
      opened={panelOpened}
      onPanelClose={() => {PanelClosing()}}
    >
      <View>
        <Page>
          <Navbar title='Wegbeschreibung'/>
          <Block>
            <BlockTitle>{route?.name}</BlockTitle>
            <Block strong>
              <BlockTitle>Zusammenfassung</BlockTitle>
              <p>Distanz: {formatter.formatDistance(route?.summary.totalDistance, 10)}</p>
              <p>Zeit: {formatter.formatTime(route?.summary.totalTime)}</p>
            </Block>
            <Block strong>
              <BlockTitle>Wegbeschreibung</BlockTitle>
              {route?.instructions?.map((instruction, i) => {
                return (
                  <p key={instruction+i}>{i+1}. {formatter.formatInstruction(instruction)}</p>
                )
              })}
            </Block>
          </Block>
        </Page>
      </View>
    </Panel>
  )
}


export default RoutePanel
