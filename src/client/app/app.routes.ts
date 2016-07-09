import { provideRouter, RouterConfig } from '@angular/router';

import { AboutRoutes } from './+about/index';
import { HomeRoutes } from './+home/index';

const routes: RouterConfig = [
  ...HomeRoutes,
  ...AboutRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
];
