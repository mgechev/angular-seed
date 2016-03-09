import {NgFor} from 'angular2/common';
import {Component,OnInit} from 'angular2/core';
import {InitializeService} from './shared/features/services/initialize.service';
import {Store} from './store/store';

import {LoginComponent} from './shared/features/authentication/login.component';
import {StartpageComponent} from './features/startpage/startpage.component';
import {ManageComponent} from './features/manage/manage.component';
import {ActivitiesComponent} from './features/activities/activities.component';
import {AdministrationComponent} from './features/administration/administration.component';
import {ApplicationHeader} from './shared/features/application-header/application-header.component';

import {AuthenticationService} from './shared/features/authentication/authentication.service';
import {IRootStore} from './store/stores/root.store';
import {UiSessionStateEnum} from './shared/features/authentication/authentication.store';

import {BackendChooserComponent} from './shared/features/backend/backend-chooser.component';
import {BackendActions} from './shared/features/backend/backend.actions';

@Component({
  selector: 'app',
  template: `
    <div class="container">
      <div class="row" *ngIf="!store.getFeatureStore('backend').backendUrlSelected">
        <backend-chooser></backend-chooser>
      </div>
      <div class="row" *ngIf="store.getFeatureStore('backend').backendUrlSelected">
        <login *ngIf="!store.getFeatureStore('authentication').ui.initializing && !store.getFeatureStore('authentication').ui.loggedIn"
          class="col-lg-4 col-md-6 col-sm-7 col-xs-8 center-block pull-xs-none m-t-3"></login>
        <a href="#" (click)="discardBackendUrl()"
          class="col-lg-4 col-md-6 col-sm-7 col-xs-8 center-block pull-xs-none m-t-3">Change Backend URL</a>
      </div>
    </div>
    <div class="container-fluid" *ngIf="store.getFeatureStore('backend').backendUrlSelected">
      <div class="row">
        <section *ngIf="store.getFeatureStore('authentication').ui.state === stateSessionValid" id="applicationframe">

            <application-header
              [activeMainNavigationItem]="store.getUiStore().app.activeMainNavigationItem"
              [mainNavigation]="store.getUiStore().app.mainNavigation"
              [userSession]="store.getFeatureStore('authentication').userSession">
            </application-header>

            <startpage
              *ngIf="store.getUiStore().app.activeMainNavigationItem.key === store.getUiStore().app.mainNavigation[0].key">
            </startpage>
            <manage
              *ngIf="store.getUiStore().app.activeMainNavigationItem.key === store.getUiStore().app.mainNavigation[1].key">
            </manage>
            <activities
              *ngIf="store.getUiStore().app.activeMainNavigationItem.key === store.getUiStore().app.mainNavigation[2].key">
            </activities>
            <administration
              *ngIf="store.getUiStore().app.activeMainNavigationItem.key === store.getUiStore().app.mainNavigation[3].key">
            </administration>

            <footer>Message: {{store.getUiStore().global.message}}</footer>

        </section>
      </div>
    </div>
  `,
  directives: [NgFor, LoginComponent, StartpageComponent, ManageComponent, ActivitiesComponent,
               AdministrationComponent, ApplicationHeader, BackendChooserComponent],
  providers: [InitializeService, AuthenticationService]
})
export class AppComponent implements OnInit
{
  constructor(private store:Store, initializeService:InitializeService, sessionService:AuthenticationService)
  {
  }

  public stateSessionValid:UiSessionStateEnum = UiSessionStateEnum.SESSION_VALID;

  public ngOnInit():any
  {

    /* this ist just for testing and debugging */
    console.group('Initial Store');
    console.log(this.store.getState());
    console.groupEnd();
    this.store.subscribe(function (rootStore:IRootStore):void
    {
      console.group('Changed Store');
      console.log(rootStore);
      console.groupEnd();
    });
  }

  public discardBackendUrl():void
  {
    this.store.dispatch(BackendActions.backendUrlDiscarded());
  }
}
