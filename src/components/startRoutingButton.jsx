import React from 'react'
import {Button, Icon, useStore } from 'framework7-react'
import store from '../js/store'

const RoutingButton = () =>{

  const destination = useStore('address')

  function startRouting(){
    if(destination != null){
      store.dispatch('newPanelOpened', true)
    }
  }

  return (
    <div style={{zIndex: 1000, position: 'absolute', bottom: '25px', right: '15px'}}>
      <Button fill raised
        onClick={() => {startRouting()}}
        disabled={!destination}>
        <Icon size='18' f7='location'></Icon>
      </Button>
    </div>)
}

export default RoutingButton
