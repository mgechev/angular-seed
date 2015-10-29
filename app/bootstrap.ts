import {bind, bootstrap} from 'angular2/angular2';
import {ROUTER_PROVIDERS, ROUTER_PRIMARY_COMPONENT} from 'angular2/router';
import {AppCmp} from './components/app/app';

bootstrap(AppCmp, [
  ROUTER_PROVIDERS,
  bind(ROUTER_PRIMARY_COMPONENT).toValue(AppCmp)
]);
