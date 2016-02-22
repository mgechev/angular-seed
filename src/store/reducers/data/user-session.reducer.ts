import {USERS_PERMISSIONS_LOADED} from '../../actions/session.actions';
import {IUserSessionStore} from '../../stores/data/user-session.store';
import {initialUserSessionStore} from '../../stores/data/user-session.store';
import {IBaseAction} from '../../actions/base.action';
import {IUsersPermissionsLoadedAction} from '../../actions/session.actions';

export function userSessionReducer(state:IUserSessionStore = initialUserSessionStore, action:IBaseAction):IUserSessionStore {
  let newState:IUserSessionStore;
  switch (action.type) {
    case USERS_PERMISSIONS_LOADED:
      newState = {
        user: state.user,
        tenantId: state.tenantId,
        tenants: state.tenants,
        permissions: (action as IUsersPermissionsLoadedAction).permissions,
        userPreferences: state.userPreferences
      };
      break;

    default:
      newState = state;
      break;
  }
  return newState;
}
