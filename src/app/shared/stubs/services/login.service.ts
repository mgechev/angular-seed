import {BaseService} from './base/base.service';
import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {TenantLoginDto} from '../../../shared/stubs/dtos/tenant-login-dto';
import {UserLoginDto} from '../../../shared/stubs/dtos/user-login-dto';
import {
  backendUserInquiryInitialized,
  sessionUserExists,
  activeTenantsOfUserLoaded,
  userIsAuthenticated,
  backendAuthenticationInitialized,
  logoutUser
} from '../../../store/actions/session.actions';
import {backendCallFails} from '../../../store/actions/app.actions';
import {Store} from '../../../store/store';
import {ISessionStore} from '../../../store/stores/session.store';

@Injectable()
export class LoginService extends BaseService {
  constructor(http:Http, private store:Store) {
    super(http);

    this.servicePath = 'login';
    this.version = 'v1';

    var self:LoginService = this;
    this.store.subscribe(() => {
      let sessionState:ISessionStore = self.store.getSessionState();

      if(sessionState.loggedInUserRequired && !sessionState.backendUserInquiryInitialized) {
          self.hasLoggedInUser();
      }

      if(sessionState.sessionUserExists && !sessionState.userAuthenticated) {
         self.getLoggedInUser();
      }

      if(sessionState.providedUsername && !sessionState.tenants) {
        self.findActiveTenantsByUser(sessionState.providedUsername);
      }

      if(sessionState.loginAttempt && !sessionState.userAuthenticated && !sessionState.backendAuthenticationInitialized) {
        self.authenticate(
          sessionState.loginAttempt.username,
          sessionState.loginAttempt.password,
          sessionState.loginAttempt.tenant
        );
      }

      if(sessionState.userLogoutRequest && sessionState.userAuthenticated) {
        self.logout();
      }

      console.log('sessionState:');
      console.log(sessionState);

    });
  }

  public authenticate(loginname:string, password:string, tenant:string) {
    let store:Store = this.store;

    store.dispatch(backendAuthenticationInitialized());

    this.newPostCall('authenticate')
      .setUrlParams({
        'loginname': loginname,
        'password': password,
        'tenant': tenant
      })
      .send()
      .then(function (userLoginDto:UserLoginDto):void {
        store.dispatch(userIsAuthenticated(userLoginDto));
      }, function (error:Object):void {
        store.dispatch(backendCallFails(error));
      });

  }

  public findActiveTenantsByUser(loginname:string) {
    let store:Store = this.store;
    this.newGetCall('findActiveTenantsByUser')
      .setUrlParams({
        'loginname': loginname
      })
      .send()
      .then(function (tenants:Array<TenantLoginDto>):void {
        console.log('in subscription of get tenants');
        store.dispatch(activeTenantsOfUserLoaded(tenants));
      }, function (error:Object):void {
        store.dispatch(backendCallFails(error));
      });
  }

  public hasLoggedInUser() {
    let store:Store = this.store;
    store.dispatch(backendUserInquiryInitialized());

    this.newGetCall('hasLoggedInUser')
      .send()
      .then(function (LoggedInUser:boolean):void {
        if (LoggedInUser) {
          store.dispatch(sessionUserExists());
        }
      });
  }

  public getLoggedInUser() {
    let store:Store = this.store;

    this.newGetCall('getLoggedInUser')
      .send()
      .then(function (sessionUser:UserLoginDto):void {
        console.log('in getLoggedInUser, callback:');
        console.log(sessionUser);
        if (sessionUser) {
          store.dispatch(userIsAuthenticated(sessionUser));
        }
      });
  }

  public logout() {
    let store:Store = this.store;

    return this.newPostCall('logout')
      .send()
      .then(function ():void {
        store.dispatch(logoutUser());
      });
  }

  public switchTenant(tenant:string) {
    return this.newPostCall('switchTenant')
      .setUrlParams({
        'tenant': tenant
      })
      .send();
  }
}
