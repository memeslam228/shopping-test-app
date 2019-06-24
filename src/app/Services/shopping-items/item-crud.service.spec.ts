import { TestBed } from '@angular/core/testing';

import { ItemCRUDService } from './item-crud.service';

describe('ItemCRUDService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemCRUDService = TestBed.get(ItemCRUDService);
    expect(service).toBeTruthy();
  });
});
