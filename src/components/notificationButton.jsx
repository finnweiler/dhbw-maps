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

    //register service workers for handling the notifications
    //one service worker for an distinct event
    navigator.serviceWorker.register('./../js/notifications/geolocation/sw.js')
    navigator.serviceWorker.register('./../js/notifications/other/sw.js')

    //listen to messages from the service workers
    navigator.serviceWorker.onmessage = (event) => {
      if (event.data && event.data.type === 'notification_geolocation') {
        //open the geolocation prompt
        navigator.geolocation.getCurrentPosition(() => {})
      }
    }

    //bind this to the toggle_notifications function
    this.toggle_notifications = this.toggle_notifications.bind(this)     
  }

  //send a notification
  async notify (titel, body, icon, service_worker_url) {
    //ask for permission if not already granted
    const result = await Notification.requestPermission()
    if (result === 'granted') {
      //send a notification with the specified service worker
      return await navigator.serviceWorker.getRegistration(service_worker_url).then(function(registration) {
        if(registration != null && registration.active != null){
          registration.showNotification(titel, {
            body: body,
            icon: icon
          })
          return true
        }
        else{
          return false       
        }
      })
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

    //send a message based on the permission state
    if(permission_state === 'denied'){
      this.notify('Du hast den Standortzugriff verweigert!',
        'Bitte aktiviere den Standortzugriff, um eine sinnvolle Routenplanung zu erhalten.',
        location_icon,
        'js/notifications/geolocation/')
    }
    else if (permission_state === 'prompt'){
      this.notify('Tipp: Nutzung vereinfachen!',
        'Um eine schnelle Nutzung zu ermöglichen, erlaube einen dauerhaften Zugriff auf deinen Standort.',
        location_icon,
        'js/notifications/geolocation/')
    } 
  }

  //try to send the "activated notifications" message
  //retry up to (default) 5 times with a spacing of 1 second (needed if the service worker is not installed at the beginning) 
  async send_activated_notfication(max_tries=5){
    console.log(max_tries)
    let return_value = await this.notify('Benachrichtigungen aktiviert!',
      'Vielen Dank für das Aktivieren der Benachrichtigungen.',
      notification_bell,
      'js/notifications/other/')
    if(max_tries > 0 && !return_value){
      setTimeout(this.send_activated_notfication.bind(this), 1000, max_tries-1)
    }
  }

  async toggle_notifications(){   
    if(!this.state.notification_activate)
    {
      //send notification if notifications get activated
      this.send_activated_notfication()

      // call notify_check every 5 Minutes
      this.interval = setInterval(() => {
        this.notify_check()
      }, 5000)
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
      <div style={{zIndex: 1000, position: 'absolute', right: '55px', bottom: '25px'}}>        
        <Button fill raised 
          onClick={() => {this.toggle_notifications()}}>
          <Icon size='18' f7={bell_icon}></Icon>
        </Button>
      </div>
    )
  }
}

export default NotificationButton