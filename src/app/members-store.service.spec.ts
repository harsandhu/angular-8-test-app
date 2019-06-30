import { TestBed } from '@angular/core/testing';

import { MembersStoreService } from './members-store.service';

describe('MembersStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MembersStoreService = TestBed.get(MembersStoreService);
    expect(service).toBeTruthy();
  });
});
