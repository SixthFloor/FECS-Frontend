


describe('sort furniture', function() {

	  var allProduct = element.all(by.repeater('product in categorypageCtrl.productList | orderBy:categorypageCtrl.sort_by'))
  	var linkAllproduct =  element(by.css('[href="#/category/all"]'))
  	var sortModel = element(by.model('categorypageCtrl.sort_by'))
    var idProduct = []
    var priceProduct = []
    var nameProduct = []
<<<<<<< HEAD
    var descriptionProduct = []
    var someArray = []
    var arr = []
    var amountProduct 
    var amountDescription 
    var eachProductDescription 
=======
    var someArray = []
    var arr = []
    var numP = 6
    var numD = 24
    var numT = 4
>>>>>>> d2529ba33b0a4e86970d03f210f77e851f977af6
    var allDetailproduct = element.all(by.css('.ng-binding'))
    var allTypesort = element.all(by.tagName('option'))

	beforeEach(function() {
		browser.get('http://localhost:3030/#/category/all')
  	})


<<<<<<< HEAD
  	it('This is test sort furniture', function() {

      allProduct.count().then(function(count) {
        amountProduct = count
      })

      allDetailproduct.count().then(function(count) {
        amountDescription = count
      })

      eachProductDescription = 4

  	})

    it('Case1: Click All products,then it should show all products ', function() {
      expect(allProduct.count()).toEqual(amountProduct)
      expect(allDetailproduct.count()).toEqual(amountDescription)
      expect(eachProductDescription).toEqual(amountDescription/amountProduct)
      //Array of name's product
      for (var i = 0 ; i < amountDescription ; i+=eachProductDescription) {
=======
  	it('Case1: Click All products,then it should show all products ', function() {

    	expect(allProduct.count()).toEqual(numP)
      expect(allDetailproduct.count()).toEqual(numD)

      //Array of name's product
      for (var i = 0 ; i < numD ; i+=4) {
>>>>>>> d2529ba33b0a4e86970d03f210f77e851f977af6
        allDetailproduct.get(i).getText().then(function(text) {
          nameProduct.push(text)
          //console.log(nameProduct)
        })
      }
      //Array of id's product
<<<<<<< HEAD
      for (var i = 1 ; i < amountDescription ; i+=eachProductDescription) {
=======
      for (var i = 1 ; i < numD ; i+=4) {
>>>>>>> d2529ba33b0a4e86970d03f210f77e851f977af6
        allDetailproduct.get(i).getText().then(function(text) {
          idProduct.push(text)
          //console.log(idProduct)
        })
      }
<<<<<<< HEAD
      //Array of description's product
      for (var i = 2 ; i < amountDescription ; i+=eachProductDescription) {
        allDetailproduct.get(i).getText().then(function(text) {
          descriptionProduct.push(text)
          //console.log(idProduct)
        })
      }
      //Array of price's product
      for (var i = 3 ; i < amountDescription ; i+=eachProductDescription) {
=======
      //Array of price's product
      for (var i = 3 ; i < numD ; i+=4) {
>>>>>>> d2529ba33b0a4e86970d03f210f77e851f977af6
        allDetailproduct.get(i).getText().then(function(text) {
          priceProduct.push(parseFloat(text.split(" ",1)))
          //console.log(priceProduct)
        })
      }
<<<<<<< HEAD
    })
=======

  	})
>>>>>>> d2529ba33b0a4e86970d03f210f77e851f977af6

    it('Case2: Click sort dropdown,then it should show 4 sort types(Name A-Z,Name Z-A,Price Low to High,and Price High to Low) ', function() {

      sortModel.click()
<<<<<<< HEAD
      expect(allTypesort.count()).toEqual(eachProductDescription)
=======
      expect(allTypesort.count()).toEqual(numT)
>>>>>>> d2529ba33b0a4e86970d03f210f77e851f977af6

      /*expect(allTypesort.get(0).getText()).toEqual('Name A - Z')
      expect(allTypesort.get(1).getText()).toEqual('Name Z - A')
      expect(allTypesort.get(2).getText()).toEqual('Price Low to High')
      expect(allTypesort.get(3).getText()).toEqual('Price High to Low')*/

    })

    it('Case3: If select Sort by Name A-Z,then it should sort by A-Z ', function() {

      sortModel.click()
      sortModel.$('[value="string:name"]').click()

      //sort by name's product A-Z
      nameProduct.sort() 

      //console.log(nameProduct)
      //console.log(nameProduct.length)
      for (var i = 0 ; i < nameProduct.length ; i++) {
<<<<<<< HEAD
        expect(allDetailproduct.get((i*eachProductDescription)+0).getText()).toEqual(nameProduct[i])
=======
        expect(allDetailproduct.get((i*4)+0).getText()).toEqual(nameProduct[i])
>>>>>>> d2529ba33b0a4e86970d03f210f77e851f977af6
      }

    })

    it('Case4: If select Sort by Name Z-A,then it should sort by Z-A ', function() {

      sortModel.click()
      sortModel.$('[value="string:-name"]').click()

      //sort by name's product Z-A
      nameProduct.sort()
      nameProduct.reverse()

      //console.log(nameProduct)
      //console.log(nameProduct.length)
      for (var i = 0 ; i < nameProduct.length ; i++) {
<<<<<<< HEAD
        expect(allDetailproduct.get((i*eachProductDescription)+0).getText()).toEqual(nameProduct[i])
=======
        expect(allDetailproduct.get((i*4)+0).getText()).toEqual(nameProduct[i])
>>>>>>> d2529ba33b0a4e86970d03f210f77e851f977af6
      }

    })

    it('Case5: If select Sort by Price Low to High,then it should sort by Low to High ', function() {
     
      
      sortModel.click()
      sortModel.$('[value="string:price"]').click()

      //sort by price's product Low to High 
      priceProduct.sort(function(a, b){return a-b})
      
      //console.log(priceProduct)
      //console.log(priceProduct.length)
      for (var i = 0 ; i < priceProduct.length ; i++) {
<<<<<<< HEAD
        expect(allDetailproduct.get((i*eachProductDescription)+3).getText()).toEqual(priceProduct[i]+' TH Baht')
=======
        expect(allDetailproduct.get((i*4)+3).getText()).toEqual(priceProduct[i]+' TH Baht')
>>>>>>> d2529ba33b0a4e86970d03f210f77e851f977af6
      }

    })

    it('Case6: If select Sort by Price High to Low,then it should sort by High to Low ', function() {
     
      sortModel.click()
      sortModel.$('[value="string:-price"]').click()
      
      //sort by price's product High to Low
      priceProduct.sort(function(a, b){return b-a})
      
      //console.log(priceProduct)
      //console.log(priceProduct.length)
      for (var i = 0 ; i < priceProduct.length ; i++) {
<<<<<<< HEAD
        expect(allDetailproduct.get((i*eachProductDescription)+3).getText()).toEqual(priceProduct[i]+' TH Baht')
=======
        expect(allDetailproduct.get((i*4)+3).getText()).toEqual(priceProduct[i]+' TH Baht')
>>>>>>> d2529ba33b0a4e86970d03f210f77e851f977af6
      }

    })

    
        
})
