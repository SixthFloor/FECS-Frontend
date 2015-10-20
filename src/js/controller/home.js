/* global angular */

;(function () {
  /**
  * controller.home Module
  *
  * @author Chinnaporn Soonue
  * @description Homepage Controller module to add create all controller of this project.
  */
  angular
    .module('controller.homepage', [])
    .controller('HomePageController', HomePageController)

  HomePageController.$inject = ['$scope']
  function HomePageController ($scope) {
    var self = this

    self.welcome = 'Welcome to Furniture E-Commerce System'

  }
})()
