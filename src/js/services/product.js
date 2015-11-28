/* global angular */

/**
* Add Product service Module
*
* @description Product service Module uses for add/edit new product to the FECS's store.
*/
;(function () {
  angular
    .module('services.product', [])
    .service('productService', productService)

  productService.$inject = ['$http']
  function productService ($http) {
    var self = this

    self.valid = true

    self.product = {
      id: '',
      serialNumber: '',
      productName: '',
      price: '',
      description: '',
      dimensionDescription: '',
      category: null,
      subcategory: null,
      img: []
    }

    self.addproduct = function (success, error) {
      var url = 'http://128.199.133.224/api/product/new'
      $http.post(url, {
        name: self.product.productName,
        price: self.product.price,
        description: self.product.description,
        dimensionDescription: self.product.dimensionDescription,
      }).success(success).error(error)
    }

    self.addproduct2 = function (success, error) {
      var url = 'http://128.199.133.224/api/catalog/new?category='+self.product.category.name+'&subCategory='+self.product.subcategory.name
      $http.post(url, {
        id: self.product.id
      }).success(success).error(error)
    }

    self.editproduct = function (success, error) {
      var url = 'http://128.199.133.224/api/product/edit'
      $http.post(url, {
        id: self.product.id,
        serialNumber: self.product.serialNumber,
        name: self.product.productName,
        price: self.product.price,
        description: self.product.description,
        dimensionDescription: self.product.dimensionDescription
      }).success(success).error(error)
    }
  }
})()
