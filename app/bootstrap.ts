import {bootstrap, provide} from 'angular2/angular2';
import {ROUTER_PROVIDERS, APP_BASE_HREF} from 'angular2/router';
import {AppCmp} from './components/app/app';

bootstrap(AppCmp, [
  ROUTER_PROVIDERS,
  // Will be replaced with placeholder for an environment variable
  provide(APP_BASE_HREF, {useValue: '/dist/dev'})
]);
