import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LazyAboutComponent } from './lazy-about.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: LazyAboutComponent }
    ])
  ],
  exports: [RouterModule]
})
export class LazyAboutRoutingModule { }
