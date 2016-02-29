export interface AppInfo {
  initialized:boolean;
  dialogs:Array<Object>;
}

export interface NavigationItem {
  label:string;
  key:string;
}

export interface IAppStore {
  initialized:boolean;
  info:AppInfo;
  activeMainNavigationItem:NavigationItem;
  mainNavigation:Array<NavigationItem>;
  dialogs:Array<Object>;
}

export const initialAppStore:IAppStore = {
  initialized: false,
  info: null,
  activeMainNavigationItem: {
    key:'startpage',
    label:'startpage'
  },
  mainNavigation: [
    {key: 'startpage', label: 'Startpage'},
    {key: 'activities', label: 'Activities'},
    {key: 'manage', label: 'Manage'},
    {key: 'administration', label: 'Administration'}],
  dialogs: []
};
