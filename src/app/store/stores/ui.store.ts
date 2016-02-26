import {IAppStore,initialAppStore} from './ui/app.store';
import {IGlobalStore,initialGlobalStore} from './ui/global.store';
import {ISessionStore,initialSessionStore} from './ui/session.store';

export interface IUiStore {
  global:IGlobalStore;
  app:IAppStore;
  session:ISessionStore;
}

export const initialUiStore:IUiStore = {
  global: initialGlobalStore,
  app: initialAppStore,
  session: initialSessionStore
};
