//var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter')
var HtmlReporter = require('protractor-html-screenshot-reporter')

exports.config = {
  allScriptsTimeout: 4000,


  specs: ['protractor_test/testLogin.js'],

  capabilities: {
    'browserName': 'internet explorer'
  },
  /*multiCapabilities: [{
    browserName: 'firefox'
  }, {
    browserName: 'chrome'
  }],*/

  baseUrl: 'http://localhost:8080/app/',

  // framework: 'jasmine2',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 60000
  },

  onPrepare: function () {
    // jasmine.getEnv().addReporter(
    //   new HtmlReporter({
    //     savePath: './test/reports/',
    //     baseDirectory: 'images',
    //     takeScreenshotsOnlyOnFailures: true
    //   })
    // )
  jasmine.getEnv().addReporter(new HtmlReporter({
         baseDirectory: './test/reports/'
      }))
  }
}
