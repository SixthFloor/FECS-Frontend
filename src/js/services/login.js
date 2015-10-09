/* global angular */

/**
* Login service Module
*
* @description Login service Module use for provides authentication service for the projecet
every controller that have to identify the customer, authentication service has to implement this service
*/
;(function () {
  angular
    .module('services.login', [])
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

})()
