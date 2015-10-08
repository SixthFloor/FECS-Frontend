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
    .service('FECSAuth', FECSAuth)

  FECSAuth.$inject = ['$window']
  function FECSAuth($window) {
  	var self = this
  	
  	self.test = "Hello";

  	self.isAuthed = function() {
     if (self.getToken()) return true;
   	 else return false;		
	}

  	self.setToken = function(token) {
	  $window.localStorage['authToken'] = token;
	}

	self.getToken = function() {
	  var token = $window.localStorage['authToken'];
	  return token ? token : false;
	}

    self.login = function() {
    //for real use
     //  return $http.post('waitForSomeAPI', {
	    //   email: self.email,
	    //   password: self.pwd
   	 // })
	
	// if success
	var fakeToken = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	self.setToken(fakeToken)

  	}

  	self.logout = function() {
	  $window.localStorage.removeItem('authToken');
	}

	}

  HomePageController.$inject = ['$scope','FECSAuth']
  function HomePageController ($scope, FECSAuth) {
    var self = this

    self.welcome = 'Welcome to Furniture E-Commerce System'
  }

  LoginController.$inject = ['$scope','$http']
  function LoginController ($scope,$http) {
    var self = this

    self.email = 'guro@guro.com'
    self.pwd = 'Hello'


  }
})()
