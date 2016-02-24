import {IAssignmentsStore, initialAssignmentsStore} from './assignments.store';
import {IUsersStore,initialUsersStore} from './users.store';
import {ISessionStore,initialSessionStore} from './session.store';
import {IDataStore,initialDataStore} from './data.store';
import {IUiStateStore,initialUiStateStore} from './ui-state.store';
import {initialActiveModuleStore} from './modules.store';

export interface IRootStore {
  data: IDataStore;
  activeModule: string;
  uiState: IUiStateStore;
  sessionState: ISessionStore;
  usersState: IUsersStore;
  assignmentsState: IAssignmentsStore;
}

export const initialRootStore:IRootStore = {
  data: initialDataStore,
  activeModule: initialActiveModuleStore,
  uiState: initialUiStateStore,
  sessionState: initialSessionStore,
  usersState: initialUsersStore,
  assignmentsState: initialAssignmentsStore
};
