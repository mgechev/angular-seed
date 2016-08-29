import { Injectable } from '@angular/core';
import { MasterData } from  '../../../shared/model/index';


@Injectable()
export class DataSharedService {
    checkedItemIds: Array<MasterData> = [];

    setCheckedItems(itemIds: Array<MasterData>) {
        for (var index = 0; index < itemIds.length; index++) {
            this.checkedItemIds.push(itemIds[index]);
        }
    }

    getCheckedItems() {
        return this.checkedItemIds;
    }
}
