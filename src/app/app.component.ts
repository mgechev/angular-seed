import { Component } from 'angular2/core';
import {InitializeService} from './shared/services/initialize.service';
import {Store} from '../store/store';
import {LoginComponent} from './components/login/login.component';
import {AdministrationComponent} from './administration/administration.component';

@Component({
  selector: 'app',
  template: `

  <login *ngIf="!store.getSessionState().userAuthenticated"></login>

  <section *ngIf="store.getSessionState().userAuthenticated" id="applicationframe">

      <mainnavigation><!-- placeholder //--></mainnavigation>

      <startpage> <!-- placeholder //--></startpage>
      <manage> <!-- placeholder //--></manage>
      <activities> <!-- placeholder //--></activities>
      <administration></administration>

  </section>

  `,
  directives: [LoginComponent, AdministrationComponent],
  providers: [InitializeService]
})

export class AppComponent {

  constructor(private store:Store, initializeService:InitializeService) {
    console.log(initializeService);
  }
}
