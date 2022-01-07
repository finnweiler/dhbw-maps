self.addEventListener('notificationclick', function (event) {
  //only close the notification if clicked
  event.notification.close()
})
