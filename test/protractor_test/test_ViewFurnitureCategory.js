/* Test case: View furniture category*/
/* Created by Niti and Runyasak */

var request = require('request')

describe('view furniture category', function() {
  //  locator for button at homepage
	var allProduct = element.all(by.repeater('product in categorypageCtrl.productList | orderBy:categorypageCtrl.sort_by'))
  var categoryButton = $('#category-button')
	var categoryAllButton =  element(by.css('[href="#/category/all"]'))

  //  locator for product
	var allViewProductButton = element.all(by.css('[ng-click="categorypageCtrl.viewProduct(product.serialNumber)"]'))
  var allProductName = element.all(by.id('product-name'))
  var allProductSerial = element.all(by.id('product-serial'))
  var allProductPrice = element.all(by.id('product-price'))
  var allProductImg = element.all(by.id('product-img'))

  //  variable for receive data from API
  var furnitureAll = ''
  var furnitureData = ''

  // request all furniture from database
  function getFurnitureFromAPI(address) {
    furnitureAll = ''
    furnitureData = ''
    request
      .get(address)
      .on('data', function(response) {
          furnitureData += response
      })
      .on('end', function(){
          furnitureAll = JSON.parse(furnitureData)
          furnitureAll.sort(function (a, b){
              return a.name.localeCompare(b.name)
          })
      })
  }

  function goToCategory(room) {
    categoryButton.click()
    switch(room) {
      case 'all':
        element(by.css('[href="#/category/all"]')).click()
        break
      case 'bedroom':
        element(by.css('[href="#/category/Bedroom"]')).click()
        break
      case 'bathroom':
        element(by.css('[href="#/category/Bathroom"]')).click()
        break
      case 'dinning room':
        element.all(by.css('[href="#/category/Dinning%20Room"]')).get(0).click()
        break
      case 'kitchen':
        element(by.css('[href="#/category/Kitchen"]')).click()
        break
      case 'living room':
        element(by.css('[href="#/category/Living%20Room"]')).click()
        break
    }
  }

  function waitForElement(){
    return browser.wait( function() {
            var deferred = protractor.promise.defer()
              allProduct.get(0).isPresent()
                .then(function (isPresent){
                  deferred.fulfill(isPresent)
                })
              return deferred.promise
            }, 2000)
  }

  function expectProductDescription(){
    waitForElement().then( function(){
      for(var i = 0; i < furnitureAll.length; i++){
        (function (i){
          // check product name
          allProductName.get(i).getText().then(function(name){
            expect(name).toEqual(furnitureAll[i].name)
          })
          // check product serial
          allProductSerial.get(i).getText().then(function(serial){
            expect(serial.substring(1, serial.length-1)).toEqual(furnitureAll[i].serialNumber)
          })
          // check product price
          allProductPrice.get(i).getText().then(function(price){
            expect(parseInt(price.substring(0, price.length-5))).toEqual(furnitureAll[i].price)
          })
          // check product image
          allProductImg.get(i).getAttribute('src').then(function(img){
            expect(img).toEqual(furnitureAll[i].images[0].link)
          })
        }(i))
      }
    })
  }

  beforeEach(function() {
    browser.get('http://localhost:3030/#')
  })

  it('should show all product with complete descriptions at category all page', function(){
    getFurnitureFromAPI('http://128.199.133.224/api/product/all')
    goToCategory('all')
    expectProductDescription()
  })

  it('should show all product with complete descriptions at category bedroom page', function(){
    getFurnitureFromAPI('http://128.199.133.224/api/category/product/Bedroom')
    goToCategory('bedroom')
    expectProductDescription()
  })

  it('should show all product with complete descriptions at category bathroom page', function(){
    getFurnitureFromAPI('http://128.199.133.224/api/category/product/Bathroom')
    goToCategory('bathroom')
    expectProductDescription()
  })

  it('should show all product with complete descriptions at category dinning room page', function(){
    getFurnitureFromAPI('http://128.199.133.224/api/category/product/Dinning%20Room')
    goToCategory('dinning room')
    expectProductDescription()
  })

  it('should show all product with complete descriptions at category kitchen page', function(){
    getFurnitureFromAPI('http://128.199.133.224/api/category/product/Kitchen')
    goToCategory('kitchen')
    expectProductDescription()
  })

  it('should show all product with complete descriptions at category living room page', function(){
    getFurnitureFromAPI('http://128.199.133.224/api/category/product/Living%20Room')
    goToCategory('living room')
    expectProductDescription()
  })

})