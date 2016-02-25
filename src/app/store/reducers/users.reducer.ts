import {OLD_SERVICE_ACTION_FINISHED} from '../actions/services.actions';
import {IUsersStore} from '../stores/users.store';
import {Action} from '../actions/base.action';
import {initialUsersStore} from '../stores/users.store';
import {IOldServiceActionPayload} from '../actions/services.actions';

export function usersStateReducer(usersState:IUsersStore = initialUsersStore, action:Action<any>):IUsersStore {
  let newState;

  switch (action.type) {
    case OLD_SERVICE_ACTION_FINISHED:
      if ((action as Action<IOldServiceActionPayload>).payload.endpoint === '/mocks/users.json') {
        newState = {
          state: 'loaded',
          usersList: (action as Action<IOldServiceActionPayload>).payload.result
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
