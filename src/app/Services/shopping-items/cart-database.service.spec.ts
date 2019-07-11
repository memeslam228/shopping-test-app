import { TestBed } from '@angular/core/testing';

import { CartDatabaseService } from './cart-database.service';

describe('CartDatabaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartDatabaseService = TestBed.get(CartDatabaseService);
    expect(service).toBeTruthy();
  });
});
