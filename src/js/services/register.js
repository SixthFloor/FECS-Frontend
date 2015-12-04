/* global angular */

;(function () {
  angular
    .module('services.register', [])
    .service('registerService', registerService)

  registerService.$inject = ['$http', 'environment']
  function registerService ($http, environment) {
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
      zip: '',
      card_name: '',
      card_number: '',
      expirationDate: ''
    }

    self.regis = function (success, error) {
      self.member.address = self.member.adr1 + ' ' + self.member.adr2 + ' ' + self.member.province + ' ' + self.member.zip
      var expdate = Date.parse(self.member.expirationDate) / 1000
      console.log(expdate)
      var url = environment.getBaseAPI() + 'user/new'
      var parameter = {
        email: self.member.email,
        password: self.member.password,
        firstName: self.member.firstname,
        lastName: self.member.lastname,
        address1: self.member.adr1,
        address2: self.member.adr2,
        province: self.member.province,
        zipcode: self.member.zip,
        telephone_number: self.member.phonenumber,
        card_name: self.member.card_name,
        expirationDate: expdate,
        card_number: self.member.card_number
      }
      console.log(parameter)
      $http.post(url, parameter).success(success).error(error)
    }
  }
})()
