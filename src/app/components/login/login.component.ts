import {Component,Input,Output,EventEmitter} from 'angular2/core';
import {TenantLoginDto} from '../../shared/stubs/dtos/tenant-login-dto';

@Component({
  selector: 'login',
  template: `
  <h1>Login</h1>
  <section>
    <!-- here could be a place, where the form-generator is used... -->
    <form>
      <label for="username">Username: <input id="username" #username (blur)="usernameBlured.emit({
        username: username.value
      })"/></label>
      <label for="password">Password: <input id="password" #password type="password"/></label>
      <label for="tenant">Tenant:
        <select id="tenant" #tenant>
          <option *ngFor="#tenant of tenants" value="{{tenant.name}}">{{tenant.name}}</option>
        </select>
      </label>
      <button type="submit" (click)="loginClicked.emit({
        username: username.value,
        password: password.value,
        tenant: tenant.value
      })">Login</button>
    </form>
  </section>
  `
})
export class LoginComponent {

  @Input()
  public tenants:Array<TenantLoginDto>;

  @Output()
  public usernameBlured:EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public loginClicked:EventEmitter<any> = new EventEmitter<any>();
}
