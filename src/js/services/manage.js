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

  Manage.$inject = ['localStorageService', '$http', '$filter', '$q', 'environment', 'User']
  function Manage (localStorageService, $http, $filter, $q, environment, User) {
    var self = this
    self.userlist = null
    self.getData = getData
    function getData (params) {
      var deferred = $q.defer()
      var req = {
        method: 'GET',
        url: environment.getBaseAPI() + 'user/all'
      }
      $http(req).then(function (response) {
        self.userlist = response.data
        var orderedData = params.sorting() ? $filter('orderBy')(self.userlist, params.orderBy()) : self.userlist
        orderedData = params.filter() ? $filter('filter')(orderedData, params.filter()) : orderedData
        params.total(orderedData.length)
        deferred.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()))
      }, function (response) {
        deferred.reject(response)
      })
      return deferred.promise
    }
  }
})()
