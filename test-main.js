if (!Object.hasOwnProperty('name')) {
  Object.defineProperty(Function.prototype, 'name', {
    get: function () {
      var matches = this.toString().match(/^\s*function\s*(\S*)\s*\(/);
      var name = matches && matches.length > 1 ? matches[1] : "";
      Object.defineProperty(this, 'name', { value: name });
      return name;
    }
  });
}

// Turn on full stack traces in errors to help debugging
Error.stackTraceLimit = Infinity;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

// Cancel Karma's synchronous start,
// we will call `__karma__.start()` later, once all the specs are loaded.
__karma__.loaded = function () { };

Promise.all([
  System.import('@angular/core/testing'),
  System.import('@angular/platform-browser-dynamic/testing')
]).then(function (providers) {
  var testing = providers[0];
  var testingBrowser = providers[1];

  testing.TestBed.initTestEnvironment(
    testingBrowser.BrowserDynamicTestingModule,
    testingBrowser.platformBrowserDynamicTesting()
  );
}).then(function () {
  return Promise.all(
    Object.keys(window.__karma__.files) // All files served by Karma.
      .filter(onlySpecFiles)
      .map(file2moduleName)
      .map(function (path) {
        return System.import(path).then(function (module) {
          if (module.hasOwnProperty('main')) {
            module.main();
          } else {
            throw new Error('Module ' + path + ' does not implement main() method.');
          }
        });
      }));
})
  .then(function () {
    __karma__.start();
  }, function (error) {
    console.error(error.stack || error);
    __karma__.start();
  });

function onlySpecFiles(path) {
  // check for individual files, if not given, always matches to all
  var patternMatched = __karma__.config.files ?
    path.match(new RegExp(__karma__.config.files)) : true;

  return patternMatched && /[\.|_]spec\.js$/.test(path);
}

// Normalize paths to module names.
function file2moduleName(filePath) {
  return filePath.replace(/\\/g, '/')
    .replace(/^\/base\//, '')
    .replace(/\.js$/, '');
}

