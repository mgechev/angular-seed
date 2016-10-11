import { RouterModule } from '@angular/router';
import { AboutComponent } from './index';

export const AboutRoutingModule = RouterModule.forChild([
  {
    path: '',
    component: AboutComponent
  }
]);
