import {
  AsyncTestCompleter,
  TestComponentBuilder,
  By,
  beforeEach,
  beforeEachBindings,
  ddescribe,
  describe,
  el,
  expect,
  iit,
  inject,
  it,
  xit,
} from 'angular2/test';
import {Component, View, bind} from 'angular2/angular2';

import {Router, RootRouter} from 'angular2/src/router/router';
import {Pipeline} from 'angular2/src/router/pipeline';
import {SpyLocation} from 'angular2/src/mock/location_mock';
import {Location} from 'angular2/src/router/location';
import {RouteRegistry} from 'angular2/src/router/route_registry';
import {RouteConfig, AsyncRoute, Route} from 'angular2/src/router/route_config_decorator';
import {DirectiveResolver} from 'angular2/src/core/compiler/directive_resolver';

import {DOM} from 'angular2/src/dom/dom_adapter';
import {Home} from './home';

export function main() {
  beforeEachBindings(() => [
      Pipeline,
      RouteRegistry,
      DirectiveResolver,
      bind(Location).toClass(SpyLocation),
      bind(Router)
          .toFactory((registry, pipeline,
                      location) => { return new RootRouter(registry, pipeline, location, AppCmp); },
                     [RouteRegistry, Pipeline, Location])
    ]);

  describe('Home component', () => {
    it('should work',
      inject([TestComponentBuilder, AsyncTestCompleter], (tcb: TestComponentBuilder, async) => {
        tcb.overrideTemplate(TestComponent, '<div><home></home></div>')
          .createAsync(TestComponent)
          .then((rootTC) => {
            var homeDOMEl = rootTC.componentViewChildren[0].nativeElement;

            expect(DOM.querySelectorAll(homeDOMEl, 'h1')[0].textContent).toEqual('Howdy!');

            async.done();
          });
      }));
  });
};

@Component({selector: 'test-cmp'})
@View({directives: [Home]})
class TestComponent {}

class AppCmp {}
