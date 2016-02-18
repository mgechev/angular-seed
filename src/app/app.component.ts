import { Component } from 'angular2/core';
import {MainLayout} from './shared/components/layouts/main-layout/main-layout.component';
import {InitializeService} from './shared/services/initialize.service';
import {Store} from '../store/store';
import {LoginComponent} from './components/login/login.component';

@Component({
  selector: 'app',
  template: `
  <login *ngIf="!store.getSessionState().userAuthenticated"></login>
  <main-layout *ngIf="store.getSessionState().userAuthenticated"></main-layout>
  `,
  directives: [LoginComponent, MainLayout],
  providers: [InitializeService]
})

export class AppComponent {

  constructor(private store:Store, initializeService:InitializeService) {
    console.log(initializeService);
  }
}
