import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([
       { path: 'lazy-about', loadChildren: 'app/lazy-about/lazy-about.module#LazyAboutModule' },
       { path: 'lazy', loadChildren: 'app/lazy-dummy/lazy-dummy.module#LazyDummyModule' }
        //To test the modules included only in lazy modules
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

