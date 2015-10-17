/* global angular */

;(function () {
  angular
    .module('services.addproduct', [])
    .service('addproductService', adproductService)

  addproductService.$inject = ['$http']
  function addproductService ($http) {
    var self = this

    self.valid = true

    self.product = {
      productName: '',
      price: '',
      description: '',
      dimensionDescription: '',
      categoryID: '',
      subcategoryID: '',
      img: []
    }

    self.addproduct = function (success, error) {
      var url = 'http://128.199.112.126:3000/api/product/add'
      $http.post(url, {
        name: self.product.productName,
        price: self.product.price,
        description: self.product.description,
        dimensionDescription: self.product.dimensionDescription,
        categoryID: self.product.categoryID,
        subcategoryID: self.product.subcategoryID,
        img: self.product.img
      }).success(success).error(error)
    }
  }
})()
