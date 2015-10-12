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
    self.email = 'guro@guro.com'
    self.pwd = 'Hello'
    console.log(FECSAuth.test)

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

  RegisterController.$inject = ['$scope', '$http', 'registerService']
  function RegisterController ($scope, $http, registerService) {
    var self = this
    self.member = registerService.member

    self.submit = function () {
      registerService.regis()
    }
  }
})()
