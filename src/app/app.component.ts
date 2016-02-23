import {Component,OnInit} from 'angular2/core';
import {InitializeService} from './shared/features/services/initialize.service';
import {LoginService} from './shared/stubs/services/login.service';
import {Store} from './store/store';

import {LoginComponent} from './features/login/login.component';
import {StartpageComponent} from './features/startpage/startpage.component';
import {ManageComponent} from './features/manage/manage.component';
import {ActivitiesComponent} from './features/activities/activities.component';
import {AdministrationComponent} from './features/administration/administration.component';
import {ApplicationHeader} from './shared/features/application-header/application-header.component';

import {loggedInUserRequired} from './store/actions/session.actions';

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

}
