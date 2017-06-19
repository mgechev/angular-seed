const config = {
  baseUrl: 'http://localhost:5555/',

  specs: [
    './dist/e2e/**/*.e2e-spec.js'
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
    browserName: 'chrome',
    'chromeOptions': {
      'args': ['--no-sandbox', '--headless', '--disable-gpu', '--window-size=1280,720']
    }
  },

  onPrepare() {
    browser.ignoreSynchronization = false;
  }
};

exports.config = config;
