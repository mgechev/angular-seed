System.config({
  defaultJSExtensions: true,
  baseURL: '<%= APP_BASE %>',
  paths: {
    'angular2/angular2': 'lib/angular2.js',
    'angular2/router': 'lib/router.js',
    '*': '*.js?v=<%= VERSION %>'
  },
  meta: {
    'angular2/angular2': { format: 'register', bundle: true },
    'angular2/router': { format: 'register' }
  }
});


System.import('app')
  .catch(e => console.error(e,
    'Report this error at https://github.com/mgechev/angular2-seed/issues'));
