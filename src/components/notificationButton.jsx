import React, { useState, useEffect } from 'react'
import { Block, List, ListItem, Button, Icon } from 'framework7-react'
import notification_bell from '../notification_icons/bell_icon.png' // relative path to image 

class NotificationButton extends React.Component{
  constructor (){
    super()
    this.state = {
      notification_activate: false
    }
        
    this.toggle_notifications = this.toggle_notifications.bind(this)
      
  }

  async notify (titel, body, icon) {
    console.log('Test')
    const result = await Notification.requestPermission()
    if (result === 'granted') {
      new Notification(titel, {
        body: body,
        icon: icon
      })
    }
  }

  async notify_check(){
    if (this.state.notification_activate){
      this.notify('Test', 'Body', '')
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.notify_check()
    }, 5000)
  }
  
  componentWillUnmount() {
    clearInterval(this.interval)
  }

  toggle_notifications(){
    console.log('hier')
    this.notify('Benachrichtigungen aktiviert!',
      'Vielen Dank für das Aktivieren der Benachrichtigungen.',
      notification_bell)
    this.setState(
      prevState => {
        return {
          notification_activate: !prevState.notification_activate,
        }
      }
    )
  }

  render(){
    return (
      <Block>
        <link rel="stylesheet" href="../css/icons.css"></link>
        <Button fill raised 
          onClick={() => {this.toggle_notifications()}}>
        <Icon f7="bell_fill"></Icon></Button>
      </Block>
    )
  }
}

export default NotificationButton