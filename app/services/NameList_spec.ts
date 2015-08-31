import {NamesList} from './NameList';

export function main() {
  describe('NameList Service', () => {
    var nameList;

    beforeEach(() => {
      nameList = new NamesList
    });

    it('should return the list of names', () => {
      var names = nameList.get();
      expect(names).toEqual(jasmine.any(Array));
    });
  });
}
