import {Component} from 'angular2/core';
import {Store} from '../../../store/store';
import {LoginService} from '../../shared/stubs/services/login.service';
import {UserLoginDto} from '../../shared/stubs/dtos/user-login-dto';
import {userIsAuthenticated} from '../../../store/actions/session';

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
  `,
  providers: [LoginService]
})
export class LoginComponent {
  constructor(private store:Store, private loginService:LoginService) {
  }

  public onLogin(username:string, password:string, tenant:string):void {
    let self:LoginComponent = this;

    console.log('onLogin reached', username, password, tenant);
    /*
     What is better here?
     - Option 1
     First dispatching an action which sends the user inputs to the store and afterwards calling the backend
     (but how can we do this?)
     - Option 2
     First call the backend and don't store the user inputs at all

     For debugging I guessed that option 1 is better, because the store needs to know about the exact state before a
     backend call is proceed to be able to reproduce this state. If the store doesn't know about the data, it will be
     harder to reproduce the bug. (ok, for the login it doesn't matter, but it's a general point)
     */

    //this.store.dispatch(authenticateUser(username, password, tenant));
    this.loginService.authenticate(username, password, tenant)
      .subscribe(function (loggedInUser:UserLoginDto):void {
        console.log('loggedInUser', loggedInUser);
        self.store.dispatch(userIsAuthenticated(loggedInUser));
      });
  }
}
