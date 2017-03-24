/**
 * Bootstraps the application and makes the ROUTER_PROVIDERS and the APP_BASE_HREF available to it.
 * @see https://angular.io/docs/ts/latest/api/platform-browser-dynamic/index/bootstrap-function.html
 */
import { enableProdMode } from '@angular/core';
// The browser platform with a compiler
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// Load i18n providers
// import { TranslationProviders } from './i18n.providers';

// The app module
import { AppModule } from './app.module';

if (String('<%= BUILD_TYPE %>') === 'prod') { enableProdMode(); }

// Compile and launch the module with i18n providers
// let TP = new TranslationProviders();
// TP.getTranslationFile().then((providers: any) => {
  // const options: any = { providers };
  platformBrowserDynamic().bootstrapModule(AppModule/*, options*/);
// });

// In order to start the Service Worker located at "/worker-basic.[min.]js"
// uncomment this line. More about Service Workers here
// https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
//
// if ('serviceWorker' in navigator) {
//   let workerScript = '/worker-basic';
//   if (String('<%= BUILD_TYPE %>') === 'prod') { workerScript = workerScript + '.min'; }
//   workerScript = workerScript + '.js';
//   (<any>navigator).serviceWorker.register(workerScript).then((registration: any) =>
//       console.log('ServiceWorker registration successful with scope: ', registration.scope))
//     .catch((err: any) =>
//       console.log('ServiceWorker registration failed: ', err));
// }
