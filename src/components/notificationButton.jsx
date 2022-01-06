import React, { useState, useEffect } from 'react'
import { Block, List, ListItem, Button, Icon } from 'framework7-react'
import notification_bell from '../notification_icons/bell_icon.png'
import location_icon from '../notification_icons/gps_icon.png' // relative path to image 

//class to handle all notficiations
class NotificationButton extends React.Component{
  constructor (){
    super()

    //default = no notifications 
    this.state = {
      notification_activate: false
    }

    //bind this to the toggle_notifications function
    this.toggle_notifications = this.toggle_notifications.bind(this)     
  }

  //send a notification
  async notify (titel, body, icon, click_function) {
    //ask for permission if not already granted
    const result = await Notification.requestPermission()
    if (result === 'granted') {
      new Notification(titel, {
        body: body,
        icon: icon,
      }).onclick = click_function
    }
  }

  //called periodically to send a notification if the location permission is not granted permanently 
  async notify_check(){
    //check the location permission state
    let permission_state
    await navigator.permissions.query({
      name: 'geolocation'
    }).then(permission =>
      permission_state = permission.state           
    )
    
    //define a function to open the location prompt
    let click_function = function() {
      navigator.geolocation.getCurrentPosition(() => {})
    }

    //send a message based on the permission state
    if(permission_state === 'denied'){
      this.notify('Du hast den Standortzugriff verweigert!',
        'Bitte aktiviere den Standortzugriff, um eine sinnvolle Routenplanung zu erhalten.',
        location_icon,
        click_function)
    }
    else if (permission_state === 'prompt'){
      this.notify('Tipp: Nutzung vereinfachen!',
        'Um eine schnelle Nutzung zu ermöglichen, erlaube einen dauerhaften Zugriff auf deinen Standort.',
        location_icon,
        click_function)
    } 
  }

  toggle_notifications(){   
    if(!this.state.notification_activate)
    {
      //send notification if notifications get activated
      this.notify('Benachrichtigungen aktiviert!',
        'Vielen Dank für das Aktivieren der Benachrichtigungen.',
        notification_bell,
        null)
      
      // call notify_check every 5 Minutes
      this.interval = setInterval(() => {
        this.notify_check()
      }, 300000)
    }
    else{
      //deactivate the periodically call of notify_check
      clearInterval(this.interval)
    }
    
    //change the state variable to change the icon
    this.setState(
      prevState => {
        return {
          notification_activate: !prevState.notification_activate,
        }
      }
    )
  }

  render(){
    //change button icon based on the notification status
    let bell_icon = 'bell_slash_fill'
    if(this.state.notification_activate){
      bell_icon = 'bell_fill'
    }
    return (
      <div style={{zIndex: 1000, position: 'absolute', left: '45px', bottom: '5px'}}>        
        <Button fill raised 
          onClick={() => {this.toggle_notifications()}}>
          <Icon size='18' f7={bell_icon}></Icon>
        </Button>
      </div>
    )
  }
}

export default NotificationButton