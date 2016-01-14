/// <reference path="../tools/typings/tsd/systemjs/systemjs.d.ts"/>

import {provide} from 'angular2/core';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {AppCmp} from './app/components/app';

System.import('//localhost:<%= HOT_LOADER_PORT %>/ng2-hot-loader')
  .then(loader => {
    loader.ng2HotLoaderBootstrap(AppCmp, [
      ROUTER_PROVIDERS,
      provide(LocationStrategy, { useClass: HashLocationStrategy })
    ]);
  });
