import { Routes } from '@angular/router';

import { AboutRoutes } from './about/index';
import { HomeRoutes } from './home/index';
import { LoginComponent } from './login/index';
import { Error400Component, Error500Component } from './errorPages/index';

export const routes: Routes = [
  { path: '/Login', component: LoginComponent },
  { path: '/404', component: Error400Component },
  { path: '/500', component: Error500Component },
  ...HomeRoutes,
  ...AboutRoutes
];
