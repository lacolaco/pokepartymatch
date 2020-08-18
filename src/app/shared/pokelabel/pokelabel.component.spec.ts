import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokelabelComponent } from './pokelabel.component';

describe('PokelabelComponent', () => {
  let component: PokelabelComponent;
  let fixture: ComponentFixture<PokelabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PokelabelComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokelabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
