import React from 'react'
import {Button, Icon, useStore } from 'framework7-react'
import store from '../js/store'

const WikipediaButton = () =>{
    
  const destination = useStore('address')

  function showWikipedia(){
    if(destination != null){
      store.dispatch('openWikiPanel')
    }
  }
    
  return (
    <div style={{zIndex: 1000, position: 'absolute', bottom: '25px', right: '95px'}}>        
      <Button fill raised 
        panelOpen="left"
        onClick={() => {showWikipedia()}}
        disabled={!destination}>
        <Icon size='18' f7='globe'></Icon>
      </Button>
    </div>
  )
}

export default WikipediaButton