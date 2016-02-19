import {Component} from 'angular2/core';
import {InitializeService} from './shared/services/initialize.service';
import {Store} from '../store/store';
import {LoginComponent} from './components/login/login.component';
import {AdministrationComponent} from './administration/administration.component';
import {OnInit} from 'angular2/core';
import {UserLoginDto} from './shared/stubs/dtos/user-login-dto';
import {userIsAuthenticated} from '../store/actions/session';
import {logoutUser} from '../store/actions/session';
import {userWantsToLogin} from '../store/actions/session';
import {TenantLoginDto} from './shared/stubs/dtos/tenant-login-dto';
import {activeTenantsOfUserLoaded} from '../store/actions/session';
import {backendCallFails} from '../store/actions/app';
import {LoginService} from './shared/stubs/services/login.service';

@Component({
    selector: 'app',
    template: `
  <login *ngIf="!store.getSessionState().userAuthenticated"
  (usernameBlured)="onUsernameBlured($event)"
  (loginClicked)="onLoginClicked($event)"
  [tenants]="store.getSessionState().tenants"></login>

  <button *ngIf="store.getSessionState().userAuthenticated" id="logout" (click)="onLogout()">Logout</button>
  <section *ngIf="store.getSessionState().userAuthenticated" id="applicationframe">

      <mainnavigation><!-- placeholder //--></mainnavigation>

      <startpage> <!-- placeholder //--></startpage>
      <manage> <!-- placeholder //--></manage>
      <activities> <!-- placeholder //--></activities>
      <administration></administration>

  </section>
  <footer>Message: {{store.getState().uiState.message}}</footer>
  `,
    directives: [LoginComponent, AdministrationComponent],
    providers: [InitializeService]
})
export class AppComponent implements OnInit {
    constructor(private store:Store, private loginService:LoginService, private initializeService:InitializeService) {
    }

    public ngOnInit():any {
        let self:AppComponent = this;

        self.loginService.hasLoggedInUser()
            .subscribe(function (hasLoggedInUser:boolean):void {
                if (hasLoggedInUser) {
                    self.getLoggedInUserFromBackend();
                }
            });

        return null;
    }

    public onLogout():void {
        let self:AppComponent = this;

        self.loginService.logout()
            .subscribe(function ():void {
                self.store.dispatch(logoutUser());
            }, function (error:Object):void {
                self.store.dispatch(backendCallFails(error));
            });
    }

    public onUsernameBlured(event:any):void {
        let self:AppComponent = this;

        self.loginService.findActiveTenantsByUser(event['username'])
            .subscribe(function (tenants:Array<TenantLoginDto>):void {
                self.store.dispatch(activeTenantsOfUserLoaded(tenants));
            }, function (error:Object):void {
                self.store.dispatch(backendCallFails(error));
            });
    }

    public onLoginClicked(event:any):void {
        let self:AppComponent = this;

        self.store.dispatch(userWantsToLogin(event['username'], event['password'], event['tenant']));

        self.loginService.authenticate(event['username'], event['password'], event['tenant'])
            .subscribe(function (userLoginDto:UserLoginDto):void {
                self.store.dispatch(userIsAuthenticated(userLoginDto));
                self.initializeService.initialize();
            }, function (error:Object):void {
                self.store.dispatch(backendCallFails(error));
            });
    }

    private getLoggedInUserFromBackend():void {
        let self:AppComponent = this;

        self.loginService.getLoggedInUser()
            .subscribe(function (loggedInUser:UserLoginDto):void {
                self.store.dispatch(userIsAuthenticated(loggedInUser));
                self.initializeService.initialize();
            }, function (error:Object):void {
                self.store.dispatch(backendCallFails(error));
            });
    }
}
