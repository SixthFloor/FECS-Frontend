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

  NavbarController.$inject = ['$scope', '$http', '$state', 'Cart', 'searchService', 'storeProduct']
  function NavbarController ($scope, $http, $state, Cart, searchService, storeProduct) {
    var self = this

    self.Cart = Cart

    self.search = function (query) {
      /* If search with empty should query nothing, but if call the api with empty string it will return all product */
      if (query === '') {
        query = '%'
      }
      searchService.setQuery(query)
      if (!$state.is('category')) {
        $state.transitionTo('category', {category_name: 'search'}, {reload: true})
      } else {
        var url = $scope.environment.getBaseAPI() + 'product/search?query=' + query
        console.log(url)
        $http.get(url).success(function (response) {
          storeProduct.store.products = response
        })
      }
    }
  }
})()
