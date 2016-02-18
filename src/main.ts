import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from './app/app.component';
import {Store} from './store/store';

import {HTTP_PROVIDERS} from 'angular2/http';
import {UsersService} from './services/users.service';

bootstrap(AppComponent, [Store,HTTP_PROVIDERS,UsersService]);
