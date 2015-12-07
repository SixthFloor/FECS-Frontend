/* global angular */

;(function () {
  /**
  * controller.home Module
  *
  * @author Jiratchaya Intaragumhaneg
  * @description Homepage Controller module to add create all controller of this project.
  */
  angular
    .module('controller.navbar', [])
    .controller('NavbarController', NavbarController)

  NavbarController.$inject = ['$scope', '$http', '$state', 'Cart', 'searchService']
  function NavbarController ($scope, $http, $state, Cart, searchService) {
    var self = this

    self.Cart = Cart

    if ($scope.User.isAuthed()) {
      $http.defaults.headers.common['Authorization'] = $scope.User.getToken()
    } else {
      delete $http.defaults.headers.common['Authorization']
    }

    self.search = function (query) {
      searchService.setQuery(query)
      if (!$state.is('category')) {
        $state.transitionTo('category', {category_name: 'search'}, {reload: true})
      } else {
        $scope.productList.getProductList('search')
      }
    }
  }
})()
