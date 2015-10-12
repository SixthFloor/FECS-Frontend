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

  RegisterController.$inject = ['$scope', '$http', 'FECSAuth']
  function RegisterController ($scope, $http, FECSAuth) {
    var self = this
    self.member = {}

    self.submit = function(){
      $http.post('http://128.199.112.126:3000/register', {
        email: 'guro@guro.com',
        password: 'guro',
        firstname: 'Guro',
        lastname: 'GreenBlooD',
        address: 'Guros home',
        phonenumber: '0800000000'
      }).success( function (resp) {
        console.log(resp.message)
      }).error( function (resp) {
        console.log(resp.message)
      })
    }
  }
})()
