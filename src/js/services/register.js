/* global angular */

;(function () {
  angular
    .module('services.register', ['angularMoment'])
    .service('registerService', registerService)

<<<<<<< HEAD
  registerService.$inject = ['$http', 'environment', 'moment']
  function registerService ($http, environment, moment) {
=======
  registerService.$inject = ['$http', 'environment']
  function registerService ($http, environment) {
>>>>>>> 16a6fa4d3f466f17199d25b25e419d51f178797e
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
<<<<<<< HEAD
      expirationDate: {
        month: '1',
        year: '2015'
      }
=======
      expirationDate: null
>>>>>>> 16a6fa4d3f466f17199d25b25e419d51f178797e
    }

    self.regis = function (success, error) {
      self.member.address = self.member.adr1 + ' ' + self.member.adr2 + ' ' + self.member.province + ' ' + self.member.zip
<<<<<<< HEAD
      var expdate = moment.utc([
        self.member.expirationDate.year,
        parseInt(self.member.expirationDate.month, 10) - 1,
        1,
        0
      ])
      var expdate_unix = expdate.valueOf()
=======
      var expdate = Date.parse(self.member.expirationDate) / 1000
      console.log(expdate)
      console.log(self.member.expirationDate)
>>>>>>> 16a6fa4d3f466f17199d25b25e419d51f178797e
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
<<<<<<< HEAD
        expirationDate: expdate_unix,
=======
        expirationDate: expdate,
>>>>>>> 16a6fa4d3f466f17199d25b25e419d51f178797e
        card_number: self.member.card_number
      }
      console.log(parameter)
      $http.post(url, parameter).success(success).error(error)
    }
  }
})()
