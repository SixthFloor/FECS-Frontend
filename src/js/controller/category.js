/* global angular */

;(function () {
  /**
  * controller.categorypage Module
  *
  * @author Jiratchaya Intaragumhaneg
  * @description Category Controller module use for view products by their category , can sort the products
  */
  angular
    .module('controller.categorypage', [])
    .controller('CategoryPageController', CategoryPageController)

  CategoryPageController.$inject = ['$scope', '$http', '$state', '$stateParams', '$filter', 'productService', 'searchService', 'storeProduct']
  function CategoryPageController ($scope, $http, $state, $stateParams, $filter, productService, searchService, storeProduct) {
    var self = this
    var orderBy = $filter('orderBy')
    self.productList = storeProduct.store
    self.sortOptions = [
      { name: 'Name A - Z', value: 'name' },
      { name: 'Name Z - A', value: '-name' },
      { name: 'Price Low to High', value: 'price' },
      { name: 'Price High to Low', value: '-price' }
    ]
    self.sort_by = self.sortOptions[0].value
    self.category_name = $stateParams.category_name

    self.init = function () {
      //  API path
      self.url = ''
      if (self.category_name === 'search' || searchService.getSearchQuery() !== '') {
        self.url = $scope.environment.getBaseAPI() + 'product/search?query=' + searchService.getSearchQuery()
      }
      else if (self.category_name !== 'all') {
        self.url = $scope.environment.getBaseAPI() + 'category/product/' + self.category_name
      }
      else self.url = $scope.environment.getBaseAPI() + 'product/all'

      $http.get(self.url).success(function (response) {
        storeProduct.store.products = response
      })
    }

    self.viewProduct = function (id) {
      $state.transitionTo('product', {product_id: id})
    }

    // Change the first letter to upper case
    self.capitalize = function (string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }

    // Sort function that sort the product list by sortOptions
    self.order = function () {
      self.productList = orderBy(self.productList, self.sort_by)
    }

    self.directToAdd = function () {
      productService.clearProduct()
      $state.transitionTo('addproduct')
    }

    self.clear = function () {
      self.price = 0
      self.init()
    }

    self.filterPrice = function (list) {
      var filter = []
      if (list !== undefined) {
        for (var i = 0; i < list.length; i++) {
          switch (self.price) {
            case '1':
              if (list[i].price < 1000) {
                filter.push(list[i])
              }
              break
            case '2':
              if (list[i].price >= 1000 && list[i].price <= 5000) {
                filter.push(list[i])
              }
              break
            case '3':
              if (list[i].price >= 5000 && list[i].price <= 10000) {
                filter.push(list[i])
              }
              break
            case '4':
              if (list[i].price > 10000) {
                filter.push(list[i])
              }
              break
            default:
                filter = list
          }
        }
      }
      return filter
    }
    self.init()
  }
})()
