import { FocusKeyManager, ListKeyManager } from '@angular/cdk/a11y';
import { DOWN_ARROW, ENTER, UP_ARROW } from '@angular/cdk/keycodes';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { Pokemon } from 'src/app/domain/pokemon';
import { PokepickerItemDirective } from './pokepicker-item.directive';

const rowSize = 4;

@Component({
  selector: 'app-pokepicker',
  templateUrl: './pokepicker.component.html',
  styleUrls: ['./pokepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '(keydown)': 'onPokepickerKeydown($event)',
  },
})
export class PokepickerComponent implements OnDestroy, AfterViewInit {
  private keyManager!: ListKeyManager<PokepickerItemDirective>;

  private readonly onDestroy$ = new Subject();

  pokemonRows: Array<Pokemon[]> = [];

  @Input()
  set pokemons(value: Pokemon[]) {
    this.resetPokemons(value);
  }

  @Output()
  selectPokemon = new EventEmitter<Pokemon>();

  @ViewChildren(PokepickerItemDirective) items!: QueryList<PokepickerItemDirective>;

  get activePokemonKey(): string | null {
    return this.keyManager?.activeItem?.pokemon.key ?? null;
  }

  constructor(private readonly cdRef: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.keyManager = new FocusKeyManager(this.items).withHorizontalOrientation('ltr').withWrap();
    this.keyManager.change.pipe(takeUntil(this.onDestroy$), debounceTime(100)).subscribe(() => {
      this.cdRef.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  focus(): void {
    if (this.keyManager.activeItem === null) {
      this.keyManager.setFirstItemActive();
    } else {
      this.keyManager.activeItem.focus();
    }
  }

  onPokepickerKeydown(event: KeyboardEvent): void {
    if (event.metaKey || event.altKey) {
      return;
    }

    const moveVerticalFocus = (current: number, move: number): void => {
      const newIndex = current + move;
      if (newIndex >= 0 && newIndex < this.items.length) {
        this.keyManager.setActiveItem(newIndex);
      }
    };

    // tslint:disable-next-line: deprecation
    switch (event.keyCode) {
      case ENTER: {
        if (this.keyManager.activeItem) {
          this.selectPokemon.emit(this.keyManager.activeItem.pokemon);
        }
        return;
      }
      case UP_ARROW: {
        event.preventDefault();
        if (this.keyManager.activeItemIndex !== null) {
          moveVerticalFocus(this.keyManager.activeItemIndex, -rowSize);
        }
        return;
      }
      case DOWN_ARROW: {
        event.preventDefault();
        if (this.keyManager.activeItemIndex !== null) {
          moveVerticalFocus(this.keyManager.activeItemIndex, rowSize);
        }
        return;
      }
      default: {
        this.keyManager.onKeydown(event);
      }
    }
  }

  private resetPokemons(pokemons: Pokemon[]): void {
    if (this.keyManager) {
      this.keyManager.setActiveItem(-1);
    }

    this.pokemonRows = pokemons.reduce((rows, _, index) => {
      if (index % rowSize !== 0) {
        return rows;
      }
      return [...rows, pokemons.slice(index, index + rowSize)];
    }, [] as Array<Pokemon[]>);
  }
}
