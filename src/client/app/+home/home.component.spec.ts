import { TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import {
  describe,
  expect,
  inject,
  it
} from '@angular/core/testing';
import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';

import { NameListService } from '../shared/index';
import { HomeComponent } from './home.component';

export function main() {
  describe('Home component', () => {
    it('should work',
      inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        tcb.createAsync(TestComponent)
	  .then((rootTC: any) => {
            rootTC.detectChanges();

            let homeInstance = rootTC.debugElement.children[0].componentInstance;
            let homeDOMEl = rootTC.debugElement.children[0].nativeElement;
            let nameListLen = function () {
              return homeInstance.nameListService.names.length;
            };

            expect(homeInstance.nameListService).toEqual(jasmine.any(NameListService));
            expect(nameListLen()).toEqual(4);
	    expect(getDOM().querySelectorAll(homeDOMEl, 'li').length).toEqual(nameListLen());

            homeInstance.newName = 'Minko';
            homeInstance.addName();
            rootTC.detectChanges();

            expect(nameListLen()).toEqual(5);
	    expect(getDOM().querySelectorAll(homeDOMEl, 'li').length).toEqual(nameListLen());

	    expect(getDOM().querySelectorAll(homeDOMEl, 'li')[4].textContent).toEqual('Minko');
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
