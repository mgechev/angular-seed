import {Component} from 'angular2/core';
import {Store} from '../../../store/store';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {Dropdown} from '../../ui-elements/form-elements/dropdown';
import {TenantLoginDto} from '../../stubs/dtos/tenant-login-dto';
import {AuthorizationActions} from './authentication.actions';

@Component({
  selector: 'login',
  directives: [DROPDOWN_DIRECTIVES, Dropdown],
  template: `
    <section>
       <h2>Login</h2>
      <!-- here could be a place, where the form-generator is used... -->
      <form class="p-y-1">

        <fieldset class="form-group">
          <label for="username">Username:</label>
            <input id="username" #username (change)="onUsernameChanged({username: username.value})"
                   class="form-control"/>
        </fieldset>

       <fieldset class="form-group">
          <label for="password">Password:</label>
          <input id="password" #password type="password" class="form-control"
          (change)="onPasswordChanged({password: password.value})"/>
       </fieldset>

       <dropdown
          [options]="store.getDataStore().userSession.tenants ? store.getDataStore().userSession.tenants : null"
          [defaultOption]="store.getUiStore().session.tenant"
          [label]="'Tenants'"
          [noDataMessage]="'Please enter username in order to see available tenants'"
          [emptyOptionsMessage]="'No tenants available for chosen user'"
          (optionSelected)="onTenantSelected($event)"></dropdown>

        <button type="submit" class="btn btn-primary pull-xs-right" (click)="onLoginClicked()">Login
        </button>
      </form>
    </section>
  `
})
export class LoginComponent {

  constructor(private store:Store) {
  }

  public onUsernameChanged(event:any):void {
    this.store.dispatch(AuthorizationActions.userProvidedUsername(event.username));
  }

  public onPasswordChanged(event:any):void {
    this.store.dispatch(AuthorizationActions.userProvidedPassword(event.password));
  }

  public onTenantSelected(tenant:TenantLoginDto):void {
    this.store.dispatch(AuthorizationActions.userProvidedTenant(tenant));
  }

  public onLoginClicked(event:any):void {
    this.store.dispatch(AuthorizationActions.userWantsToLogin());
  }
}
