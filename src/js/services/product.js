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
  function productService ($http, environment) {
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

    self.clearProduct = function () {
      self.valid = true
      self.product.id = ''
      self.product.serialNumber = ''
      self.product.productName = ''
      self.product.price = ''
      self.product.description = ''
      self.product.dimensionDescription = ''
      self.product.category = null
      self.product.subcategory = null
      self.product.img = []
    }

    self.addproduct = function (success, error) {
      var url = environment.getBaseAPI + 'product/new'
      $http.post(url, {
        name: self.product.productName,
        price: self.product.price,
        description: self.product.description,
        dimensionDescription: self.product.dimensionDescription,
      }).success(success).error(error)
    }
    self.addproduct2 = function (success, error) {
      var url = environment.getBaseAPI + 'catalog/new?category=' + self.product.category.name + '&subCategory=' + self.product.subcategory.name
      $http.post(url, {
        id: self.product.id
      }).success(success).error(error)
    }

    self.editproduct = function (success, error, catalogID) {
      var url = environment.getBaseAPI + 'product/edit'
      $http.put(url, {
        id: self.product.id,
        serialNumber: self.product.serialNumber,
        name: self.product.productName,
        price: self.product.price,
        description: self.product.description,
        dimensionDescription: self.product.dimensionDescription
      }).success(success).error(error)
      $http.get(environment.getBaseAPI + 'type/all').success(function (response) {
        if (response.status !== 'error') {
          for ( var i = 0; i < response.length;i++) {
            if ( response[i].category.name === self.product.category.name &&
              response[i].subCategory.name === self.product.subcategory.name) {
              var newCatalog = {
                id: catalogID,
                type: {
                  id: response[i].id
                },
                productDescription: {
                  id: self.product.id
                }
              }
              console.log(newCatalog)
              url = environment.getBaseAPI + 'catalog/edit'
              $http.put(url, newCatalog).success(success).error(error)
            }
          }
        }
      })
    }

    self.deleteproduct = function (success, error) {
      console.log(self.product.id)
      var url = 'http://128.199.133.224/api/catalog/deleteByProduct'
      $http.delete(url, {
        id: self.product.id
      }).success(success).error(error)
    }
  }
})()
