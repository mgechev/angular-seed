import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Routes } from '@angular/router';
import { HTTP_PROVIDERS} from '@angular/http';

import { HomeComponent } from './+home/index';
import { AboutComponent } from './+about/index';
import { NameListService, NavbarComponent, ToolbarComponent } from './shared/index';
import { componentProxyFactory } from './component_proxy_factory';

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the components (HomeComponent, AboutComponent) and the lazy loaded
 * component (LazyComponent).
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  viewProviders: [NameListService, HTTP_PROVIDERS],
  templateUrl: 'app.component.html',
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
  },
  {
    path: '/lazy',
    component: componentProxyFactory({
      path: 'js/lazy.js',
      module: 'app/modules/+lazy/lazy.component',
      provide: m => m.LazyComponent
    })
  }
])
export class AppComponent {}
