import {
  TestComponentBuilder,
  describe,
  expect,
  injectAsync,
  it,
  beforeEachProviders
} from 'angular2/testing';
import {Component, View, provide, DirectiveResolver} from 'angular2/angular2';

import {Location, Router, RouteRegistry} from 'angular2/router';
import {SpyLocation} from 'angular2/src/mock/location_mock';
import {RootRouter} from 'angular2/src/router/router';

import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import {AppCmp} from './app';

export function main() {

  describe('App component', () => {

    // Support for testing component that uses Router
    beforeEachProviders(() => [
      RouteRegistry,
      DirectiveResolver,
      provide(Location, {useClass: SpyLocation}),
      provide(Router,
        {
          useFactory:
            (registry, location) => { return new RootRouter(registry, location, AppCmp); },
          deps: [RouteRegistry, Location]
        })
    ]);

    it('should work',
      injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb.overrideTemplate(TestComponent, '<div><app></app></div>')
          .createAsync(TestComponent)
          .then((rootTC) => {
            rootTC.detectChanges();
            let appDOMEl = rootTC.debugElement.componentViewChildren[0].nativeElement;
            expect(DOM.querySelectorAll(appDOMEl, 'section > nav > a')[1].href).toEqual('http://localhost:9876/about');
          });
      }));
  });
}

@Component({selector: 'test-cmp'})
@View({directives: [AppCmp]})
class TestComponent {}
