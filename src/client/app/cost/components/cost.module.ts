import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {CostComponent} from "./cost.component";
import {CostService} from "../../shared/services/cost.service";
import {PaginationModule} from "ng2-bootstrap";
import {Ng2TableModule} from "ng2-table";
import {CostTableComponent} from "./cost-table.component";
import {SharedModule} from "../../shared/shared.module";
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [
      CommonModule,
      SharedModule,
      Ng2TableModule,
      PaginationModule
    ],
    declarations: [
      CostComponent,
      CostTableComponent
    ],
    exports: [CostComponent],
    providers: [
      CostService,
      CostTableComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class CostModule { }
