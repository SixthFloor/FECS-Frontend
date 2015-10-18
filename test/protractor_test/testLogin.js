/* global describe */
/* global it */
/* global browser */
/* global element */
/* global by */
/* global expect */
/* global beforeEach */
describe('sendKey to login', function() {

  var linkSignin =  element(by.css('[ui-sref="login"]'))
  var linkSignout = element(by.css('[ui-sref="logout"]'))
  var email = element(by.model('loginCtrl.data.email'))
  var password = element(by.model('loginCtrl.data.pwd'))
  var loginButton = element(by.buttonText('Sign in'))
  var afterLogin = element(by.css('[ng-if="accessToken != false"]'))
  var closeHiden = element(by.css('[aria-hidden]="true"'))
  var notify = $('.cg-notify-message')
  var notifyButton = $('.cg-notify-close')

  function Login(a,b) {
    //browser.get('http://localhost:3030/#');
    email.sendKeys(a)
    password.sendKeys(b)
  }

  function testCases() {
    case1()
    // case2()
  }

  function case1(){
    browser.isElementPresent(linkSignin).then(linkSignin.click())
    // linkSignin.click()
    Login('nititest@hotmail.com','nititest')
    loginButton.click()
    browser.sleep(2500)
    browser.driver.executeScript("$('.cg-notify-message').remove();")
    
    
    
    //browser.ignoreSynchronization = true
    //expect(notify.getText()).toEqual('Sign out')
    //browser.ignoreSynchronization = false
    browser.isElementPresent(linkSignout).then(linkSignout.click())
    // linkSignout.click()
  }

  // function case2(){
  //   linkSignin.click()
  //   Login('nititest2@hotmail.com','nititest')
  //   loginButton.click()
  //   browser.sleep(10000)
  //   browser.waitForAngular()
  //   //closeHiden.click()
  //   //expect(afterLogin.getText()).toEqual('Welcome to the FECS Sign out')
  //   //linkSignout.click()
  // }

  function case3(){
    
  }

  function case4(){
    
  }


  beforeEach(function() {
    browser.get('http://localhost:3030/#')
  });

  /*afterEach(function() {
    browser.manage().logs().get('browser').then(function(browserLog) {
      console.log('log: ' + require('util').inspect(browserLog));
    });
  });*/

  it('should no wrong', function() {
    testCases();
  });

});