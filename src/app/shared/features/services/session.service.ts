import {Injectable} from 'angular2/core';
import {Store} from '../../../store/store';
import {LoginService} from '../../stubs/services/login.service';
import {IUiStore} from '../../../store/stores/ui.store';
import {UiSessionStateEnum} from '../../../store/stores/ui/session.store';
import 'rxjs/operator/map';
import 'rxjs/operator/distinctUntilChanged';
import {observableFromStore} from '../../../store/observableFromStore';


@Injectable()
export class SessionService {
  constructor(private store:Store, private loginService:LoginService) {
    let self:SessionService = this;

    let username$ = observableFromStore(store).map(store => store.ui.session.switchToTenant).distinctUntilChanged();

    username$.subscribe(switchToTenant => { if (switchToTenant) {
      console.log('tenantSwitch changed to:'+ JSON.stringify(switchToTenant) );
      this.loginService.switchTenant(switchToTenant.name);
    }});





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
          self.loginService.authenticate(uiStore.session.username, uiStore.session.password, uiStore.session.tenant);
          break;

        case UiSessionStateEnum.SESSION_VALID:
          if(uiStore.session.username && !uiStore.session.tenant) {
            self.loginService.findActiveTenantsByUser(uiStore.session.username);
          }
          break;

        case UiSessionStateEnum.LOGOUT_CLICKED:
          self.loginService.logout();
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
}
