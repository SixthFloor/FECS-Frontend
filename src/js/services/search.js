/* global angular */

/**
* Search service Module
*
* @description Search service Module use to store variable of search query to share allover the controller
*/
;(function () {
  angular
    .module('services.search', [])
    .service('searchService', searchService)

  searchService.$inject = ['$http']
  function searchService ($http) {
    var self = this

    self.query = ''

    self.getSearchQuery = function () {
      return self.query
    }

    self.setQuery = function (query) {
      self.query = query
    }
  }
})()
