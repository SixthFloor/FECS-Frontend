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
<<<<<<< HEAD
      'services.local',
=======
      'services.environment',
>>>>>>> origin/dev
      'controller.homepage',
      'controller.login',
      'controller.register',
      'controller.productpage',
      'controller.categorypage',
      'controller.cart',
<<<<<<< HEAD
      'controller.settingpage',
=======
      'controller.payment',
>>>>>>> origin/dev
      'controller.navbar',
      'directive.navbar',
      'directive.footer'
    ])
})()
