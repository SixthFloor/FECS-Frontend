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
    self.orderList = [{
      orderNumber: 55,
      orderDate: 1450258183000,
      user:{
        firstName: 'Guro',
        lastName: 'GreenBlooD',
        address: 'This is my home'
      },
      shipping: 1450228183000
    },{
      orderNumber: 55,
      orderDate: 1450258183000,
      user:{
        firstName: 'Guro',
        lastName: 'GreenBlooD',
        address: 'This is my home'
      },
      shipping: 1450458183000
    },{
      orderNumber: 55,
      orderDate: 1450258183000,
      user:{
        firstName: 'Guro',
        lastName: 'GreenBlooD',
        address: 'This is my home'
      },
      shipping: 1450378183000
    }]

    self.gotoView = function (orderNo) {
      $state.transitionTo('vieworder', {orderNumber: orderNo})
    }
  }
})()
