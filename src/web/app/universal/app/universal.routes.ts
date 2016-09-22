import {NavBarComponent} from "../navbar/universal-navbar.component";
import {HomeComponent} from "../home/universal-home.component"
import {UniversalComponent} from "./universal.component";
import {TimetableRoutes} from "../../timetable/app/timetable.routes"
import {UniversalComponentRoutes} from "./universal-component.routes";

export const UniversalRoutes = [
  {
    path: '',
    component: UniversalComponent,
    index: true,
    children: [
      ...TimetableRoutes,
      ...UniversalComponentRoutes
    ]
  }
]
