/* global angular */

;(function () {
  angular
    .module('FECSapp', [
      'services.route',
      'controller.homepage',
      'controller.productpage',
      'directive.navbar',
      'controller.category',
      'services.login'
    ])
})()
