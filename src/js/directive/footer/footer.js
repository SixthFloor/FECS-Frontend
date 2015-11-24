/* global angular */

/**
* Footer Directive Module
*
* @description Footer Directive Module to footer bar at the bottom of every pages.
*/
;(function () {
  angular
    .module('directive.footer', [])
    .directive('footer', navbar)

  navbar.$inject = []

  function navbar () {
    var directive = {
      restrict: 'E',
      // controller: 'FooterController',
      // controllerAs: 'footerCtrl',
      transclude: true,
      templateUrl: 'templates/footer.tmpl'
    }
    return directive
  }
})()
