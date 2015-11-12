


describe('sort furniture', function() {

	  var allProduct = element.all(by.repeater('product in categorypageCtrl.productList | orderBy:categorypageCtrl.sort_by'))
  	var linkAllproduct =  element(by.css('[href="#/category/all"]'))
  	var sortModel = element(by.model('categorypageCtrl.sort_by'))
    var nameProduct = []
    var idProduct = []
    var priceProduct = []
    var aToz = []
    var zToa = []
    var lToh = []
    var hTol = []
    var numP = 6
    var numD = 24
    var allDetailproduct = element.all(by.css('.ng-binding'))

	beforeEach(function() {
		browser.get('http://localhost:3030/#/category/all')
  	})


  	it('Case1: Click All products,then it should show all products ', function() {
    	//linkAllproduct.click()
    	expect(allProduct.count()).toEqual(numP)
      expect(allDetailproduct.count()).toEqual(numD)
  	})

  	it('Case2: If select Sort by Name A-Z,then it should sort by A-Z ', function() {
     
    	sortModel.click()
    	sortModel.$('[value="string:name"]').click()
    	//browser.sleep(5000)
      for (var i = 0; i < numP ; i++) {
        aToz[i] = allProduct.get(i).getText()
      }
      sortModel.click()
      sortModel.$('[value="string:-name"]').click()
      for (var i = 0; i < numP ; i++) {
        expect(allProduct.get(i).getText()).toEqual(aToz[5-i])
      }

  	})

    it('Case3: If select Sort by Name Z-A,then it should sort by Z-A ', function() {
     
      sortModel.click()
      sortModel.$('[value="string:-name"]').click()
      //browser.sleep(5000)
      for (var i = 0; i < numP ; i++) {
        zToa[i] = allProduct.get(i).getText()
      }
      sortModel.click()
      sortModel.$('[value="string:name"]').click()
      for (var i = 0; i < numP ; i++) {
        expect(allProduct.get(i).getText()).toEqual(zToa[5-i])
      }

    })

    it('Case4: If select Sort by Price Low to High,then it should sort by Low to High ', function() {
     
      sortModel.click()
      sortModel.$('[value="string:price"]').click()
      //browser.sleep(5000)
      for (var i = 0; i < numP ; i++) {
        lToh[i] = allProduct.get(i).getText()
      }
      sortModel.click()
      sortModel.$('[value="string:-price"]').click()
      for (var i = 0; i < numP ; i++) {
        expect(allProduct.get(i).getText()).toEqual(lToh[5-i])
      }

    })

    it('Case5: If select Sort by Price High to Low,then it should sort by High to Low ', function() {
     
      sortModel.click()
      sortModel.$('[value="string:-price"]').click()
      //browser.sleep(5000)
      for (var i = 0; i < numP ; i++) {
        hTol[i] = allProduct.get(i).getText()
      }
      sortModel.click()
      sortModel.$('[value="string:price"]').click()
      for (var i = 0; i < numP ; i++) {
        expect(allProduct.get(i).getText()).toEqual(hTol[5-i])
      }

    })

    /*it('Case1: If select Sort by Name A-Z,then it should sort by A-Z ', function() {
      var j = 0
      sortModel.click()
      sortModel.$('[value="string:-name"]').click()
      for (var i = 0 ; i < 24 ; i+=4) {
        nameProduct[j] = allDetailproduct.get(i).getText()
        j++
        //expect(allDetailproduct.get(i).getText()).toEqual(5)
      }
      nameProduct.reverse()
      for (var i = 0 ; i < j ; i++) {
        expect(nameProduct[i].getText()).toEqual(5)
      }
    })*/

    /*it('Case1: If select Sort by Name A-Z,then it should sort by A-Z ', function() {
      var j = 0
      sortModel.click()
      sortModel.$('[value="string:-name"]').click()
      for (var i = 3 ; i < 24 ; i+=4) {
        priceProduct[j] = allDetailproduct.get(i).getText()
        j++
        //expect(allDetailproduct.get(i).getText()).toEqual(5)
      }
      priceProduct.reverse()
      for (var i = 0 ; i < j ; i++) {
        expect(priceProduct[i]).toEqual(5)
      }
    })*/

    function loopMyApi(i,str) {
        expect(allProduct.get(i).getText()).toEqual(str.get(i).getText())
    }
        
})
