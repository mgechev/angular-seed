import {Action} from './base.action';

export const MAIN_NAVIGATION_ITEM_CLICKED:string = 'MAIN_NAVIGATION_ITEM_CLICKED';
export const SECONDARY_NAVIGATION_ITEM_CLICKED:string = 'MAIN_NAVIGATION_ITEM_CLICKED';
export const ADMINISTRATION_NAVIGATION_ITEM_CLICKED:string = 'ADMINISTRATION_NAVIGATION_ITEM_CLICKED';

export function mainNavigationItemClicked(key:string):Action<string> {
  return {
    type: MAIN_NAVIGATION_ITEM_CLICKED,
    payload: key
  };
}

export function secondaryNavigationItemClicked(key:string):Action<string> {
  return {
    type: SECONDARY_NAVIGATION_ITEM_CLICKED,
    payload: key
  };
}

export function administrationNavigationItemClicked(key:string):Action<string> {
  return {
    type: ADMINISTRATION_NAVIGATION_ITEM_CLICKED,
    payload: key
  };
}
