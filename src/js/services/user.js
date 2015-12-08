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
    self.password = ''
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
    self.validEditProfile = true

    function initUser () {
      if (self.isAuthed()) {
        $http.defaults.headers.common['Authorization'] = self.getToken()
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
            console.log('error')
          } else {
            self.setFirstname(response.user.firstName)
            self.setLastname(response.user.lastName)
            self.setEmail(response.user.email)
            self.setRole(response.role.name)
            console.log(self.getToken())
            var req = {
              method: 'GET',
              url: environment.getBaseAPI() + 'user/' + self.email
            }
            $http(req).then(function (res) {
              var response = res.data
              if (response.status === 'error') {
                console.log('error')
              } else {
                self.setUserID(response.id)
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
      self.expirationDate = exp
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
          initUser()
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

    self.confirmProfile = function (data, success, error) {
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
          success()
        }
      }, function (err) {
        error({error: err.data})
      })
    }

    self.editprofile = function (data, success, error) {
      console.log(self.user_id)
      console.log(self.email)
      var url = environment.getBaseAPI() + 'user/edit'
      
      $http.put(url, {
        id: self.user_id,
        email: self.email,
        password: self.password,
        firstName: self.firstname,
        lastName: self.lastname
      }).success(function(response){ console.log(response)}).error(function(response){ console.log(response)})

      // var url = environment.getBaseAPI() + 'user/location'
      // var config = {
      //   headers: {
      //     'Content-type': 'application/json',
      //     'email': self.email,
      //     'password': data.pwd
      //   }
      // }
      // $http.put(url, config, {
      //   address1: self.address1,
      //   address2: self.address2,
      //   province: self.province,
      //   zipcode: self.zipcode,
      //   telephone_number: self.telephone_number
      // }).success(function(response){ console.log(response)}).error(function(response){ console.log(response)})

      // var req = {
      //  method: 'PUT',
      //  url: environment.getBaseAPI() + 'user/location',
      //  headers: {
      //     'email': self.email,
      //     'password': data.pwd
      //  },
      //  data: ''
      // }

      // $http(req).then(function(response){
      //   address1: self.address1,
      //   address2: self.address2,
      //   province: self.province,
      //   zipcode: self.zipcode,
      //   telephone_number: self.telephone_number
      // }, function(response){
      //   console.log(response)
      // });
    }

    initUser()
  }
})()
