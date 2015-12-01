/* Test case: View furniture */
/* Created by Niti and Runyasak */

describe('view furniture', function() {

  var allProduct = element.all(by.repeater('product in categorypageCtrl.productList | orderBy:categorypageCtrl.sort_by'))
    var linkAllproduct =  element(by.css('[href="#/category/all"]'))
    var productBlock = element(by.css('.product')).element(by.css('.product-right'))
    var productDescription = element.all(by.css('.ng-binding'))
    var blockLeft = element.all(by.css('.product-right col-md-4'))
    var allViewProductButton = element.all(by.css('[ng-click="categorypageCtrl.viewProduct(product.serialNumber)"]'))
    var amountProduct 
    var amountDescription 
    var eachProductDescription 
    var nameProduct = []
    var allDetailproduct = element.all(by.css('.ng-binding'))

  beforeEach(function() {
    browser.get('http://localhost:3030/#')
    })

    it('This is test view furniture', function() {
      linkAllproduct.click()
      allProduct.count().then(function(count) {
        amountProduct = count
      })
      allDetailproduct.count().then(function(count) {
        amountDescription = count
      })

      eachProductDescription = 4
     
    })

    it('Case1:should have product', function() {
      linkAllproduct.click()
      expect(allProduct.count()).toEqual(amountProduct)
       //Array of name's product
      for (var i = 0 ; i < amountDescription ; i+=eachProductDescription) {
        allDetailproduct.get(i).getText().then(function(text) {
          nameProduct.push(text)
          //console.log(nameProduct)
        })
      }
      
    })


    it('Case2:should have all description for all product', function() {
      linkAllproduct.click()
      
      //console.log(nameProduct)
      for(var i=0 ; i< amountProduct ; i++){
        allViewProductButton.get(i).click()
        expect(productDescription.get(0).getText()).toEqual(nameProduct[i])
        expect(productDescription.count()).toEqual(7)
        linkAllproduct.click()
      }
      
    })
})