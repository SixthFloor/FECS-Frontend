/* global angular */

/**
* Login service Module
*
* @description Login service Module use for provides authentication service for the projecet
every controller that have to identify the customer, authentication service has to implement this service
*/
;(function () {
  angular
    .module('services.login', ['LocalStorageModule'])
    .service('User', User)

  User.$inject = ['localStorageService', '$http', 'environment', 'Cart', 'moment']
  function User (localStorageService, $http, environment, Cart, moment) {
    var self = this
    self.user_id = ''
    self.email = ''
    self.firstname = ''
    self.lastname = ''
    self.address1 = ''
    self.address2 = ''
    self.province = ''
    self.zipcode = ''
    self.telephone_number = ''
    self.card_name = ''
    self.expirationDate = {
      year: '2015',
      month: '1'
    }
    self.card_number = ''
    self.role = ''

    function setUser (data) {
      $http.defaults.headers.common['Authorization'] = self.getToken()
      self.setUserID(data.user.id)
      self.setAddress1(data.user.address1)
      self.setAddress2(data.user.address2)
      self.setProvince(data.user.province)
      self.setZipcode(data.user.zipcode)
      self.setTelephoneNumber(data.user.telephone_number)
      self.setCardName(data.user.card_name)
      self.setCardNumber(data.user.card_number)
      self.setCardExpDate(data.user.expirationDate)
      self.setFirstname(data.user.firstName)
      self.setLastname(data.user.lastName)
      self.setEmail(data.user.email)
      self.setRole(data.role.name)
    }
    function initUser () {
      if (self.isAuthed()) {
        var req = {
          method: 'POST',
          data: {
            token: self.getToken()
          },
          url: environment.getBaseAPI() + 'authentication/token'
        }
        $http(req).then(function (res) {
          var response = res.data
          if (response.status === 'error') {
            self.logout()
          } else {
            setUser(response)
          }
        }, function (err) {
          self.logout()
        })
      }
    }

    self.isAuthed = function () {
      if (self.getToken()) return true
      else return false
    }

    self.isAdmin = function () {
      return (self.role === 'owner' || self.role === 'staff' || self.role === 'admin')
    }

    self.setRole = function (role) {
      self.role = role
    }
    self.setEmail = function (email) {
      self.email = email
    }

    self.setFirstname = function (firstname) {
      self.firstname = firstname
    }

    self.setLastname = function (lastname) {
      self.lastname = lastname
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

    self.setTelephoneNumber = function (number) {
      self.telephone_number = number
    }

    self.setCardNumber = function (cardNumber) {
      self.card_number = cardNumber
    }

    self.setCardName = function (cardName) {
      self.card_name = cardName
    }

    self.setCardExpDate = function (exp) {
      if (exp) {
        var date = moment(exp)
        self.expirationDate.year = date.year()
        self.expirationDate.month = date.month()
      }
    }

    self.setUserID = function (uID) {
      self.user_id = uID
    }

    self.setToken = function (token) {
      localStorageService.set('authToken', token)
    }

    self.getToken = function () {
      var token = localStorageService.get('authToken')
      return token ? token : false
    }

    self.login = function (data, success, error) {
      var req = {
        method: 'POST',
        data: {
          email: angular.lowercase(data.email),
          password: data.pwd
        },
        url: environment.getBaseAPI() + 'authentication/login'
      }
      $http(req).then(function (res) {
        var response = res.data
        if (response.status === 'error') {
          error({error: response.message})
        } else {
          self.setToken(response.token)
          setUser(response)
          Cart.init()
          success()
        }
      }, function (err) {
        error({error: err.data})
      })
    }

    self.logout = function () {
      delete $http.defaults.headers.common['Authorization']
      localStorageService.remove('authToken')
      Cart.clear()
      self.user_id = ''
      self.email = ''
      self.firstname = ''
      self.lastname = ''
      self.address1 = ''
      self.address2 = ''
      self.province = ''
      self.zipcode = ''
      self.telephone_number = ''
      self.card_name = ''
      self.expirationDate = ''
      self.card_number = ''
      self.setRole('')
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

    initUser()
  }
})()
