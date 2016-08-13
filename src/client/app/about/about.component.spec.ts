import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { Component } from '@angular/core';
import {
  async,
  TestBed
} from '@angular/core/testing';
import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';

import { AboutComponent } from './about.component';

export function main() {
   describe('About component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        providers: [disableDeprecatedForms(), provideForms()]
      });
    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            let aboutDOMEl = fixture.debugElement.children[0].nativeElement;

	          expect(getDOM().querySelectorAll(aboutDOMEl, 'h2')[0].textContent).toEqual('Features');
          });
        }));
    });
}

@Component({
  selector: 'test-cmp',
  directives: [AboutComponent],
  template: '<sd-about></sd-about>'
})
class TestComponent {}
