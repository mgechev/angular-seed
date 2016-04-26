import {
  TestComponentBuilder,
  describe,
  expect,
  inject,
  it,
  AsyncTestCompleter
} from 'angular2/testing_internal';
import {Component} from 'angular2/core';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import {AboutComponent} from './about.component';

export function main() {
  describe('About component', () => {


    it('should work',
      inject([TestComponentBuilder, AsyncTestCompleter], (tcb: TestComponentBuilder, async: AsyncTestCompleter) => {
        tcb.createAsync(TestComponent)
          .then((rootTC: any) => {
            let aboutDOMEl = rootTC.debugElement.children[0].nativeElement;

            expect(DOM.querySelectorAll(aboutDOMEl, 'h2')[0].textContent).toEqual('Features');
            async.done();
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
