import { Component} from '@angular/core';
import { Router } from '@angular/router';
import {ROUTER_DIRECTIVES } from '@angular/router';
import { NavBarComponent } from "../navbar/universal-navbar.component.ts"
import {HomeComponent} from "../home/universal-home.component";

@Component({
  moduleId: module.id,
  selector: 'universal',
  templateUrl: 'universal.component.html',
  directives: [ROUTER_DIRECTIVES, [HomeComponent]],
  styleUrls: ["universal.component.css"]
})

export class UniversalComponent {

}
