/* global angular */

/**
* Homepage Controller Module
*
* @description Homepage Controller module to add create all controller of this project.
*/
;(function () {
  angular
    .module('controller.homepage', [])
    .controller('HomePageController', HomePageController)
    .controller('LoginController', LoginController)
    .controller('RegisterController', RegisterController)

  HomePageController.$inject = ['$scope']
  function HomePageController ($scope) {
    var self = this

    self.welcome = 'Welcome to Furniture E-Commerce System'

    $scope.accessToken = ''
  }

  LoginController.$inject = ['$scope', '$http', 'FECSAuth']
  function LoginController ($scope, $http, FECSAuth) {
    var self = this
    self.show = false

    self.toggleLogin = function () {
      self.show = !self.show
    }

    self.login = function () {
      var data = {
        email: self.email,
        pwd: self.pwd
      }
      FECSAuth.login(data, function (res) {
        $scope.accessToken = res.success.access_token
        FECSAuth.setToken($scope.accessToken)
      }, function (err) {
        self.message = err.error
      })
    }
  }

  RegisterController.$inject = ['$scope', '$http', 'registerService', '$location']
  function RegisterController ($scope, $http, registerService, $location) {
    var self = this
    self.member = registerService.member
    self.valid = registerService.valid

    self.submit = function () {
      if ((self.member.confirmpassword === self.member.password) &&
      (self.member.password.length >= 8 && self.member.confirmpassword.length >= 8)) {
        $location.url('/register/complete')
        registerService.valid = true
      }
      else {
        console.log('should be false')
        registerService.valid = false
      }
      self.valid = registerService.valid
      console.log(self.valid)
    }
  }
})()
