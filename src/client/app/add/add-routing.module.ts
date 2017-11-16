import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddComponent } from './add.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'add', component: AddComponent }
    ])
  ],
  exports: [RouterModule]
})
export class AddRoutingModule { }
