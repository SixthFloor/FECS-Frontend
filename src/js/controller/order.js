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
    .controller('OrderManagerController', OrderManagerController)

  OrderController.$inject = ['$scope', '$http', '$state', '$stateParams', 'User', 'environment']
  function OrderController ($scope, $http, $state, $stateParams, User, environment) {
    var self = this
    self.orders = []
    self.totalSpent = 0

    $http.get(environment.getBaseAPI() + 'order/email/' + User.email).success(function (response) {
      self.orders = response
      console.log(response)
      for(var i=0; i<self.orders.length;i++) {
        if(self.orders[i].status > 1) {
          self.totalSpent += self.getPrice(self.orders[i])
        }
      }
    })

    self.cancle = function (ccId) {
      $http.put(environment.getBaseAPI() + 'order/cc', {id: ccId}).success(function (response) {
        if (response.status !== 'error') {
          console.log(self.order.orderNumber + 'Cancled')
        } else {
          console.log(response)
        }
      })
    }
    self.gotoPay = function (orderNo) {
      $state.transitionTo('payment', {orderNumber: orderNo})
    }
    self.getPrice = function (order) {
      var sum = 0
      for(var i=0; i<order.cart.length;i++) {
        sum += order.cart[i].product.price*order.cart[i].quantity
      }
      return sum
    }
  }

  OrderManagerController.$inject = ['$scope', '$http', '$state', '$stateParams', 'User', 'environment']
  function OrderManagerController ($scope, $http, $state, $stateParams, User, environment) {
    var self = this
    self.orders = []
    self.totalSpent = 0

    $http.get(environment.getBaseAPI() + 'order/all').success(function (response) {
      self.orders = response
      console.log(response)
      for(var i=0; i<self.orders.length;i++) {
        if(self.orders[i].status > 1) {
          self.totalSpent += self.getPrice(self.orders[i])
        }
      }
    })

    self.cancle = function (ccId) {
      $http.put(environment.getBaseAPI() + 'order/cc', {id: ccId}).success(function (response) {
        if (response.status !== 'error') {
          console.log(self.order.orderNumber + 'Cancled')
        } else {
          console.log(response)
        }
      })
    }
    self.getFullname = function (order) {
      var name = order.user.firstName + ' ' + order.user.lastName
      return name
    }
    self.getPrice = function (order) {
      var sum = 0
      for(var i=0; i<order.cart.length;i++) {
        sum += order.cart[i].product.price*order.cart[i].quantity
      }
      return sum
    }
  }

})()
