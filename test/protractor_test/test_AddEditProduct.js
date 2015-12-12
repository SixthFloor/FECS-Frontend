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

    it('Case1:If you put Invalid Form(you just put only category),then it can not add product', function() {
      
      categoryButton.click()
      linkAllproduct.click()
      expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/category/all')
      addNewProductButton.click()

      categoryModel.click()
      Edit('TEST PUT ONLY NAME','')
      furnitureDescription.sendKeys('test put ony name (invalid form),then it can not add product')
      addProductButton.click()
      expect(invalidShow.isDisplayed()).toBeTruthy()

      browser.get('http://localhost:3030/#/category/all')
      addNewProductButton.click()
      categoryModel.click()
      categoryModel.$('[label="Bathroom"]').click()
      furnitureDescription.sendKeys('test put ony category (invalid form),then it can not add product')
      addProductButton.click()
      expect(invalidShow.isDisplayed()).toBeTruthy()

      browser.get('http://localhost:3030/#/category/all')
      addNewProductButton.click()
      categoryModel.click()
      categoryModel.$('[label="Living Room"]').click()
      subcategoryModel.click()
      subcategoryModel.$('[label="Table"]').click()
      furnitureDescription.sendKeys('test put category+subcategory (invalid form),then it can not add product')
      addProductButton.click()
      expect(invalidShow.isDisplayed()).toBeTruthy()

      browser.get('http://localhost:3030/#/category/all')
      addNewProductButton.click()
      Edit('','5000')
      furnitureDescription.sendKeys('test put ony price (invalid form),then it can not add product')
      addProductButton.click()
      expect(invalidShow.isDisplayed()).toBeTruthy()

      browser.get('http://localhost:3030/#/category/all')
      addNewProductButton.click()
      Edit('TEST PUT NAME AND PRICE','5000')
      furnitureDescription.sendKeys('test put name+price (invalid form),then it can not add product')
      addProductButton.click()
      expect(invalidShow.isDisplayed()).toBeTruthy()

      browser.get('http://localhost:3030/#/category/all')
      addNewProductButton.click()
      categoryModel.click()
      categoryModel.$('[label="Bathroom"]').click()
      Edit('TEST PUT NAME AND CATEGORY','')
      furnitureDescription.sendKeys('test put name+category (invalid form),then it can not add product')
      addProductButton.click()
      expect(invalidShow.isDisplayed()).toBeTruthy()

      browser.get('http://localhost:3030/#/category/all')
      addNewProductButton.click()
      categoryModel.click()
      categoryModel.$('[label="Living Room"]').click()
      subcategoryModel.click()
      subcategoryModel.$('[label="Sofa"]').click()
      Edit('TEST PUT NAME AND CATEGORY+SUBCATEGORY','')
      furnitureDescription.sendKeys('test put name+category+subcategory (invalid form),then it can not add product')
      addProductButton.click()
      expect(invalidShow.isDisplayed()).toBeTruthy()

      browser.get('http://localhost:3030/#/category/all')
      addNewProductButton.click()
      categoryModel.click()
      categoryModel.$('[label="Living Room"]').click()
      subcategoryModel.click()
      subcategoryModel.$('[label="Cabinet & Storage"]').click()
      Edit('','5000')
      furnitureDescription.sendKeys('test put price+category+subcategory (invalid form),then it can not add product')
      addProductButton.click()
      expect(invalidShow.isDisplayed()).toBeTruthy()

      //browser.sleep(5000)
      
    })

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
      furnitureDimension.sendKeys('5m x 5.5m')
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

      browser.get('http://localhost:3030/#/category/all')
      addNewProductButton.click()

      categoryModel.click()
      categoryModel.$('[label="Bathroom"]').click()
      subcategoryModel.click()
      subcategoryModel.$('[label="Sink"]').click()
      Edit('TEST SAME PRODUCT NAME AND SAME TYPE','5000')
      furnitureDescription.sendKeys('test product name is the same and same type(second add product)')
      //addProductButton.click()
      //expect(invalidShow.isDisplayed()).toBeTruthy()
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

      browser.get('http://localhost:3030/#/category/all')
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

      browser.get('http://localhost:3030/#/category/all')
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

    it('Case10:The price should be Integer not float', function() {
      
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

    it('Case11:The price should be Integer not word', function() {
      
      categoryButton.click()
      linkAllproduct.click()
      expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/category/all')
      addNewProductButton.click()

      categoryModel.click()
      categoryModel.$('[label="Dinning Room"]').click()
      subcategoryModel.click()
      subcategoryModel.$('[label="Table"]').click()
      Edit('TEST ADD PRODUCT WORD PRICE','five thousand')
      furnitureDescription.sendKeys('test add product with word price(five thousand)')
      //addProductButton.click()
      browser.sleep(5000)
      
    })

    it('Case12:The name of product should be UPPER case not lower case', function() {
      
      categoryButton.click()
      linkAllproduct.click()
      expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/category/all')
      addNewProductButton.click()

      categoryModel.click()
      categoryModel.$('[label="Dinning Room"]').click()
      subcategoryModel.click()
      subcategoryModel.$('[label="Chair"]').click()
      Edit('test name product lower case','5000')
      furnitureDescription.sendKeys('test name product with lower case')
      //addProductButton.click()
      browser.sleep(5000)
      
    })

    it('Case13:The dimension should be (ex. 5m x 5.5m) not anything else', function() {
      
      categoryButton.click()
      linkAllproduct.click()
      expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/category/all')
      addNewProductButton.click()

      categoryModel.click()
      categoryModel.$('[label="Dinning Room"]').click()
      subcategoryModel.click()
      subcategoryModel.$('[label="Storage"]').click()
      Edit('TEST ADD PRODUCT WRONG DIMENSION','5000')
      furnitureDimension.sendKeys('test add product with wrong dimension')
      //addProductButton.click()
      browser.sleep(5000)
      
    })

    
        
})
