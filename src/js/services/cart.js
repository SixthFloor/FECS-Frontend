/* global angular */

/**
* Login service Module
*
* @description Login service Module use for provides authentication service for the projecet
every controller that have to identify the customer, authentication service has to implement this service
*/
;(function () {
  angular
    .module('services.cart', ['LocalStorageModule'])
    .service('Cart', Cart)

  Cart.$inject = ['localStorageService', '$http']
  function Cart (localStorageService, $http) {
    var self = this

    self.add = function (item) {
      var itemList = self.getItemList()
      for (var i = 0; i < itemList.length ; i++) {
        if (itemList[i].product.serialNumber === item.product.serialNumber) {
          itemList[i].quantity += item.quantity
          self.updateCart(itemList)
          return
        }
      }
      itemList.push(item)
      self.updateCart(itemList)
    }

    self.remove = function (index) {
      var itemList = self.getItemList()
      itemList.splice(index, 1)
      self.updateCart(itemList)
    }

    self.updateCart = function (itemList){
      localStorageService.set('cart', itemList)
    }

    self.getItemList = function () {
      return localStorageService.get('cart')
    }

    self.getQuantity = function () {
      var itemList = self.getItemList()
      var count = 0
      for (var i = 0; i < itemList.length ; i++) {
        count += itemList[i].quantity
      }
      return count
    }

    self.init = function () {
      var itemList = []
      self.updateCart(itemList)
    }

    self.clear = function () {
      localStorageService.remove('cart')
    }
  }
})()
