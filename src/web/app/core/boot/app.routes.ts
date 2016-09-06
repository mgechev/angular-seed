import {provideRouter, RouterConfig} from "@angular/router";
import {TimetableRoutes} from "../../timetable/timetable.routes"

const routes: RouterConfig = [
  ...TimetableRoutes
]

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
]
