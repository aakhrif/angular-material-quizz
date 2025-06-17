import { TestBed } from '@angular/core/testing';

import { UserboardState } from './userboard-state';

describe('UserboardState', () => {
  let service: UserboardState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserboardState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
