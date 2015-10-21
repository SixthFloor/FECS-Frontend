/* global angular */

;(function () {
  /**
  * controller.product Module
  *
  * @author Warunyu Rerkdee
  * @description Product Controller module to add create all controller about product of this project.
  */
  angular
    .module('controller.productpage', [])
    .controller('ProductPageController', ProductPageController)
    .controller('AddProductController', AddProductController)
    .controller('EditProductController', EditProductController)

  ProductPageController.$inject = ['$scope', '$http', 'User', '$stateParams']
  function ProductPageController ($scope, $http, User, $stateParams) {
    console.log($stateParams.product_id)
    var self = this
    // path of mock API
    var url = 'http://128.199.112.126:3000/product/' + $stateParams.product_id
    if ($stateParams.product_id !== '') {
      $http.get(url).success(function (response) {
        if (response.status !== 'error') {
          console.log(response)
          console.log(response.data[0].name)
          console.log($stateParams.product_id)

          self.productName = angular.uppercase(response.data[0].name)
          self.productID = angular.uppercase(response.data[0].serialNumber)
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
          self.price = response.data[0].price
          self.description = response.data[0].description
          self.category = angular.uppercase(response.data[0].category.name)
        } else {
          console.log(response.message)
          self.is404 = true
          self.errorMessage = 'Error: Product not found'
        }
      })
    } else {
      self.is404 = true
      self.errorMessage = 'Error: Product not found'
    }
  }

  AddProductController.$inject = ['$scope', '$http', 'productService', 'Notification', 'User']
  function AddProductController ($scope, $http, productService, notification, User) {
    var self = this
    $scope.isloggedin = User.isAuthed()
    self.product = productService.product
    self.valid = productService.valid

    self.submit = function () {
      if ((self.product.productName !== '') && (self.product.price !== '') &&
        (self.product.categoryID !== '') && (self.product.subcategoryID !== '')) {
        productService.valid = true
        productService.addproduct(function (response) {
          if (response.status === 'error') {
            var msg = '<span><b>Oh snap!</b> ' + response.message + '.</span>'
            notification.error({
              message: msg,
              replaceMessage: true
            })
          } else {
            msg = '<span><b>Success!</b> Added new product.<br/>' + self.product.productName + ' is now available in FECS store.</span>'
            notification.success({
              message: msg
            })
          }
        }, function (response) {
          console.log(response)
        })
      } else {
        console.log('should be false')
        productService.valid = false
      }
      self.valid = productService.valid
      console.log(self.valid)
    }
  }

  EditProductController.$inject = ['$scope', '$http', 'User', '$stateParams', 'Notification', 'productService']
  function EditProductController ($scope, $http, User, $stateParams, notification, productService) {
    console.log($stateParams.product_id)
    var self = this
    $scope.isloggedin = User.isAuthed()
    self.product = productService.product
    self.valid = productService.valid
    // path of real API
    var url = 'http://188.166.245.52/api/product/' + $stateParams.product_id
    if ($stateParams.product_id !== '') {
      $http.get(url).success(function (response) {
        if (response.status !== 'error') {
          self.product.serialNumber = response.data.serialNumber
          self.product.productName = response.data.name
          self.product.price = response.data.price
          self.product.description = response.data.description
          self.product.dimensionDescription = response.data.dimensionDescription
          self.product.categoryID = '' + response.data.subCategory.category.id
          self.product.subcategoryID = '' + response.data.subCategory.id
          self.product.img = response.data.images
        } else {
          console.log(response.message)
          self.is404 = true
          self.errorMessage = 'Error: Product not found'
        }
      })
    } else {
      self.is404 = true
      self.errorMessage = 'Error: Product not found'
    }

    self.submit = function () {
      if ((self.product.productName !== '') && (self.product.price !== '') &&
        (self.product.categoryID !== '') && (self.product.subcategoryID !== '')) {
        productService.valid = true
        productService.editproduct(function (response) {
          if (response.status === 'error') {
            var msg = '<span><b>Oh snap!</b> ' + response.message + '.</span>'
            notification.error({
              message: msg,
              replaceMessage: true
            })
          } else {
            msg = '<span><b>Success!</b> Edited Product ID: ' + self.productID + '<br/>' + self.product.productName + "'s datas saved.</span>"
            notification.success({
              message: msg
            })
          }
        }, function (response) {
          console.log(response)
        })
      } else {
        console.log('should be false')
        productService.valid = false
      }
      self.valid = productService.valid
    }
  }
})()
