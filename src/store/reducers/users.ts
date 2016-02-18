import {SERVICE_ACTION_FINISHED} from '../actions/services';

const initialUsersState = {
  state: 'empty',
  usersList: []
};

function usersState(usersState, action) {

  if (!usersState) return initialUsersState;

  let newState;

  switch(action.type) {
    case SERVICE_ACTION_FINISHED:
      if(action.endpoint === '/mocks/users.json') {
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

export {initialUsersState};
export {usersState};
