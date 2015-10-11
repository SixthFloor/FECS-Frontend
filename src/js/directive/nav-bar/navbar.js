/* global angular */

/**
* Navigation Bar Controller Module
*
* @description Navigation Bar Controller Module to show navigation bar at the top of every pages.
*/
;(function () {
  angular
    .module('directive.navbar', [])
    .directive('navbar', navbar)

  navbar.$inject = []

  function navbar () {
    var directive = {
      templateUrl: 'templates/nav.tmpl'
    }
    return directive
  }
})()
