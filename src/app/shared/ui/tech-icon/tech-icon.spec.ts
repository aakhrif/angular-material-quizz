import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechIcon } from './tech-icon';

describe('TechIcon', () => {
  let component: TechIcon;
  let fixture: ComponentFixture<TechIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
