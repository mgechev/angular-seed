import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VatComponent } from './vat.component';
import {SharedModule} from "../../shared/shared.module";
import {CostMatchService} from "../../shared/services/cost-match.service";

@NgModule({
    imports: [CommonModule, SharedModule],
    declarations: [VatComponent],
    exports: [VatComponent],
    providers: [CostMatchService]
})

export class VatModule { }
