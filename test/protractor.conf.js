var HtmlReporter = require('protractor-html-screenshot-reporter')

exports.config = {

<<<<<<< HEAD
  
  specs: ['protractor_test/test_AddProductToCart.js'],

  capabilities: { 
    browserName: 'chrome'
  },

  // multiCapabilities: [{
  //     browserName: 'firefox'
  //   }, {
  //     browserName: 'chrome'
  // }],

  // baseUrl: 'http://localhost:8080/app/',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 180000
  },

  onPrepare: function () {
    browser.manage().window().setSize(1600, 1000)
    jasmine.getEnv().addReporter(new HtmlReporter({
         baseDirectory: './reports',
         takeScreenShotsOnlyForFailedSpecs: true,
         docTitle: 'Test Report',
         docName: 'report.html'
      }))
  }
}
