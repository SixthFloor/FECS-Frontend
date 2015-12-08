/* Test case: Sort furniutre*/
/* Created by Niti*/


describe('sort furniture', function() {

    var categoryButton =   element.all(by.css('.dropdown-toggle')).get(0)
    var accountButton =   element.all(by.css('.dropdown-toggle')).get(1)
    var linkSignin = element(by.css('[ui-sref="login"]'))
    var email = element(by.model('loginCtrl.data.email'))
    var password = element(by.model('loginCtrl.data.pwd'))
    var loginButton = element(by.buttonText('Log in'))
    var linkAllproduct = element(by.css('[href="#/category/all"]'))
    var allProduct = element.all(by.repeater('product in categorypageCtrl.productList | orderBy:categorypageCtrl.sort_by'))
    var allProductName = element.all(by.id('product-name'))
    var allProductSerial = element.all(by.id('product-serial'))
    var allProductPrice = element.all(by.id('product-price'))
    var sortModel = element(by.model('categorypageCtrl.sort_by'))
    var allTypesort = element.all(by.tagName('option'))
    var serialProduct = []
    var priceProduct = []
    var nameProduct = []
    var amountProduct
    var amountProductName
    var amountProductSerial
    var amountProductPrice
    var eachProductDescription 

    function Login(a,b) {
      email.sendKeys(a)
      password.sendKeys(b)
    }

    beforeEach(function() {
      browser.get('http://localhost:3030/#')
    })


    it('This is test sort furniture (Not member)', function() {
      
      categoryButton.click()
      linkAllproduct.click()
      expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/category/all')

      allProduct.count().then(function(count) {
        amountProduct = count
      })

      allProductName.count().then(function(count) {
        amountProductName = count
      })

      allProductSerial.count().then(function(count) {
        amountProductSerial = count
      })

      allProductPrice.count().then(function(count) {
        amountProductPrice = count
      })

    })

    it('Case1: Click All products,then it should show all products ', function() {

      categoryButton.click()
      linkAllproduct.click()
      expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/category/all')

      expect(allProduct.count()).toEqual(amountProduct)
      expect(allProductName.count()).toEqual(amountProductName)
      expect(allProductSerial.count()).toEqual(amountProductSerial)
      expect(allProductPrice.count()).toEqual(amountProductPrice)
      
      //Array of name's product
      for (var i = 0 ; i < amountProductName ; i++) {
        allProductName.get(i).getText().then(function(text) {
          nameProduct.push(text)
          //console.log(nameProduct)
        })
      }
      //Array of serial's product
      for (var i = 0 ; i < amountProductSerial ; i++) {
        allProductSerial.get(i).getText().then(function(text) {
          serialProduct.push(text)
          //console.log(idProduct)
        })
      }
      //Array of price's product
      for (var i = 0 ; i < amountProductPrice ; i++) {
        allProductPrice.get(i).getText().then(function(text) {
          priceProduct.push(parseFloat(text.split(" ",1)))
          //console.log(idProduct)
        })
      }
      
    })

    it('Case2: Click sort dropdown,then it should show 4 sort types(Name A-Z,Name Z-A,Price Low to High,and Price High to Low) ', function() {
      
      categoryButton.click()
      linkAllproduct.click()
      expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/category/all')

      console.log(nameProduct)
      console.log(serialProduct)
      console.log(priceProduct)
      sortModel.click()
      expect(allTypesort.count()).toEqual(4)


    })

    it('Case3: If select Sort by Name A-Z,then it should sort by A-Z ', function() {
      
      categoryButton.click()
      linkAllproduct.click()
      expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/category/all')

      sortModel.click()
      sortModel.$('[value="string:name"]').click()

      //sort by name's product A-Z
      nameProduct.sort() 

      //console.log(nameProduct)
      //console.log(nameProduct.length)
      for (var i = 0 ; i < nameProduct.length ; i++) {
        expect(allProductName.get(i).getText()).toEqual(nameProduct[i])
      }

    })

    it('Case4: If select Sort by Name Z-A,then it should sort by Z-A ', function() {
      
      categoryButton.click()
      linkAllproduct.click()
      expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/category/all')

      sortModel.click()
      sortModel.$('[value="string:-name"]').click()

      //sort by name's product Z-A
      nameProduct.sort()
      nameProduct.reverse()

      //console.log(nameProduct)
      //console.log(nameProduct.length)
      for (var i = 0 ; i < nameProduct.length ; i++) {
        expect(allProductName.get(i).getText()).toEqual(nameProduct[i])
      }

    })

    it('Case5: If select Sort by Price Low to High,then it should sort by Low to High ', function() {
      
      categoryButton.click()
      linkAllproduct.click()
      expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/category/all')

      sortModel.click()
      sortModel.$('[value="string:price"]').click()

      //sort by price's product Low to High 
      priceProduct.sort(function(a, b){return a-b})
      
      //console.log(priceProduct)
      //console.log(priceProduct.length)
      for (var i = 0 ; i < priceProduct.length ; i++) {
        expect(allProductPrice.get(i).getText()).toEqual(priceProduct[i]+' Baht')
      }

    })

    it('Case6: If select Sort by Price High to Low,then it should sort by High to Low ', function() {
      
      categoryButton.click()
      linkAllproduct.click()
      expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/category/all')

      sortModel.click()
      sortModel.$('[value="string:-price"]').click()
      
      //sort by price's product High to Low
      priceProduct.sort(function(a, b){return b-a})
      
      //console.log(priceProduct)
      //console.log(priceProduct.length)
      for (var i = 0 ; i < priceProduct.length ; i++) {
        expect(allProductPrice.get(i).getText()).toEqual(priceProduct[i]+' Baht')
      }

    })

    it('Case 7: Login as member, then test', function() {

    accountButton.click()
    linkSignin.click()
    expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/login')
    Login('nara@gmail.com','12345678')
    loginButton.click()
    browser.sleep(5000)
    //element(by.linkText(' Sign out ')).click()

    })

    it('Case8: If select Sort by Name A-Z,then it should sort by A-Z ', function() {
      
      categoryButton.click()
      linkAllproduct.click()
      expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/category/all')

      sortModel.click()
      sortModel.$('[value="string:name"]').click()

      //sort by name's product A-Z
      nameProduct.sort() 

      //console.log(nameProduct)
      //console.log(nameProduct.length)
      for (var i = 0 ; i < nameProduct.length ; i++) {
        expect(allProductName.get(i).getText()).toEqual(nameProduct[i])
      }

    })

    it('Case9: If select Sort by Name Z-A,then it should sort by Z-A ', function() {
      
      categoryButton.click()
      linkAllproduct.click()
      expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/category/all')

      sortModel.click()
      sortModel.$('[value="string:-name"]').click()

      //sort by name's product Z-A
      nameProduct.sort()
      nameProduct.reverse()

      //console.log(nameProduct)
      //console.log(nameProduct.length)
      for (var i = 0 ; i < nameProduct.length ; i++) {
        expect(allProductName.get(i).getText()).toEqual(nameProduct[i])
      }

    })

    it('Case10: If select Sort by Price Low to High,then it should sort by Low to High ', function() {
      
      categoryButton.click()
      linkAllproduct.click()
      expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/category/all')

      sortModel.click()
      sortModel.$('[value="string:price"]').click()

      //sort by price's product Low to High 
      priceProduct.sort(function(a, b){return a-b})
      
      //console.log(priceProduct)
      //console.log(priceProduct.length)
      for (var i = 0 ; i < priceProduct.length ; i++) {
        expect(allProductPrice.get(i).getText()).toEqual(priceProduct[i]+' Baht')
      }

    })

    it('Case11: If select Sort by Price High to Low,then it should sort by High to Low ', function() {
      
      categoryButton.click()
      linkAllproduct.click()
      expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/category/all')

      sortModel.click()
      sortModel.$('[value="string:-price"]').click()
      
      //sort by price's product High to Low
      priceProduct.sort(function(a, b){return b-a})
      
      //console.log(priceProduct)
      //console.log(priceProduct.length)
      for (var i = 0 ; i < priceProduct.length ; i++) {
        expect(allProductPrice.get(i).getText()).toEqual(priceProduct[i]+' Baht')
      }

    })

    
        
})
