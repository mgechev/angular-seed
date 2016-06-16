import { provideRouter, RouterConfig } from '@angular/router';

import { AboutComponent } from './+about/index';
import { HomeComponent } from './+home/index';

const routes: RouterConfig = [
  {
    path: '/',
    component: HomeComponent
  },
  {
    path: '/about',
    component: AboutComponent
  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
];
