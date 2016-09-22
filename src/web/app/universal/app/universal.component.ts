import { Component} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from "@angular/router"
import { HTTP_PROVIDERS } from '@angular/http';
import { NavBarComponent } from "../navbar/universal-navbar.component.ts"
import {HomeComponent} from "../home/universal-home.component";



@Component({
  moduleId: module.id,
  selector: 'universal',
  viewProviders: [HTTP_PROVIDERS],
  templateUrl: 'universal.component.html',
  directives: [ROUTER_DIRECTIVES],
  styleUrls: ["universal.component.css"]
})

export class UniversalComponent {

}
