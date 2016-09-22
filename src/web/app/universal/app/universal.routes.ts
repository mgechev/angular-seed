import {NavBarComponent} from "../navbar/universal-navbar.component";
import {HomeComponent} from "../home/universal-home.component"
import {UniversalComponent} from "./universal.component";
import {TimetableRoutes} from "../../timetable/app/timetable.routes"

export const UniversalRoutes = [
  {
    path: '',
    component: NavBarComponent,
    index: true,
    children: [
      ...TimetableRoutes
    ]
  }
]
