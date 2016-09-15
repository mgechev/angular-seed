import { Component} from '@angular/core';
import { Router } from '@angular/router';
import {ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'timetable-people',
  templateUrl: 'timetable.people.component.html',
  directives: [ROUTER_DIRECTIVES],
  //styleUrls: ['file name of CSS']
})

export class PeopleComponent {
  emails: string[] = ["phazeblade@hotmail.com", "Patrick@no.this.is.patrick.com", "Praveal.lal@live.com", "Shoar@ShoarAgainstWar.com"]
  
}
