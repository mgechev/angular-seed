import {Component,OnInit} from 'angular2/core';
import {InitializeService} from './shared/services/initialize.service';
import {LoginService} from './shared/stubs/services/login.service';
import {Store} from '../store/store';

import {LoginComponent} from './components/login/login.component';
import {StartpageComponent} from './startpage/startpage.component';
import {ManageComponent} from './manage/manage.component';
import {ActivitiesComponent} from './activities/activities.component';
import {AdministrationComponent} from './administration/administration.component';
import {ApplicationHeader} from './shared/components/application-header/application-header.component';

import {loggedInUserRequired} from '../store/actions/session.actions';

@Component({
  selector: 'app',
  template: `

  <login *ngIf="!store.getSessionState().userAuthenticated"></login>

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
  providers: [InitializeService]
})
export class AppComponent implements OnInit {
  constructor(private store:Store, private initializeService:InitializeService, private loginService:LoginService) {
  }

  public ngOnInit():any {
    this.store.dispatch(loggedInUserRequired());
  }

  /*  private getLoggedInUserFromBackend():void {
    let self:AppComponent = this;

    self.loginService.getLoggedInUser()
      .subscribe(function (loggedInUser:UserLoginDto):void {
        self.store.dispatch(userIsAuthenticated(loggedInUser));

        self.initializeService.initialize();
      }, function (error:Object):void {
        self.store.dispatch(backendCallFails(error));
      });


  }*/
}
