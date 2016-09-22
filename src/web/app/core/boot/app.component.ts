import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from "@angular/router"
import { Component, ApplicationRef} from "@angular/core"
import { TimetableComponent } from "../../timetable/app/timetable.component"
import { HTTP_PROVIDERS } from '@angular/http';
import {NavBarComponent} from "../../universal/navbar/universal-navbar.component";

@Component({
  moduleId: module.id,
  selector: 'ms-app',
  viewProviders: [HTTP_PROVIDERS],
  directives: [ROUTER_DIRECTIVES, [NavBarComponent]],
  templateUrl: 'app.component.html',
})

export class AppComponent {
  constructor() {
    console.log('Environment config');
  }
}
