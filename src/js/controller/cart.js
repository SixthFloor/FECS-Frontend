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

  CartController.$inject = ['$scope', '$http', '$state', '$stateParams', 'Cart']
  function CartController ($scope, $http, $state, $stateParams, Cart) {
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

    self.changeQuantity = function (index, quantity) {
      self.itemList[index].quantity = quantity
      Cart.updateCart(self.itemList)
      self.calTotal()
    }

    self.checkout = function () {
      console.log(User.user_id)
      console.log(Cart.getItemList())
      var url = environment.getBaseAPI() + 'order/new'
      $http.post(url, {
        user: {
          id: User.user_id
        },
        cart: Cart.getItemList()
      }).success(function (response) {
        console.log('create new order')
        console.log(response)
        Cart.init()
        $state.transitionTo('payment', {orderNumber: response})
      }).error(function (response) {
        console.log('error')
        console.log(response)
      })
    }

    self.itemList = Cart.getItemList()
    self.calTotal()
  }
})()
