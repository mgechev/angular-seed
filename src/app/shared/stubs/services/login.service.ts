import {BaseService} from './base/base.service';
import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {TenantLoginDto} from '../../../shared/stubs/dtos/tenant-login-dto';
import {UserLoginDto} from '../../../shared/stubs/dtos/user-login-dto';
import {
  backendUserInquiryInitialized,
  sessionUserExists,
  backendProvidedUsername,
  activeTenantsOfUserLoaded,
  userIsAuthenticated,
  backendAuthenticationInitialized
} from '../../../../store/actions/session.actions';
import {backendCallFails} from '../../../../store/actions/app.actions';
import {Store} from '../../../../store/store';

@Injectable()
export class LoginService extends BaseService {
  constructor(http:Http, private store:Store) {
    super(http);

    this.servicePath = 'login';
    this.version = 'v1';

    var self:LoginService = this;
    this.store.subscribe(() => {
      let sessionState = self.store.getSessionState();

      if(sessionState.loggedInUserRequired && !sessionState.backendUserInquiryInitialized) {
         self.hasLoggedInUser();
      }

      if(sessionState.sessionUserExists) {
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

  public getLoggedInUser() {
    let store:Store = this.store;

    this.newGetCall('getLoggedInUser')
      .send()
      .then(function (sessionUser:boolean):void {
        console.log('in getLoggedInUser, callback:');
        console.log(sessionUser);
        if (sessionUser && sessionUser.loginname) {
          store.dispatch(backendProvidedUsername(sessionUser.loginname));
        }
      });
  }

  public hasLoggedInUser() {
    let store:Store = this.store;
    store.dispatch(backendUserInquiryInitialized());

    this.newGetCall('hasLoggedInUser')
      .send()
      .then(function (hasLoggedInUser:boolean):void {
        if (hasLoggedInUser) {
          store.dispatch(sessionUserExists());
        }
      });
  }

  public logout() {
    return this.newPostCall('logout')
      .send();
  }

  public switchTenant(tenant:string) {
    return this.newPostCall('switchTenant')
      .setUrlParams({
        'tenant': tenant
      })
      .send();
  }
}
