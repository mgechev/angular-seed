import {provideRouter, RouterConfig} from "@angular/router";
import {TimetableRoutes} from "../../timetable/app/timetable.routes"
import {UniversalRoutes} from "../../universal/app/universal.routes"

const routes: RouterConfig = [
  ...UniversalRoutes
]

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
]
