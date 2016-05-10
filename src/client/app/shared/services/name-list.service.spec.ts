import {
  describe,
  expect,
  it,
  inject,
  beforeEachProviders
} from '@angular/core/testing';
import { provide } from '@angular/core';
import { NameListService } from './name-list.service';
import { MockBackend } from '@angular/http/testing';
import { HTTP_PROVIDERS, Response, ResponseOptions, BaseRequestOptions, Http } from '@angular/http';

export function main() {
  describe('NameList Service', () => {
    beforeEachProviders(() => {
      return [
        HTTP_PROVIDERS,
        BaseRequestOptions,
        MockBackend,
        provide(Http, {
          deps: [MockBackend, BaseRequestOptions],
          useFactory: (backend: any, options: any) => {
            return new Http(backend, options);
          },
        }),
        NameListService
      ];
    });

    it('should return the list of names', inject([MockBackend, NameListService],
      (mockBackend: MockBackend, nameListService: NameListService) => {
        spyOn(nameListService, 'updateNames');
        var connection: any;
        mockBackend.connections.subscribe((c: any) => { connection = c; });
        let names = nameListService.get();
        expect(names).toEqual(jasmine.any(Array));
        connection.mockRespond(new Response(new ResponseOptions({
          'body': {
            'data': [
              'Edsger Dijkstra',
              'Donald Knuth',
              'Alan Turing',
              'Grace Hopper'
            ]
          }
        })));
        expect(nameListService.updateNames).toHaveBeenCalled();
       })
    );
  });
}
