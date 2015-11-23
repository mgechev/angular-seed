import {bootstrap, provide} from 'angular2/angular2';
import {ROUTER_PROVIDERS, APP_BASE_HREF} from 'angular2/router';
import {AppCmp} from './components/app/app';

bootstrap(AppCmp, [
  provide(APP_BASE_HREF, { useValue: '<%= APP_BASE + APP_DEST %>' } ),
  ROUTER_PROVIDERS
]);
