export interface IUsersStore {
  state:string;
  usersList:Array<any>;
}
export const initialUsersStore:IUsersStore = {
  state: 'empty',
  usersList: []
};
