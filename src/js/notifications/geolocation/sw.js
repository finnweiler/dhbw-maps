self.addEventListener('notificationclick', function (event) {
  event.notification.close()
  self.clients.matchAll({includeUncontrolled: true}).then(function (clients) {
    if (clients && clients.length) {
      //Respond to last focused tab
      clients[0].postMessage({type: 'notification_geolocation'});
    }
  })
})