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

  User.$inject = ['localStorageService', '$http']
  function User (localStorageService, $http) {
    var self = this
    self.email = ''
    self.firstname = ''
    self.lastname = ''
    self.role = ''

    self.isAuthed = function () {
      if (self.getToken()) return true
      else return false
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

    self.setRole = function (role) {
      self.role = role
    }

    self.setToken = function (token) {
      localStorageService.set('authToken', token)
    }

    self.getToken = function () {
      var token = localStorageService.get('authToken')
      console.log(token)
      return token ? token : false
    }

    self.login = function (data, success, error) {
      var req = {
        method: 'POST',
        data: {
          email: data.email,
          password: data.pwd
        },
        url: 'http://128.199.133.224/api/authentication/login'
      }
      $http(req).then(function (res) {
        var response = res.data
        if (response.status === 'error') {
          error({error: response.message})
        } else {
          self.setToken(response.token)
          self.setRole(response.role.name)
          success()
        }
      }, function (err) {
        error({error: err.data})
      })
    }

    self.logout = function () {
      localStorageService.remove('authToken')
    }
  }
})()
