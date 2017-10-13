import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';

// import { ExceptionService } from './exception.service';
// import { LoggerService } from './logger.service';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { WindowRef } from './window.service';

/**
 * @link{https://angular.io/guide/styleguide#core-feature-module Core feature module}
 */
@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    // ExceptionService
    // LoggerService
    WindowRef
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
