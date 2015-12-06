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

  NavbarController.$inject = ['$scope', '$http', '$state', 'User', 'Cart', 'environment']
  function NavbarController ($scope, $http, $state, User, Cart, environment) {
    var self = this

    self.isAuthed = User.isAuthed()
    self.User = User
    self.Cart = Cart

    if (User.isAuthed()) {
      $http.defaults.headers.common['Authorization'] = User.getToken()
    } else {
      delete $http.defaults.headers.common['Authorization']
    }

    self.search = function (query) {
      // var url = environment.getBaseAPI() + 'product/search?query=' + query
      // console.log(url)
      // $http.get(url).success(function (response) {
      //   self.productList = response
      //   console.log(self.productList)
      // })
      $state.transitionTo('category', {category_name: 'search'})
    }
  }
})()
