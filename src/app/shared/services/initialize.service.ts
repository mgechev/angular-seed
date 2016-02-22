import {Store} from '../../../store/store';
import {Injectable} from 'angular2/core';
import {appInitialized} from '../../../store/actions/app.actions';
import {UserAuthorizationService} from '../stubs/services/user-authorization.service';
import {AuthPermissionDto} from '../stubs/dtos/auth-permission-dto';
import {usersPermissionsLoaded} from '../../../store/actions/session.actions';

@Injectable()
export class InitializeService {
  constructor(private store:Store, private userAuthorizationService:UserAuthorizationService) {
  }

  public initialize():void {
    this.getUsersPermissions();
  }

  private getUsersPermissions():void {
    var self:InitializeService = this;

    self.userAuthorizationService.getPermissions()
      .subscribe(function (usersPermissions:Array<AuthPermissionDto>):void {
        self.store.dispatch(usersPermissionsLoaded(usersPermissions));
        self.store.dispatch(appInitialized());
      });
  }
}
