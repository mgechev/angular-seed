import { Component } from 'angular2/core';
import {InitializeService} from './shared/services/initialize.service';
import {Store} from '../store/store';
import {LoginComponent} from './components/login/login.component';
import {AdministrationComponent} from './administration/administration.component';
import {OnInit} from 'angular2/core';
import {LoginService} from './shared/stubs/services/login.service';
// import {UserLoginDto} from './shared/stubs/dtos/user-login-dto';
// import {userIsAuthenticated} from '../store/actions/session';
import {logoutUser} from '../store/actions/session';

@Component({
  selector: 'app',
  template: `
<!--  <login *ngIf="!store.getSessionState().userAuthenticated"></login> //-->
  <button id="logout" (click)="onLogout()">Logout</button>

  <section *ngIf="store.getSessionState().userAuthenticated" id="applicationframe">

      <mainnavigation><!-- placeholder //--></mainnavigation>

      <startpage> <!-- placeholder //--></startpage>
      <manage> <!-- placeholder //--></manage>
      <activities> <!-- placeholder //--></activities>
      <administration></administration>

  </section>

  `,
  directives: [LoginComponent, AdministrationComponent],
  providers: [LoginService, InitializeService]
})
export class AppComponent implements OnInit {
  constructor(private store:Store, private loginService:LoginService, private initializeService:InitializeService) {
  }

  public ngOnInit():any {
//    var self:AppComponent = this;

   /* self.loginService.hasLoggedInUser()
      .subscribe(function (hasLoggedInUser:boolean):void {
        if (hasLoggedInUser) {
          self.getLoggedInUserFromBackend();
        }
      }); */

    return null;
  }

  public onLogout():void {
    let self:AppComponent = this;

    self.loginService.logout()
      .subscribe(function ():void {
        self.store.dispatch(logoutUser());
      });
  }

  /* private getLoggedInUserFromBackend():void {
    let self:AppComponent = this;

    self.loginService.getLoggedInUser()
      .subscribe(function (loggedInUser:UserLoginDto):void {
        self.store.dispatch(userIsAuthenticated(loggedInUser));

        self.initializeService.initialize();
      });
  }*/
}
