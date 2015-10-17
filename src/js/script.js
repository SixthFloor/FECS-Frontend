/* global angular */

;(function () {
  angular
    .module('FECSapp', [
      'services.route',
      'services.login',
      'services.register',
      'services.addproduct',
      'controller.homepage',
      'controller.productpage',
      'controller.categorypage',
      'directive.navbar'
    ])
})()
