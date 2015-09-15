import {
  AsyncTestCompleter,
  TestComponentBuilder,
  By,
  beforeEach,
  ddescribe,
  describe,
  el,
  expect,
  iit,
  inject,
  it,
  xit,
} from 'angular2/test';
import {Component, View} from 'angular2/angular2';
import {DOM} from 'angular2/src/core/dom/dom_adapter';
import {About} from './about';
import {NamesList} from '../../services/NameList';

export function main() {
  describe('About component', () => {
    it('should work',
      inject([TestComponentBuilder, AsyncTestCompleter], (tcb: TestComponentBuilder, async) => {
        tcb.overrideTemplate(TestComponent, '<div><about></about></div>')
          .createAsync(TestComponent)
          .then((rootTC) => {
            rootTC.detectChanges();

            var aboutInstance = rootTC.componentViewChildren[0].componentInstance;
            var aboutDOMEl = rootTC.componentViewChildren[0].nativeElement;
            var nameListLen = function () {
              return aboutInstance.list.names.length;
            }

            expect(aboutInstance.list).toEqual(jasmine.any(NamesList));
            expect(nameListLen()).toEqual(4);
            expect(DOM.querySelectorAll(aboutDOMEl, 'li').length).toEqual(nameListLen());

            aboutInstance.addName({value: 'Minko'});
            rootTC.detectChanges();

            expect(nameListLen()).toEqual(5);
            expect(DOM.querySelectorAll(aboutDOMEl, 'li').length).toEqual(nameListLen());

            expect(DOM.querySelectorAll(aboutDOMEl, 'li')[4].textContent).toEqual('Minko');

            async.done();
          });
      }));
  });
};

@Component({selector: 'test-cmp', bindings: [NamesList]})
@View({directives: [About]})
class TestComponent {}
