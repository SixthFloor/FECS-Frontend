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

  ProductPageController.$inject = ['$scope', '$http', 'FECSAuth']
  function ProductPageController ($scope, $http, $FECSAuth) {
    var self = this
    // $http.get('http://www.w3schools.com/angular/customers_mysql.php')
    //   .success(function (response) {
    //     self.names = response.records
    //   })

    self.productName = angular.uppercase('marrods')
    self.productID = angular.uppercase('ake48.7447')
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
    self.price = 15000
  }
})()
