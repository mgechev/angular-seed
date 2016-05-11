import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Routes } from '@angular/router';

import { AboutComponent } from './+about';
import { HomeComponent } from './+home';
import { NameListService, NavbarComponent, ToolbarComponent } from './shared';

@Component({
  selector: 'sd-app',
  viewProviders: [NameListService],
  templateUrl: 'app/components/app.component.html',
  directives: [ROUTER_DIRECTIVES, NavbarComponent, ToolbarComponent]
})
@Routes([
  {
    path: '/',
    component: HomeComponent
  },
  {
    path: '/about',
    component: AboutComponent
  }
])
export class AppComponent {}
