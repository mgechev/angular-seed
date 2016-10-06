// <<<<<<< HEAD 26 sep
//<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
//import { ROUTER_DIRECTIVES, Routes, Router } from '@angular/router';
//import { HTTP_PROVIDERS } from '@angular/http';

//import { AboutComponent } from './+about/index';
import { HomeComponent } from './home/index';
//import { NameListService, NavbarComponent, ToolbarComponent } from './shared/index';
//=======
//import { Component } from '@angular/core';
//import { ROUTER_DIRECTIVES } from '@angular/router';
//import { HTTP_PROVIDERS } from '@angular/http';

import { Config, NameListService, NavbarComponent, ToolbarComponent } from './shared/index';
//>>>>>>> 80ccc9aadc3699bf89f1be2216ccfe1d91fa9bf5

import { LoginComponent } from './login/index';
import { LoginService } from './shared/services/login.service';
import { Error400Component, Error500Component } from './errorPages/index';
/*=======26 sep
import { Component } from '@angular/core';
import { Config} from './shared/index';
>>>>>>> eb8c13ee984e8a813ed6f6b8c4bf68dba52a49ec*/

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, AboutComponent).
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  templateUrl: 'app.component.html',
  //<<<<<<< HEAD
  //directives: [ROUTER_DIRECTIVES, NavbarComponent, ToolbarComponent],
  providers: [
    LoginService
  ]
})
//<<<<<<< HEAD
/**angular 2.0 changes
 * 
@Routes([
  { path: '/App', component: HomeComponent },
  { path: '/about', component: AboutComponent },
  { path: '/Login', component: LoginComponent },
  { path: '/404', component: Error400Component },
  { path: '/500', component: Error500Component }
])
 */
/**
 * This class represents the main application component.
 * Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy
 * loaded components (HomeComponent, AboutComponent).
 */
export class AppComponent implements OnInit {
  constructor(private _router: Router, private _loginService: LoginService) {
    /*======= 26 sep
    })
    
    export class AppComponent {
      constructor() {
    >>>>>>> eb8c13ee984e8a813ed6f6b8c4bf68dba52a49ec*/
    console.log('Environment config', Config);
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
      }, error => {
        localStorage.clear();
        this._router.navigate(['/Login']);
      });
    //=======
    //export class AppComponent {
    //constructor() {
    //console.log('Environment config', Config);
    // >>>>>>> 80ccc9aadc3699bf89f1be2216ccfe1d91fa9bf5
  }
}
