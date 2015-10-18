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
      'controller.login',
      'controller.logout',
      'controller.register',
      'controller.productpage',
      'controller.categorypage',
      'directive.navbar'
    ])
})()
