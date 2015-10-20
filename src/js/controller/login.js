/* global angular */

;(function () {
  /**
  * controller.login Module
  *
  * @author Chinnaporn Soonue
  */
  angular
    .module('controller.login', [])
    .controller('LoginController', LoginController)

  LoginController.$inject = ['$scope', '$http', '$state', 'Notification', 'User']
  function LoginController ($scope, $http, $state, notification, User) {
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
      User.login(data, function (res) {
        var token = res.success.access_token
        User.setToken(token)
        $state.transitionTo('home', $state.params, {
          reload: true,
          inherit: false,
          notify: true
        })
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
})()
