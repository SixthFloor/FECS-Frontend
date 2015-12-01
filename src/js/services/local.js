/* global angular */

/**
* Login service Module
*
* @description Login service Module use for provides authentication service for the projecet
every controller that have to identify the customer, authentication service has to implement this service
*/
;(function () {
  angular
    .module('services.local', ['LocalStorageModule'])
    .service('Local', Local)

  Local.$inject = ['localStorageService', '$http']
  function Local (localStorageService, $http) {
    var self = this
    self.address1 = ''
    self.address2 = ''
    self.province = ''
    self.zipcode = ''
    self.telephone_number = ''

    function initLocal () {
      console.log('YO2')
      if (self.isAuthed()) {
        var req = {
          method: 'GET',
          headers: {
            'email': 'waranyu.1234@gmail.com',
            'password': '12345678'
          },
          url: 'http://128.199.133.224/api/user/location'
        }
        $http(req).then(function (res) {
          console.log(res)
          var response = res.data
          if (response.status === 'error') {
            console.log('error22')
          } else {
            // self.setAddress1(response.local.address1)
            // self.setAddress2(response.local.address2)
            self.setProvince(response.local.province)
            self.setZipcode(response.local.zipcode)
            self.setTelephoneNumber(response.local.telephone_number)
            self.setRole(response.role.name)
            console.log('success22')
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

    // self.setAddress1 = function (address1) {
    //   self.address1 = address1
    // }

    // self.setAddress2 = function (address2) {
    //   self.address2 = address2
    // }

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
    initLocal()
  }
})()
