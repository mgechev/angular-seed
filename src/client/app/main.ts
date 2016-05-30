import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { enableProdMode, provide } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router';
import { CommonService } from './shared/services/common.service';
import { AuthHttp } from './shared/services/authHttp.service';
import { AppComponent } from './app.component';
import { HTTP_PROVIDERS } from '@angular/http';
 import {ToastOptions} from  'ng2-toastr/ng2-toastr';

if ('<%= ENV %>' === 'prod') { enableProdMode(); }

/**
 * Bootstraps the application and makes the ROUTER_PROVIDERS and the APP_BASE_HREF available to it.
 * @see https://angular.io/docs/ts/latest/api/platform-browser-dynamic/index/bootstrap-function.html
 */
let toastoptions = {
      positionClass: 'toast-bottom-right',
    };

bootstrap(AppComponent, [
  ROUTER_PROVIDERS,
  AuthHttp,
  HTTP_PROVIDERS,
  CommonService,
  provide(APP_BASE_HREF, { useValue: '<%= APP_BASE %>' }),
  provide(LocationStrategy, { useClass: HashLocationStrategy }),
  provide(ToastOptions, { useValue: new ToastOptions(toastoptions)}),
]);

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
