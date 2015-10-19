describe('view furniture', function() {

	var allProduct = element.all(by.css(".form-group"))
  	var catalogButon = element(by.buttonText('Catalog'))

	beforeEach(function() {
		browser.get('http://localhost:3030/#')
  	})

  	it('should count all furniture', function() {
    	catalogButon.click()
    	expect(allProduct.count()).toEqual(6+1)
  	})
})