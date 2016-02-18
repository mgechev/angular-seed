import {SERVICE_ACTION_FINISHED} from '../actions/services';

const initialAssignmentsState = {
  usergroupsUsersRelation: null,
  usergroupsTenantsRelation: null,
  usergroupsRolesRelation: null
};

function assignmentsState(assignmentsState, action) {
  if (!assignmentsState) {
    return initialAssignmentsState;
  }
  switch(action.type) {
    case SERVICE_ACTION_FINISHED:
      if(action.endpoint === '/mocks/usergroups-users.json') {
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

export {initialAssignmentsState};
export {assignmentsState};
