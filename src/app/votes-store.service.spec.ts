import { TestBed } from '@angular/core/testing';

import { VotesStoreService } from './votes-store.service';

describe('VotesStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VotesStoreService = TestBed.get(VotesStoreService);
    expect(service).toBeTruthy();
  });
});
