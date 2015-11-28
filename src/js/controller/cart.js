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

    self.calTotal = function () {
      self.itemList = FECSCart.getItemList()
      self.total = 0
      for (var i=0; i<self.itemList.length; i++) {
        self.total += self.itemList[i].product.price * self.itemList[i].quantity
      }
    }

    self.removeItem = function (index) {
      FECSCart.remove(index)
      self.calTotal()
    }

    self.init = function (){
      self.itemList = FECSCart.getItemList()
      self.calTotal()
    }

    self.init()
  }
})()
