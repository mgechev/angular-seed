import {Component,Input,Output,EventEmitter} from 'angular2/core';
import {TenantLoginDto} from '../../shared/stubs/dtos/tenant-login-dto';

@Component({
  selector: 'login',
  moduleId: module.id,
  templateUrl: './login.template.html'
})
export class LoginComponent {
  @Input()
  public tenants:Array<TenantLoginDto>;

  @Output()
  public usernameBlured:EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public loginClicked:EventEmitter<any> = new EventEmitter<any>();
}
