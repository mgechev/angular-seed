import {Injectable} from 'angular2/core';
import {Store} from '../../../store/store';
import {LoginService} from '../../stubs/services/login.service';
import {UserLoginDto} from '../../stubs/dtos/user-login-dto';
import {userIsAuthenticated} from '../../../store/actions/session.actions';
import {userLoggedOut} from '../../../store/actions/session.actions';
import {IUiStore} from '../../../store/stores/ui.store';
import {UiSessionStateEnum} from '../../../store/stores/ui/session.store';

@Injectable()
export class SessionService {
  constructor(private store:Store, private loginService:LoginService) {
    let self:SessionService = this;

    // listen for changed store and check, if a backend call is needed
    store.subscribe(function ():void {
      let uiStore:IUiStore = store.getUiStore();

      switch (uiStore.session.state) {
        case UiSessionStateEnum.VALID_SESSION_REQUIRED:
          self.loginService.hasLoggedInUser();
          break;

        case UiSessionStateEnum.BACKEND_HAS_VALID_SESSION:
          self.loginService.getLoggedInUser();
          break;

        case UiSessionStateEnum.USERNAME_ENTERED:
          self.loginService.findActiveTenantsByUser(uiStore.session.username);
          break;

        case UiSessionStateEnum.LOGIN_CLICKED:
          self.triggerAuthenticate(uiStore.session.username, uiStore.session.password, uiStore.session.tenant);
          break;

        case UiSessionStateEnum.LOGOUT_CLICKED:
          self.triggerLogout();
          break;

        case UiSessionStateEnum.SESSION_INVALID:
        case UiSessionStateEnum.SESSION_VALID:
        case UiSessionStateEnum.PASSWORD_ENTERED:
        case UiSessionStateEnum.TENANTS_LOADED:
        case UiSessionStateEnum.TENANT_SELECTED:
          // no backend call required
          break;

        default:
          // do nothing here
          break;
      }
    });
  }

  private triggerAuthenticate(username:string, password:string, tenant:string):void {
    let store:Store = this.store;

    console.log(module.id, 'request');
    console.time('authenticate call');
    this.loginService.authenticate(username, password, tenant)
      .then(function (userLoginDto:UserLoginDto):void {
        console.timeEnd('authenticate call');
        console.log(module.id, 'response');
        store.dispatch(userIsAuthenticated(userLoginDto));
      });
  }

  private triggerLogout():void {
    let store:Store = this.store;

    this.loginService.logout()
      .then(function ():void {
        store.dispatch(userLoggedOut());
      });
  }
}
