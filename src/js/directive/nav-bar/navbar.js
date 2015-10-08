/* global angular */
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
