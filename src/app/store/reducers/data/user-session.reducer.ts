import {USERS_PERMISSIONS_LOADED} from '../../actions/session.actions';
import {IUserSessionStore} from '../../stores/data/user-session.store';
import {IBaseAction} from '../../actions/base.action';
import {IUsersPermissionsLoadedAction} from '../../actions/session.actions';
import {initialUserSessionStore} from '../../stores/data/user-session.store';
import {ACTIVE_TENANTS_OF_USER_LOADED} from '../../actions/session.actions';
import {IActiveTenantsOfUserLoadedAction} from '../../actions/session.actions';
import {USER_IS_AUTHENTICATED} from '../../actions/session.actions';
import {IUserIsAuthenticatedAction} from '../../actions/session.actions';

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

    case ACTIVE_TENANTS_OF_USER_LOADED:
      newState = {
        user: state.user,
        tenantId: state.tenantId,
        tenants: (action as IActiveTenantsOfUserLoadedAction).tenants,
        permissions: state.permissions,
        userPreferences: state.userPreferences
      };
      break;

    case USER_IS_AUTHENTICATED:
      newState = {
        user: (action as IUserIsAuthenticatedAction).loggedInUser,
        tenantId: state.tenantId,
        tenants: state.tenants,
        permissions: state.permissions,
        userPreferences: state.userPreferences
      };
      break;

    default:
      newState = state;
      break;
  }
  return newState;
}
