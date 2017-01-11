import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from '../shared/for_lazy/header.module';

import { LazyAboutComponent } from './lazy-about.component';
import { LazyAboutRoutingModule } from './lazy-about-routing.module';

@NgModule({
  imports: [CommonModule, LazyAboutRoutingModule, HeaderModule],
  declarations: [LazyAboutComponent],
  exports: [LazyAboutComponent]
})
export class LazyAboutModule { }
