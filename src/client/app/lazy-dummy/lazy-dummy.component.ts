import { Component } from '@angular/core';

/**
 * To test the modules included only in lazy modules
 */
@Component({
  moduleId: module.id,
  selector: 'sd-lazy',
  template: `<app-header title="lazy2" ></app-header>`
})
export class LazyDummyComponent  {

}
