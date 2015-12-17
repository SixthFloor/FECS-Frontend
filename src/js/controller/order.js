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
    .controller('ViewOrderController', ViewOrderController)
    .controller('OrderManagerController', OrderManagerController)

  OrderController.$inject = ['$scope', '$http', '$state', '$stateParams', 'User', 'environment']
  function OrderController ($scope, $http, $state, $stateParams, User, environment) {
    var self = this
    self.orders = []

    $http.get(environment.getBaseAPI() + 'order/email/' + User.email).success(function (response) {
      self.orders = response
      console.log(response)
    })

    self.cancel = function (ccId) {
      $http.post(environment.getBaseAPI() + 'order/cc', {orderNumber: ccId}).success(function (response) {
        if (response.status !== 'error') {
          console.log(ccId + 'Canceled')
        } else {
          console.log(response)
        }
      })
    }
    self.gotoPay = function (orderNo) {
      $state.transitionTo('payment', {orderNumber: orderNo})
    }
    self.gotoView = function (orderNo) {
      $state.transitionTo('vieworder', {orderNumber: orderNo})
    }
    self.getPrice = function (order) {
      var sum = 0
      for (var i = 0; i < order.cart.length;i++) {
        sum += order.cart[i].product.price * order.cart[i].quantity
      }
      return sum
    }
  }

  ViewOrderController.$inject = ['$scope', '$http', '$state', '$stateParams', 'User', 'environment']
  function ViewOrderController ($scope, $http, $state, $stateParams, User, environment) {
    var self = this
    self.order = null

    $http.get(environment.getBaseAPI() + 'order/' + $stateParams.orderNumber).success(function (response) {
      self.order = response
      self.itemList = self.order.cart
      self.calTotal()
      console.log(response)
    })

    self.calTotal = function () {
      self.total = 0
      for (var i = 0; i < self.itemList.length; i++) {
        self.total += self.itemList[i].product.price * self.itemList[i].quantity
      }
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
      for (var i = 0; i < self.orders.length;i++) {
        if (self.orders[i].status > 1) {
          self.totalSpent += self.getPrice(self.orders[i])
        }
      }
    })

    self.cancel = function (ccId) {
      var url = environment.getBaseAPI() + 'order/cc'
      var parameter = { orderNumber: ccId }
      $http.post(url, parameter).success(function (response) {
        if (response.status !== 'error') {
          console.log(ccId + 'Canceled')
        } else {
          console.log(response)
        }
      })
    }

    self.getFullname = function (order) {
      var name = order.user.firstName + ' ' + order.user.lastName
      return name
    }

    self.gotoView = function (orderNo) {
      $state.transitionTo('vieworder', {orderNumber: orderNo})
    }

    self.getPrice = function (order) {
      var sum = 0
      for (var i = 0; i < order.cart.length;i++) {
        sum += order.cart[i].product.price * order.cart[i].quantity
      }
      return sum
    }
  }
})()
