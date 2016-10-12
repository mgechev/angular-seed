import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

export const HomeRoutingModule = RouterModule.forChild([
  {
    path: '',
    component: HomeComponent
  }
]);
