import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LazyDummyComponent } from './lazy-dummy.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: LazyDummyComponent }
    ])
  ],
  exports: [RouterModule]
})
export class LazyDummyRoutingModule { }
