import { TestBed } from '@angular/core/testing';

import { ListeDonationTypeResolver } from './liste-donation-type.resolver';

describe('ListeDonationTypeResolver', () => {
  let resolver: ListeDonationTypeResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ListeDonationTypeResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
