/* global angular */

;(function () {
  angular
    .module('FECSapp', [
      'services.route',
      'services.login',
      'controller.homepage',
      'controller.productpage',
      'controller.categorypage',
      'directive.navbar',
      'LocalStorageModule'
    ])
})()
