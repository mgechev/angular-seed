import {SERVICE_ACTION_FINISHED} from '../actions/services.actions';
import {IUsersStore} from '../stores/users.store';
import {Action} from '../actions/base.action';
import {IServiceActionFinishedAction} from '../actions/services.actions';
import {initialUsersStore} from '../stores/users.store';

export function usersStateReducer(usersState:IUsersStore = initialUsersStore, action:Action):IUsersStore {
  let newState;

  switch (action.type) {
    case SERVICE_ACTION_FINISHED:
      if ((action as IServiceActionFinishedAction).endpoint === '/mocks/users.json') {
        newState = {
          state: 'loaded',
          usersList: (action as IServiceActionFinishedAction).result
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
