import { TestBed } from '@angular/core/testing';

import { RxStoreService } from './rx-store.service';

describe('RxStoreService', () => {
  let service: RxStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RxStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
