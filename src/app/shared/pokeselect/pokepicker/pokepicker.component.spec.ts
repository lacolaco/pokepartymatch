import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokepickerComponent } from './pokepicker.component';

describe('PokepickerComponent', () => {
  let component: PokepickerComponent;
  let fixture: ComponentFixture<PokepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PokepickerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
