import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VatComponent } from './vat.component';
import {SharedModule} from "../../shared/shared.module";
import {CostMatchService} from "../../shared/services/cost-match.service";
import {CostTypeSelector, KeysPipe} from "../../shared/selectors/cost-type.selector";
import {VatTypeSelector} from "../../shared/selectors/vat-type.selector";
import {CostCharacterSelector} from "../../shared/selectors/cost-character.selector";
import {Ng2TableModule} from "ng2-table/ng2-table";
import {PaginationModule} from "ng2-bootstrap/ng2-bootstrap";
import {VatCalculationService} from "../../shared/services/vat-calculation.service";
import {TransactionTableComponent} from "./transaction-table.component";

@NgModule({
    imports: [
      CommonModule,
      SharedModule,
      Ng2TableModule,
      PaginationModule,
    ],
    declarations: [
      VatComponent,
      TransactionTableComponent
    ],
    exports: [VatComponent],
    providers: [
      CostMatchService,
      VatCalculationService,
      TransactionTableComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class VatModule { }
