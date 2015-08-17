System.config({
  baseURL: '<%= APP_BASE %>',
  paths: {'*': '*.js?v=<%= VERSION %>'}
});

// Patching System.js
System['import'] = function (name:string, options:any):any {
  return System.originalSystem.import.call(this, name, options).then(function(module) {
    return module;
  });
};

// Dirty workaround in order to load angular2/router properly
System.import('angular2/router').then(m => {
  System.defined['angular2/router'] = { normalizedDeps: [] };
  System.defined['angular2/router'].module = {};
  System.defined['angular2/router'].module.exports = m;
});


System.import('app')
  .catch(e => console.error(e,
    'Report this error at https://github.com/mgechev/angular2-seed/issues'));
