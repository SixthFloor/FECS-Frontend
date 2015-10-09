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

  HomePageController.$inject = ['$scope']
  function HomePageController ($scope) {
    var self = this

    self.welcome = 'Welcome to Furniture E-Commerce System'
  }

  LoginController.$inject = ['$scope','$http', 'FECSAuth']
  function LoginController ($scope,$http,FECSAuth) {
    var self = this

    self.email = 'guro@guro.com'
    self.pwd = 'Hello'
    console.log(FECSAuth.test)

    self.login = function(){
    	FECSAuth.login(self.email,self.pwd)
    }
    
  }
})()
