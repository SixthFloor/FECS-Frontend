/* Test case: Filter furniutre */
/* Created by Niti */

describe('Filter furniture', function() {

  var categoryButton =   element.all(by.css('.dropdown-toggle')).get(0)
  var accountButton =   element.all(by.css('.dropdown-toggle')).get(1)
  var linkSignin = element(by.css('[ui-sref="login"]'))
  var email = element(by.model('loginCtrl.data.email'))
  var password = element(by.model('loginCtrl.data.pwd'))
  var loginButton = element(by.buttonText('Log in'))
  var clearButton = element(by.buttonText('Clear'))
  var linkAllproduct = element(by.css('[href="#/category/all"]'))
  var allProduct = element.all(by.repeater('product in categorypageCtrl.productList | orderBy:categorypageCtrl.sort_by'))
  var allProductName = element.all(by.id('product-name'))
  var allProductSerial = element.all(by.id('product-serial'))
  var allProductPrice = element.all(by.id('product-price'))
  var sortModel = element(by.model('categorypageCtrl.sort_by'))
  var allTypesort = element.all(by.tagName('option'))

  var priceProductU1 = []
  var nameProductU1 = []
  
  var priceProductTo5 = []
  var nameProductTo5 = []
  
  var priceProductTo10 = []
  var nameProductTo10 = []
  
  var priceProductA10 = []
  var nameProductA10 = []

  var amountProductU1
  var amountProductNameU1
  var amountProductPriceU1

  var amountProductTo5
  var amountProductNameTo5
  var amountProductPriceTo5

  var amountProductTo10
  var amountProductNameTo10
  var amountProductPriceTo10

  var amountProductA10
  var amountProductNameA10
  var amountProductPriceA10

  var amountProductSerial
  var eachProductDescription 
  var allTypefilter = element.all(by.model('categorypageCtrl.price'))
  var under1 = element.all(by.model('categorypageCtrl.price')).get(0)
  var to5 = element.all(by.model('categorypageCtrl.price')).get(1)
  var to10 = element.all(by.model('categorypageCtrl.price')).get(2)
  var above10 = element.all(by.model('categorypageCtrl.price')).get(3)

  function Login(a,b) {
  email.sendKeys(a)
  password.sendKeys(b)
  }

  beforeEach(function() {
  browser.get('http://localhost:3030/#/home')
  })


  it('This is test filter furniture (Not member)', function() {
    
    categoryButton.click()
    linkAllproduct.click()
    expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/category/all')
    expect(allTypefilter.count()).toEqual(4)

    under1.click()

    allProduct.count().then(function(count) {
      amountProductU1 = count
    })

    allProductName.count().then(function(count) {
      amountProductNameU1 = count
    })

    allProductPrice.count().then(function(count) {
      amountProductPriceU1 = count
    })

    to5.click()

    allProduct.count().then(function(count) {
      amountProductTo5 = count
    })

    allProductName.count().then(function(count) {
      amountProductNameTo5 = count
    })

    allProductPrice.count().then(function(count) {
      amountProductPriceTo5 = count
    })

    to10.click()

    allProduct.count().then(function(count) {
      amountProductTo10 = count
    })

    allProductName.count().then(function(count) {
      amountProductNameTo10 = count
    })

    allProductPrice.count().then(function(count) {
      amountProductPriceTo10 = count
    })

    above10.click()

    allProduct.count().then(function(count) {
      amountProductA10 = count
    })

    allProductName.count().then(function(count) {
      amountProductNameA10 = count
    })

    allProductPrice.count().then(function(count) {
      amountProductPriceA10 = count
    })

  })

  it('Case1: All types of filter able to click', function() {

    categoryButton.click()
    linkAllproduct.click()
    expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/category/all')

    under1.click()
    //Array of name's product
    for (var i = 0 ; i < amountProductNameU1 ; i++) {
      allProductName.get(i).getText().then(function(text) {
        nameProductU1.push(text)
        //console.log(nameProduct)
      })
    }
    //Array of price's product
    for (var i = 0 ; i < amountProductPriceU1 ; i++) {
      allProductPrice.get(i).getText().then(function(text) {
        priceProductU1.push(parseFloat(text.split(" ",1)))
        //console.log(idProduct)
      })
    }

    to5.click()
    //Array of name's product
    for (var i = 0 ; i < amountProductNameTo5 ; i++) {
      allProductName.get(i).getText().then(function(text) {
        nameProductTo5.push(text)
        //console.log(nameProduct)
      })
    }
    //Array of price's product
    for (var i = 0 ; i < amountProductPriceTo5 ; i++) {
      allProductPrice.get(i).getText().then(function(text) {
        priceProductTo5.push(parseFloat(text.split(" ",1)))
        //console.log(idProduct)
      })
    }

    to10.click()
    //Array of name's product
    for (var i = 0 ; i < amountProductNameTo10 ; i++) {
      allProductName.get(i).getText().then(function(text) {
        nameProductTo10.push(text)
        //console.log(nameProduct)
      })
    }
    //Array of price's product
    for (var i = 0 ; i < amountProductPriceTo10 ; i++) {
      allProductPrice.get(i).getText().then(function(text) {
        priceProductTo10.push(parseFloat(text.split(" ",1)))
        //console.log(idProduct)
      })
    }

    above10.click()
    //Array of name's product
    for (var i = 0 ; i < amountProductNameA10 ; i++) {
      allProductName.get(i).getText().then(function(text) {
        nameProductA10.push(text)
        //console.log(nameProduct)
      })
    }
    //Array of price's product
    for (var i = 0 ; i < amountProductPriceA10 ; i++) {
      allProductPrice.get(i).getText().then(function(text) {
        priceProductA10.push(parseFloat(text.split(" ",1)))
        //console.log(idProduct)
      })
    }

  })

  it('Case2: it should show 4 filter types(Under THB 1,000,THB 1,000 to THB 5,000,THB 5,000 to THB 10,000,and THB 10,000 & Above ) ', function() {
    
    categoryButton.click()
    linkAllproduct.click()
    expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/category/all')
    expect(allTypefilter.count()).toEqual(4)

    console.log(nameProductU1)
    console.log(priceProductU1)

    console.log(nameProductTo5)
    console.log(priceProductTo5)

    console.log(nameProductTo10)
    console.log(priceProductTo10)

    console.log(nameProductA10)
    console.log(priceProductA10)

  })

  it('Case3: If select Sort by Name A-Z,then it should sort by A-Z ', function() {
    
    categoryButton.click()
    linkAllproduct.click()
    expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/category/all')

    under1.click()
    sortModel.click()
    sortModel.$('[value="string:name"]').click()

    //sort by name's product A-Z
    nameProductU1.sort() 
    for (var i = 0 ; i < nameProductU1.length ; i++) {
      expect(allProductName.get(i).getText()).toEqual(nameProductU1[i])
    }

    to5.click()
    //sort by name's product A-Z
    nameProductTo5.sort() 
    for (var i = 0 ; i < nameProductTo5.length ; i++) {
      expect(allProductName.get(i).getText()).toEqual(nameProductTo5[i])
    }

    to10.click()
    //sort by name's product A-Z
    nameProductTo10.sort() 
    for (var i = 0 ; i < nameProductTo10.length ; i++) {
      expect(allProductName.get(i).getText()).toEqual(nameProductTo10[i])
    }

    above10.click()
    //sort by name's product A-Z
    nameProductA10.sort() 
    for (var i = 0 ; i < nameProductA10.length ; i++) {
      expect(allProductName.get(i).getText()).toEqual(nameProductA10[i])
    }

  })

  it('Case4: If select Sort by Name Z-A,then it should sort by Z-A ', function() {
    
    categoryButton.click()
    linkAllproduct.click()
    expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/category/all')

    under1.click()
    sortModel.click()
    sortModel.$('[value="string:-name"]').click()

    //sort by name's product Z-A
    nameProductU1.sort()
    nameProductU1.reverse() 
    for (var i = 0 ; i < nameProductU1.length ; i++) {
      expect(allProductName.get(i).getText()).toEqual(nameProductU1[i])
    }

    to5.click()
    //sort by name's product Z-A
    nameProductTo5.sort() 
    nameProductTo5.reverse()
    for (var i = 0 ; i < nameProductTo5.length ; i++) {
      expect(allProductName.get(i).getText()).toEqual(nameProductTo5[i])
    }

    to10.click()
    //sort by name's product Z-A
    nameProductTo10.sort() 
    nameProductTo10.reverse()
    for (var i = 0 ; i < nameProductTo10.length ; i++) {
      expect(allProductName.get(i).getText()).toEqual(nameProductTo10[i])
    }

    above10.click()
    //sort by name's product Z-A
    nameProductA10.sort() 
    nameProductA10.reverse()
    for (var i = 0 ; i < nameProductA10.length ; i++) {
      expect(allProductName.get(i).getText()).toEqual(nameProductA10[i])
    }

  })

  it('Case5: If select Sort by Price Low to High,then it should sort by Low to High ', function() {

    categoryButton.click()
    linkAllproduct.click()
    expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/category/all')

    under1.click()
    sortModel.click()
    sortModel.$('[value="string:price"]').click()

    //sort by price's product Low to High 
    priceProductU1.sort(function(a, b){return a-b}) 
    for (var i = 0 ; i < priceProductU1.length ; i++) {
      expect(allProductPrice.get(i).getText()).toEqual(priceProductU1[i]+' Baht')
    }

    to5.click()
    //sort by price's product Low to High 
    priceProductTo5.sort(function(a, b){return a-b})
    for (var i = 0 ; i < priceProductTo5.length ; i++) {
      expect(allProductPrice.get(i).getText()).toEqual(priceProductTo5[i]+' Baht')
    }

    to10.click()
    //sort by price's product Low to High 
    priceProductTo10.sort(function(a, b){return a-b}) 
    for (var i = 0 ; i < priceProductTo10.length ; i++) {
      expect(allProductPrice.get(i).getText()).toEqual(priceProductTo10[i]+' Baht')
    }

    above10.click()
    //sort by price's product Low to High 
    priceProductA10.sort(function(a, b){return a-b}) 
    for (var i = 0 ; i < priceProductA10.length ; i++) {
      expect(allProductPrice.get(i).getText()).toEqual(priceProductA10[i]+' Baht')
    }

  })

  it('Case6: If select Sort by Price High to Low,then it should sort by High to Low ', function() {
    
    categoryButton.click()
    linkAllproduct.click()
    expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/category/all')

    under1.click()
    sortModel.click()
    sortModel.$('[value="string:-price"]').click()
    
    //sort by price's product High to Low
    priceProductU1.sort(function(a, b){return b-a}) 
    for (var i = 0 ; i < priceProductU1.length ; i++) {
      expect(allProductPrice.get(i).getText()).toEqual(priceProductU1[i]+' Baht')
    }

    to5.click()
    //sort by price's product High to Low
    priceProductTo5.sort(function(a, b){return b-a})
    for (var i = 0 ; i < priceProductTo5.length ; i++) {
      expect(allProductPrice.get(i).getText()).toEqual(priceProductTo5[i]+' Baht')
    }

    to10.click()
    //sort by price's product High to Low
    priceProductTo10.sort(function(a, b){return b-a}) 
    for (var i = 0 ; i < priceProductTo10.length ; i++) {
      expect(allProductPrice.get(i).getText()).toEqual(priceProductTo10[i]+' Baht')
    }

    above10.click()
    //sort by price's product High to Low
    priceProductA10.sort(function(a, b){return b-a}) 
    for (var i = 0 ; i < priceProductA10.length ; i++) {
      expect(allProductPrice.get(i).getText()).toEqual(priceProductA10[i]+' Baht')
    }

  })

  it('Case 7: Login as member, then test', function() {

  accountButton.click()
  linkSignin.click()
  expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/login')
  Login('nara@gmail.com','12345678')
  loginButton.click()
  browser.sleep(5000)

  })

  it('Case8: If select Sort by Name A-Z,then it should sort by A-Z ', function() {
    
    categoryButton.click()
    linkAllproduct.click()
    expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/category/all')

    under1.click()
    sortModel.click()
    sortModel.$('[value="string:name"]').click()

    //sort by name's product A-Z
    nameProductU1.sort() 
    for (var i = 0 ; i < nameProductU1.length ; i++) {
      expect(allProductName.get(i).getText()).toEqual(nameProductU1[i])
    }

    to5.click()
    //sort by name's product A-Z
    nameProductTo5.sort() 
    for (var i = 0 ; i < nameProductTo5.length ; i++) {
      expect(allProductName.get(i).getText()).toEqual(nameProductTo5[i])
    }

    to10.click()
    //sort by name's product A-Z
    nameProductTo10.sort() 
    for (var i = 0 ; i < nameProductTo10.length ; i++) {
      expect(allProductName.get(i).getText()).toEqual(nameProductTo10[i])
    }

    above10.click()
    //sort by name's product A-Z
    nameProductA10.sort() 
    for (var i = 0 ; i < nameProductA10.length ; i++) {
      expect(allProductName.get(i).getText()).toEqual(nameProductA10[i])
    }

  })

  it('Case9: If select Sort by Name Z-A,then it should sort by Z-A ', function() {
    
    categoryButton.click()
    linkAllproduct.click()
    expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/category/all')

    under1.click()
    sortModel.click()
    sortModel.$('[value="string:-name"]').click()

    //sort by name's product Z-A
    nameProductU1.sort()
    nameProductU1.reverse() 
    for (var i = 0 ; i < nameProductU1.length ; i++) {
      expect(allProductName.get(i).getText()).toEqual(nameProductU1[i])
    }

    to5.click()
    //sort by name's product Z-A
    nameProductTo5.sort() 
    nameProductTo5.reverse()
    for (var i = 0 ; i < nameProductTo5.length ; i++) {
      expect(allProductName.get(i).getText()).toEqual(nameProductTo5[i])
    }

    to10.click()
    //sort by name's product Z-A
    nameProductTo10.sort() 
    nameProductTo10.reverse()
    for (var i = 0 ; i < nameProductTo10.length ; i++) {
      expect(allProductName.get(i).getText()).toEqual(nameProductTo10[i])
    }

    above10.click()
    //sort by name's product Z-A
    nameProductA10.sort() 
    nameProductA10.reverse()
    for (var i = 0 ; i < nameProductA10.length ; i++) {
      expect(allProductName.get(i).getText()).toEqual(nameProductA10[i])
    }

  })

  it('Case10: If select Sort by Price Low to High,then it should sort by Low to High ', function() {

    categoryButton.click()
    linkAllproduct.click()
    expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/category/all')

    under1.click()
    sortModel.click()
    sortModel.$('[value="string:price"]').click()

    //sort by price's product Low to High 
    priceProductU1.sort(function(a, b){return a-b}) 
    for (var i = 0 ; i < priceProductU1.length ; i++) {
      expect(allProductPrice.get(i).getText()).toEqual(priceProductU1[i]+' Baht')
    }

    to5.click()
    //sort by price's product Low to High 
    priceProductTo5.sort(function(a, b){return a-b})
    for (var i = 0 ; i < priceProductTo5.length ; i++) {
      expect(allProductPrice.get(i).getText()).toEqual(priceProductTo5[i]+' Baht')
    }

    to10.click()
    //sort by price's product Low to High 
    priceProductTo10.sort(function(a, b){return a-b}) 
    for (var i = 0 ; i < priceProductTo10.length ; i++) {
      expect(allProductPrice.get(i).getText()).toEqual(priceProductTo10[i]+' Baht')
    }

    above10.click()
    //sort by price's product Low to High 
    priceProductA10.sort(function(a, b){return a-b}) 
    for (var i = 0 ; i < priceProductA10.length ; i++) {
      expect(allProductPrice.get(i).getText()).toEqual(priceProductA10[i]+' Baht')
    }

  })

  it('Case11: If select Sort by Price High to Low,then it should sort by High to Low ', function() {
    
    categoryButton.click()
    linkAllproduct.click()
    expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/category/all')

    under1.click()
    sortModel.click()
    sortModel.$('[value="string:-price"]').click()
    
    //sort by price's product High to Low
    priceProductU1.sort(function(a, b){return b-a}) 
    for (var i = 0 ; i < priceProductU1.length ; i++) {
      expect(allProductPrice.get(i).getText()).toEqual(priceProductU1[i]+' Baht')
    }

    to5.click()
    //sort by price's product High to Low
    priceProductTo5.sort(function(a, b){return b-a})
    for (var i = 0 ; i < priceProductTo5.length ; i++) {
      expect(allProductPrice.get(i).getText()).toEqual(priceProductTo5[i]+' Baht')
    }

    to10.click()
    //sort by price's product High to Low
    priceProductTo10.sort(function(a, b){return b-a}) 
    for (var i = 0 ; i < priceProductTo10.length ; i++) {
      expect(allProductPrice.get(i).getText()).toEqual(priceProductTo10[i]+' Baht')
    }

    above10.click()
    //sort by price's product High to Low
    priceProductA10.sort(function(a, b){return b-a}) 
    for (var i = 0 ; i < priceProductA10.length ; i++) {
      expect(allProductPrice.get(i).getText()).toEqual(priceProductA10[i]+' Baht')
    }

  })
})
