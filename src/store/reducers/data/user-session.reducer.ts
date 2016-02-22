import {USERS_PERMISSIONS_LOADED} from '../../actions/session';
import {IUserSessionStore} from '../../stores/data/user-session.store';
import {initialUserSessionStore} from '../../stores/data/user-session.store';

export function userSessionReducer(state:IUserSessionStore = initialUserSessionStore, action:any):IUserSessionStore {
  let newState:IUserSessionStore;
  switch (action.type) {
    case USERS_PERMISSIONS_LOADED:
      newState = {
        user: state.user,
        tenantId: state.tenantId,
        tenants: state.tenants,
        permissions: action.permissions,
        userPreferences: state.userPreferences
      };
      break;

    default:
      newState = state;
      break;
  }
  return newState;
}
