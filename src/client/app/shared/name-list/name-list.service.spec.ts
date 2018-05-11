import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NameListService } from './name-list.service';

import { Observable } from 'rxjs';

export function main() {
  describe('NameList Service', () => {

    let nameListService: NameListService;
    let httpMock: HttpTestingController;

    beforeEach(() => {

      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [NameListService]
      });

      nameListService = TestBed.get(NameListService);
      httpMock = TestBed.get(HttpTestingController);
    });

    it('should return an Observable when get called', async(() => {
      expect(TestBed.get(NameListService).get()).toEqual(jasmine.any(Observable));
    }));

    it('should resolve to list of names when get called', async(() => {

      const expectedUsers = [
        'Edsger Dijkstra',
        'Donald Knuth',
        'Alan Turing',
        'Grace Hopper'
      ];

      let actualUsers: string[] = [];
      nameListService.get().subscribe((users: string[]) => {
        actualUsers = users;
      });

      httpMock.expectOne('assets/data.json').flush(expectedUsers);

      expect(actualUsers).toEqual(expectedUsers);
    }));
  });
}
