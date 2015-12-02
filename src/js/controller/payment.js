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

  PaymentController.$inject = ['$scope', '$http', '$state', 'User', 'Cart']
  function PaymentController ($scope, $http, $state, User, Cart) {
    var self = this
    self.User = User
    self.payment = {
      card: {
        no: '',
        holder_name: '',
        exp_date: ''
      },
      cvc: '',
      price: 0
    }

    self.valid = {
      step1: true,
      step2: true
    }
    self.steps = {
      step1: true,
      step2: false,
      step3: false
    }

    self.validate = function () {
      $http.post(environment.getBaseAPI() + 'payment/validate', self.payment).success(function (response) {
        if (response.status !== 'error') {
          var valid = response
          if(response.valid) {
            
          }
        } else {
          console.log(response)
        }
      })
    }
  }
})()
