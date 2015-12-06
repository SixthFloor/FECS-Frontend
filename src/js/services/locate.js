/* global angular */

/**
* Login service Module
*
* @description Login service Module use for provides authentication service for the projecet
every controller that have to identify the customer, authentication service has to implement this service
*/
;(function () {
  angular
    .module('services.locate', ['LocalStorageModule'])
    .service('Locate', Locate)

  Locate.$inject = ['localStorageService', '$http', 'environment', 'User']
  function Locate (localStorageService, $http, environment, User) {
    var self = this
    self.address1 = ''
    self.address2 = ''
    self.province = ''
    self.zipcode = ''
    self.telephone_number = ''
    self.card_name = ''
    self.card_number = ''
    self.expirationDate = ''

    function initLocate () {
      if (self.isAuthed()) {
        var req = {
          method: 'GET',
          url: environment.getBaseAPI() + 'user/' + User.email
        }
        $http(req).then(function (res) {
          var response = res.data
          if (response.status === 'error') {
            console.log('error')
          } else {
            console.log(response)
            self.setAddress1(response.address1)
            self.setAddress2(response.address2)
            self.setProvince(response.province)
            self.setZipcode(response.zipcode)
            self.setTelephoneNumber(response.telephone_number)
            self.setCardName(response.card_name)
            self.setCardNumber(response.card_number)
            self.setCardExpDate(response.expirationDate)
            self.setRole(response.role.name)
            
            // console.log(self)
          }
        }, function (err) {
          console.log(err)
        })
      }
    }

    self.editprofile = function (success, error) {
      console.log("IN")
      var url = environment.getBaseAPI() + 'user/edit'
      $http.put(url, {
        id: "375",
        email: "waranyu.12345@gmail.com",
        password: "12345678",
        firstName: "DOK",
        lastName: "PED"
      }).success(success).error(error)
    }

    self.setCardName = function (card_name) {
      self.card_name = card_name
    }

    self.setCardNumber = function (card_number) {
      self.card_number = card_number
    }

    self.setCardExpDate = function (expirationDate) {
      self.expirationDate = expirationDate
    }

    self.isAuthed = function () {
      if (self.getToken()) return true
      else return false
    }

    self.isAdmin = function () {
      return (self.role === 'owner' || self.role === 'staff' || self.role === 'admin')
    }

    self.setAddress1 = function (address1) {
      self.address1 = address1
    }

    self.setAddress2 = function (address2) {
      self.address2 = address2
    }

    self.setProvince = function (province) {
      self.province = province
    }

    self.setZipcode = function (zipcode) {
      self.zipcode = zipcode
    }

    self.setTelephoneNumber = function (telephone_number) {
      self.telephone_number = telephone_number
    }

    self.setRole = function (role) {
      self.role = role
    }

    self.setToken = function (token) {
      localStorageService.set('authToken', token)
    }

    self.getToken = function () {
      var token = localStorageService.get('authToken')
      return token ? token : false
    }

    initLocate()
  }
})()
