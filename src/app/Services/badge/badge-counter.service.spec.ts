import { TestBed } from '@angular/core/testing';

import { BadgeCounterService } from './badge-counter.service';

describe('BadgeCounterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BadgeCounterService = TestBed.get(BadgeCounterService);
    expect(service).toBeTruthy();
  });
});
