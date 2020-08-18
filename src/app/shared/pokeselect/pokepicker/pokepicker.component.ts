import { FocusKeyManager, ListKeyManager } from '@angular/cdk/a11y';
import { DOWN_ARROW, ENTER, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Pokemon } from 'src/app/domain/pokemon';
import { PokepickerItemDirective } from './pokepicker-item.directive';

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
export class PokepickerComponent implements OnChanges, AfterViewInit {
  @Input()
  pokemons!: Pokemon[];

  @Output()
  selectPokemon = new EventEmitter<Pokemon>();

  @ViewChildren(PokepickerItemDirective) items!: QueryList<PokepickerItemDirective>;

  private keyManager!: ListKeyManager<PokepickerItemDirective>;

  get columnRange(): number[] {
    return [0, 1, 2, 3];
  }

  get rowRange(): number[] {
    return this.pokemons.map((_, i) => i).filter((i) => i % this.columnRange.length === 0);
  }

  constructor(private readonly cdRef: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('pokemons' in changes) {
      if (this.keyManager) {
        this.keyManager.setActiveItem(-1);
      }
    }
  }

  ngAfterViewInit(): void {
    this.keyManager = new FocusKeyManager(this.items).withHorizontalOrientation('ltr').withWrap();
    this.keyManager.change.subscribe(() => {
      this.cdRef.markForCheck();
    });
  }

  isActiveItem(pokemon: Pokemon): boolean {
    if (!this.keyManager || this.keyManager.activeItem === null) {
      return false;
    }
    return this.keyManager.activeItem.pokemon.key === pokemon.key;
  }

  focus(): void {
    if (this.keyManager.activeItem == null) {
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
          moveVerticalFocus(this.keyManager.activeItemIndex, -this.columnRange.length);
          // this.cdRef.markForCheck();
        }
        return;
      }
      case DOWN_ARROW: {
        event.preventDefault();
        if (this.keyManager.activeItemIndex !== null) {
          moveVerticalFocus(this.keyManager.activeItemIndex, this.columnRange.length);
          // this.cdRef.markForCheck();
        }
        return;
      }
      default: {
        this.keyManager.onKeydown(event);
      }
    }
  }
}
