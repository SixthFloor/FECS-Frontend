/* global angular */

;(function () {
  angular
    .module('FECSapp', [
      'services.route',
      'services.login',
      'services.register',
      'controller.homepage',
      'controller.navbar',
      'controller.productpage',
      'controller.categorypage',
      'directive.navbar',
      'LocalStorageModule'
    ])
})()
