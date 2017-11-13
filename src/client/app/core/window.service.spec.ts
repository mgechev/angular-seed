import { TestBed, async } from '@angular/core/testing';

import { WindowRef } from './window.service';

export function main() {
  describe('WindowRef Service', () => {
    let windowRef: WindowRef;

    beforeEach(() => {

      TestBed.configureTestingModule({
        providers: [
          WindowRef
        ]
      });
    });

    it('should be an object', async(() => {
      expect(TestBed.get(WindowRef).nativeWindow).toEqual(jasmine.any(Object));
    }));
  });
}
