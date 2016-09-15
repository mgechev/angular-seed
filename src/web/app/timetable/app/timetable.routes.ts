//component imports.
import { TimetableComponent } from "./timetable.component";
import { CalendarComponent } from "../calendar/timetable.calendar.component";
import { PeopleComponent } from "../people/timetable.people.component";
import { ScheduleComponent } from "../schedule/timetable.schedule.component";

export const TimetableRoutes = [
  {
    path: '',
    component: TimetableComponent,
  }, {
    path: 'meetingsync/calendar',
    component: CalendarComponent
  }, {
    path: 'meetingsync/people',
    component: PeopleComponent
  }, {
    path: 'meetingsync/schedule',
    component: ScheduleComponent
  }
]
