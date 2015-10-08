/* global angular */

/**
* Product Controller Module
*
* @description Product Controller module to add create all controller of this project.
*/
angular
  .module('controller.productpage', [])
  .controller('ProductPageController', ['$scope', function ($scope) {
  	/** do logic */
    $scope.sub1 = "Bedroom"
    $scope.sub2 = "Single beds"
  }])
