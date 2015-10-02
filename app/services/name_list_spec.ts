import {NameList} from './name_list';

export function main() {
  describe('NameList Service', () => {
    var nameList;

    beforeEach(() => {
      nameList = new NameList
    });

    it('should return the list of names', () => {
      var names = nameList.get();
      expect(names).toEqual(jasmine.any(Array));
    });
  });
}
