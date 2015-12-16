/* global angular */

/**
* Manage User service Module
*
* @description Manage User service Module use for provides all user list
*/
;(function () {
  angular
    .module('services.manage', ['LocalStorageModule'])
    .service('Manage', Manage)

  Manage.$inject = ['localStorageService', '$http', 'environment', 'User']
  function Manage (localStorageService, $http, environment, User) {
    var self = this
    self.userlist = null

    function initManage() {
      $http.defaults.headers.common['Authorization'] = self.getToken()
      if (self.isAuthed()) {
        var req = {
          method: 'GET',
          url: environment.getBaseAPI() + 'user/all'
        }
        $http(req).then(function (response) {
          self.userlist = response.data
        }, function (response) {
          console.log(response)
        })
      }
    }

    self.isAuthed = function () {
      if (self.getToken()) return true
      else return false
    }

    self.getToken = function () {
      var token = localStorageService.get('authToken')
      return token ? token : false
    }

    initManage()
  }
})()
