/// <reference path="../typings/custom.system.d.ts" />
System.config({
  paths: {'*': '*.js?v=<%= VERSION %>'}
});

// Ugly workaround of systemjs issue https://github.com/systemjs/systemjs/issues/487
(function () {
  var c = System.defined['angular2/core'];
  var i = c.deps.indexOf('angular2/src/core/compiler/interfaces');
  if (i >= 0) {
    c.deps[i] = 'angular2/src/core/zone/ng_zone';
  }
}());

System.import('./app')
  .catch(e => console.error(e,
    'Report this error at https://github.com/mgechev/angular2-seed/issues'));