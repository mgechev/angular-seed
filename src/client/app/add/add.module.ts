import { NgModule } from '@angular/core';
import { AddComponent } from './add.component';
import { AddRoutingModule } from './add-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule, AddRoutingModule],
  declarations: [AddComponent],
  exports: [AddComponent],
  providers: []
})
export class AddModule { }
