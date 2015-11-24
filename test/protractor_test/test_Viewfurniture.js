/* Test case: View furniture */
/* Created by Niti and Runyasak */

describe('view furniture', function() {

	var allProduct = element.all(by.repeater('product in categorypageCtrl.productList | orderBy:categorypageCtrl.sort_by'))
  	var linkAllproduct =  element(by.css('[href="#/category/all"]'))
  	var productBlock = element(by.css('.product')).element(by.css('.product-right'))
  	var productBlock2 = element.all(by.css('.ng-binding'))
  	var blockLeft = element.all(by.css('.product-right col-md-4'))
  	var allViewProductButton = element.all(by.css('[ng-click="categorypageCtrl.viewProduct(product.serialNumber)"]'))
  	var numP 

	beforeEach(function() {
		browser.get('http://localhost:3030/#')
  	})

  	it('should count all product', function() {
    	linkAllproduct.click()
    	expect(allProduct.count()).toEqual(5)
    	allProduct.count().then(function(count) {
		  numP = count
		})
  	})

  	it('should have all description', function() {
  		linkAllproduct.click()
  		expect(numP).toEqual(7)
  		for(var i=0 ; i< numP ; i++){
  			allViewProductButton.get(i).click()
  			//expect(productBlock.getText()).toEqual('YourEnteredTitle')
  			expect(productBlock2.getText()).toEqual(7)
  			linkAllproduct.click()
  		}
    	
  	})
})