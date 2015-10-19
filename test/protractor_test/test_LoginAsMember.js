/* global describe */
/* global it */
/* global browser */
/* global element */
/* global by */
/* global expect */
/* global beforeEach */
describe('Login as member', function() {

  var linkSignin =  element(by.css('[ui-sref="login"]'))
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
    linkSignin.click()
    expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/login')
    Login('nititest@hotmail.com','nititest')
    expect(loginButton.getAttribute('disabled')).toBe(null)
    loginButton.click()
    browser.sleep(5000)
    expect(notifications.getText()).toEqual([ 'Well done! Login successfully.' ])
  })

  it('Case 2: If access complete,then when logout it should logout success ', function() {
    expect(linkSignout.getText()).toEqual('Sign out')
    linkSignout.click()
    browser.sleep(5000)
    expect(notifications.getText()).toEqual([ 'Logout Success! Thank you for using our services :)' ])
  })

  it('Case 3: If email wrong but password correct,then it should not access complete', function() {
    linkSignin.click()
    expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/login')
    Login('nititest2@hotmail.com','nititest')
    expect(loginButton.getAttribute('disabled')).toBe(null)
    loginButton.click()
    browser.sleep(5000)
    expect(notifications.getText()).toEqual([ 'Oh snap! username or password is invalid.' ])
  })

  it('Case 4: If email correct but password wrong,then it should not access complete', function() {
    linkSignin.click()
    expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/login')
    Login('nititest@hotmail.com','nititest2')
    expect(loginButton.getAttribute('disabled')).toBe(null)
    loginButton.click()
    browser.sleep(5000)
    expect(notifications.getText()).toEqual([ 'Oh snap! username or password is invalid.' ])
  })

  it('Case 5: If email and password wrong,then it should not access complete', function() {
    linkSignin.click()
    expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/login')
    Login('nititest2@hotmail.com','nititest2')
    expect(loginButton.getAttribute('disabled')).toBe(null)
    loginButton.click()
    browser.sleep(5000)
    expect(notifications.getText()).toEqual([ 'Oh snap! username or password is invalid.' ])
  })

  it('Case 6: If email and password wrong,then it should not access complete(Sign in button do not show)', function() {
    linkSignin.click()
    expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/login')
    Login('nititest','nititest2')
    expect(loginButton.getAttribute('disabled')).toBe('true')
  })

  it('Case 7: If no fill email and password,then it should not access complete(Sign in button do not show)', function() {
    linkSignin.click()
    expect(browser.getCurrentUrl()).toBe('http://localhost:3030/#/login')
    Login('','')
    expect(loginButton.getAttribute('disabled')).toBe('true')
  })

})


