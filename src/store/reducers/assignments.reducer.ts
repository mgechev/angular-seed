import {SERVICE_ACTION_FINISHED} from '../actions/services';
import {initialAssignmentsStore} from '../stores/assignments.store';
import {IAssignmentsStore} from '../stores/assignments.store';

export function assignmentsState(assignmentsState:IAssignmentsStore = initialAssignmentsStore, action) {
  switch (action.type) {
    case SERVICE_ACTION_FINISHED:
      if (action.endpoint === '/mocks/usergroups-users.json') {
        return {
          usergroupsRolesRelation: assignmentsState.usergroupsRolesRelation,
          usergroupsTenantsRelation: assignmentsState.usergroupsTenantsRelation,
          usergroupsUsersRelation: action.result
        };
      } else {
        return assignmentsState;
      }
    default:
      return assignmentsState;
  }
}
