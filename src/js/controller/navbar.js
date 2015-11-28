/* global angular */

;(function () {
  /**
  * controller.home Module
  *
  * @author Jiratchaya Intaragumhaneg
  * @description Homepage Controller module to add create all controller of this project.
  */
  angular
    .module('controller.navbar', [])
    .controller('NavbarController', NavbarController)

  NavbarController.$inject = ['$scope', '$http', 'User']
  function NavbarController ($scope, $http, User) {
    var self = this

    self.isAuthed = User.isAuthed()
    if (User.isAuthed()) {
      $http.defaults.headers.common['Authorization'] = User.getToken()
    } else {
      delete $http.defaults.headers.common['Authorization']
    }
    console.log($http.defaults.headers.common)

    // API to get email address
    var url = 'http://128.199.133.224/api/authentication/token'
    $http.post(url, {
      token: User.getToken()
    }).success(function (response) {
      console.log(response)
      self.fullname = response.firstName + ' ' + response.lastName
    })
  }
})()
