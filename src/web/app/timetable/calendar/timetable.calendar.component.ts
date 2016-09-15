import { Component} from '@angular/core';
import { Router } from '@angular/router';
import {ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'timetable-calendar',
  templateUrl: 'timetable.calendar.component.html',
  directives: [ROUTER_DIRECTIVES],
  styleUrls: ['timetable.calendar.component.css']
})

export class CalendarComponent {
  example:string = "yanan";


}
