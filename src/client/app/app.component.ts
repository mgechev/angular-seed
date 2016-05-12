import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Routes } from '@angular/router';
import { COMMON_DIRECTIVES } from '@angular/common';

import { AboutComponent } from './+about/index';
import { HomeComponent } from './+home/index';
import { NameListService, NavbarComponent, ToolbarComponent } from './shared/index';

@Component({
  selector: 'sd-app',
  viewProviders: [NameListService],
  templateUrl: 'app.component.html',
  directives: [COMMON_DIRECTIVES, ROUTER_DIRECTIVES, NavbarComponent, ToolbarComponent]
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
