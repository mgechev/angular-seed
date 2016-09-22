//component imports.
import { TimetableComponent } from "./timetable.component";
import { CalendarComponent } from "../calendar/timetable-calendar.component";
import { PeopleComponent } from "../people/timetable-people.component";
import { ScheduleComponent } from "../schedule/timetable-schedule.component";
import {NavBarComponent} from "../../universal/navbar/universal-navbar.component";

export const TimetableRoutes = [
  {
    path: 'meetingsync',
    component: TimetableComponent,
  }, {
    path: 'meetingsync/calendar',
    component: CalendarComponent,
    redirectTo: 'meetingsync'
  }, {
    path: 'meetingsync/people',
    component: PeopleComponent,
    redirectTo: 'meetingsync'
  }, {
    path: 'meetingsync/schedule',
    component: ScheduleComponent,
    redirectTo: 'meetingsync'
  }
]
