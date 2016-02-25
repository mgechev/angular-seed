import {SERVICE_ACTION_FINISHED} from '../actions/services.actions';
import {IAssignmentsStore} from '../stores/assignments.store';
import {Action} from '../actions/base.action';
import {initialAssignmentsStore} from '../stores/assignments.store';
import {IServiceActionPayload} from '../actions/services.actions';

export function assignmentsStateReducer(assignmentsState:IAssignmentsStore = initialAssignmentsStore,
                                        action:Action<any>):IAssignmentsStore {
  let newState:IAssignmentsStore;
  switch (action.type) {
    case SERVICE_ACTION_FINISHED:
      if ((action as Action<IServiceActionPayload>).payload.endpoint === '/mocks/usergroups-users.json') {
        newState = {
          usergroupsRolesRelation: assignmentsState.usergroupsRolesRelation,
          usergroupsTenantsRelation: assignmentsState.usergroupsTenantsRelation,
          usergroupsUsersRelation: (action as Action<IServiceActionPayload>).payload.result
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
