import {Component,OnInit} from 'angular2/core';
import {InitializeService} from './shared/services/initialize.service';
import {Store} from './store/store';
import {LoginComponent} from './features/login/login.component';
import {StartpageComponent} from './features/startpage/startpage.component';
import {ManageComponent} from './features/manage/manage.component';
import {ActivitiesComponent} from './features/activities/activities.component';
import {AdministrationComponent} from './features/administration/administration.component';
import {LoginService} from './shared/stubs/services/login.service';
import {UserLoginDto} from './shared/stubs/dtos/user-login-dto';
import {userIsAuthenticated} from './store/actions/session.actions';
import {userWantsToLogin} from './store/actions/session.actions';
import {TenantLoginDto} from './shared/stubs/dtos/tenant-login-dto';
import {activeTenantsOfUserLoaded} from './store/actions/session.actions';
import {backendCallFails} from './store/actions/app.actions';
import {ApplicationHeader} from './shared/components/application-header/application-header.component';

@Component({
  selector: 'app',
  template: `

  <login *ngIf="!store.getSessionState().userAuthenticated"
  (usernameBlured)="onUsernameBlured($event)"
  (loginClicked)="onLoginClicked($event)"
  [tenants]="store.getSessionState().tenants"></login>

  <section *ngIf="store.getSessionState().userAuthenticated" id="applicationframe">

      <application-header></application-header>

      <startpage *ngIf="store.getState().activeModule=='startpage'"></startpage>
      <manage *ngIf="store.getState().activeModule=='manage'"></manage>
      <activities *ngIf="store.getState().activeModule=='activities'"></activities>
      <administration *ngIf="store.getState().activeModule=='administration'"></administration>

      <footer>Message: {{store.getState().uiState.message}}</footer>

  </section>
  `,
  directives: [LoginComponent, StartpageComponent, ManageComponent, ActivitiesComponent, AdministrationComponent, ApplicationHeader],
  providers: [LoginService, InitializeService]
})
export class AppComponent implements OnInit {
  constructor(private store:Store, private loginService:LoginService, private initializeService:InitializeService) {
  }

  public ngOnInit():any {
    let self:AppComponent = this;

    self.loginService.hasLoggedInUser()
      .then(function (hasLoggedInUser:boolean) {
        if (hasLoggedInUser) {
          self.getLoggedInUserFromBackend();
        }
      });

    return null;
  }

  public onUsernameBlured(event:any):void {
    let self:AppComponent = this;

    self.loginService.findActiveTenantsByUser(event['username'])
      .then(function (tenants:Array<TenantLoginDto>):void {
        self.store.dispatch(activeTenantsOfUserLoaded(tenants));
      }, function (error:Object):void {
        self.store.dispatch(backendCallFails(error));
      });
  }

  public onLoginClicked(event:any):void {
    let self:AppComponent = this;

    self.store.dispatch(userWantsToLogin(event['username'], event['password'], event['tenant']));

    self.loginService.authenticate(event['username'], event['password'], event['tenant'])
      .then(function (userLoginDto:UserLoginDto):void {
        self.store.dispatch(userIsAuthenticated(userLoginDto));
      }, function (error:Object):void {
        self.store.dispatch(backendCallFails(error));
      });
  }

  private getLoggedInUserFromBackend():void {
    let self:AppComponent = this;

    self.loginService.getLoggedInUser()
      .then(function (loggedInUser:UserLoginDto):void {
        self.store.dispatch(userIsAuthenticated(loggedInUser));

        self.initializeService.initialize();
      }, function (error:Object):void {
        self.store.dispatch(backendCallFails(error));
      });
  }
}
