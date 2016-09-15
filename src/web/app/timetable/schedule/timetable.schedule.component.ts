import { Component} from '@angular/core';
import { Router } from '@angular/router';
import {ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'timetable-schedule',
  templateUrl: 'timetable.schedule.component.html',
  directives: [ROUTER_DIRECTIVES],
  //styleUrls: ['file name of CSS']
})

export class ScheduleComponent {
  example:string = "yanan";


}
