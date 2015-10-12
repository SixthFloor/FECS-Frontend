/* global angular */

/**
* Category Controller Module
*
* @description Category Controller module to add create all controller of this project.
*/
;(function () {
  angular
    .module('controller.categorypage', [])
    .controller('CategoryPageController', CategoryPageController)

  CategoryPageController.$inject = ['$scope']
  function CategoryPageController ($scope) {
    var self = this
    /** do logic */
    self.sub1 = 'Bedroom'
    self.sub2 = 'Single beds'
  }
})()
