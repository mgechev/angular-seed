export interface IAssignmentsStore {
  usergroupsUsersRelation: Object;
  usergroupsTenantsRelation: Object;
  usergroupsRolesRelation: Object;
}
export const initialAssignmentsStore:IAssignmentsStore = {
  usergroupsUsersRelation: null,
  usergroupsTenantsRelation: null,
  usergroupsRolesRelation: null
};
