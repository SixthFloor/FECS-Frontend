/* Test case: Register As Member */
/* Created by Kittinan */

// var request = require('request')
// var q = require('q')

describe('Register as member', function () {

    var email = element(by.model('registerCtrl.member.email'))
    var password = element(by.model('registerCtrl.member.password'))
    var confirmpassword = element(by.model('registerCtrl.member.confirmpassword'))
    var firstname = element(by.model('registerCtrl.member.firstname'))
    var lastname = element(by.model('registerCtrl.member.lastname'))
    var address1 = element(by.model('registerCtrl.member.adr1'))
    var address2 = element(by.model('registerCtrl.member.adr2'))
    var province = element(by.model('registerCtrl.member.province'))
    var zip = element(by.model('registerCtrl.member.zip'))
    var phonenumber = element(by.model('registerCtrl.member.phonenumber'))
    var cardHolder = element(by.id('card-holder-name'))
    var registerButton = element(by.buttonText('Register'))
    var homeButton = element(by.css('[ui-sref="home"]'))
    var nextButton1 = element(by.css('[ng-click="registerCtrl.next1()"]'))
    var nextButton2 = element(by.css('[ng-click="registerCtrl.next2()"]'))
    var clearButton = element(by.buttonText('Clear'))
    var step1 = element(by.id('registerCtrl.steps.step1'))
    var step2 = element(by.id('registerCtrl.steps.step2'))
    var step3 = element(by.id('registerCtrl.steps.step3'))
    // var registerComplete = element(by.binding(element(by.css('.attr'))))


    // request.post({url:'http://128.199.133.224/api/authentication/login', 
    //   form: {
    //   "email": "nara@gmail.com",
    //   "password": "12345678"
    // }}, 
    //   function(err,httpResponse,body){
    //     console.log(body)
    // })

    var postData = {
      "email": "nara@gmail.com",
      "password": "12345678"
    }

    var url = 'http://128.199.133.224/api/authentication/login'
    var options = {
      method: 'post',
      body: postData,
      json: true,
      url: url
    }
    

    function enterResgiterPage(){
        browser.get('http://localhost:3030/#/register')
    }

    it('Start: Test click to register page', function () {
        enterResgiterPage()
        expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/register')
    })

    it('Case 1: If click nextButton without any information,register should not be successed', function () {
        nextButton1.click()
        expect(step1.isDisplayed).toBeTruthy
        // browser.sleep(1000)
    })


    it('Case 2: If e-mail,password are corrected and click next button,it should go next step', function () {
        email.sendKeys("pedtesting58@gmail.com")
        password.sendKeys("12345678")
        confirmpassword.sendKeys("12345678")
        nextButton1.click()
        expect(step2.isDisplayed).toBeTruthy
        // browser.sleep(1000)
    })

    it('Case 3: If name and lastname are corrected and click next button,it should go next step', function () {
        firstname.sendKeys("ped")
        lastname.sendKeys("noi")
        nextButton2.click()
        expect(step3.isDisplayed).toBeTruthy
        // browser.sleep(1000)
    })

    it('Case 4: If click register button,register should be successed', function () {
        registerButton.click()
        browser.sleep(1000)
        // browser.waitForAngular()
        // expect(registerComplete.getText()).toEqual('pedtesting16@gmail.com')
        browser.get('http://localhost:3030/#/register')
    })

    it('Case 5: If register with same e-mail, notification should appear register unsuccessful', function () {
        email.sendKeys("pedtesting58@gmail.com")
        password.sendKeys("12345678")
        confirmpassword.sendKeys("12345678")
        nextButton1.click()
        firstname.sendKeys("ped")
        lastname.sendKeys("noi")
        address1.sendKeys("Bangken")
        address2.sendKeys("Sarmsen")
        province.sendKeys("BKK")
        zip.sendKeys("10900")
        phonenumber.sendKeys("0812345678")
        nextButton2.click()
        cardHolder.sendKeys("DADY")
        registerButton.click()
        browser.sleep(4000)
        browser.waitForAngular()
        expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/register')
        browser.get('http://localhost:3030/#/register')
    })

    it('Case 6: If register password with special charactor and click next button, it should stay the same step', function () {
        email.sendKeys("pedtester@gmail.com")
        password.sendKeys("!@#$%^&*")
        confirmpassword.sendKeys("!@#$%^&*")
        nextButton1.click()
        firstname.sendKeys("ped")
        lastname.sendKeys("noi")
        nextButton2.click()
        registerButton.click()
        browser.sleep(4000)
        browser.waitForAngular()
        expect(step3.isDisplayed).toBeTruthy
        browser.get('http://localhost:3030/#/register')
    })

    it('Case 7: If register with password shorter than 8 letters and click next button, it should stay the same step', function () {
        email.sendKeys("pedtester@gmail.com")
        password.sendKeys("12345")
        confirmpassword.sendKeys("12345")
        nextButton1.click()
        expect(step1.isDisplayed).toBeTruthy
        clearButton.click()
    })

    it('Case 8: If register email with incorrect form and click next button, it should stay the same step', function () {
        email.sendKeys("pedtester-gmail.com")
        password.sendKeys("1235678")
        confirmpassword.sendKeys("1235678")
        nextButton1.click()
        expect(step1.isDisplayed).toBeTruthy
        clearButton.click()
    })

    it('Case 9: If register password that does not match and click next button, it should stay the same step', function () {
        email.sendKeys("pedtester@gmail.com")
        password.sendKeys("12345678")
        confirmpassword.sendKeys("87654321")
        nextButton1.click()
        expect(step1.isDisplayed).toBeTruthy
        clearButton.click()
        browser.get('http://localhost:3030/#/register') 
    })

    it('Case 10: If register without lastname and click next button, it should stay the same step', function () {
        email.sendKeys("pedtester@gmail.com")
        password.sendKeys("12345678")
        confirmpassword.sendKeys("12345678")
        nextButton1.click()
        firstname.sendKeys("ped")
        nextButton2.click()
        expect(step2.isDisplayed).toBeTruthy
        browser.get('http://localhost:3030/#/register')
        // browser.sleep(2000)
    })

     it('Case 11: If register with email that is registered but with UpperCase, it should not login successed', function(){
        email.sendKeys("PEDTesting58@gmail.com")
        password.sendKeys("12345678")
        confirmpassword.sendKeys("12345678")
        nextButton1.click()
        firstname.sendKeys("ped")
        lastname.sendKeys("noi")
        nextButton2.click()
        registerButton.click()
        expect(step3.isDisplayed).toBeTruthy

    })

})
