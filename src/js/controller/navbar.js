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
      /* If search with empty should query nothing, but if call the api with empty string it will return all product */
      if (query === '') {
        query = '%'
      }
      searchService.setQuery(query)
      $state.transitionTo('category', {category_name: 'search'}, {reload: true})
    }
  }
})()
