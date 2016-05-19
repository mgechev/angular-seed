const SpecReporter = require('jasmine-spec-reporter');

const config = {
  baseUrl: 'http://localhost:5555/',

  specs: [
    './dist/dev/**/*.e2e-spec.js'
  ],

  exclude: [],

  // 'jasmine' by default will use the latest jasmine framework
  framework: 'jasmine',

  // allScriptsTimeout: 110000,

  jasmineNodeOpts: {
    // showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    // defaultTimeoutInterval: 400000
  },

  directConnect: true,

  capabilities: {
    browserName: 'chrome'
  },

  onPrepare() {
    // add jasmine spec reporter
    jasmine.getEnv().addReporter(new SpecReporter({ displayStacktrace: true }));

    browser.ignoreSynchronization = false;
  },

  /**
   * Angular 2 configuration
   *
   * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
   * `rootEl`
   */
  useAllAngular2AppRoots: true
};

if (process.env.TRAVIS) {
  config.capabilities = {
    browserName: 'firefox'
  };
}

if (process.env.APPVEYOR) {
  config.capabilities = {
    browserName: 'internet explorer'
  };
}

exports.config = config;
