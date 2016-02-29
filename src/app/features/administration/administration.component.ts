import {Component} from 'angular2/core';
import {Navigation} from '../../shared/ui-elements/navigation';
import {Store} from '../../store/store';
import {administrationNavigationItemClicked} from '../../store/actions/navigation.actions';
import {AssignmentsComponent} from './assignments/assignments.component';

@Component({
  selector: 'administration',
  directives: [AssignmentsComponent, Navigation],
  template: `
    <section>

      <navigation toggable="true"
        [items]="administrationNavigationItems"
        [activeItem]=""
        (itemClicked)="onAdministrationNavigationItemClicked($event)">
      </navigation>

      <admin-overview></admin-overview>
      <admin-users></admin-users>
      <admin-groups></admin-groups>
      <admin-tenants></admin-tenants>
      <admin-roles></admin-roles>
      <assignments
        [assignments]="store.getState().assignmentsState"
        [users]="store.getState().usersState">
      </assignments>
      <admin-responsibility></admin-responsibility>
      <admin-sessions></admin-sessions>
      <admin-audit-trail></admin-audit-trail>
      <admin-settings></admin-settings>
      <admin-import-export></admin-import-export>
      <admin-scripting></admin-scripting>
      <admin-startpages></admin-startpages>

    </section>
  `
})

export class AdministrationComponent {
  constructor(private store:Store) {
  }

  // ToDO: move this to Store, if it makes sense:
  administrationNavigationItems = [
    {key: 'admin-overview', label: 'Overview'},
    {key: 'admin-users', label: 'Users'},
    {key: 'admin-groups', label: 'Groups'},
    {key: 'admin-tenants', label: 'Tenants'},
    {key: 'admin-roles', label: 'Roles'},
    {key: 'admin-responsibility', label: 'Responsibility'},
    {key: 'admin-sessions', label: 'Sessions'},
    {key: 'admin-audit-trail', label: 'Audit Trail'},
    {key: 'admin-settings', label: 'Settings'},
    {key: 'admin-import-export', label: 'Import Export'},
    {key: 'admin-scripting', label: 'Skripting'},
    {key: 'admin-startpages', label: 'Startpages'}
  ];

  onAdministartionNavigationItemClicked(event):void {
    this.store.dispatch(administrationNavigationItemClicked(event));
  }
}
