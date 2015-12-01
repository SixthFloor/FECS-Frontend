/* Test case: View furniture */
/* Created by Niti and Runyasak */

var request = require('request')

describe('view furniture', function() {
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
    var furnitureAll = ''
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

    function goToCategoryAll() {
        categoryButton.click()
        categoryAllButton.click()
    }
	beforeEach(function() {
  	    browser.get('http://localhost:3030/#')
        goToCategoryAll()
    })

  	it('should count all product', function() {
        browser.wait(allProduct.get(0).isPresent()).then( function() {
            expect(allProduct.count()).toEqual(furnitureAll.length)
            // allProduct.get(0).getText().then(function(text) {
            //     console.log(text)
            // })
        })
  	})

    it('should show all product with complete descriptions at category page', function(){
        browser.wait(allProduct.get(0).isPresent()).then( function() {
            for(var i = 0; i < furnitureAll.length; i++){
                (function (i){
                    //check product name
                    allProductName.get(i).getText().then(function(name){
                        expect(name).toEqual(furnitureAll[i].name)
                    })
                    //check product serial
                    allProductSerial.get(i).getText().then(function(serial){
                        // console.log(i + ' ' + serial + ' API: ' + furnitureAll[i].serialNumber)
                        expect(serial.substring(1, serial.length-1)).toEqual(furnitureAll[i].serialNumber)
                    })
                    allProductPrice.get(i).getText().then(function(price){
                        // console.log(i + ' ' + price + ' API: ' + furnitureAll[i].price)
                        expect(parseInt(price.substring(0, price.length-5))).toEqual(furnitureAll[i].price)
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

    // it('PRINT ALL DETAIL FROM API', function(){
    //     for(var i = 0; i < 20; i++){
    //         console.log(i + ' ' + furnitureAll[i].name + ' ' + furnitureAll[i].serialNumber)
    //     }

    // })

  	// it('should be able to view all product and all descriptions are corrected', function() {
  	// 	for(var i = 0; i < 5; i++){
   //          (function (i) {
   //                  browser.wait(allProduct.get(i).isPresent()).then(function(){
   //                      allViewProductButton.get(i).click();
   //                      productName.getText().then(function(name) {
   //                          expect(name).toEqual(furnitureAll[i].name)
   //                      })
   //                      browser.navigate().back()
   //                  })
   //          }(i))
            
  	// // 		// expect(productBlock.getText()).toEqual('YourEnteredTitle')
  	// // 		// expect(productBlock2.getText()).toEqual(7)
  	// // 		// linkAllproduct.click()
  	// 	}
   //  })

})