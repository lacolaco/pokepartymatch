import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { PokemonData } from 'src/app/domain/pokemon-data';
import { pokemonData } from 'src/app/data/pokemon-data';

@Component({
  selector: 'app-pokeselect',
  templateUrl: './pokeselect.component.html',
  styleUrls: ['./pokeselect.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokeselectComponent implements OnInit {
  @Input()
  value!: PokemonData;

  @Output()
  valueChange = new EventEmitter<PokemonData>();

  readonly pokemons = Object.entries(pokemonData).map(([, pokemon]) => {
    return pokemon;
  });

  constructor() {}

  ngOnInit(): void {
    if (!this.value) {
      this.setValue(pokemonData['001']);
    }
  }

  onSelect(idx: string): void {
    this.setValue(pokemonData[idx]);
  }

  private setValue(value: PokemonData): void {
    this.value = value;
    this.valueChange.emit(value);
  }
}
