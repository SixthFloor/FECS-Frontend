/* global angular */

;(function () {
  angular
    .module('services.register', [])
    .service('registerService', registerService)

  registerService.$inject = ['$http']
  function registerService ($http) {
    var self = this

    self.valid = {
      step1: true,
      step2: true
    }
    self.steps = {
      step1: true,
      step2: false,
      step3: false
    }

    self.member = {
      email: '',
      password: '',
      confirmpassword: '',
      firstname: '',
      lastname: '',
      phonenumber: '',
      address: '',
      adr1: '',
      adr2: '',
      province: '',
      zip: ''
    }

    self.regis = function (success, error) {
      self.member.address = self.member.adr1 + ' ' + self.member.adr2 + ' ' + self.member.province + ' ' + self.member.zip
      var url = environment.getBaseAPI + 'user/new'
      $http.post(url, {
        email: self.member.email,
        password: self.member.password,
        firstName: self.member.firstname,
        lastName: self.member.lastname
      }).success(success).error(error)
    }
  }
})()
