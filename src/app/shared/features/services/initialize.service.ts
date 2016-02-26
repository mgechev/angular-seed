import {Store} from '../../../store/store';
import {Injectable} from 'angular2/core';
import {UserAuthorizationService} from '../../stubs/services/user-authorization.service';
import {IUiStore} from '../../../store/stores/ui.store';

@Injectable()
export class InitializeService {
  constructor(private store:Store, private userAuthorizationService:UserAuthorizationService) {

    //let self:InitializeService = this;

    // listen for changed store and check, if a backend call is needed
    store.subscribe(function ():void {
      let uiStore:IUiStore = store.getUiStore();

      switch (uiStore.session.state) {
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
