/* global angular */

;(function () {
  /**
  * controller.login Module
  *
  * @author Chinnaporn Soonue
  */
  angular
    .module('controller.login', ['ui.bootstrap'])
    .controller('LoginController', LoginController)
    .controller('LogoutController', LogoutController)

  LoginController.$inject = ['$scope', '$state', 'Notification']
  function LoginController ($scope, $state, notification) {
    var self = this
    self.show = false
    self.data = {
      email: '',
      pwd: ''
    }

    self.toggleLogin = function () {
      self.show = !self.show
    }

    self.login = function () {
      var data = {
        email: self.data.email,
        pwd: self.data.pwd
      }
      $scope.User.login(data, function () {
        $state.go('home', {}, {reload: true})
        var msg = '<span><b>Well done!</b> Login successfully.</span>'
        notification.success({
          message: msg
        })
      }, function (err) {
        var msg = '<span><b>Oh snap!</b> ' + err.error + '.</span>'
        notification.error({
          message: msg,
          replaceMessage: true
        })
      })
    }
  }

  LogoutController.$inject = ['$scope', '$state', 'Notification']
  function LogoutController ($scope, $state, notification) {
    var self = this

    self.logout = function () {
      $scope.User.logout()
      var msg = '<span><b>Logout Success!</b> Thank you for using our services :)</span>'
      notification.success({
        message: msg
      })
      $state.go('home', {}, {reload: true})
    }

    self.logout()
  }
})()
