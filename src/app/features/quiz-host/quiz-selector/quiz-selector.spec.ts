import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSelector } from './quiz-selector';

describe('QuizSelector', () => {
  let component: QuizSelector;
  let fixture: ComponentFixture<QuizSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizSelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
