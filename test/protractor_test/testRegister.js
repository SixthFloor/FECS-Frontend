/* global describe */
/* global it */
/* global browser */
/* global element */
/* global by */
/* global expect */
/* global beforeEach */
describe('register as member', function () {

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

    it('test click register', function () {
        enterResgiterPage()
        expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/register')
        browser.sleep(1000)
    })

    // case1:
    it('e-mail,password,name and lastname are corrected,register should be successed and change to login page', function () {
        email.sendKeys("newped111@gmail.com")
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

    case2:
    it('register with same email,it should notice register unsuccessful', function () {
        clearInformation()
        email.sendKeys("newped111@gmail.com")
        password.sendKeys("12345678")
        confirmpassword.sendKeys("12345678")
        firstname.sendKeys("ped")
        lastname.sendKeys("noi")
        registerButton.click()
        browser.sleep(1000)
        expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/register')
        enterResgiterPage()
        clearInformation()
        browser.sleep(2500)
    })

    // // case3:
    it('register with too long password,it should notice register unsuccessful', function () {
        clearInformation()
        email.sendKeys("newnewped112@gmail.com")
        password.sendKeys("1234567891011121314151617181920")
        confirmpassword.sendKeys("1234567891011121314151617181920")
        firstname.sendKeys("ped")
        lastname.sendKeys("noi")
        expect(element(by.css('.alert.alert-danger.col-sm-4.col-sm-offset-2')).isDisplayed()).toBeTruthy()
        browser.sleep(1000)
        enterResgiterPage()
        browser.sleep(2500)
    })

    // // case4:
    it('register with too short password,it should notice register unsuccessful', function () {
        clearInformation()
        email.sendKeys("newnewped112@gmail.com")
        password.sendKeys("123")
        confirmpassword.sendKeys("123")
        firstname.sendKeys("ped")
        lastname.sendKeys("noi")
        expect(element(by.css('.alert.alert-danger.col-sm-4.col-sm-offset-2')).isDisplayed()).toBeTruthy()
        browser.sleep(1000)
        enterResgiterPage()
        browser.sleep(2500)
    })

    // case5:
    it('register with wrong email form,it should notice register unsuccessful', function () {
        clearInformation()
        email.sendKeys("newnewped112-gmail.com")
        password.sendKeys("1235678")
        confirmpassword.sendKeys("1235678")
        firstname.sendKeys("ped")
        lastname.sendKeys("noi")
        expect(element(by.css('.alert.alert-danger.col-sm-4.col-sm-offset-2')).isDisplayed()).toBeTruthy()
        browser.sleep(1000)
        enterResgiterPage()
        browser.sleep(2500)
    })

    //case6:
    it('register with password that does not match,it should notice register unsuccessful', function () {
        clearInformation()
        email.sendKeys("newnewped112@gmail.com")
        password.sendKeys("12345678")
        confirmpassword.sendKeys("87654321")
        firstname.sendKeys("ped")
        lastname.sendKeys("noi")
        expect(element(by.css('.alert.alert-danger.col-sm-4.col-sm-offset-2')).isDisplayed()).toBeTruthy()
        browser.sleep(1000)
        enterResgiterPage()
        browser.sleep(2500)
    })

    //case7:
    it('register with special charactor in password,it should notice register unsuccessful', function () {
        clearInformation()
        email.sendKeys("newnewped112@gmail.com")
        password.sendKeys("$$$$$$$$$$")
        confirmpassword.sendKeys("$$$$$$$$$$")
        firstname.sendKeys("ped")
        lastname.sendKeys("noi")
        expect(element(by.css('.alert.alert-danger.col-sm-4.col-sm-offset-2')).isDisplayed()).toBeTruthy()
        browser.sleep(1000)
        enterResgiterPage()
        browser.sleep(2500)
    })

    // case8:
    it('register with all correct information,it should be successed and change to login page', function () {
        clearInformation()
        email.sendKeys("newnewped112@gmail.com")
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
