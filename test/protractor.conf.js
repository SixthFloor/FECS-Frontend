var HtmlReporter = require('protractor-html-screenshot-reporter')

exports.config = {

  specs: ['protractor_test/test_RegisterAsMember.js'],

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
         baseDirectory: 'reports/',
         takeScreenShotsOnlyForFailedSpecs: true,
         docTitle: 'Test Report',
         preserveDirectory: true,
         docName: 'report.html'
      }))
  }
}
