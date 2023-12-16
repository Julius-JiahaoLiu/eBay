import { TestBed } from '@angular/core/testing';

import { EbaySimilarItemsService } from './ebay-similar-items.service';

describe('EbaySimilarItemsService', () => {
  let service: EbaySimilarItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EbaySimilarItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
