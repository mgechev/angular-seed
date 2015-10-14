import {
  AsyncTestCompleter,
  TestComponentBuilder,
  describe,
  expect,
  inject,
  it,
} from 'angular2/test_lib';
import {Component, View} from 'angular2/angular2';
// import {DOM} from 'angular2/src/core/dom/dom_adapter';
import {AppCmp} from './app';

export function main() {
  describe('App component', () => {
    it('should work',
      inject([TestComponentBuilder, AsyncTestCompleter], (tcb: TestComponentBuilder, async) => {
        tcb.overrideTemplate(TestComponent, '<div><home></home></div>')
          .createAsync(TestComponent)
          .then((rootTC) => {
            let elRef = rootTC.debugElement.elementRef;

            // TODO: Add navigation testing?

            expect(elRef).not.toBeNull(true);

            async.done();
          });
      }));
  });
}

@Component({selector: 'test-cmp'})
@View({directives: [AppCmp]})
class TestComponent {}
