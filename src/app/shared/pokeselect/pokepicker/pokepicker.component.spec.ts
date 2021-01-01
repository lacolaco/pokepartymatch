import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PokepickerComponent } from './pokepicker.component';

describe('PokepickerComponent', () => {
  let component: PokepickerComponent;
  let fixture: ComponentFixture<PokepickerComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PokepickerComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PokepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
