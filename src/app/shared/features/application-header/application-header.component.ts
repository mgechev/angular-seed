import {Component} from 'angular2/core';
import {Navigation} from '../ui-elements/navigation';
import {Store} from '../../../store/store';
import {userWantsToLogout} from '../../../store/actions/session.actions';
import {mainNavigationItemClicked, secondaryNavigationItemClicked} from '../../../store/actions/navigation.actions';
import {LoginService} from '../../stubs/services/login.service';

@Component({
  selector: 'application-header',
  directives: [
    Navigation
  ],
  template: `
    <section class="application-header">
      <nav class="navbar navbar-full navbar-dark bg-inverse">

        <a class="navbar-brand">SPL-HTML </a>

        <navigation
          [items]="mainNavigationItems"
          [activeItemKey]="store.getState().activeModule"
          (itemClicked)="onMainNavigationItemClicked($event)">
        </navigation>

        <navigation toggable="true" align="right"
          [items]="secondaryNavigationItems"
          [activeItemKey]=""
          (itemClicked)="onSecondaryNavigationItemClicked($event)">
        </navigation>

      </nav>
    </section>
    `
})
export class ApplicationHeader {

  constructor(private store:Store, private loginService:LoginService) {
  }

  // ToDo: Move all or part of this to Store:
  mainNavigationItems = [
    {key: 'startpage', label: 'Startpage'},
    {key: 'activities', label: 'Activities'},
    {key: 'manage', label: 'Manage'},
    {key: 'administration', label: 'Administration'}
  ];
  secondaryNavigationItems = [
    {key: 'secondary1', label: 'Secondary 1'},
    {key: 'secondary2', label: 'Secondary 2'},
    {key: 'secondary3', label: 'Secondary 3'},
    {key: 'logout', label: 'Logout'}
  ];

  onMainNavigationItemClicked(event):void {
    this.store.dispatch(mainNavigationItemClicked(event));
  }

  onSecondaryNavigationItemClicked(event):void {
    if (event === 'logout') {
      this.store.dispatch(userWantsToLogout());
      return;
    }
    this.store.dispatch(secondaryNavigationItemClicked(event));
  }

}
