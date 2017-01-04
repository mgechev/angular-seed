import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NameListService } from '../shared/name-list/name-list.service';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, SharedModule],
  declarations: [HomeComponent],
  exports: [HomeComponent],
  providers: [NameListService]
})
export class HomeModule { }
