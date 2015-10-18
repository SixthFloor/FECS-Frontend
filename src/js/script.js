/* global angular */

;(function () {
  angular
    .module('FECSapp', [
      'services.route',
      'services.login',
      'services.register',
      'services.addproduct',
      'services.notification',
      'controller.homepage',
      'controller.productpage',
      'controller.categorypage',
      'directive.navbar'
    ])
})()
