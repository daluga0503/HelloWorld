import { TestBed } from '@angular/core/testing';

import { FavUserServiceService } from './fav-user-service.service';

describe('FavUserServiceService', () => {
  let service: FavUserServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavUserServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
