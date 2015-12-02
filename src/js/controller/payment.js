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

  PaymentController.$inject = ['$scope', '$http', '$state', '$stateParams']
  function PaymentController ($scope, $http, $state, $stateParams) {
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

    self.User = User
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

    self.getOrder = function () {
      $http.get(environment.getBaseAPI() + 'order/' + $stateParams.orderNumber).success(function (response) {
        if (response.status !== 'error') {
          self.order = response
          if(self.order.status !== 'Not pay') {
            $state.transitionTo('home')
          }
        } else {
          console.log(response.message)
        }
      })
    }

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
      if (self.order.shipping !== '') {
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
