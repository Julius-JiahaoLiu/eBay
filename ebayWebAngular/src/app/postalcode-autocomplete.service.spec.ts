import { TestBed } from '@angular/core/testing';

import { PostalcodeAutocompleteService } from './postalcode-autocomplete.service';

describe('PostalcodeAutocompleteService', () => {
  let service: PostalcodeAutocompleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostalcodeAutocompleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
