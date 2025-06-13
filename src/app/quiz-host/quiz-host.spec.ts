import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizHost } from './quiz-host';

describe('QuizHost', () => {
  let component: QuizHost;
  let fixture: ComponentFixture<QuizHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizHost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizHost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
