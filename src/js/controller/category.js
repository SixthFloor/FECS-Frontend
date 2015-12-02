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

  CategoryPageController.$inject = ['$scope', '$http', '$state', '$stateParams', '$filter', 'productService']
  function CategoryPageController ($scope, $http, $state, $stateParams, $filter, productService) {
    var self = this
    var orderBy = $filter('orderBy')
    console.log($stateParams.category_name)
    self.productList = {}
    self.sortOptions = [
      { name: 'Name A - Z', value: 'name' },
      { name: 'Name Z - A', value: '-name' },
      { name: 'Price Low to High', value: 'price' },
      { name: 'Price High to Low', value: '-price' }
    ]
    self.sort_by = self.sortOptions[0].value
    self.category_name = $stateParams.category_name

    //  API path
    var url = ''
    if (self.category_name !== 'all') {
      url = $scope.environment.getBaseAPI() + 'category/product/' + self.category_name
    }
    else url = $scope.environment.getBaseAPI() + 'product/all'

    $http.get(url).success(function (response) {
      self.productList = response
    })

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
  }
})()
