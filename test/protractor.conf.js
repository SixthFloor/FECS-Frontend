exports.config = {
  allScriptsTimeout: 11000,

  specs: ['protractor_test/*.js'],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:8000/app/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
}
