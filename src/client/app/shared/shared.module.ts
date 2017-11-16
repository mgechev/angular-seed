import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { HttpModule } from '@angular/http';

import { HeaderComponent } from './components/header/header.component';
import { SocialComponent } from './components/social/social.component';
import { FindMapComponent } from './components/findMap/findMap.component';
import { AddMapComponent } from './components/addMap/addMap.component';
import { FormComponent } from './components/form/form.component';
import { FormStepComponent } from './components/form/form-step.component';

import { DirectionsMapDirective } from './directives/directions.directive';

import { RouteBoxerService } from './services/routeboxer/routeboxer.service';
import { LocationsService } from './services/locations/locations.service';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule,
            AgmCoreModule.forRoot({
              apiKey: 'AIzaSyA-2Qvfc-Qj1sgX0Mpp4FKz8L86d5ycF5U',
              libraries: ['places']
            }),
            BrowserModule, FormsModule,
            ReactiveFormsModule, HttpModule],
  declarations: [SocialComponent,
                 HeaderComponent, AddMapComponent,
                 FindMapComponent, DirectionsMapDirective,
                 FormComponent, FormStepComponent],
  exports: [SocialComponent,
            HeaderComponent, AddMapComponent,
            FindMapComponent, CommonModule,
            FormsModule, RouterModule,
            FormComponent, FormStepComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [RouteBoxerService, LocationsService]
    };
  }
}
