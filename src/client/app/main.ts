import {coreBootstrap, ReflectiveInjector, enableProdMode, provide} from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { ROUTER_PROVIDERS } from '@angular/router';
import {browserPlatform, BROWSER_APP_STATIC_PROVIDERS} from '@angular/platform-browser';
import {AppComponentNgFactory} from './app.component.ngfactory';

if ('<%= ENV %>' === 'prod') { enableProdMode(); }

const appInjector = ReflectiveInjector.resolveAndCreate([
    BROWSER_APP_STATIC_PROVIDERS,
    ROUTER_PROVIDERS,
    provide(APP_BASE_HREF, { useValue: '<%= APP_BASE %>' })
  ], browserPlatform().injector);
coreBootstrap(appInjector, AppComponentNgFactory);

// In order to start the Service Worker located at "./worker.js"
// uncomment this line. More about Service Workers here
// https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
//
// if ('serviceWorker' in navigator) {
//   (<any>navigator).serviceWorker.register('./worker.js').then((registration: any) =>
//       console.log('ServiceWorker registration successful with scope: ', registration.scope))
//     .catch((err: any) =>
//       console.log('ServiceWorker registration failed: ', err));
// }
