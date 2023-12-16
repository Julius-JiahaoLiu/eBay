import { TestBed } from '@angular/core/testing';

import { GoogleSearchEngineService } from './google-search-engine.service';

describe('GoogleSearchEngineService', () => {
  let service: GoogleSearchEngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleSearchEngineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
