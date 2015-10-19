var HtmlReporter = require('protractor-html-screenshot-reporter')

exports.config = {
  allScriptsTimeout: 4000,


  specs: ['protractor_test/test_LoginAsMember.js', 
         'protractor_test/test_RegisterAsMember.js'],

  multiCapabilities: [{
    browserName: 'firefox'
  }, {
    browserName: 'chrome'
  }, {
    browserName: 'internet explorer'
  }]

  baseUrl: 'http://localhost:8080/app/',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 60000
  },

  onPrepare: function () {
    jasmine.getEnv().addReporter(new HtmlReporter({
         baseDirectory: 'test_reports/test_1_19-10-2015',
         takeScreenShotsOnlyForFailedSpecs: true,
         docTitle: 'Test 1: 19-10-2015',
         preserveDirectory: true,
         docName: 'test_result_1.html'
      }))
  }
}
