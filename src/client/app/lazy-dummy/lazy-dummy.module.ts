import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from '../shared/for_lazy/header.module';

import { LazyDummyComponent } from './lazy-dummy.component';
import { LazyDummyRoutingModule } from './lazy-dummy-routing.module';

@NgModule({
  imports: [CommonModule, LazyDummyRoutingModule, HeaderModule],
  declarations: [LazyDummyComponent],
  exports: [LazyDummyComponent]
})
export class LazyDummyModule { }
