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

  HomePageController.$inject = ['$scope']
  function HomePageController ($scope) {
    var _ = this

    _.welcome = 'Welcome to Furniture E-Commerce System'
  }

  LoginController.$inject = ['$scope']
  function LoginController ($scope) {
    var _ = this

    _.email = 'guro@guro.com'
    _.pwd = 'Hello'
  }
})()
