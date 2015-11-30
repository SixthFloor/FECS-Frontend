/* global angular */

/**
* Login service Module
*
* @description Login service Module use for provides authentication service for the projecet
every controller that have to identify the customer, authentication service has to implement this service
*/
;(function () {
  angular
    .module('services.cart', [])
    .service('Cart', Cart)

  Cart.$inject = ['localStorageService', '$http']
  function Cart (localStorageService, $http) {
    var self = this

    self.itemList = []

    self.add = function (item) {
      self.itemList.push(item)
      console.log(self.itemList)
    }

    self.remove = function (index) {
      self.itemList.splice(index, 1)
    }

    self.getItemList = function () {
      return self.itemList
    }

    self.clear = function () {
      self.list = []
    }
  }
})()
