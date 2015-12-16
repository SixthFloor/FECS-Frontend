/* Test case: View furniture category*/
/* Created by Runyasak */

var request = require('request')

describe('View furniture', function() {

  var allViewProductButton = element.all(by.id('view-button'))

  var productName = $('#product-name')
  var productPrice = $('#product-price')
  var productSerial = $('#product-serial')
  var productQuantity = $('#product-quantity')
  var productDescription = $('#product-description')
  var productDemensionDescription = $('#product-dimensionDescription')

  var furnitureData = ''

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
              $('#product').isPresent()
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
          productName.getText().then(function(name){
            // console.log(furnitureAll[i].name)
            // console.log(name)
            expect(name).toEqual(furnitureAll[i].name)
          })
          // check product price
          productPrice.getText().then(function(price){
            expect(parseInt(price.substring(1))).toEqual(furnitureAll[i].price)
          })
          // check product serial
          productSerial.getText().then(function(serial){
            expect(serial.substring(15)).toEqual(furnitureAll[i].serialNumber)
          })
          // check product quantity
          if(furnitureAll[i].quantity == 0){
            expect($('#outofstock').isPresent())
          } else {
            productQuantity.getText().then(function(quantity){
              expect(parseInt(quantity.substring(10))).toEqual(furnitureAll[i].quantity)
            })
          }
          // check product description
          productDescription.getText().then(function(description){
            // console.log('web: ' + description)
            // console.log('api: ' + furnitureAll[i].description.replace(/(\r\n|\r|\n|\\n){1,}/g, ' '))
            expect(description).toEqual(furnitureAll[i].description.replace(/(\r\n|\r|\n|\\n){1,}/g, ' ').trim())
          })
          // check product dimension description
          productDemensionDescription.getText().then(function(dimensionDescription){
            // console.log('web: ' + dimensionDescription)
            // console.log('api: ' + furnitureAll[i].dimensionDescription.replace(/(\r\n|\r|\n|\\n){1,}/g, ' '))
            expect(dimensionDescription).toEqual(furnitureAll[i].dimensionDescription.replace(/(\r\n|\r|\n|\\n){1,}/g, ' ').trim())
          })
          // // check product image
          // allProductImg.get(i).getAttribute('src').then(function(img){
          //   expect(img).toEqual(furnitureAll[i].images[0].link)
          // })
          // browser.navigate().back()
          browser.get('http://localhost:3030/#/category/all')
        }(i))
      }
    })
  }

  beforeEach(function() {
    browser.get('http://localhost:3030/#')
  })

	it('should be able to view all product and all descriptions are corrected', function() {
    $('#category-button').click()
    element(by.css('[href="#/category/all"]')).click()
    allViewProductButton.then(function(element){
      console.log(element.length)
    })
    console.log(furnitureAll.length)
  	expectProductDescription()
  })

  it('should appear \"Product Not Found\" page when access to product with wrong serial number', function() {
    browser.get('http://localhost:3030/#/product/993212')
    $('#product-notfound').getText().then(function(text) {
      expect(text).toEqual('Product Not Found')
    })
  })
})
