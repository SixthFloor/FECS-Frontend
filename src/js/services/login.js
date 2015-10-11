/* global angular */

/**
* Login service Module
*
* @description Login service Module use for provides authentication service for the projecet
every controller that have to identify the customer, authentication service has to implement this service
*/
;(function () {
  angular
    .module('services.login', [])
    .service('FECSAuth', FECSAuth)

  FECSAuth.$inject = ['localStorageService', '$http']
  function FECSAuth (localStorageService, $http) {
    var self = this

    self.test = 'Hello'

    self.isAuthed = function () {
      if (self.getToken()) return true
      else return false
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
        headers: {
          'Content-Type': undefined
        },
        url: 'http://128.199.112.126:3000/login'
      }
      $http(req).then(function (res) {
        var response = res.data
        success({success: response.access_token})
      }, function (err) {
        console.log(err)
        error({error: err.data})
      })
    }

    self.logout = function () {
      localStorageService.remove('authToken')
    }
  }
})()
