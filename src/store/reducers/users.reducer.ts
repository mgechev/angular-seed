import {SERVICE_ACTION_FINISHED} from '../actions/services';
import {IUsersStore} from '../stores/users.store';
import {initialUsersStore} from '../stores/users.store';

export function usersStateReducer(usersState:IUsersStore = initialUsersStore, action) {
  let newState;

  switch (action.type) {
    case SERVICE_ACTION_FINISHED:
      if (action.endpoint === '/mocks/users.json') {
        newState = {
          state: 'loaded',
          usersList: action.result
        };
      } else {
        newState = usersState;
      }
      break;

    default:
      newState = usersState;
  }
  return newState;

}
