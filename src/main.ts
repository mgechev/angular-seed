import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from './app/app.component';
import {Store} from './store/store';

import {HTTP_PROVIDERS} from 'angular2/http';
import {BACKEND_PROVIDERS} from './app/shared/stubs/services';

bootstrap(AppComponent, [
  Store,
  HTTP_PROVIDERS,
  BACKEND_PROVIDERS
]);
