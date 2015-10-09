/* global angular */

/**
 * @description router for control FECS app
 */

;(function () {
  angular
    .module('services.route', ['ui.router'])
    .config(config)

  config.$inject = ['$stateProvider', '$urlRouterProvider']

  function config ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('', '/home')
    $urlRouterProvider.otherwise('/404')

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'templates/home.tmpl',
        controller: 'HomePageController',
        controllerAs: 'homepageCtrl'
      })
      
      .state('product', {
        url: '/product',
        templateUrl: 'templates/product.html',
        controller: 'ProductPageController'
      })
      
      .state('category', {
        url: '/category',
        templateUrl: 'templates/category.html',
        controller: 'CategoryPageController'
      })
  	}
  })()