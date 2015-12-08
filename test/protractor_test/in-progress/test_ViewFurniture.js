/* Test case: View furniture category*/
/* Created by Runyasak */

var request = require('request')

describe('view furniture', function() {

  var furnitureData = ''
  var allViewProductButton = element.all(by.css('[ng-click="categorypageCtrl.viewProduct(product.serialNumber)"]'))

  var allProductName = element.all(by.id('product-name'))
  var allProductPrice = element.all(by.id('product-price'))
  var allProductSerial = element.all(by.id('product-serial'))
  var allProductDescription = element.all(by.id('product-description'))
  var allProductDimensionDescription = element.all(by.id('product-dimensionDescription'))
  var allProductQuantity = element.all(by.id('product-quantity'))

	// request all furniture from database
  request
    .get('http://128.199.133.224/api/product/all')
    .on('data', function(response) {
      furnitureData += response
    })
    .on('end', function(){
      furnitureAll = JSON.parse(furnitureData)
      furnitureAll.sort(function (a, b){
          return a.name.localeCompare(b.name)
      })
    })

  function waitForElement(){
    return browser.wait( function() {
            var deferred = protractor.promise.defer()
              element(by.repeater('product in categorypageCtrl.productList | orderBy:categorypageCtrl.sort_by')).isPresent()
                .then(function (isPresent){
                  deferred.fulfill(isPresent)
                })
              return deferred.promise
            }, 5000, 'Server should start within 5 seconds')
  }

  function expectProductDescription(){
    waitForElement().then( function(){
      for(var i = 0; i < furnitureAll.length; i++){
        (function (i){
          allViewProductButton.get(i).click()
          // check product name
          allProductName.get(i).getText().then(function(name){
            expect(name).toEqual(furnitureAll[i].name)
          })
          // check product price
          allProductPrice.get(i).getText().then(function(price){
            expect(parseInt(price.substring(1))).toEqual(furnitureAll[i].price)
          })
          // Serial number: AG7718
          // check product serial
          allProductSerial.get(i).getText().then(function(serial){
            expect(serial.substring(15)).toEqual(furnitureAll[i].serialNumber)
          })
          // check product dimension description
          allProductQuantity.get(i).getText().then(function(quantity){
            expect(parseInt(quantity.substring(10))).toEqual(furnitureAll[i].quantity)
          })
          // check product description
          allProductDescription.get(i).getText().then(function(description){
            expect(description).toEqual(furnitureAll[i].description)
          })
          // check product dimension description
          allProductDimensionDescription.get(i).getText().then(function(dimensionDescription){
            expect(dimensionDescription).toEqual(furnitureAll[i].dimensionDescription)
          })
          // // check product image
          // allProductImg.get(i).getAttribute('src').then(function(img){
          //   expect(img).toEqual(furnitureAll[i].images[0].link)
          // })
        }(i))
      }
    })
  }

  beforeEach(function() {
    browser.get('http://localhost:3030/#')
  })

	it('should be able to view all product and all descriptions are corrected', function() {
  	expectProductDescription()
  })
	

})
