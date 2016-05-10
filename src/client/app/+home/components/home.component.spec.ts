import {
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { TestComponentBuilder } from '@angular/compiler/testing';
import { Component, provide } from '@angular/core';
import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';
import { HomeComponent } from './home.component';
import { NameListService } from '../../shared/index';
import { MockBackend } from '@angular/http/testing';
import { HTTP_PROVIDERS, BaseRequestOptions, Http } from '@angular/http';

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
            expect(nameListLen()).toEqual(0);
            expect(getDOM().querySelectorAll(homeDOMEl, 'li').length).toEqual(nameListLen());

            homeInstance.newName = 'Minko';
            homeInstance.addName();
            rootTC.detectChanges();

            expect(nameListLen()).toEqual(1);
            expect(getDOM().querySelectorAll(homeDOMEl, 'li').length).toEqual(nameListLen());

            expect(getDOM().querySelectorAll(homeDOMEl, 'li')[0].textContent).toEqual('Minko');
          });
      }));
  });
}

@Component({
  providers: [HTTP_PROVIDERS,
    BaseRequestOptions,
    MockBackend,
    provide(Http, {
      deps: [MockBackend, BaseRequestOptions],
      useFactory: (backend: any, options: any) => {
        return new Http(backend, options);
      },
    }), NameListService],
  selector: 'test-cmp',
  template: '<sd-home></sd-home>',
  directives: [HomeComponent]
})
class TestComponent { }
