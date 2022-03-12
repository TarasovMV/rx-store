import {Observable} from 'rxjs';
import {RxStoreDescriptor} from './rx-store.descriptor';

export type RxStore = Map<RxStoreDescriptor<unknown>, unknown>;

export interface IRxStoreService {
  setState: <T>(key: RxStoreDescriptor<T>, value: T) => void;
  updateState: (key: RxStoreDescriptor<number>) => void;
  getState$: <T>(key: RxStoreDescriptor<T>) => Observable<T>;
  getStoreState$: <T>(key: RxStoreDescriptor<T>) => StoreObservable<T | undefined>;
  getCurrent: <T>(key: RxStoreDescriptor<T>) => T | undefined;
}

// tslint:disable-next-line:interface-name
export interface StoreObservable<T> extends Observable<T> {
  getValue: () => T;
}
