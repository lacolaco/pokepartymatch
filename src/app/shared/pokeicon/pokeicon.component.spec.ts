import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeiconComponent } from './pokeicon.component';

describe('PokeiconComponent', () => {
  let component: PokeiconComponent;
  let fixture: ComponentFixture<PokeiconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokeiconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeiconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
