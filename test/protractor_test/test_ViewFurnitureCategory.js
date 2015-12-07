/* Test case: View furniture category*/
/* Created by Niti and Runyasak */

var request = require('request')

describe('view furniture category', function() {

  var allProduct = element.all(by.repeater('product in categorypageCtrl.productList | orderBy:categorypageCtrl.sort_by'))
  var checkAllProduct = element(by.repeater('product in categorypageCtrl.productList | orderBy:categorypageCtrl.sort_by'))

  //  locator for product
  var allProductName = element.all(by.id('product-name'))
  var allProductPrice = element.all(by.id('product-price'))
  var allProductImg = element.all(by.id('product-img'))

  //  variable for receive data from API
  var furnitureAll = ''

  // request all furniture from database
  function getFurnitureFromAPI(address) {
    furnitureAll = ''
    request
      .get(address)
      .on('data', function(response) {
          furnitureAll += response
      })
      .on('end', function(){
          furnitureAll = JSON.parse(furnitureAll)
          furnitureAll.sort(function (a, b){
              return a.name.localeCompare(b.name)
          })
      })
  }

  function goToCategory(room) {
    $('#category-button').click()
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
              checkAllProduct.isPresent()
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
          // check product name
          allProductName.get(i).getText().then(function(name){
            expect(name).toEqual(furnitureAll[i].name)
          })
          // check product price
          allProductPrice.get(i).getText().then(function(price){
            expect(parseInt(price.substring(0, price.length-5))).toEqual(furnitureAll[i].price)
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
    browser.ignoreSynchronization=false
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