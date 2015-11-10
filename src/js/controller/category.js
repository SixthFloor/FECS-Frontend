/* global angular */

;(function () {
  /**
  * controller.home Module
  *
  * @author Chinnaporn Soonue
  * @description Category Controller module to add create all controller of this project.
  */
  angular
    .module('controller.categorypage', [])
    .controller('CategoryPageController', CategoryPageController)

  CategoryPageController.$inject = ['$scope', '$http', '$state', '$stateParams', '$filter']
  function CategoryPageController ($scope, $http, $state, $stateParams, $filter) {
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
      url = 'http://128.199.133.224/api/category/' + self.category_name
    }
    else url = 'http://128.199.133.224/api/furniture/all'

    $http.get(url).success(function (response) {
      self.productList = response
      console.log(self.productList)
    })

    self.viewProduct = function (id) {
      $state.transitionTo('product', {product_id: id})
    }

    self.capitalize = function (string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
    self.category_name = self.capitalize(self.category_name)

    self.order = function () {
      console.log("ORDERRR")
      self.productList = orderBy(self.productList, self.sort_by)
    }
  }
})()
