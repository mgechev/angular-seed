import {Observable} from 'rxjs/Observable';

export function observableFromStore(store) {
  return Observable.create(observer =>
    store.subscribe(() => observer.next(store.getState()))
  );
}
