import {
  TestComponentBuilder,
  describe,
  expect,
  injectAsync,
  it
} from 'angular2/testing';
import {Component} from 'angular2/core';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import {HomeComponent} from './home.component';
import {NameListService} from '../../shared/services/name-list.service';


export function main() {
  describe('Home component', () => {
    it('should work',
      injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb.createAsync(TestComponent)
          .then(rootTC => {
            rootTC.detectChanges();

            let homeInstance = rootTC.debugElement.children[0].componentInstance;
            let homeDOMEl = rootTC.debugElement.children[0].nativeElement;
            let nameListLen = function () {
              return homeInstance.nameListService.names.length;
            };

            expect(homeInstance.nameListService).toEqual(jasmine.any(NameListService));
            expect(nameListLen()).toEqual(4);
            expect(DOM.querySelectorAll(homeDOMEl, 'li').length).toEqual(nameListLen());

            homeInstance.newName = 'Minko';
            homeInstance.addName();
            rootTC.detectChanges();

            expect(nameListLen()).toEqual(5);
            expect(DOM.querySelectorAll(homeDOMEl, 'li').length).toEqual(nameListLen());

            expect(DOM.querySelectorAll(homeDOMEl, 'li')[4].textContent).toEqual('Minko');
          });
      }));
  });
}

@Component({
  providers: [NameListService],
  selector: 'test-cmp',
  template: '<sd-home></sd-home>',
  directives: [HomeComponent]
})
class TestComponent {}
