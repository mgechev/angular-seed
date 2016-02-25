import {Component,OnInit} from 'angular2/core';
import {InitializeService} from './shared/features/services/initialize.service';
import {Store} from './store/store';

import {LoginComponent} from './features/login/login.component';
import {StartpageComponent} from './features/startpage/startpage.component';
import {ManageComponent} from './features/manage/manage.component';
import {ActivitiesComponent} from './features/activities/activities.component';
import {AdministrationComponent} from './features/administration/administration.component';
import {ApplicationHeader} from './shared/features/application-header/application-header.component';

import {validSessionRequired} from './store/actions/session.actions';
import {SessionService} from './shared/features/services/session.service';
import {UiSessionStateEnum} from './store/stores/ui/session.store';
import {IRootStore} from './store/stores/root.store';

@Component({
  selector: 'app',
  template: `
    <div class="container">
      <div class="row">
        <login *ngIf="store.getUiStore().session.state !== stateSessionValid"
        class="col-lg-4 col-md-6 col-sm-7 col-xs-8 center-block pull-xs-none m-t-3"></login>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <section *ngIf="store.getUiStore().session.state === stateSessionValid" id="applicationframe">

            <application-header></application-header>

            <startpage *ngIf="store.getState().activeModule=='startpage'"></startpage>
            <manage *ngIf="store.getState().activeModule=='manage'"></manage>
            <activities *ngIf="store.getState().activeModule=='activities'"></activities>
            <administration *ngIf="store.getState().activeModule=='administration'"></administration>

            <footer>Message: {{store.getUiStore().global.message}}</footer>

        </section>
      </div>
    </div>
  `,
  directives: [LoginComponent, StartpageComponent, ManageComponent, ActivitiesComponent, AdministrationComponent, ApplicationHeader],
  providers: [InitializeService, SessionService]
})
export class AppComponent implements OnInit {
  constructor(private store:Store, private initializeService:InitializeService, sessionService:SessionService) {
  }

  public stateSessionValid:UiSessionStateEnum = UiSessionStateEnum.SESSION_VALID;

  public ngOnInit():any {
    console.log('initial store:', this.store.getState());
    this.store.subscribe(function (rootStore:IRootStore):void {
      console.log('changed store:', rootStore);
    });

    this.store.dispatch(validSessionRequired());
  }
}
