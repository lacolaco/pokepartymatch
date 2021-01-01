import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PokeiconComponent } from './pokeicon.component';

describe('PokeiconComponent', () => {
  let component: PokeiconComponent;
  let fixture: ComponentFixture<PokeiconComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PokeiconComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeiconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
