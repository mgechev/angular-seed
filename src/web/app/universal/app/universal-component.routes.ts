import {HomeComponent} from "../home/universal-home.component";
import {NavBarComponent} from "../navbar/universal-navbar.component";
import {AboutComponent} from "../about/universal-about.component";

export const UniversalComponentRoutes = [
  {
    path: '',
    component: HomeComponent,
  }, {
    path: 'navbar',
    component: NavBarComponent,
    redirectTo: ''
  }, {
    path: 'about',
    component: AboutComponent,
  }
]
