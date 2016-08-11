import { TestComponentBuilder } from '@angular/compiler/testing';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { Component } from '@angular/core';
import {
  inject,
  async
} from '@angular/core/testing';
import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';

import { AboutComponent } from './about.component';

export function main() {
  describe('About component', () => {
    // Disable old forms
    let providerArr: any[];

    beforeEach(() => { providerArr = [disableDeprecatedForms(), provideForms()]; });

    it('should work',
      async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        tcb.overrideProviders(TestComponent, providerArr)
          .createAsync(TestComponent)
          .then((rootTC: any) => {
            let aboutDOMEl = rootTC.debugElement.children[0].nativeElement;

	    expect(getDOM().querySelectorAll(aboutDOMEl, 'h2')[0].textContent).toEqual('Features');
          });
        })));
    });
}

@Component({
  selector: 'test-cmp',
  directives: [AboutComponent],
  template: '<sd-about></sd-about>'
})
class TestComponent {}
