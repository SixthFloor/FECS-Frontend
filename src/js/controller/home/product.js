/* global angular */

/**
* Product Controller Module
*
* @description Product Controller module to add create all controller of this project.
*/
;(function () {
  angular
    .module('controller.productpage', [])
    .controller('ProductPageController', ProductPageController)

  ProductPageController.$inject = ['$scope']
  function ProductPageController ($scope) {
    var self = this
    /** do logic */
    self.sub1 = 'Bedroom'
    self.sub2 = 'Single beds'
  }
})()
