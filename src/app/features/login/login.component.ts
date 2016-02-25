import {Component} from 'angular2/core';
import {Store} from '../../store/store';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {Dropdown} from '../../shared/ui-elements/form-elements/dropdown';
import {TenantLoginDto} from '../../shared/stubs/dtos/tenant-login-dto';
import {userProvidedUsername,userProvidedPassword,userProvidedTenant,userWantsToLogin} from '../../store/actions/session.actions';

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
            <input id="username" #username (blur)="onUsernameBlurred({username: username.value})"
                   class="form-control"/>
        </fieldset>

       <fieldset class="form-group">
          <label for="password">Password:</label>
          <input id="password" #password type="password" class="form-control"
          (keyup)="onPasswordChanged({password: password.value})"
          (blur)="onPasswordChanged({password: password.value})"/>
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

  public onUsernameBlurred(event:any):void {
    this.store.dispatch(userProvidedUsername(event.username));
  }

  public onPasswordChanged(event:any):void {
    console.log('password changed');
    this.store.dispatch(userProvidedPassword(event.password));
  }

  public onTenantSelected(tenant:TenantLoginDto):void {
    this.store.dispatch(userProvidedTenant(tenant));
  }

  public onLoginClicked(event:any):void {
    this.store.dispatch(userWantsToLogin());
  }
}
