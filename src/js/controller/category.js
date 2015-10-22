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

  CategoryPageController.$inject = ['$scope', '$http', '$state', '$stateParams']
  function CategoryPageController ($scope, $http, $state, $stateParams) {
    var self = this
    console.log($stateParams.category_name)
    self.productList = {}

    //  API path
    var url = ''
    if ($stateParams.category_name !== 'all') {
      url = 'http://188.166.245.52/api/category/' + $stateParams.category_name
    }
    else url = 'http://188.166.245.52/api/product/all'

    $http.get(url).success(function (response) {
      self.productList = response.data
      console.log(self.productList)
    })

    self.viewProduct = function (id) {
      $state.transitionTo('product', {product_id: id})
    }
  }
})()
