// Heavily inspired/copied by/from https://github.com/angular/angular/blob/master/test-main.js

// Tun on full stack traces in errors to help debugging
Error.stackTraceLimit=Infinity;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 100;

// Cancel Karma's synchronous start,
// we will call `__karma__.start()` later, once all the specs are loaded.
__karma__.loaded = function() {};

System.baseURL = '/base/';

// So that we can import packages like `core/foo`, instead of `core/src/foo`.
System.paths = {
  '*': '*.js',
  'angular2/angular2': 'test/lib/angular2.js',
  'angular2/router': 'test/lib/router.js'
};

Promise.all(
  Object.keys(window.__karma__.files) // All files served by Karma.
  .filter(onlySpecFiles)
  .map(file2moduleName)
  .map(function(path) {
    return System.import(path).then(function(module) {
      if (module.hasOwnProperty('main')) {
        module.main();
      } else {
        throw new Error('Module ' + path + ' does not implement main() method.');
      }
    });
  }))
.then(function() {
  __karma__.start();
}, function(error) {
  console.error(error.stack || error);
  __karma__.start();
});


function onlySpecFiles(path) {
  return /_spec\.js$/.test(path);
}

// Normalize paths to module names.
function file2moduleName(filePath) {
  var name = filePath.replace(/\\/g, '/')
    // make valid module name
    .replace(/^\/base\//, '')
    .replace(/\.js/, '');
  return name;
}
