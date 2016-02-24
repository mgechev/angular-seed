import {Injectable} from 'angular2/core';
import {Store} from '../../../store/store';
import {LoginService} from '../../stubs/services/login.service';
import {ISessionStore} from '../../../store/stores/session.store';
import {backendAuthenticationInitialized} from '../../../store/actions/session.actions';
import {UserLoginDto} from '../../stubs/dtos/user-login-dto';
import {userIsAuthenticated} from '../../../store/actions/session.actions';
import {TenantLoginDto} from '../../stubs/dtos/tenant-login-dto';
import {activeTenantsOfUserLoaded} from '../../../store/actions/session.actions';
import {backendUserInquiryInitialized} from '../../../store/actions/session.actions';
import {sessionUserExists} from '../../../store/actions/session.actions';
import {logoutUser} from '../../../store/actions/session.actions';

@Injectable()
export class SessionService {
  constructor(private store:Store, private loginService:LoginService) {
    let self:SessionService = this;

    store.subscribe(function ():void {
      console.log('##### session service subs');
      let sessionState:ISessionStore = store.getSessionState();

      if (sessionState.loggedInUserRequired && !sessionState.backendUserInquiryInitialized) {
        self.handleHasLoggedInUser(sessionState);
      }

      if (sessionState.sessionUserExists && !sessionState.userAuthenticated) {
        self.handleGetLoggedInUser(sessionState);
      }

      if (sessionState.providedUsername && !sessionState.tenants) {
        self.handleFindActiveTenantsByUser(sessionState);
      }

      if (sessionState.loginAttempt && !sessionState.userAuthenticated && !sessionState.backendAuthenticationInitialized) {
        self.handleAuthenticate(sessionState);
      }

      if (sessionState.userLogoutRequest && sessionState.userAuthenticated) {
        self.handleLogout(sessionState);
      }
    });
  }

  private handleHasLoggedInUser(sessionState:ISessionStore):void {
    let store:Store = this.store;

    store.dispatch(backendUserInquiryInitialized());

    this.loginService.hasLoggedInUser()
      .then(function (hasLoggedInUser:boolean):void {
        if (hasLoggedInUser) {
          store.dispatch(sessionUserExists());
        }
      });
  }

  private handleGetLoggedInUser(sessionState:ISessionStore):void {
    let store:Store = this.store;

    this.loginService.getLoggedInUser()
      .then(function (loggedInUser:UserLoginDto):void {
        store.dispatch(userIsAuthenticated(loggedInUser));
      });
  }

  private handleFindActiveTenantsByUser(sessionState:ISessionStore):void {
    let store:Store = this.store;
    this.loginService.findActiveTenantsByUser(sessionState.providedUsername)
      .then(function (tenants:Array<TenantLoginDto>):void {
        store.dispatch(activeTenantsOfUserLoaded(tenants));
      });
  }

  private handleAuthenticate(sessionState:ISessionStore):void {
    let store:Store = this.store;

    store.dispatch(backendAuthenticationInitialized());
    this.loginService.authenticate(
      sessionState.loginAttempt.username,
      sessionState.loginAttempt.password,
      sessionState.loginAttempt.tenant
      )
      .then(function (userLoginDto:UserLoginDto):void {
        store.dispatch(userIsAuthenticated(userLoginDto));
      });
  }

  private handleLogout(sessionState:ISessionStore):void {
    let store:Store = this.store;

    this.loginService.logout()
      .then(function ():void {
        store.dispatch(logoutUser());
      });
  }
}
