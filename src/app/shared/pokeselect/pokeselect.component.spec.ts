import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeselectComponent } from './pokeselect.component';

describe('PokeselectComponent', () => {
  let component: PokeselectComponent;
  let fixture: ComponentFixture<PokeselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokeselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
