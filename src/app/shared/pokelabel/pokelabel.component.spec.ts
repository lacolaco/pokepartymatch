import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PokelabelComponent } from './pokelabel.component';

describe('PokelabelComponent', () => {
  let component: PokelabelComponent;
  let fixture: ComponentFixture<PokelabelComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PokelabelComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PokelabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
