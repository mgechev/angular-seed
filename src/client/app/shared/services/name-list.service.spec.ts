import {NameListService} from './name-list.service';

export function main() {
  describe('NameList Service', () => {
    let nameListService: NameListService;

    beforeEach(() => {
      nameListService = new NameListService;
    });

    it('should return the list of names', () => {
      let names = nameListService.get();
      expect(names).toEqual(jasmine.any(Array));
    });
  });
}
