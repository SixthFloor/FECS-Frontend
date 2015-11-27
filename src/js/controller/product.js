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
    // API path
    var url = 'http://128.199.133.224/api/product/' + $stateParams.product_id
    if ($stateParams.product_id !== '') {
      $http.get(url).success(function (response) {
        if (response.status !== 'error') {
          console.log(response)
          console.log(response.name)
          console.log($stateParams.product_id)

          self.productName = response.name
          self.productID = angular.uppercase(response.serialNumber)

          self.available = 5
          self.price = response.price
          self.images = response.images
          self.description = response.description
          self.dimensionDescription = response.dimensionDescription
          self.category = angular.uppercase(response.subCategory.category.name)
        } else {
          console.log(response.message)
          self.is404 = true
          self.errorMessage = 'Error: Furniture not found'
        }
      })
    } else {
      self.is404 = true
      self.errorMessage = 'Error: Furniture not found'
    }
  }

  AddProductController.$inject = ['$scope', '$http', 'productService', 'Notification', 'User']
  function AddProductController ($scope, $http, productService, notification, User) {
    var self = this
    $scope.isloggedin = User.isAuthed()
    self.product = productService.product
    self.valid = productService.valid
    self.categoryList = {}
    self.subcategoryList = {}
    // Get all categories
    $http.get('http://128.199.133.224/api/category/all').success(function (response) {
      if (response.status !== 'error') {
        self.categoryList = response
      } else {
        console.log(response.message)
        self.is404 = true
        self.errorMessage = 'Error: Cannot get categories.'
      }
    })
    // Get subcategories from category
    self.getSubcat = function () {
      $http.get('http://128.199.133.224/api/category/'+self.product.category.name).success(function (response) {
        if (response.status !== 'error') {
          self.subcategoryList = response
        } else {
          console.log(response.message)
          self.is404 = true
          self.errorMessage = 'Error: Cannot get categories.'
        }
      })
    }
    self.submit = function () {
      if ((self.product.productName !== '') && (self.product.price !== '') &&
        (self.product.category !== null) && (self.product.subcategory !== null)) {
        productService.valid = true
        productService.addproduct(function (response) {
          if (response.status === 'error') {
            var msg = '<span><b>Oh snap!</b> ' + response.message + '.</span>'
            notification.error({
              message: msg,
              replaceMessage: true
            })
          } else {
            msg = '<span><b>Success!</b> Added new furniture.<br/>' + self.product.productName + ' is now available in FECS store.</span>'
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
    self.categoryList = {}
    self.subcategoryList = {}
    // path of real API
    var url = 'http://128.199.133.224/api/product/' + $stateParams.product_id
    if ($stateParams.product_id !== '') {
      $http.get(url).success(function (response) {
        if (response.status !== 'error') {
          self.product.id = response.id
          self.product.serialNumber = response.serialNumber
          self.product.productName = response.name
          self.product.price = response.price
          self.product.description = response.description
          self.product.dimensionDescription = response.dimensionDescription
        } else {
          console.log(response.message)
          self.is404 = true
          self.errorMessage = 'Error: Furniture not found'
        }
      })
    } else {
      self.is404 = true
      self.errorMessage = 'Error: Furniture not found'
    }
    // Get all categories
    $http.get('http://128.199.133.224/api/category/all').success(function (response) {
      if (response.status !== 'error') {
        self.categoryList = response
      } else {
        console.log(response.message)
        self.is404 = true
        self.errorMessage = 'Error: Cannot get categories.'
      }
    })
    // Get subcategories from category
    self.getSubcat = function () {
      $http.get('http://128.199.133.224/api/category/'+self.product.category.name).success(function (response) {
        if (response.status !== 'error') {
          self.subcategoryList = response
        } else {
          console.log(response.message)
          self.is404 = true
          self.errorMessage = 'Error: Cannot get categories.'
        }
      })
    }

    self.submit = function () {
      if ((self.product.productName !== '') && (self.product.price !== '') &&
        (self.product.category !== '') && (self.product.subcategory !== '')) {
        productService.valid = true
        productService.editproduct(function (response) {
          if (response.status === 'error') {
            var msg = '<span><b>Oh snap!</b> ' + response.message + '.</span>'
            notification.error({
              message: msg,
              replaceMessage: true
            })
          } else {
            msg = '<span><b>Success!</b> Edited Furniture ID: ' + self.productID + '<br/>' + self.product.productName + "'s datas saved.</span>"
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
