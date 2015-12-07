/* global angular */

;(function () {
  angular
    .module('FECSapp', [
      'services.route',
      'services.login',
      'services.register',
      'services.product',
      'services.notification',
      'services.cart',
      'services.permission',
      'services.environment',
      'services.search',
      'services.products',
      'controller.homepage',
      'controller.login',
      'controller.register',
      'controller.productpage',
      'controller.categorypage',
      'controller.cart',
      'controller.payment',
      'controller.order',
      'controller.navbar',
      'directive.navbar',
      'directive.footer'
    ])
})()
