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

  CartController.$inject = ['$scope', '$http', '$state', '$stateParams', 'Cart', 'User']
  function CartController ($scope, $http, $state, $stateParams, Cart, User) {
    var self = this

    self.calTotal = function () {
      self.itemList = Cart.getItemList()
      self.total = 0
      for (var i = 0; i < self.itemList.length; i++) {
        self.total += self.itemList[i].product.price * self.itemList[i].quantity
      }
    }

    self.removeItem = function (index) {
      Cart.remove(index)
      self.calTotal()
    }

    self.checkout = function () {
      console.log(User.user_id)
      console.log(Cart.getItemList())
      var url = 'hello/api/order/new'
      $http.post(url, {
        user_id: User.user_id,
        cart: Cart.getItemList()
      }).success(function (response) {
        console.log('create new order')
      })
    }

    self.itemList = Cart.getItemList()
    self.calTotal()
  }
})()
