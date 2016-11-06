import { Routes } from '@angular/router';

import { AboutRoutes } from './about/index';
import { HomeRoutes } from './home/index';
import { VatRoutes } from "./vat/components/vat.routes";
import {LoginRoutes} from "./+login/components/login.routes";
import {CostRoutes} from "./cost/components/cost.routes";

export const routes: Routes = [
  ...HomeRoutes,
  ...AboutRoutes,
  ...VatRoutes,
  ...CostRoutes,
  ...LoginRoutes
];
