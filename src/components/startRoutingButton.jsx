import React from 'react'
import {Button, Icon, useStore } from 'framework7-react'
import store from '../js/store'

const RoutingButton = () =>{
    
  //open Panel only if a Route is present
  const destination = useStore('destination')
  function startRouting(){
    if(destination != null){
      store.dispatch('openRoutePanel')
    }
  }
    
  return (
    <div style={{zIndex: 1000, position: 'absolute', bottom: '25px', right: '15px'}}>        
      <Button fill raised 
        onClick={() => {startRouting()}}
        disabled={!destination}>
        <Icon size='18' f7='arrow_branch'></Icon>
      </Button>
    </div>)
}
  
export default RoutingButton