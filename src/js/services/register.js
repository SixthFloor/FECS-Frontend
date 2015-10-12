/* global angular */

;(function () {
  angular
    .module('services.register', [])
    .service('Register', Register)

  Register.$inject = ['$http']
  function Register ($http) {
  }
})()
