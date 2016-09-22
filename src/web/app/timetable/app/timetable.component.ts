import { Component} from '@angular/core';
import { Router } from '@angular/router';
import {ROUTER_DIRECTIVES } from '@angular/router';
import { CalendarComponent } from "../calendar/timetable-calendar.component";
import { ScheduleComponent } from "../schedule/timetable-schedule.component";
import { PeopleComponent } from "../people/timetable-people.component";
import { NavBarComponent } from "../../universal/navbar/universal-navbar.component"


@Component({
  moduleId: module.id,
  selector: 'timetable',
  templateUrl: 'timetable.component.html',
  directives: [ROUTER_DIRECTIVES, [CalendarComponent, PeopleComponent, ScheduleComponent, NavBarComponent]],
  styleUrls: ["timetable.component.css"]
})

export class TimetableComponent {
    example:boolean = true;

}
