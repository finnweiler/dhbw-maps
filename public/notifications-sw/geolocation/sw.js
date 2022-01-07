self.addEventListener('notificationclick', function (event) {
  //close the notification
  event.notification.close()

  //send the click event to the client
  self.clients.matchAll({includeUncontrolled: true}).then(function (clients) {
    if (clients && clients.length) {
      //Respond to last focused tab
      clients[0].postMessage({type: 'notification_geolocation'})
    }
  })
})
