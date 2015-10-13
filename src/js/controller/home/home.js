/* global angular */

/**
* Homepage Controller Module
*
* @description Homepage Controller module to add create all controller of this project.
*/
;(function () {
  angular
    .module('controller.homepage', ['cgNotify', 'ui.router'])
    .controller('HomePageController', HomePageController)
    .controller('LoginController', LoginController)
    .controller('RegisterController', RegisterController)
    .controller('LogoutController', LogoutController)

  HomePageController.$inject = ['$scope', 'FECSAuth']
  function HomePageController ($scope, FECSAuth) {
    var self = this

    self.welcome = 'Welcome to Furniture E-Commerce System'
    $scope.accessToken = FECSAuth.getToken()
    console.log('Token : ' + $scope.accessToken)
  }

  LoginController.$inject = ['$scope', '$http', '$state', 'notify', 'FECSAuth']
  function LoginController ($scope, $http, $state, notify, FECSAuth) {
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
      FECSAuth.login(data, function (res) {
        $scope.accessToken = res.success.access_token
        FECSAuth.setToken($scope.accessToken)
        $state.transitionTo('home', $state.params, {
          reload: true,
          inherit: false,
          notify: true
        })
        var msg = '<span><b>Well done!</b> Login successfully.</span>'
        notify({
          messageTemplate: msg,
          classes: 'alert alert-success'
        })
      }, function (err) {
        var msg = '<span><b>Oh snap!</b> ' + err.error + '.</span>'
        notify({
          messageTemplate: msg,
          classes: 'alert alert-danger'
        })
      })
    }
  }

  LogoutController.$inject = ['$scope', '$state', 'FECSAuth']
  function LogoutController ($scope, $state, FECSAuth) {
    var self = this

    self.logout = function () {
      FECSAuth.logout()
      $scope.accessToken = ''
      $state.transitionTo('home', $state.params, {
        reload: true,
        inherit: false,
        notify: true
      })
    }

    self.logout()
  }

  RegisterController.$inject = ['$scope', '$http', 'registerService', '$location', 'FECSAuth']
  function RegisterController ($scope, $http, registerService, $location, FECSAuth) {
    $scope.accessToken = FECSAuth.getToken()
    var self = this
    self.member = registerService.member
    self.valid = registerService.valid

    self.submit = function () {
      if ((self.member.confirmpassword === self.member.password) &&
        (self.member.password.length >= 8 && self.member.confirmpassword.length >= 8) &&
        (self.member.email !== '') && (self.member.firstname !== '') &&
        (self.member.lastname !== '')) {
        $location.url('/register/complete')
        registerService.valid = true
      } else {
        console.log('should be false')
        registerService.valid = false
      }
      self.valid = registerService.valid
      console.log(self.valid)
    }
  }
})()
