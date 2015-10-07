/* global angular */

/**
 * @description router for control FECS app
 */
(function () {
  angular
    .module('service.route', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/home')

      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: 'templates/home.tmpl',
          controller: 'HomePageController'
        })
    }])
})()
