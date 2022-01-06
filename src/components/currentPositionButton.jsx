import React from 'react'
import {Button, Icon, useStore } from 'framework7-react'
import store from '../js/store'

const CurrentPositionButton = () =>{
    
  const position = useStore('currentPosition')

  function showWikipedia(){
    store.dispatch('openWikiPanel')
  }
  
  return (
    <div style={{zIndex: 1000, position: 'absolute', bottom: '25px', left: '55px'}}>        
      <Button fill raised
        onClick={() => {showWikipedia()}}>
        <Icon size='18' f7='location'></Icon>
      </Button>
    </div>
  )
}

export default CurrentPositionButton