/* Test case: Register As Member */
/* Created by Kittinan */

describe('Register as member', function () {

    var email = element(by.model('registerCtrl.member.email'))
    var password = element(by.model('registerCtrl.member.password'))
    var confirmpassword = element(by.model('registerCtrl.member.confirmpassword'))
    var firstname = element(by.model('registerCtrl.member.firstname'))
    var lastname = element(by.model('registerCtrl.member.lastname'))
    var registerButton = element(by.buttonText('Register'))
    var homeButton = element(by.css('[ui-sref="home"]'))

    function enterResgiterPage(){
        browser.get('http://localhost:3030/#')
        element(by.css('[ui-sref="register"]')).click()
    }

    function clearInformation(){
        email.clear()
        password.clear()
        confirmpassword.clear()
        firstname.clear()
        lastname.clear()
    }

    it('Start: Test click to register page', function () {
        enterResgiterPage()
        expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/register')
        browser.sleep(1000)
    })

    it('Case 0: If click registerButton without any information,register should not be successed', function () {
        registerButton.click()
        expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/register')
        enterResgiterPage()
        browser.sleep(2500)
    })

    it('Case 1: If e-mail,password,name and lastname are corrected, register should be successed and access to login page', function () {
        email.sendKeys("newped777@gmail.com")
        password.sendKeys("12345678")
        confirmpassword.sendKeys("12345678")
        firstname.sendKeys("ped")
        lastname.sendKeys("noi")
        registerButton.click()
        browser.sleep(10000)
        browser.waitForAngular()
        expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/login')
        homeButton.click()
        element(by.css('[ui-sref="register"]')).click()
    })

    it('Case 2: If register with same e-mail, notification should appear register unsuccessful', function () {
        clearInformation()
        email.sendKeys("newped1234@gmail.com")
        password.sendKeys("12345678")
        confirmpassword.sendKeys("12345678")
        firstname.sendKeys("ped")
        lastname.sendKeys("noi")
        registerButton.click()
        browser.sleep(1000)
        expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/register')
        enterResgiterPage()
        browser.sleep(2500)
    })

    it('Case 3: If register without lastname, notification should appear register unsuccessful', function () {
        clearInformation()
        email.sendKeys("newnewped117@gmail.com")
        password.sendKeys("12345678")
        confirmpassword.sendKeys("12345678")
        firstname.sendKeys("ped")
        registerButton.click()
        browser.sleep(1000)
        expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/register')
        enterResgiterPage()
        browser.sleep(2500)
    })

    it('Case 4: If register with password shorter than 8 letters, notification should appear register unsuccessful', function () {
        clearInformation()
        email.sendKeys("newnewped117@gmail.com")
        password.sendKeys("123")
        confirmpassword.sendKeys("123")
        firstname.sendKeys("ped")
        lastname.sendKeys("noi")
        registerButton.click()
        expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/register')
        browser.sleep(1000)
        enterResgiterPage()
        browser.sleep(2500)
    })

    it('Case 5: If register email with incorrect form, notification should appear register unsuccessful', function () {
        clearInformation()
        email.sendKeys("newnewped117-gmail.com")
        password.sendKeys("1235678")
        confirmpassword.sendKeys("1235678")
        firstname.sendKeys("ped")
        lastname.sendKeys("noi")
        registerButton.click()
        browser.sleep(1000)
        expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/register')
        enterResgiterPage()
        browser.sleep(2500)
    })

    it('Case 6: If register password that does not match, notification should appear register unsuccessful', function () {
        clearInformation()
        email.sendKeys("newnewped117@gmail.com")
        password.sendKeys("12345678")
        confirmpassword.sendKeys("87654321")
        firstname.sendKeys("ped")
        lastname.sendKeys("noi")
        expect(element(by.css('.alert.alert-danger.col-sm-4.col-sm-offset-2')).isDisplayed()).toBeTruthy()
        browser.sleep(1000)
        enterResgiterPage()
        browser.sleep(2500)
    })

    it('Case 7: If register password with special charactor, notification should appear register unsuccessful', function () {
        clearInformation()
        email.sendKeys("newnewped117@gmail.com")
        password.sendKeys("$&#!$&#!")
        confirmpassword.sendKeys("$&#!$&#!")
        firstname.sendKeys("ped")
        lastname.sendKeys("noi")
        expect(element(by.css('.alert.alert-danger.col-sm-4.col-sm-offset-2')).isDisplayed()).toBeTruthy()
        browser.sleep(1000)
        enterResgiterPage()
        browser.sleep(2500)
    })

    it('Case 8: If register with all correct information, notification should appear successed and change to login page', function () {
        clearInformation()
        email.sendKeys("newnewped779@gmail.com")
        password.sendKeys("12345678")
        confirmpassword.sendKeys("12345678")
        firstname.sendKeys("ped")
        lastname.sendKeys("noi")
        element(by.model('registerCtrl.member.adr1')).sendKeys("Bangken")
        element(by.model('registerCtrl.member.adr2')).sendKeys("Sarmsen")
        element(by.model('registerCtrl.member.province')).sendKeys("BKK")
        element(by.model('registerCtrl.member.zip')).sendKeys("10900")
        element(by.model('registerCtrl.member.phonenumber')).sendKeys("0812345678")
        element(by.id('card-holder-name')).sendKeys("DADY")
        browser.sleep(5000)
        element(by.id('expiry-month')).click()
        element(by.id('expiry-month')).$('[value="11"]').click();
        element(by.name('expiry-year')).click()
        element(by.name('expiry-year')).$('[value="20"]').click();
        registerButton.click()
        browser.sleep(10000)
        browser.waitForAngular()
        expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/login')
        browser.sleep(1000)
    })
})
