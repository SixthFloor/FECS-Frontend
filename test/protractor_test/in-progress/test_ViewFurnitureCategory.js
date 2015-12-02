/* Test case: View furniture category*/
/* Created by Niti and Runyasak */

var request = require('request')

describe('view furniture category', function() {
  	var allProduct = element.all(by.repeater('product in categorypageCtrl.productList | orderBy:categorypageCtrl.sort_by'))
    var categoryButton = $('#category-button')
  	var categoryAllButton =  element(by.css('[href="#/category/all"]'))
  	// var productBlock = element(by.css('.product')).element(by.css('.product-right'))
  	// var productBlock2 = element.all(by.css('.ng-binding'))
  	// var blockLeft = element.all(by.css('.product-right col-md-4'))

  	var allViewProductButton = element.all(by.css('[ng-click="categorypageCtrl.viewProduct(product.serialNumber)"]'))
    var allProductName = element.all(by.id('product-name'))
    var allProductSerial = element.all(by.id('product-serial'))
    var allProductPrice = element.all(by.id('product-price'))
    var allProductImg = element.all(by.id('product-img'))

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

    function goToCategoryAll() {
        categoryButton.click()
        categoryAllButton.click()
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

	beforeEach(function() {
  	    browser.get('http://localhost:3030/#')
    })

  	// it('should count all product', function() {
   //      browser.wait(allProduct.get(0).isPresent()).then( function() {
   //          expect(allProduct.count()).toEqual(furnitureAll.length)
   //          // allProduct.get(0).getText().then(function(text) {
   //          //     console.log(text)
   //          // })
   //      })
  	// })

    it('should show all product with complete descriptions at category all page', function(){
            getFurnitureFromAPI('http://128.199.133.224/api/product/all')
            goToCategoryAll()
            waitForElement().then( function() {
                for(var i = 0; i < furnitureAll.length; i++){
                    (function (i){
                        // check product name
                        allProductName.get(i).getText().then(function(name){
                            expect(name).toEqual(furnitureAll[i].name)
                        })
                        // check product serial
                        allProductSerial.get(i).getText().then(function(serial){
                            // console.log(i + ' ' + serial + ' API: ' + furnitureAll[i].serialNumber)
                            expect(serial.substring(1, serial.length-1)).toEqual(furnitureAll[i].serialNumber)
                        })
                        // check product price
                        allProductPrice.get(i).getText().then(function(price){
                            // console.log(i + ' ' + price + ' API: ' + furnitureAll[i].price)
                            expect(parseInt(price.substring(0, price.length-5))).toEqual(furnitureAll[i].price)
                        })
                        // check product image
                        allProductImg.get(i).getAttribute('src').then(function(img){
                            // console.log('src ' + img)
                            expect(img).toEqual(furnitureAll[i].images[0].link)
                        })
                    }(i))
                }
            // for(var i = 0; i < 5; i++){
            //     (function (i){
            //         allProductSerial.get(i).getText().then(function(serial){
            //             // expect(name).toEqual(furnitureAll[i].name)
            //             console.log(serial.substring(1, serial.length-1))
            //             expect(serial.substring(1, serial.length-1)).toEqual(furnitureAll[i].serialNumber)
            //         })
            //     }(i))
            // }
            })

    })



    it('should show all product with complete descriptions at category bedroom page', function(){
        categoryButton.click()
        element(by.css('[href="#/category/Bedroom"]')).click()
        getFurnitureFromAPI('http://128.199.133.224/api/category/product/Bedroom')
            waitForElement().then( function() {
                for(var i = 0; i < furnitureAll.length; i++){
                    (function (i){
                        // check product name
                        allProductName.get(i).getText().then(function(name){
                            expect(name).toEqual(furnitureAll[i].name)
                        })
                        // check product serial
                        allProductSerial.get(i).getText().then(function(serial){
                            // console.log(i + ' ' + serial + ' API: ' + furnitureAll[i].serialNumber)
                            expect(serial.substring(1, serial.length-1)).toEqual(furnitureAll[i].serialNumber)
                        })
                        // check product price
                        allProductPrice.get(i).getText().then(function(price){
                            // console.log(i + ' ' + price + ' API: ' + furnitureAll[i].price)
                            expect(parseInt(price.substring(0, price.length-5))).toEqual(furnitureAll[i].price)
                        })
                        // check product image
                        allProductImg.get(i).getAttribute('src').then(function(img){
                            // console.log('src ' + img)
                            expect(img).toEqual(furnitureAll[i].images[0].link)
                        })
                    }(i))
                }
            })
    })

    // it('PRINT ALL DETAIL FROM API', function(){
    //     for(var i = 0; i < 20; i++){
    //         console.log(i + ' ' + furnitureAll[i].name + ' ' + furnitureAll[i].serialNumber)
    //     }

    // })

})