import { TestComponentBuilder } from '@angular/compiler/testing';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { Component } from '@angular/core';
import {
  inject,
  async
} from '@angular/core/testing';
import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';

import { PeopleComponent } from './people.component';

export function main() {
  describe('People component', () => {
    // Disable old forms
    let providerArr: any[];

    beforeEach(() => { providerArr = [disableDeprecatedForms(), provideForms()]; });

    it('should work',
      async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        tcb.overrideProviders(TestComponent, providerArr)
          .createAsync(TestComponent)
          .then((rootTC: any) => {
            let peopleDOMEl = rootTC.debugElement.children[0].nativeElement;

	    expect(getDOM().querySelectorAll(peopleDOMEl, 'h2')[0].textContent).toEqual('Features');
          });
        })));
    });
}

@Component({
  selector: 'test-cmp',
  directives: [PeopleComponent],
  template: '<sd-people></sd-people>'
})
class TestComponent {}
