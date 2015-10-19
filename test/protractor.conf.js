//var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter')
//var HtmlReporter = require('protractor-html-screenshot-reporter')

exports.config = {
  // allScriptsTimeout: 4000,


  specs: ['protractor_test/test_RegisterAsMember.js'],

  capabilities: {
    'browserName': 'chrome',
  },

  baseUrl: 'http://localhost:8080/app/',

  jasmineNodeOpts: {
    // defaultTimeoutInterval: 60000
  },

  // onPrepare: function () {
  //   jasmine.getEnv().addReporter(new HtmlReporter({
  //        baseDirectory: 'test_reports/',
  //        takeScreenshotsOnlyOnFailures: true,
  //        docTitle: 'Test Beta',
  //        docName: 'test_beta.html'
  //     }))
  // }
}
