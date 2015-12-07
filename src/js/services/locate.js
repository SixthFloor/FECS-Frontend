/**
* Location service Module
*/
;(function () {
  angular
    .module('services.locate', ['LocalStorageModule'])
    .service('Locate', Locate)

  Locate.$inject = ['localStorageService', '$http', 'environment', 'User']
  function Locate (localStorageService, $http, environment, User) {
    var self = this
    self.valid = true
    self.profile = {
      id: '',
      email: '',
      password: '12345678',
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      province: '',
      zipcode: '',
      telephone_number: '',
      card_name: '',
      card_number: '',
      expirationDate: ''
    }

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
            self.setID(response.id)
            self.setEmail(response.email)
            self.setFirstName(response.firstName)
            self.setLastName(response.lastName)
            self.setAddress1(response.address1)
            self.setAddress2(response.address2)
            self.setProvince(response.province)
            self.setZipcode(response.zipcode)
            self.setTelephoneNumber(response.telephone_number)
            self.setCardName(response.card_name)
            self.setCardNumber(response.card_number)
            self.setCardExpDate(response.expirationDate)
          }
        }, function (err) {
          console.log(err)
        })
      }
    }

    self.editprofile = function (success, error) {
      var url = environment.getBaseAPI() + 'user/edit'
      $http.put(url, {
        id: self.profile.id,
        email: self.profile.email,
        password: self.profile.password,
        firstName: self.profile.firstName,
        lastName: self.profile.lastName
      }).success(success).error(error)
    }

    self.setID = function (id) {
      self.profile.id = id
    }

    self.setEmail = function (email) {
      self.profile.email = email
    }

    self.setPassword = function (password) {
      self.profile.password = password
    }

    self.setFirstName = function (firstName) {
      self.profile.firstName = firstName
    }

    self.setLastName = function (lastName) {
      self.profile.lastName = lastName
    }

    self.setCardName = function (card_name) {
      self.profile.card_name = card_name
    }

    self.setCardName = function (card_name) {
      self.profile.card_name = card_name
    }

    self.setCardNumber = function (card_number) {
      self.profile.card_number = card_number
    }

    self.setCardExpDate = function (expirationDate) {
      self.profile.expirationDate = expirationDate
    }

    self.setAddress1 = function (address1) {
      self.profile.address1 = address1
    }

    self.setAddress2 = function (address2) {
      self.profile.address2 = address2
    }

    self.setProvince = function (province) {
      self.profile.province = province
    }

    self.setZipcode = function (zipcode) {
      self.profile.zipcode = zipcode
    }

    self.setTelephoneNumber = function (telephone_number) {
      self.profile.telephone_number = telephone_number
    }

    self.isAuthed = function () {
      if (self.getToken()) return true
      else return false
    }

    self.isAdmin = function () {
      return (self.role === 'owner' || self.role === 'staff' || self.role === 'admin')
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
