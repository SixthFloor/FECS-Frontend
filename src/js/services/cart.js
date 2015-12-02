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

    self.init = function () {
      var itemList = []
      localStorageService.set('cart', itemList)
    }

    self.add = function (item) {
      var itemList = self.getItemList()
      for (var i = 0; i < itemList.length ; i++) {
        if (itemList[i].product.serialNumber === item.product.serialNumber) {
          itemList[i].quantity += item.quantity
          return
        }
      }
      itemList.push(item)
      localStorageService.set('cart', itemList)
    }

    self.remove = function (index) {
      var itemList = self.getItemList()
      itemList.splice(index, 1)
      localStorageService.set('cart', itemList)
    }

    self.getItemList = function () {
      return localStorageService.get('cart')
    }

    self.clear = function () {
      localStorageService.remove('cart')
    }
  }
})()
