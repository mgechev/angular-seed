import { Injectable } from '@angular/core';
@Injectable()
export class MyProfilesDataSharedService {
    checkedItemIds : Array<string>;
    constructor() {
        this.checkedItemIds = new Array<string>();
     }
    setCheckedItems(itemIds:Array<string>) {
        this.checkedItemIds = itemIds;
    }

    getCheckedItems() {
        return this.checkedItemIds;
    }

    clearItemIds() {
        this.checkedItemIds = new Array<string>();
    }
}
