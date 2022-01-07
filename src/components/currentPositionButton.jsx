import React from 'react'
import {Button, Icon } from 'framework7-react'
import store from '../js/store'

const CurrentPositionButton = () =>{

  function refreshPosition(){
    store.dispatch('newReloadPosition')
  }
  
  return (
    <div style={{zIndex: 1000, position: 'absolute', bottom: '25px', left: '95px'}}>        
      <Button fill raised
        onClick={() => {refreshPosition()}}>
        <Icon size='18' f7='location_circle'></Icon>
      </Button>
    </div>
  )
}

export default CurrentPositionButton