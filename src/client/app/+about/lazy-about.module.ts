import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyAboutComponent } from './lazy-about.component';
import { LazyAboutRoutingModule } from './lazy-about-routing.module';

@NgModule({
  imports: [CommonModule, LazyAboutRoutingModule],
  declarations: [LazyAboutComponent],
  exports: [LazyAboutComponent]
})
export class LazyAboutModule { }
