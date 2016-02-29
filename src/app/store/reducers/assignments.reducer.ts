import {OLD_SERVICE_ACTION_FINISHED} from '../actions/services.actions';
import {IAssignmentsStore} from '../stores/assignments.store';
import {Action} from '../actions/base.action';
import {initialAssignmentsStore} from '../stores/assignments.store';
import {IOldServiceActionPayload} from '../actions/services.actions';

export function assignmentsStateReducer(assignmentsState:IAssignmentsStore = initialAssignmentsStore,
                                        action:Action<any>):IAssignmentsStore {
  let newState:IAssignmentsStore;
  switch (action.type) {
    case OLD_SERVICE_ACTION_FINISHED:
      if ((action as Action<IOldServiceActionPayload>).payload.endpoint === '/mocks/usergroups-users.json') {
        newState = {
          usergroupsRolesRelation: assignmentsState.usergroupsRolesRelation,
          usergroupsTenantsRelation: assignmentsState.usergroupsTenantsRelation,
          usergroupsUsersRelation: (action as Action<IOldServiceActionPayload>).payload.result
        };
      } else {
        newState = assignmentsState;
      }
      break;
    default:
      newState = assignmentsState;
  }
  return newState;
}
