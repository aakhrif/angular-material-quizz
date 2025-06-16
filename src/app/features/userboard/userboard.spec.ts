import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Userboard } from './userboard';

describe('Userboard', () => {
  let component: Userboard;
  let fixture: ComponentFixture<Userboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Userboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Userboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
