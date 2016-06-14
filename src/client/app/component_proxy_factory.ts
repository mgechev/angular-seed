import {Type, provide, Component, ComponentResolver, ViewContainerRef} from '@angular/core';

export class ComponentProvider {
  path:string;
  module:string;
  provide:{(module:any):any};
}

export function componentProxyFactory(provider: ComponentProvider): Type {
  @Component({
    selector: 'component-proxy',
    providers: [provide(ComponentProvider, { useValue: provider })],
    template: ''
  })
  class VirtualComponent {
    constructor(
      resolver: ComponentResolver,
      viewContainer: ViewContainerRef,
      provider:ComponentProvider) {

      if ('<%= ENV %>' === 'prod') {
        System.import(provider.path)
          .then(() => {
            System.import(provider.module).then((m: any) => {
              resolver.resolveComponent(provider.provide(m)).then((cFactory) => {
                viewContainer.createComponent(cFactory);
              });
            });
          });
      } else {
        System.import(provider.module).then((m: any) => {
          resolver.resolveComponent(provider.provide(m)).then((cFactory) => {
            viewContainer.createComponent(cFactory);
          });
        });
      }
    }
  }
  return VirtualComponent;
}
