var HtmlReporter = require('protractor-html-screenshot-reporter')

exports.config = {

<<<<<<< HEAD
  specs: ['protractor_test/test_RegisterAsMember.js'],
=======
  specs: ['protractor_test/test_ViewFurniture.js'],
>>>>>>> a3959e37da49e21f4f82551bcb28a562b5765244

  multiCapabilities: [{
      // browserName: 'firefox'
    }, {
      browserName: 'chrome'
    }
  ],

  baseUrl: 'http://localhost:8080/app/',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 60000
  },

  // onPrepare: function () {
  //   jasmine.getEnv().addReporter(new HtmlReporter({
  //        baseDirectory: 'reports/',
  //        takeScreenShotsOnlyForFailedSpecs: true,
  //        docTitle: 'Test Report',
  //        preserveDirectory: true,
  //        docName: 'report.html'
  //     }))
  // }
}
