// Load our SystemJS configuration.
System.config({
  baseURL: '/base/',
  paths: {
    rxjs: 'node_modules/rxjs',
  },
  packages: {
    '': {
      defaultExtension: 'js'
    },
    'rxjs': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    'rxjs/ajax': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    'rxjs/operators': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    'rxjs/testing': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    'rxjs/webSocket': {
      main: 'index.js',
      defaultExtension: 'js'
    }
  }
});

