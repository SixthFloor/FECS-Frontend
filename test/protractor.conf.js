var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter')

exports.config = {
  allScriptsTimeout: 4000,

  specs: ['protractor_test/*.js'],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:8080/app/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 4000
  },

  onPrepare: function () {
    jasmine.getEnv().addReporter(
      new Jasmine2HtmlReporter({
        savePath: './test/reports/',
        screenshotsFolder: 'images',
        takeScreenshotsOnlyOnFailures: true
      })
    )
  }
}
