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

  NavbarController.$inject = ['$scope', '$http', '$state', 'User', 'Cart', 'environment', 'searchService']
  function NavbarController ($scope, $http, $state, User, Cart, environment, searchService) {
    var self = this

    self.Cart = Cart

    if ($scope.User.isAuthed()) {
      $http.defaults.headers.common['Authorization'] = $scope.User.getToken()
    } else {
      delete $http.defaults.headers.common['Authorization']
    }

    self.search = function (query) {
      searchService.setQuery(query)
      $state.transitionTo('category', {category_name: 'search'}, {reload: true})
    }
  }
})()
