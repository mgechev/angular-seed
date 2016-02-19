import {Component} from 'angular2/core';
import {Input} from 'angular2/core';
import {OnChanges} from 'angular2/core';
import {Output} from 'angular2/core';
import {EventEmitter} from 'angular2/core';
import {TenantLoginDto} from '../../shared/stubs/dtos/tenant-login-dto';

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
      <button type="submit" (click)="loginClicked.emit({
      username: username.value,
       password: password.value,
        tenant: tenant.value
        })">Login</button>
    </form>
  </section>
  `
})
export class LoginComponent implements OnChanges {

  @Input()
  public tenants:Array<TenantLoginDto>;

  @Output()
  public usernameFocusOut = new EventEmitter();

  @Output()
  public loginClicked = new EventEmitter();

  public ngOnChanges(changes:{}):any {
    return null;
  }
}
