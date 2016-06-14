import { TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import {
  describe,
  expect,
  inject,
  it
} from '@angular/core/testing';
import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';

import { LazyComponent } from './lazy.component';

export function main() {
  describe('Lazy component', () => {


    it('should work',
      inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        tcb.createAsync(TestComponent)
          .then((rootTC: any) => {
            let lazyDOMEl = rootTC.debugElement.children[0].nativeElement;

	    expect(getDOM().querySelectorAll(lazyDOMEl, 'h2')[0].textContent).toEqual('How to configure a lazy module?');
          });
        }));
    });
}

@Component({
  selector: 'test-cmp',
  directives: [LazyComponent],
  template: '<sd-lazy></sd-lazy>'
})
class TestComponent {}
