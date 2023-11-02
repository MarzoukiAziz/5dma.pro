import { TestBed } from '@angular/core/testing';

import { SearchsService } from './searchs.service';

describe('SearchsService', () => {
  let service: SearchsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
