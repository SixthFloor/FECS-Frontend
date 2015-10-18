/* global angular */

;(function () {
  angular
    .module('services.notification', ['ui-notification'])
    .config(notification)

  notification.$inject = ['NotificationProvider']

  function notification (NotificationProvider) {
    NotificationProvider.setOptions({
      delay: 5000,
      startTop: 20,
      startRight: 10,
      verticalSpacing: 20,
      horizontalSpacing: 20,
      positionX: 'center',
      positionY: 'top',
      templateUrl: 'templates/notification.tmpl'
    })
  }
})()
