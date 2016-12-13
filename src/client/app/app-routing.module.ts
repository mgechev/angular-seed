import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([
       { path: 'lazy-about', loadChildren: 'app/+about/lazy-about.module#LazyAboutModule' }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

