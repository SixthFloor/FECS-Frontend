/* global angular */

;(function () {
  /**
  * controller.logout Module
  *
  * @author Chinnaporn Soonue
  */
  angular
    .module('controller.logout', [])
    .controller('LogoutController', LogoutController)

  LogoutController.$inject = ['$scope', '$state', 'Notification', 'FECSAuth']
  function LogoutController ($scope, $state, notification, FECSAuth) {
    var self = this

    self.logout = function () {
      FECSAuth.logout()
      $scope.accessToken = ''
      var msg = '<span><b>Logout Success!</b> Thank you for using our services :)</span>'
      notification.success({
        message: msg
      })
      $state.transitionTo('home', $state.params, {
        reload: true,
        inherit: false,
        notify: true
      })
    }

    self.logout()
  }
})()
