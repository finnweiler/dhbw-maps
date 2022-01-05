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
      <div style={{zIndex: 1000, position: 'absolute', width: '0%', left:'20%', top: '2%', transform: 'translate(-50%,0)'}}>        
        <Button fill raised 
          onClick={() => {startRouting()}}
          disabled={!destination}>
          <Icon f7='location'></Icon>
        </Button>
      </div>)
  }
  
  export default RoutingButton