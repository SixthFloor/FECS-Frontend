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

    function initUser () {
      if (self.isAuthed()) {
        var req = {
          method: 'POST',
          data: {
            token: self.getToken()
          },
          url: 'http://128.199.133.224/api/authentication/token'
        }
        $http(req).then(function (res) {
          console.log(res)
          var response = res.data
          if (response.status === 'error') {
            console.log('error')
          } else {
            self.setFirstname(response.user.firstName)
            self.setLastname(response.user.lastName)
            self.setEmail(response.user.email)
            self.setRole(response.role.name)
            console.log('success')
            console.log(self)
          }
        }, function (err) {
          console.log(err)
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
          self.setFirstname(response.user.firstName)
          self.setLastname(response.user.lastName)
          self.setEmail(response.user.email)
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
      self.setEmail('')
      self.setRole('')
      self.setFirstname('')
      self.setLastname('')
    }
    initUser()
  }
})()
