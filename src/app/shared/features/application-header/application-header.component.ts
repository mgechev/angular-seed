import {Component,OnInit,OnChanges,Input} from 'angular2/core';
import {Navigation} from '../../ui-elements/navigation';
import {Store} from '../../../store/store';
import {mainNavigationItemClicked, secondaryNavigationItemClicked} from '../../../store/actions/navigation.actions';
import {NavigationItem} from '../../../store/stores/ui/app.store';
import {TenantLoginDto} from '../../../shared/stubs/dtos/tenant-login-dto';
import {componentInitialized} from '../../../store/actions/app.actions';
import {AuthenticationActions} from '../authentication/authentication.actions';
import {AuthenticationUserSessionStore} from '../authentication/authentication.store';

@Component({
  selector: 'application-header',
  directives: [
    Navigation
  ],
  template: `
    <section class="application-header">
      <nav class="navbar navbar-full navbar-dark bg-inverse">

        <a class="navbar-brand">FNT ServicePlanet [HTML-UI]</a>

        <navigation
          [items]="mainNavigation"
          [activeItem]="activeMainNavigationItem"
          (itemClicked)="onMainNavigationItemClicked($event)">
        </navigation>

        <navigation toggable="true" align="right"
          [items]="secondaryNavigationItems"
          [activeItem]=""
          (itemClicked)="onSecondaryNavigationItemClicked($event)">
        </navigation>

      </nav>
    </section>
    `
})
export class ApplicationHeader implements OnInit,OnChanges {
  public id = 'ApplicationHeader';

  @Input() activeMainNavigationItem:NavigationItem;
  @Input() mainNavigation:Array<NavigationItem>;
  @Input() userSession:AuthenticationUserSessionStore;

  constructor(private store:Store) {
  }

  secondaryNavigationItems = [];

  onMainNavigationItemClicked(event):void {
    this.store.dispatch(mainNavigationItemClicked(event));
  }

  onSecondaryNavigationItemClicked(event):void {
    if (event.key === 'logout') {
      this.store.dispatch(AuthenticationActions.userWantsToLogout());
      return;
    } else if (event instanceof TenantLoginDto) {
      this.store.dispatch(AuthenticationActions.userRequestedTenantswitch(event));
    } else {
      this.store.dispatch(secondaryNavigationItemClicked(event));
    }
  }

  ngOnChanges(changes) {
    if (!changes.userSession || !changes.userSession.currentValue.user) return;

    this.secondaryNavigationItems = [
      {
        key: 'tenant', label: changes.userSession.currentValue.user.tenant.name,
        children: changes.userSession.currentValue.tenants
      },
      {
        key: '',
        label: changes.userSession.currentValue.user.firstname + ' ' + changes.userSession.currentValue.user.lastname
      },
      {key: 'settings', label: 'Settings'},
      {key: 'info', label: 'Info'},
      {key: 'help', label: 'Help'},
      {key: 'logout', label: 'Logout'}
    ];
  }

  ngOnInit() {
    let component = this;
    this.store.dispatch(componentInitialized(component.id));
  }

}
