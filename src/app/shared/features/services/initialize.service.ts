import {Store} from '../../../store/store';
import {Injectable} from 'angular2/core';
import {UserAuthorizationService} from '../../stubs/services/user-authorization.service';
import {AuthenticationStore} from '../authentication/authentication.store';

@Injectable()
export class InitializeService {
  constructor(private store:Store, private userAuthorizationService:UserAuthorizationService) {

    //let self:InitializeService = this;

    // listen for changed store and check, if a backend call is needed
    store.subscribe(function ():void {
      let authenticationStore:AuthenticationStore = store.getFeatureStore<AuthenticationStore>('authentication');

      switch (authenticationStore.ui.state) {
        /*case UiSessionStateEnum.VALID_SESSION_REQUIRED:
         self.userAuthorizationService.getPermissions();
         break;*/

        default:
          // do nothing here
          break;
      }
    });
  }
}
