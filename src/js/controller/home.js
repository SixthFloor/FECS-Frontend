/* global angular */

;(function () {
  /**
  * controller.home Module
  *
  * @author Chinnaporn Soonue
  * @description Homepage Controller module to add create all controller of this project.
  */
  angular
    .module('controller.homepage', ['ngAnimate'])
    .controller('HomePageController', HomePageController)
    .controller('AppController', AppController)

  HomePageController.$inject = ['$scope']
  function HomePageController ($scope) {
    var self = this

    self.myInterval = 10000
    self.noWrapSlides = false
    self.slides = [
      {
        image: 'http://designbump.com/wp-content/uploads/2015/08/Living-Room-Furniture-Sets-Throughout-Decorate-Your-Lounge-With-Sofas-And-Armchairs.jpg',
        text: 'TEST1'
      },
      {
        image: 'http://g02.a.alicdn.com/kf/HTB19kjLHVXXXXaiXXXXq6xXFXXXu/Living-Room-Leather-Sofa-Set-with-LED-light-modern-corner-leather-sofa-set-5035.jpg',
        text: 'TEST2'
      }
    ]

  }

  AppController.$inject = ['$scope', 'environment', 'User', 'productList']
  function AppController ($scope, environment, User, productList) {
    $scope.environment = environment
    $scope.User = User
    $scope.productList = productList
  }
})()
