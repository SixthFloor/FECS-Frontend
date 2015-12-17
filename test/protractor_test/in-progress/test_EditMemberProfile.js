/* Test case: Edit Member Profile*/
/* Created by Niti*/


describe('edit member profile', function() {

    var accountButton =   element.all(by.css('.dropdown-toggle')).get(1)
    var profileButton =   element.all(by.css('.dropdown-toggle')).get(1)
    var linkSignin = element(by.css('[ui-sref="login"]'))
    var linkSettingProfile = element(by.css('[href="#/setting"]'))
    var personInforButton = element.all(by.css('.ng-isolate-scope')).get(2)
    var accountInforButton = element.all(by.css('.ng-isolate-scope')).get(1)
    var email = element(by.model('loginCtrl.data.email'))
    var password = element(by.model('loginCtrl.data.pwd'))
    var loginButton = element(by.buttonText('Log in'))
    var allInformation = element.all(by.css('.form-group'))
    var firstName = element(by.id('firstname'))
    var lastName = element(by.id('lastname'))
    var address1 = element(by.id('address1'))
    var address2 = element(by.id('address2'))
    var province = element(by.id('province'))
    var zipCode = element(by.model('settingCtrl.User.zipcode'))
    var phoneNumber = element(by.id('phoneNumber'))
    var oldpassword = element(by.model('settingCtrl.data.pwd'))
    var editProfileButton = element(by.buttonText('Edit Profile'))
    var linkAccountAfterLogin =   element.all(by.css('.dropdown-toggle')).get(1)
    var linkSignout = element(by.css('[ui-sref="logout"]'))
    var notifications = element.all(by.css('.ui-notification'))

    function Login(a,b) {
      email.sendKeys(a)
      password.sendKeys(b)
    }

    function ClearInformation() {
      firstName.clear()
      lastName.clear()
      address1.clear()
      address2.clear()
      province.clear()
      zipCode.clear()
      phoneNumber.clear()
    }

    beforeEach(function() {
      browser.get('http://localhost:3030/#')
    })

    it('Login as member, then test', function() {

      accountButton.click()
      linkSignin.click()
      expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/login')
      Login('nititest@gmail.com','12345678')
      loginButton.click()
      browser.sleep(5000)
      //element(by.linkText(' Sign out ')).click()

    })

    it('Case1:If you click information button,then it should show your information and you can edit your information.', function() {

      profileButton.click()
      linkSettingProfile.click()
      personInforButton.click()
      expect(firstName.getAttribute('value')).toEqual('Firstname')
      expect(lastName.getAttribute('value')).toEqual('Lastname')
      expect(address1.getAttribute('value')).toEqual('')
      expect(address2.getAttribute('value')).toEqual('')
      expect(province.getAttribute('value')).toEqual('')
      expect(zipCode.getAttribute('value')).toEqual('')
      expect(phoneNumber.getAttribute('value')).toEqual('')
      firstName.clear()
      lastName.clear()
      firstName.sendKeys('Niti')
      lastName.sendKeys('Petcharatmora')
      address1.sendKeys('436 phang-nga')
      address2.sendKeys('18/118-119 bangkok')
      province.sendKeys('phang-nga')
      zipCode.sendKeys('82000')
      phoneNumber.sendKeys('0944486743')
      oldpassword.sendKeys('12345678')
      editProfileButton.click()
      browser.sleep(5000)

      //browser.sleep(5000)
      //element(by.linkText(' Sign out ')).click()

    })
    
    it('Case1:If you click information button,then it should show your information and you can edit your information.', function() {

      profileButton.click()
      linkSettingProfile.click()
      personInforButton.click()
      expect(firstName.getAttribute('value')).toEqual('Niti')
      expect(lastName.getAttribute('value')).toEqual('Petcharatmora')
      expect(address1.getAttribute('value')).toEqual('436 phang-nga')
      expect(address2.getAttribute('value')).toEqual('18/118-119 bangkok')
      expect(province.getAttribute('value')).toEqual('phang-nga')
      expect(zipCode.getAttribute('value')).toEqual('82000')
      expect(phoneNumber.getAttribute('value')).toEqual('0944486743')

      //browser.sleep(5000)
      //element(by.linkText(' Sign out ')).click()

    })

    it('Case1:If you click information button,then it should show your information and you can edit your information.', function() {

      profileButton.click()
      linkSettingProfile.click()
      personInforButton.click()
      ClearInformation()
      firstName.sendKeys('Firstname')
      lastName.sendKeys('Lastname')
      oldpassword.sendKeys('12345678')
      editProfileButton.click()
      browser.sleep(5000)

      //browser.sleep(5000)
      //element(by.linkText(' Sign out ')).click()

    })


    it('logout after test', function() {
      linkAccountAfterLogin.click()
      linkSignout.click()
      expect(notifications.getText()).toEqual([ 'Logout Success! Thank you for using our services :)' ])
      browser.sleep(5000)

    })
        
})
