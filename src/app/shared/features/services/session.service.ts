import {Injectable} from 'angular2/core';
import {Store} from '../../../store/store';
import {LoginService} from '../../stubs/services/login.service';
import {UserLoginDto} from '../../stubs/dtos/user-login-dto';
import {userIsAuthenticated} from '../../../store/actions/session.actions';
import {TenantLoginDto} from '../../stubs/dtos/tenant-login-dto';
import {activeTenantsOfUserLoaded} from '../../../store/actions/session.actions';
import {userLoggedOut} from '../../../store/actions/session.actions';
import {IUiStore} from '../../../store/stores/ui.store';
import {validSessionExistsNot} from '../../../store/actions/session.actions';
import {UiSessionStateEnum} from '../../../store/stores/ui/session.store';
import {IDataStore} from '../../../store/stores/data.store';

@Injectable()
export class SessionService {
  constructor(private store:Store, private loginService:LoginService) {
    let self:SessionService = this;

    // listen for changed store and check, if a backend call is needed
    store.subscribe(function (/*previousStore:Store*/):void {
      let uiStore:IUiStore = store.getUiStore();
      let dataStore:IDataStore = store.getDataStore();

      // add check for previousStore here. Don't proceed if session has not changed

      switch (uiStore.session.state) {
        // check for INITIAL state of session to check, if a valid session exists on the server for this client
        case UiSessionStateEnum.VALID_SESSION_REQUIRED:
          self.triggerCheckForValidSession();
          break;

        case UiSessionStateEnum.USERNAME_ENTERED:
          if (!dataStore.userSession.tenants) {
            self.triggerFindActiveTenantsByUser(uiStore.session.username);
          }
          break;

        case UiSessionStateEnum.LOGIN_CLICKED:
          console.log('UiSessionStateEnum.LOGIN_CLICKED');
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
      console.log('session service proceeded', uiStore.session.state);
    });
  }

  private triggerCheckForValidSession():void {
    let store:Store = this.store;
    let self:SessionService = this;

    this.loginService.hasLoggedInUser()
      .then(function (hasValidSession:boolean):void {
        console.log('hasLoggedInUser Response:', hasValidSession);
        if (hasValidSession) {
          console.log('exists');
          self.triggerGetValidSession();
        } else {
          console.log('exists not');
          store.dispatch(validSessionExistsNot());
        }
      });
  }

  private triggerGetValidSession():void {
    let store:Store = this.store;

    this.loginService.getLoggedInUser()
      .then(function (loggedInUser:UserLoginDto):void {
        store.dispatch(userIsAuthenticated(loggedInUser));
      });
  }

  private triggerFindActiveTenantsByUser(username:string):void {
    let store:Store = this.store;

    this.loginService.findActiveTenantsByUser(username)
      .then(function (tenants:Array<TenantLoginDto>):void {
        store.dispatch(activeTenantsOfUserLoaded(tenants));
      });
  }

  private triggerAuthenticate(username:string, password:string, tenant:string):void {
    let store:Store = this.store;

    this.loginService.authenticate(username, password, tenant)
      .then(function (userLoginDto:UserLoginDto):void {
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
