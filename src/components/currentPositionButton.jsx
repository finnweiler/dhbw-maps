import React from 'react'
import {Button, Icon, useStore } from 'framework7-react'
import store from '../js/store'

const CurrentPositionButton = () =>{
    
  const destination = useStore('address')

  function showWikipedia(){
    store.dispatch('wikiPanelOpened', true)
    }
    
    return (
      <div style={{zIndex: 1000, position: 'absolute', bottom: '25px', right: '135px'}}>        
        <Button fill raised
          onClick={() => {showWikipedia()}}>
          <Icon size='18' f7='arrow_branch'></Icon>
        </Button>
      </div>)
  }
  
  export default CurrentPositionButton