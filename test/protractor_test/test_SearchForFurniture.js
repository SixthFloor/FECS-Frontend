/* Test case: Search for furniture */
/* Created by Runyasak */

describe('Search for furniture', function(){

  var keyword = 'BO'

  //  locator for product
  var allProductName = element.all(by.id('product-name'))

  beforeEach(function() {
    browser.get('http://localhost:3030/#')
  })

  it('should appear all products that included with keyword from searching', function(){
    $('#search-field').sendKeys(keyword)
    allProductName.getText().then(function(allName){
      for(var i = 0; i < allName.length; i++){
        console.log(allName[i].indexOf(keyword))
        expect(allName[i].indexOf(keyword) > -1).toEqual(true)
      }
    })
  })
})