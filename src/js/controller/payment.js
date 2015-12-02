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

  PaymentController.$inject = ['$scope', '$http', '$state', '$stateParams', 'environment']
  function PaymentController ($scope, $http, $state, $stateParams, environment) {
    var self = this 
    var url = environment.getBaseAPI() + 'payment/' + $stateParams.orderNumber
    self.valid = {
      step1: true,
      step2: true
    }
    self.steps = {
      step1: true,
      step2: false,
      step3: false
    }
    self.is404 = false
    self.moveElement = $('.timeline>dl')
    self.height = self.moveElement.height() + 40

    self.moveElement.resize(function () {
      self.height = self.moveElement.height() + 40
    })

    self.order = null
    self.payment = {
      card: {
        no: '',
        holder_name: '',
        exp_date: ''
      },
      cvc: '',
      price: 0
    }
    // $http.get(environment.getBaseAPI() + 'order/' + $stateParams.orderNumber).success(function (response) {
    //   self.order = response
    //   if(self.order.status !== 'Not pay') {
    //     $state.transitionTo('home')
    //   }
    //   // Calculate total price of products in cart
    //   for( var i=0; i<self.order.cart.length;i++ ) {
    //     self.payment.price += self.order.cart[i].product.price
    //   }
    // }).error(function (response) {
    //   console.log('Error')
    //   self.is404 = true
    // })

    self.back = function () {
      self.valid.step1 = true
      self.valid.step2 = true
      if (self.steps.step2) {
        self.steps.step1 = true
        self.steps.step2 = false
        self.steps.step3 = false
        console.log('Step2 back')
        self.moveElement.css('margin-top', '0px')
      } else if (self.steps.step3) {
        self.steps.step1 = false
        self.steps.step2 = true
        self.steps.step3 = false
        console.log('Step3 back')
        self.moveElement.css('margin-top', '-' + self.height + 'px')
      }
    }
    self.next1 = function () {
      // if (self.order.shipping !== '') {
      if (true) {
        self.valid.step1 = true
        self.steps.step1 = false
        self.steps.step2 = true
        self.steps.step3 = false
        console.log('Step1 next')
        self.moveElement.css('margin-top', '-' + self.height + 'px')
      } else {
        console.log('form not valid')
        self.valid.step1 = false
      }
    }
    self.next2 = function () {
      $http.post(environment.getBaseAPI() + 'payment/validate', self.payment).success(function (response) {
        if (response.status !== 'error') {
          var valid = response
          if(response.valid) {
            self.valid.step2 = true
            self.steps.step1 = false
            self.steps.step2 = false
            self.steps.step3 = true
            console.log('Step2 next')
            self.moveElement.css('margin-top', '-' + (self.height * 2) + 'px')
          }
          else {
            console.log('credit card is not valid')
            self.valid.step2 = false
          }
        } else {
          self.valid.step2 = false
          console.log(response)
        }
      })
    }
    self.cancle = function () {
      $http.put(environment.getBaseAPI() + 'order/cancle', {id:self.order.id}).success(function (response) {
        if (response.status !== 'error') {
          console.log(self.order.orderNumber+'Cancled')
        } else {
          console.log(response)
        }
      })
    }
    self.submit = function () {
      $http.post(environment.getBaseAPI() + 'payment/pay', self.payment).success(function (response) {
        if (response.status !== 'error') {
          console.log('Paid')
          self.paidOrder()
        } else {
          console.log(response)
        }
      })
    }
    self.paidOrder = function () {
      var toSend = {
        id: self.order.id,
        shipping: self.order.shipping
      }
      $http.put(environment.getBaseAPI() + 'order/paid', toSend).success(function (response) {
        if (response.status !== 'error') {
          console.log('Order status changed to "Paid"')
          $state.transitionTo('home')
        } else {
          console.log(response)
        }
      })
    }
  }
})()
