import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { NameListService } from '../shared/name-list/index';

@NgModule({
    imports: [CommonModule, SharedModule],
    declarations: [],
    exports: [],
    providers: [NameListService]
})
export class RRFModule { }
