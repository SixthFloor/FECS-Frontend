var HtmlReporter = require('protractor-html-screenshot-reporter')

exports.config = {

  specs: ['protractor_test/test_LoginAsMember.js', 
         'protractor_test/test_RegisterAsMember.js'],

  multiCapabilities: [{
      browserName: 'firefox'
    }, {
      browserName: 'chrome'
    }
  ],

  baseUrl: 'http://localhost:8080/app/',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 60000
  },

  onPrepare: function () {
    jasmine.getEnv().addReporter(new HtmlReporter({
         baseDirectory: 'test_reports/test_2_20-10-2015',
         takeScreenShotsOnlyForFailedSpecs: true,
         docTitle: 'Test 2: 20-10-2015',
         preserveDirectory: true,
         docName: 'test_result_2.html'
      }))
  }
}
