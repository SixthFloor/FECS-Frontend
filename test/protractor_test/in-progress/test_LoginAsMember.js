/* Test case: Login As Member */
/* Created by Niti */

describe('Login as member', function() {

  var linkAccount =   element.all(by.css('.dropdown-toggle'))
  var linkSignin = element(by.css('[ui-sref="login"]'))
  var linkSignout = element(by.css('[ui-sref="logout"]'))
  var linkHome = element(by.css('[ui-sref="home"]'))
  var email = element(by.model('loginCtrl.data.email'))
  var password = element(by.model('loginCtrl.data.pwd'))
  var loginButton = element(by.buttonText('Sign in'))
  var notifications = element.all(by.css('.ui-notification'))

  function Login(a,b) {
    email.sendKeys(a)
    password.sendKeys(b)
  }

  beforeEach(function() {
    browser.get('http://localhost:3030/#')
    notifications.each(function(notification) {
      notification.addClass('killed')
    })
  })

  it('Case 1: If email and password correct,then it should access complete', function() {

    linkAccount.get(1).click()
    linkSignin.click()
    expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/login')
    Login('nara@gmail.com','12345678')
    loginButton.click()
    expect(notifications.getText()).toEqual([ 'Well done! Login successfully.' ])
    //browser.sleep(5000)
    //element(by.linkText(' Sign out ')).click()

  })

  it('Case 2: If access complete,then when logout it should logout success ', function() {
    linkAccount.get(1).click()
    linkSignout.click()
    expect(notifications.getText()).toEqual([ 'Logout Success! Thank you for using our services :)' ])
    //browser.sleep(5000)

  })

  it('Case 3: If email wrong but password correct,then it should not access complete', function() {
   
    linkAccount.get(1).click()
    linkSignin.click()
    expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/login')
    Login('nititest2@hotmail.com','12345678')
    loginButton.click()
    //expect(notifications.getText()).toEqual([ 'Oh snap! username or password is incorrent.' ])
    expect(notifications.count()).toEqual(1)
  })

  it('Case 4: If email correct but password wrong,then it should not access complete', function() {
    linkAccount.get(1).click()
    linkSignin.click()
    expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/login')
    Login('nara@gmail.com','wrong123')
    loginButton.click()
    //expect(notifications.getText()).toEqual([ 'Oh snap! username or password is incorrent.' ])
    expect(notifications.count()).toEqual(1)
  })

  it('Case 5: If email and password wrong,then it should not access complete', function() {
    linkAccount.get(1).click()
    linkSignin.click()
    expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/login')
    Login('nititest2@hotmail.com','wrong123')
    loginButton.click()
    //expect(notifications.getText()).toEqual([ 'Oh snap! username or password is incorrent.' ])
    expect(notifications.count()).toEqual(1)
  })

  it('Case 6: If email and password wrong,then it should not access complete(Sign in button do not show)', function() {
    linkAccount.get(1).click()
    linkSignin.click()
    expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/login')
    Login('nititest2555','wrong123')
    loginButton.click()
    expect(loginButton.getAttribute('disabled')).toBe(null)
    //expect(notifications.getText()).toEqual([ 'Oh snap! username or password is incorrent.' ])
    expect(notifications.count()).toEqual(1)
  })

  it('Case 7: If no fill email and password,then it should not access complete(Sign in button do not show)', function() {
    linkAccount.get(1).click()
    linkSignin.click()
    expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/login')
    Login('','')
    expect(loginButton.getAttribute('disabled')).toBe('true')
  })

  it('Case 8: If just put only email ,then it should not access complete(Sign in button do not show)', function() {
    linkAccount.get(1).click()
    linkSignin.click()
    expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/login')
    email.sendKeys('testkong')
    expect(loginButton.getAttribute('disabled')).toBe('true')
  })

  it('Case 9: If just put only password ,then it should not access complete(Sign in button do not show)', function() {
    linkAccount.get(1).click()
    linkSignin.click()
    expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/login')
    password.sendKeys('testkong')
    expect(loginButton.getAttribute('disabled')).toBe('true')
  })

})


