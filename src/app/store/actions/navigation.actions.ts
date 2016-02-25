import {Action} from './base.action';

export const MAIN_NAVIGATION_ITEM_CLICKED:string = 'MAIN_NAVIGATION_ITEM_CLICKED';
export interface IMainNavigationItemClickedAction extends Action {
  key:string;
}

export const SECONDARY_NAVIGATION_ITEM_CLICKED:string = 'MAIN_NAVIGATION_ITEM_CLICKED';
export interface ISecondaryNavigationItemClickedAction extends Action {
  key:string;
}
export const ADMINISTRATION_NAVIGATION_ITEM_CLICKED:string = 'ADMINISTRATION_NAVIGATION_ITEM_CLICKED';
export interface IAdministrationNavigationItemClickedAction extends Action {
  key:string;
}

export function mainNavigationItemClicked(key:string):IMainNavigationItemClickedAction {
  return {
    type: MAIN_NAVIGATION_ITEM_CLICKED,
    key
  };
}

export function secondaryNavigationItemClicked(key:string):ISecondaryNavigationItemClickedAction {
  return {
    type: SECONDARY_NAVIGATION_ITEM_CLICKED,
    key
  };
}

export function administrationNavigationItemClicked(key:string):IAdministrationNavigationItemClickedAction {
  return {
    type: ADMINISTRATION_NAVIGATION_ITEM_CLICKED,
    key
  };
}
