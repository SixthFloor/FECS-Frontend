var HtmlReporter = require('protractor-html-screenshot-reporter')

exports.config = {

<<<<<<< HEAD
  specs: ['protractor_test/test_ViewFurnitureCategory.js'],
=======
  specs: ['protractor_test/in-progress/test_ViewFurnitureCategory.js'],
>>>>>>> 16a6fa4d3f466f17199d25b25e419d51f178797e

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
    jasmine.getEnv().addReporter(new HtmlReporter({
         baseDirectory: 'reports/',
         takeScreenShotsOnlyForFailedSpecs: true,
         docTitle: 'Test Report',
         preserveDirectory: true,
         docName: 'report.html'
      }))
  }
}
