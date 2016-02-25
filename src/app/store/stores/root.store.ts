import {IAssignmentsStore, initialAssignmentsStore} from './assignments.store';
import {IUsersStore,initialUsersStore} from './users.store';
import {IDataStore,initialDataStore} from './data.store';
import {IUiStore,initialUiStore} from './ui.store';
import {initialActiveModuleStore} from './modules.store';

export interface IRootStore {
  data: IDataStore;
  activeModule: string;
  ui: IUiStore;
  usersState: IUsersStore;
  assignmentsState: IAssignmentsStore;
}

export const initialRootStore:IRootStore = {
  data: initialDataStore,
  activeModule: initialActiveModuleStore,
  ui: initialUiStore,
  usersState: initialUsersStore,
  assignmentsState: initialAssignmentsStore
};
