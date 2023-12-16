import { TestBed } from '@angular/core/testing';

import { EbaySearchDetailsService } from './ebay-search-details.service';

describe('EbaySearchDetailsService', () => {
  let service: EbaySearchDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EbaySearchDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
