exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',

  specs: ['src/e2e/tests/*.spec.js'],

  capabilities: {
      browserName: 'chrome',
      chromeOptions: {
          args: [
              '--start-maximized'
              // '--headless'
          ]
      }
  }
};