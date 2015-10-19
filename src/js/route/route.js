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
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.tmpl',
        controller: 'LoginController',
        controllerAs: 'loginCtrl'
      })
      .state('logout', {
        url: '/logout',
        templateUrl: 'templates/logout.tmpl',
        controller: 'LogoutController',
        controllerAs: 'logoutCtrl'
      })
      .state('product', {
        url: '/product/:product_id',
        templateUrl: 'templates/product.tmpl',
        controller: 'ProductPageController',
        controllerAs: 'productpageCtrl'
      })
      .state('category', {
        url: '/category',
        templateUrl: 'templates/category.tmpl',
        controller: 'CategoryPageController',
        controllerAs: 'categorypageCtrl'
      })
      .state('register', {
        url: '/register',
        views: {
          '': {
            templateUrl: 'templates/register/register.tmpl',
            controller: 'RegisterController',
            controllerAs: 'registerCtrl'
          },
          'step1@register': {
            templateUrl: 'templates/register/step1.tmpl',
            controller: 'RegisterController',
            controllerAs: 'registerCtrl'
          },
          'step2@register': {
            templateUrl: 'templates/register/step2.tmpl',
            controller: 'RegisterController',
            controllerAs: 'registerCtrl'
          },
          'step3@register': {
            templateUrl: 'templates/register/step3.tmpl',
            controller: 'RegisterController',
            controllerAs: 'registerCtrl'
          }
        }
      })
      .state('register.complete', {
        url: '/complete',
        parent: 'register',
        templateUrl: 'templates/register/complete.tmpl'
      })
      .state('addproduct', {
        url: '/admin/product/add',
        views: {
          '': {
            templateUrl: 'templates/admin/product/addproduct.tmpl',
            controller: 'AddProductController',
            controllerAs: 'addproductCtrl'
          },
          'img-manager@addproduct': {
            templateUrl: 'templates/admin/product/addproduct_img.tmpl',
            controller: 'AddProductController',
            controllerAs: 'addproductCtrl'
          }
        }
      })
      .state('editproduct', {
        url: '/admin/product/edit/:product_id',
        templateUrl: 'templates/admin/product/editproduct.tmpl',
        controller: 'EditProductController',
        controllerAs: 'editproductCtrl'
      })
  }
})()
