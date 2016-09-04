import { provideRouter, RouterConfig } from '@angular/router';

import { AboutRoutes } from './+about/index';
import { HomeRoutes } from './+home/index';
import { PeopleRoutes } from './+people/index';

const routes: RouterConfig = [
  ...HomeRoutes,
  ...AboutRoutes,
  ...PeopleRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
];
