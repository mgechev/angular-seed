import {HomeComponent} from "../home/universal-home.component";
import {NavBarComponent} from "../navbar/universal-navbar.component";

export const UniversalComponentRoutes = [
  {
    path: '',
    component: HomeComponent,
  }, {
    path: 'navbar',
    component: NavBarComponent,
    redirectTo: ''
  }
]
