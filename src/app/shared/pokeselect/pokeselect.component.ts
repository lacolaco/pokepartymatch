import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { pokemons } from 'src/app/data/pokemon-data';
import { Pokemon } from 'src/app/domain/pokemon';

const pokemonToOption = (p: Pokemon): { value: string; label: string } => {
  return {
    value: p.slug,
    label: p.name_jpn,
  };
};

const normalizeRomajiName = (name: string): string => {
  return name.toLowerCase().replace('ā', 'a-').replace('ī', 'i-').replace('ū', 'u-').replace('ē', 'e-').replace('ō', 'o-');
};

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

  readonly pokemons = pokemons;

  readonly selectOptions$ = new BehaviorSubject<{ value: string; label: string }[]>(pokemons.map(pokemonToOption));

  private readonly searchInput$ = new Subject<string>();

  private readonly onDestroy$ = new Subject();

  ngOnInit(): void {
    if (!this.value) {
      this.value = pokemons[0];
      this.valueChange.emit(this.value);
    }

    this.searchInput$.pipe(takeUntil(this.onDestroy$), debounceTime(200)).subscribe((search) => {
      this.selectOptions$.next(
        pokemons
          .filter((p) => {
            if (search.trim().length === 0) {
              return true;
            }
            return `${p.names.eng.toLowerCase()} ${p.names.jpn} ${normalizeRomajiName(p.names.jpn_ro)}`.includes(search);
          })
          .map(pokemonToOption)
      );
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  onSelect(slug: string): void {
    const pokemon = pokemons.find((p) => p.slug === slug);
    if (pokemon == null) {
      throw new Error(`app-pokeselect: invalid value: ${slug}`);
    }
    this.valueChange.emit(pokemon);
  }

  onSearchChange(search: string): void {
    this.searchInput$.next(search.toLowerCase());
  }
}
