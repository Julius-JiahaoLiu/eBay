import { TestBed } from '@angular/core/testing';

import { WishlistSearchDetailsService } from './wishlist-search-details.service';

describe('WishlistSearchDetailsService', () => {
  let service: WishlistSearchDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WishlistSearchDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
