import {Injectable} from 'angular2/core';
import {Store} from '../../../store/store';
import {LoginService} from '../../stubs/services/login.service';
import 'rxjs/operator/map';
import 'rxjs/operator/distinctUntilChanged';
import {observableFromStore} from '../../../store/observableFromStore';
import {UiSessionStateEnum} from '../authentication/authentication.store';
import {AuthenticationStore} from '../authentication/authentication.store';

@Injectable()
export class AuthenticationService {
  constructor(private store:Store, private loginService:LoginService) {
    let self:AuthenticationService = this;

    let switchToTenant$ = observableFromStore(store)
      .map(store => store.features.authentication.ui.switchToTenant)
      .distinctUntilChanged();

    switchToTenant$.subscribe(switchToTenant => {
      if (switchToTenant) {
        this.loginService.switchTenant(switchToTenant.name);
      }
    });

    // listen for changed store and check, if a backend call is needed
    store.subscribe(function ():void {
      let authenticationStore:AuthenticationStore = store.getFeatureStore<AuthenticationStore>('authentication');

      switch (authenticationStore.ui.state) {
        case UiSessionStateEnum.VALID_SESSION_REQUIRED:
          self.loginService.hasLoggedInUser();
          break;

        case UiSessionStateEnum.BACKEND_HAS_VALID_SESSION:
          self.loginService.getLoggedInUser();
          break;

        case UiSessionStateEnum.USERNAME_ENTERED:
          self.loginService.findActiveTenantsByUser(authenticationStore.ui.username);
          break;

        case UiSessionStateEnum.LOGIN_CLICKED:
          self.loginService.authenticate(authenticationStore.ui.username, authenticationStore.ui.password, authenticationStore.ui.tenant);
          break;

        case UiSessionStateEnum.SESSION_VALID:
          if (authenticationStore.ui.username && !authenticationStore.ui.tenant) {
            self.loginService.findActiveTenantsByUser(authenticationStore.ui.username);
          }
          break;

        case UiSessionStateEnum.LOGOUT_CLICKED:
          self.loginService.logout();
          break;

        case UiSessionStateEnum.SESSION_INVALID:
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
}
