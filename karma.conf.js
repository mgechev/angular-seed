// Karma configuration
// Generated on Wed Jul 15 2015 09:44:02 GMT+0200 (Romance Daylight Time)
'use strict';

var argv = require('yargs').argv;
var minimatch = require('minimatch');

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      // Polyfills.
      'node_modules/core-js/client/shim.min.js',
      'node_modules/intl/dist/Intl.min.js',

      'node_modules/traceur/bin/traceur.js',

      // System.js for module loading
      'node_modules/systemjs/dist/system.src.js',

      // Zone.js dependencies
      'node_modules/zone.js/dist/zone.js',
      'node_modules/zone.js/dist/long-stack-trace-zone.js',
      'node_modules/zone.js/dist/proxy.js',
      'node_modules/zone.js/dist/async-test.js',
      'node_modules/zone.js/dist/fake-async-test.js',
      'node_modules/zone.js/dist/sync-test.js',
      'node_modules/zone.js/dist/jasmine-patch.js',

      // RxJs.
      'node_modules/.tmp/Rx.min.js',
      { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: false },

      // paths loaded via module imports
      // Angular itself
      { pattern: 'node_modules/@angular/**/*.js', included: false, watched: true },
      { pattern: 'node_modules/@angular/**/*.js.map', included: false, watched: false },

      'test-config.js',
      { pattern: 'dist/dev/system-config.js', watched: true, included: true },

      { pattern: 'dist/dev/**/*.js', included: false, watched: true },
      { pattern: 'dist/dev/**/*.html', included: false, watched: true, served: true },
      { pattern: 'dist/dev/**/*.css', included: false, watched: true, served: true },

      // suppress annoying 404 warnings for resources, images, etc.
      { pattern: 'dist/dev/assets/**/*', watched: false, included: false, served: true },

      // Test dependencies for HttpClient
      { pattern: 'node_modules/tslib/**/*.js', included: false, watched: true },

      'test-main.js'
    ],

    // must go along with above, suppress annoying 404 warnings.
    proxies: {
      '/assets/': '/base/dist/dev/assets/'
    },

    // list of files to exclude
    exclude: ['node_modules/**/*spec.js'],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Passing command line arguments to tests
    client: {
      files: argv.files ? minimatch.makeRe(argv.files).source : null
    }
  });

  if (process.env.APPVEYOR) {
    config.browsers = ['IE'];
    config.singleRun = true;
    config.browserNoActivityTimeout = 90000; // Note: default value (10000) is not enough
  }

  if (process.env.TRAVIS || process.env.CIRCLECI) {
    config.browsers = ['Chrome_travis_ci'];
    config.singleRun = true;
    config.browserNoActivityTimeout = 90000;
  }
};
