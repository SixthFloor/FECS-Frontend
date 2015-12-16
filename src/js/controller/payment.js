/* global angular */
/* global $ */

;(function () {
  /**
  * controller.payment Module
  *
  * @author Natchanon Charoensuk
  */
  angular
    .module('controller.payment', [])
    .controller('PaymentController', PaymentController)

  PaymentController.$inject = ['$scope', '$http', '$state', '$stateParams', 'moment']
  function PaymentController ($scope, $http, $state, $stateParams, moment) {
    var self = this
    self.num1 = ''
    self.num2 = ''
    self.num3 = ''
    self.num4 = ''
    self.cvv = ''
    self.steps = {
      step1: true,
      step2: false,
      step3: false
    }
    self.is404 = false

    self.shippingList = []
    self.order = null
    $http.get($scope.environment.getBaseAPI() + 'order/' + $stateParams.orderNumber).success(function (response) {
      self.order = response
      if (self.order.status !== 0) { // status !== 'Not Pay'
        $state.transitionTo('home')
      }
      // Calculate total price of products in cart
      console.log(self.order)
    }).error(function (response) {
      console.log('Error')
      self.is404 = true
    })

    $http.get($scope.environment.getBaseAPI() + 'shipping/all').success(function (response) {
      self.shippingList = response
    }).error(function (response) {
      self.is404 = true
    })

    self.getCardNoFormat = function () {
      return self.payment.card.no.substring(0, 4) + '-' + self.payment.card.no.substring(4, 8) + '-' + self.payment.card.no.substring(8, 12) + '-' + self.payment.card.no.substring(12, 16)
    }

    self.back = function () {
      var top = parseInt($scope.paymentCtrl.moveElement.css('margin-top').match(/\-+\d+/))
      var new_top = top + self.height
      console.log(top + self.height)
      self.moveElement.css('margin-top', '-' + new_top + 'px')
    }
    self.next1 = function () {
      if ($scope.$$childHead.payment1.$invalid) {
        $scope.$$childHead.payment1.$setDirty(true)
        $scope.$$childHead.payment1.address1.$setDirty(true)
        $scope.$$childHead.payment1.province.$setDirty(true)
        $scope.$$childHead.payment1.zipcode.$setDirty(true)
        $scope.$$childHead.payment1.shippingdate.$setDirty(true)
      } else {
        self.moveElement.css('margin-top', '-' + self.height + 'px')
      }
    }
    self.next2 = function () {
      var exp_date = moment.utc([
        $scope.User.expirationDate.year,
        parseInt($scope.User.expirationDate.month, 10) - 1,
        1,
        0
      ])
      self.payment = {
        card: {
          no: self.num1 + self.num2 + self.num3 + self.num4,
          holder_name: $scope.User.card_name,
          exp_date: exp_date,
          address: {
            address1: $scope.User.address1,
            address2: $scope.User.address2,
            province: $scope.User.province,
            zipcode: $scope.User.zipcode
          }
        },
        cvv: self.cvv,
        price: 0,
        shipping: self.order.shipping
      }
      for ( var i = 0; i < self.order.cart.length;i++) {
        self.payment.price += self.order.cart[i].product.price * self.order.cart[i].quantity
      }
      if (!$scope.$$childHead.payment2.$invalid) {
        $http.post($scope.environment.getBaseAPI() + 'payment/validate?orderNumber=' + self.order.orderNumber, self.payment).success(function (response) {
          console.log(response)
          self.moveElement.css('margin-top', '-' + (self.height * 2) + 'px')
        }).error(function (response) {
          console.log('ERROR step 2')
          $scope.$$childHead.payment2.$setValidity('cardfail', false)
          console.log($scope.$$childHead.payment2)
        })
      } else {
        $scope.$$childHead.payment2.$setDirty(true)
        $scope.$$childHead.payment2.cardholdername.$setDirty(true)
        $scope.$$childHead.payment2.cardnumber1.$setDirty(true)
        $scope.$$childHead.payment2.cardnumber2.$setDirty(true)
        $scope.$$childHead.payment2.cardnumber3.$setDirty(true)
        $scope.$$childHead.payment2.cardnumber4.$setDirty(true)
        $scope.$$childHead.payment2.cvv.$setDirty(true)
      }
    }
    self.submit = function () {
      console.log(self.payment)
      $http.post($scope.environment.getBaseAPI() + 'payment/pay?orderNumber=' + self.order.orderNumber, self.payment).success(function (response) {
        if (response.status !== 'error') {
          console.log('Paid')
          console.log(response)
          self.order.date = response.date
          self.moveElement.css('margin-top', '-' + (self.height * 3) + 'px')
        } else {
          console.log(response)
        }
      }).error(function (response) {
        console.log(response)
      })
    }
    self.init = function () {
      self.moveElement = angular.element('.timeline dl')
      self.height = self.moveElement.height() + 40
      self.moveElement.resize(function () {
        self.height = self.moveElement.height() + 40
      })
    }
  }
})()
