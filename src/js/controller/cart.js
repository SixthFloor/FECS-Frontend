/* global angular */

;(function () {
  /**
  * controller.cart Module
  *
  * @author Jiratchaya Intaragumhaneg
  * @description CartController module use for view the shopping list of the customer
  */
  angular
    .module('controller.cart', [])
    .controller('CartController', CartController)

  CartController.$inject = ['$scope', '$http', '$state', '$stateParams', 'FECSCart']
  function CartController ($scope, $http, $state, $stateParams, FECSCart) {
    var self = this

    self.addToCart = function () {
      FECSCart.add('Hello')
    }
  }
})()
