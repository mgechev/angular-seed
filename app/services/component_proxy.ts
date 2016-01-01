import {
  bind,
  Component,
  DynamicComponentLoader,
  ElementRef,
  Injector,
  Type,
  View
} from 'angular2/core';

class ComponentProvider {
  path: string;
  provide: {(module: any): any};
}

export function componentProxyFactory(provider: ComponentProvider): Type {
  @Component({
    selector: 'component-proxy',
    bindings: [bind(ComponentProvider).toValue(provider)]
  })
  @View({
    template: `<span #content></span>`
  })
  class VirtualComponent {
    constructor(
      el: ElementRef,
      loader: DynamicComponentLoader,
      inj: Injector,
      provider: ComponentProvider
    ) {
        System.import(provider.path)
        .then(m => {
          loader.loadIntoLocation(provider.provide(m), el, 'content');
        });
      }
  }
  return VirtualComponent;
}
