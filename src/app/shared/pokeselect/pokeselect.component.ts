import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NzPopoverDirective } from 'ng-zorro-antd/popover';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { pokemons } from '../../data/pokemon-data';
import { Pokemon } from '../../domain/pokemon';
import { PokepickerComponent } from './pokepicker/pokepicker.component';

@Component({
  selector: 'app-pokeselect',
  templateUrl: './pokeselect.component.html',
  styleUrls: ['./pokeselect.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokeselectComponent implements OnInit {
  @Input()
  value!: Pokemon;

  @Input()
  pickerPosition: 'bottom' | 'right' = 'bottom';

  @Input()
  readonly = false;

  @Output()
  valueChange = new EventEmitter<Pokemon>();

  @ViewChild(PokepickerComponent) pokepicker!: PokepickerComponent;
  @ViewChild(NzPopoverDirective) popover!: NzPopoverDirective;

  private readonly searchInput$ = new BehaviorSubject<string>('');

  readonly state$: Observable<{ pokemons: Pokemon[]; pokemonsRowRange: number[] }> = combineLatest([
    this.searchInput$.pipe(
      debounceTime(200),
      map((search) => {
        if (!search) {
          return pokemons;
        }
        return pokemons.filter((p) => p.names.some((name) => name.includes(search)));
      })
    ),
  ]).pipe(
    map(([filteredPokemons]) => {
      return {
        pokemons: filteredPokemons,
        pokemonsRowRange: filteredPokemons.map((_, index) => index).filter((_, index) => index % 4 === 0),
      };
    })
  );

  ngOnInit(): void {
    if (!this.value) {
      this.value = pokemons[0];
      this.valueChange.emit(this.value);
    }
  }

  moveFocusToPokepicker(event: Event): void {
    event.preventDefault();
    this.pokepicker.focus();
  }

  onSearchChange(search: string): void {
    this.searchInput$.next(search.toLowerCase());
  }

  selectPokemon(pokemon: Pokemon): void {
    this.valueChange.emit(pokemon);
    this.popover.hide();
  }
}
