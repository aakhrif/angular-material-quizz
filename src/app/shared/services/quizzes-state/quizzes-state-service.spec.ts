import { TestBed } from '@angular/core/testing';

import { QuizzesStateService } from './quizzes-state-service';

describe('QuizzesStateService', () => {
  let service: QuizzesStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizzesStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
