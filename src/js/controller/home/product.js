/* global angular */

/**
* Product Controller Module
*
* @description Product Controller module to add create all controller of this project.
*/
;(function () {
  angular
    .module('controller.productpage', [])
    .controller('ProductPageController', ProductPageController)

  ProductPageController.$inject = ['$scope', '$http', 'FECSAuth', '$stateParams']
  function ProductPageController ($scope, $http, $FECSAuth, $stateParams) {
    var self = this
    // path of mock API
    var url = 'http://128.199.112.126:3000/product/' + $stateParams.product_id
    $http.get(url).success(function (response) {
      console.log(response)
      console.log(response.data.name)
      console.log($stateParams.product_id)

      self.productName = angular.uppercase(response.data.name)
      self.productID = angular.uppercase(response.data.serialNumber)
      self.property1 = {
        repeatSelect: null,
        availableOptions: [
          {id: 'green', name: 'Green'},
          {id: 'white', name: 'White'},
          {id: 'black', name: 'Black'}
        ]
      }

      self.property2 = {
        repeatSelect: null,
        availableOptions: [
          {id: 'size30', name: 'Size-30'},
          {id: 'size32', name: 'Size-32'},
          {id: 'size34', name: 'Size-34'}
        ]
      }

      self.forceUnknownOption = function () {
        self.property1.repeatSelect = 'error'
        self.property2.repeatSelect = 'error'
      }

      self.available = 5
      self.price = response.data.price
      self.description = response.data.description
      self.category = angular.uppercase(response.data.category.name)
    })
  }
})()
