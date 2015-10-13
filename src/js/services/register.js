/* global angular */

;(function () {
  angular
    .module('services.register', [])
    .service('registerService', registerService)

  registerService.$inject = ['$http']
  function registerService ($http) {
    var self = this

    self.valid = true

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
      console.log(self.member.address)
      console.log(self.member)
      var url = 'http://128.199.112.126:3000/register'
      $http.post(url, {
        email: self.member.email,
        password: self.member.password,
        firstname: self.member.firstname,
        lastname: self.member.lastname,
        address: self.member.address,
        phonenumber: self.member.phonenumber
      }).success(success).error(error)
    }
  }
})()
