/* global describe */
/* global it */
/* global browser */
/* global element */
/* global by */
/* global expect */
/* global beforeEach */
describe('Test Login', function() {

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

  function testCases() {
    case1()
    case2()
    case3()
    case4()
    case5()
    case6()
  }
  //Case 1 is email and password correct
  function case1(){
    browser.isElementPresent(linkSignin).then(linkSignin.click())
    // linkSignin.click()
    Login('nititest@hotmail.com','nititest')
    expect(loginButton.getAttribute('disabled')).toBe(null)
    loginButton.click()
    browser.sleep(2500)
    browser.driver.executeScript("$('.cg-notify-message').remove();")
    browser.waitForAngular()
    expect(linkSignout.getText()).toEqual('Sign out')
    linkSignout.click()
  }
  //Case 2 is email wrong but password correct
  function case2(){
    linkSignin.click()
    Login('nititest2@hotmail.com','nititest')
    expect(loginButton.getAttribute('disabled')).toBe(null)
    loginButton.click()
    browser.sleep(10000)
    browser.waitForAngular()
    linkHome.click()
  }
  //Case 3 is email correct but password wrong
  function case3(){
    linkSignin.click()
    Login('nititest@hotmail.com','nititest2')
    expect(loginButton.getAttribute('disabled')).toBe(null)
    loginButton.click()
    browser.sleep(10000)
    browser.waitForAngular()
    linkHome.click()
  }
  //Case 4 is email and password wrong
  function case4(){
    linkSignin.click()
    Login('nititest2@hotmail.com','nititest2')
    expect(loginButton.getAttribute('disabled')).toBe(null)
    loginButton.click()
    browser.sleep(10000)
    browser.waitForAngular()
    linkHome.click()
  }
  //Case 5 is email not in format
  function case5(){
    linkSignin.click()
    Login('nititest','nititest2')
    expect(loginButton.getAttribute('disabled')).toBe('true')
    linkHome.click()
  }
  //Case 6 is no fill email and password
  function case6(){
    linkSignin.click()
    Login('','')
    expect(loginButton.getAttribute('disabled')).toBe('true')
    linkHome.click()
  }

  beforeEach(function() {
    browser.get('http://localhost:3030/#')
  })

  /*afterEach(function() {
    browser.manage().logs().get('browser').then(function(browserLog) {
      console.log('log: ' + require('util').inspect(browserLog));
    });
  });*/

  it('should no wrong', function() {
    testCases();
  })

})
