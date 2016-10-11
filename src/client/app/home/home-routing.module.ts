import { RouterModule } from '@angular/router';
import { HomeComponent } from './index';

export const HomeRoutingModule = RouterModule.forChild([
  {
    path: '',
    component: HomeComponent
  }
]);
