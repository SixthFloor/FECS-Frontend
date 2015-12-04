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
        controllerAs: 'loginCtrl',
        data: {
          permissions: {
            only: ['anonymous'],
            redirectTo: 'home'
          }
        }
      })
      .state('logout', {
        url: '/logout',
        templateUrl: 'templates/logout.tmpl',
        controller: 'LogoutController',
        controllerAs: 'logoutCtrl',
        data: {
          permissions: {
            except: ['anonymous']
          }
        }
      })
      .state('product', {
        url: '/product/:product_id',
        templateUrl: 'templates/product.tmpl',
        controller: 'ProductPageController',
        controllerAs: 'productpageCtrl'
      })
      .state('category', {
        url: '/category/:category_name',
        templateUrl: 'templates/category.tmpl',
        controller: 'CategoryPageController',
        controllerAs: 'categorypageCtrl'
      })
      .state('register', {
        url: '/register',
        data: {
          permissions: {
            only: ['anonymous'],
            redirectTo: 'home'
          }
        },
        templateUrl: 'templates/register/register.tmpl',
        controller: 'RegisterController',
        controllerAs: 'registerCtrl'
      })
      .state('addproduct', {
        url: '/admin/product/add',
        data: {
          permissions: {
            only: ['staff', 'owner', 'admin'],
            redirectTo: 'home'
          }
        },
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
        data: {
          permissions: {
            only: ['staff', 'owner', 'admin'],
            redirectTo: 'home'
          }
        },
        templateUrl: 'templates/admin/product/editproduct.tmpl',
        controller: 'EditProductController',
        controllerAs: 'editproductCtrl'
      })
      .state('cart', {
        url: '/cart',
        templateUrl: 'templates/cart.tmpl',
        controller: 'CartController',
        controllerAs: 'cartCtrl'
      })
      .state('payment', {
        url: '/payment/:orderNumber',
        data: {
          permissions: {
            except: ['anonymous'],
            redirectTo: 'home'
          }
        },
        templateUrl: 'templates/payment.tmpl',
        controller: 'PaymentController',
        controllerAs: 'paymentCtrl'
      })
  }
})()
