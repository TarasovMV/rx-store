import {Inject, Injectable, Optional, Self} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, skip } from 'rxjs/operators';
import {IRxStoreService, RxStore, StoreObservable} from './rx-store.interface';
import {RxStoreDescriptor} from './rx-store.descriptor';
import {RX_STORE_SCOPE} from './rx-store.injector';


@Injectable()
export class RxStoreService implements IRxStoreService {
  private readonly store$: BehaviorSubject<RxStore>;
  private get storeSnapshot(): RxStore {
    return this.store$.getValue();
  }

  constructor(@Optional() @Self() @Inject(RX_STORE_SCOPE) scope: string) {
    console.log('scope', scope); // TODO: add save to indexDB
    this.store$ = new BehaviorSubject<RxStore>(new Map<RxStoreDescriptor<unknown>, unknown>());
  }

  /**
   * @description To update stream with value
   * @param key key of updated field
   * @param value new value by key
   */
  public setState<T>(key: RxStoreDescriptor<T>, value: T): void {
    const store = this.storeSnapshot;
    store.set(key, value);
    this.store$.next(new Map<RxStoreDescriptor<unknown>, unknown>(store));
  }

  /**
   * @description To update stream with empty value (example: subject$.next())
   * @param key key of updated field
   */
  public updateState(key: RxStoreDescriptor<number>): void {
    const store = this.storeSnapshot;
    if (typeof store.get(key) === 'number') {
      store.set(key, store.get(key) as number + 1);
    } else if (!store.has(key)) {
      store.set(key, 1);
    } else {
      throw Error('STORE ERROR: update state')
    }
  }

  /**
   * @description To get stream with initial (or not) value
   * @param key key of get field
   * @param isInitial optional, if need behavior as subject set false
   */
  public getState$<T>(key: RxStoreDescriptor<T>, isInitial: boolean = true): Observable<T> {
    return this.store$.pipe(
      skip(isInitial ? 0 : 1),
      filter(x => x.has(key)),
      map(x => x.get(key) as T),
      distinctUntilChanged(),
    );
  }

  /**
   * @description To get stream with "get value" (as BehaviourSubject)
   * @param key key of get field
   */
  public getStoreState$<T>(key: RxStoreDescriptor<T>): StoreObservable<T | undefined> {
    const stream: StoreObservable<T | undefined> = this.getState$(key) as StoreObservable<T | undefined>;
    stream.getValue = () => this.getCurrent(key);
    return stream;
  }

  /**
   * @description To get current value from store (return undefined if key is not existed)
   * @param key key of get field
   */
  public getCurrent<T>(key: RxStoreDescriptor<T>): T | undefined {
    return this.storeSnapshot.get(key) as T;
  }

  /**
   * @description To clear map store
   */
  public clear(): void {
    this.storeSnapshot.clear();
  }

  /**
   * @description To clear store by key
   */
  public clearValue<T>(key: RxStoreDescriptor<T>): void {
    const store = this.storeSnapshot;
    store.delete(key);
    this.store$.next(new Map<RxStoreDescriptor<unknown>, unknown>(store));
  }
}
