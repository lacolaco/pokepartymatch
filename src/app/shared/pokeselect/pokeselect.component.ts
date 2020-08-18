import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { debounceTime, map, takeUntil } from 'rxjs/operators';
import { pokemons } from '../../data/pokemon-data';
import { Pokemon } from '../../domain/pokemon';
import { PokepickerComponent } from './pokepicker/pokepicker.component';

@Component({
  selector: 'app-pokeselect',
  templateUrl: './pokeselect.component.html',
  styleUrls: ['./pokeselect.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokeselectComponent implements OnInit, OnDestroy {
  @Input()
  value!: Pokemon;

  @Output()
  valueChange = new EventEmitter<Pokemon>();

  @ViewChild(PokepickerComponent) pokepicker!: PokepickerComponent;

  readonly filteredPokemons$ = new BehaviorSubject<Pokemon[]>(pokemons);

  readonly state$ = combineLatest([this.filteredPokemons$]).pipe(
    map(([filteredPokemons]) => ({
      pokemons: filteredPokemons,
      pokemonsRowRange: filteredPokemons.map((_, index) => index).filter((_, index) => index % 4 === 0),
    }))
  );

  private readonly searchInput$ = new Subject<string>();

  private readonly onDestroy$ = new Subject();

  ngOnInit(): void {
    if (!this.value) {
      this.value = pokemons[0];
      this.valueChange.emit(this.value);
    }

    this.searchInput$.pipe(takeUntil(this.onDestroy$), debounceTime(200)).subscribe((search) => {
      this.filteredPokemons$.next(
        pokemons.filter((p) => {
          if (search.trim().length === 0) {
            return true;
          }
          return p.names.some((name) => name.includes(search));
        })
      );
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
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
  }
}
