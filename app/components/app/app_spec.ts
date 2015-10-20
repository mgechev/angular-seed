import {
  TestComponentBuilder,
  describe,
  expect,
  injectAsync,
  it,
} from 'angular2/testing';
import {Component, View} from 'angular2/angular2';
// import {DOM} from 'angular2/src/core/dom/dom_adapter';
import {AppCmp} from './app';

export function main() {
  describe('App component', () => {
    it('should work',
      injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb.overrideTemplate(TestComponent, '<div><home></home></div>')
          .createAsync(TestComponent)
          .then((rootTC) => {
            let elRef = rootTC.debugElement.elementRef;

            // TODO: Add navigation testing?

            expect(elRef).not.toBeNull(true);
          });
      }));
  });
}

@Component({selector: 'test-cmp'})
@View({directives: [AppCmp]})
class TestComponent {}
