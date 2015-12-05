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

  User.$inject = ['localStorageService', '$http', 'environment', 'Cart']
  function User (localStorageService, $http, environment, Cart) {
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
    self.expirationDate = ''
    self.card_number = ''
    self.role = ''

    function initUser (response) {
      self.user_id = response.user.id
      self.firstname = response.user.firstName
      self.lastname = response.user.lastName
      self.email = response.user.email
      self.address1 = response.user.address1
      self.address2 = response.user.address2
      self.province = response.user.province
      self.zipcode = response.user.zipcode
      self.telephone_number = response.user.telephone_number
      self.card_name = response.user.card_name
      self.expirationDate = response.user.expirationDate
      self.card_number = response.user.card_number
      self.setRole(response.role.name)
      console.log(self)
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
          initUser(response)
          self.setToken(response.token)
          Cart.init()
          success()
        }
      }, function (err) {
        error({error: err.data})
      })
    }

    self.logout = function () {
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
  }
})()
