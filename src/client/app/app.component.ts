import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Routes, Router } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';

import { AboutComponent } from './+about/index';
import { HomeComponent } from './home/index';
import { NameListService, NavbarComponent, ToolbarComponent } from './shared/index';

import { LoginComponent } from './login/index';
import { LoginService } from './shared/services/login.service';
import { Error400Component,Error500Component } from './errorPages/index';

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, AboutComponent).
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  viewProviders: [NameListService, HTTP_PROVIDERS],
  templateUrl: 'app.component.html',
  directives: [ROUTER_DIRECTIVES, NavbarComponent, ToolbarComponent],
  providers: [
    LoginService
  ]
})
@Routes([
  { path: '/App', component: HomeComponent },
  { path: '/about', component: AboutComponent },
  { path: '/Login', component: LoginComponent },
  { path: '/404', component: Error400Component },
  { path: '/500', component: Error500Component }
])
/**
 * This class represents the main application component.
 * Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy
 * loaded components (HomeComponent, AboutComponent).
 */
export class AppComponent implements OnInit {
  constructor(private _router: Router, private _loginService: LoginService) {
  }

  ngOnInit() {
    if (this._loginService.isAuthenticated()) {
      this.getLoggedInUserPermission();
    } else {
      this._router.navigate(['/Login']);
    }
  }

  getLoggedInUserPermission(): void {
    this._loginService.getLoggedInUserPermission()
      .subscribe(
      results => {
        this._router.navigate(['/App']);
      });
  }
}
