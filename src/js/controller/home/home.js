/* global angular */

/**
* Homepage Controller Module
*
* @description Homepage Controller module to add create all controller of this project.
*/
// angular
  // .module('controller.homepage', [])
  // .controller('HomePageController', ['$scope', function ($scope) {
    // $scope.welcome = 'Welcome to Furniture E-Commerce System'
  // }]),

angular
  .module('controller.homepage', [])
  .controller('ProductController', ['$scope', function ($scope) {
    $scope.welcome = 'Welcome to Furniture E-Commerce System123'
  }])