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
    rxjs: {
      defaultExtension: 'js'
    }
  }
});

