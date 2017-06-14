import { NgModule } from '@angular/core';
import { restFormComponent } from './restForm.component';
import { restFormRoutingModule } from './restForm-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NameListService } from '../shared/name-list/name-list.service';

@NgModule({
    imports: [restFormRoutingModule, SharedModule],
  declarations: [restFormComponent],
  exports: [restFormComponent],
  providers: [NameListService]
})
export class RestFormModule { }
