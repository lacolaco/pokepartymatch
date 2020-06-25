import {
  ChangeDetectionStrategy, Component,

  Input
} from '@angular/core';
import { PokemonData } from 'src/app/domain/pokemon-data';

@Component({
  selector: 'app-pokeicon',
  templateUrl: './pokeicon.component.html',
  styleUrls: ['./pokeicon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokeiconComponent {
  @Input()
  pokemon!: PokemonData;
}
