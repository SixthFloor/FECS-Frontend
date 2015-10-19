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
  var afterLogin = element(by.css('[ng-if="accessToken != false"]'))
  var closeHiden = element(by.css('[aria-hidden]="true"'))
  var notify = $('.cg-notify-message')
  // var notifyButton = $('.cg-notify-close')

  function Login(a,b) {
    //browser.get('http://localhost:3030/#');
    email.sendKeys(a)
    password.sendKeys(b)
  }

  beforeEach(function() {
    browser.get('http://localhost:3030/#')
  })

  /*afterEach(function() {
    browser.manage().logs().get('browser').then(function(browserLog) {
      console.log('log: ' + require('util').inspect(browserLog));
    });
  });*/

  it('Case1: If email and password correct,then it should access complete', function() {
    linkSignin.click()
    Login('nititest@hotmail.com','nititest')
    expect(loginButton.getAttribute('disabled')).toBe(null)
    loginButton.click()
    browser.sleep(2500)
    browser.driver.executeScript("$('.cg-notify-message').remove();")
    browser.waitForAngular()
    expect(linkSignout.getText()).toEqual('Sign out')
    linkSignout.click()
  })

  it('Case2: If email wrong but password correct,then it should not access complete', function() {
    linkSignin.click()
    Login('nititest2@hotmail.com','nititest')
    expect(loginButton.getAttribute('disabled')).toBe(null)
    loginButton.click()
    browser.sleep(10000)
    browser.waitForAngular()
    linkHome.click()
  })

  it('Case3: If email correct but password wrong,then it should not access complete', function() {
    linkSignin.click()
    Login('nititest@hotmail.com','nititest2')
    expect(loginButton.getAttribute('disabled')).toBe(null)
    loginButton.click()
    browser.sleep(10000)
    browser.waitForAngular()
    linkHome.click()
  })

  it('Case4: If email and password wrong,then it should not access complete', function() {
    linkSignin.click()
    Login('nititest2@hotmail.com','nititest2')
    expect(loginButton.getAttribute('disabled')).toBe(null)
    loginButton.click()
    browser.sleep(10000)
    browser.waitForAngular()
    linkHome.click()
  })

  it('Case5: If email and password wrong,then it should not access complete(Sign in button do not show)', function() {
    linkSignin.click()
    Login('nititest','nititest2')
    expect(loginButton.getAttribute('disabled')).toBe('true')
    linkHome.click()
  })

  it('Case6: If no fill email and password,then it should not access complete(Sign in button do not show)', function() {
    linkSignin.click()
    Login('','')
    expect(loginButton.getAttribute('disabled')).toBe('true')
    linkHome.click()
  })
  
})


