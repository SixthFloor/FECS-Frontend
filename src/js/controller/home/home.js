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

    self.login = function(email, pwd) {
    	console.log("email: "+ email + "  password: " + pwd)
	    //for real use
	     //  return $http.post('waitForSomeAPI', {
		    //   email: email,
		    //   password: pwd
	   	 // })
		
		// if success
		var fakeToken = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
		self.setToken(fakeToken)
		console.log("Token: " + self.getToken())
  	}

  	self.logout = function() {
	  $window.localStorage.removeItem('authToken');
	}

	}

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
