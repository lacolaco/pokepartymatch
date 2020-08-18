import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Pokemon } from 'src/app/domain/pokemon';

@Component({
  selector: 'app-pokeicon',
  templateUrl: './pokeicon.component.html',
  styleUrls: ['./pokeicon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokeiconComponent {
  @Input()
  pokemon!: Pokemon;

  @Input()
  height = 56;

  @Input()
  lazy = true;

  get imageUrl(): string {
    return `/assets/pokemon-gen8/regular/${this.pokemon.slug}.png`;
  }

  get width(): number {
    return (68 / 56) * this.height;
  }
}
