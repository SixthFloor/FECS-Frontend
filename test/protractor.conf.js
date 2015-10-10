exports.config = {
  allScriptsTimeout: 4000,

  specs: ['protractor_test/*.js'],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:8000/app/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 4000
  }
}
