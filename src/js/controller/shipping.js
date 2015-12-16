/* global angular */

;(function () {
  /**
  * controller.categorypage Module
  *
  * @author Jiratchaya Intaragumhaneg
  * @description Category Controller module use for view products by their category , can sort the products
  */
  angular
    .module('controller.shipping', [])
    .controller('ShippingController', ShippingController)

  ShippingController.$inject = ['$scope', '$http', '$state']
  function ShippingController ($scope, $http, $state) {
    var self = this

  }
})()
