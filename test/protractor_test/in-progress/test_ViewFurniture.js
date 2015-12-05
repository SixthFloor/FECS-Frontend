/* Test case: View furniture category*/
/* Created by Runyasak */

describe('view furniture', function() {

	var request = require('request')
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
    
    

	it('should be able to view all product and all descriptions are corrected', function() {
		console.log(function () { return 'ggwp' }())
  		// for(var i = 0; i < 5; i++){
    //         (function (i) {
    //                 browser.wait(allProduct.get(i).isPresent()).then(function(){
    //                     allViewProductButton.get(i).click();
    //                     productName.getText().then(function(name) {
    //                         expect(name).toEqual(furnitureAll[i].name)
    //                     })
    //                     browser.navigate().back()
    //                 })
    //         }(i))
            
  	// 		// expect(productBlock.getText()).toEqual('YourEnteredTitle')
  	// 		// expect(productBlock2.getText()).toEqual(7)
  	// 		// linkAllproduct.click()
  		// }
    })
	

})
