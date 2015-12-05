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
      'services.local',
      'services.environment',
      'controller.homepage',
      'controller.login',
      'controller.register',
      'controller.productpage',
      'controller.categorypage',
      'controller.cart',
      'controller.settingpage',
      'controller.payment',
      'controller.navbar',
      'directive.navbar',
      'directive.footer'
    ])
})()
