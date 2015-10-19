/* global angular */

;(function () {
  /**
  * controller.home Module
  *
  * @author Chinnaporn Soonue
  * @description Category Controller module to add create all controller of this project.
  */
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
