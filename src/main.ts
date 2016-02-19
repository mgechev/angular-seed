import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from './app/app.component';
import {Store} from './store/store';

import {HTTP_PROVIDERS} from 'angular2/http';

bootstrap(AppComponent, [Store,HTTP_PROVIDERS]);
