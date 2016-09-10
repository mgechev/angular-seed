import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VatComponent } from './vat.component';
import {SharedModule} from "../../shared/shared.module";
import {CostMatchService} from "../../shared/services/cost-match.service";
import {CostTypeSelector, KeysPipe} from "./cost-type.selector";
import {VatTypeSelector} from "./vat-type.selector";
import {CostCharacterSelector} from "./cost-character.selector";
import {Ng2TableModule} from "ng2-table/ng2-table";
import {PaginationModule} from "ng2-bootstrap/ng2-bootstrap";

@NgModule({
    imports: [
      CommonModule,
      SharedModule,
      Ng2TableModule,
      PaginationModule
    ],
    declarations: [
      VatComponent,
      KeysPipe,
      CostTypeSelector,
      VatTypeSelector,
      CostCharacterSelector
    ],
    exports: [VatComponent],
    providers: [CostMatchService],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class VatModule { }
