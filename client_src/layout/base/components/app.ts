import {Component, ViewEncapsulation} from "angular2/core";
import {
    RouteConfig,
    ROUTER_DIRECTIVES
} from "angular2/router";

import {LoginCmp} from "../../../pages/login/components/login";
import {SignupCmp} from "../../../pages/signup/components/signup";
import {DashboardCmp} from "../../dashboard/components/dashboard";

@Component({
  // selector: "app",
  selector: "sd-app",
  templateUrl: "/layout/base/components/app.html",
  styleUrls: ["/layout/base/components/app.css"],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: "/", component: LoginCmp, as: "Login", useAsDefault: true},
  { path: "/signup", component: SignupCmp, as: "Signup" },
  { path: "/dashboard/...", component: DashboardCmp, as: "Dashboard" }
])
export class AppCmp { }
