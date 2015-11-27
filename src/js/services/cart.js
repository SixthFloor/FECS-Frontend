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
    .service('FECSCart', FECSCart)

  FECSCart.$inject = ['localStorageService', '$http']
  function FECSCart (localStorageService, $http) {
    var self = this

    self.list = []

    self.add = function (item) {
      self.list.push(item)
    }
  }
})()
