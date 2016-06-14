import { Injectable } from '@angular/core';

@Injectable()
export class DataSharedService {
    checkedItemIds: Array<string> = [];

    setCheckedItems(itemIds: Array<string>) {
        this.checkedItemIds = itemIds;
    }

    getCheckedItems() {
        return this.checkedItemIds;
    }
}
