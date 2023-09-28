import { TestBed } from '@angular/core/testing';

import { MesseService } from './messe.service';

describe('MesseService', () => {
  let service: MesseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MesseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
