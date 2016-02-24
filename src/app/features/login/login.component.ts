import {Component} from 'angular2/core';
import {Store} from '../../store/store';
import {userProvidedUsername,userWantsToLogin} from '../../store/actions/session.actions';

@Component({
  selector: 'login',
  template: `
   <h1>Login</h1>
    <section>
      <!-- here could be a place, where the form-generator is used... -->
      <form>
        <label for="username">Username:
          <input [value]="store.getSessionState().providedUsername" id="username" #username (blur)="onUsernameBlurred({
            username: username.value
          })"/></label>
        <label for="password">Password: <input id="password" #password type="password"/></label>
        <label for="tenant">Tenant:
          <select id="tenant" #tenant>
            <option *ngFor="#tenant of store.getSessionState().tenants" value="{{tenant.name}}">{{tenant.name}}</option>
          </select>
        </label>
        <button type="submit" (click)="onLoginClicked({
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

  constructor(private store:Store) {
  }

  public onLoginClicked(event:any):void {
    this.store.dispatch(userWantsToLogin(event['username'], event['password'], event['tenant']));
  }

  public onUsernameBlurred(event:any):void {
    console.log('event in blurred:');
    console.log(event);
    this.store.dispatch(userProvidedUsername(event.username));
  }
}
