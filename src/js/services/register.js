/* global angular */

;(function () {
  angular
    .module('services.register', ['angularMoment'])
    .service('registerService', registerService)

  registerService.$inject = ['$http', 'environment', 'moment']
  function registerService ($http, environment, moment) {
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
      phonenumber: null,
      address: null,
      adr1: null,
      adr2: null,
      province: null,
      zip: null,
      card_name: null,
      card_number: null,
      expirationDate: {
        month: '1',
        year: '2015'
      }
    }

    self.regis = function (success, error) {
      self.member.address = self.member.adr1 + ' ' + self.member.adr2 + ' ' + self.member.province + ' ' + self.member.zip
      var expdate = moment.utc([
        self.member.expirationDate.year,
        parseInt(self.member.expirationDate.month, 10) - 1,
        1,
        0
      ])
      var expdate_unix = expdate.valueOf()
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
        expirationDate: expdate_unix,
        card_number: self.member.card_number
      }
      console.log(parameter)
      $http.post(url, parameter).success(success).error(error)
    }
  }
})()
