/* Test case: Add and Edit product*/
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
    var addNewProductButton = element(by.css('[ng-click="categorypageCtrl.directToAdd()"]'))
    var addProductButton = element(by.buttonText('Add Furniture'))
    var invalidShow = element(by.css('[ng-show="!addproductCtrl.valid"]'))
    var furnitureName = element(by.model('addproductCtrl.product.productName'))
    var furniturePrice = element(by.model('addproductCtrl.product.price'))
    var furnitureDescription = element(by.model('addproductCtrl.product.description'))
    var furnitureDimension = element(by.model('addproductCtrl.product.dimensionDescription'))
    var categoryModel = element(by.model('addproductCtrl.product.category'))
    var subcategoryModel = element(by.model('addproductCtrl.product.subcategory'))

    function Login(a,b) {
      email.sendKeys(a)
      password.sendKeys(b)
    }

    function Edit(a,b){
      furnitureName.sendKeys(a)
      furniturePrice.sendKeys(b)
    }

    beforeEach(function() {
      browser.get('http://localhost:3030/#')
    })

    it('Login as admin, then test', function() {

      accountButton.click()
      linkSignin.click()
      expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/login')
      Login('nara@gmail.com','12345678')
      loginButton.click()
      browser.sleep(5000)
      //element(by.linkText(' Sign out ')).click()

    })

    /*it('Case1:If you put Invalid Form(you just put only category),then it can not add product', function() {
      
      categoryButton.click()
      linkAllproduct.click()
      expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/category/all')
      addNewProductButton.click()

      categoryModel.click()
      categoryModel.$('[label="Bedroom"]').click()
      addProductButton.click()
      expect(invalidShow.isDisplayed()).toBeTruthy()

      categoryModel.click()
      categoryModel.$('[label="Bathroom"]').click()
      addProductButton.click()
      expect(invalidShow.isDisplayed()).toBeTruthy()

      categoryModel.click()
      categoryModel.$('[label="Kitchen"]').click()
      addProductButton.click()
      expect(invalidShow.isDisplayed()).toBeTruthy()

      categoryModel.click()
      categoryModel.$('[label="Dinning Room"]').click()
      addProductButton.click()
      expect(invalidShow.isDisplayed()).toBeTruthy()

      categoryModel.click()
      categoryModel.$('[label="Living Room"]').click()
      addProductButton.click()
      expect(invalidShow.isDisplayed()).toBeTruthy()
      browser.sleep(5000)
      
    })*/

    it('Case2:If you put Correct Form,then it can add product', function() {
      
      categoryButton.click()
      linkAllproduct.click()
      expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/category/all')
      addNewProductButton.click()

      categoryModel.click()
      categoryModel.$('[label="Bedroom"]').click()
      subcategoryModel.click()
      subcategoryModel.$('[label="Bed"]').click()
      Edit('TEST ADD PRODUCT','5000')
      //addProductButton.click()
      browser.sleep(5000)
      
    })

    it('Case3:Can add product with description', function() {
      
      categoryButton.click()
      linkAllproduct.click()
      expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/category/all')
      addNewProductButton.click()

      categoryModel.click()
      categoryModel.$('[label="Bedroom"]').click()
      subcategoryModel.click()
      subcategoryModel.$('[label="Wardrobe"]').click()
      Edit('TEST ADD PRODUCT DESCRIPTION','5000')
      furnitureDescription.sendKeys('test write only description')
      //addProductButton.click()
      browser.sleep(5000)
      
    })

    it('Case4:Can add product with dimension', function() {
      
      categoryButton.click()
      linkAllproduct.click()
      expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/category/all')
      addNewProductButton.click()

      categoryModel.click()
      categoryModel.$('[label="Bedroom"]').click()
      subcategoryModel.click()
      subcategoryModel.$('[label="Night Stand"]').click()
      Edit('TEST ADD PRODUCT DIMENSION','5000')
      furnitureDimension.sendKeys('test write only dimension')
      //addProductButton.click()
      browser.sleep(5000)
      
    })

    it('Case5:Can add product with description and dimension', function() {
      
      categoryButton.click()
      linkAllproduct.click()
      expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/category/all')
      addNewProductButton.click()

      categoryModel.click()
      categoryModel.$('[label="Bedroom"]').click()
      subcategoryModel.click()
      subcategoryModel.$('[label="Wardrobe"]').click()
      Edit('TEST ADD PRODUCT DESCRIPTION AND DIMENSION','5000')
      furnitureDimension.sendKeys('test write dimension and dimension')
      furnitureDescription.sendKeys('test write description and dimension')
      //addProductButton.click()
      browser.sleep(5000)
      
    })

    it('Case6:If name of product is the same and same type(category and subcategory),then it should not add product success', function() {
      
      categoryButton.click()
      linkAllproduct.click()
      expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/category/all')
      addNewProductButton.click()

      categoryModel.click()
      categoryModel.$('[label="Bathroom"]').click()
      subcategoryModel.click()
      subcategoryModel.$('[label="Sink"]').click()
      Edit('TEST SAME PRODUCT NAME AND SAME TYPE','5000')
      furnitureDescription.sendKeys('test product name is the same and same type(first add product)')
      //addProductButton.click()
      browser.sleep(5000)

      //browser.get('http://localhost:3030/#/category/all')
      addNewProductButton.click()

      categoryModel.click()
      categoryModel.$('[label="Bathroom"]').click()
      subcategoryModel.click()
      subcategoryModel.$('[label="Sink"]').click()
      Edit('TEST SAME PRODUCT NAME AND SAME TYPE','5000')
      furnitureDescription.sendKeys('test product name is the same and same type(second add product)')
      //addProductButton.click()
      browser.sleep(5000)
      
    })

    it('Case7:If name of product is the same but not same type(subcategory),then it should add product success', function() {
      
      categoryButton.click()
      linkAllproduct.click()
      expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/category/all')
      addNewProductButton.click()

      categoryModel.click()
      categoryModel.$('[label="Bathroom"]').click()
      subcategoryModel.click()
      subcategoryModel.$('[label="Mirror"]').click()
      Edit('TEST SAME PRODUCT NAME BUT NOT SAME TYPE(SUBCATEGORY)','5000')
      furnitureDescription.sendKeys('test product name is the same but not same type(first add product)')
      //addProductButton.click()
      browser.sleep(5000)

      //browser.get('http://localhost:3030/#/category/all')
      addNewProductButton.click()

      categoryModel.click()
      categoryModel.$('[label="Bathroom"]').click()
      subcategoryModel.click()
      subcategoryModel.$('[label="Curtain"]').click()
      Edit('TEST SAME PRODUCT NAME BUT NOT SAME TYPE(SUBCATEGORY)','5000')
      furnitureDescription.sendKeys('test product name is the same but not same type(second add product)')
      //addProductButton.click()
      browser.sleep(5000)
      
    })

    it('Case8:If name of product is the same but not same type(category),then it should add product success', function() {
      
      categoryButton.click()
      linkAllproduct.click()
      expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/category/all')
      addNewProductButton.click()

      categoryModel.click()
      categoryModel.$('[label="Bathroom"]').click()
      subcategoryModel.click()
      subcategoryModel.$('[label="Storage"]').click()
      Edit('TEST SAME PRODUCT NAME BUT NOT SAME TYPE(CATEGORY)','5000')
      furnitureDescription.sendKeys('test product name is the same but not same type(first add product)')
      //addProductButton.click()
      browser.sleep(5000)

      //browser.get('http://localhost:3030/#/category/all')
      addNewProductButton.click()

      categoryModel.click()
      categoryModel.$('[label="Kitchen"]').click()
      subcategoryModel.click()
      subcategoryModel.$('[label="Counter"]').click()
      Edit('TEST SAME PRODUCT NAME BUT NOT SAME TYPE(CATEGORY)','5000')
      furnitureDescription.sendKeys('test product name is the same but not same type(second add product)')
      //addProductButton.click()
      browser.sleep(5000)
      
    })
    
    it('Case9:Can add product with limit price', function() {
      
      categoryButton.click()
      linkAllproduct.click()
      expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/category/all')
      addNewProductButton.click()

      categoryModel.click()
      categoryModel.$('[label="Kitchen"]').click()
      subcategoryModel.click()
      subcategoryModel.$('[label="Sink"]').click()
      Edit('TEST ADD PRODUCT LIMIT PRICE','1080000000')
      furnitureDescription.sendKeys('test add product with limit price(1,080,000,000)')
      //addProductButton.click()
      browser.sleep(5000)
      
    })

    it('Case9:The price should not be Integer not float', function() {
      
      categoryButton.click()
      linkAllproduct.click()
      expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/category/all')
      addNewProductButton.click()

      categoryModel.click()
      categoryModel.$('[label="Kitchen"]').click()
      subcategoryModel.click()
      subcategoryModel.$('[label="Storage"]').click()
      Edit('TEST ADD PRODUCT FLOAT PRICE','5000.50')
      furnitureDescription.sendKeys('test add product with float price(5000.50)')
      //addProductButton.click()
      browser.sleep(5000)
      
    })

    /*it('Case5:If you put Invalid Form(you just put only name and price),then it can not add product', function() {
      
      categoryButton.click()
      linkAllproduct.click()
      expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/category/all')
      addNewProductButton.click()

      categoryModel.click()
      categoryModel.$('[label="Bedroom"]').click()
      subcategoryModel.click()
      subcategoryModel.$('[label="Bed"]').click()
      //Edit('TEST1','5000')
      addProductButton.click()
      expect(invalidShow.isDisplayed()).toBeTruthy()
      browser.sleep(5000)
      
    })

    it('Case6:If you put Invalid Form(you just put name,price,and category),then it can not add product', function() {
      
      categoryButton.click()
      linkAllproduct.click()
      expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/category/all')
      addNewProductButton.click()

      categoryModel.click()
      categoryModel.$('[label="Bedroom"]').click()
      subcategoryModel.click()
      subcategoryModel.$('[label="Bed"]').click()
      //Edit('TEST1','5000')
      addProductButton.click()
      expect(invalidShow.isDisplayed()).toBeTruthy()
      browser.sleep(5000)
      
    })

    it('Case7:If you put Invalid Form(you just put name,category,and subcategory),then it can not add product', function() {
      
      categoryButton.click()
      linkAllproduct.click()
      expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/category/all')
      addNewProductButton.click()

      categoryModel.click()
      categoryModel.$('[label="Bedroom"]').click()
      subcategoryModel.click()
      subcategoryModel.$('[label="Bed"]').click()
      //Edit('TEST1','5000')
      addProductButton.click()
      expect(invalidShow.isDisplayed()).toBeTruthy()
      browser.sleep(5000)
      
    })

    it('Case8:If you put Invalid Form(you just put price,category,and subcategory),then it can not add product', function() {
      
      categoryButton.click()
      linkAllproduct.click()
      expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/category/all')
      addNewProductButton.click()

      categoryModel.click()
      categoryModel.$('[label="Bedroom"]').click()
      subcategoryModel.click()
      subcategoryModel.$('[label="Bed"]').click()
      //Edit('TEST1','5000')
      addProductButton.click()
      expect(invalidShow.isDisplayed()).toBeTruthy()
      browser.sleep(5000)
      
    })*/

    
        
})
