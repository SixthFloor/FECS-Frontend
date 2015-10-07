/* global angular */

/**
* Homepage Controller Module
*
* @description Homepage Controller module to add create all controller of this project.
*/
angular
  .module('controller.homepage', [])
  .controller('HomePageController', ['$scope', function ($scope) {
    $scope.welcome = 'Welcome to Furniture E-Commerce System'
  }])

  .controller('LoginCtrl', ['$scope', function ($scope) {
    $scope.email = "guro@guro.com"
    $scope.pwd = "Hello"


    
  }])

  .directive('navBar', function() {
  	return {
    	templateUrl: 'templates/nav.html'
  	};
  })
