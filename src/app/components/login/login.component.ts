import {Component} from 'angular2/core';
import {Store} from '../../../store/store';
import {authenticateUser} from '../../../store/actions/session';

@Component({
  selector: 'login',
  template: `
  <h1>Login</h1>
  <section>
    <!-- here could be a place, where the form-generator is used... -->
    <form>
      <label for="username">Username: <input id="username" #username/></label>
      <label for="password">Password: <input id="password" #password type="password"/></label>
      <label for="tenant">Tenant:
        <select id="tenant" #tenant>
          <!-- TODO: needs to loop over users tenants -->
          <option value="ten1">ten1</option>
          <option value="FNT-GmbH">FNT-GmbH</option>
        </select>
      </label>
      <button type="submit" (click)="onLogin(username.value, password.value, tenant.value)">Login</button>
    </form>
  </section>
  `
})
export class LoginComponent {
  constructor(private store:Store) {
  }

  public onLogin(username:string, password:string, tenant:string):void {
    console.log('onLogin reached', username, password, tenant);
    this.store.dispatch(authenticateUser(username, password, tenant));
  }
}
