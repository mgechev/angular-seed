import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from '../shared/for_lazy/header.module';

import { LazyComponent } from './lazy.component';
import { LazyRoutingModule } from './lazy-routing.module';

@NgModule({
  imports: [CommonModule, LazyRoutingModule, HeaderModule],
  declarations: [LazyComponent],
  exports: [LazyComponent]
})
export class LazyModule { }
