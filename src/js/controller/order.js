/* global angular */

;(function () {
  /**
  * controller.cart Module
  *
  * @author Natchanon Charoensuk
  * @description OrderController module use for view the order history
  */
  angular
    .module('controller.order', [])
    .controller('OrderController', OrderController)

  OrderController.$inject = ['$scope', '$http', '$state', '$stateParams', 'User', 'environment']
  function OrderController ($scope, $http, $state, $stateParams, User, environment) {
    var self = this

  }
})()
