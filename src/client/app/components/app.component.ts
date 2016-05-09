import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Routes } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { ToolbarComponent } from './toolbar.component';
import { NameListService } from '../shared/index';
import { HomeComponent } from '../+home/index';
import { AboutComponent } from '../+about/index';

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
