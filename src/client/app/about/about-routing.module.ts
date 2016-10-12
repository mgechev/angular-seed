import { RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';

export const AboutRoutingModule = RouterModule.forChild([
  {
    path: '',
    component: AboutComponent
  }
]);
