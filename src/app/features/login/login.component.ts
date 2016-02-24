import {Component} from 'angular2/core';
import {Store} from '../../store/store';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {Dropdown} from '../../shared/ui-elements/form-elements/dropdown';
import {TenantLoginDto} from '../../shared/stubs/dtos/tenant-login-dto';
import {userProvidedUsername,userWantsToLogin} from '../../store/actions/session.actions';

@Component({
  selector: 'login',
  directives: [DROPDOWN_DIRECTIVES,Dropdown],
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
          <input id="password" #password type="password" class="form-control"/>
       </fieldset>

       <dropdown
          [options]="store.getSessionState().tenants ? store.getSessionState().tenants : null"
          [label]="'Tenants'"
          [emptyMessage]="'Please enter username in order to see available tenants'"
          (optionSelected)="onTenantSelected($event)"></dropdown>

        <button type="submit" class="btn btn-primary pull-xs-right" (click)="onLoginClicked({
            username: username.value,
            password: password.value,
            tenant: tenant.value
          })">Login
        </button>
      </form>
    </section>

  `
})
export class LoginComponent {

  constructor(private store:Store) {}

  public onLoginClicked(event:any):void {
    this.store.dispatch(userWantsToLogin(event['username'], event['password'], event['tenant']));
  }

  public onUsernameBlurred(event:any):void {
    console.log('event in blurred:');
    console.log(event);
    this.store.dispatch(userProvidedUsername(event.username));
  }

  public onTenantSelected(tenant:TenantLoginDto):void {
    console.log('tenant in onTenantSelected:');
    console.log(tenant);
    //  this.store.dispatch(userProvidedUsername(event.username));
  }
}
