export const MAIN_NAVIGATION_ITEM_CLICKED:string = 'MAIN_NAVIGATION_ITEM_CLICKED';
export const SECONDARY_NAVIGATION_ITEM_CLICKED:string = 'MAIN_NAVIGATION_ITEM_CLICKED';
export const ADMINISTRATION_NAVIGATION_ITEM_CLICKED:string = 'ADMINISTRATION_NAVIGATION_ITEM_CLICKED';

export function mainNavigationItemClicked(key:string) {
  return {
    type: MAIN_NAVIGATION_ITEM_CLICKED,
    key
  };
}

export function secondaryNavigationItemClicked(key:string) {
  return {
    type: SECONDARY_NAVIGATION_ITEM_CLICKED,
    key
  };
}

export function administrationNavigationItemClicked(key:string) {
  return {
    type: ADMINISTRATION_NAVIGATION_ITEM_CLICKED,
    key
  };
}
