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

  multicapabilities: [{
    browserName: 'chrome'
  }],

  onPrepare: function () {
    browser.ignoreSynchronization = false;
  },

};

if (process.env.TRAVIS) {
  config.multicapabilities.push({
    browserName: 'firefox'
  });
  // https://github.com/angular/protractor/issues/4253
}

exports.config = config;
