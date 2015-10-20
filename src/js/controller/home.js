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

  HomePageController.$inject = ['$scope', 'FECSAuth']
  function HomePageController ($scope, FECSAuth) {
    var self = this

    self.welcome = 'Welcome to Furniture E-Commerce System'
    $scope.accessToken = FECSAuth.getToken()
  }
})()
