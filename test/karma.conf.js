module.exports = function (config) {
  config.set({
    basePath: '../',

    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'src/js/**/*.js',
      'test/unit/*.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome', 'Chrome_without_security', 'Firefox'],

    customLaunchers: {
      Chrome_without_security: {
        base: 'Chrome',
        flags: ['--disable-web-security']
      }
    },

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine'
    ],

    junitReporter: {
      outputFile: 'test/output/unit.xml',
      suite: 'unit'
    }

  })
}
