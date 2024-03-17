import { TestBed } from '@angular/core/testing';

import { ApiHorsesService } from './api-horses.service';

describe('ApiHorsesService', () => {
  let service: ApiHorsesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiHorsesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
