import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { restFormComponent } from './restForm.component';

@NgModule({
  imports: [
    RouterModule.forChild([
          { path: 'restform', component: restFormComponent }
    ])
  ],
  exports: [RouterModule]
})
export class restFormRoutingModule { }
