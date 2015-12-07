/* global angular */

/**
* Category service Module
*
* @auth Chinnaporn Soonue
* @description Category service - store all product list
*/
;(function () {
  angular
    .module('services.products', [])
    .service('productList', productList)

  productList.$inject = ['environment', '$http', 'searchService']
  function productList (environment, $http, searchService) {
    var self = this
    self.products = []

    self.getProductList = function (type) {
      var url = ''
      if (type === 'search') {
        url = environment.getBaseAPI() + 'product/search?query=' + searchService.getSearchQuery()
      } else if (type !== 'all') {
        url = environment.getBaseAPI() + 'category/product/' + type
      } else {
        url = environment.getBaseAPI() + 'product/all'
      }
      console.log(url)
      $http.get(url).success(function (response) {
        self.products = response
      })
    }
  }
})()
