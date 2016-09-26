//<<<<<<< HEAD 26 sep
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { enableProdMode, provide } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
//import { ROUTER_PROVIDERS } from '@angular/router';
import { CommonService } from './shared/services/common.service';
import { AuthHttp } from './shared/services/authHttp.service';

import { APP_ROUTER_PROVIDERS } from './app.routes';
import { AppComponent } from './app.component';
import { HTTP_PROVIDERS } from '@angular/http';
import {ToastOptions} from  'ng2-toastr/ng2-toastr';

// The browser platform with a compiler
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// The app module
import { AppModule } from './app.module';

if (String('<%= ENV %>') === 'prod') { enableProdMode(); }

// Compile and launch the module
platformBrowserDynamic().bootstrapModule(AppModule);

// =======26 sep
// >>>>>>> eb8c13ee984e8a813ed6f6b8c4bf68dba52a49ec
/**
 * Bootstraps the application and makes the ROUTER_PROVIDERS and the APP_BASE_HREF available to it.
 * @see https://angular.io/docs/ts/latest/api/platform-browser-dynamic/index/bootstrap-function.html
 */
//<<<<<<< HEAD 26 sep
let toastoptions = {
  positionClass: 'toast-bottom-right',
};

bootstrap(AppComponent, [
  //<<<<<<< HEAD
  //ROUTER_PROVIDERS,
  AuthHttp,
  HTTP_PROVIDERS,
  CommonService,
  //provide(APP_BASE_HREF, { useValue: '<%= APP_BASE %>' }),
  //provide(LocationStrategy, { useClass: HashLocationStrategy }),
  //provide(ToastOptions, { useValue: new ToastOptions(toastoptions) }),
  //=======
  disableDeprecatedForms(),
  provideForms(),
  APP_ROUTER_PROVIDERS,
  { provide: APP_BASE_HREF, useValue: '<%= APP_BASE %>' },
  { provide: LocationStrategy, useClass: HashLocationStrategy },
  { provide: ToastOptions, useValue: new ToastOptions(toastoptions) }
  //>>>>>>> 80ccc9aadc3699bf89f1be2216ccfe1d91fa9bf5
]);
/*======= 26 sep
import { enableProdMode } from '@angular/core';
// The browser platform with a compiler
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// The app module
import { AppModule } from './app.module';

if (String('<%= ENV %>') === 'prod') { enableProdMode(); }

// Compile and launch the module
platformBrowserDynamic().bootstrapModule(AppModule);
>>>>>>> eb8c13ee984e8a813ed6f6b8c4bf68dba52a49ec*/

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
