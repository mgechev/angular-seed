import {SERVICE_ACTION_FINISHED} from '../actions/services.actions';
import {IAssignmentsStore} from '../stores/assignments.store';
import {IBaseAction} from '../actions/base.action';
import {IServiceActionFinishedAction} from '../actions/services.actions';
import {initialAssignmentsStore} from '../stores/assignments.store';

export function assignmentsStateReducer(assignmentsState:IAssignmentsStore = initialAssignmentsStore,
                                        action:IBaseAction):IAssignmentsStore {
  let newState:IAssignmentsStore;
  switch (action.type) {
    case SERVICE_ACTION_FINISHED:
      if ((action as IServiceActionFinishedAction).endpoint === '/mocks/usergroups-users.json') {
        newState = {
          usergroupsRolesRelation: assignmentsState.usergroupsRolesRelation,
          usergroupsTenantsRelation: assignmentsState.usergroupsTenantsRelation,
          usergroupsUsersRelation: (action as IServiceActionFinishedAction).result
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
