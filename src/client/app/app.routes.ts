import { provideRouter, RouterConfig } from '@angular/router';

import { AboutRoutes } from './+about/index';
import { HomeRoutes } from './+home/index';
import { VatRoutes } from "./+vat/components/vat.routes";
import {LoginRoutes} from "./+login/components/login.routes";

const routes: RouterConfig = [
  ...HomeRoutes,
  ...AboutRoutes,
  ...VatRoutes,
  ...LoginRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
];
