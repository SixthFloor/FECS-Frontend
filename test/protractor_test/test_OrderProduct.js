/* Test case: Order product */
/* Created by Kittinan */

describe('Add product to cart', function () {

	var linkDropdown =   element.all(by.css('.dropdown-toggle'))
 	var linkSignin = element(by.css('[ui-sref="login"]'))
  	var email = element(by.model('loginCtrl.data.email'))
  	var password = element(by.model('loginCtrl.data.pwd'))
  	var loginButton = element(by.buttonText('Log in'))
  	var notifications = element.all(by.css('.ui-notification'))
  	var cartButton = element(by.css('[ui-sref="cart"]'))
  	var BedroomProduct = element(by.css('[href="#/category/Bedroom"]'))
    var logoutButton = element(by.css('[href="#/logout"]'))
  	var product = element.all(by.id('view-button'))
  	var CheckOutOfStock = element(by.id('outofstock'))
  	var addToCartButton = element(by.css('.add-btn'))
  	var productInCart = element.all(by.repeater('item in cartCtrl.itemList track by $index'))
  	var removeButton = element.all(by.css('.btn.btn-danger'))
  	var CheckOutButton = element(by.buttonText('Checkout'))
  	var quantity = element.all(by.model('quantity'))
    var selectShippingDate = element(by.model('paymentCtrl.order.shipping'))
    var selectEXPMonth = element(by.model('User.expirationDate.month'))
    var selectEXPYear = element(by.model('User.expirationDate.year'))
    var Orderbutton = element.all(by.css('.register-btn'))
    var cardCVV = element(by.model('paymentCtrl.cvv'))
    var cardNumber1 = element(by.model('paymentCtrl.num1'))
    var cardNumber2 = element(by.model('paymentCtrl.num2'))
    var cardNumber3 = element(by.model('paymentCtrl.num3'))
    var cardNumber4 = element(by.model('paymentCtrl.num4'))
    var checkErrorMessage1 = element(by.css('[ig-if="paymentCtrl.cardfail.status == 1"]')) // out of money
    var checkErrorMessage2 = element(by.css('[ig-if="paymentCtrl.cardfail.status == 2"]')) // invilid credit card
  	var amountProductInCart
  	var amountProduct
  	var amountquant
  	var quant = []
  
  	// function randomProduct(amountProduct){
  	// 	randomfromAll = (Math.floor(Math.random() * (amountProduct+1))) -1
  	// }

	it('Case 1: If email and password correct,then it should access complete and cart button appear', function(){
		browser.get('http://localhost:3030/#')
		linkDropdown.get(1).click()
   		linkSignin.click()
    	expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/login')
    	email.sendKeys("testbuy@gmail.com")
    	password.sendKeys("123456789")
    	loginButton.click()
    	expect(notifications.getText()).toEqual([ 'Well done! Login successfully.' ])
	})

	it('Case 2: If click to all product,it should go to all product page', function(){
		linkDropdown.get(0).click()
		BedroomProduct.click()
		expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/category/Bedroom')
	})

	it('Case 3:', function(){
		product.get(9).click()
		addToCartButton.click()
		cartButton.click()
		CheckOutButton.click()
    browser.sleep(2000)
    selectShippingDate.click()
    browser.sleep(2000)
    selectShippingDate.all(by.tagName('option')).get(8).click()
    Orderbutton.get(1).click()
    cardNumber1.sendKeys('4619')
    cardNumber2.sendKeys('2304')
    cardNumber3.sendKeys('2570')
    cardNumber4.sendKeys('0658')
    selectEXPMonth.all(by.tagName('option')).get(1).click()
    selectEXPYear.all(by.tagName('option')).get(3).click()
    cardCVV.sendKeys('148')
    Orderbutton.get(3).click()
    browser.sleep(5000)
    Orderbutton.get(5).click()
    browser.sleep(5000)
    Orderbutton.get(7).click()
	})

it('Case 4: Order with bank account that have no money,the alert message should show', function(){
    linkDropdown.get(0).click()
    BedroomProduct.click()
    product.get(9).click()
    addToCartButton.click()
    cartButton.click()
    CheckOutButton.click()
    browser.sleep(2000)
    selectShippingDate.click()
    browser.sleep(2000)
    selectShippingDate.all(by.tagName('option')).get(8).click()
    Orderbutton.get(1).click()
    cardNumber1.sendKeys('5301')
    cardNumber2.sendKeys('5253')
    cardNumber3.sendKeys('2150')
    cardNumber4.sendKeys('0050')
    selectEXPMonth.all(by.tagName('option')).get(3).click()
    selectEXPYear.all(by.tagName('option')).get(4).click()
    cardCVV.sendKeys('154')
    Orderbutton.get(3).click()
    browser.sleep(3000)
    expect(checkErrorMessage1.isPresent()).toBeTruthy
  })

it('Case 5: Order with wrong Cvv,the alert message should show', function(){
    linkDropdown.get(0).click()
    BedroomProduct.click()
    product.get(9).click()
    addToCartButton.click()
    cartButton.click()
    CheckOutButton.click()
    browser.sleep(2000)
    selectShippingDate.click()
    browser.sleep(2000)
    selectShippingDate.all(by.tagName('option')).get(8).click()
    Orderbutton.get(1).click()
    cardNumber1.sendKeys('4619')
    cardNumber2.sendKeys('2304')
    cardNumber3.sendKeys('2570')
    cardNumber4.sendKeys('0658')
    selectEXPMonth.all(by.tagName('option')).get(3).click()
    selectEXPYear.all(by.tagName('option')).get(4).click()
    cardCVV.sendKeys('123')
    Orderbutton.get(3).click()
    browser.sleep(3000)
    expect(checkErrorMessage2.isPresent()).toBeTruthy
  })

it('Case 6: Order with wrong Cvv,the alert message should show', function(){
    linkDropdown.get(0).click()
    BedroomProduct.click()
    product.get(9).click()
    addToCartButton.click()
    cartButton.click()
    CheckOutButton.click()
    browser.sleep(2000)
    selectShippingDate.click()
    browser.sleep(2000)
    selectShippingDate.all(by.tagName('option')).get(8).click()
    Orderbutton.get(1).click()
    cardNumber1.sendKeys('1234')
    cardNumber2.sendKeys('5678')
    cardNumber3.sendKeys('9876')
    cardNumber4.sendKeys('5432')
    selectEXPMonth.all(by.tagName('option')).get(3).click()
    selectEXPYear.all(by.tagName('option')).get(4).click()
    cardCVV.sendKeys('123')
    Orderbutton.get(3).click()
    browser.sleep(3000)
    expect(checkErrorMessage2.isPresent()).toBeTruthy
  })

})