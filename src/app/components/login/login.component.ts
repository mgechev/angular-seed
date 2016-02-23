import {Component} from 'angular2/core';
import {Store} from '../../../store/store';
import {userProvidedUsername,userWantsToLogin} from '../../../store/actions/session.actions';

@Component({
  selector: 'login',
  moduleId: module.id,
  templateUrl: './login.template.html'
})
export class LoginComponent {

  constructor(private store:Store) {}

  public onLoginClicked(event:any):void {
    //let self:AppComponent = this;
    console.log('event:');
    console.log(event);


    this.store.dispatch(userWantsToLogin(event['username'], event['password'], event['tenant']));

    /*  self.loginService.authenticate(event['username'], event['password'], event['tenant'])
     .subscribe(function (userLoginDto:UserLoginDto):void {
     self.store.dispatch(userIsAuthenticated(userLoginDto));
     }, function (error:Object):void {
     self.store.dispatch(backendCallFails(error));
     }); */
  }

  public onUsernameBlurred(event:any):void {
    this.store.dispatch(userProvidedUsername(event.username));
  }
}
