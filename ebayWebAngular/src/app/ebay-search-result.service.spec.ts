import { TestBed } from '@angular/core/testing';

import { EbaySearchResultService } from './ebay-search-result.service';

describe('EbaySearchResultService', () => {
  let service: EbaySearchResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EbaySearchResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
