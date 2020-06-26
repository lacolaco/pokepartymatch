import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchInputComponent } from './match-input.component';

describe('MatchInputComponent', () => {
  let component: MatchInputComponent;
  let fixture: ComponentFixture<MatchInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MatchInputComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
