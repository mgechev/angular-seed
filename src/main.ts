import {provide, enableProdMode} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, APP_BASE_HREF} from 'angular2/router';
import {AppComponent} from './app/components/app.component';
// // Test to add external dependency
// import {Http, HTTP_PROVIDERS} from 'angular2/http';
// import {AuthHttp, AuthConfig} from 'angular2-jwt';
// End ot test

if ('<%= ENV %>' === 'prod') { enableProdMode(); }

bootstrap(AppComponent, [
  ROUTER_PROVIDERS, // HTTP_PROVIDERS, // add to test the addition of extenrnal dependency
  // provide(APP_BASE_HREF, { useValue: '<%= APP_BASE %>' }),
  // provide(AuthHttp, { //add to test the addition of external dependency
  //   useFactory: (http: Http) => {
  //     return new AuthHttp(new AuthConfig(), http);
  //   },
  //   deps: [Http]
  // }),
]);

// In order to start the Service Worker located at "./sw.js"
// uncomment this line. More about Service Workers here
// https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
// if ('serviceWorker' in navigator) {
//   (<any>navigator).serviceWorker.register('./sw.js').then(function(registration) {
//     console.log('ServiceWorker registration successful with scope: ',    registration.scope);
//   }).catch(function(err) {
//     console.log('ServiceWorker registration failed: ', err);
//   });
// }
